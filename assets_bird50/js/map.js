angular.module('flowtoMap',['ngRoute','lbServices','flowtomodule'])
.config(
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'mainmap.html',
        controller: 'mainmapCtrl'
     //   controllerAs: 'flowtoCtrl'
      })
      .when('/flowto/:flowtoId', {
        templateUrl: 'flowtopage.html',
        controller: 'flowtoCtrl'
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

.controller('mapCtrl',
function($scope, FlowtoUser, $location,flowtoMsg,Media,Flowto,Assignment,APIsEndPoint,$q,$mdBottomSheet,$filter,$route, $routeParams,flowtoUtil) {

})
.controller('mainmapCtrl',
function($scope, FlowtoUser, $location,flowtoMsg,Media,Flowto,Assignment,APIsEndPoint,$q,$mdBottomSheet,$filter,$route, $routeParams,flowtoUtil) {
	
	$scope.click_back=function(){
		flowtoUtil.click_back();
	};
	//alert(APIsEndPoint);

//console.log('location :'+$location.absUrl());
moment.locale('th');
const m1 = L.marker([51.50313, -0.091223]);
const m2 = L.marker([51.50614, -0.0989]);
const m3 = L.marker([51.50915, -0.096112]);

const map4 = L.map('example4').setView([13.7882305556,100.5101], 13);

map4.attributionControl.setPrefix(false); // remov leaflet attribution
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map4);

var template_popup='<div class="flowtoCover"><div style="position:absolute;left:180px;top:10px;"><a class="pop_flowto_menu" href="#/" data="{f_id}" ><img src="images/more_vert_white_48x48.png" style="height:16;width:16;"/></a></div><a href="#/flowto/{f_id}"><img src="{url}" class="flowtoInMap" style="cursor:hand;"/ ></a></div>'+
'<table class="flowtoinfo">'+
'<tr><td width="80%" style="word-wrap:break-word;"><div class="flowtocaption">{caption}</div></td>'+
'<td width="20%" align="right">'+
	'<label>Lat:</label><span>{lat}</span><br/><label>Lng:</label><span>{lng}</span><br/>'+
	'<span>{flowtodate}</span><br/>'
'</td>'+
'</tr></table>';
//var photoLayer = L.photo.cluster({ spiderfyDistanceMultiplier: 1.2 }).on('click', function (evt) {
$scope.photoLayer = L.photo.cluster({ spiderfyDistanceMultiplier: 1.2 }).on('click', function (evt) {
		evt.layer.bindPopup(L.Util.template(template_popup, evt.layer.photo), {
			className: 'leaflet-popup-photo',
			minWidth: 200, //320
			//maxWidth:390
		}).openPopup();
		$scope.init_jq();
		console.info('evt photo',evt.layer.photo);
		//map4.removeLayer(evt.layer.photo);
});


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
			var asid_form_param = $scope.getParameterByName('asid',$location.absUrl());
			var assignmentIdToFind=1;
			if( !asid_form_param){
				assignmentIdToFind=data.activateAssignment;
			}else{
				assignmentIdToFind=asid_form_param;
			}
			console.log('assignmentIdToFind:'+assignmentIdToFind);
			$scope.assignment=Assignment.findById({"id":assignmentIdToFind})
			.$promise.then(function(dat){
				$scope.assignmentName=dat.assignmentName;
				$scope.assignmentId=dat.id;
				console.log('asdf');
				
			console.log(JSON.stringify(dat));
							//$scope.init_flowtos();

	
							$scope.fl = Flowto.find({ 
								include:'flowtoUser',
							  filter: {
							    where: {
									assignmentId: dat.id
							    },
								limit:1000
							  }
							}).$promise
							.then(function(data){
								console.log(data);
								$scope.photos = [];
								for (var i = 0; i < data.length; i++) {
									console.info('user:'+data[i].flowtoUser);
									var photo = {
									//	url:'http://192.168.59.103:3001/api/media/'+data[i].media_container+'/download/'+data[i].media_name,
										//url:APIsEndPoint.url+'/media/'+data[i].media_container+'/download/'+data[i].media_name,
										url:APIsEndPoint.flowto_files+'/'+data[i].media_container+'/mid/'+data[i].media_name,
									//	url:APIsEndPoint.flowtofiles_url+'/'+data[i].media_container+'/mid/'+data[i].media_name,
										f_id:data[i].id,
										lat:data[i].position.lat,
										lng:data[i].position.lng,
										flowtodate:moment(data[i].flowtodate).fromNow(),
										caption:data[i].caption,
										//thumbnail:'http://192.168.59.103:3001/api/media/'+data[i].media_container+'/download/'+data[i].media_name
										//thumbnail:APIsEndPoint.url+'/media/'+data[i].media_container+'/download/'+data[i].media_name
										thumbnail:APIsEndPoint.flowto_files+'/'+data[i].media_container+'/thumb/'+data[i].media_name
									//	thumbnail:APIsEndPoint.flowtofiles_url+'/'+data[i].media_container+'/thumb/'+data[i].media_name
									};
									$scope.photos.push(photo);
								}
								if($scope.photos.length>0){
									$scope.photoLayer.add($scope.photos).addTo(map4);
									map4.fitBounds($scope.photoLayer.getBounds());
									//console.info('photoLayer:',$scope.photoLayer._photos._layers);
									//$scope.photoLayer.clear();
								}
								
								//if(photos)
								
			
			
							}); 
			});
			//console.log('assignment name:'+JSON.stringify(data));
			//console.log(JSON.stringify($scope.u));
		});//then
		//$scope.u.userLetter=$scope.u.username.toUpperCase();
	}
	
