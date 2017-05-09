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
<div ng-repeat="ft in uploader.queue" >
<div class="thumbnail">
<div class="col-md-6 col-sd-6 col-xs-6">
<img ng-src="{{ft.imgsrc}}" style="width:100%;height:auto;">
</div>
<div class="col-md-6 col-sd-6 col-xs-6">
<!--<p><label>File Name :</label>{{ft.file.name}}</p>-->
<p><label>Latitude :</label>{{ft.exif.lat}}</p>
<p><label>Longitude :</label>{{ft.exif.lng}}</p>
<p><label>Date Time :</label>{{ft.exif.DateTime.human}}</p>
<p><md-button class="md-warn md-raised" ng-click="ft.remove();">remove</md-button></p>
</div>
<div class="clearfix"></div>
<div class="contact">
	<textarea type="text" ng-model="ft.flowto.caption" placeholder="CAPTION..." ></textarea>
</div>
<!--<md-input-container class="md-block">
	<label>Caption</label>
	<textarea  place-holder="Caption for your Flowto" md-maxlength="150" rows="5" md-select-on-focus></textarea>
</md-input-container>-->
 </div>
</div><!--ng repeat-->
<md-progress-circular md-mode="determinate" md-diameter="30" ng-value="progress_upload"></md-progress-circular>
	<center><button ng-click="flowtoUploadAll();" class="flowtobutton">UPLOAD</button></center>
{%endverbatim%}


