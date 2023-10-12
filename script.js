/*
Tailored Travel App - Interactive Map Design

Goals:
1. Obtain and display the user's location on a map.
2. Allow the user to select a business type and show the nearest locations on the map.

*/

// 1. Obtain User's Current Location
// This requires using the geolocation API provided by the browser.

/*
function getUserLocation() {
    if geolocation is supported by the browser:
        get current position
        if successful:
            return latitude and longitude
        else:
            handle and display the error
    else:
        alert the user that geolocation is not supported
}
*/

// 2. Display User's Location on Leaflet Map
// Use the Leaflet library to create and display a map. Set the center of the map to the user's current location.

/*
function displayUserLocationOnMap(latitude, longitude) {
    initialize Leaflet map with user's latitude and longitude
    add a tile layer to the map (to get the visual representation of the map)
    add a marker to the user's location
}
*/

// 3. Get Business Type Input from User
// Use a dropdown or input field where the user can select or type a business type.

/*
function getBusinessTypeInput() {
    listen to the change event on the input field or dropdown
    when a business type is selected:
        get the value of the selected business type
        return the business type
}
*/

// 4. Fetch Locations from Foursquare API based on the Selected Business Type
// Use the Foursquare API to fetch the nearest locations of the selected business type.

/*
function fetchLocationsFromFoursquare(latitude, longitude, businessType) {
    make an API request to Foursquare with:
        - user's latitude and longitude
        - selected business type
    if the request is successful:
        extract the top 5 locations from the response
        return the locations
    else:
        handle and display the error
}
*/

// 5. Display the Fetched Locations on the Map
// Use the Leaflet library to add markers for the fetched locations on the map.

/*
function displayFetchedLocationsOnMap(locations) {
    for each location in locations:
        extract latitude and longitude of the location
        add a marker to the map at the location's coordinates
        optionally, add a popup with the location's name or other details
}
*/

// Event Flow:
// 1. On page load, get the user's current location.
// 2. Once the user's location is obtained, display it on the map.
// 3. Listen for changes in the business type input.
// 4. When the user selects a business type, fetch the locations from Foursquare.
// 5. Display the fetched locations on the map.



// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, showError);
// } else {
//     alert("Geolocation is not supported by this browser.");
// }

// function showPosition(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
// }

// function showError(error) {
//     switch(error.code) {
//         case error.PERMISSION_DENIED:
//             alert("User denied the request for Geolocation.");
//             break;
//         case error.POSITION_UNAVAILABLE:
//             alert("Location information is unavailable.");
//             break;
//         case error.TIMEOUT:
//             alert("The request to get user location timed out.");
//             break;
//         case error.UNKNOWN_ERROR:
//             alert("An unknown error occurred.");
//             break;
//     }
// }
// const map = L.map('map').setView([latitude, longitude], 13);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19
// }).addTo(map);
// L.marker([latitude, longitude]).addTo(map).bindPopup('You are here!').openPopup();


// function fetchNearbyPlaces(lat, lon, query) {
//     const apiUrl = `https://api.foursquare.com/v2/venues/explore?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&v=20180323&limit=5&ll=${lat},${lon}&query=${query}`;
    
//     fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//         const venues = data.response.groups[0].items;
//         venues.forEach(venue => {
//             const venueLat = venue.venue.location.lat;
//             const venueLon = venue.venue.location.lng;
//             const venueName = venue.venue.name;
//             L.marker([venueLat, venueLon]).addTo(map).bindPopup(venueName).openPopup();
//         });
//     });
// }

// document.getElementById('businessType').addEventListener('change', function() {
//     fetchNearbyPlaces(latitude, longitude, this.value);
// });



// ############ Version 2 ############
// ############ Version 2 ############
// ############ Version 2 ############
// ############ Version 2 ############
// ############ Version 2 ############

let map;
let markers = [];
let latitude, longitude;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    alert("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    initMap(latitude, longitude);
}

function initMap(lat, lon) {
    map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
    L.marker([lat, lon]).addTo(map).bindPopup('You are here!').openPopup();
}

function showError(error) {
    // ... (unchanged)
}

function fetchNearbyPlaces(lat, lon, query) {
    // Clear out old markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    const apiUrl = `https://api.foursquare.com/v2/venues/explore?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&v=20180323&limit=5&ll=${lat},${lon}&query=${query}`;
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const venues = data.response.groups[0].items;
        venues.forEach(venue => {
            const venueLat = venue.venue.location.lat;
            const venueLon = venue.venue.location.lng;
            const venueName = venue.venue.name;
            const marker = L.marker([venueLat, venueLon]).addTo(map).bindPopup(venueName);
            markers.push(marker);
        });
    });
}

document.getElementById('businessType').addEventListener('change', function() {
    fetchNearbyPlaces(latitude, longitude, this.value);
});
