import { EditorState, ProsePlugin, PluginKey } from '@lblod/ember-rdfa-editor';

export const chartConnectorKey = new PluginKey<ChartConnectorState>(
  'chartConnector'
);
type ChartConnectorState = Map<string, number[]>;

function collectChartData(state: EditorState) {
  const result: ChartConnectorState = new Map();
  state.doc.descendants((node) => {
    console.log('node', node);
    if (node.type.name === 'chart_data') {
      const content = node.textContent;
      const id = node.attrs['chartId'];
      console.log('id', id);
      if (id) {
        const numbers = content
          .replace(/\s/g, '')
          .split(',')
          .map((numstring) => parseInt(numstring, 10));
        result.set(id, numbers);
      }
      return false;
    }
    return true;
  });
  console.log('result', result);
  return result;
}
export function chartConnector(): ProsePlugin<ChartConnectorState> {
  return new ProsePlugin({
    key: chartConnectorKey,
    state: {
      init(_config, instance): ChartConnectorState {
        console.log('init');
        return collectChartData(instance);
      },
      apply(_tr, _value, _oldState, newState) {
        console.log('applying');
        return collectChartData(newState);
      },
    },
  });
}