$scope.getParameterByName=function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

$scope.alert=function(msg){
		flowtoMsg.alert(msg);
};

//$scope.alert=function
$scope.showListBottomSheet=function(f_id){
       $mdBottomSheet.show({
         templateUrl: 'map-bottom-sheet-list-template.html',
         controller: 'MapListBottomSheetCtrl',
			locals:{
				"data":{
			 	   "f_id":f_id
			   	}
		   }
       }).then(function(clickedItem) {
		   if(clickedItem=="removeFlowto"){
			   Flowto.destroyById({"id":f_id}).$promise
			   .then(function(){
				  // alert('remove '+f_id);
  				var found = $filter('find_index_of_photos_by_f_id')($scope.photos, f_id);
  				console.log('found:'+found);
  					if(found || found==0){
  						// ใช้วิธี clear แล้ว add ใหม่
  						$scope.photos.splice(found,1);
  						$scope.photoLayer.clear();
  						$scope.photoLayer.add($scope.photos);
  					}
			   	flowtoMsg.alert('Remove Flowto Successful');
				console.info('photos:',$scope.photos);
				
				},function(err){
				//   alert('not remove');
			   	flowtoMsg.alert('Can not remove this Flowto.\n May be you are not  owner of this flowto.');
			   });
		   }else{
		   	 return
		   }
       }).catch(function(error) {
         // User clicked outside or hit escape
       });
};
// use jquery
$scope.init_jq=function(){
	$(function(){
		//alert('jquery');
		$(".pop_flowto_menu").click(function(){
			var f_id=$(this).attr('data');
			$scope.showListBottomSheet(f_id);
		});
		$(".flowtoInMap").click(function(){
			//flowtoMsg.alert('click flowto');
		});
	});
};

//$scope.init_jq();



