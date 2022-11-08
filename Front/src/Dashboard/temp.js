function addElementToService(type) {
    // Add a widget to the dashboard
    var Element = document.createElement('li');
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
    DivSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="p-1"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill="white" /></svg>`;
    DivSpan.addEventListener('click', widgetEnable);
    DivSpan.param = {key: type};
    DivAdd.appendChild(DivSpan);
    document.getElementById("serviceList").appendChild(Element);
}


function widgetDisable(data) {
    const updates = {};
    updates['/widget/Jokes/' + data.currentTarget.param.key + '/status'] = false;
    update(ref(database, auth.currentUser.uid), updates);
}


function widgetEnable(data) {
    const Update = {};
    Update['/widget/' + data.currentTarget.param.key + '/status/'] = true;
    update(ref(database, auth.currentUser.uid), Update);
}