import type { NodeSpec, PNode } from '@lblod/ember-rdfa-editor';

export const chart_data: NodeSpec = {
  group: 'block',
  content: 'text*',
  attrs: {
    chartId: { default: null },
  },
  parseDOM: [
    {
      tag: 'div',
      getAttrs(node: string | HTMLElement) {
        if (typeof node === 'string') {
          return false;
        }
        if (node.dataset['chartData']) {
          return { chartId: node.dataset['chartId'] };
        }
        return false;
      },
      contentElement(node) {
        return node.lastChild as HTMLElement;
      },
    },
  ],
  toDOM(node: PNode) {
    return [
      'div',
      {
        'data-chart-data': true,
        'data-chart-id': node.attrs['chartId'],
        class: 'chart-data',
      },
      ['span', `data for chart ${node.attrs['chartId']}: `],
      ['span', 0],
    ];
  },
};
