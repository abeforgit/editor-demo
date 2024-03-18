import { module, test } from 'qunit';
import { setupRenderingTest } from 'editor-demo/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | header-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<HeaderButton />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <HeaderButton>
        template block text
      </HeaderButton>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
