var MeasurementsController = Ember.ArrayController.extend({

  //model : [],

  sortProperties : ['t'],

  sortAscending : true,

  filterLineChartData : function(source,dataAtt,title){
    //console.log("*****");
    var values = this.get(source).map(function(item){
      //console.log(day.get(dataAtt));
      //console.log(day.get('day'));
      var t = item.get('t');
            //console.log(day);
      return {
        x : t,
        y : item.get(dataAtt),
        key : item.get('id')
      }
    });
    //console.log('%%%%%');
    //console.log(values);
    return [{key : title, values : values}];

  },

  totalTimeData : function(){
  },

  locations : function(){
    var locations = [];
    this.get('content').forEach(function(item){
      locations.push(item.get('location'))
    });
    return locations;
  }.property('model'),

  uniqLocations : function(){
    return this.get('locations').uniq();
  }.property('model'),

  doams2 : function(){
    return this.get('arrangedContent').filterBy('location','do-ams2');
  }.property('model'),

  dosf1 : function(){
    return this.get('arrangedContent').filterBy('location','do-sf1');
  }.property('model'),

  dony2 : function(){
    return this.get('arrangedContent').filterBy('location','do-ny2');
  }.property('model'),

  dosin1 : function(){
    return this.get('arrangedContent').filterBy('location','do-sin1');
  }.property('model'),

  setDoams2LineData : function(){
    this.setLocationLineData('doams2','doams2LineData');
  }.observes('model'),

  setDosf1LineData : function(){
    this.setLocationLineData('dosf1','dosf1LineData');
  }.observes('model'),

  setDony2LineData : function(){
    this.setLocationLineData('dony2','dony2LineData');
  }.observes('model'),

  setDosin1LineData : function(){
    this.setLocationLineData('dosin1','dosin1LineData');
  }.observes('model'),


  setLocationLineData : function(location,targetAtt){
    if( this.get('content.length') == 0 ){
      return;
    }
    var data = [];
    data.push(this.filterLineChartData(location,'total_time','Total')[0]);
    data.push(this.filterLineChartData(location,'starttransfer_time','Start Transfer')[0]);
    data.push(this.filterLineChartData(location,'connect_time','Connect')[0]);
    data.push(this.filterLineChartData(location,'namelookup_time','Name Lookup')[0]);
    this.set(targetAtt,data);
  },

  setAllTheData : function(){
    if( this.get('content.length') == 0 ){
      return;
    }
    var data = [];
    data.push(this.filterLineChartData('doams2','total_time','do-ams2')[0]);
    //data.push(this.filterLineChartData('doams2','starttransfer_time','Start Transfer Time : do-ams2')[0]);
    //data.push(this.filterLineChartData('doams2','connect_time','Connect Time : do-ams2')[0]);
    //data.push(this.filterLineChartData('doams2','namelookup_time','Name Lookup Time : do-ams2')[0]);
    
    data.push(this.filterLineChartData('dosf1','total_time','do-sf1')[0]);
    //data.push(this.filterLineChartData('dosf1','starttransfer_time','Start Transfer Time : do-sf1')[0]);
    //data.push(this.filterLineChartData('dosf1','connect_time','Connect Time : do-sf1')[0]);
    //data.push(this.filterLineChartData('dosf1','namelookup_time','Name Lookup Time : do-sf1')[0]);
    
    data.push(this.filterLineChartData('dony2','total_time','do-ny2')[0]);
    //data.push(this.filterLineChartData('dony2','starttransfer_time','Start Transfer Time : do-ny2')[0]);
    //data.push(this.filterLineChartData('dony2','connect_time','Connect Time : do-ny2')[0]);
    //data.push(this.filterLineChartData('dony2','namelookup_time','Name Lookup Time : do-ny2')[0]);
    
    data.push(this.filterLineChartData('dosin1','total_time','do-sin1')[0]);
    //data.push(this.filterLineChartData('dosin1','starttransfer_time','Start Transfer Time : do-sin1')[0]);
    //data.push(this.filterLineChartData('dosin1','connect_time','Connect Time : do-sin1')[0]);
    //data.push(this.filterLineChartData('dosin1','namelookup_time','Name Lookup Time : do-sin1')[0]);
    


    this.set('allTheData',data);
  }.observes('model'),

  updateContent : function(){
    var _this = this;
    this.store.find('measurement',{check_id:this.get('check_id')}).then(function(measurements){
      _this.set('model',measurements);
    });
    var timeout = this.get('timeout');
    if(timeout){
      clearTimeout(timeout);
    }
    timeout = setTimeout($.proxy(this.updateContent,this),5 * 1000);
    this.set('timeout',timeout);
  }


});

export default MeasurementsController;
