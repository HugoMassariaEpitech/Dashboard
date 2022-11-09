import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getDatabase, get, ref, set, child, onValue, connectDatabaseEmulator, update, remove, push, query, orderByChild, equalTo, off } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcYKq1S_3ICRarZJoqvYaS08r18vV7W7k",
    authDomain: "dashboard-81b3f.firebaseapp.com",
    databaseURL: "https://dashboard-81b3f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dashboard-81b3f",
    storageBucket: "dashboard-81b3f.appspot.com",
    messagingSenderId: "179278508951",
    appId: "1:179278508951:web:74a2e76d5a1bf0bec48ad2",
    measurementId: "G-QEGPVWXVY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Check connexion

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location = "../Register/"; // Not Connected -> Connexion Page
    } else {
        getUserData();
    }
});

// Get user data

function getUserData() {
    onValue(ref(database, auth.currentUser.uid), (snapshot) => {
        if (snapshot.exists()) {
            console.log('reset');
            // Delete all widgets Nav and Dashboard
            $("#widgetList").empty();
            var dashboard = document.getElementById('dashboardJokesNews');
            while(dashboard.firstChild) {
                dashboard.removeChild(dashboard.firstChild);
            }
            // Add all widgets Nav and Dashboard, base on database data
            for (const [key, value] of Object.entries(snapshot.val())) {
                if (key == "widget") {
                    // Add widget to the navbar
                    for (const [key, value] of Object.entries(snapshot.val().widget)) {                        
                        for(const [key2, value2] of Object.entries(value)) {
                            var params = {};
                            for(const [key3, value3] of Object.entries(value2)) {
                                params[key3] = value3;
                            }

                            // The key2 equel the uid of the widget
                            addWidgetToNavbar(key, key2);

                            // Add widget to the dashboard
                            switch (key) {
                                case "Jokes":
                                    // Add jokes param to the param list
                                    addJokesToDashboard(key2, params);
                                    break;
                                case "News":
                                    addNewsToDashboard(key2, params);
                                    break;
                                case "Volume":
                                    addVolumeToDashboard();
                                    break;
                                case "Price":
                                    addPriceToDashboard();
                                    break;
                                case "Map":
                                    addMapToDashboard();
                                    break;
                            }
                        }
                    }
                }
            }
        }
    });
}


