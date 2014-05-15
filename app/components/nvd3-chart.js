var Nvd3ChartComponent = Ember.Component.extend({

  chart : null,
  height : "330px",
  showLegend : true,
  initChart : function(){
    var _this = this;
    nv.addGraph(function() {
      var chart = nv.models.lineChart()
                    .margin({left: 50, right:30})  //Adjust chart margins to give the x-axis some breathing room.
                    .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                    .transitionDuration(350)  //how fast do you want the lines to transition?
                    .showLegend(_this.get('showLegend'))       //Show the legend, allowing users to turn on/off line series.
                    .showYAxis(true)        //Show the y-axis
                    .showXAxis(true)        //Show the x-axis
      ;

      
      chart.xAxis
          .tickFormat(function(d) { 
            return d3.time.format('%X')(new Date(d * 1000)) 
      });

      chart.yAxis     //Chart y-axis settings
          //.axisLabel('Count')
          .tickFormat(d3.format('.02f'));
      
      /* Done setting the chart up? Time to render it!*/
      //var myData = sinAndCos();   //You need data...

      //d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
      //    .datum(myData)         //Populate the <svg> element with chart data...
      //    .call(chart);          //Finally, render the chart!

      //Update the chart when window resizes.
      nv.utils.windowResize(function() { chart.update() });
      _this.set('chart',chart);
      _this.updateChart();
      return chart;
    });

    /*
    nv.addGraph(function() {
      var chart = nv.models.lineWithFocusChart();
      
      chart.xAxis
          .tickFormat(function(d) { 
            return d3.time.format('%x')(new Date(d)) 
      });

      chart.x2Axis
          .tickFormat(function(d) { 
            return d3.time.format('%x')(new Date(d)) 
      });

      chart.yAxis
          .tickFormat(d3.format(',.2f'));

      chart.y2Axis
          .tickFormat(d3.format(',.2f'));

      nv.utils.windowResize(chart.update);

      _this.set('chart',chart);
      _this.updateChart();
      return chart;
    });
   */
  },

  updateChart : function(){
    if (this.get('chart') && this.get('data') ) {
      this.$('svg.line').css({height:this.get('height')});
      //console.log( this.get('data') );
      d3.select(this.$('svg.line')[0])
          .datum(this.get('data'), function(d) { 
            //console.log(d);
            return d.x; 
          })
          .transition().duration(300)
          .call(this.get('chart'));
    }else{
      //console.log('bailing out');
      //Ember.run.next(this,'initChart');
    }
  }.observes('data'),

  didInsertElement: function() {
    Ember.run.once(this, 'initChart');
  }

});

export default Nvd3ChartComponent;
