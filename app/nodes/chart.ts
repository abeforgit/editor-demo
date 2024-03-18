import { v4 as uuidv4 } from 'uuid';
import {
  type NodeSpec,
  PNode,
  type NodeView,
  SayView,
} from '@lblod/ember-rdfa-editor';
import { Chart } from 'chart.js';

export const chart: NodeSpec = {
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
          return {
            chartId: node.dataset['chartId'],
          };
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

export class ChartView implements NodeView {
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
    this.chart = new Chart(dom, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Some data',

            data: [1,2,3,4],
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
