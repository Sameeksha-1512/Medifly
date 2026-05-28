function showMessage() {
    alert("Welcome to web development!");
}
window.onload = function () {
    const form = document.getElementById("droneForm");
    const statusText = document.getElementById("status")
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        statusText.innerText = "Drone dispatched...";

        setTimeout(() => {
        statusText.innerText = "Drone is en route...";
    }, 3000);

    setTimeout(() => {
        statusText.innerText = "Drone has arrived!";
    }, 6000);

});
}

function sendSOS() {

    alert("Emergency SOS Sent!");

    statusText.innerText = "High Priority Emergency Activated!";

}

document.addEventListener("DOMContentLoaded", function () {

    const map = L.map('map').setView([12.9716, 77.5946], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const dashboard = document.getElementById("dashboard");
    const form = document.getElementById("droneForm");

    // 🚁 Drone locations
    const drones = [
        { id: "Drone 1", coords: [12.9716, 77.5946] },
        { id: "Drone 2", coords: [12.9816, 77.6046] },
        { id: "Drone 3", coords: [12.9616, 77.5846] }
    ];

// drone icon
const droneIcon = L.divIcon({
    className: "drone-icon"
});

    drones.forEach(drone => {
        L.circleMarker(drone.coords, {
            radius: 8,
            color: "red",
            fillColor: "#ff4d4d",
            fillOpacity: 0.8
        })
            .addTo(map)
            .bindPopup(drone.id);
});

    // 📍 USER LOCATION VARIABLES
    let userLat;
    let userLng;

    navigator.geolocation.getCurrentPosition(position => {

        userLat = position.coords.latitude;
        userLng = position.coords.longitude;

        L.marker([userLat, userLng])
            .addTo(map)
            .bindPopup("You are here");

    });

    // 📏 DISTANCE FUNCTION
    function getDistance(lat1, lon1, lat2, lon2) {

        const R = 6371;

        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;

        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

        return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    // 🚁 REQUEST DRONE BUTTON
    function interpolate(lat1, lng1, lat2, lng2, steps) {
    const points = [];

    for (let i = 0; i <= steps; i++) {
        const lat = lat1 + (lat2 - lat1) * (i / steps);
        const lng = lng1 + (lng2 - lng1) * (i / steps);
        points.push([lat, lng]);
    }

    return points;
}
    form.addEventListener("submit", function(event) {

        event.preventDefault();

        // choose drone 1
        const droneLat = drones[0].coords[0];
        const droneLng = drones[0].coords[1];

        // calculate distance
        const distance = getDistance(
            droneLat, droneLng,
            userLat, userLng
        );

        // ETA
        const speed = 40;
        const etaMinutes = Math.round((distance / speed) * 60);

    // create route path points
const path = interpolate(droneLat, droneLng, userLat, userLng, 60);

// draw full route line
L.polyline(path, {
    color: "red",
    weight: 5
}).addTo(map);

// create moving drone marker
let movingDrone = L.marker(drones[0].coords)
    .addTo(map)
    .bindPopup("🚁 Drone");

// animate movement
let i = 0;

function animate() {
    if (i < path.length) {
    //move the same drone pin/ marker.
        movingDrone.setLatLng(path[i]);

        // remaining distance estimation
        const remainingDistance = getDistance(
            path[i][0], path[i][1],
            userLat, userLng
        );

        const speed = 40;
        const liveETA = Math.round((remainingDistance / speed) * 60);

        document.getElementById("dashboard").innerText =
            `🚁 Drone en route — ETA: ${liveETA} minutes`;

        i++;

        setTimeout(animate, 300); // slower + realistic movement

    } else {
        movingDrone.bindPopup("📦 Delivered!").openPopup();

        document.getElementById("dashboard").innerText =
            "📦 Delivered!";
    }
}
animate();
       

        // 🚁 DASHBOARD STATUS
        dashboard.innerText =
            `🚁 Drone dispatched — ETA: ${etaMinutes} minutes`;

        // optional live updates
        setTimeout(() => {
            dashboard.innerText =
                `🚁 Drone is en route — ETA: ${etaMinutes - 2} minutes`;
        }, 3000);

    });

});



