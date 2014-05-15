var MeasurementsRoute = Ember.Route.extend({

  
  model : function(){
    //var check = this.controllerFor('check');
    //return this.store.find('measurement',{check_id : check.get('id')});
    return []; // make sure the controller alwyas has a collection
  },

  setupController : function(model,controller){
    this._super(model,controller);
    this.controller.resetRunningTotals();
  }

});

export default MeasurementsRoute;
