// 

// Importing necessary libraries (e.g., Leaflet.js linked in HTML)

class TravelMap {
    constructor() {
        this.map = null;
        this.userMarker = null;
        this.coordinates = null;
        this.businessMarkers = [];
    }

    buildMap(coords) {
        // Remove any existing map
        if (this.map) this.map.remove();

        // Create a new map view centered on user's coordinates
        this.map = L.map('map').setView(coords, 10);

        // Add the tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);

        // Mark user's location on the map
        this.userMarker = L.marker(coords).addTo(this.map).bindPopup("You are here!").openPopup();
    }

    addBusinessMarkers(businesses) {
        // Clear existing business markers
        this.removeBusinessMarkers();
    
        // Add new markers for each business
        businesses.forEach(business => {
            let marker = L.marker(business.coords).addTo(this.map).bindPopup(business.name);
            this.businessMarkers.push(marker);
        });
    }

    removeBusinessMarkers() {
        // Remove all business markers from the map and clear the array
        this.businessMarkers.forEach(marker => this.map.removeLayer(marker));
        this.businessMarkers = [];
    }
}

// Instance of TravelMap class
const travelMap = new TravelMap();

// Sample business data structure
const businesses = {
    // Various business types and their data...
};

// React to changes in business type selection
document.getElementById('businessType').addEventListener('change', function() {
    if (businesses[this.value]) {
        travelMap.addBusinessMarkers(businesses[this.value]);
    }
});

// Use Geolocation API to set up the map based on user's current location
navigator.geolocation.getCurrentPosition(position => {
    // Hide loading indicator
    document.getElementById('loadingMessage').style.display = 'none';

    // Store user's current coordinates
    travelMap.coordinates = [position.coords.latitude, position.coords.longitude];

    // Build the map centered on user's location
    travelMap.buildMap(travelMap.coordinates);
});

// On page load, initiate map creation
window.onload = async () => {
    try {
        let coordinates = await getUserCoordinates();
        myMap.coordinates = coordinates;
        myMap.createMap(coordinates);

        // Listen for business search submissions
        document.getElementById('submit').addEventListener('click', function (e) {
            e.preventDefault();
            submitButton();
        });
    } catch (error) {
        console.error("Error fetching user's location: ", error);
    }
};

// Async function to get user's current coordinates
async function getUserCoordinates() {
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [position.coords.latitude, position.coords.longitude];
}

// Continue with the rest of your existing functions and application logic...

const myMap = {
    // Existing myMap methods and properties...
};

async function submitButton() {
    // Existing submit button handler logic...
}

// Continue with other necessary functions like fetchPlaces, parseLocations, etc.
