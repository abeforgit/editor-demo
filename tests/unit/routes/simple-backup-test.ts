import { module, test } from 'qunit';
import { setupTest } from 'editor-demo/tests/helpers';

module('Unit | Route | simple-backup', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:simple-backup');
    assert.ok(route);
  });
});
