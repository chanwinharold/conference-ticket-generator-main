const image = document.querySelector('.ticket__infos__image')
const fullName_one = document.querySelector(".ticket__infos__name")
const fullName_two = document.querySelector(".first-name")
const email = document.querySelector(".email")
const github = document.querySelector(".ticket__infos__github")


let userInfos = localStorage.getItem("userInfos")
if (userInfos) {

    userInfos = JSON.parse(userInfos)

    fullName_one.innerText = userInfos.fullName
    fullName_two.innerText = userInfos.fullName
    email.innerText = userInfos.email
    github.innerText = userInfos.github
}

const datasrc = localStorage.getItem("datasrc")
if (datasrc) {
    image.src = datasrc
}