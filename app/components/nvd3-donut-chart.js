var Nvd3DonutChartComponent = Ember.Component.extend({
  
  data : [],

  height : "330px",

  didInsertElement: function() {
    Ember.run.once(this, 'initChart');
  },
  
  sampleData : [
      /*{ 
        "label": "One",
        "value" : 29.765957771107
      } , 
       
      { 
        "label": "42",
        "value" : 32.807804682612
      }*/
    ],

  initChart : function() {
    var data = this.get('data') || this.get('sampleData');
    var elem = this.$('svg')[0];
    this.$('svg').css({height:this.get('height')});
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
    if (this.get('chart') && this.get('data') ) {
      this.$('svg.donut').css({height:this.get('height')});
      d3.select(this.$('svg')[0])
        .datum(this.get('data'))
        .transition().duration(300)
        .call(this.get('chart'));
    }
  }.observes('data')

});

export default Nvd3DonutChartComponent;
