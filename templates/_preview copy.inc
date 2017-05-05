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
<h1>PREVIEW</h1>
<div>
<span ng-repeat="ft in uploader.queue">
<div id="pics" class="col-md-6 col-sd-6 col-xs-8">
<img id="pic1" src="images/7.png" ng-src="{{ft.imgsrc}}" style="width:300px;height:auto;">
</div>
<div>{{ft.exif.lat}}</div>
<div>{{ft.exif.lng}}</div>

<div class="col-md-6 col-sd-6 col-xs-4">
	<md-input-container>
		<label>Lat</label>
		<input ng-value="ft.exif.lat">
	</md-input-container>
	<md-input-container>
		<label>Lng</label>
		<input ng-value="ft.exif.lng">
	</md-input-container>
	 <md-input-container class="md-block">
		<label>Date Time</label>
		<input ng-value="ft.file.name">
	</md-input-container>
</div>
<div style="clear:both;"></div>
	<md-input-container class="md-block">
	          <label>Caption</label>
	          <textarea  place-holder="Caption for your Flowto" md-maxlength="150" rows="5" md-select-on-focus></textarea>
	</md-input-container>
</span>
	<button ng-click="flowtoupload(flowto);" class="flowtobutton">UPLOAD</button>
{%endverbatim%}


