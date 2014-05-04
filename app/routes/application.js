var ApplicationRoute = Ember.Route.extend({
  setupController : function(model,controller){
    this._super(model,controller);
    var _this = this;
    this.store.find('check').then(function(checks){
      _this.controllerFor('checks').set('model',checks);
    });
  }
});

export default ApplicationRoute;
