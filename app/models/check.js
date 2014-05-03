var Check = DS.Model.extend({
  url : DS.attr(),
  name : function(){
    try{
      return this.get('url').match(/https?:\/\/([^\/]*)[\/]?[.*]?/)[1];
    }catch(err){
      return "Unknown (" + this.get('url') + ")";
    }
  }.property('url')
});

export default Check;
