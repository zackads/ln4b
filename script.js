// # Accordion
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

// # Postcode -> ward lookup
let input = document.getElementById("postcode-input");
let output = document.getElementById("group-msg");

// Only query and display FB group after user finishes typing
let input_timeout = null;

input.addEventListener("keyup", function (e) {
  clearTimeout(input_timeout);

  input_timeout = setTimeout(function () {
    console.log("Input Value:", input.value);

    const postcode = input.value;
    const request = new XMLHttpRequest();

    request.open("GET", `https://api.postcodes.io/postcodes/${postcode}`, true);

    request.onload = function () {
      const postcode_data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
        const ward = postcode_data.result.admin_ward;
        console.log(`ward = ${ward}, url = ${groups[ward]}`);
        output.innerHTML = `<p>Good news! A local Liveable Neighbourhoods group is active in ${ward}:</p>
          <p>
            <img id="fb-logo" src="/assets/fb_logo.png" alt="Facebook logo" />
            <a href="${groups[ward].url}">${groups[ward].name}</a>
          </p>`;
      } else {
        output.innerHTML = `<p>No group currently exists for your area. Why don't you set one up?</p>
        <p>If you need support, speak to <a href="mailto:info@bristolcycling.org.uk">info@bristolcycling.org.uk</a>`;
      }
    };
    request.send();
  }, 1000);
});

const groups = {
  Cotham: {
    name: "Cotham Liveable Streets",
    url: "https://en-gb.facebook.com/cothams/",
  },
  "Lawrence Hill": {
    name: "Liveable Lawrence Hill",
    url: "https://www.facebook.com/pages/Lawrence-Hill-Bristol/242077265821144",
  },
  "Windmill Hill": {
    name: "Walkable Windmill Hill",
    url: "https://en-gb.facebook.com/groups/WMH.VP/",
  },
};
