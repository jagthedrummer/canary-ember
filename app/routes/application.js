var ApplicationRoute = Ember.Route.extend({
  afterModel : function(){
    this.transitionTo('checks');
  }
});

export default ApplicationRoute;
