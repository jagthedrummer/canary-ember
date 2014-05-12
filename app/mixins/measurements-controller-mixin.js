var MeasurementsControllerMixin = Ember.Mixin.create({

  needs : ['measurements'],

  currentLineData : Ember.computed.alias('controllers.measurements.currentLineData'),
  currentPrimaryIpPieData : Ember.computed.alias('controllers.measurements.currentPrimaryIpPieData'),
  currentLocalIpPieData : Ember.computed.alias('controllers.measurements.currentLocalIpPieData'),
  currentHttpPieData : Ember.computed.alias('controllers.measurements.currentHttpPieData'),
  currentExitPieData : Ember.computed.alias('controllers.measurements.currentExitPieData'),
  currentLocationPieData : Ember.computed.alias('controllers.measurements.currentLocationPieData')


});

export default MeasurementsControllerMixin;
