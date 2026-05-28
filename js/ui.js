export function initUI() {
    const form = document.getElementById("droneForm");
    const statusText = document.getElementById("status");
    const dashboard = document.getElementById("dashboard");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        statusText.innerText = "Drone dispatched...";
        dashboard.innerText = "Preparing drone...";
    });

    window.sendSOS = function () {
        alert("Emergency SOS Sent!");
        statusText.innerText = "High Priority Emergency Activated!";
    };
}
