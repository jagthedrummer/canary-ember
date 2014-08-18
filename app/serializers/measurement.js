export default DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    return {
      'measurements' : payload
    };
  }
});
