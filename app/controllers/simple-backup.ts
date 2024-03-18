import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { Schema } from 'prosemirror-model';
import { docWithConfig, paragraph, text } from '@lblod/ember-rdfa-editor/nodes';
import applyDevTools from 'prosemirror-dev-tools';
import SayController from '@lblod/ember-rdfa-editor/core/say-controller';
import { inject as service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import { type PluginConfig } from '@lblod/ember-rdfa-editor';
import { header_demo } from '../nodes/header-demo-backup';

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

      text,
    },
    marks: {},
  });

  @tracked plugins: PluginConfig = [];

  @tracked nodeViews = (controller: SayController) => {
    return {};
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
