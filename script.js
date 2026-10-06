console.log("Bonjour");

// Récupération des éléments HTML
const champSite = document.getElementById("site");
const champIdentifiant = document.getElementById("identifiant");
const champMotDePasse = document.getElementById("motDePasse");
const btnAjouter = document.getElementById("btnAjouter");
const btnGenerer = document.getElementById("btnGenerer");
const listeComptes = document.getElementById("listeComptes");

// Tableau des comptes
let comptes = JSON.parse(localStorage.getItem("comptes")) || [];

// Ajouter un compte
btnAjouter.addEventListener("click", function () {
    const site = champSite.value;
    const identifiant = champIdentifiant.value;
    const motDePasse = champMotDePasse.value;

    if (site === "") {
        console.log("Le site est obligatoire");
        return;
    }

    if (identifiant === "") {
        console.log("L'identifiant est obligatoire");
        return;
    }

    if (motDePasse === "") {
        console.log("Le mot de passe est obligatoire");
        return;
    }

    if (motDePasse.length < 8) {
        console.log("Le mot de passe doit contenir au moins 8 caractères");
        return;
    }

    let robustesse;

    if (motDePasse.length < 8) {
        robustesse = "Faible";
    } else if (motDePasse.length < 12) {
        robustesse = "Moyen";
    } else {
        robustesse = "Fort";
    }

    console.log("Site :", site);
    console.log("Identifiant :", identifiant);
    console.log("Mot de passe :", motDePasse);
    console.log("Robustesse :", robustesse);

    const compte = {
        site: site,
        identifiant: identifiant,
        motDePasse: motDePasse
    };

    comptes.push(compte);

    sauvegarder();
    afficherComptes();

    champSite.value = "";
    champIdentifiant.value = "";
    champMotDePasse.value = "";
});

// Générateur de mot de passe
function genererMotDePasse() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    let motDePasse = "";

    for (let i = 0; i < 12; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        motDePasse += caracteres[index];
    }

    return motDePasse;
}

btnGenerer.addEventListener("click", function () {
    champMotDePasse.value = genererMotDePasse();
});

// Afficher les comptes
function afficherComptes() {
    listeComptes.innerHTML = "";

    for (const compte of comptes) {
        const zone = document.createElement("div");
        zone.className = "compte";

        const site = document.createElement("p");
        site.textContent = "Site : " + compte.site;

        const identifiant = document.createElement("p");
        identifiant.textContent = "Identifiant : " + compte.identifiant;

        const motDePasse = document.createElement("p");
        motDePasse.textContent = "Mot de passe : " + compte.motDePasse;

        const btnMasquer = document.createElement("button");
        btnMasquer.textContent = "Masquer";

        const btnSupprimer = document.createElement("button");
        btnSupprimer.textContent = "Supprimer";

        btnMasquer.addEventListener("click", function () {
            if (motDePasse.textContent.includes("••••••••")) {
                motDePasse.textContent = "Mot de passe : " + compte.motDePasse;
                btnMasquer.textContent = "Masquer";
            } else {
                motDePasse.textContent = "Mot de passe : ••••••••";
                btnMasquer.textContent = "Afficher";
            }
        });

        btnSupprimer.addEventListener("click", function () {
            const index = comptes.indexOf(compte);
            comptes.splice(index, 1);

            sauvegarder();
            afficherComptes();
        });

        zone.appendChild(site);
        zone.appendChild(identifiant);
        zone.appendChild(motDePasse);
        zone.appendChild(btnMasquer);
        zone.appendChild(btnSupprimer);

        listeComptes.appendChild(zone);
    }
}

// Sauvegarder dans localStorage
function sauvegarder() {
    localStorage.setItem("comptes", JSON.stringify(comptes));
}

// Afficher les comptes au démarrage
afficherComptes();