const SVG = {
    Jokes: "<svg class='text-gray-600 w-5 h-5' viewbox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M7,11a1,1,0,0,1-2,0C5,9.108,6.232,7,8,7s3,2.108,3,4a1,1,0,0,1-2,0c0-1.054-.679-2-1-2S7,9.946,7,11Zm9-4c-1.768,0-3,2.108-3,4a1,1,0,0,0,2,0c0-1.054.679-2,1-2s1,.946,1,2a1,1,0,0,0,2,0C19,9.108,17.768,7,16,7Zm-.01,7H8.009a.994.994,0,0,0-.955,1.3,5.178,5.178,0,0,0,9.9-.007A.994.994,0,0,0,15.99,14ZM24,12A12.013,12.013,0,0,1,12,24C-3.9,23.4-3.893.6,12,0A12.013,12.013,0,0,1,24,12Zm-2,0A10.011,10.011,0,0,0,12,2c-13.248.5-13.245,19.5,0,20A10.011,10.011,0,0,0,22,12Z' fill='currentColor'></path></svg>",
    News: "<svg class='text-gray-600 w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='none'><path d='M456 32h-304C121.1 32 96 57.13 96 88v320c0 13.22-10.77 24-24 24S48 421.2 48 408V112c0-13.25-10.75-24-24-24S0 98.75 0 112v296C0 447.7 32.3 480 72 480h352c48.53 0 88-39.47 88-88v-304C512 57.13 486.9 32 456 32zM464 392c0 22.06-17.94 40-40 40H139.9C142.5 424.5 144 416.4 144 408v-320c0-4.406 3.594-8 8-8h304c4.406 0 8 3.594 8 8V392zM264 272h-64C186.8 272 176 282.8 176 296S186.8 320 200 320h64C277.3 320 288 309.3 288 296S277.3 272 264 272zM408 272h-64C330.8 272 320 282.8 320 296S330.8 320 344 320h64c13.25 0 24-10.75 24-24S421.3 272 408 272zM264 352h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64c13.25 0 24-10.75 24-24S277.3 352 264 352zM408 352h-64C330.8 352 320 362.8 320 376s10.75 24 24 24h64c13.25 0 24-10.75 24-24S421.3 352 408 352zM400 112h-192c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32v-64C432 126.3 417.7 112 400 112z' fill='currentColor'/></svg>",
    Stocks: "<svg class='text-gray-600 w-5 h-5' viewbox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M23,22H3a1,1,0,0,1-1-1V1A1,1,0,0,0,0,1V21a3,3,0,0,0,3,3H23a1,1,0,0,0,0-2Z' fill='currentColor'></path><path d='M15,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,15,20Z' fill='currentColor'></path><path d='M7,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,7,20Z' fill='currentColor'></path><path d='M19,20a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0V19A1,1,0,0,0,19,20Z' fill='currentColor'></path><path d='M11,20a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0V19A1,1,0,0,0,11,20Z' fill='currentColor'></path></svg>",
    Map: "<svg class='text-gray-600 w-5 h-5' viewbox='0 0 525 525' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M464.933,193.233c-27.519-15.048-58.44-22.78-89.804-22.456h-86.075L224.093,54.789  c-18.86-33.614-54.392-54.435-92.935-54.457h-24.629c-35.3,0-63.917,28.617-63.917,63.917v42.611  c0,11.767,9.539,21.306,21.306,21.306s21.306-9.539,21.306-21.306V64.249c0-11.767,9.539-21.306,21.306-21.306h24.629  c23.13,0.003,44.454,12.503,55.757,32.683l53.307,95.151H63.917C28.617,170.777,0,199.394,0,234.694v42.611  c0,35.3,28.617,63.917,63.917,63.917h176.305l-53.264,95.151c-11.31,20.194-32.654,32.695-55.8,32.683h-24.629  c-11.767,0-21.306-9.539-21.306-21.306V405.14c0-11.767-9.539-21.306-21.306-21.306s-21.306,9.539-21.306,21.306v42.611  c0,35.3,28.617,63.917,63.917,63.917h24.629c38.544-0.022,74.076-20.843,92.935-54.457l64.961-115.988h86.075  c31.363,0.324,62.284-7.408,89.804-22.456C527.657,281.567,527.721,230.433,464.933,193.233z M356.402,298.611H127.834v-85.223  H356.38c23.536,11.467,33.321,39.842,21.854,63.379C373.599,286.282,365.914,293.971,356.402,298.611z M42.611,277.306v-42.611  c0-11.767,9.539-21.306,21.306-21.306h21.306v85.223H63.917C52.15,298.611,42.611,289.073,42.611,277.306z M444.053,281.567  c-8.363,4.656-17.226,8.351-26.419,11.015c11.042-23.183,11.042-50.109,0-73.292c9.194,2.664,18.056,6.359,26.419,11.015  C476.63,249.118,476.63,262.882,444.053,281.567z' fill='currentColor'></path></svg>",
    GEAR: "<svg id='gear' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 46 46' class='p-1'><path d='m19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Zm0-3q-1.45 0-2.475-1.025Q20.5 25.45 20.5 24q0-1.45 1.025-2.475Q22.55 20.5 24 20.5q1.45 0 2.475 1.025Q27.5 22.55 27.5 24q0 1.45-1.025 2.475Q25.45 27.5 24 27.5Zm0-3.5Zm-2.2 17h4.4l.7-5.6q1.65-.4 3.125-1.25T32.7 32.1l5.3 2.3 2-3.6-4.7-3.45q.2-.85.325-1.675.125-.825.125-1.675 0-.85-.1-1.675-.1-.825-.35-1.675L40 17.2l-2-3.6-5.3 2.3q-1.15-1.3-2.6-2.175-1.45-.875-3.2-1.125L26.2 7h-4.4l-.7 5.6q-1.7.35-3.175 1.2-1.475.85-2.625 2.1L10 13.6l-2 3.6 4.7 3.45q-.2.85-.325 1.675-.125.825-.125 1.675 0 .85.125 1.675.125.825.325 1.675L8 30.8l2 3.6 5.3-2.3q1.2 1.2 2.675 2.05Q19.45 35 21.1 35.4Z' fill='white'/></svg>",
}

