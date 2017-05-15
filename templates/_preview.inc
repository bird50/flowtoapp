{%verbatim%}
<!--
<div ng-repeat="item in uploader.queue">
<p><img ng-src="{{item.imgsrc}}" style="height:230;width:auto;"/>
{{item.file.name}}<br/>
<input type="text" ng-model="item.exif.lat"\>
<button ng-click="item.upload()"></button><br/>
</p>
</div>
-->
<md-card class="md-whiteframe-3dp" ng-repeat="ft in uploader.queue" style="padding:5px;">
<div layout="row" layout-wrap layout-padding>
	<div flex-gt-xs="50" flex-xs="100" layout="column" style="height:350px;">
	<md-input-container class="md-block">
		          <label>CAPTION...</label>
		          <textarea ng-model="ft.flowto.caption"  rows="5" md-select-on-focus></textarea>
	</md-input-container>
	<div flex style="overflow:scroll;">
	<img ng-src="{{ft.imgsrc}}" style=" display: block;
  max-height:350px;
  width: 100%;
  object-fit: contain;">
</div>
	</div><!--flex-->
	<span flex-gt-xs="5" hide-xs></span>
	<div flex-gt-xs="45" flex-xs="100">
		<p><label>Latitude :</label>{{ft.exif.lat}}</p>
		<p><label>Longitude :</label>{{ft.exif.lng}}</p>
		<p><label>Date Time :</label>{{ft.exif.DateTime.human}}</p>
		<p><md-button class="md-warn md-raised" ng-click="ft.remove();">remove</md-button></p>
	</div>
</div>
</md-card><!--ng repeat-->

{%endverbatim%}


