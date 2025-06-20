// Checkboxes
const checkboxes = document.querySelectorAll(".themeChoices");
const defaultCheckbox = document.getElementById("simpleStyle");
let currentlyChecked = null;

const resumeName = document.getElementById("resumeNameHeader");
const resumeEmail = document.getElementById("resumeEmailHeader");

const resumeSummaryTitle = document.getElementById("resumeSummaryTitle");
const resumeSummaryContent = document.getElementById("resumeSummaryContent");

const resumeExperienceTitle = document.getElementById("resumeExperienceTitle");
const resumeExperienceJob = document.getElementById("resumeExperienceJob");
const resumeExperienceDates = document.getElementById("resumeExperienceDates");
const resumeExperienceContent = document.getElementById("resumeExperienceContent");

const resumeEducationTitle = document.getElementById("resumeEducationTitle");
const resumeEducationSchool = document.getElementById("resumeEducationSchool");
const resumeEducationDates = document.getElementById("resumeEducationDates");
const resumeEducationContent = document.getElementById("resumeEductionContent");

const resumeSkillsTitle = document.getElementById("resumeSkillsTitle");
const resumeSkillsContent = document.getElementById("resumeSkillsContent");

const resumePrimaryItems = [
    resumeName, resumeSummaryTitle, resumeExperienceTitle, resumeEducationTitle, resumeSkillsTitle
];

const resumeSecondaryItems = [
    resumeEmail, resumeSummaryContent, resumeExperienceJob, resumeExperienceDates, resumeExperienceContent, resumeEducationSchool, resumeEducationDates, resumeEducationContent, resumeSkillsContent
];

let resumeThemePrimaryFont = "Manrope";
let resumeThemeSecondaryFont = "Inter";

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        // If this box is checked
        if (checkbox.checked) {
            // Uncheck all other checkboxes
            checkboxes.forEach((otherCheckbox) => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });

            currentlyChecked = checkbox;

            // Apply font themes based on checked checkbox
            switch (checkbox.id) {
                case "modernRefresh":
                    resumeThemePrimaryFont = "Lora";
                    resumeThemeSecondaryFont = "Chivo";
                    break;
                case "simpleStyle":
                    resumeThemePrimaryFont = "Manrope";
                    resumeThemeSecondaryFont = "Inter";
                    break;
                case "gracefulElegance":
                    resumeThemePrimaryFont = "DM Serif Display";
                    resumeThemeSecondaryFont = "Newsreader";
                    break;
                case "smoothFinish":
                    resumeThemePrimaryFont = "Space Mono";
                    resumeThemeSecondaryFont = "Work Sans";
                    break;
            }

            // Apply font styles to resume elements
            resumePrimaryItems.forEach(item => {
                item.style.fontFamily = resumeThemePrimaryFont;
                if (resumeThemePrimaryFont === "Space Mono") {
                    item.style.letterSpacing = "-1px";
                    item.style.textTransform = "uppercase";
                } else {
                    item.style.letterSpacing = "normal";
                    item.style.textTransform = "none";
                }
            });

            resumeSecondaryItems.forEach(item => {
                item.style.fontFamily = resumeThemeSecondaryFont;
            });

        } else {
            // If the user unchecks the box and no boxes are checked, recheck the default
            const anyChecked = [...checkboxes].some(cb => cb.checked);
            if (!anyChecked) {
                defaultCheckbox.checked = true;
                defaultCheckbox.dispatchEvent(new Event("change"));
            }
        }
    });
});

// Chat
const chatbox = document.getElementById("chatbox");
const form = document.getElementById("userInput");
const input = document.getElementById("textInput");

let userName = "";
let userEmail = "";

let step = 0;

function appendMessage(className, text) {
    const p = document.createElement("p");
    p.className = className;
    const span = document.createElement("span");
    span.textContent = text;
    p.appendChild(span);
    chatbox.appendChild(p);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function botAsk(question) {
    appendMessage("botText", question);
}

setTimeout(() => {
    botAsk("Hi! Let's get started with your resume.")
}, 500);

setTimeout(() => {
    botAsk("What's your first and last name?")
}, 2500);

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const userInput = input.value.trim();
    if (!userInput) return;

    appendMessage("userText", userInput);

    if (step === 0) {
        userName = userInput;
        setTimeout(() => {
            resumeName.innerHTML = userName;
        }, 500);
        setTimeout(() => {
            botAsk("Next, what's your email address?");
        }, 1000);
        step++;
    } else if (step === 1) {
        userEmail = userInput;
        setTimeout(() => {
            botAsk(`Thanks, ${userName.split(" ")[0]}!`);
        }, 500);
        setTimeout(() => {
            resumeEmail.innerHTML = userEmail;
        }, 1000);
        step++;
        console.log(step);
    } else if (step === 2) {
        setTimeout(() => {
            botAsk("More to come!")
        }, 500);
    }

    input.value = "";
});