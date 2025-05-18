document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("membership-form");
    const errorsDiv = document.getElementById("form-errors");
    const agreementCheckbox = document.getElementById("agreement");

    // Ubah warna checkbox 
    agreementCheckbox.addEventListener("change", function () {
        if (agreementCheckbox.checked) {
            agreementCheckbox.style.accentColor = "#ff6a00";
            agreementCheckbox.style.borderColor = "#ff6a00";
        } else {
            agreementCheckbox.style.accentColor = "#d1d1d1";
            agreementCheckbox.style.boxShadow = "none";
            agreementCheckbox.style.borderColor = "#d1d1d1";
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let errors = [];

        // Name validation
        const name = document.getElementById("name").value.trim();
        if (!name) errors.push("Name is required.");

        // Email validation
        const email = document.getElementById("email").value.trim();
        if (!email) {
            errors.push("Email is required.");
        } else if (!(email.includes("@") && email.includes("."))) {
            errors.push("Please enter a valid email address.");
        }

        // Gender validation
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        const genderSelected = Array.from(genderInputs).some(input => input.checked);
        if (!genderSelected) errors.push("Please select your gender.");

        // Date of Birth validation 
        const dob = document.getElementById("dob").value;
        if (!dob) {
            errors.push("Date of birth is required.");
        } else {
            const dobDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - dobDate.getFullYear();
            const m = today.getMonth() - dobDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
                age--;
            }
            if (age < 13) {
                errors.push("You must be at least 13 years old.");
            }
        }

        // Password validation 
        const password = document.getElementById("password").value;
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters.");
        }

        // Agreement validation
        const agreement = agreementCheckbox.checked;
        if (!agreement) {
            errors.push("You must agree to the terms and conditions.");
        }

        // Show errors or success
        if (errors.length > 0) {
            errorsDiv.innerHTML = errors.map(err => `<div>• ${err}</div>`).join("");
        } else {
            errorsDiv.innerHTML = "";
            alert("🎉 Registration successful! Welcome to Noisecore Membership.");
            form.reset();
            // Reset checkbox style after reset
            agreementCheckbox.style.accentColor = "#d1d1d1";
            agreementCheckbox.style.boxShadow = "none";
            agreementCheckbox.style.borderColor = "#d1d1d1";
        }
    });
});