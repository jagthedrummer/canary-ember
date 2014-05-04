export default Ember.Route.extend({

  model : function(){
  },

  redirect : function(){
    this.transitionTo('checks');
  }

});
