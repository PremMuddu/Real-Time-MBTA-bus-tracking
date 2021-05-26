mapboxgl.accessToken = 
'pk.eyJ1IjoicHJlbWlsYWtpcmFuIiwiYSI6ImNrb2tkMzZlZjAwNzMydm9mcDliM2VnenIifQ.mTt_B_38iCK7mhuY5iRnfQ';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
  
});

let marker = new mapboxgl.Marker()
 .setLngLat([-71.092761, 42.357575])
 .addTo(map);

async function run(){   
	const locations = await getBusLocations();

       for(let i = 0; i < locations.length; i ++){
		let lg = locations[i].attributes.longitude;
		let lat = locations[i].attributes.latitude;
		marker.setLngLat([lg, lat]);
                map.setCenter([lg, lat]);
	        map.resize();
	}
	
	setTimeout(run, 15000);
}

async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();

