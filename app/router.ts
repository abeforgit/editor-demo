import EmberRouter from '@ember/routing/router';
import config from 'editor-demo/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('simple');
  this.route('full');
  this.route('simple-backup');
});
