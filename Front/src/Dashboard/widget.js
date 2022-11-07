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

// Définir des valeurs minimales pour le rafraichissement des données
// Get depuis le front les données
// Build l'url avec les données
// Passer l'url au fonction get, pour qu'elle sexecute et boom ça fonctionne

document.addEventListener('click', function(el) {
    if(el.target.id == "updateParam") {
        var url = "http://localhost:9090/api/ChuckNorris";

        // Les données sont récupérées depuis le front
        var refreshRate = el.target.parentElement.parentElement.children[0].children[0].children[1].children[0].value;
        var country = el.target.parentElement.parentElement.children[0].children[1].children[1].children[0].value;
        var category = el.target.parentElement.parentElement.children[0].children[2].children[1].children[0].value;
        if(country != "" && category != "") {
            url += "?country=" + country + "&category=" + category;
        }

        if(category != "") {
            url += "?category=" + category;
            }
        }
        // Grace au el je pourrai update au bon endroit
    }
    console.log(url);
    // getJoke(url);
});


// setInterval(function() {
//     getJoke();
// }, 5000);
function getJoke(url) {
    $.ajax({type:"GET", url:"http://localhost:9090/api/ChuckNorris", data:"", dataType: "json", success: function(data) {
        $("#ChuckNorrisJoke").html(data.value);
    }, error: function(data) {
        // $(".Form").find(".FormMessage").html(data.responseJSON.message);
        console.log(data);
    }});
}

setInterval(getNews(), 10000);

function getNews() {
    $.ajax({type:"GET", url:"http://localhost:9090/api/News?param=us", data:"", dataType: "json", success: function(data) {
        $("#NewsTitle").html(data.articles[1].description);
        $("#NewsDescription").html(data.articles[1].content);
        $("#NewsPaper").html(data.articles[1].author);
    }, error: function(data) {
        // $(".Form").find(".FormMessage").html(data.responseJSON.message);
        console.log(data);
    }});
}

setInterval(function() {
    getISSPosition();
}, 1000);

function getISSPosition() {
    $.ajax({type:"GET", url:"http://localhost:9090/api/ISS", data:"", dataType: "json", success: function(data) {
        map.setCenter([data.iss_position.longitude, data.iss_position.latitude]);
        const el = document.createElement('div');
        el.className = 'marker';
        const marker1 = new mapboxgl.Marker(el).setLngLat([data.iss_position.longitude, data.iss_position.latitude]).addTo(map);
    }, error: function(data) {
        $(".Form").find(".FormMessage").html(data.responseJSON.message);
    }});
}


document.addEventListener('click', function(el) {
    if(el.target.id == "gear") {
        if(el.target.parentElement.parentElement.parentElement.children[1].classList.contains("hidden")) {  
            el.target.parentElement.parentElement.parentElement.children[1].classList.remove("hidden");
        } else {
            el.target.parentElement.parentElement.parentElement.children[1].classList.add('hidden');
        }
    }
});