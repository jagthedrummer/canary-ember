var CheckRoute = Ember.Route.extend({

  model : function(params){
    var checks = this.controllerFor('checks');
    var check = checks.filter(function(item, index, self){
      return item.get('id') === params.check_id;
    })[0];
    return check;
  }

});

export default CheckRoute;
