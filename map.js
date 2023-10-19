// when page loads request user location
window.onload = async () => {
    // store array of coordinates into a variable to use
    let coordinates = await getUserCoordinates();
    myMap.coordinates = coordinates;
    // initialize map with coordinates
    myMap.createMap(coordinates);
};

// function to retrieve user location
async function getUserCoordinates() {
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [position.coords.latitude, position.coords.longitude];
}

// create Map Object
const myMap = {
    // create properties
    createMap: function (coordinates) {
        // Create Map
        const map = L.map('map', {
            center: coordinates,
            zoom: 13,
        });

        // Create Tile Layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Create Marker
        const marker = L.marker(coordinates);
        marker.addTo(map).bindPopup('<p1><b>You Are Here</b></p1>').openPopup();
        // assigning map to a property to use outside of the function
        myMap.map = map;
    },
    // use foursquare data to create markers
    addMarkers: function () {
        // create redIcon
        const redIcon = L.icon({
            iconUrl: './images/red-pin.png',
            iconSize: [40, 40],
        });
        // using for loop to refactor old code when creating markers. 5 markers
        for (let i = 0; i < 5; i++) {
            // block of code which creates markers using myMap.markers property to reference the data in the array of parsedData i.e [i]
            L.marker([myMap.markers[i][0].latitude, myMap.markers[i][0].longitude], {
                icon: redIcon,
            })
                .bindPopup(`${myMap.markers[i][1]}`)
                .addTo(myMap.map);
        }
        // old code creating markers one by one and using direct numbers to reference items in the array of parsedData
        // const marker2 = L.marker([myMap.markers[1][0].latitude, myMap.markers[1][0].longitude]).bindPopup(`${myMap.markers[1][1]}`);
        // const marker3 = L.marker([myMap.markers[2][0].latitude, myMap.markers[2][0].longitude]).bindPopup(`${myMap.markers[2][1]}`);
        // const marker4 = L.marker([myMap.markers[3][0].latitude, myMap.markers[3][0].longitude]).bindPopup(`${myMap.markers[3][1]}`);
        // const marker5 = L.marker([myMap.markers[4][0].latitude, myMap.markers[4][0].longitude]).bindPopup(`${myMap.markers[4][1]}`);

        // const markerGroup = L.layerGroup([marker1, marker2, marker3, marker4, marker5]);
        // markerGroup.addTo(myMap.map);
    },
};
// installed foursquare
let options = { method: 'GET', headers: { Accept: 'application/json', Authorization: 'fsq325/tnyqgRdDq6z7ptjuRHL8z37JZOao7vaOWtC2Bz0E=' } };
// used fetch() to get data
async function fetchPlaces(business) {
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=5&ll=${myMap.coordinates}`, options);
    let places = await response.json();
    return places.results;
}
// formatted that data into a locations array
function parseLocations(results) {
    let locations = [];
    results.forEach((result) => {
        let location = [result.geocodes.main, result.name];
        locations.push(location);
    });
    return locations;
}
// added click event listener to submit button
document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    submitButton();
});
// configured submitbutton()
async function submitButton() {
    let selection = document.getElementById('business').value;
    // added await to fetchPlaces() because it was returning undefined
    let fourSquareData = await fetchPlaces(selection);
    let parsedData = parseLocations(fourSquareData);
    // store parsedData into a property on myMap object in order to use for markers
    myMap.markers = parsedData;
    // using parsedData to run addMarkers()
    myMap.addMarkers();
}
