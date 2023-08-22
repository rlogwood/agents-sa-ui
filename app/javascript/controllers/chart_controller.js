import {Controller} from "@hotwired/stimulus"
import ApexCharts from 'apexcharts'
window.ApexCharts = ApexCharts; // return apex chart

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default class extends Controller {
    static targets = [ "sentiment"]
    static values = {
        prices: String,
        volume: String,
        points: String,
        future: String,
        sentiment: String,
        symbol: String
    }

    futureValueChanged() {
        fetch(this.futureValue).then(
            response => console.log("futureValueChanged: ",response)
        )
    }
    connect() {
        console.log("we are connected to chart controller")
        //console.log("prices:", this.pricesValue)
        this.price_data = JSON.parse(this.pricesValue)
        this.volume_data = JSON.parse(this.volumeValue)
        this.points_data = JSON.parse(this.pointsValue)
        console.log("future:", this.futureValue)
        console.log("symbol:", this.symbolValue)
        this.future_sentiment = JSON.parse(this.futureValue)
        //this.future_sentiment = this.futureValue
        //this.future_sentiment = ""
        this.sentiment_data = ""
        console.log("sentiment: ", this.sentimentValue)
        this.sentiment_data = JSON.parse(this.sentimentValue)
        //console.log("futureValue: ", this.futureValue)
        //console.log("sentimentValue: ", this.sentimentValue)
        console.log("price_data:", this.price_data)
        console.log("volume_data:", this.volume_data)
        console.log("points_data:", this.points_data)
        console.log("future_sentiment:", this.future_sentiment['sentiment'])
        console.log("sentiment_data:", this.sentiment_data)

        const sentiment = this.sentimentTarget
        //sentiment.className = ""
        sentiment.innerHTML = this.future_sentiment['sentiment'] || ''

        this.closing_prices = []
        this.price_dates = []
        this.price_data.forEach((item, index) => {
            this.closing_prices.push(item.y[3])
            this.price_dates.push(item.x)
        })
        console.log("closing_prices:", this.closing_prices)
        console.log("price_dates:", this.price_dates)

    }

    priceData() {
        return this.price_data
    }

    volumeData() {
        return this.volume_data
    }

    point_click_handler = (event, chartContext, config) => {
        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
        console.log("click:", event, chartContext, config)
        console.log("sentiment_data:", this.sentiment_data)
        if (this.sentiment_data[config.dataPointIndex]) {
            console.log("sentiment_data[config.dataPointIndex]:", this.sentiment_data[config.dataPointIndex])
            const sentiment = this.sentimentTarget
            //sentiment.className = ""
            // Related_Data
            sentiment.innerHTML = this.sentiment_data[config.dataPointIndex]
        }

    }

    price_linechart() {

        var options = {
            series: [{
                name: 'closing price',
                data: this.closing_prices
            }],
            chart: {
                height: 350,
                type: 'line',
                id: 'areachart-2',
                events: {
                    click: this.point_click_handler,
                }
            },
            annotations: {
                yaxis: [{
                    y: 8200,
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            color: '#fff',
                            background: '#00E396',
                        },
                        text: 'Support',
                    }
                }, {
                    y: 8600,
                    y2: 9000,
                    borderColor: '#000',
                    fillColor: '#FEB019',
                    opacity: 0.2,
                    label: {
                        borderColor: '#333',
                        style: {
                            fontSize: '10px',
                            color: '#333',
                            background: '#FEB019',
                        },
                        text: 'Y-axis range',
                    }
                }],
                xaxis: [{
                    x: new Date('23 Nov 2017').getTime(),
                    strokeDashArray: 0,
                    borderColor: '#775DD0',
                    label: {
                        borderColor: '#775DD0',
                        style: {
                            color: '#fff',
                            background: '#775DD0',
                        },
                        text: 'Anno Test',
                    }
                }, {
                    x: new Date('26 Nov 2017').getTime(),
                    x2: new Date('28 Nov 2017').getTime(),
                    fillColor: '#B3F7CA',
                    opacity: 0.4,
                    label: {
                        borderColor: '#B3F7CA',
                        style: {
                            fontSize: '10px',
                            color: '#fff',
                            background: '#00E396',
                        },
                        offsetY: -10,
                        text: 'X-axis range',
                    }
                }],
                points: this.points_data,
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                padding: {
                    right: 30,
                    left: 20
                }
            },
            title: {
                text: `${this.symbolValue} Closing Price`,
                align: 'left'
            },
            labels: this.price_dates,
            xaxis: {
                type: 'datetime',
            },
        };

        var chart = new ApexCharts(document.querySelector("#stock-chart"), options);
        chart.render();


    }

    linechart() {
        var options = {
            chart: {
                type: 'line',
                events: {
                    click: function (event, chartContext, config) {
                        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                        console.log("click:", event, chartContext, config)
                    },
                    dataPointSelection: function (event, chartContext, config) {
                        console.log("dataPointSelection: ", event, chartContext, config)
                    }
                }
            },
            series: [{
                name: 'sales',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
            }],
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        }

        // let chart = new ApexCharts(document.querySelector("#stock_chart"), options);
        let chart = new ApexCharts(document.getElementById("stock-chart"), options);
        chart.render();

    }

    candlestick() {
        var options = {
            series: [
                {
                    data: this.priceData()
                }],
            chart: {
                type: 'candlestick',
                height: 350,
                events: {
                    // click: function(event, chartContext, config) {
                    //     // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                    //     console.log("click:", event, chartContext, config)
                    // },
                    dataPointSelection: function (event, chartContext, config) {
                        //console.log("dataPointSelection: ", event, chartC
                        // ontext, config)
                        const dataPointIndex = config['dataPointIndex']
                        console.log("dataPointSelection: dataPointIndex:", dataPointIndex)
                        console.log("dataPointSelection: event", event)
                        console.log("dataPointSelection: config", config)
                        console.log("config['w']['config']['series'][0]['data'][dataPointIndex]:",config['w']['config']['series'][0]['data'][dataPointIndex])   //[1] = 10000
                        const data_date = config['w']['config']['series'][0]['data'][dataPointIndex]['x']
                        const data_open = config['w']['config']['series'][0]['data'][dataPointIndex]['y'][0]
                        const data_high = config['w']['config']['series'][0]['data'][dataPointIndex]['y'][1]
                        const data_low = config['w']['config']['series'][0]['data'][dataPointIndex]['y'][2]
                        const data_close = config['w']['config']['series'][0]['data'][dataPointIndex]['y'][3]
                        console.log("data_date:", data_date)
                        console.log("data_open:", data_open)
                        console.log("data_high:", data_high)
                        console.log("data_low:", data_low)
                        console.log("data_close:", data_close)
                        alert("data_date:" + data_date + "\n" + "data_open:" + data_open + "\n" + "data_high:" + data_high + "\n" + "data_low:" + data_low + "\n" + "data_close:" + data_close)
                    }
                }
            },
            points: this.points_data,
            title: {
                text: 'CandleStick Chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        };

        const chart = new ApexCharts(document.querySelector("#stock-chart"), options);
        chart.render();

    }

    candlesWithVolume() {


        var optionsCandles = {
            series: [{
                data: this.priceData()
            }],
            chart: {
                type: 'candlestick',
                height: 290,
                id: 'candles',
                toolbar: {
                    autoSelected: 'pan',
                    show: false
                },
                zoom: {
                    enabled: false
                },
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#3C90EB',
                        downward: '#DF7D46'
                    }
                }
            },
            xaxis: {
                type: 'datetime'
            }
        };

/*
                brush: {
                    enabled: true,
                    target: 'candles'
                },

 */
        var optionsVolume = {
            series: [{
                //name: 'volume',
                data: this.volumeData()
            }],
            chart: {
                //id: 'volume',
                height: 160,
                type: 'bar',
                brush: {
                    //enabled: true,
                    //target: 'candles'
                },

                selection: {
                    enabled: true,
                    xaxis: {
                        min: new Date('20 Jan 2017').getTime(),
                        max: new Date('10 Dec 2017').getTime()
                    },
                    fill: {
                        color: '#ccc',
                        opacity: 0.4
                    },
                    stroke: {
                        color: '#0D47A1',
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '80%',
                    colors: {
                        ranges: [{
                            from: -1000,
                            to: 0,
                            color: '#F15B46'
                        }, {
                            from: 1,
                            to: 10000,
                            color: '#FEB019'
                        }],

                    },
                }
            },
            stroke: {
                width: 0
            },
            xaxis: {
                type: 'datetime',
                axisBorder: {
                    offsetX: 13
                }
            },
            yaxis: {
                labels: {
                    show: false
                }
            }
        };

        //const chartBar = new ApexCharts(document.querySelector("#chart-bar"), optionsBar);
        //chartBar.render();
        var candles = new ApexCharts(document.querySelector("#chart-candlestick"), optionsCandles);

        //candles.render().then(r => volume.render().then (r => console.log("rendered")))

        var volume = new ApexCharts(document.querySelector("#chart-bar"), optionsVolume);
        //console.log('Taking a break...');
        //await sleep(5000);
        //console.log('Two seconds later, showing sleep in a loop...');
        candles.render().then(r => console.log("rendered candles:",r))
        console.log("staring volume render")
        volume.render().then(r => console.log("rendered volume:",r))

    }

    show() {
        //this.outputTarget.textContent =
        //    `Stock ${this.stockTarget.value}!`
        //this.candlesWithVolume()
        //this.candlestick()
        this.price_linechart()
        //this.linechart()
    }
}