function addWidgetToNavbar(type, uid) {
    // Add a widget to the dashboard
    var Element = document.createElement('li');
    Element.setAttribute("id", uid + 'Navbar');
    Element.className = 'bg-dark_lighter rounded-xl mb-4';
    const Container = document.createElement("div");
    Container.className = "flex items-center pl-3 py-3 pr-2 text-gray-50 rounded-xl";
    Element.appendChild(Container);
    const Logo = document.createElement("span");
    Logo.className = "inline-block mr-3";
    Logo.innerHTML = SVG[type];
    Container.appendChild(Logo);
    const Text = document.createElement("span");
    Text.innerHTML = type;
    Container.appendChild(Text);
    const DivAdd = document.createElement("div");
    DivAdd.className = "flex flex-row ml-auto";
    Container.appendChild(DivAdd);
    const DivSpan = document.createElement("div");
    DivSpan.className = "flex justify-center items-center ml-auto hover:bg-blue-500 bg-gray-600 active:bg-blue-700 w-6 h-6 text-xs rounded-full cursor-pointer";
    DivSpan.innerHTML = `<svg id="removeWidget" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' class='p-1'><path d='M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z' fill='white'/></svg>`;
    // DivSpan.addEventListener('click', widgetDisable);
    DivSpan.param = {key: type};
    DivAdd.appendChild(DivSpan);
    document.getElementById("widgetList").appendChild(Element);
}

// Définir des valeurs minimales pour le rafraichissement des données
// Get depuis le front les données
// Build l'url avec les données
// Passer l'url au fonction get, pour qu'elle sexecute et boom ça fonctionne

document.addEventListener('click', async function(el) {
    if(el.target.id == "updateParam") {
        // Get the uid of the widget
        var uid0 = el.target.parentElement.parentElement.parentElement.id;
        var uid1 = uid0.substring(0, uid0.length - 9)
        var widgetType = el.target.parentElement.parentElement.parentElement.children[0].children[1].children[0].innerText;
        // var url = "http://localhost:9090/api/ChuckNorris";
        const updates = {};
        var params = el.target.parentElement.parentElement.children[0].children;
        var param = {};
        for (var i = 0; i < params.length; i++) {
            var key = params[i].children[0].innerText;
            var value = params[i].children[1].children[0].value;
            param[key] = value;
            updates['/widget/' + widgetType + '/' + uid1 + '/' + key] = value; 
        }
        update(ref(database, auth.currentUser.uid), updates);

        // Faire la requete avec les options et stocker le résultat sur Firebase
        var apiReply = await apiCall(widgetType, param);

        // Update the value in the database
        updates['/widget/' + widgetType + '/' + uid1 + '/' + 'apiReply'] = apiReply.value; 
        update(ref(database, auth.currentUser.uid), updates);
    }

    if(el.target.id == "addWidget") {
        // TODO: La détection de l'input est pas top
        var widgetType = el.target.parentElement.parentElement.children[1].innerText;

        const updates = {};
        // Create unique id
        var uid = push(child(ref(database), 'posts')).key;
        // Default refresh rate
        updates['/widget/' + widgetType + '/' + uid + '/refreshRate'] = 60;
        // The status is not necessary, since the widget is displayed base on the presence of the widget instance in the database
        var apiReply = await apiCall(widgetType, param = undefined);
        console.log(apiReply);
        updates['/widget/' + widgetType + '/' + uid + '/apiReply'] = apiReply;
        update(ref(database, auth.currentUser.uid), updates);
        // saveWidgetToDatabase(widgetType);
    }

    if(el.target.id == "removeWidget") {
        // Caler le UID sur le widget pour pouvoir l'identifier
        var widgetType = el.target.parentElement.parentElement.parentElement.children[1].innerText;
        var widgetUidNavbar = el.target.parentElement.parentElement.parentElement.parentElement.id;
        var widgetUid = widgetUidNavbar.substring(0, widgetUidNavbar.length - 6);
        var widgetUidDashboard = widgetUidNavbar.substring(0, widgetUidNavbar.length - 6) + 'Dashboard';

        // If last element, remove the widget from the DOM
        var dashboard = document.getElementById('dashboardJokesNews');

        console.log(dashboard.childElementCount);
        if(dashboard.childElementCount == 1) {
            dashboard.removeChild(dashboard.firstChild);
            removeWidgetFromNavbar(widgetUidNavbar);
        }
        
        remove(ref(database, auth.currentUser.uid + '/widget/' + widgetType + '/' + widgetUid));
    }
});

