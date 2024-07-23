const buttonsContainer = document.querySelector("#portfolio .btn");
const worksGallery = document.querySelector("#portfolio .gallery");

async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        console.log("WORKS OK");
        // Extraire les URLs des images
        const imageUrls = works.map((work) => work.imageUrl)

        // Stocker les URLs dans le localStorage
        localStorage.setItem("imageUrls", JSON.stringify(imageUrls))
        localStorage.setItem('works', JSON.stringify(works));

        return works
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error)
        return []
    }
}
async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories")
        const categories = await response.json()
        console.log("CATEGORIES OK")
        return categories
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error)
        return []
    }
}

function displayWorks(works) {
    worksGallery.innerHTML = ""; // Vider le conteneur

    works.forEach((project) => {
        const projectElement = document.createElement("figure")

        const projectTitle = document.createElement("figcaption")
        projectTitle.textContent = project.title;

        const projectImage = document.createElement("img")
        projectImage.src = project.imageUrl
        projectImage.alt = project.title

        projectElement.appendChild(projectTitle)
        projectElement.appendChild(projectImage)
        worksGallery.appendChild(projectElement)

    });
}
function filterWorks(works, category) {
    if (category === "all") {
        return works;
    }
    return works.filter((project) => project.categoryId === category)
}
// Fonction pour créer les boutons de filtre
function createFilterButtons(categories) {
    buttonsContainer.innerHTML = "" // Vider le conteneur de boutons

    // Créer un bouton "Tous"
    const allButton = document.createElement("button")
    allButton.textContent = "Tous"
    allButton.addEventListener("click", () => clickFilterButtons("all", allButton))
    buttonsContainer.appendChild(allButton)
    allButton.classList.add("btnSelect")

    // Créer des boutons pour chaque catégorie
    categories.forEach((category) => {
        const categoryButton = document.createElement("button")
        categoryButton.textContent = category.name
        categoryButton.addEventListener("click", () => clickFilterButtons(category.id, categoryButton))
        buttonsContainer.appendChild(categoryButton)
    });
}

// Gestion des clics sur les boutons
async function clickFilterButtons(category, clickButton) {
    const buttons = buttonsContainer.querySelectorAll("button")
    buttons.forEach((button) => button.classList.remove("btnSelect"))
    clickButton.classList.add("btnSelect")

    const works = await fetchWorks();
    const filteredWorks = filterWorks(works, category)
    displayWorks(filteredWorks)
}

// Initialiser la page
async function initializePage() {
    const categories = await fetchCategories()
    createFilterButtons(categories)
    clickFilterButtons("all", buttonsContainer.querySelector("button"))
}

initializePage()
