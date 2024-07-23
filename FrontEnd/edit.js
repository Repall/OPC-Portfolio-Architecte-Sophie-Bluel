const modOff = document.getElementById("edit-bar");
const modifyWorks = document.getElementById("edit");
const modalAddWorks = document.getElementById("openModalAdd")

function editMod() {
    modifyWorks.classList.toggle("hidden");
    modOff.classList.toggle("hidden");

    window.localStorage.removeItem("token");
}

document.addEventListener("DOMContentLoaded", function () {
    const token = window.localStorage.getItem("token");

    if (token !== null) {
        console.log("Token OK");
        editMod();
    }
});


const cancelButton = document.getElementById("closeModalDelete");
const cancelButton2 = document.getElementById("closeModalAdd")

const returnButton = document.getElementById("returnModal")

const modalDelete = document.getElementById("modalDelete");
const modalAdd = document.getElementById("modalAdd")

function openCheck(modal) {
    if (modal.open) {
        console.log("Modal OUVERTE");
    } else {
        console.log("Modal FERMÉE");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // AFFICHER UN PROJET
    async function listWorksModal() {
        const addListWorksModal = document.getElementById("listWorks")

        addListWorksModal.innerHTML = ""

        const works = JSON.parse(localStorage.getItem("works"))

        works.forEach((project, index) => {
            const projectElement = document.createElement("article")

            const iconDelete = document.createElement("i")
            iconDelete.id = "deleteWorks"
            iconDelete.classList = "fa-solid fa-trash-can"
            iconDelete.addEventListener("click", () => deleteImage(index))

            const projectImage = document.createElement("img")
            projectImage.src = project.imageUrl

            projectElement.appendChild(iconDelete)
            projectElement.appendChild(projectImage)
            addListWorksModal.appendChild(projectElement)
        })
    }

    // SUPPRIMER UN PROJET
    async function deleteImage(index) {
        try {
            const works = JSON.parse(localStorage.getItem("works"))
            const imageUrls = JSON.parse(localStorage.getItem("imageUrls"))

            if (index < 0 || index >= works.length) {
                console.error("Index de suppression invalide")
                return
            }

            const workToDelete = works[index]

            // SUPPRIMER DU LOCALSTORAGE
            works.splice(index, 1)
            imageUrls.splice(index, 1)
            localStorage.setItem("works", JSON.stringify(works))
            localStorage.setItem("imageUrls", JSON.stringify(imageUrls))

            // SUPPRIMER DE L'API
            if (workToDelete && workToDelete.id) {
                await fetch(`http://localhost:5678/api/works/${workToDelete.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}` // Ajouter le token dans les en-têtes
                    }
                })
            }

            listWorksModal()
        } catch (error) {
            console.error("Erreur lors de la suppression de l'image :", error)
        }
    }

    // AJOUTER UN PROJET
    document.getElementById("btnSubmit").addEventListener("click", async () => {
        const title = document.getElementById("title").value
        const category = document.getElementById("category").value
        const imageInput = document.getElementById("image")
        const file = imageInput.files[0]

        if (!title || !category || !file) {
            alert("Veuillez remplir tous les champs et sélectionner une image.")
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("category", category)
        formData.append("image", file)

        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}` // Ajouter le token d'authentification
                }
            })

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du projet")
            }

            const newWork = await response.json()

            const works = JSON.parse(localStorage.getItem("works"))
            const imageUrls = JSON.parse(localStorage.getItem("imageUrls"))

            works.push(newWork)
            imageUrls.push(newWork.imageUrl)

            localStorage.setItem("works", JSON.stringify(works))
            localStorage.setItem("imageUrls", JSON.stringify(imageUrls))

            document.getElementById("addProjectForm").reset()
            listWorksModal()
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet :", error)
        }
    })


    // AFFICHER L'APERCU DE L'IMAGE
    document.getElementById("image").addEventListener("change", (event) => {
        const file = event.target.files[0]
        const imagePreview = document.getElementById("imgPreview")
        
        if (file) {
            const reader = new FileReader()

            reader.onload = () => {
                imagePreview.src = reader.result
                imagePreview.style.display = "block"
            }

            reader.readAsDataURL(file)
        } else {
            imagePreview.src = ""
            imagePreview.style.display = "none"
        }
    })

    // AFFICHER LES PROJETS AU CHARGEMENT DE LA PAGE
    listWorksModal()
})



// OUVERTURE DE LA MODAL POUR DELETE LES PROJETS
modifyWorks.addEventListener("click", () => {
    modalDelete.showModal();
    openCheck(modalDelete);
});


// CHANGEMENT DE MODAL
modalAddWorks.addEventListener("click", () => {
    modalDelete.close()
    console.log("Changement de modal")
    modalAdd.showModal()
})
returnButton.addEventListener("click", () => {
    modalAdd.close()
    console.log("Changement de modal")
    modalDelete.showModal()
})


// FERMETURE DE LA MODAL
window.addEventListener("click", () => {
    if (event.target === modalDelete) {
        modalDelete.close();
        openCheck(modalDelete);
    }
});
cancelButton.addEventListener("click", () => {
    modalDelete.close();
    openCheck(modalDelete);
});
cancelButton2.addEventListener("click", () => {
    modalAdd.close();
    openCheck(modalDelete);
});



modOff.addEventListener("click", editMod);
