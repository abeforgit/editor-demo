import { action } from '@ember/object';
import Component from '@glimmer/component';
import { type SayController } from '@lblod/ember-rdfa-editor';
import { setBlockType } from '@lblod/ember-rdfa-editor/commands';

interface Args {
  controller: SayController;
}
export default class HeaderButtonComponent extends Component<Args> {
  get controller() {
    return this.args.controller;
  }
  get isHeader() {
    return false;
  }
  @action
  toggleHeader() {
    if (!this.isHeader) {
      // turn on header
    } else {
      // turn off header
    }
    // ??
  }
}
