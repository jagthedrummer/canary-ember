var Router = Ember.Router.extend({
  location: 'hash'//'auto'
});

Router.map(function() {
  this.resource('check',{path:'/checks/:check_id'},function(){
    this.resource('measurements');
  });
});

export default Router;
