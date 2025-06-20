// Checkboxes
const checkboxes = document.querySelectorAll(".themeChoices");
let currentlyChecked = null;

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            currentlyChecked = checkbox;
            checkboxes.forEach((otherCheckbox) => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        } else {
            currentlyChecked = null;
        }
    })
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
    const resumeName = document.getElementById("resumeNameHeader");
    const resumeEmail = document.getElementById("resumeEmailHeader");

    appendMessage("userText", userInput);

    if (step === 0) {
        userName = userInput;
        setTimeout(() => {
            botAsk(`Thanks, ${userName}!`);
        }, 500);
        setTimeout(() => {
            resumeName.innerHTML = userName;
        }, 1000);
        setTimeout(() => {
            botAsk("Next, what's your email address?");
        }, 1500);
        step++;
    } else if (step === 1) {
        userEmail = userInput;
        setTimeout(() => {
            botAsk(`Thanks, ${userName}!`);
        }, 500);
        setTimeout(() => {
            resumeEmail.innerHTML = userEmail;
        }, 1000);
        setTimeout(() => {
            botAsk(`Your email is ${userEmail}`);
        }, 1500);
        step++;
    } else {
        setTimeout(() => {
            botAsk("Thanks, more to come!")
        }, 500);
    }

    input.value = "";
});