function apiCall(widgetType, param) {
    var apiReply = "";
    switch (widgetType) {
        case 'Jokes':
            apiReply = getJoke(param);
            break;
        case 'News':
            apiReply = getNews(param);
            break;
        case 'Stocks':
            apiReply = getStocks(param);
            break;
        case 'Volume':
            apiReply = getVolume(param);
            break;
        case 'Price':
            apiReply = getPrice(param);
            break;
        case 'Map':
            apiReply = getMap(param);
            break;
        default:
            break;
    }

    return apiReply;
}

function saveWidgetToDatabase(widgetType) {
    const updates = {};
    // Create unique id
    var uid = push(child(ref(database), 'posts')).key;
    // Default refresh rate
    updates['/widget/' + widgetType + '/' + uid + '/refreshRate'] = 60;
    // The status is not necessary, since the widget is displayed base on the presence of the widget instance in the database
    updates['/widget/' + widgetType + '/' + uid + '/status'] = true;
    update(ref(database, auth.currentUser.uid), updates);
}

function addJokesToDashboard(uid, params) {
    var div1 = document.createElement('div');
    div1.setAttribute('id', uid + 'Dashboard');
    div1.className = 'w-full lg:w-1/2 p-4';
    var div2 = document.createElement('div');
    div2.className = 'bg-dark_lighter rounded-xl shadow overflow-hidden z-10 relative';
    var span1 = document.createElement('div');
    span1.className = 'flex justify-center items-center ml-auto bg-gray-600 hover:bg-blue-500 active:bg-blue-600 w-6 h-6 mr-2 text-xs rounded-full cursor-pointer mt-2';
    span1.innerHTML = SVG['GEAR'];
    div2.appendChild(span1);
    div1.appendChild(div2);
    var div3 = document.createElement('div');
    div3.className = 'px-6 mb-8 round';
    var div4 = document.createElement('div');
    div4.className = 'flex mb-8 justify-between items-center';
    var p1 = document.createElement('p');
    p1.className = 'text-gray-300 font-medium';
    p1.innerText = 'Jokes';
    div4.appendChild(p1);
    div3.appendChild(div4);
    var div5 = document.createElement('div');
    var h1 = document.createElement('h1');
    h1.className = 'text-2xl text-gray-100 font-semibold mb-2';
    h1.innerText = 'Chuck Norris';
    div5.appendChild(h1);
    var p2 = document.createElement('p');
    p2.className = 'block text-xs text-gray-300 font-semibold mb-6';
    p2.setAttribute('id', 'ChuckNorrisJoke');
    p2.innerText = params['apiReply'] != undefined ? params.apiReply : 'Chuck Norris is the best';
    div5.appendChild(p2);
    div3.appendChild(div5);
    div2.appendChild(div3);
    var div6 = document.createElement('div');
    div6.className = 'p-6 flex items-center justify-between';
    var div7 = document.createElement('div');
    var span2 = document.createElement('span');
    span2.className = 'inline-block py-1 px-2 rounded-full bg-white text-xs text-blue-500';
    span2.innerText = '20 septembre 2021';
    div7.appendChild(span2);
    div6.appendChild(div7);
    div2.appendChild(div6);
    div1.appendChild(div2);

    var div8 = document.createElement('div');
    div8.className = 'relative bg-thirdary -mt-4 z-0 rounded-b-xl h-auto hidden';
    var div9 = document.createElement('div');
    div9.className = 'px-8 pt-8 pb-4';
    var div10 = document.createElement('div');
    div10.className = 'flex flex-wrap mb-6 items-center';
    var div11 = document.createElement('div');
    div11.className = 'w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right';
    var label1 = document.createElement('label');
    label1.className = 'text-lg text-white';
    label1.innerText = 'Refresh rate';
    div11.appendChild(label1);
    div10.appendChild(div11);
    var div12 = document.createElement('div');
    div12.className = 'w-full md:w-2/3';
    var input1 = document.createElement('input');
    input1.className = 'w-full px-6 leading-7 bg-white border-2 border-blue-400 rounded-3xl outline-none appearance-none stroke-none';
    input1.type = 'number';
    input1.value = params['Refresh rate'];
    div12.appendChild(input1);
    div10.appendChild(div12);
    div9.appendChild(div10);
    var div13 = document.createElement('div');
    div13.className = 'flex flex-wrap items-center';
    var div14 = document.createElement('div');
    div14.className = 'w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right';
    var label2 = document.createElement('label');
    label2.className = 'text-lg text-white';
    label2.innerText = 'Category';
    div14.appendChild(label2);
    div13.appendChild(div14);
    var div15 = document.createElement('div');
    div15.className = 'w-full md:w-2/3';
    var input2 = document.createElement('input');
    input2.className = 'w-full px-6 leading-7 bg-white border-2 border-blue-400 rounded-3xl outline-none';
    input2.type = 'text';
    input2.value = params['Category'];
    div15.appendChild(input2);
    div13.appendChild(div15);
    div9.appendChild(div13);
    div8.appendChild(div9);
    var div16 = document.createElement('div');
    div16.className = 'flex justify-end';
    var button1 = document.createElement('button');
    button1.className = 'bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold mb-6 mr-8 py-2 px-4 rounded-r-xl rounded-l-xl';
    button1.id = 'updateParam';
    button1.innerText = 'Update';
    div16.appendChild(button1);
    div8.appendChild(div16);
    div1.appendChild(div8);

    document.getElementById("dashboardJokesNews").appendChild(div1);
}

