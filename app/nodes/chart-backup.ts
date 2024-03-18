import { v4 as uuidv4 } from 'uuid';
import {
  type NodeView,
  type SayView,
  PNode,
  type NodeSpec,
} from '@lblod/ember-rdfa-editor';
import { Chart } from 'chart.js/auto';
import { chartConnectorKey } from 'editor-demo/plugins/chart-connector-backup';
import {
  createEmberNodeSpec,
  createEmberNodeView,
} from '@lblod/ember-rdfa-editor/utils/ember-node';
import EmberChartViewComponent from 'editor-demo/components/ember-chart-view';

import type { ComponentLike } from '@glint/template';
import type SayNodeSpec from '@lblod/ember-rdfa-editor/core/say-node-spec';
export const chart: SayNodeSpec = {
  group: 'block',
  atom: true,
  selectable: true,
  attrs: { chartId: { default: null } },
  parseDOM: [
    {
      tag: 'div',
      getAttrs(node: string | HTMLElement) {
        if (typeof node === 'string') {
          return false;
        }
        if (node.dataset['chart']) {
          return { chartId: node.dataset['chartId'] };
        }
        return false;
      },
    },
  ],
  toDOM(node: PNode) {
    return [
      'div',
      { 'data-chart': true, 'data-chart-id': node.attrs['chartId'] },
    ];
  },
};

class ChartView implements NodeView {
  dom: HTMLCanvasElement;
  node: PNode;
  view: SayView;
  getPos: () => number;
  chart?: Chart;
  id: string;
  constructor(node: PNode, view: SayView, getPos: () => number) {
    this.node = node;
    this.id = node.attrs['chartId'];
    console.log('node constructing', node);
    this.view = view;
    this.getPos = getPos;
    const dom = document.createElement('canvas') as HTMLCanvasElement;
    dom.id = `chart-${this.id}-${uuidv4()}`;
    dom.dataset['chart'] = 'true';

    this.dom = dom;
    console.log(
      'plugin state',

      chartConnectorKey.getState(this.view.state)
    );
    this.chart = new Chart(dom, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Some data',

            data:
              chartConnectorKey.getState(this.view.state)?.get(this.id) ?? [],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: { display: true, text: `Chart ${this.id}` },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  selectNode(): void {
    this.dom.classList.add('ProseMirror-selectednode');
  }
  deselectNode() {
    this.dom.classList.remove('ProseMirror-selectednode');
  }
  destroy() {}
}
export function chartView(node: PNode, view: SayView, getPos: () => number) {
  return new ChartView(node, view, getPos);
}

export const ember_chart = createEmberNodeSpec({
  ...chart,
  inline: false,
  name: 'ember_chart',
  group: 'block',
  atom: true,
  component: EmberChartViewComponent as unknown as ComponentLike,
});
export const emberChartView = createEmberNodeView({
  ...chart,
  inline: false,
  name: 'ember_chart',
  group: 'block',
  atom: true,
  component: EmberChartViewComponent as unknown as ComponentLike,
});
