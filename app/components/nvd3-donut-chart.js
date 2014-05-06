var Nvd3DonutChartComponent = Ember.Component.extend({
  
  data : [],

  didInsertElement: function() {
    Ember.run.once(this, 'initChart');
  },
  
  sampleData : [
      { 
        "label": "One",
        "value" : 29.765957771107
      } , 
       
      { 
        "label": "42",
        "value" : 32.807804682612
      }
      
    ],

  initChart : function() {
    var data = this.get('data') || this.get('sampleData');
    var elem = this.$('svg')[0];
    var _this = this;
    nv.addGraph(function() {
      var chart = nv.models.pieChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .showLabels(true)
          .labelType('percent')
          .donut(true);

        d3.select( elem )
            .datum(data)
            .transition().duration(350)
            .call(chart);

      _this.set('chart',chart);
      return chart;
    });
  },

  updateChart : function(){
    console.log('calling update!');
    if (this.get('chart') && this.get('data') ) {
      console.log('actually updating');
      console.log(this.get('data'));
      d3.select(this.$('svg')[0])
        .datum(this.get('data'))
        .transition().duration(300)
        .call(this.get('chart'));
    }
  }.observes('data')

});

export default Nvd3DonutChartComponent;
