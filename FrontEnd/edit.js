// const result = require("./login")

const mod = document.getElementById("edit-bar")
function editMod() {
    const modify = document.getElementById("edit")
    
    modify.classList.toggle("hidden")
    mod.classList.toggle("hidden")

    window.localStorage.removeItem("token")
}


document.addEventListener("DOMContentLoaded", function() {
    const token = window.localStorage.getItem("token")
    
    if (token !== null) {
        console.log("Token OK")
        editMod()
    }
})

mod.addEventListener("click", editMod)

