/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

//leaflet import for home page

import { Map, TileLayer, Marker, Popup } from '../leaflet-2.0.0-alpha.1/dist/leaflet.js';

const map = new Map('map', {
    center: [42.3601, -71.0589],
    zoom: 10,
});

new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo (map);

//turn into array so that when user clicks on location it goes through the list

//location 1
const dunkinHTML = document.getElementById("popup-dunkin").innerHTML;

new Marker([42.348906, -71.160473]).addTo(map).bindPopup(`<div class="popup-content">${dunkinHTML}</div>`);

//location 2
const targetHTML = document.getElementById("popup-target").innerHTML;

new Marker([42.344903, -71.09933]).addTo(map).bindPopup(`<div class="popup-content">${targetHTML}</div>`);

//location 3
const tjmaxxHTML = document.getElementById("popup-tjmaxx").innerHTML;
//STILL IN WRONG SPOT BUT THESE R THE COORDINATES IDK WHAT IS WRONG
new Marker([42.3418359, -71.121312]).addTo(map).bindPopup(`<div class="popup-content">${tjmaxxHTML}</div>`);

//menu button

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener('click', () => {
    menu.classList.toggle("open");
}
);