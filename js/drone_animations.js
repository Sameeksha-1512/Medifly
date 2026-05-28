import { getDistance, interpolate } from "./utils.js";

export function startDroneSimulation(map, drones, userLat, userLng) {

    const droneLat = drones[0].coords[0];
    const droneLng = drones[0].coords[1];

    const distance = getDistance(droneLat, droneLng, userLat, userLng);
    const etaMinutes = Math.round((distance / 40) * 60);

    const path = interpolate(droneLat, droneLng, userLat, userLng, 60);

    L.polyline(path, { color: "red", weight: 5 }).addTo(map);

    let movingDrone = L.marker(drones[0].coords).addTo(map);

    let i = 0;

    function animate() {
        if (i < path.length) {
            movingDrone.setLatLng(path[i]);

            const remainingDistance = getDistance(
                path[i][0], path[i][1],
                userLat, userLng
            );

            const liveETA = Math.round((remainingDistance / 40) * 60);

            document.getElementById("dashboard").innerText =
                `🚁 Drone en route — ETA: ${liveETA} minutes`;

            i++;
            setTimeout(animate, 300);
        } else {
            movingDrone.bindPopup("📦 Delivered!").openPopup();
            document.getElementById("dashboard").innerText = "📦 Delivered!";
        }
    }

    animate();
}
