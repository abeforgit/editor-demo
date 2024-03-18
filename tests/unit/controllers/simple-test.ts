import { module, test } from 'qunit';
import { setupTest } from 'editor-demo/tests/helpers';

module('Unit | Controller | simple', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:simple');
    assert.ok(controller);
  });
});
