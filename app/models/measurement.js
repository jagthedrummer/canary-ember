var Measurement = DS.Model.extend({
  "total_time": DS.attr(),
  "starttransfer_time": DS.attr(),
  "connect_time": DS.attr(),
  "namelookup_time": DS.attr(),
  "location": DS.attr(),
  "t": DS.attr(),
  "exit_status": DS.attr(),
  "http_status": DS.attr(),
  "local_ip": DS.attr(),
  "primary_ip": DS.attr(),
  "check_id" : DS.attr() // not really an att...
});

export default Measurement;
