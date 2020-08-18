// FAQ accordion
var faqAcc = document.getElementsByClassName("faq__accordion");
var i;

for (i = 0; i < faqAcc.length; i++) {
  faqAcc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// Privacy policy accordion
var privAcc = document.getElementById("footer_priv_acc");
privAcc.addEventListener("click", function () {
  this.classList.toggle("active");
  var panel = this.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
});

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
            <p>Great news! A local Liveable Neighbourhoods group is active in your area.</p>
            <a href="${ln_groups[ward].url}"><button class="btn btn-primary cta__fb_btn">Open in Facebook <img class="cta__fb_logo" src="assets/images/fb_logo_white.png" alt="Facebook logo"/></button></a>
          `);
          $("#group-msg").css("display", "inline-flex");
        } else {
          $("#group-msg")
            .html(`<p>No group currently exists for your area. Why don't you set one up?</p>
          <p>If you need support, speak to <a href="mailto:hello@liveablebristol.org.uk">hello@liveablebristol.org.uk</a>`);

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
          <p>You can get in touch directly with <a href="mailto:hello@liveablebristol.org.uk">hello@liveablebristol.org.uk</a> and we'll be able to help you find your local group.`);

      $("#group-msg").css("display", "inline-flex");
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
