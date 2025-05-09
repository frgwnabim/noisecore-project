document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("membership-form");
    const errorsDiv = document.getElementById("form-errors");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let errors = [];

        // Name validation
        const name = document.getElementById("name").value.trim();
        if (name.length === 0) {
            errors.push("Name is required.");
        }

        // Email validation (simple, no regex)
        const email = document.getElementById("email").value.trim();
        if (email.length === 0) {
            errors.push("Email is required.");
        } else if (!(email.includes("@") && email.includes("."))) {
            errors.push("Please enter a valid email address.");
        }

        // Gender validation (only male or female)
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        let genderSelected = false;
        genderInputs.forEach(input => {
            if (input.checked) genderSelected = true;
        });
        if (!genderSelected) {
            errors.push("Please select your gender.");
        }

        // Date of Birth validation (must not be empty and at least 13 years old)
        const dob = document.getElementById("dob").value;
        if (!dob) {
            errors.push("Date of birth is required.");
        } else {
            const dobDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();
            const m = today.getMonth() - dobDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
                if (age - 1 < 13) {
                    errors.push("You must be at least 13 years old.");
                }
            } else if (age < 13) {
                errors.push("You must be at least 13 years old.");
            }
        }

        // Password validation (at least 6 characters)
        const password = document.getElementById("password").value;
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters.");
        }

        // Agreement validation
        const agreement = document.getElementById("agreement").checked;
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
        }
    });
});