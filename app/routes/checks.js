var ChecksRoute = Ember.Route.extend({

  model : function(){
    return this.store.find('check');
  },

  setupController : function(model,controller){
    this._super(model,controller);
  }

});

export default ChecksRoute;
