import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { EmberNodeArgs } from '@lblod/ember-rdfa-editor/utils/ember-node';
import { chartConnectorKey } from 'editor-demo/plugins/chart-connector-backup';
import { tracked } from '@glimmer/tracking';
import { Chart } from 'chart.js';
import { v4 as uuidv4 } from 'uuid';

type Args = EmberNodeArgs;

export default class EmberChartViewBackupComponent extends Component<Args> {
  @tracked
  chart: Chart | null = null;
  get controller() {
    return this.args.controller;
  }
  get state() {
    return this.controller.mainEditorState;
  }
  get chartId() {
    return this.args.node.attrs['chartId'];
  }
  get canvasId() {
    return `${this.chartId}-${uuidv4()}`;
  }
  get chartData() {
    const data =
      chartConnectorKey.getState(this.state)?.get(this.chartId) || [];
    this.chart?.update();
    return data;
  }
  @action
  canvasInserted(canvas: HTMLCanvasElement) {
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Some data',

            data: this.chartData,

            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: { display: true, text: `Chart ${this.chartId}` },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  @action
  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0]!.data = this.chartData;
      this.chart.update();
    }
  }
}
