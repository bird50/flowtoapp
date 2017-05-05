angular.module('flowtoMap',['ngRoute','lbServices','flowtomodule'])
.controller('mapCtrl', function($scope, FlowtoUser, $location,flowtoMsg,Media,Flowto,APIsEndPoint) {
	//alert(APIsEndPoint);
const m1 = L.marker([51.50313, -0.091223]);
const m2 = L.marker([51.50614, -0.0989]);
const m3 = L.marker([51.50915, -0.096112]);

const map4 = L.map('example4').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map4);

// GEOSJON EXAMPLE
/*
const geoJsonData = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [
                            -0.15483856201171872,
                            51.527329038465936,
                        ],
                        [
                            -0.16977310180664062,
                            51.51643437722083,
                        ],
                        [
                            -0.15964508056640625,
                            51.50094238217541,
                        ],
                        [
                            -0.13149261474609375,
                            51.5042549065934,
                        ],
                        [
                            -0.11758804321289061,
                            51.518463972439385,
                        ],
                        [
                            -0.13303756713867188,
                            51.53106680201548,
                        ],
                        [
                            -0.15483856201171872,
                            51.527329038465936,
                        ],
                    ],
                ],
            },
        },
    ],
};
const geoJsonButton = document.getElementById('test-geojson');

// Polygon Example



// Layer Group Example

const layerGroupItem1 = L.polyline([
    [51.51, -0.09],
    [51.513, -0.08],
    [51.514, -0.11],
]);
const layerGroupItem2 = L.polygon([
    [51.52, -0.06],
    [51.51, -0.07],
    [51.52, -0.05],
]);

const layerGroupItem3 = L.polygon([
    [
        51.51549835365031,
        -0.06450164634969281,
    ],
    [
        51.51944818307178,
        -0.08425079345703125,
    ],
    [
        51.51868369995795,
        -0.06131630004205801,
    ],
    [
        51.51549835365031,
        -0.06450164634969281,
    ],
]);
const layerGroupItem4 = L.polygon([
    [
        51.51549835365031,
        -0.06450164634969281,
    ],
    [
        51.51944818307178,
        -0.08425079345703125,
    ],
    [
        51.51868369995795,
        -0.06131630004205801,
    ],
    [
        51.51549835365031,
        -0.06450164634969281,
    ],
]);
const layerGroupItem5 = L.polygon([
    [
        51.51549835365031,
        -0.06450164634969281,
    ],
    [
        51.51944818307178,
        -0.08425079345703125,
    ],
    [
        51.51868369995795,
        -0.06131630004205801,
    ],
    [
        51.51549835365031,
        -0.06450164634969281,
    ],
]);

const layerGroup = L.featureGroup([layerGroupItem1]).addTo(map4);
layerGroup.pm.toggleEdit({
    draggable: true,
    snappable: true,
    snapDistance: 30,
});

layerGroup.on('pm:snap', (e) => {
    console.log('snap');
    console.log(e);
});
layerGroup.on('pm:unsnap', (e) => {
    console.log('unsnap');
    console.log(e);
});

map4.pm.addControls({
    position: 'topright',
});

// map4.pm.setPathOptions({
//     color: 'orange',
//     fillColor: 'green',
//     fillOpacity: 0.4,
// });

layerGroup.addLayer(layerGroupItem2);
layerGroup.addLayer(layerGroupItem3);
// layerGroup.addLayer(layerGroupItem4);
// layerGroup.addLayer(layerGroupItem5);

layerGroup.on('pm:dragstart', (e) => {
    console.log(e);
});
layerGroup.on('pm:drag', (e) => {
    console.log(e);
});
layerGroup.on('pm:dragend', (e) => {
    console.log(e);
});
layerGroup.on('pm:markerdragstart', (e) => {
    console.log(e);
});
layerGroup.on('pm:markerdragend', (e) => {
    console.log(e);
});
*/
var template_popup='<img src="{url}" class="flowtoInMap"/>'+
'<table class="flowtoinfo">'+
'<tr><td width="80%" style="word-wrap:break-word;"><div class="flowtocaption">{caption}</div></td>'+
'<td width="20%" align="right">'+
	'<label>Lat:</label><span>{lat}</span><br/><label>Lng:</label><span>{lng}</span><br/>'+
	'<span>{flowtodate}</span><br/>'
'</td>'+
'</tr></table>';
var photoLayer = L.photo.cluster({ spiderfyDistanceMultiplier: 1.2 }).on('click', function (evt) {
		evt.layer.bindPopup(L.Util.template(template_popup, evt.layer.photo), {
			className: 'leaflet-popup-photo',
			minWidth: 320
		}).openPopup();
	});
	/*
	reqwest({
			url: 'http://kulturnett2.delving.org/api/search?query=*%3A*&format=jsonp&rows=100&pt=59.936%2C10.76&d=1&qf=abm_contentProvider_text%3ADigitaltMuseum',
			type: 'jsonp',
			success: function (data) {
				var photos = [];
				data = data.result.items;

				for (var i = 0; i < data.length; i++) {
					var photo = data[i].item.fields;
					if (photo.abm_latLong) {
						var pos = photo.abm_latLong[0].split(',');
						photos.push({
							lat: pos[0],
							lng: pos[1],
							url: photo.delving_thumbnail[0],
							caption: (photo.delving_description ? photo.delving_description[0] : '') + ' - Kilde: <a href="' + photo.delving_landingPage + '">' + photo.delving_collection + '</a>',
							thumbnail: photo.delving_thumbnail[0]
						});
					}	
				}
				//photoLayer.add(photos).addTo(map4);
				//map4.fitBounds(photoLayer.getBounds());
			}
		});
		*/
	moment.locale('th');
		$scope.fl = Flowto.find({ 
			include:'flowtoUser',
		  filter: {
		    where: {
		      assignmentId: 1
		    },
			limit:100
		  }
		}).$promise
		.then(function(data){
			console.log(data);
			var photos = [];
			for (var i = 0; i < data.length; i++) {
				console.info('user:'+data[i].flowtoUser);
				var photo = {
				//	url:'http://192.168.59.103:3001/api/media/'+data[i].media_container+'/download/'+data[i].media_name,
					url:APIsEndPoint.url+'/media/'+data[i].media_container+'/download/'+data[i].media_name,
				//	url:APIsEndPoint.flowtofiles_url+'/'+data[i].media_container+'/mid/'+data[i].media_name,
					lat:data[i].position.lat,
					lng:data[i].position.lng,
					flowtodate:moment(data[i].flowtodate).fromNow(),
					caption:data[i].caption,
					//thumbnail:'http://192.168.59.103:3001/api/media/'+data[i].media_container+'/download/'+data[i].media_name
					thumbnail:APIsEndPoint.url+'/media/'+data[i].media_container+'/download/'+data[i].media_name
				//	thumbnail:APIsEndPoint.flowtofiles_url+'/'+data[i].media_container+'/thumb/'+data[i].media_name
				};
				photos.push(photo);
			}
			photoLayer.add(photos).addTo(map4);
			map4.fitBounds(photoLayer.getBounds());
			
			
		}); 
	
// test with markercluster
// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker([51.505, -0.07]));
// markers.addLayer(L.marker([51.505, -0.08]));
// markers.addLayer(L.marker([51.505, -0.09]));
// map4.addLayer(markers);

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
});
;
