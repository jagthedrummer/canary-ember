export default DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    return {
      'checks' : payload
    };
  }
});
