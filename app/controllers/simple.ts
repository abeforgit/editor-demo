import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { Schema } from 'prosemirror-model';
import { docWithConfig, paragraph, text } from '@lblod/ember-rdfa-editor/nodes';
import applyDevTools from 'prosemirror-dev-tools';
import SayController from '@lblod/ember-rdfa-editor/core/say-controller';
import { inject as service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import {
  EditorState,
  InputRule,
  inputRules,
  textblockTypeInputRule,
  type PluginConfig,
} from '@lblod/ember-rdfa-editor';
import { header_demo } from '../nodes/header-demo-backup';
import { chart_data } from 'editor-demo/nodes/chart-data-backup';
import { chart, chartView, emberChartView, ember_chart } from 'editor-demo/nodes/chart-backup';
import { chartConnector } from 'editor-demo/plugins/chart-connector-backup';
export default class SimpleController extends Controller {
  @tracked controller?: SayController;
  @service declare intl: IntlService;
  schema = new Schema({
    nodes: {
      doc: docWithConfig({
        defaultLanguage: 'nl-BE',
      }),
      paragraph,
      header_demo,
      // chart,
      ember_chart,
      chart_data,

      text,
    },
    marks: {},
  });

  @tracked plugins: PluginConfig = [
    chartConnector(),
    inputRules({
      rules: [
        textblockTypeInputRule(/^\* /, this.schema.nodes.header_demo),
        new InputRule(
          /^:chart-(?<id>.+):/,
          (
            state: EditorState,
            match: RegExpMatchArray,
            start: number,
            end: number
          ) => {
            const tr = state.tr;
            tr.replaceRangeWith(
              start,
              end,
              state.schema.node('ember_chart', { chartId: match.groups?.['id'] })
            );
            return tr;
          }
        ),
        new InputRule(
          /^:data-(?<id>.+):/,
          (
            state: EditorState,
            match: RegExpMatchArray,
            start: number,
            end: number
          ) => {
            const tr = state.tr;
            tr.replaceRangeWith(
              start,
              end,
              state.schema.node('chart_data', { chartId: match.groups?.['id'] })
            );
            return tr;
          }
        ),
      ],
    }),
  ];

  @tracked nodeViews = (controller: SayController) => {
    // chartView;
    return {
      ember_chart: emberChartView(controller)
    }
  };

  @action
  rdfaEditorInit(rdfaEditor: SayController) {
    const presetContent = localStorage.getItem('EDITOR_CONTENT') ?? '';
    this.controller = rdfaEditor;
    this.controller.initialize(presetContent);
    applyDevTools(rdfaEditor.mainEditorView);
  }

  @action
  togglePlugin() {
    console.warn('Live toggling plugins is currently not supported');
  }
}
