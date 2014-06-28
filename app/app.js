import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

if (ENV.APP.USE_CUSTOM_HOSTS) {
	$.get('canary-hosts.json').done(function(data){
	  //Ember.Logger.log(data);
	  ENV.APP.CANARY_API_HOST = data.api;
	  ENV.APP.CANARY_CHECKS_HOST = data.checks;
	}).fail(function(){
	  //we ain't got one!
	  Ember.Logger.log('use default canary hosts!');
	});
}

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'canary-ember', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'canary-ember');

export default App;
