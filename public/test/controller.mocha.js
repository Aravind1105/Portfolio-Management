describe('pwdCtrl',function(){
  beforeEach(module('app'));
  var $controller;
  beforeEach(inject(function(_$controller_){
    $controller=_$controller_;
  }));
  describe('$scope grade',function(){
    it('should sets the strength of the password',function(){
    var $scope={};
    var controller=$controller('pwdCtrl',{$scope:$scope});
    $scope.password="uma_pk";
    $scope.grade();
    except($scope.strength).to.equal('Weak');
  });
 });
});
