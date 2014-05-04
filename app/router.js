var Router = Ember.Router.extend({
  location: 'hash'//'auto'
});

Router.map(function() {

  this.resource('checks',function(){
    this.resource('check',{path:'/:check_id'},function(){
      this.resource('measurements');
    });
  });
    
});

export default Router;
