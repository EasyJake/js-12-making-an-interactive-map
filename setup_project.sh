#!/bin/bash

# Define file names
HTML_FILE="index.html"
CSS_FILE="styles.css"
JS_FILE="script.js"

# Function to create a file if it doesn't exist
create_file_if_not_exists() {
  FILE=$1
  CONTENT=$2

  if [ ! -f "$FILE" ]; then
    echo "Creating $FILE..."
    echo "$CONTENT" > $FILE
  fi
}

# HTML structure
read -r -d '' HTML_CONTENT <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailored Travel App</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""/>
</head>
<body>
    <div id="mapid"></div>
    <script src="script.js"></script>
</body>
</html>
EOF

# CSS structure
read -r -d '' CSS_CONTENT <<'EOF'
#mapid { height: 100vh; }
EOF

# JavaScript structure
read -r -d '' JS_CONTENT <<'EOF'
document.addEventListener('DOMContentLoaded', function () {
    // Check for Geolocation support
    if (!('geolocation' in navigator)) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    // Create map
    var mymap = L.map('mapid').setView([0, 0], 13);  // Default view

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(mymap);

    // Get user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        // Set map view to user's location
        mymap.setView([userLat, userLng], 13);

        // Add a marker for the user's location
        var userMarker = L.marker([userLat, userLng]).addTo(mymap);
        userMarker.bindPopup("You are here.").openPopup();
    });

    // TODO: Add Foursquare API integration to get nearby places and show them on the map
});
EOF

# Create files with predefined content if they don't exist
create_file_if_not_exists $HTML_FILE "$HTML_CONTENT"
create_file_if_not_exists $CSS_FILE "$CSS_CONTENT"
create_file_if_not_exists $JS_FILE "$JS_CONTENT"

echo "Project setup complete. Please add your Foursquare API integration in the script.js file."
