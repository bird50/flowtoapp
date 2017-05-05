//flowtomap
angular.module('flowtomap',['ngRoute','lbServices','flowtomodule'])
.controller('map', function($scope, User, $location,flowtoMsg,Media) {
	if($scope.islogin){
		$scope.uid=User.getCurrentId();
		User.findById({"id":$scope.uid});
	}
})
.config(function(LoopBackResourceProvider) {

    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    //LoopBackResourceProvider.setUrlBase('http://192.168.59.103:3001/api');
LoopBackResourceProvider.setUrlBase('http://bid.rid.go.th:3001/api');
});


