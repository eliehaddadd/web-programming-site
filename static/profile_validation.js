function getValue(id) {
const element = document.getElementById(id);
if (element.value.trim() === "") {
    return "Not provided";
    }
    return element.value.trim();
}

function getSelectText(id) {
const select = document.getElementById(id);
if (select.selectedIndex < 0) {
    return "Not provided";
    }
    return select.options[select.selectedIndex].textContent;
}

function getRadioText(name) {
const radio = document.querySelector('input[name="' + name + '"]:checked');
if (!radio) {
    return "Not selected";
    }
const label =document.querySelector('label[for="' + radio.id + '"]');
    return label.textContent;
}

function getCheckboxText(name) {
const boxes =document.querySelectorAll('input[name="' + name + '"]:checked');
let text = "";
for (let i = 0; i < boxes.length; i++) {
const label =document.querySelector('label[for="' + boxes[i].id + '"]');
    if (text !== "") {
        text += ", ";
        }
    text += label.textContent;
    }
    if (text === "") {
        return "None selected";
    }
return text;
}

function getMultipleSelectText(id) {
const select = document.getElementById(id);
let text = "";
for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].selected) {
        if (text !== "") {
                text += ", ";
            }
        text += select.options[i].textContent;
        }
    }
    if (text === "") {
        return "None selected";
    }
return text;
}

function addRow(labelText, valueText) {

const row = document.createElement("div");
const label = document.createElement("dt");
const value = document.createElement("dd");

row.className = "review-row";

label.textContent = labelText;
value.textContent = valueText;

row.appendChild(label);
row.appendChild(value);

reviewContent.appendChild(row);
}


function buildReview() {

reviewContent.textContent = "";

addRow("Form Version",document.querySelector('input[name="form_version"]').value);
addRow("Student ID", getValue("student_id"));
addRow("Full Name", getValue("fullname"));
addRow("USEK Email", getValue("email"));
addRow("Mobile Number", getValue("phone"));
addRow("Date of Birth", getValue("birthdate"));
addRow("GitHub", getValue("portfolio"));
addRow("GIN446 Website", getValue("gin446"));
addRow("Engineering Major",getSelectText("major"));
addRow("Current GPA / 100", getValue("gpa"));
addRow("Credits Completed", getValue("credits"));
addRow("Expected Graduation",getRadioText("graduation"));
addRow("Graduation Month & Year",getValue("graduation_month"));
addRow("Internship Completed",getRadioText("internship_completed"));
addRow("Areas of Experience",getCheckboxText("skills"));
addRow("Primary Programming Language",getValue("language"));
addRow("Engineering Software Used",getMultipleSelectText("software"));
addRow("Proposed Project Title",getValue("project_title"));
addRow("Preferred Project Area",getSelectText("project_area"));
addRow("Project Description",getValue("description"));
addRow("Preferred Team Size",getValue("team_size"));
addRow("Project Color",getValue("project_color"));
addRow("Preferred Meeting Date",getValue("meeting_date"));
addRow("Preferred Meeting Time",getValue("meeting_time"));

const confirmation =document.getElementById("confirmation");

if (confirmation.checked) {
    addRow("Information Confirmation","Confirmed");
    }
else {
    addRow("Information Confirmation","Not confirmed");
    }
}

const form = document.getElementById("profile-form");
const reviewPanel = document.getElementById("reviewPanel");
const reviewContent = document.getElementById("reviewContent");
const editBtn = document.getElementById("editBtn");
const confirmBtn = document.getElementById("confirmBtn");

form.addEventListener(
    "submit",
    function (event) {
    event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

buildReview();
form.classList.add("form-hidden");
reviewPanel.classList.add("open");
reviewPanel.setAttribute("aria-hidden","false");
    }
);

editBtn.addEventListener(
    "click",
    function () {
        reviewPanel.classList.remove("open");
        reviewPanel.setAttribute("aria-hidden","true");
        form.classList.remove("form-hidden");
    }
);

confirmBtn.addEventListener(
    "click",
    function () {
        form.submit();
    }
);