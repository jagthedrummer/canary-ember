var MeasurementsRoute = Ember.Route.extend({

  
  model : function(){
    return []; // make sure the controller alwyas has a collection
  },

  setupController : function(model,controller){
    this._super(model,controller);
    this.controller.resetRunningTotals();
    this.controller.updateContent();
  }

});

export default MeasurementsRoute;
