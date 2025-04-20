let regexName = new RegExp("^[A-Za-z]+ [A-Za-z]+$")
let regexEmail = new RegExp("^[A-Za-z0-9]+@[a-z0-9]+\\.[a-z]+$")
let regexGithub = new RegExp("^@[A-Za-z0-9]+$")


document.getElementById("submit-ticket").addEventListener("click", (event) => {

    const uploaded = document.getElementById('uploader')
    const fullName = document.getElementById("name")
    const email = document.getElementById("email")
    const github = document.getElementById("github")
    let counter = 0

    if (uploaded.files[0]) { counter++ }
    if (!regexName.test(fullName.value)) {
        document.querySelector("#name + span").style.display = "inline-block"
        fullName.style.borderColor = "hsl(7, 71%, 60%)"
    } else counter++
    if (!regexEmail.test(email.value)) {
        document.querySelector("#email + span").style.display = "inline-block"
        email.style.borderColor = "hsl(7, 71%, 60%)"
    } else counter++
    if (!regexGithub.test(github.value)) {
        document.querySelector("#github + span").style.display = "inline-block"
        github.style.borderColor = "hsl(7, 71%, 60%)"
    } else counter++

    if (counter === 4) {
        let userInfos = {
            "fullName": fullName.value,
            "email": email.value,
            "github": github.value
        }

        userInfos = JSON.stringify(userInfos)

        localStorage.removeItem("userInfos")
        localStorage.setItem("userInfos", userInfos)
        event.target.href = "ticket.html"
    }
})


document.getElementById('uploader').addEventListener('change', function(event) {
    let uploader = document.querySelector(".form__uploader-section__sub-info")
    const file = event.target.files[0];
    const maxSize = 0.5 * 1024 * 1024; // 500ko

    if (file && file.size < maxSize) {
        uploader.innerText = "Upload your photo (JPG or PNG, max size: 500KB)."
        uploader.style.color = "white"
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
    }
    else {
        uploader.innerText = "File too large. Please upload a photo under 500ko"
        uploader.style.color = "hsl(7, 71%, 60%)"
    }
});



document.getElementById("name").addEventListener("input", (event) => {
    if (!regexName.test(event.target.value)) {
        event.target.style.borderColor = "hsl(7, 71%, 60%)"
        let errorSpan = document.querySelector("#name + span")
        errorSpan.style.display = "inline-block"
    }
})
document.getElementById("email").addEventListener("input", (event) => {
    if (!regexEmail.test(event.target.value)) {
        event.target.style.borderColor = "hsl(7, 71%, 60%)"
        let errorSpan = document.querySelector("#email + span")
        errorSpan.style.display = "inline-block"
    }
})
document.getElementById("github").addEventListener("input", (event) => {
    if (!regexGithub.test(event.target.value)) {
        event.target.style.borderColor = "hsl(7, 71%, 60%)"
        let errorSpan = document.querySelector("#github + span")
        errorSpan.style.display = "inline-block"
    }
})

document.getElementById("name").addEventListener("input", (event) => {
    if (regexName.test(event.target.value)) {
        event.target.style.borderColor = "hsl(252, 6%, 83%)"
        let errorSpan = document.querySelector("#name + span")
        errorSpan.style.display = "none"
    }
})
document.getElementById("email").addEventListener("input", (event) => {
    if (regexEmail.test(event.target.value)) {
        event.target.style.borderColor = "hsl(252, 6%, 83%)"
        let errorSpan = document.querySelector("#email + span")
        errorSpan.style.display = "none"
    }
})
document.getElementById("github").addEventListener("input", (event) => {
    if (regexGithub.test(event.target.value)) {
        event.target.style.borderColor = "hsl(252, 6%, 83%)"
        let errorSpan = document.querySelector("#github + span")
        errorSpan.style.display = "none"
    }
})