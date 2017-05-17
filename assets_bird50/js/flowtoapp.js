//flowtoapp
angular.module('flowtong',['ngRoute','lbServices','flowtomodule','angularFileUpload','ngAvatar','ngMaterial'])
.controller('indexCtrl',function($scope, FlowtoUser,Assignment, $location,$window,flowtoMsg,APIsEndPoint,$mdDialog) {
	$scope.credentials={};
	$scope.u={}; // for keep user detail
	$scope.islogin=FlowtoUser.isAuthenticated();
	$scope.assignment={};
	if($scope.islogin){
		$scope.uid=FlowtoUser.getCurrentId();
		FlowtoUser.findById({"id":$scope.uid}).$promise
		.then(function(data){
			$scope.u=data;
			console.log(data);
			$scope.assignment=Assignment.findById({"id":data.activateAssignment})
			.$promise.then(function(dat){
				$scope.assignmentName=dat.assignmentName;
			console.log(JSON.stringify(dat));
			});
			//console.log('assignment name:'+JSON.stringify(data));
			//console.log(JSON.stringify($scope.u));
		});
		//$scope.u.userLetter=$scope.u.username.toUpperCase();
		
	}
	$scope.login = function() {
		//console.log($scope.credentials);
		$scope.loginResult = FlowtoUser.login($scope.credentials,
			function(obj) {
				$scope.uid=FlowtoUser.getCurrentId();
				$scope.islogin=FlowtoUser.isAuthenticated();
				flowtoMsg.alert('Login Successful');
			},function(res) {
				$scope.islogin=false;
				console.log('Login miss by'+$scope.credentials.email);
				flowtoMsg.alert('Login Fail!!!');
			}).$promise.then(function(obj1){
				$scope.u=obj1.user;
				//$scope.u.userLetter=obj1.username.charAt(0).toUpperCase();
				$window.location.href = './dash.html';
				return;
			})
			;
			//$scope.token=User.accessTokens({"id":$scope.uid});
			console.log($scope.loginResult);
			//console.log($scope.token);
	};
	
	$scope.logout=function(){
		return FlowtoUser.logout(function(){
			$scope.islogin=FlowtoUser.isAuthenticated();
			console.log('logout');
		});
	};
	
	$scope.register=function(){
		flowtoMsg.alert('ขออภัย ยังไม่เปิดการรับสมัครสมาชิกในตอนนี้');
	};
	
	$scope.msgUsername=function(){
		alert($scope.u.username);
	};
})
.controller('LoginCtrl', function($scope, FlowtoUser,Assignment, $location,$window,flowtoMsg,Media,APIsEndPoint,$mdBottomSheet,$mdDialog) {
	$scope.credentials={};
	$scope.u={}; // for keep user detail
	$scope.islogin=FlowtoUser.isAuthenticated();
	$scope.assignment={};
	if($scope.islogin){
		$scope.uid=FlowtoUser.getCurrentId();
		FlowtoUser.findById({"id":$scope.uid}).$promise
		.then(function(data){
			$scope.u=data;
			$scope.assignment=Assignment.findById({"id":data.activateAssignment})
			.$promise.then(function(dat){
				$scope.assignmentName=dat.assignmentName;
			console.log(JSON.stringify(dat));
			});
			console.log('assignment name:'+JSON.stringify(data));
		});
		//$scope.u.userLetter=$scope.u.username.toUpperCase();
		//console.log($scope.u.userLetter);
		//console.log($scope.u.username);
	}
	$scope.login = function() {
		//console.log($scope.credentials);
		$scope.loginResult = FlowtoUser.login($scope.credentials,
			function(obj) {
				$scope.uid=FlowtoUser.getCurrentId();
				$scope.islogin=FlowtoUser.isAuthenticated();
				flowtoMsg.alert('Login Successful');
			},function(res) {
				$scope.islogin=false;
				console.log('Login miss by'+$scope.credentials.email);
				flowtoMsg.alert('Login Fail!!!');
			}).$promise.then(function(obj1){
				$scope.u=obj1.user;
				//$scope.u.userLetter=obj1.username.charAt(0).toUpperCase();
				$window.location.href = './dash.html';
				return;
			})
			;
			//$scope.token=User.accessTokens({"id":$scope.uid});
			console.log($scope.loginResult);
			//console.log($scope.token);
	};
	
	$scope.logout=function(){
		return FlowtoUser.logout(function(){
			$scope.islogin=FlowtoUser.isAuthenticated();
			console.log('logout');
		});
	};
	
	$scope.register=function(){
		flowtoMsg.alert('ขออภัย ยังไม่เปิดการรับสมัครสมาชิกในตอนนี้');
	};
	
	$scope.msgUsername=function(){
		alert($scope.u.username);
	};
	$scope.create_media_container=function(Cname){
		//var Cname="aaabbbccc";
		var create_container=true;
		Media.getContainer({"container":Cname}).$promise
		.then(
			function(dat){
				//alert('it\'s has!!!');
				create_container= true;
			},function(){
				//alert('not exist');
				return Media.createContainer({"name":Cname}).$promise;
		}).then(
			function(){
				//alert('wooo');
				create_container= true;
			},function(){
				//alert('how bad');
				create_container= false;
			}
		);
		//alert(create_container);
		return create_container;
	};
	///// assignment
	
	$scope.assignments=[];
	$scope.modelassignments = Assignment.find({ 
	  filter: {
		  include:['flowto','flowtoUser'],
	   // where: {
	     // assignmentId: 1
	    //},
		"order":["priority DESC","create_time DESC"],
		limit:1000
	  }
	}).$promise
	.then(function(data){
		//console.log('ass');
		//$scope.assignments=[];
		for (var i = 0; i < data.length; i++) {
			$scope.assignments.push(data[i].toJSON());
		}
		console.log('total assignments:'+i);
		console.log($scope.assignments);
	});
	$scope.refreshAssignment=function(){
		
		$scope.modelassignments = Assignment.find({ 

		  filter: {
			    include:['flowto','flowtoUser'],
		   // where: {
		     // assignmentId: 1
		    //},
			"order":["priority DESC","create_time DESC"],
			limit:1000
		  }
		}).$promise
		.then(function(data){
			console.log('ass');
			$scope.assignments=[];
			for (var i = 0; i < data.length; i++) {
				$scope.assignments.push(data[i].toJSON());
			}
			console.log('total assignments:'+i);
			//console.log($scope.theassignments);
		});
	};
	
	$scope.showListBottomSheet=function(assignmentId,assignmentName){
	    $scope.alert = '';
	       $mdBottomSheet.show({
	         templateUrl: 'bottom-sheet-list-template.html',
	         controller: 'ListBottomSheetCtrl'
	       }).then(function(clickedItem) {
	         $scope.alert = clickedItem['name'] + ' clicked!';
			 
			 if(clickedItem['name']=='Set As Curent Assignment'){
				 $scope.u.activateAssignment=assignmentId;
				 FlowtoUser.prototype$updateAttributes({ id: $scope.uid }, $scope.u);
				 $scope.assignmentName=assignmentName;
				 console.log('set active assignment id to:'+assignmentId);
			 }else if(clickedItem['name']=='Flowto-Map'){
			 	$window.location.href = './map.html?asid='+assignmentId;
			 }
			 
			// $scope.u.$save().then(function(){console.log('user active assignment saved');});
	       }).catch(function(error) {
	         // User clicked outside or hit escape
	       });
	};
	$scope.CreateAssignmentForm=function(ev){
	    $mdDialog.show({
	         controller: 'CreateAssignmentController',
	         templateUrl: 'createAssignment.tmpl.html',
	         parent: angular.element(document.body),
	         targetEvent: ev,
	         clickOutsideToClose:true,
	       //  fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	       })
	       .then(function(answer) {
	         $scope.status = 'You said the information was "' + answer + '".';
			 $scope.refreshAssignment();
	       }, function() {
	         $scope.status = 'You cancelled the dialog.';
	    });
	};
})
.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
	{ name: 'Set As Curent Assignment', icon: 'share-arrow' },
    //{ name: 'Flowto-List ', icon: 'upload' },
    { name: 'Flowto-Map', icon: 'copy' },
	//{ name: 'Share', icon: 'share-arrow' },
	//{ name: 'Edit', icon: 'share-arrow' },
//	{ name: 'Remove', icon: 'share-arrow' },

  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.controller('CreateAssignmentController',function($scope,$mdDialog,Assignment,FlowtoUser){
	$scope.new_assignment={"assignmentName":"","description":"","priority":3};
	$scope.createAssignment=function(){
		//Assignment.
		$scope.uid=FlowtoUser.getCurrentId();
		var thenow=new Date();
		Assignment.create({ 
			"assignmentName":$scope.new_assignment.assignmentName,
			"description":$scope.new_assignment.description,
			"flowtoUserId":$scope.uid,
			"priority":$scope.new_assignment.priority,
			"create_time":thenow
		}).$promise
		.then(function(dat){
			console.info("createAssignment:"+dat);
			$mdDialog.hide(dat);
		},function(err){
			console.log("create flowto fail");
		});
		//console.log('createAssignment ######');
	};
	//$scope.createClick=function(data){
	//	$mdDialog.hide(data);
	//};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
})
.controller('PreviewCtrl', function($scope,$q, FlowtoUser, $location,flowtoMsg,flowtoPreview,FileUploader,Media,Flowto,Assignment,APIsEndPoint,$interval) {	
	// init 
	// 1) check if logedin
	// 2) create folder for upload media by username
	$scope.media_container_name="misstake";
	$scope.islogin=FlowtoUser.isAuthenticated();
	var deferred=$q.defer();
	if($scope.islogin){
		console.log('loged in');
		$scope.uid=FlowtoUser.getCurrentId();
		FlowtoUser.findById({"id":$scope.uid}).$promise
		.then(
			function(data){
				$scope.u=data;
				$scope.media_container_name='v1_'+moment().format('YYYY-MM')+'_'+$scope.u.username;
				$scope.assignment=Assignment.findById({"id":data.activateAssignment})
					.$promise.then(function(dat){
						$scope.assignmentName=dat.assignmentName;
						$scope.assignmentId=dat.id;
						console.log(JSON.stringify(dat));
				});
				return create_media_container($scope.media_container_name);
			},function(){
				$scope.media_container_name='_v1_'+moment().format('YYYY-MM')+'__Anonymous';
				$scope.u={};
				return create_media_container($scope.media_container_name);
			}
		).then(
			function(){
			//$scope.media_url=
				console.log('create container'+$scope.media_container_name);
				uploader.url=APIsEndPoint.url+'/media/'+$scope.media_container_name+'/upload';
			}//function 
		);
		
	}//islogin
	
	
	// 3) preparing uploader
/*  function getThumbnail_blob(blob_data, scale) {
	  var image = new Image();
	  //image.src = 
	  var canvas = document.createElement("canvas");
	  blobToDataURL(blob_data, function(dataurl){
	      //console.log(dataurl);
		  image.src=dataurl;
	      canvas.width = image.width * scale;
	      canvas.height = image.height * scale;
	      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
	      canvas.toBlob(function(blob){
			  return blob;
	      },'image/jpeg');
	  });
  }
  */
	//for process upload status
	
	$scope.progress_upload=0;
	$scope.progress_upload_show=false;
	/*$interval(function() {
		//$scope.progress_upload += 1;
		if($scope.progress_upload >= 100) {
			$scope.progress_upload = 0;
		}
	}, 50);*/
	
	//end prcess upload
	var uploader = $scope.uploader = new FileUploader({
	      scope: $scope,                          // to automatically update the html. Default: $rootScope
	     // url: 'http://192.168.59.103:3001/api/media/'+$scope.media_container_name+'/upload',
		  url: APIsEndPoint.url+'/media/'+$scope.media_container_name+'/upload',
	      formData: [
	        { key: 'value' }
	      ]
	    });
	// ADDING FILTERS
	    uploader.filters.push({
	        name: 'filterName',
	        fn: function (item, options) { // second user filter
	            console.info('filter2');
	            return true;
	        }
	    });

	    // REGISTER HANDLERS
	    // --------------------
		
	    uploader.onAfterAddingFile = function(item) {
  		  item.exif={};
		  item.flowto={};
		  // uuid for filename
		  var fileExtension = '.' + item.file.name.split('.').pop();
		  item.file.name = 'flowto'+new Date().getTime()+Math.random().toString(36).substring(5) + fileExtension;
		  
		  
		  
		  
  		  blobToDataURL(item._file, function(dataurl){
  		      //console.log(dataurl);
  			  item.imgsrc=dataurl;
			  $scope.$apply();
  		  });
    	   var my_exif= loadImage.parseMetaData(
    	        item._file,
    	        function (data) {
    	            //alert('loaded');
					if(!data.exif){
						flowtoMsg.alert('ไม่สามารถอ่านค่าพิกัดได้!!!');
						item.remove();
						//return;
					}else{
  	  				item.exif.lat=parseLatvalue(data.exif.get('GPSLatitude'));
  	  				item.exif.lng=parseLatvalue(data.exif.get('GPSLongitude'));
					item.exif.DateTime= exifDate2moment(data.exif.get('DateTime'));//data.exif.get('DateTime');
					item.flowto.username=$scope.u.username;
					//item.flowto.caption="Hello msg";
					//item.exif.DateTime= data.exif.get('DateTime');//data.exif.get('DateTime');
  					$scope.$apply();
    				//$scope.update_preview(exifDat);
    				//var orientation = data.exif[0x0002];
    				//GPSLatitude
    				//GPSLongitude
    				//DateTimeOriginal
    				//Make   etc Wiko
    				//Model    etc PULT FAB 4G
    				//DateTime
    				//alert('GPSLongitude:'+ GPSLongitude);
					//item._file=getThumbnail_blob(item._file);
					}
    	        },
    	        { 
					maxMetaDataSize: 262144,
					maxWidth: 600,
        maxHeight: 300,
        minWidth: 100,
        minHeight: 50,
        canvas: true
				} // Options
    	    );
			if(!my_exif){
				item.lat=0;
				item.lng=0;
				item.exif.lat=0;
				item.exif.lng=0;
			}
	      console.info('After adding a file', item);
		//console.log(uploader.queue);
	    };/// end onAfterAddingFile
	    // --------------------
	    uploader.onAfterAddingAll = function(items) {
	    //  console.info('After adding all files', items);
	    };
	    // --------------------
	    uploader.onWhenAddingFileFailed = function(item, filter, options) {
	      console.info('When adding a file failed', item);
	    };
	    // --------------------
	    uploader.onBeforeUploadItem = function(item) {
	      console.info('Before upload', item);
		  $scope.progress_upload_show=true;
		  //item._file=getThumbnail_blob(item._file);
		  //1) check if upload path exist then make path
		 // item.url='http://192.168.59.103:3001/api/media/'+$scope.media_container_name+'/upload';
		  //item.url=APIsEndPoint.url+'/media/'+$scope.media_container_name+'/upload';
		  item.url='http://bid.rid.go.th:3001/photo/'+$scope.media_container_name;
		  //item.url=APIsEndPoint.url+'/media/'+$scope.media_container_name+'/upload';
		  //console.log(item.url);
	    };
	    // --------------------
	    uploader.onProgressItem = function(item, progress) {
	      console.info('Progress: ' + progress, item);
		  console.log($scope.media_container_name);
	    };
	    // --------------------
	    uploader.onProgressAll = function(progress) {
	      console.info('Total progress: ' + progress);
		  $scope.progress_upload=progress;
		  
		//  $scope.$apply();
	    };
	    // --------------------
		
	    uploader.onSuccessItem = function(item, response, status, headers) {
	      console.info('Success', response, status, headers);
		  console.log('User:'+item.flowto.username);
		  console.log('Caption:'+item.flowto.caption);
		  $scope.progress_upload_show=false;
	      $scope.$broadcast('uploadCompleted', item);
		  console.log('as_id:'+$scope.assignmentId); $scope.saveuploaded_flowto(item.file.name,$scope.media_container_name,item.flowto.caption,item.exif.DateTime.moment,$scope.uid,$scope.assignmentId,item.exif.lat,item.exif.lng);
	    };
		
		
	    // --------------------
		
	    uploader.onErrorItem = function(item, response, status, headers) {
	      console.info('Error', response, status, headers);
	    };
		
	    // --------------------
	    uploader.onCancelItem = function(item, response, status, headers) {
	      console.info('Cancel', response, status);
	    };
	    // --------------------
	    uploader.onCompleteItem = function(item, response, status, headers) {
	      console.info('Complete', response, status, headers);
	    };
	    // --------------------
	    uploader.onCompleteAll = function() {
	      //console.info('Complete all');
		  uploader.clearQueue();
		  flowtoMsg.alert('Upload Complete all');
		  //console.log(uploader.queue);
	    };
	//var uploader = $scope.uploader = new FileUploader();
	$scope.me="siratis";
	$scope.preview=function(ev){
		//alert('asdf');
		flowtoPreview.flowtoDialog(ev);
	};
	
	
	/// check upload resource exist
	// return promise
	function create_media_container(Cname){
		//var Cname="aaabbbccc";
		var mydeffer=$q.defer();
		var create_container=true;
		Media.getContainer({"container":Cname}).$promise
		.then(
			function(dat){
				//alert('it\'s has!!!');
				create_container= true;
			},function(){
				//alert('not exist');
				return Media.createContainer({"name":Cname}).$promise;
		}).then(
			function(){
				//alert('wooo');
				create_container= true;
				mydeffer.resolve(create_container);
			},function(){
				//alert('how bad');
				create_container= false;
				mydeffer.resolve(create_container);
			}
		);
		console.log('create media container name:\"'+Cname+'\" True or False?:'+create_container);
		return mydeffer.promise;
		//return create_container;
	};
	
	$scope.saveuploaded_flowto=function(media_name,media_container,caption,flowtodate,flowtoUserId,assignmentId,lat,lng){
		//$scope.saveuploaded_flowto=function(){
		/*{
  "id": 0,
  "position": {
    "lat": 0,
    "lng": 0
  },
  "caption": "string",
  "flowtodate": "date",
  "media_container": "string",
  "media_name": "string",
  "flowtoUserId": 0,
  "assignmentId": 0
}
		*/
			$scope.flowto_me = Flowto.create({ 
				"position":{"lat":lat,"lng":lng},
				"caption":caption,
				"flowtodate" :flowtodate,
				"media_name":media_name,
				"media_container":media_container,
				"flowtoUserId":$scope.uid,
				"assignmentId":assignmentId
			}).$promise
			.then(function(dat){
				console.info("createFlowto:"+dat);
			},function(err){
				console.log("create flowto fail");
			});
	};
	////test fileinput
	$scope.prev={
		"lat":"",
		"lng":"",
		"datetime":"",
		"caption":""
	};
	/*
	$('#fileinput').change(function(e){
		rawflowto=e.target.files[0];
	    loadImage.parseMetaData(
	        rawflowto,
	        function (data) {
	            //alert('loaded');
				var lat=parseLatvalue(data.exif.get('GPSLatitude'));
				var lng=parseLatvalue(data.exif.get('GPSLongitude'));
				$scope.prev={
					"lat":lat,
					"lng":lng,
					"datetime":data.exif.get('DateTime')
				};
				$scope.$apply();  
				//$scope.update_preview(exifDat);
				//var orientation = data.exif[0x0002];
				//GPSLatitude
				//GPSLongitude
				//DateTimeOriginal
				//Make   etc Wiko
				//Model    etc PULT FAB 4G
				//DateTime
				//alert('GPSLongitude:'+ GPSLongitude);
	        },
	        { maxMetaDataSize: 262144} // Options
	    );
		loadImage(
			rawflowto,
			function (img) {
				img.height=230;
				img.width=300;
				$("#pics").empty().append(img);
			},
				{maxWidth: 400} // Options
		);
			 
	});// input file change
	*/
	
	function parseLatvalue(latString){
		if((latString==null) || (latString=="")){return "";}
		
		var str=String(latString);
		var ar=str.split(",");
		//console.log(ar);
		var result= parseFloat(ar[0])+parseFloat(ar[1])/60
		+parseFloat(ar[2])/3600;
		//alert(result);
		return result.toFixed(10);	
	}
	
	
	
	
	/////////angular file upload
	function blobToDataURL(blob, callback) {
	    var a = new FileReader();
	    a.onload = function(e) {callback(e.target.result);}
	    a.readAsDataURL(blob);
	}
	function exifDate2moment(exifDate){
	   var dateArray=exifDate.split(' ');
	   var dateArray2=dateArray[0].split(':');
   
	   var dateArray3=dateArray[1].split(':');
	   var dateArray_result=dateArray2.concat(dateArray3);
	   for(i=0;i<dateArray_result.length-1;i++){
	   		dateArray_result[i]=parseInt(dateArray_result[i]);
	   }
	   dateArray_result[1]=dateArray_result[1]-1;
	   var offset = new Date().getTimezoneOffset();
	   //alert(dateArray_result);
	   //alert(offset);
	   moment.locale('th');
	   var result=moment(dateArray_result);//.utcOffset(offset);//.fromNow();//.utcOffset(offset);
	//   var result=moment([2017,0,11,17,31,11]).zone(offset);//.utcOffset(offset);
	   //alert(result);
	   
	   return {
		   "raw":exifDate,
		   "fromNow":result.fromNow(),
		   "human":result.format("dddd,Do MMMM YYYY, h:mm:ss a"),
		   "moment":result
	   };
	   
	}

	$scope.flowtoUploadAll=function(){
			uploader.uploadAll();
	};
		
	    // --------------------
		// init
		
})
.config(function(LoopBackResourceProvider,APIsEndPoint) {

    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    //LoopBackResourceProvider.setUrlBase('http://192.168.59.103:3001/api');
	LoopBackResourceProvider.setUrlBase(APIsEndPoint.url);
});


