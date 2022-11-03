mapboxgl.accessToken = 'pk.eyJ1IjoibWlzdGVyaG0iLCJhIjoiY2tvc2k2NzdtMDFwYzJwcng4aDRraWczeiJ9.OlrnunjFsM20lBB73JTmig';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/misterhm/cl9zevzwf00hi14p04xqrrb96',
    attributionControl: false,
    zoom: 1,
    dragPan: false,
    center: [51.160, 6.630]
});
map.scrollZoom.disable();
const el = document.createElement('div');
el.className = 'marker';
const marker1 = new mapboxgl.Marker(el).setLngLat([51.160, 6.630]).addTo(map);