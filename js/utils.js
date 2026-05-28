export function getDistance(lat1, lon1, lat2, lon2) {
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

export function interpolate(lat1, lng1, lat2, lng2, steps) {
    const points = [];

    for (let i = 0; i <= steps; i++) {
        const lat = lat1 + (lat2 - lat1) * (i / steps);
        const lng = lng1 + (lng2 - lng1) * (i / steps);
        points.push([lat, lng]);
    }

    return points;
}
