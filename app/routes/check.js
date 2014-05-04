var CheckRoute = Ember.Route.extend({

  model : function(params){
    this.set('checkId',params.check_id);
    /*
    var checks = this.controllerFor('checks');
    var check = checks.filter(function(item, index, self){
      return item.get('id') === params.check_id;
    })[0];
    return check;
    */
    return params.check_id;
  },

  setupController : function(model,controller){
    this._super(model,controller);


    var checkId = this.get('checkId');
    var checks = this.controllerFor('checks');
    var check = checks.filter(function(item){
      return item.get('id') === checkId;
    })[0];
    this.controller.set('model',check);

    var measurementController = this.controllerFor('measurements');
    this.store.find('measurement',{check_id:model.get('id')}).then(function(measurements){
      measurementController.set('model',measurements);
    });
  }

});

export default CheckRoute;
