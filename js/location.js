export function getUserLocation(callback) {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // send data back to main.js
            callback(lat, lng);
        },
        (error) => {
            alert("Permission denied or location unavailable");
            console.log(error);
        }
    );
}
