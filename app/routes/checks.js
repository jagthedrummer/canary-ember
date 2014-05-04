var ChecksRoute = Ember.Route.extend({

  model : function(){
    return this.store.find('check');
  }

});

export default ChecksRoute;
