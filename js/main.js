import { initMap } from "./map.js";
import { initUI } from "./ui.js";
import { getUserLocation } from "./location.js";
import { startDroneSimulation } from "./drone_animations.js";

initUI();

let map;
let drones;
let userLat, userLng;

window.startApp = function () {

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("map").style.display = "block";

    const result = initMap();
    map = result.map;
    drones = result.drones;

    setTimeout(() => map.invalidateSize(), 200);

    // 📍 GET LOCATION PROPERLY
getUserLocation((lat, lng) => {

    userLat = lat;
    userLng = lng;

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup("📍 You are here")
        .openPopup();

    map.setView([lat, lng], 14);
});

    // 🚁 BUTTON FIX
    document.getElementById("droneForm").addEventListener("submit", function (event) {
        event.preventDefault();

        if (!userLat || !userLng) {
            alert("Waiting for location...");
            return;
        }

        startDroneSimulation(map, drones, userLat, userLng);
    });
};
