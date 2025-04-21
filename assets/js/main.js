let regexName = new RegExp("^(?!\\s*$).+")
let regexEmail = new RegExp("^[A-Za-z0-9]+@[a-z0-9]+\\.[a-z]+$")
let regexGithub = new RegExp("^@[A-Za-z0-9]+$")

let uploader = document.querySelector(".form__uploader-section__sub-info")
let subInfo = document.querySelector(".form__uploader-section__sub-info")
let nameErrorSpan = document.querySelector("#name + span")
let emailErrorSpan = document.querySelector("#email + span")
let githubErrorSpan = document.querySelector("#github + span")

document.getElementById("submit-ticket").addEventListener("click", (event) => {

    const uploaded = document.getElementById('uploader')
    const fullName = document.getElementById("name")
    const email = document.getElementById("email")
    const github = document.getElementById("github")
    let counter = 0

    let handleError = (rule, targetElement, errorSpan) => {
        if (!rule.test(targetElement.value)) {
            errorSpan.style.display = "inline-block"
            targetElement.style.borderColor = "hsl(7, 71%, 60%)"
        } else counter++;
    }

    if (!uploaded.files[0]) {
        uploader.innerText = "No file uploaded! Please upload a photo."
        uploader.style.color = "hsl(7, 71%, 60%)"
        subInfo.classList.add("content")
    } else counter++;

    handleError(regexName, fullName, nameErrorSpan)
    handleError(regexEmail, email, emailErrorSpan)
    handleError(regexGithub, github, githubErrorSpan)

    if (counter === 4) {
        let userInfos = {
            "fullName": fullName.value,
            "email": email.value,
            "github": github.value }

        userInfos = JSON.stringify(userInfos)
        localStorage.removeItem("userInfos")
        localStorage.setItem("userInfos", userInfos)
        event.target.href = "ticket.html"
    }
})


document.getElementById('uploader').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const maxSize = 0.5 * 1024 * 1024; // 500ko

    if (file && file.size < maxSize) {
        uploader.innerText = "Upload your photo (JPG or PNG, max size: 500KB)."
        uploader.style.color = "white"
        subInfo.classList.remove("content")
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.querySelector('.input-cover');
            img.style.backgroundImage = `url("${e.target.result}")`;
            img.style.backgroundSize = "cover"

            let src = e.target.result
            localStorage.removeItem("datasrc")
            localStorage.setItem("datasrc", src)
        };
        reader.readAsDataURL(file); // Lit le fichier comme une URL de données (base64)
    } else {
        uploader.innerText = "File too large. Please upload a photo under 500ko"
        uploader.style.color = "hsl(7, 71%, 60%)"
        subInfo.classList.add("content")
    }
});

document.getElementById("name").addEventListener("input", (event) => {
    manageError(regexName, event.target, nameErrorSpan)
})
document.getElementById("email").addEventListener("input", (event) => {
    manageError(regexEmail, event.target, emailErrorSpan)
})
document.getElementById("github").addEventListener("input", (event) => {
    manageError(regexGithub, event.target, githubErrorSpan)
})

function manageError(rule, targetElement, errorSpan) {
    if (!rule.test(targetElement.value)) {
        targetElement.style.borderColor = "hsl(7, 71%, 60%)"
        errorSpan.style.display = "inline-block"
    } else {
        targetElement.style.borderColor = "hsl(252, 6%, 83%)"
        errorSpan.style.display = "none"
    }
}