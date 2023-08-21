// hello_controller.js
import {Controller} from "@hotwired/stimulus"
// import { Chart } from 'chart.js/auto';
//import { ApexCharts } from 'apexcharts'
import ApexCharts from 'apexcharts'
window.ApexCharts = ApexCharts; // return apex chart

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default class extends Controller {
    static targets = ["stock", "output"]
    static values = {
        metrics: String
    }

    connect() {
        console.log("we are connected to chart controller")

        console.log("metrics:", this.metricsValue)
        this.stock_data = JSON.parse(this.metricsValue)
        console.log("stock_data:", this.stock_data)
    }

    priceData() {
        return this.stock_data
        //return this.v1priceData()
    }
    v1priceData()  {
        // this.metricsValue.forEach(metric => {
        //     console.log("metric:", metric)
        // });

        //console.log("metricsValue type:", typeof this.metricsValue)
        //console.log("metrics type:", typeo this.metricsValue[0].metric_type)
        //console.log("metrics", this.metricsValue)


        return [
            {
                x: new Date(1538778600000),
                y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
                x: new Date(1538780400000),
                y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
                x: new Date(1538782200000),
                y: [6630.71, 6648.95, 6623.34, 6635.65]
            },
            {
                x: new Date(1538784000000),
                y: [6635.65, 6651, 6629.67, 6638.24]
            },
            {
                x: new Date(1538785800000),
                y: [6638.24, 6640, 6620, 6624.47]
            },
            {
                x: new Date(1538787600000),
                y: [6624.53, 6636.03, 6621.68, 6624.31]
            },
            {
                x: new Date(1538789400000),
                y: [6624.61, 6632.2, 6617, 6626.02]
            },
            {
                x: new Date(1538791200000),
                y: [6627, 6627.62, 6584.22, 6603.02]
            },
            {
                x: new Date(1538793000000),
                y: [6605, 6608.03, 6598.95, 6604.01]
            },
            {
                x: new Date(1538794800000),
                y: [6604.5, 6614.4, 6602.26, 6608.02]
            },
            {
                x: new Date(1538796600000),
                y: [6608.02, 6610.68, 6601.99, 6608.91]
            },
            {
                x: new Date(1538798400000),
                y: [6608.91, 6618.99, 6608.01, 6612]
            },
            {
                x: new Date(1538800200000),
                y: [6612, 6615.13, 6605.09, 6612]
            },
            {
                x: new Date(1538802000000),
                y: [6612, 6624.12, 6608.43, 6622.95]
            },
            {
                x: new Date(1538803800000),
                y: [6623.91, 6623.91, 6615, 6615.67]
            },
            {
                x: new Date(1538805600000),
                y: [6618.69, 6618.74, 6610, 6610.4]
            },
            {
                x: new Date(1538807400000),
                y: [6611, 6622.78, 6610.4, 6614.9]
            },
            {
                x: new Date(1538809200000),
                y: [6614.9, 6626.2, 6613.33, 6623.45]
            },
            {
                x: new Date(1538811000000),
                y: [6623.48, 6627, 6618.38, 6620.35]
            },
            {
                x: new Date(1538812800000),
                y: [6619.43, 6620.35, 6610.05, 6615.53]
            },
            {
                x: new Date(1538814600000),
                y: [6615.53, 6617.93, 6610, 6615.19]
            },
            {
                x: new Date(1538816400000),
                y: [6615.19, 6621.6, 6608.2, 6620]
            },
            {
                x: new Date(1538818200000),
                y: [6619.54, 6625.17, 6614.15, 6620]
            },
            {
                x: new Date(1538820000000),
                y: [6620.33, 6634.15, 6617.24, 6624.61]
            },
            {
                x: new Date(1538821800000),
                y: [6625.95, 6626, 6611.66, 6617.58]
            },
            {
                x: new Date(1538823600000),
                y: [6619, 6625.97, 6595.27, 6598.86]
            },
            {
                x: new Date(1538825400000),
                y: [6598.86, 6598.88, 6570, 6587.16]
            },
            {
                x: new Date(1538827200000),
                y: [6588.86, 6600, 6580, 6593.4]
            },
            {
                x: new Date(1538829000000),
                y: [6593.99, 6598.89, 6585, 6587.81]
            },
            {
                x: new Date(1538830800000),
                y: [6587.81, 6592.73, 6567.14, 6578]
            },
            {
                x: new Date(1538832600000),
                y: [6578.35, 6581.72, 6567.39, 6579]
            },
            {
                x: new Date(1538834400000),
                y: [6579.38, 6580.92, 6566.77, 6575.96]
            },
            {
                x: new Date(1538836200000),
                y: [6575.96, 6589, 6571.77, 6588.92]
            },
            {
                x: new Date(1538838000000),
                y: [6588.92, 6594, 6577.55, 6589.22]
            },
            {
                x: new Date(1538839800000),
                y: [6589.3, 6598.89, 6589.1, 6596.08]
            },
            {
                x: new Date(1538841600000),
                y: [6597.5, 6600, 6588.39, 6596.25]
            },
            {
                x: new Date(1538843400000),
                y: [6598.03, 6600, 6588.73, 6595.97]
            },
            {
                x: new Date(1538845200000),
                y: [6595.97, 6602.01, 6588.17, 6602]
            },
            {
                x: new Date(1538847000000),
                y: [6602, 6607, 6596.51, 6599.95]
            },
            {
                x: new Date(1538848800000),
                y: [6600.63, 6601.21, 6590.39, 6591.02]
            },
            {
                x: new Date(1538850600000),
                y: [6591.02, 6603.08, 6591, 6591]
            },
            {
                x: new Date(1538852400000),
                y: [6591, 6601.32, 6585, 6592]
            },
            {
                x: new Date(1538854200000),
                y: [6593.13, 6596.01, 6590, 6593.34]
            },
            {
                x: new Date(1538856000000),
                y: [6593.34, 6604.76, 6582.63, 6593.86]
            },
            {
                x: new Date(1538857800000),
                y: [6593.86, 6604.28, 6586.57, 6600.01]
            },
            {
                x: new Date(1538859600000),
                y: [6601.81, 6603.21, 6592.78, 6596.25]
            },
            {
                x: new Date(1538861400000),
                y: [6596.25, 6604.2, 6590, 6602.99]
            },
            {
                x: new Date(1538863200000),
                y: [6602.99, 6606, 6584.99, 6587.81]
            },
            {
                x: new Date(1538865000000),
                y: [6587.81, 6595, 6583.27, 6591.96]
            },
            {
                x: new Date(1538866800000),
                y: [6591.97, 6596.07, 6585, 6588.39]
            },
            {
                x: new Date(1538868600000),
                y: [6587.6, 6598.21, 6587.6, 6594.27]
            },
            {
                x: new Date(1538870400000),
                y: [6596.44, 6601, 6590, 6596.55]
            },
            {
                x: new Date(1538872200000),
                y: [6598.91, 6605, 6596.61, 6600.02]
            },
            {
                x: new Date(1538874000000),
                y: [6600.55, 6605, 6589.14, 6593.01]
            },
            {
                x: new Date(1538875800000),
                y: [6593.15, 6605, 6592, 6603.06]
            },
            {
                x: new Date(1538877600000),
                y: [6603.07, 6604.5, 6599.09, 6603.89]
            },
            {
                x: new Date(1538879400000),
                y: [6604.44, 6604.44, 6600, 6603.5]
            },
            {
                x: new Date(1538881200000),
                y: [6603.5, 6603.99, 6597.5, 6603.86]
            },
            {
                x: new Date(1538883000000),
                y: [6603.85, 6605, 6600, 6604.07]
            },
            {
                x: new Date(1538884800000),
                y: [6604.98, 6606, 6604.07, 6606]
            },
        ]
    }

    volumeData() {
        const num_volume_bars  = this.priceData().length
        console.log("num_volume_bars: ", num_volume_bars)
        const volume_data =  Array.from({length: num_volume_bars}, () => Math.floor(Math.random() * 1000000));
        const series = Array()
        for (let i = 0; i < num_volume_bars; i++) {
            series.push([this.priceData()[i].x, volume_data[i]])
        }

        console.log(series)
        return series
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
        this.outputTarget.textContent =
            `Stock ${this.stockTarget.value}!`
        this.candlesWithVolume()
        //this.candlestick()
        //this.linechart()
    }
}