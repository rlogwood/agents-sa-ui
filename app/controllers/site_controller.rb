require 'basic_yahoo_finance'
require 'excon'
require 'uri'

class SiteController < ApplicationController
  include SiteHelper
  include SentimentPointsHelper

  #SENTIMENT_ANALYSIS_URL = 'https://f4kzgs4vyb.execute-api.us-east-2.amazonaws.com/default/Agent'
  #response=requests.post('https://sj5d8cge8f.execute-api.us-east-2.amazonaws.com/default/agent',data=payload,headers=headers)
  SENTIMENT_ANALYSIS_URL = 'https://sj5d8cge8f.execute-api.us-east-2.amazonaws.com/default/agent'
  private

  def get_stock_history(symbol)
    response = Excon.get(
      'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
      query: {
        symbol: "#{symbol}",
        region: 'US'
      },
      headers: {
        'X-RapidAPI-Key': ENV['RAPID_API_KEY'],
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      })

    puts("response:#{response.inspect}")
    return nil if response.status != 200

    JSON.parse(response.body)
  end

  def get_stock_sentiment(symbol)
    body = {
      "key1": "#{symbol}"
    }
    puts("body:#{body}")
    puts("body:#{body.to_json}")

    response = Excon.post(
      SENTIMENT_ANALYSIS_URL,
      query: {
        symbol: "#{symbol}",
        region: 'US'
      },
      body: body.to_json,
      headers: {
        'Content-Type': 'application/json',
      })

    puts("response:#{response.inspect}")
    return nil if response.status != 200

    JSON.parse(response.body)
  end


  def request_api(url)
    response = Excon.get(
      url
    )

    # puts("response:#{response.inspect}")
    return nil if response.status != 200

    JSON.parse(response.body)
  end

  def lookup_stock_data(symbol)
    # encoded_symbol = URI.encode_www_form_component(symbol)
    # puts("encoded_symbol:#{encoded_symbol}")
    request_api(
      #"#{SENTIMENT_ANALYSIS_URL}/#{encoded_symbol}"
      SENTIMENT_ANALYSIS_URL
    )
  end

  # printable date and time from ruby time value
  def printable_time(time_value)
    time_value.strftime("%-m/%-d/%y: %H:%M %Z")
  end

  # convert yahoo finance date to ruby time
  def ruby_time_from_unix_time(date_value)
    Time.at(date_value)
  end

  # convert ruby time to milliseconds since 1970-01-01 00:00:00 UTC.
  def epoch_time(ruby_time)
    ruby_time.to_f * 1000
  end

  # convert yahoo finance data row to apex chart price and volume data points
  def rapidapi_row_to_apexchart_row(row)
    epoch_date = epoch_time(ruby_time_from_unix_time(row['date']))
    [
      {
        x: epoch_date,
        y: [row['open'], row['high'], row['low'], row['close']]
      },
      {
        x: epoch_date,
        y: [row['volume']]
      },
    ]
  end

  def aws_row_to_apexchart_row(row)
    #epoch_date = epoch_time(ruby_time_from_unix_time(row['Date']))
    [
      {
        x: row['Date'],
        y: [row['Open'], row['High'], row['Low'], row['Close']]
      },
      {
        x: row['Date'],
        y: [row['Volume']]
      },
    ]
  end



  def stock_data_filename(symbol)
    "storage/#{symbol}.json"
  end

  def retrieve_stock_data(symbol)
    File.open(stock_data_filename(symbol), "r") do |f|
      data = f.read
      # data_hash = JSON.parse(data)
      return {} if data.nil?
      JSON.parse(data)
    end
  end

  def get_aws_test_data
    #filename = "storage/aws_test_data_for_aapl.json"
    filename = "public/aws_test_data_for_aapl.json"
    File.open(filename, "r") do |f|
      data = f.read
      # data_hash = JSON.parse(data)
      return {} if data.nil?
      JSON.parse(data)
    end
  end

  def find_and_save_stock_data(symbol)
    data = get_stock_history(symbol)
    return if data.nil?
    File.open(stock_data_filename(symbol), "w+") { |f| f.write(JSON.generate(data)) }
  end

  #               size: 8,
  #               fillColor: '#fff',
  #               strokeColor: 'red',
  #               radius: 2,
  #               cssClass: 'apexcharts-custom-class'



  def init_apexchart_from_rapidapi(data)
    @price_data = []
    @volume_data = []
    data['prices'].each { |row|
      (price_data, volume_data) = rapidapi_row_to_apexchart_row(row)
      @price_data.push(price_data)
      @volume_data.push(volume_data)
      # return if @stock_data.length > 5
    }
  end

  def init_apexchart_from_aws(data)
    @price_data = []
    @volume_data = []
    @pricing_by_date = {}
    @sentiment = {}
    @future_sentiment[:sentiment] = future_sentiment(data)

    #@future_sentiment[:sentiment] = "test #{DateTime.now}" # this future sentiment statement"
    puts("@future_sentiment #{@future_sentiment}")

    json_test = @future_sentiment.to_json
    puts("json_test #{json_test}")
    point_index = 0
    data['stock_data'].each { |row|
      (price_data, volume_data) = aws_row_to_apexchart_row(row)
      unix_timestamp = row['Date']/1000
      time_obj = Time.at(unix_timestamp).in_time_zone('UTC') # Adjust the time zone as needed
      date = time_obj.strftime('%Y-%m-%d')
      @pricing_by_date[date] = {'close':row['Close'], 'date':row['Date'], 'data_point_index':point_index}
      #@sentiment[point_index] = {'sentiment':row['Sentiment'], 'description':row['R'] 'date':row['Date']}
      @price_data.push(price_data)
      @volume_data.push(volume_data)
      point_index += 1
    }
    puts("@pricing_by_date #{@pricing_by_date}")
    (@points_data, @sentiment) = sentiment_points(data['Sentiment_dates'], @pricing_by_date)
    puts("@points_data #{@points_data}")
    puts(" @sentiment #{@sentiment}")
  end


  def get_test_stock_data(symbol)
    data = retrieve_stock_data(symbol)
  end


  def future_sentiment(data)
    "As of #{data['Future_Date_data'][0]['Date']} #{data['Future_Date_data'][0]['Related_data']}"
    #sentiment is #{data['Future_Date_data'][0]['Sentiment']} #
    # "Future_Date_data": [{"Date": "2023-08-20",
    #                       "Sentiment": "The sentiment of the given text is positive.",
    #                       "Related_data": "The current public sentiment for stock ticker name AAPL is positive. The reason behind this positive sentiment is that the company is generating a significant amount of free cash flow each quarter and has the financial strength to engage in stock buybacks. Additionally, the upcoming iPhone 15 launch and other innovations are expected to drive demand."}]}
  end

  public

  def initialize
    super
    @stock_graph_style = %(max-width: 600px;)
    puts(@stock_graph_style)
    @price_data = []
    @volume_data = []
    @pricing_by_date = {}
    @points_data = []
    @sentiment = {}
    @future_sentiment = {}
    @symbol = ''
  end

  def index
    data = get_aws_test_data
    puts("aws_test_data:#{data}")
  end

  def analyze
    #stock = params[:stock]
    stock = analyze_params[:stock]
    @price_data = []
    @volume_data = []
    @symbol = stock

    testing_aws_json = false

    if testing_aws_json
      data = get_aws_test_data
      init_apexchart_from_aws(data)
    else
      if stock.present?
        #data = get_stock_history(stock)
        #init_apexchart_from_rapidapi(data)
        data = get_stock_sentiment(stock)
        if data.nil?
          flash[:notice] = "No data found for #{stock}"
          redirect_to analyze_path
          return
        end

        init_apexchart_from_aws(data)
      end
    end
  end

  def contact
  end

  private

  # Only allow a list of trusted parameters through.
  def analyze_params
    #params.require(:stock) #.permit(:username, :email, :password, :password_confirmation)
    params.permit(:stock)
  end
end
