var Mocks = Mocks || {};

Mocks.matchers = {

  toEqualData: function(expected) {
    return angular.equals(this.actual, expected);
  }

}
