var MeasurementsController = Ember.ArrayController.extend({

  //model : [],

  queryParams: ['currentLocation'],

  sortProperties : ['t'],

  sortAscending : true,

  currentLocation : 'all', // either 'overview' or a location

  setCurrentDataName : function(name){
    this.set('currentLocation',name);
  },

  

  isOverview : function(){
    return (this.get('currentLocation') == 'all');
  }.property('currentLocation'),

  setCurrentLineData : function(){
    if( this.get('content.length') == 0 ){
      return;
    }
    var masterLocationData = this.get('masterLocationData');
    var name = this.get('currentLocation');
    if( name == 'overview'){
      name = 'all';
    }
    var locationData = masterLocationData[name];
    this.set('currentLineData',locationData.combinedTiming);
    
    this.set('currentPrimaryIpPieData',locationData.primary_ip);
    this.set('currentLocalIpPieData',locationData.local_ip);
    this.set('currentExitPieData',locationData.exit_status);
    this.set('currentHttpPieData',locationData.http_status);
    this.set('currentLocationPieData',locationData.location);
    
  }.observes('masterLocationData','currentLocation'),

 
  currentRunningTotalsData : [],

  

  updateRunningTotals : function(){
    var runningTotals = this.get('runningTotals') || {};
    var masterLocationData = this.get('masterLocationData');
    var _this = this;

    var keys = Object.keys(masterLocationData).sort();
    keys.forEach(function(locationName) {
      var locationData = masterLocationData[locationName];
      var totalsData =  runningTotals[locationName] || (runningTotals[locationName] = _this.createRunningTotalsObject(locationName));
      totalsData.measurements.pushObject({series:0,x:((new Date()).getTime()/1000),y: locationData.runningTotalData.measurements});
      if(totalsData.measurements.length > 20){
        totalsData.measurements.shiftObject();
      }
    });

    this.set('runningTotals',runningTotals);

    if(runningTotals.all.measurements.length < 2){ return; }
    this.setCurrentRunningTotalsData();

  }.observes('masterLocationData'),

  
  resetRunningTotals : function(){
    this.set('runningTotals',[]);
    this.set('currentRunningTotalsData',[]);
  }.observes('currentLocation'),

  setCurrentRunningTotalsData : function(){
    var runningTotals = this.get('runningTotals');
    var data = [];

    var keys = Object.keys(runningTotals).sort();
    keys.forEach(function(locationName) {
      data.push({ key : locationName,
               values : runningTotals[locationName].measurements.concat([])
             });
    });
            
    this.set('currentRunningTotalsData',data);
  },

  createRunningTotalsObject : function(name){
    return {
      name : name,
      measurements : Ember.A()//Ember.A([{key : 'Measurements', values : Ember.A()}])
    };
  },


  // Make one pass through the batch and extract various things
  buildMasterLocationData : function(){
    var locations = {};
    var allData = locations['all'] = this.createLocationDataObject('all');
    var _this = this;
    var pieAttNames = ['local_ip','primary_ip','exit_status','http_status','location'];
    var lineAttNames = ['total_time','starttransfer_time','connect_time','namelookup_time'];

    this.get('content').forEach(function(item){
      var locationName = item.get('location');
      var locationData = locations[locationName];
      if(!locationData){
        locationData = locations[locationName] = _this.createLocationDataObject(locationName);
      }
      var t = item.get('t');

      allData.runningTotalData.measurements += 1;
      locationData.runningTotalData.measurements += 1;

      lineAttNames.forEach(function(attName){
        allData[attName].values.unshift({x:t,y:item.get(attName)});
        locationData[attName].values.unshift({x:t,y:item.get(attName)});
      });

      pieAttNames.forEach(function(attName){
        _this.handlePieCount(allData,attName,item);
        _this.handlePieCount(locationData,attName,item);
      });

    });

    var keys = Object.keys(locations).sort();
    var allCombinedData = [];
    keys.forEach(function(locationName) {
      var locationData = locations[locationName];
      locationData.combinedTiming = [
        locationData.total_time,
        locationData.starttransfer_time,
        locationData.connect_time,
        locationData.namelookup_time
      ];

      if(locationName != 'all'){
        allCombinedData.push( {"key":locationName, values:  locationData.total_time.values});
      }

      pieAttNames.forEach(function(attName){
        var map = locationData[attName];
        var data = [];
        var mapKeys = Object.keys(map).sort();
        mapKeys.forEach(function(mapKey){
          if(map[mapKey]){
            data.push(map[mapKey]);
          }
        });
        locationData[attName] = data;
      });
    }); // keys.forEach
    locations.all.combinedTiming = allCombinedData;
    this.set('masterLocationData',locations);
  }.observes('model'),

  handlePieCount : function(locationData,attName,item){
    var map = locationData[attName];
    var info = map[item.get(attName)];
    if(!info){
      info = {"label":item.get(attName),value:0};
      map[item.get(attName)] = info;
    }
    info.value += 1;
  },

  masterLocationDataArray : function(){
    var locationData = this.get('masterLocationData');
    if(!locationData){
      return [];
    }
    var keys = Object.keys(locationData).sort();

    var values = keys.map(function(v) { return locationData[v]; });
    return values;
  }.property('masterLocationData'),

  createLocationDataObject : function(locationName){
    return {
      name : locationName,
      total_time : {key : 'Total', values : []},
      starttransfer_time : {key : 'Start Transfer', values : []},
      connect_time : {key : 'Connect', values : []},
      namelookup_time : {key : 'Name Lookup', values : []},
      primary_ip : {},
      local_ip : {},
      exit_status : {},
      http_status : {},
      location : {},
      runningTotalData : {
        measurements : 0
      }
    };
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
    return this.get('locations').uniq().sort();
  }.property('model'),


  updateContent : function(){
    var _this = this;
    this.store.find('measurement',{check_id:this.get('check_id')}).then(function(measurements){
      _this.set('model',measurements);
    });
    var timeout = this.get('timeout');
    if(timeout){
      clearTimeout(timeout);
    }
    timeout = setTimeout($.proxy(this.updateContent,this),3 * 1000);
    this.set('timeout',timeout);
  }


});

export default MeasurementsController;
