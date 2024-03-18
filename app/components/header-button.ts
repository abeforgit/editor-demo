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

    const heading = this.args.controller.schema.nodes['header_demo'];
    const { selection } = this.controller.mainEditorState;
    const { $from, to } = selection;
    return $from.parent.type === heading && to <= $from.end();
  }
  @action
  toggleHeader() {
    if (!this.isHeader) {
      // turn on header

      const heading = this.args.controller.schema.nodes['header_demo'];
      if (!heading) {
        return;
      }
      this.controller.doCommand(setBlockType(heading));
    } else {
      const paragraph = this.args.controller.schema.nodes['paragraph'];
      if (!paragraph) {
        return;
      }
      // turn off header
      this.controller.doCommand(setBlockType(paragraph));
    }
    // ??
  }
}