function addNewsToDashboard(uid, params) {
    var div1 = document.createElement('div');
    div1.setAttribute('id', uid + 'Dashboard');
    div1.className = 'w-full lg:w-1/2 p-4';
    var div2 = document.createElement('div');
    div2.className = 'bg-dark_lighter rounded-xl shadow overflow-hidden z-10 relative';
    var span1 = document.createElement('div');
    span1.className = 'flex justify-center items-center ml-auto bg-gray-600 hover:bg-blue-500 active:bg-blue-600 w-6 h-6 mr-2 text-xs rounded-full cursor-pointer mt-2';
    span1.innerHTML = SVG['GEAR'];
    div2.appendChild(span1);
    div1.appendChild(div2);
    var div3 = document.createElement('div');
    div3.className = 'px-6 mb-8 round';
    var div4 = document.createElement('div');
    div4.className = 'flex mb-8 justify-between items-center';
    var p1 = document.createElement('p');
    p1.className = 'text-gray-300 font-medium';
    p1.innerText = 'News';
    div4.appendChild(p1);
    div3.appendChild(div4);
    var div5 = document.createElement('div');
    var h1 = document.createElement('h1');
    h1.className = 'text-2xl text-gray-100 font-semibold mb-2';
    h1.innerText = params['apiReply']['title'];
    div5.appendChild(h1);
    var p2 = document.createElement('p');
    p2.className = 'block text-xs text-gray-300 font-semibold mb-6';
    p2.innerText = params['apiReply']['description'];
    div5.appendChild(p2);
    div3.appendChild(div5);
    div2.appendChild(div3);
    var div6 = document.createElement('div');
    div6.className = 'p-6 flex items-center justify-between';
    var div7 = document.createElement('div');
    var span2 = document.createElement('span');
    span2.className = 'inline-block py-1 px-2 rounded-full bg-white text-xs text-blue-500';
    span2.innerText = params['apiReply']['author'];
    div7.appendChild(span2);
    div6.appendChild(div7);
    div2.appendChild(div6);
    div1.appendChild(div2);

    var div8 = document.createElement('div');
    div8.className = 'relative bg-thirdary -mt-4 z-0 rounded-b-xl h-auto hidden';
    var div9 = document.createElement('div');
    div9.className = 'px-8 pt-8 pb-4';
    var div10 = document.createElement('div');
    div10.className = 'flex flex-wrap mb-6 items-center';
    var div11 = document.createElement('div');
    div11.className = 'w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right';
    var label1 = document.createElement('label');
    label1.className = 'text-lg text-white';
    label1.innerText = 'Refresh rate';
    div11.appendChild(label1);
    div10.appendChild(div11);
    var div12 = document.createElement('div');
    div12.className = 'w-full md:w-2/3';
    var input1 = document.createElement('input');
    input1.className = 'w-full px-6 leading-7 bg-white border-2 border-blue-400 rounded-3xl outline-none appearance-none stroke-none';
    input1.type = 'number';
    div12.appendChild(input1);
    div10.appendChild(div12);
    div9.appendChild(div10);
    var div13 = document.createElement('div');
    div13.className = 'flex flex-wrap mb-6 items-center';
    var div14 = document.createElement('div');
    div14.className = 'w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right';
    var label2 = document.createElement('label');
    label2.className = 'text-lg text-white';
    label2.innerText = 'Category';
    div14.appendChild(label2);
    div13.appendChild(div14);
    var div15 = document.createElement('div');
    div15.className = 'w-full md:w-2/3';
    var input2 = document.createElement('input');
    input2.className = 'w-full px-6 leading-7 bg-white border-2 border-blue-400 rounded-3xl outline-none';
    input2.type = 'text';
    div15.appendChild(input2);
    div13.appendChild(div15);
    div9.appendChild(div13);
    var divCountry = document.createElement('div');
    divCountry.className = 'flex flex-wrap items-center';
    var divCountryText = document.createElement('div');
    divCountryText.className = 'w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right';
    var labelCountryText = document.createElement('label');
    labelCountryText.className = 'text-lg text-white';
    labelCountryText.innerText = 'Country';
    divCountryText.appendChild(labelCountryText);
    divCountry.appendChild(divCountryText);
    var divCountryInput = document.createElement('div');
    divCountryInput.className = 'w-full md:w-2/3';
    var inputCountry = document.createElement('input');
    inputCountry.className = 'w-full px-6 leading-7 bg-white border-2 border-blue-400 rounded-3xl outline-none';
    inputCountry.type = 'text';
    divCountryInput.appendChild(inputCountry);
    divCountry.appendChild(divCountryInput);
    div9.appendChild(divCountry);
    div8.appendChild(div9);
    var div16 = document.createElement('div');
    div16.className = 'flex justify-end';
    var button1 = document.createElement('button');
    button1.className = 'bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold mb-6 mr-8 py-2 px-4 rounded-r-xl rounded-l-xl';
    button1.id = 'updateParam';
    button1.innerText = 'Update';
    div16.appendChild(button1);
    div8.appendChild(div16);
    div1.appendChild(div8);

    document.getElementById("dashboardJokesNews").appendChild(div1);
}

