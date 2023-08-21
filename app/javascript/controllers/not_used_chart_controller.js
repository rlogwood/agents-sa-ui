// app/packs/controllers/chart_controller.js
import { Controller } from "@hotwired/stimulus";
import Chart from 'chart.js/auto';

export default class ChartController extends Controller {
    static ELEMENT_ID = 'stock_chart';
    static DEFAULT_OPTIONS = { responsive: true, maintainAspectRatio: false };

    connect() {
        console.log("we are connected to chart controller")
        this.render();
    }

    render() {
        // If the element exists, instantiate an instance

        if (!this.ele) {
            console.log("no element")
            return;
        }

        console.log("element exists:")
        alert(this.ele)
        const ctx = this.ele.getContext('2d');

        this.graph = new Chart(ctx, { type: 'line', data: this.data, options: this.options });
    }

    get ele() {
        // retrieve the canvas element
        console.log('getting element')
        return this._ele = this._ele || document.getElementById(ChartController.ELEMENT_ID);
    }

    get metric() {
        // get the metric for the chart
        return this._metric = this._metric || this.element.dataset.metric;
    }

    get unit() {
        // get the unit for the chart
        return this._unit = this._unit || this.element.dataset.unit;
    }

    get metrics() {
        // get the metrics from the data embedded on the page
        return this._metrics = this._metrics || JSON.parse(document.querySelector('[data-metrics-type]').dataset.metrics);
    }

    get options() {
        // get default options, maybe merge it?
        return ChartController.DEFAULT_OPTIONS;
    }

    get data() {
        // normalize the data for the chart
        return { labels: this.labels, datasets: this.datasets };
    }

    get labels() {
        // generate labels for the chart
        return this._labels = this._labels || this.metrics.map((m) => new Date(m.updated_at).toDateString());
    }

    get datasets() {
        // get the datasets to be represented in the chart
        return [{
            label: `${this.metric} / ${this.unit}`,
            data: this.metrics.map((m) => parseInt(m.value, 10)),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }];


        // return [{
        //     label: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //     data: [{
        //         label: '# of Votes',
        //         data: [12, 19, 3, 5, 2, 3],
        //         borderWidth: 1
        //     }],
        //     fill: false,
        //     borderColor: 'rgb(75, 192, 192)',
        //     tension: 0.1
        // }]
    }
}