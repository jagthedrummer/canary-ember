var MeasurementsControllerMixin = Ember.Mixin.create({

  needs : ['measurements'],

  currentDataName : Ember.computed.alias('controllers.measurements.currentDataName'),
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
  setCurrentDataName : function(name){
    this.get('controllers.measurements').setCurrentDataName(name);
  }

});

export default MeasurementsControllerMixin;
