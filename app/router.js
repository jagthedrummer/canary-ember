var Router = Ember.Router.extend({
  location: CanaryEmberENV.locationType
});

Router.map(function() {

  this.resource('checks',function(){
    this.resource('check',{path:'/:check_id'},function(){
      this.resource('measurements',function(){
        this.route('timing');
        this.route('response_codes');
      });
    });
  });
    
});

export default Router;
