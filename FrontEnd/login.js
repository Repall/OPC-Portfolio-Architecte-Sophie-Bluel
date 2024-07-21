document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");
    
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        const data = {
            email: email,
            password: password
        };

        console.log("Données envoyées:", data);
        
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            console.log("Réponse brute:", response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erreur:", errorText);
                throw new Error(`Erreur lors de la connexion : ${response.status} - ${response.statusText} - ${errorText}`);
            }
            
            const result = await response.json();
            console.log("Réponse de l'API:", result);
            window.localStorage.setItem("token", result.token)
            window.location.href = "index.html";

        } catch (error) {
            console.error("Erreur:", error);
            alert(`Erreur lors de la tentative de connexion.`);
        }
    });
});