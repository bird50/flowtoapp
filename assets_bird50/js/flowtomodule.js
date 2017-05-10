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
				.ok('ทราบ!')
				.targetEvent()
			);
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
.constant(
	'APIsEndPoint',{
		'url':'http://bid.rid.go.th:3001/api',
		'flowto_files':'http://bid.rid.go.th:3001/flowtofiles'
	}
)
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange');
})
//.constant('MediaEndPoint',{'url':'http://bid.rid.go.th:3001/flowtofiles'})
//.constant('APIsEndPoint',{
//	'url':'http://192.168.59.103:3001/api',
//	'flowtofiles_url':'http://192.168.59.103:3001/flowtofiles'
//})

;// and so on


