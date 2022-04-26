function verifyForm() {
  var formData = document.getElementById("form").elements;
  var name = formData["name"].value;
  var phone = formData["tel"].value;
  var email = formData["email"].value;
  var country = formData["country"].value;
  var message = formData["message"].value;
  var file = formData["attachment"].files[0];

  var data = { name, phone, email, country, message, file };
  if (
    name == "" ||
    phone == "" ||
    email == "" ||
    country == "" ||
    message == ""
  ) {
    document.getElementById(
      "Alert"
    ).innerHTML = ` <div class="alert alert-danger"> Please fill all form fields.
      </div>`;
  } else {
    document.getElementById("Alert").innerHTML = ``;
    if (!file) {
      sendEmail(data);
      document.getElementById("submitbutton").value = "Sending...";
      const btn = document.getElementById("submitbutton");
      btn.disabled = true;
    } else if (file) {
      if (file.size > 5 * 1024 * 1024) {
        document.getElementById(
          "Alert"
        ).innerHTML = ` <div class="alert alert-danger"> File size must be less than 5 MB.</div>`;
      } else {
        sendEmailWithAttachment(data);
        document.getElementById("submitbutton").value = "Sending...";
        const btn = document.getElementById("submitbutton");
        btn.disabled = true;
      }
    }
  }
}
function sendEmail(data) {
  var alert = ` <div class="alert alert-success alert - dismissable container" id="myAlert2">
    Message sent successfully. We will get back to you in 24 hours.</div > `;
  var emailBody =
    "<div>" +
    `<p><strong>From: </strong> ${data.name} ${" "}${data.email}</p> ` +
    `<p><strong>Contact#: </strong> ${data.phone}</p>` +
    `<p><strong>Subject: </strong> Contact Us - Iyrix Tech</p>` +
    `<p><strong>Message Body:</strong> <br/> ${data.message} </p>` +
    "</div>";
  Email.send({
    // Host: "smtp.gmail.com",
    // Username: "aaqib.javaid.0000@gmail.com",
    // Password: "",
    // To: "aaqib.javaid.0000@gmail.com",
    // From: data.email,
    Host: "smtp.gmail.com",
    Username: "info@iyrix.com",
    Password: "P@kistan12",
    To: "info@iyrix.com",
    From: data.email,
    Subject: "Contact Us - Iyrix Tech",
    Body: emailBody,
  })
    .then(() => (document.getElementById("Alert").innerHTML = alert))
    .then(() => document.getElementById("form").reset())
    .then(() => {
      if (alert) {
        document.getElementById("submitbutton").value = "Send Your Request";
        document.getElementById("submitbutton").disabled = false;
      }
    });
}

function sendEmailWithAttachment(data) {
  const file = data.file;
  var alert = ` <div class="alert alert-success alert - dismissable container" id="myAlert2">
    Message sent successfully. We will get back to you in 24 hours.</div > `;
  var reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = function () {
    const dataUri = "data:" + file.type + ";base64," + btoa(reader.result);
    var emailBody =
      "<div>" +
      `<p><strong>From: </strong> ${data.name} ${" "}${data.email}</p> ` +
      `<p><strong>Contact#: </strong> ${data.phone}</p>` +
      `<p><strong>Subject: </strong> Contact Us - Iyrix Tech</p>` +
      `<p><strong>Message Body:</strong> <br/> ${data.message} </p>` +
      "</div>";
    Email.send({
      // Host: "smtp.gmail.com",
      // Username: "irehmanullah@gmail.com",
      // Password: "itqlgiwtmpgprpoj",
      // To: "aaqib.javaid.0000@gmail.com",
      // From: data.email,
      Host: "smtp.gmail.com",
      Username: "info@iyrix.com",
      Password: "P@kistan12",
      To: "info@iyrix.com",
      From: data.email,
      Subject: "Contact Us - Iyrix Tech",
      Body: emailBody,
      Attachments: [
        {
          name: file.name,
          data: dataUri,
        },
      ],
    })
      .then(() => (document.getElementById("Alert").innerHTML = alert))
      .then(() => document.getElementById("form").reset())
      .then(() => {
        if (alert) {
          document.getElementById("submitbutton").value = "Send Your Request";
          document.getElementById("submitbutton").disabled = false;
        }
      });
  };
}
