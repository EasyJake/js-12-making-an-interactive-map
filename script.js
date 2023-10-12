class TravelMap {
    constructor() {
        this.map = null;
        this.userMarker = null;
        this.coordinates = null;
    }

    buildMap(coords) {
        if (this.map) {
            this.map.remove(); // If map exists, remove it before creating a new one
        }
        this.map = L.map('map').setView(coords, 14); // 14 is a zoom level suitable for showing nearby businesses

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(this.map);

        this.userMarker = L.marker(coords).addTo(this.map);
        this.userMarker.bindPopup("You are here!").openPopup();
    }
}

const travelMap = new TravelMap();

// Fetch user's location and build map
navigator.geolocation.getCurrentPosition(position => {
    document.getElementById('loadingMessage').style.display = 'none';
    travelMap.coordinates = [position.coords.latitude, position.coords.longitude];
    travelMap.buildMap(travelMap.coordinates);
});

document.getElementById('businessType').addEventListener('change', function() {
    console.log("User selected:", this.value);
    // Here, you can fetch businesses based on user's selection and display on the map
});
