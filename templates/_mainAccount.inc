{%verbatim%}
<md-toolbar md-scroll-shrink>
	<div class="md-toolbar-tools" layout="row" layout-padding layout-fill layout-align="center center">
			<md-button ng-click="click_back();"><img src="images/ic_keyboard_backspace_white_48dp_2x.png" style="width:24px;height:24px;"/></md-button>
			<span flex class="md-body-2">Your Account</span>
			<span ><md-button ng-click="click_save();">save</md-button></span>
	</div>
</md-toolbar>
<input class="btn btn-xs btn-default" nv-file-select uploader="uploader" type="file" accept="image/*"  id="fileinput" value="Change" style="position:absolute;left:-300px;top-300px;"/>
<md-content flex>
<md-subheader class="md-accent" layout="column">
<div layout="row" layout-align="center center">
	<img src="{{u.avatar}}" style="width:56px;height56px;border-radius:50%;" class="md-avatar"/>
	<md-button onclick="document.getElementById('fileinput').click()">change</md-button>
	<span flex></span>
</div>
</md-subheader>
<div  layout="column" style="overflow:scroll;" >
	<div layout="row" layout-padding layout-align="left">
		<md-input-container flex="50">
			<label>Username:</label>
			<input ng-model="u.username" ng-disabled="false"></input>
		</md-input-container>
		<md-input-container flex="50">
			<label>email:</label>
			<input ng-model="u.email" ng-disabled="true"></input>
		</md-input-container>
	</div>
	<div layout="row" layout-padding layout-align="center">
		<md-input-container flex>
			<label>description:</label>
			<textarea  ng-model="u.profile"></textarea>
		</md-input-container>
	</div>
	<div layout="row" layout-padding layout-align="left">
		<md-input-container flex>
			<label>your word:</label>
			<input ng-model="u.word" ng-disabled="false"></input>
		</md-input-container>
	</div>
	<md-divider></md-divider>	
</div>
</md-content>
{%endverbatim%}