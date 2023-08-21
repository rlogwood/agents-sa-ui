require 'basic_yahoo_finance'
require 'excon'
require 'uri'

class SiteController < ApplicationController
  include SiteHelper
  SENTIMENT_ANALYSIS_URL = 'https://f4kzgs4vyb.execute-api.us-east-2.amazonaws.com/default/Agent'

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


  def sentiment_points(sentiment_dates)
    return [] if sentiment_dates.nil?

    points_data = []
    sentiment_dates.each { |row|
      point = sentiment_point(row)
      points_data.push(point) unless point.nil?
    }
    points_data
  end

  def sentiment_point(row)
    sentiment_date = row['Date']
    pricing_data = @pricing_by_date[sentiment_date]
    return if pricing_data.nil?

    price_date = pricing_data[:date]
    price = pricing_data[:close]

    case row['Sentiment']
    when 'positive'
      positive_marker(price_date, price)
    when 'negative'
      negative_marker(price_date, price)
    else
      #add_neutral_marker(price_date, price)
      # do nothing
    end
  end

  def neutral_marker(x, y)
    {
      x: x,
      y: y,
      marker: {
        size: 8,
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        radius: 2,
        cssClass: 'apexcharts-custom-class'
      }
    }
  end

  def negative_marker(x, y)
    {
      x: x,
      y: y,
      marker: {
        size: 8,
        fillColor: '#FF0000',
        strokeColor: '#000000',
        radius: 2,
        cssClass: 'apexcharts-custom-class'
      }
    }
  end

  def positive_marker(x, y)
    {
      x: x,
      y: y,
      marker: {
        size: 8,
        fillColor: '#00FF00',
        strokeColor: '#000000',
        radius: 2,
        cssClass: 'apexcharts-custom-class'
      }
    }
  end

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

    #orig_unix_timestamp = 1691107200000
    #unix_timestamp = orig_unix_timestamp / 1000


    #unix_timestamp = 1691107200
    #unix_timestamp = 1616412692

    #datetime = "2021-01-14 05:30"


    #=> Thu, 14 Jan 2021 05:30:00 EST -05:00

    #datetime_in_ET.in_time_zone("Australia/Melbourne")
    # => Thu, 14 Jan 2021 21:30:00 AEDT +11:00
    # Convert the Unix timestamp to a Time object
    #time_obj = Time.at(unix_timestamp)
    #time_obj = Time.at(unix_timestamp).in_time_zone('UTC') # Adjust the time zone as needed
    #date_time_string = time_obj.strftime('%Y-%m-%d %H:%M:%S')
    #datetime_in_UTC = ActiveSupport::TimeZone['Etc/UTC'].parse(date_time_string)

    # Format the Time object as a string
    #date_time_string = time_obj.strftime('%Y-%m-%d %H:%M:%S')
    #utc_date_time_string = datetime_in_UTC.strftime('%Y-%m-%d %H:%M:%S')

    #puts date_time_string
    #puts utc_date_time_string

    point_index = 0
    data['stock_data'].each { |row|
      (price_data, volume_data) = aws_row_to_apexchart_row(row)
      #ruby_time = ruby_time_from_unix_time(row['Date']/1000)
      unix_timestamp = row['Date']/1000
      time_obj = Time.at(unix_timestamp).in_time_zone('UTC') # Adjust the time zone as needed
      #epoch_date = (row['Date']/1000).to_s
      #epoch_date_str = DateTime.strptime(epoch_date,'%s')
      #date = epoch_date_str.strftime('%Y-%m-%d')
      #date = ruby_time.strftime('%Y-%m-%d')
      date = time_obj.strftime('%Y-%m-%d')
      #time = Time.at(row['Date']/1000).to_datetime
      #date = time.strftime('%Y-%m-%d')
      @pricing_by_date[date] = {'close':row['Close'], 'date':row['Date'], 'dataPointIndex':point_index}
      #DateTime.strptime(price_data['data'],'%s')
      @price_data.push(price_data)
      @volume_data.push(volume_data)
      point_index += 1
      # return if @stock_data.length > 5
      # 2023-08-04
      # %Y-%m-%d
    }
    puts @pricing_by_date
    @points_data = sentiment_points(data['Sentiment_dates'])
    puts @points_data
  end


  def get_test_stock_data(symbol)
    data = retrieve_stock_data(symbol)
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

    testing_aws_json = true

    if testing_aws_json
      data = get_aws_test_data
      init_apexchart_from_aws(data)
    else
      if stock.present?
        data = get_stock_history(stock)
        init_apexchart_from_rapidapi(data)
      end
    end
    #@stock_data = @stock_data.to_json.to_s
    @metrics = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
                   label: '# of Votes',
                   data: [12, 19, 3, 5, 2, 3],
                   borderWidth: 1
                 }]
    }
    # puts(@metrics)
    # puts(@metrics.as_json)
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

=begin
  # puts("date_value:#{date_value}")
  #time_value = Time.at(date_value)


  # def convert_time(datetime)
  #   #time = Time.parse(datetime).in_time_zone("Eastern Time (US & Canada)")
  #   time = Time.parse(datetime)
  #   time.strftime("%-m/%-d/%y: %H:%M %Z")
  # end



  # x: date
    # y: order: open, high, low, close
    #             {
    #                 x: new Date(1538857800000),
    #                 y: [6593.86, 6604.28, 6586.57, 6600.01]
    #             },

    # Perhaps the most reliable way is to use seconds since the epoch for ruby, and milliseconds for JavaScript.
    #
    # In ruby:
    #
    # t = Time.now
    # => 2014-03-12 11:18:29 -0700
    # t.to_f * 1000 # convert to milliseconds since 1970-01-01 00:00:00 UTC.
    # => 1394648309130.185
    #
  #end

      #puts("data_hash:#{data_hash}")
      #puts("convert_time:#{convert_time(data_hash['prices'][0]['date'])}")

      # date_value = data_hash['prices'][0]['date']
      # puts("date_value:#{date_value}")
      # #date = Date.jd(date_value)
      # time_value = Time.at(date_value)
      # puts("date:#{time_value}")
      # date_str = time_value.strftime("%-m/%-d/%y: %H:%M %Z")
      # puts("date_str:#{date_str}")

    # query = BasicYahooFinance::Query.new
    #@stock_data = query.quotes('AAPL', 'price')
    # puts(@stock_data)
    #@stock_data = lookup_stock_data('AAPL')


    # puts("stock data:(#{@stock_data})")

=end