function verifyForm() {
  var formData = document.getElementById("form").elements;
  var name = formData["name"].value;
  var phone = formData["tel"].value;
  var email = formData["email"].value;
  var country = formData["country"].value;
  var linkedIn = formData["linkedin"].value;
  var jobTitle = formData["jobTitle"].value;
  var qualification = formData["qualification"].value;
  var file = formData["attachment"].files[0];
  var availabilityRadio = document.querySelectorAll(
    'input[name="availability"]'
  );
  var joiningRadio = document.querySelectorAll('input[name="workingFrom"]');
  var selectedAvailability;
  var selectedJoining;
  //Part or Full time Options
  for (const radioButton of availabilityRadio) {
    if (radioButton.checked) {
      selectedAvailability = radioButton.value;
      break;
    }
  }
  //Joining Date Options
  for (const radioButton of joiningRadio) {
    if (radioButton.checked) {
      selectedJoining = radioButton.value;
      break;
    }
  }
  var data = {
    name,
    phone,
    email,
    country,
    linkedIn,
    jobTitle,
    qualification,
    file,
    selectedAvailability,
    selectedJoining,
  };
  if (
    name == "" ||
    phone == "" ||
    email == "" ||
    country == "" ||
    linkedIn == "" ||
    jobTitle == "" ||
    qualification == "" ||
    selectedAvailability == undefined ||
    selectedJoining == undefined
  ) {
    document.getElementById(
      "Alert"
    ).innerHTML = ` <div class="alert alert-danger"> Please fill all form fields.
        </div>`;
  } else if (!file) {
    document.getElementById(
      "Alert"
    ).innerHTML = ` <div class="alert alert-danger"> Please select your CV file.
            </div>`;
  } else if (file) {
    if (file.size > 5 * 1024 * 1024) {
      document.getElementById(
        "Alert"
      ).innerHTML = ` <div class="alert alert-danger"> File size must be less than 5 MB.</div>`;
    } else {
      sendEmailWithAttachment(data);
      document.getElementById("submitbutton").innerHTML = "Submitting...";
      const btn = document.getElementById("submitbutton");
      btn.disabled = true;
    }
  }
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
      `<p><strong>Subject: </strong>${data.jobTitle}  Career Application - Iyrix Tech</p>` +
      `<p><strong>Job Title: </strong> <br/> ${data.jobTitle} </p>` +
      `<p><strong>Country: </strong> <br/> ${data.country} </p>` +
      `<p><strong>Contact #: </strong> <br/> ${data.phone} </p>` +
      `<p><strong>LinkedIn Profile: </strong> <br/> ${data.linkedIn} </p>` +
      `<p><strong>Qualification: </strong> ${data.qualification}</p>` +
      `<p><strong>Availability: </strong> ${data.selectedAvailability}</p>` +
      `<p><strong>Expected Joining: </strong> ${data.selectedJoining}</p>`;
    ("</div>");
    console.log(emailBody);
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
      Subject: data.jobTitle + "Career Application - Iyrix Tech",
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
          document.getElementById("submitbutton").innerHTML = "SUBMIT";
          document.getElementById("submitbutton").disabled = false;
        }
      });
  };
}

