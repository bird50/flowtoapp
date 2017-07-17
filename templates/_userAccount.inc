{%verbatim%}
<md-toolbar md-scroll-shrink>
	<div class="md-toolbar-tools" layout="row" layout-padding layout-fill layout-align="center center">
			<md-button ng-click="click_back();"><img src="images/ic_keyboard_backspace_white_48dp_2x.png" style="width:24px;height:24px;"/></md-button>
			<span flex class="md-body-2">User Profile</span>
			
	</div>
</md-toolbar>
<md-content flex>
<md-subheader class="md-accent" layout="column">
<div layout="row" layout-align="center center">
	<img src="{{user.avatar}}" style="width:56px;height56px;border-radius:50%;" class="md-avatar"/>
	<span flex></span>
</div>
</md-subheader>
<div  layout="column" style="overflow:scroll;" >
	<div layout="row" layout-padding layout-align="left">
		<div flex="50">
			<label>Username:</label>
			<span>{{user.username}}</span>
		</div>
		<div flex="50">
			<label>email:</label>
			
			<span>{{user.email}}</span>
		</div>
	</div>
	<div layout="row" layout-padding layout-align="center top">
		<div flex>
			<label>description:</label>
			<p>{{user.profile}}</p>
		</div>
	</div>
	<div layout="row" layout-padding layout-align="left">
		<div flex>
			<label>your word:</label>
			<span>{{user.word}}</span>
		</div>
	</div>
	<md-divider></md-divider>	
</div>
</md-content>
{%endverbatim%}