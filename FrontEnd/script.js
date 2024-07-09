function getWorks() {
    const works = fetch("http://localhost:5678/api/works")
    .then(works => works.json())
    .then(works => {
        const gallery = document.querySelector(".gallery")

        for (let i = 0; i < works.length; i++) {
            
            const galleryPost = document.createElement("figure")
            gallery.appendChild(galleryPost)
        
            const galleryImage = document.createElement("img")
            galleryImage.src = works[i].imageUrl
            galleryPost.appendChild(galleryImage)
        
            const galleryTitle = document.createElement("figcaption")
            galleryTitle.innerText = works[i].title
            galleryPost.appendChild(galleryTitle)
        }
    })
}

function getCategories() {
    const categories = fetch("http://localhost:5678/api/categories")
    .then(categories => categories.json())
    .then(categories => {

        const button = document.querySelector(".btn")
        const buttonCategeories = document.createElement("button")
        buttonCategeories.innerText = "Tous"
        buttonCategeories.id = "buttonFilter0"
        button.appendChild(buttonCategeories)
        buttonCategeories.classList.add("btnSelect")
        buttonMain = buttonCategeories
        // return buttonMain

        for (let i = 0; i < categories.length; i++) {
            const buttonCategeories = document.createElement("button")
            buttonCategeories.innerText = categories[i].name
            buttonCategeories.id = "buttonFilter" + [i+1]
            button.appendChild(buttonCategeories)
        }
    })
}



getCategories()
getWorks()

// function filterCategories() {
//     console.log("Bouton OK")
// }

// const buttonFilter = document.getElementById("buttonFilter0")
// const test = document.querySelectorAll(".btn button")
// console.log(test)

// test.addEventListener("click", filterCategories)

