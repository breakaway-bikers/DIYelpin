angular.module('yelpin.services', [])

.factory('ViewPost', function() {
  var savedData = {};

  var set = function(data) {
    savedData = data;
  };

  var get = function() {
    return savedData;
  };

  return {
    set: set,
    get: get,
  };
});
