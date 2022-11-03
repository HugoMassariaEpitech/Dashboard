document.addEventListener('DOMContentLoaded', function() {
    // Select all the services
    // Add
    const JokesAdd = document.getElementById('JokesAdd');
    const NewsAdd = document.getElementById('NewsAdd');
    const StocksAdd = document.getElementById('StocksAdd');
    const ISSAdd = document.getElementById('ISSAdd');
    
    // Get the service list
    const serviceList = document.getElementById('serviceList');
    // Get the widget list
    const widgetList = document.getElementById('widgetList');

    // SVG
    const SVG = {
        Jokes: 
        "<svg class='text-gray-600 w-5 h-5' viewbox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>"
        +"    <path d='M7,11a1,1,0,0,1-2,0C5,9.108,6.232,7,8,7s3,2.108,3,4a1,1,0,0,1-2,0c0-1.054-.679-2-1-2S7,9.946,7,11Zm9-4c-1.768,0-3,2.108-3,4a1,1,0,0,0,2,0c0-1.054.679-2,1-2s1,.946,1,2a1,1,0,0,0,2,0C19,9.108,17.768,7,16,7Zm-.01,7H8.009a.994.994,0,0,0-.955,1.3,5.178,5.178,0,0,0,9.9-.007A.994.994,0,0,0,15.99,14ZM24,12A12.013,12.013,0,0,1,12,24C-3.9,23.4-3.893.6,12,0A12.013,12.013,0,0,1,24,12Zm-2,0A10.011,10.011,0,0,0,12,2c-13.248.5-13.245,19.5,0,20A10.011,10.011,0,0,0,22,12Z' fill='currentColor'></path>"
        +"</svg>",
        News:
        "<svg class='text-gray-600 w-5 h-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='none'>"
        +"    <path d='M456 32h-304C121.1 32 96 57.13 96 88v320c0 13.22-10.77 24-24 24S48 421.2 48 408V112c0-13.25-10.75-24-24-24S0 98.75 0 112v296C0 447.7 32.3 480 72 480h352c48.53 0 88-39.47 88-88v-304C512 57.13 486.9 32 456 32zM464 392c0 22.06-17.94 40-40 40H139.9C142.5 424.5 144 416.4 144 408v-320c0-4.406 3.594-8 8-8h304c4.406 0 8 3.594 8 8V392zM264 272h-64C186.8 272 176 282.8 176 296S186.8 320 200 320h64C277.3 320 288 309.3 288 296S277.3 272 264 272zM408 272h-64C330.8 272 320 282.8 320 296S330.8 320 344 320h64c13.25 0 24-10.75 24-24S421.3 272 408 272zM264 352h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64c13.25 0 24-10.75 24-24S277.3 352 264 352zM408 352h-64C330.8 352 320 362.8 320 376s10.75 24 24 24h64c13.25 0 24-10.75 24-24S421.3 352 408 352zM400 112h-192c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32v-64C432 126.3 417.7 112 400 112z' fill='currentColor'/>"
        +"</svg>",
        Stocks:
        "<svg class='text-gray-600 w-5 h-5' viewbox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>"
        +"    <path d='M23,22H3a1,1,0,0,1-1-1V1A1,1,0,0,0,0,1V21a3,3,0,0,0,3,3H23a1,1,0,0,0,0-2Z' fill='currentColor'></path>"
        +"    <path d='M15,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,15,20Z' fill='currentColor'></path>"
        +"    <path d='M7,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,7,20Z' fill='currentColor'></path>"
        +"    <path d='M19,20a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0V19A1,1,0,0,0,19,20Z' fill='currentColor'></path>"
        +"    <path d='M11,20a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0V19A1,1,0,0,0,11,20Z' fill='currentColor'></path>"
        +"</svg>",
        ISS:
        "<svg class='text-gray-600 w-5 h-5' viewbox='0 0 525 525' fill='none' xmlns='http://www.w3.org/2000/svg'>"
        +"    <path d='M464.933,193.233c-27.519-15.048-58.44-22.78-89.804-22.456h-86.075L224.093,54.789  c-18.86-33.614-54.392-54.435-92.935-54.457h-24.629c-35.3,0-63.917,28.617-63.917,63.917v42.611  c0,11.767,9.539,21.306,21.306,21.306s21.306-9.539,21.306-21.306V64.249c0-11.767,9.539-21.306,21.306-21.306h24.629  c23.13,0.003,44.454,12.503,55.757,32.683l53.307,95.151H63.917C28.617,170.777,0,199.394,0,234.694v42.611  c0,35.3,28.617,63.917,63.917,63.917h176.305l-53.264,95.151c-11.31,20.194-32.654,32.695-55.8,32.683h-24.629  c-11.767,0-21.306-9.539-21.306-21.306V405.14c0-11.767-9.539-21.306-21.306-21.306s-21.306,9.539-21.306,21.306v42.611  c0,35.3,28.617,63.917,63.917,63.917h24.629c38.544-0.022,74.076-20.843,92.935-54.457l64.961-115.988h86.075  c31.363,0.324,62.284-7.408,89.804-22.456C527.657,281.567,527.721,230.433,464.933,193.233z M356.402,298.611H127.834v-85.223  H356.38c23.536,11.467,33.321,39.842,21.854,63.379C373.599,286.282,365.914,293.971,356.402,298.611z M42.611,277.306v-42.611  c0-11.767,9.539-21.306,21.306-21.306h21.306v85.223H63.917C52.15,298.611,42.611,289.073,42.611,277.306z M444.053,281.567  c-8.363,4.656-17.226,8.351-26.419,11.015c11.042-23.183,11.042-50.109,0-73.292c9.194,2.664,18.056,6.359,26.419,11.015  C476.63,249.118,476.63,262.882,444.053,281.567z' fill='currentColor'></path>"
        +"</svg>"
    }


    // To add a widget from the navbar
    // JokesAdd.addEventListener('click', function() {
    //     // Add the Jokes widget
    //     addWidget('Jokes');
    //     const JokesRemove = document.getElementById('JokesRemove');
    // });

    // NewsAdd.addEventListener('click', function() {
    //     // Add the News widget
    //     addWidget('News');
    // });

    // StocksAdd.addEventListener('click', function() {
    //     // Add the Stocks widget
    //     addWidget('Stocks');
    // });

    // ISSAdd.addEventListener('click', function() {
    //     // Add the ISS widget
    //     addWidget('ISS');
    // });

    // function addWidget(service) {
    //     addWidgetToNav(service);
    //     // addDashboardWidget(service);
    // }

    // TODO: Import les différents bouts de code depuis des fichiers séparés
    function addElementToNav(element, type) {
        console.log(element, type);

        // Add a widget to the dashboard
        var Element = document.createElement('li');
    
        Element.className = 'bg-dark_lighter rounded-xl mb-4';
    
        const Container = document.createElement("div");
    
        Container.className = "flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded-xl";
    
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
    
        DivSpan.innerHTML = `<svg id='${element}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' class='p-1'><path d='M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z' fill='white'/></svg>`;
    
        DivAdd.appendChild(DivSpan);
    
        widgetList.appendChild(Element);
    
    }

    function addWidgetToDashboard(service) {
        // Add a widget to the dashboard
        var div = document.createElement('div');    
    }


    // To remove a widget 
    // JokesRemove.addEventListener('click', function() {
    //     // Remove the Jokes widget
    //     removeWidget('JokesRemove');
    // });

    // NewsRemove.addEventListener('click', function() {
    //     // Remove the News widget
    //     removeWidget('NewsRemove');
    // });

    // StocksRemove.addEventListener('click', function() {
    //     // Remove the Stocks widget
    //     removeWidget('StocksRemove');
    // });

    // ISSRemove.addEventListener('click', function() {
    //     // Remove the ISS widget
    //     removeWidget('ISSRemove');
    // });

    function removeWidget(service) {
        removeWidgetFromNav(service);
        // removeWidgetFromDashboard(service);
    }

    // To remove a widget from the Dashboard
    function removeWidgetFromNav(service) {
        // Remove the widget from the navbar
        var li = document.getElementById(service);
        console.log(li);
        // li.parentNode.removeChild(li);
    }

    // To remove a widget from the navbar
    document.addEventListener('click', function(e) {
        // e.target.id === window.event.target.id
        // Remove the dom element if it's a widget
        if (e.target.id === 'widget') {
            console.log("widget");
            // Remove widget from navbar
            e.target.parentElement.parentElement.parentElement.remove();
            // Add service to dashboard
            console.log(e.target.parentElement.parentElement.parentElement.innerHTML);
            addElementToNav('service', e.target.id);
            
            // Remove widget from dashboard

        } else if (e.target.id === 'service') {
            // console.log(e.target);
            // Remove service from navbar
            e.target.parentElement.parentElement.parentElement.remove();
            // Add widget to navbar
            var type = e.target.parentElement.parentElement.children[1].innerHTML;
            addElementToNav('widget', type);
            // Add service to dashboard
            
        }
    }, false);
});