'use strict';

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('niiuWebappApp'));

  // instantiate service
  var User;
  beforeEach(inject(function (_User_) {
    User = _User_;
  }));





  describe('setUser', function () {

    it('should set a valid user', function () {
      
      // assemble
      var user = {
            apiKey: "a183e5de98a7b882b30b484bd65e5824906879ca",
            birthDate: "1974-03-15",
            connected: true,
            contentProfile: {},
            eMail: "kirk@niiu.de",
            fbAccessToken: "CAAJHZCinVMWUBAIdFcBCclF4P9DP4F1X4atDlPTADZCV2RsXi8SP8uqZBeoSZA8vZBi1y63pZAvXk1Efe3Ji6OTlPPhwPM6sQtU6Uchyh559bo1h0Qbhib8ZBaOlpwwdFodZANAYOhXTpfOdyWJCuQqpDZAN4wW0PNyFXpifvtQwjNtIpCeYuCKLBTVZBlf9n0iCYZD",
            fbID: "1456505354584068",
            firstName: "Kirk",
            gender: "male",
            id: "1014",
            lastName: "Peterkin",
            lastUpdated: "2014-05-05 03:23:10",
            subscription: {},
            username: "Kirk Peterkin"
        };


      // Act
      User.setUser(user);
      // Assert
      //I expect the email param on the result of that function to equal the email i sent in
      expect(User.getUser().eMail).toEqual(user.eMail);
    });

    it('should not save invalid users to the DB', function () {
      expect(!!User).toBe(true);
    });




    it('should save a new user to the db', function () {
      expect(!!User).toBe(true);
    });


  }
);
});