// test with markercluster
// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker([51.505, -0.07]));
// markers.addLayer(L.marker([51.505, -0.08]));
// markers.addLayer(L.marker([51.505, -0.09]));
// map4.addLayer(markers);

})
.controller('MapListBottomSheetCtrl', function($scope,$mdBottomSheet,data,$mdDialog){
	$scope.dat=data;
	console.log('sheet'+JSON.stringify(data));
	$scope.listItemClick=function(item){
		$mdBottomSheet.hide(item);
	};
	$scope.removeFlowto=function(ev){
		/*
$scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };
		*/
		var myconfirm = $mdDialog.confirm()
			.title('Would you like to delete this Flowto?')
			.textContent('Would you like to delete this Flowto?')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('OK Remove NOW.')
			.cancel('CANCEL');
		$mdDialog.show(myconfirm).then(function() {
			$scope.listItemClick('removeFlowto');
		}, function() {
			return;
			//$scope.status = 'You decided to keep your debt.';
			//$mdBottomSheet.hide(item);
		});
		
	};
	
})
.controller('flowtoCtrl',
function($scope, FlowtoUser, $location,flowtoMsg,Media,Flowto,Assignment,APIsEndPoint,$q,$mdBottomSheet,$filter,$route, $routeParams,flowtoUtil) {
	$scope.click_back=function(){
		flowtoUtil.click_back();
	};
	moment.locale('th');
	$scope.params=$routeParams;
	$scope.thisFlowto={
			"id":0,
			"media_name":"no media",
			"caption":"",
		"img_url": "images/flowto_bg01.png"
	};
	var flowto_find_params={
		"id":$scope.params.flowtoId,
		"filter":{
			"include":["assignment","flowtoUser"]
			}//filter
		};
	Flowto.findById(flowto_find_params).$promise
	.then(function(data){
		$scope.thisFlowto={
			"id":data.id,
			"media_name":data.media_name,
			"caption":data.caption,
			"img_url":APIsEndPoint.flowto_files+'/'+data.media_container+'/mid/'+data.media_name,
			"assignmentId":data.assignmentId,
			"assignmentName":data.assignment.assignmentName,
			"flowtoUserId":data.flowtoUserId,
			"flowtoUser":data.flowtoUser.username,
			"flowtoUserEmail":data.flowtoUser.email,
			"flowtodate":moment(data.flowtodate).fromNow(),
			"media_container":data.media_container,
			"lat":data.position.lat,
			"lng":data.position.lng
		};
		console.info("flowto dat:",data);
		console.info("flowto_in:",$scope.thisFlowto);
	},function(err){
		//$scope.thisFlowto={};
		console.log("nothing");
	}
	);
	
	
	$scope.click_more_vert_btn=function(){
        $mdBottomSheet.show({
          templateUrl: 'fowto_morevert.html',
          controller: 'fowto_morevertCtrl',
 			locals:{
 				"data":{
 			 	   "f_id":$scope.thisFlowto.id
 			   	}
 		   }
        }).then(function(data) {
			console.info('click what',data);
		});
	};//click_more_vert_btn

})
.controller('fowto_morevertCtrl',function($scope,Flowto,$mdDialog,$mdBottomSheet,data,flowtoMsg){
	$scope.removeFlowto=function(){
		var myconfirm = $mdDialog.confirm()
			.title('Would you like to delete your Flowto?')
			.textContent('Would you like to delete this Flowto?')
			.ariaLabel('Lucky day')
			//.targetEvent(ev)
			.ok('OK Remove NOW.')
			.cancel('CANCEL');
		$mdDialog.show(myconfirm).then(function() {
			Flowto.destroyById({"id":data.f_id}).$promise
			.then(function(){
				flowtoMsg.alert('Flowto id '+data.f_id+' was deleted.');
				$mdBottomSheet.hide();
			},function(err){
				flowtoMsg.alert('Can not delete Flowto id '+data.f_id+'.!!!\nMay be you are not  owner of this flowto.');
			});
			
		//cancle btn
		}, function() {
			return;
		});
		
	}
	
})
//  credit -->http://stackoverflow.com/questions/15610501/in-angular-i-need-to-search-objects-in-an-array
.filter('find_index_of_photos_by_f_id', function() {
  return function(input, f_id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].f_id == +f_id) {
       // return input[i];
	   return i;
      }
    }
    return null;
  }
})
.config(function(LoopBackResourceProvider,APIsEndPoint) {

    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
  //  LoopBackResourceProvider.setUrlBase('http://192.168.59.103:3001/api');
    LoopBackResourceProvider.setUrlBase(APIsEndPoint.url);
})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange');
})

;

