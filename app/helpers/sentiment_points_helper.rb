module SentimentPointsHelper

  private def sentiment_points(sentiment_dates, pricing_by_date)
    return [] if sentiment_dates.nil?

    sentiment = {}
    points_data = []
    sentiment_dates.each { |row|
      (point, data_point_index) = sentiment_point(row, pricing_by_date)
      points_data.push(point) unless point.nil?
      sentiment[data_point_index] = "#{row['Date']}: #{row['Related_Data']}"
    }
    [points_data, sentiment]
  end

  private def sentiment_point(row, pricing_by_date)
    sentiment_date = row['Date']
    pricing_data = pricing_by_date[sentiment_date]
    return if pricing_data.nil?

    price_date = pricing_data[:date]
    price = pricing_data[:close]
    data_point_index = pricing_data[:data_point_index]

    case row['Sentiment']
    when 'positive'
      [positive_marker(price_date, price), data_point_index]
    when 'negative'
      [negative_marker(price_date, price), data_point_index]
    else
      # add_neutral_marker(price_date, price)
      # do nothing
    end
  end

  private def neutral_marker(x, y)
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

  private def negative_marker(x, y)
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

  private def positive_marker(x, y)
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

end