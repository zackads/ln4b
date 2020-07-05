// Accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Postcode -> ward lookup
const source = document.getElementById("postcode-input");
const result = document.getElementById("group-msg");

let timeout = null;

const inputHandler = function (e) {
  clearTimeout(timeout);

  timeout = setTimeout(function () {
    const postcode = e.target.value;
    const request = new XMLHttpRequest();
  
    request.open("GET", `https://api.postcodes.io/postcodes/${postcode}`, true);
  
    request.onload = function () {
      const data = JSON.parse(this.response);
  
      if (request.status >= 200 && request.status < 400) {
        console.log('success!')
        console.log(data.result.admin_ward);
      } else {
        console.log("Invalid postcode");
      }
    };
    request.send();
  }, 1000)

source.addEventListener("input", inputHandler);
source.addEventListener("propertychange", inputHandler); // for IE8


// Firefox/Edge18-/IE9+ don’t fire on <select><option>
// source.addEventListener('change', inputHandler);

// No group currently exists for the Ashley ward. Why don't you set one up?
// If you need support, speak to
// <a href="mailto:info@bristolcycling.org.uk"
//   >info@bristolcycling.org.uk</a
// >.

// <p>
//           Good news! A local Liveable Neighbourhoods group is active in your
//           area:
//         </p>
//         <p>
//           <img id="fb-logo" src="/assets/fb_logo.png" alt="Facebook logo" />
//           <a href="">Group Name Here</a>
//         </p>
