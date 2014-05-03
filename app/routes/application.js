var ApplicationRoute = Ember.Route.extend({
  setupController : function(model,controller){
    this._super(model,controller);
    //this.store.find('check').then(function(checks){
      //console.log('found some checks',checks);
    //});
  }
});

export default ApplicationRoute;
