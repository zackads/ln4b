// Accordion
var acc = document.getElementsByClassName("faq__accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// # Postcode -> ward lookup
$(document).ready(function () {
  $("#postcode-search-btn").click(function (event) {
    let postcode = $("#postcode-input").val();

    // Get ward from postcode
    $.getJSON(`https://api.postcodes.io/postcodes/${postcode}`, function (
      postcode_details
    ) {
      let ward = postcode_details.result.admin_ward;
      // Get Facebook group name and link from ward
      $.getJSON("assets/data/ln_groups.json", function (ln_groups) {
        if (ln_groups[ward]) {
          $("#group-msg").html(`
            <p>Great news! A local Liveable Neighbourhoods group is active in ${ward}:</p>
            <img class="groupfinder__social-logo" id="fb-logo" src="/assets/images/fb-logo.png" alt="Facebook logo" />
            <a href="${ln_groups[ward].url}">${ln_groups[ward].name}</a>
          `);
          $("#group-msg").css("display", "inline-flex");
        } else {
          $("#group-msg")
            .html(`<p>No group currently exists for your area. Why don't you set one up?</p>
          <p>If you need support, speak to <a href="mailto:info@bristolcycling.org.uk">info@bristolcycling.org.uk</a>`);
          $("#group-msg").css("display", "inline-flex");
        }
      });
    }).fail(function (d, textStatus, error) {
      console.error(
        "getJSON failed, status: " + textStatus + ", error: " + error
      );
      $(
        "#group-msg"
      ).html(`<p>We're having difficulty finding your postcode.  Is it definitely correct?</p>
          <p>You can get in touch directly with <a href="mailto:info@bristolcycling.org.uk">info@bristolcycling.org.uk</a> and we'll be able to help you find your local group.`);
    });
  });
  $("#postcode-input").keypress(function (e) {
    if (e.which == 13) {
      // Enter key pressed
      $("#postcode-search-btn").click();
    }
  });
});

// Prevent 'enter' keypress from submitting form
$("#postcode-lookup").submit(function () {
  return false;
});
