'use strict';

describe('Service: niiuSyncer', function () {

  // load the service's module
  //do these things before every test
  beforeEach(module('niiuWebappApp'));

  // instantiate service
  var niiuSyncer;
  var $rootScope;
  // before each test we start with a new syncer service and inject anything else you might need
  beforeEach(inject(function (_niiuSyncer_,$injector) {
    niiuSyncer = _niiuSyncer_;
    //making a rootscope in the test pulling it out of angular
    $rootScope=$injector.get('$rootScope');
    console.log('do we have a service?',niiuSyncer);

  }));

  it('should do something', function () {
    //compare whats in the expect to whats in the toBe
    expect(niiuSyncer).toBe(true);
  });

  describe('.createArticleObject', function() {
      it('should return an articleObject', function() {
          

          //Assemble 
          $rootScope.user={apiKey:343434,contentProfile:{userID:12,id:15}};
          var guid=63546365,apiKey=76576567,last_sync_time='2014-05-21 22:51:00',userID=1123,profileID=121;
          //Act
          var articleTest = niiuSyncer.createArticleObject(guid,apiKey,last_sync_time,userID,profileID);
          //Assert
          
          //expect(articleTest.name).toBe("Default Content Profile");
              //doesnt work wrong object structure
          expect(articleTest.data.contentProfile.name).toBe("Default Content Profile");
              //works!!

      });


  });


});
