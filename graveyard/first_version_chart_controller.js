// hello_controller.js
import { Controller } from "@hotwired/stimulus"
import { Chart } from 'chart.js/auto';

export default class extends Controller {
    static targets = [ "stock", "output" ]

    show() {
        this.outputTarget.textContent =
            `Stock ${this.stockTarget.value}!`

        const ctx = document.getElementById('test_chart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }
}