function addStocksToDashboard() {
}

function addVolumeToDashboard() {
}

function addPriceToDashboard() {
}

function addMapToDashboard() {
}

function removeWidgetFromNavbar(uid) {
    document.getElementById(uid).remove();
}

function removeWidgetFromDashboard(uid) {
    document.getElementById(uid).remove();
}


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


// setInterval(function() {
//     getJoke();
// }, 5000);
async function getJoke(param) {
    var url = param == undefined || param['Category'] == "" ? "http://localhost:9090/api/ChuckNorris" : `http://localhost:9090/api/ChuckNorris?category=${param['Category']}`;
    const result = await $.ajax({type:"GET", url:url, data:"", dataType: "json"});
    console.log(result.value);
    return result.value;
}

// setInterval(getNews(), 10000);

async function getNews(param) {
    var url = "http://localhost:9090/api/News";
    if (param != undefined) {
        if (param['Country'] != undefined && param['Country'] != "") {
            url += `?country=${param['Country']}`;
        } else {
            url += "?country=fr";
        }
    
        if (param['Category'] != undefined && param['Category'] != "") {
            url += `&category=${param['Category']}`;       
        }
    }

    console.log(url);
    const result = await $.ajax({type:"GET", url:url, data:"", dataType: "json"});
    return result.articles[1];
    // $.ajax({type:"GET", url:url, data:"", dataType: "json", success: function(data) {
    //     console.log(data.articles[1].content);
    //     $("#NewsTitle").html(data.articles[1].description);
    //     $("#NewsDescription").html(data.articles[1].content);
    //     $("#NewsPaper").html(data.articles[1].author);
    // }, error: function(data) {
    //     // $(".Form").find(".FormMessage").html(data.responseJSON.message);
    //     console.log(data);
    // }});
}

// setInterval(function() {
//     getISSPosition();
// }, 1000);

// function getISSPosition() {
//     $.ajax({type:"GET", url:"http://localhost:9090/api/ISS", data:"", dataType: "json", success: function(data) {
//         map.setCenter([data.iss_position.longitude, data.iss_position.latitude]);
//         const el = document.createElement('div');
//         el.className = 'marker';
//         const marker1 = new mapboxgl.Marker(el).setLngLat([data.iss_position.longitude, data.iss_position.latitude]).addTo(map);
//     }, error: function(data) {
//         $(".Form").find(".FormMessage").html(data.responseJSON.message);
//     }});
// }


document.addEventListener('click', function(el) {
    if(el.target.id == "gear") {
        if(el.target.parentElement.parentElement.parentElement.children[1].classList.contains("hidden")) {  
            el.target.parentElement.parentElement.parentElement.children[1].classList.remove("hidden");
        } else {
            el.target.parentElement.parentElement.parentElement.children[1].classList.add('hidden');
        }
    }
});