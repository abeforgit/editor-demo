import { type NodeSpec } from '@lblod/ember-rdfa-editor';
import { PNode } from '@lblod/ember-rdfa-editor';
export const header_demo: NodeSpec = {
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'h1' }],
  toDOM(node: PNode) {
    return ['h1', 0];
  },
};
