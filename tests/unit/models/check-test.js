import { test, moduleForModel } from 'ember-qunit';

moduleForModel('check', 'Check Model');

test('name for http sites',function(){
  var check = this.subject({url : 'http://canary.io'});
  equal(check.get('name'),'canary.io');
});

test('name for https sites',function(){
  var check = this.subject({url : 'https://canary.io/some-other-stuff'});
  equal(check.get('name'),'canary.io');
});

test('name for non http[s] sites',function(){
  var check = this.subject({url : 'ftp://canary.io/some-other-stuff'});
  equal(check.get('name'),'Unknown (ftp://canary.io/some-other-stuff)');
});
