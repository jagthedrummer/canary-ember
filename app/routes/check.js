var CheckRoute = Ember.Route.extend({

  model : function(params){
    var checks = this.controllerFor('checks');
    var check = checks.filter(function(item, index, self){
      return item.get('id') === params.check_id;
    })[0];
    return check;
  },

  setupController : function(model,controller){
    this._super(model,controller);
    var measurementController = this.controllerFor('measurements');
    this.store.find('measurement',{check_id:model.get('id')}).then(function(measurements){
      measurementController.set('model',measurements);
    });
  }

});

export default CheckRoute;
