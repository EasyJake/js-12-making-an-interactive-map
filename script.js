// class TravelMap {
//     constructor() {
//         this.map = null;
//         this.userMarker = null;
//         this.coordinates = null;
//     }

//     buildMap(coords) {
//         if (this.map) {
//             this.map.remove(); // If map exists, remove it before creating a new one
//         }
//         this.map = L.map('map').setView(coords, 14); // 14 is a zoom level suitable for showing nearby businesses

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19
//         }).addTo(this.map);

//         this.userMarker = L.marker(coords).addTo(this.map);
//         this.userMarker.bindPopup("You are here!").openPopup();
//     }
// }

// const travelMap = new TravelMap();

// // Fetch user's location and build map
// navigator.geolocation.getCurrentPosition(position => {
//     document.getElementById('loadingMessage').style.display = 'none';
//     travelMap.coordinates = [position.coords.latitude, position.coords.longitude];
//     travelMap.buildMap(travelMap.coordinates);
// });

// document.getElementById('businessType').addEventListener('change', function() {
//     console.log("User selected:", this.value);
//     // Here, you can fetch businesses based on user's selection and display on the map
// });


class TravelMap {
    constructor() {
        this.map = null;
        this.userMarker = null;
        this.coordinates = null;
        this.businessMarkers = []; // To keep track of business markers
    }

    buildMap(coords) {
        if (this.map) {
            this.map.remove(); // If map exists, remove it before creating a new one
        }
        this.map = L.map('map').setView(coords, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(this.map);

        this.userMarker = L.marker(coords).addTo(this.map);
        this.userMarker.bindPopup("You are here!").openPopup();
    }

    // addBusinessMarkers(businesses) {
    //     this.removeBusinessMarkers();
    //     businesses.forEach(business => {
    //         let marker = L.marker(business.coords).addTo(this.map);
    //         marker.bindPopup(business.name);
    //         this.businessMarkers.push(marker);
    //     });
    // }

    addBusinessMarkers(businesses) {
        // First, it calls a method to remove all current business markers from the map.
        // This could be to ensure that the map is clean and only the new set of business markers are shown.
        this.removeBusinessMarkers();
    
        // It then iterates over the 'businesses' array, which is presumably a collection of business objects passed to this method.
        businesses.forEach(business => {
            // For each 'business' object, a map marker is created at the business's coordinates.
            // The 'L.marker' method is part of the Leaflet.js library, a popular open-source JavaScript library for interactive maps.
            let marker = L.marker(business.coords).addTo(this.map);
    
            // The marker is then bound with a popup that displays the business's name.
            // So, when you click on a marker, a popup shows the name of the business at those coordinates.
            marker.bindPopup(business.name);
    
            // The 'marker' for each business is then added to the 'businessMarkers' array.
            // This array probably exists as a property of the class to keep track of the markers currently displayed on the map.
            // Storing these references allows the app to modify or remove the markers later, as seen with the 'removeBusinessMarkers' method call above.
            this.businessMarkers.push(marker);
        });
    }
    
    // easyJake

    removeBusinessMarkers() {
        this.businessMarkers.forEach(marker => this.map.removeLayer(marker));
        this.businessMarkers = [];
    }
}

const travelMap = new TravelMap();

// Dummy data for businesses
const businesses = {
    cafe: [
        { name: "Cafe 1", coords: [34.051235, -118.308478] },
        { name: "Cafe 2", coords: [34.052235, -118.309478] }
    ],
    restaurant: [
        { name: "Restaurant 1", coords: [34.053235, -118.310478] },
        { name: "Restaurant 2", coords: [34.054235, -118.311478] }
    ],
    // ... you can add more dummy data for other business types
};

document.getElementById('businessType').addEventListener('change', function() {
    if (businesses[this.value]) {
        travelMap.addBusinessMarkers(businesses[this.value]);
    }
});

navigator.geolocation.getCurrentPosition(position => {
    document.getElementById('loadingMessage').style.display = 'none';
    travelMap.coordinates = [position.coords.latitude, position.coords.longitude];
    travelMap.buildMap(travelMap.coordinates);
});
