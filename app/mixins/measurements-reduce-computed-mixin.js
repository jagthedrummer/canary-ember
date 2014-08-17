var MeasurementsReduceComputed = function (dependentKey) {
  return Ember.reduceComputed(dependentKey, {
    initialValue: -Infinity,

    addedItem: function (accumulatedValue, item, changeMeta, instanceMeta) {
      return accumulatedValue;
      //return Math.max(accumulatedValue, item);
    },

    removedItem: function (accumulatedValue, item, changeMeta, instanceMeta) {
      return accumulatedValue;
      if (item < accumulatedValue) {
        return accumulatedValue;
      }
    }
  });
};

export default MeasurementsReduceComputed;
