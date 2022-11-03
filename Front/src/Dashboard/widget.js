mapboxgl.accessToken = 'pk.eyJ1IjoibWlzdGVyaG0iLCJhIjoiY2tvc2k2NzdtMDFwYzJwcng4aDRraWczeiJ9.OlrnunjFsM20lBB73JTmig';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/misterhm/cl9zevzwf00hi14p04xqrrb96',
    attributionControl: false,
    zoom: 0.5,
    dragPan: false,
    center: [51.160, 6.630]
});
map.scrollZoom.disable();

getJoke();
function getJoke() {
    $.ajax({type:"GET", url:"http://localhost:9090/api/ChuckNorris", data:"", dataType: "json", success: function(data) {
        $("#ChuckNorrisJoke").html(data.value);
    }, error: function(data) {
        $(".Form").find(".FormMessage").html(data.responseJSON.message);
    }});
}

getNews();
function getNews() {
    $.ajax({type:"GET", url:"http://localhost:9090/api/News", data:"", dataType: "json", success: function(data) {
        $("#NewsTitle").html(data.articles[19].description);
        $("#NewsDescription").html(data.articles[19].content);
        $("#NewsPaper").html(data.articles[19].author);
    }, error: function(data) {
        $(".Form").find(".FormMessage").html(data.responseJSON.message);
    }});
}

setInterval(function() {
    getISSPosition();
}, 1000);

function getISSPosition() {
    $.ajax({type:"GET", url:"http://localhost:9090/api/ISS", data:"", dataType: "json", success: function(data) {
        console.log([data.iss_position.longitude, data.iss_position.latitude]);
        map.setCenter([data.iss_position.longitude, data.iss_position.latitude]);
        const el = document.createElement('div');
        el.className = 'marker';
        const marker1 = new mapboxgl.Marker(el).setLngLat([data.iss_position.longitude, data.iss_position.latitude]).addTo(map);
    }, error: function(data) {
        $(".Form").find(".FormMessage").html(data.responseJSON.message);
    }});
}