var MeasurementsRoute = Ember.Route.extend({

  model : function(params){
    var check = this.controllerFor('check');
    console.log('check',check);
    console.log("params",params);
    console.log("other", this.get('controllers.check'));
    return this.store.find('measurement',{check_id : check.get('id')});
  }

});

export default MeasurementsRoute;
