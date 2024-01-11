document.addEventListener('DOMContentLoaded', function () {
    // Show the login modal when the page is loaded
    document.getElementById('login-modal').style.display = 'flex';
});

function attemptLogin() {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var loginModal = document.getElementById('login-modal');
    var mainContent = document.getElementById('main-content');

    var username = usernameInput.value;
    var password = passwordInput.value;

    // Check if the entered username and password are correct
    if (username === 'admin' && password === 'root') {
        // Hide the login modal and show the main content if the credentials are correct
        loginModal.style.display = 'none';
        mainContent.classList.remove('hidden');

        // Call the functions to update location info and clock when the page loads
        updateLocationInfo();
        updateClock();

        // Set intervals to update location info every minute and clock every second
        setInterval(updateLocationInfo, 60000); // Update location info every minute
        setInterval(updateClock, 1000); // Update clock every second
    } else {
        // Display an error message or take appropriate action for incorrect credentials
        alert('Invalid username or password. Please try again.');
    }

    // Clear the input fields
    usernameInput.value = '';
    passwordInput.value = '';
}

var currentHour = -1;
var currentMinute = -1;
var currentSecond = -1;

function updateClock() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    updateDigit("hour-tens", Math.floor(hours / 10));
    updateDigit("hour-units", hours % 10);
    updateDigit("minute-tens", Math.floor(minutes / 10));
    updateDigit("minute-units", minutes % 10);
    updateDigit("second-tens", Math.floor(seconds / 10));
    updateDigit("second-units", seconds % 10);
}

function updateDigit(id, newValue) {
    var element = document.getElementById(id);

    if (element.innerText !== newValue.toString()) {
        element.classList.add("fade-out");
        setTimeout(function () {
            element.innerText = newValue;
            element.classList.remove("fade-out");
        }, 500); // Adjust the delay based on your preference
    }
}

function updateLocationInfo() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip-address').innerText = 'Your IP Address: ' + data.ip;
            document.getElementById('user-location').innerText = 'Your Location: ' + data.city + ', ' + data.region + ', ' + data.country;
        })
        .catch(error => console.error('Error fetching IP info:', error));
}
