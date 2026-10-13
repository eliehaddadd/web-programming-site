//getting the main html elements
const form =
    document.getElementById("profile-form");
const reviewPanel =
    document.getElementById("reviewPanel");
const reviewContent =
    document.getElementById("reviewContent");
const editBtn =
    document.getElementById("editBtn");
const confirmBtn =
    document.getElementById("confirmBtn");


function valueOrNotProvided(value) {
    const text =
        String(value ?? "").trim();
    if (text === "") {
        return "Not provided";
    }
    return text;
}


function getSelectedOptionText(selectId) {
    const select =
        document.getElementById(selectId);
    if (!select || select.selectedIndex < 0) {
        return "Not provided";
    }
    const selectedOption =
        select.options[select.selectedIndex];
    return valueOrNotProvided(
        selectedOption.textContent
    );
}

function getCheckedRadioText(name) {
    const selected =
        document.querySelector(
            `input[name="${name}"]:checked`
        );
    if (!selected) {
        return "Not selected";
    }
    const label =
        document.querySelector(
            `label[for="${selected.id}"]`
        );
    if (label) {
        return label.textContent.trim();
    }
    return selected.value;
}


function getCheckedCheckboxTexts(name) {
    const checkedBoxes =
        document.querySelectorAll(
            `input[name="${name}"]:checked`
        );
    const boxes =
        [...checkedBoxes];
    return boxes.map(function (box) {
        const label =
            document.querySelector(
                `label[for="${box.id}"]`
            );
        if (label) {
            return label.textContent.trim();
        }
        return box.value;
    });
}


function getSelectedOptionTexts(selectId) {
    const select =
        document.getElementById(selectId); 
    const selectedOptions =
        [...select.selectedOptions];
    return selectedOptions.map(
        function (option) {
            return option.textContent.trim();
        }
    );
}

function addReviewRow(labelText, valueText) {
    const row =
        document.createElement("div");
    row.className =
        "review-row";
    const term =
        document.createElement("dt");
    term.textContent =
        labelText;
    const description =
        document.createElement("dd");
    description.textContent =
        valueText;
    row.appendChild(term);
    row.appendChild(description);
    reviewContent.appendChild(row);
}


function buildReview() {
    reviewContent.textContent =
        ""; 


    const skills =
        getCheckedCheckboxTexts("skills");
    const software =
        getSelectedOptionTexts("software");


    addReviewRow(
        "Form Version",
        document.querySelector(
            'input[name="form_version"]'
        ).value
    );
    addReviewRow(
        "Student ID",
        valueOrNotProvided(
            document.getElementById(
                "student_id"
            ).value
        )
    );
    addReviewRow(
        "Full Name",
        valueOrNotProvided(
            document.getElementById(
                "fullname"
            ).value
        )
    );
    addReviewRow(
        "USEK Email",
        valueOrNotProvided(
            document.getElementById(
                "email"
            ).value
        )
    );
    addReviewRow(
        "Mobile Number",
        valueOrNotProvided(
            document.getElementById(
                "phone"
            ).value
        )
    );
    addReviewRow(
        "Date of Birth",
        valueOrNotProvided(
            document.getElementById(
                "birthdate"
            ).value
        )
    );
    addReviewRow(
        "GitHub",
        valueOrNotProvided(
            document.getElementById(
                "portfolio"
            ).value
        )
    );
    addReviewRow(
        "GIN446 Website",
        valueOrNotProvided(
            document.getElementById(
                "gin446"
            ).value
        )
    );


    addReviewRow(
        "Engineering Major",
        getSelectedOptionText("major")
    );
    addReviewRow(
        "Current GPA / 100",
        valueOrNotProvided(
            document.getElementById(
                "gpa"
            ).value
        )
    );
    addReviewRow(
        "Credits Completed",
        valueOrNotProvided(
            document.getElementById(
                "credits"
            ).value
        )
    );
    addReviewRow(
        "Expected Graduation",
        getCheckedRadioText(
            "graduation"
        )
    );
    addReviewRow(
        "Graduation Month & Year",
        valueOrNotProvided(
            document.getElementById(
                "graduation_month"
            ).value
        )
    );
    addReviewRow(
        "Internship Completed",
        getCheckedRadioText(
            "internship_completed"
        )
    );


    addReviewRow(
        "Areas of Experience",
        skills.length > 0
            ? skills.join(", ")
            : "None selected"
    );
    addReviewRow(
        "Primary Programming Language",
        valueOrNotProvided(
            document.getElementById(
                "language"
            ).value
        )
    );
    addReviewRow(
        "Engineering Software Used",
        software.length > 0
            ? software.join(", ")
            : "None selected"
    );


    addReviewRow(
        "Proposed Project Title",
        valueOrNotProvided(
            document.getElementById(
                "project_title"
            ).value
        )
    );
    addReviewRow(
        "Preferred Project Area",
        getSelectedOptionText(
            "project_area"
        )
    );
    addReviewRow(
        "Project Description",
        valueOrNotProvided(
            document.getElementById(
                "description"
            ).value
        )
    );
    addReviewRow(
        "Preferred Team Size",
        valueOrNotProvided(
            document.getElementById(
                "team_size"
            ).value
        )
    );
    addReviewRow(
        "Project Color",
        valueOrNotProvided(
            document.getElementById(
                "project_color"
            ).value
        )
    );
    addReviewRow(
        "Preferred Meeting Date",
        valueOrNotProvided(
            document.getElementById(
                "meeting_date"
            ).value
        )
    );
    addReviewRow(
        "Preferred Meeting Time",
        valueOrNotProvided(
            document.getElementById(
                "meeting_time"
            ).value
        )
    );


    const confirmation =
        document.getElementById(
            "confirmation"
        );
    addReviewRow(
        "Information Confirmation",
        confirmation.checked
            ? "Confirmed"
            : "Not confirmed"
    );
}

form.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();


        if (!form.checkValidity()) {
            alert("Please complete all required fields correctly."); // Show an alert message to the user
            form.reportValidity();
            return;
        }


        buildReview();
        form.classList.add(
            "form-hidden"
        );
        reviewPanel.classList.add(
            "open"
        );
        reviewPanel.setAttribute(
            "aria-hidden",
            "false"
        );
        reviewPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
);


editBtn.addEventListener(
    "click",
    function () {
        reviewPanel.classList.remove(
            "open"
        );
        reviewPanel.setAttribute(
            "aria-hidden",
            "true"
        );
        form.classList.remove(
            "form-hidden"
        );
        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
);

confirmBtn.addEventListener(
    "click",
    function () {
        form.submit();
    }
);
