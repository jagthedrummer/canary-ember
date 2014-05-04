var Router = Ember.Router.extend({
  location: 'hash'//'auto'
});

Router.map(function() {
  this.resource('check',{path:'/:check_id'});
});

export default Router;
