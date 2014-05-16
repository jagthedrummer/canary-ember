var MeasurementsControllerMixin = Ember.Mixin.create({

  needs : ['measurements'],

  currentLocation : Ember.computed.alias('controllers.measurements.currentLocation'),
  currentLineData : Ember.computed.alias('controllers.measurements.currentLineData'),
  currentPrimaryIpPieData : Ember.computed.alias('controllers.measurements.currentPrimaryIpPieData'),
  currentLocalIpPieData : Ember.computed.alias('controllers.measurements.currentLocalIpPieData'),
  currentHttpPieData : Ember.computed.alias('controllers.measurements.currentHttpPieData'),
  currentExitPieData : Ember.computed.alias('controllers.measurements.currentExitPieData'),
  currentLocationPieData : Ember.computed.alias('controllers.measurements.currentLocationPieData'),
  masterLocationData : Ember.computed.alias('controllers.measurements.masterLocationData'),
  masterLocationDataArray : Ember.computed.alias('controllers.measurements.masterLocationDataArray'),
  isOverview : Ember.computed.alias('controllers.measurements.isOverview'),
  uniqLocations : Ember.computed.alias('controllers.measurements.uniqLocations'),
  runningTotals : Ember.computed.alias('controllers.measurements.runningTotals'),
  currentRunningTotalsData : Ember.computed.alias('controllers.measurements.currentRunningTotalsData'),
  currentRunningTotalsHttpData : Ember.computed.alias('controllers.measurements.currentRunningTotalsHttpData'),
  setCurrentDataName : function(name){
    this.get('controllers.measurements').setCurrentDataName(name);
  }

});

export default MeasurementsControllerMixin;
