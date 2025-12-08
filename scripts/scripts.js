/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

//leaflet import for home page

import { Map, TileLayer, Marker, Popup, Icon } from '../leaflet-2.0.0-alpha.1/dist/leaflet.js';

let tempMarker = null;
let pictureURL = null;
let mapCoords = null;
const mapIcon = new Icon({
    iconUrl: 'images/icon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
})

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

new Marker([42.348906, -71.160473], {icon: mapIcon}).addTo(map).bindPopup(`<div class="popup-content">${dunkinHTML}</div>`);

//location 2
const targetHTML = document.getElementById("popup-target").innerHTML;

new Marker([42.344903, -71.09933], {icon: mapIcon}).addTo(map).bindPopup(`<div class="popup-content">${targetHTML}</div>`);

//location 3
const tjmaxxHTML = document.getElementById("popup-tjmaxx").innerHTML;
//STILL IN WRONG SPOT BUT THESE R THE COORDINATES IDK WHAT IS WRONG
new Marker([42.3418359, -71.121312],  {icon: mapIcon}).addTo(map).bindPopup(`<div class="popup-content">${tjmaxxHTML}</div>`);


//add location form

document.addEventListener('DOMContentLoaded', function() {

const sidebarToggle = document.getElementById('sidebar-active');
const addLocationToggle = document.getElementById('addLocation-active');
const addLocationLabel = document.querySelector('.openOverlayBtn');
const locationNameInput = document.getElementById("locationNameInput"); 
const addressInput = document.getElementById('addressInput');
const ratingForm = document.getElementById("rating"); 
const submitButton = document.getElementById("Submit");
const bathroomPicInput = document.getElementById("bathroomPic");
const hoursInput = document.getElementById("hoursInput");

function closeSidebar() {
  if (sidebarToggle.checked) {
    sidebarToggle.checked = false;
  }
}
addLocationLabel.addEventListener('click', closeSidebar);

bathroomPicInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            pictureURL = URL.createObjectURL(file);
        } else {
            pictureURL = null;
        }
    });


function handleMapDblClick(e) {
    if (tempMarker !==null){
        map.removeLayer(tempMarker);
    }
    mapCoords = e.latlng;
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);
    tempMarker = new Marker(e.latlng, {icon: mapIcon}).addTo(map);
}

addLocationToggle.addEventListener('change', function() {
    if (this.checked) {
        map.on('dblclick', handleMapDblClick);
        map.doubleClickZoom.disable();
    } else {
        map.off('dblclick', handleMapDblClick);
        map.doubleClickZoom.enable();
        if (tempMarker !== null){
            map.removeLayer(tempMarker);
            tempMarker = null;
        }
    }
});

function handleSubmit(event) {
        event.preventDefault(); 
        
        const name = locationNameInput.value.trim();
        const addressText = addressInput.value.trim();
        const hours = hoursInput.value.trim();
        const selectedRating = ratingForm.querySelector('input[name="rating"]:checked');
        const ratingValue = selectedRating ? '⭐'.repeat(parseInt(selectedRating.value)) : 'No rating'; 

        if (!name || !addressText) {
            alert('Please enter a Name and Address.');
            return;
        }
        if (!mapCoords){
            alert('Please double-click the map to select a location.');
            return;
        }

        const photoHTML = pictureURL ? `<img src="${pictureURL}" alt="Bathroom Photo" class="bathroom-photos" style="max-width: 100%; height: auto;">`: '';

        const newPopupHTML = `
            <div class="popup-content">
                <h3>${name} (User Added)</h3>
                <ol>
                    <li>Address: ${addressText}</li>
                    <li>Cleanliness: ${ratingValue}</li>
                    <li>Hours: ${hours}</li>
                </ol>
                ${photoHTML}
            </div>
        `;
        

        if (tempMarker !== null) {
            map.removeLayer(tempMarker);
            tempMarker = null;
        }
        

        new Marker([mapCoords.lat, mapCoords.lng], {icon: mapIcon})
            .addTo(map)
            .bindPopup(newPopupHTML)
            .openPopup(); 
        locationNameInput.value = '';
        addressInput.value = '';
        if(selectedRating) selectedRating.checked = false;

        bathroomPicInput.value = ''; 
        pictureURL = null;
        mapCoords = null;

        addLocationToggle.checked = false;
    }
    
    submitButton.addEventListener('click', handleSubmit);
});