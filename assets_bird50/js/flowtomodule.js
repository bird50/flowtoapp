//flowtomodule
angular.module('flowtomodule',['ngMaterial'])
// 2. set a constant
    .constant('MODULE_VERSION', '0.0.1')

// 3. some defaults
    .value('defaults', {
        "flowto": 'crop'
    })

// 4. define a module component
.service('flowtoMsg', function($mdDialog) {
	this.alert=function(say){
		if(say==null){say="OK";}
			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('FLOWTO')
				.textContent(say)
				.ariaLabel('Alert Dialog')
				.ok('OK!')
				.targetEvent()
			);
	};
	this.inputTextArea=function(label,value,content){
		var confirm = $mdDialog.confirm({
		      controller: 'inputTextAreaController',
		      template:
			'<md-toolbar><div class="md-toolbar-tools"><span class="md-caption">Flowto</span></div></md-toolbar>'+
			'<div layout="column" layout-padding>'+
			'<div><md-content ng-bind-html="content"></md-content></div>'+
			'<md-input-container class="md-block">'+
		  	'<label>{{label}}</label>'+
			'<textarea ng-model="message" rows="5" md-select-on-focus></textarea>'+
		  '</md-input-container>'+
			//'<md-divider></md-divider>'+
			'<div layout="row" layout-padding>'+
			'<md-button class="md-warn" ng-click="click_cancel();">Cancel</md-button><span flex></span>'+
			'<md-button class="md-primary" ng-click="click_ok();">OK</md-button>'+
			'</div>'+
			'</div>',
		      locals: {
				  "data": {
					  "label":label,
					  "value":value,
					  "content":content
				  }
			  },
		      parent: angular.element(document.body)
		   });
		   return $mdDialog.show(confirm);
	};
})
.controller('inputTextAreaController',function($scope,$mdDialog,data,$sce){
	$scope.message=data.value;
	$scope.label=data.label;
	$scope.content=$sce.trustAsHtml(data.content);
	$scope.click_ok=function(){
		$mdDialog.hide($scope.message);
	};
	$scope.click_cancel=function(){
		$mdDialog.cancel();
	};
})
.service('flowtoPreview',function($mdDialog){
	this.flowtoDialog=function(ev){
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'dialog1.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: false // Only for -xs, -sm breakpoints.
		})
		.then(function(answer) {
				//$scope.status = 'You said the information was "' + answer + '".';
			alert(answer);
		},function() {
			alert('aboard');
			//$scope.status = 'You cancelled the dialog.';
		});
	};
	this.flowtopreviewsubmit=function(answer){
		$mdDialog.hide(answer);
	};
    function DialogController($scope, $mdDialog) {
		//$scope.me="siratis";
       $scope.hide = function() {
         $mdDialog.hide();
       };

       $scope.cancel = function() {
         $mdDialog.cancel();
       };

       $scope.answer = function(answer) {
         $mdDialog.hide(answer);
       };
     }
	
})
.service('flowtoUtil',function($window,APP_CFG){
	this.click_back=function(){
		//credit-->https://stackoverflow.com/questions/16542118/phonegap-navigator-app-backhistory-not-working-on-html-back-button
		history.go(-1);
		//navigator.app.backHistory();
	};
	this.valid_image=function(url){
		return(url.match(/\.(jpeg|jpg|gif|png|JPG|PNG|JPEG|GIF)$/) != null);
	};
	
	//ใช้สำหรับ valid url ว่าเป็น  extention รูป หรือไม่ ถ่าไม่ใช้ รูปที่ระบุ
	this.image_avatar=function(url,err_url){
		if(!url||url === null){url="";}
		if(url.match(/.*\.(jpeg|jpg|gif|png|JPG|PNG|JPEG|GIF)$/) != null){
			console.log('avatar ok'+url);
			return url;
		}else{
			console.log('err:'+err_url);
			return err_url;
		}
		
	};
	this.go2url=function(this_url){
		 $window.location.href = this_url;
		 return;
	};
})
.constant(
	'APIsEndPoint',{
		'url':'http://bid.rid.go.th:3001/api',
		'flowto_files':'http://bid.rid.go.th:3001/flowtofiles'
	}
)
.constant(
	'APP_CFG',{
		'app_name':'Flowto',
		'app desc':'flowto app',
		'url':'http://bid.rid.go.th:3001',
		'avatar_url':'http://bid.rid.go.th:3001/profile_pics/thumb',
		'avatar_url_post':'http://bid.rid.go.th:3001/profile_upload'
		
	}
)
.constant(
	'WORD',{
		'canNotCopyFlowto':'ไม่สามารถ copy Flowto ได้',
		'copyFlowtoSuccessfully':'Copy Flow เรียบร้อยแล้ว'
	}
)
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('green')
	.warnPalette('deep-orange')
	//.dark();
})
//.constant('MediaEndPoint',{'url':'http://bid.rid.go.th:3001/flowtofiles'})
//.constant('APIsEndPoint',{
//	'url':'http://192.168.59.103:3001/api',
//	'flowtofiles_url':'http://192.168.59.103:3001/flowtofiles'
//})

;// and so on


