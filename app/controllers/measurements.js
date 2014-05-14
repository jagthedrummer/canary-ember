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
    
    /*
    if( this.get('isOverview') ){
      this.set('currentLineData',this.buildOverviewLineData());
      this.set('currentPrimaryIpPieData',this.filterPieChartData('content','primary_ip'));
      this.set('currentLocalIpPieData',this.filterPieChartData('content','local_ip'));
      this.set('currentExitPieData',this.filterPieChartData('content','exit_status'));
      this.set('currentHttpPieData',this.filterPieChartData('content','http_status'));
      this.set('currentLocationPieData',this.filterPieChartData('content','location'));
    }else{
      var location = this.get('currentLocation').replace('-','');
      this.set('currentLineData',this.buildLocationLineData(location));
      this.set('currentPrimaryIpPieData',this.filterPieChartData(location,'primary_ip'));
      this.set('currentLocalIpPieData',this.filterPieChartData(location,'local_ip'));
      this.set('currentExitPieData',this.filterPieChartData(location,'exit_status'));
      this.set('currentHttpPieData',this.filterPieChartData(location,'http_status'));
    }
   */
  }.observes('masterLocationData','currentLocation'),

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
    });
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
      location : {}
    };
  },

  filterLineChartData : function(source,dataAtt,title){
    var values = this.get(source).map(function(item){
      var t = item.get('t');
      return {
        x : t,
        y : item.get(dataAtt),
        key : item.get('id')
      }
    });
    return [{key : title, values : values}];

  },

  filterPieChartData : function(source,dataAtt){
    var data = [];
    var map = {};
    this.get(source).forEach(function(item){
      var info = map[item.get(dataAtt)];
      if(!info){
        info = {"label":item.get(dataAtt),value:0};
        map[item.get(dataAtt)] = info;
        data.push(info);
      }
      info.value += 1;
    });
    return data;
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
    
    this.setLocationPieData('doams2','exit_status','doams2ExitPieData');
    this.setLocationPieData('doams2','http_status','doams2HttpPieData');
    this.setLocationPieData('doams2','local_ip','doams2LocalIpPieData');
    this.setLocationPieData('doams2','primary_ip','doams2PrimaryIpPieData');
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

  setLocationPieData : function(location,sourceAtt,targetAtt){
    if( this.get('content.length') == 0 ){
      return;
    }
    var data = this.filterPieChartData(location,sourceAtt);
    this.set(targetAtt,data);
  },

  buildLocationLineData : function(location){
    var data = [];
    data.push(this.filterLineChartData(location,'total_time','Total')[0]);
    data.push(this.filterLineChartData(location,'starttransfer_time','Start Transfer')[0]);
    data.push(this.filterLineChartData(location,'connect_time','Connect')[0]);
    data.push(this.filterLineChartData(location,'namelookup_time','Name Lookup')[0]);
    return data;
  },


  setLocationLineData : function(location,targetAtt){
    if( this.get('content.length') == 0 ){
      return;
    }
    this.set(targetAtt,this.buildLocationLineData(location));
  },

  buildOverviewLineData : function(){
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
    
    return data;
  },

  setAllTheData : function(){
    if( this.get('content.length') == 0 ){
      return;
    }
    
    this.set('allTheData',this.buildOverviewLineData());
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
    timeout = setTimeout($.proxy(this.updateContent,this),3 * 1000);
    this.set('timeout',timeout);
  }


});

export default MeasurementsController;
