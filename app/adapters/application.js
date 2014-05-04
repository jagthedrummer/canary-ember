export default DS.RESTAdapter.extend({
  host : 'https://s3.amazonaws.com/',
  namespace : 'canary-public-data',
  buildURL: function(record, suffix){
    return this._super(record, suffix) + ".json";
  }
});
