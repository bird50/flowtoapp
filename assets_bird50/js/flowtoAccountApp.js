//flowtoAccountApp
angular.module('flowtoAccountApp',['ngRoute','lbServices','flowtomodule','angularFileUpload','ngMaterial'])
.config(
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'mainAccount.html',
        controller: 'profileCtrl'
     //   controllerAs: 'flowtoCtrl'
      })
      .when('/user/:flowtoUserId', {
        templateUrl: 'userAccount.html',
        controller: 'flowtoUserCtrl'
     //   controllerAs: 'flowtoCtrl'
      })
	  .otherwise({
	    template : "<h1>nothing</h1><p>Nothing has been selected</p>"
	});
   /*   .when('/Book/:bookId/ch/:chapterId', {
        templateUrl: 'chapter.html',
        controller: 'ChapterCtrl',
        controllerAs: 'chapter'
      });
*/
    //$locationProvider.html5Mode(true);
})
.config(function(LoopBackResourceProvider,APIsEndPoint) {

    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    //LoopBackResourceProvider.setUrlBase('http://192.168.59.103:3001/api');
	LoopBackResourceProvider.setUrlBase(APIsEndPoint.url);
})
.controller('profileCtrl', function($scope, FlowtoUser,Assignment, $location,$window,flowtoMsg,$mdDialog,flowtoUtil,APP_CFG,FileUploader){
	$scope.word=APP_CFG;
	$scope.uploadBeforeSave=false;
	$scope.click_back=function(){
		flowtoUtil.click_back();
	};
	$scope.click_save=function(){
		//console.log($scope.uploadBeforeSave);
		if($scope.uploadBeforeSave){
			uploader.uploadAll();
		}else{
			FlowtoUser.prototype$updateAttributes({ id: $scope.u.id }, $scope.u);
			console.log('saved');
			 flowtoMsg.alert('Saved !');
		}
	};
	$scope.credentials={};
	$scope.u={}; 
	// for keep user detail
	$scope.islogin=FlowtoUser.isAuthenticated();
	$scope.assignment={};
	//  init upload
	var uploader = $scope.uploader = new FileUploader({
	      scope: $scope,                          // to automatically update the html. Default: $rootScope
	     // url: 'http://192.168.59.103:3001/api/media/'+$scope.media_container_name+'/upload',
		  url:APP_CFG.avatar_url_post,
	      formData: [
	        { key: 'value' }
	      ]
	});
    uploader.onAfterAddingFile = function(item) {
	  // uuid for filename
	  var fileExtension = '.' + item.file.name.split('.').pop();
	  item.file.name = 'avatar_'+$scope.u.email+ fileExtension;
	  $scope.uploadBeforeSave=true;
	  blobToDataURL(item._file, function(dataurl){
	      //console.log(dataurl);
		  if($scope.u.avatar){
			  $scope.u.avatar=dataurl;
			  $scope.$apply();
		  }
	  });
  	};
    uploader.onSuccessItem = function(item, response, status, headers) {
      console.info('Success', response, status, headers);
      $scope.$broadcast('uploadCompleted', item);
	  //console.log('file:'+item.file.name);
	 // $scope.u.avatar=APP_CFG.avatar_url+'/'+item.file.name;
	  console.info('post in :',$scope.u);
	  FlowtoUser.prototype$updateAttributes({ id: $scope.u.id }, $scope.u);
	  flowtoMsg.alert('Saved !');
  	};
	
	// init user
	if($scope.islogin){
		
		FlowtoUser.getCurrent(
			function(data){
				$scope.u=data;
				$scope.u.avatar=flowtoUtil.image_avatar(data.avatar,'images/ic_account_circle_black_48dp_2x.png');
				console.info('logged in :',$scope.u);
				//uploader.url=APIsEndPoint.url+'/profile_upload';
			},
			function(err){
				console.log('not logged yet');
			}
		);
		
	}
	
	
	//define function
	/////////angular file upload
	function blobToDataURL(blob, callback) {
	    var a = new FileReader();
	    a.onload = function(e) {callback(e.target.result);}
	    a.readAsDataURL(blob);
	}
	
}) // end profileCtrl
.controller('viewProfileCtrl', function($scope,flowtoUtil){
	$scope.click_back=function(){
		flowtoUtil.click_back();
	};
	$scope.credentials={};
	$scope.viewUser={}; 
	// for keep user detail
	$scope.islogin=FlowtoUser.isAuthenticated();
	if($scope.islogin){
		FlowtoUser.finById({"id":1}).$promise
		.then(function(data){
			$scope.viewUser=data;
		},function(){
			console.log('cannot find this user');
		});
	}
}) //viewProfileCtrl
.controller('flowtoUserCtrl', function($scope, FlowtoUser, $routeParams,flowtoMsg,$mdDialog,flowtoUtil,APP_CFG){
	var params=$routeParams;
	//console.info("route:",params);
	$scope.user={};
	var filter={
		"Where": {"id":params.flowtoUserId}
	};
	if(params.flowtoUserId){
		FlowtoUser.find(filter).$promise
		.then(function(data){
			console.info("user:",data[0]);
			$scope.user=data[0];
		});
	}
	$scope.click_back=function(){
		flowtoUtil.click_back();
	};
})
;
