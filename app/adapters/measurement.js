export default DS.RESTAdapter.extend({
  host : 'https://api.canary.io',
  namespace : 'checks',
  findQuery: function(store, type, query) {
    var url = this.buildURL('');
    url += "/" + query.check_id + "/measurements";
    return this.ajax(url, 'GET', { });
  }
});
