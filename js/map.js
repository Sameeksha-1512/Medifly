const L = window.L
export function initMap() {
    const map = L.map('map').setView([12.9716, 77.5946], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const drones = [
        { id: "Drone 1", coords: [12.9716, 77.5946] },
        { id: "Drone 2", coords: [12.9816, 77.6046] },
        { id: "Drone 3", coords: [12.9616, 77.5846] }
    ];

    drones.forEach(drone => {
        L.circleMarker(drone.coords, {
            radius: 8,
            color: "red",
            fillColor: "#ff4d4d",
            fillOpacity: 0.8
        }).addTo(map).bindPopup(drone.id);
    });

    return { map, drones };
}
