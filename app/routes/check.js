var CheckRoute = Ember.Route.extend({

  model : function(params){
    // Need to save params.check_id so that we have it in setupController
    this.set('checkId',params.check_id);
    return params.check_id;
  },

  
  setupController : function(model,controller){
    this._super(model,controller);

    // Since we can't pull JSON for a single check we need to grab the
    // array from the checks controller and filter it manually.
    var checkId = this.get('checkId');
    var checks = this.controllerFor('checks');
    var check = checks.filter(function(item){
      return item.get('id') === checkId;
    })[0];
    this.controller.set('model',check);

  }

});

export default CheckRoute;
