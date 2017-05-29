{%verbatim%}
				<!-- service-bottom -->
					<div id="about" class="service-bottom"  ng-if="islogin">
					<div class="container">
						<div class="smith">
							<div class="service-bottom-left">
								<img src="images/avatar-blank.png" alt=" " />
							</div>
							<div class="service-bottom-right">
								<h2>{{u.username}}</h2>
								<p>
									Username:{{u.username}}  <br/>
									email:{{u.email}}
								</p>
								<!--<div class="banner1-icons">
									<ul>
										<li><a href="#" class="facebook1"> </a></li>
										<li><a href="#" class="twitter1"> </a></li>
										<li><a href="#" class="in1"> </a></li>
									</ul>-->
									<button class="flowtobutton" ng-click="logout();">Logout</button>
								</div>
								<div class="bar">
									<p>PICS</p>
								</div>
								<div class="bar1">
									<p>84%</p>
								</div>
								<div class="clearfix"> </div>
								<div class="skills">
									 <div class="skill1" style="width:75%"> </div>							
								</div>

							</div>
							<div class="clearfix"> </div>
						</div>
					</div>
					</div>
				<!-- //service-bottom -->
{%endverbatim%}


