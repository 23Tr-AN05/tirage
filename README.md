<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="style.css" rel="stylesheet" type="text/css" />
<title>Tirage au sort</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

<div id="loader" class="loader">
    <div class="loader-spinner"></div>
    <p>Chargement des données...</p>
</div>

<div id="particles"></div>

<!-- LOGIN -->
<div id="loginDiv" style="display:none;">
    <div class="login-container">
        <div class="login-card">
            <div class="login-icon">
                <i class="fas fa-chalkboard-user"></i>
            </div>
            <div class="login-title">TIRAGE AU SORT</div>
            <div class="login-subtitle">Espace réservé aux enseignants</div>
            <div class="input-group">
                <label><i class="fas fa-user"></i> Identifiant</label>
                <i class="fas fa-user input-icon"></i>
                <input type="text" id="loginUser" placeholder="Votre identifiant">
            </div>
            <div class="input-group">
                <label><i class="fas fa-lock"></i> Mot de passe</label>
                <i class="fas fa-lock input-icon"></i>
                <input type="password" id="loginPass" placeholder="Votre mot de passe">
            </div>
            <button class="login-button" onclick="login()">
                <i class="fas fa-sign-in-alt"></i> Se connecter
            </button>
            <div id="loginMsg" class="login-message"></div>
        </div>
    </div>
</div>

<!-- CONTENU PRINCIPAL -->
<div id="tirageDiv" style="display:none;">
    <div class="main-header">
        <h1><i class="fas fa-dice-d6"></i> Tirage au Sort</h1>
        <p>Gérez vos tirages et créez des groupes facilement</p>
    </div>

    <!-- TIRAGE -->
    <div class="card">
        <h2><i class="fas fa-random"></i> Tirage aléatoire</h2>
        <div class="control-group">
            <select id="classe">
                <option value="">📚 Choisir une classe</option>
            </select>
            <select id="groupeTirage">
                <option value="all">👥 Toute la classe</option>
                <option value="g1">📘 Groupe 1</option>
                <option value="g2">📙 Groupe 2</option>
            </select>
            <div class="nombre-manuel">
                <select id="nombrePreset">
                    <option value="1">🎯 1 élève</option>
                    <option value="2" selected>🎯 2 élèves</option>
                    <option value="3">🎯 3 élèves</option>
                    <option value="4">🎯 4 élèves</option>
                    <option value="5">🎯 5 élèves</option>
                    <option value="6">🎯 6 élèves</option>
                    <option value="7">🎯 7 élèves</option>
                    <option value="8">🎯 8 élèves</option>
                    <option value="9">🎯 9 élèves</option>
                    <option value="10">🎯 10 élèves</option>
                    <option value="custom">✏️ Saisie manuelle</option>
                </select>
                <input type="number" id="nombreManuel" placeholder="Nb" min="1" max="50" style="display: none;">
            </div>
            <button class="btn-primary" onclick="tirage()"><i class="fas fa-dice"></i> Tirer</button>
            <button class="btn-secondary" onclick="resetTirage()"><i class="fas fa-undo-alt"></i> Réinitialiser</button>
        </div>
        <div id="tirageResult"></div>
    </div>

    <!-- GROUPES -->
    <div class="card">
        <h2><i class="fas fa-layer-group"></i> Création de groupes</h2>
        <div class="control-group">
            <select id="classe2">
                <option value="">📚 Choisir une classe</option>
            </select>
            <select id="groupe2">
                <option value="all">👥 Toute la classe</option>
                <option value="g1">📘 Groupe 1</option>
                <option value="g2">📙 Groupe 2</option>
            </select>
            <select id="taille">
                <option value="2">👥 2 par groupe</option>
                <option value="3">👥 3 par groupe</option>
                <option value="4">👥 4 par groupe</option>
                <option value="5">👥 5 par groupe</option>
                <option value="6">👥 6 par groupe</option>
            </select>
            <button class="btn-success" onclick="creerGroupes()"><i class="fas fa-plus-circle"></i> Créer les groupes</button>
        </div>
        <div id="groupes" class="groupes-grid"></div>
        <div class="group-actions" id="groupActions" style="display:none;">
            <button class="btn-warning" onclick="selectionnerGroupesAleatoire()"><i class="fas fa-dice"></i> Sélectionner la moitié des groupes au hasard</button>
            <button class="btn-secondary" onclick="viderSelectionGroupes()"><i class="fas fa-times"></i> Vider la sélection</button>
        </div>
    </div>

    <!-- EXPORT -->
    <div class="card">
        <h2><i class="fas fa-download"></i> Export des données</h2>
        <div class="control-group">
            <select id="typeExport">
                <option value="tirage">🎲 Tirage uniquement</option>
                <option value="groupes">👥 Groupes uniquement</option>
            </select>
            <select id="format">
                <option value="pdf">📄 PDF</option>
                <option value="odt">📝 ODT</option>
            </select>
            <div class="export-row">
                <label>Nb colonnes :</label>
                <input id="colonnes" type="number" placeholder="Colonnes" style="width: 80px;" value="2">
                <span style="font-size: 12px; color: #666;">(défaut: 2 = Prénom + Nom)</span>
            </div>
            <input id="titre" placeholder="🏷️ Titre du document" style="min-width: 200px;">
            <button class="btn-primary" onclick="exporter()"><i class="fas fa-file-export"></i> Exporter</button>
        </div>
    </div>

    <!-- ADMIN -->
    <div id="adminDiv" style="display:none;">
        <div class="card admin-section">
            <h2><i class="fas fa-tools"></i> Zone Administrateur</h2>
            <div class="control-group">
                <select id="adminClasse">
                    <option value="">📚 Choisir une classe</option>
                </select>
                <select id="adminGroupe">
                    <option value="">👥 Tous les groupes</option>
                </select>
                <input id="adminCols" placeholder="📝 Colonnes supplémentaires (ex: Âge,Email)">
                <button class="btn-primary" onclick="exportAdminPDF()"><i class="fas fa-file-pdf"></i> Export PDF</button>
                <button class="btn-primary" onclick="exportAdminODT()"><i class="fas fa-file-word"></i> Export ODT</button>
            </div>
        </div>
    </div>
</div>

<script>
// Variables globales pour les données chargées
let classesData = {};
let utilisateursData = [];
let configData = {};
let currentUser = null;

// Fonction pour charger les fichiers JSON
async function chargerDonnees() {
    try {
        // Charger les élèves
        const reponseEleves = await fetch('eleves.json');
        if (!reponseEleves.ok) throw new Error('Impossible de charger eleves.json');
        classesData = await reponseEleves.json();
        
        // Charger les utilisateurs
        const reponseUtilisateurs = await fetch('utilisateurs.json');
        if (!reponseUtilisateurs.ok) throw new Error('Impossible de charger utilisateurs.json');
        const utilisateursJson = await reponseUtilisateurs.json();
        utilisateursData = utilisateursJson.utilisateurs;
        
        // Charger la configuration (optionnel)
        try {
            const reponseConfig = await fetch('config.json');
            if (reponseConfig.ok) {
                configData = await reponseConfig.json();
            }
        } catch(e) {
            console.log('Fichier config.json non trouvé, utilisation des valeurs par défaut');
        }
        
        // Cacher le loader et afficher le formulaire de connexion
        document.getElementById('loader').style.display = 'none';
        document.getElementById('loginDiv').style.display = 'block';
        
    } catch (error) {
        console.error('Erreur de chargement:', error);
        document.getElementById('loader').innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 20px; text-align: center; max-width: 500px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ef4444;"></i>
                <h3 style="margin: 20px 0;">Erreur de chargement des données</h3>
                <p>Vérifiez que les fichiers suivants existent dans le même dossier :</p>
                <ul style="text-align: left; margin: 20px;">
                    <li>📄 eleves.json</li>
                    <li>📄 utilisateurs.json</li>
                </ul>
                <p style="color: #666; font-size: 12px;">${error.message}</p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 10px; cursor: pointer;">Réessayer</button>
            </div>
        `;
    }
}

// Démarrer le chargement des données
chargerDonnees();

// Particules
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Gestion de la saisie manuelle du nombre d'élèves
const nombrePreset = document.getElementById('nombrePreset');
const nombreManuel = document.getElementById('nombreManuel');

if (nombrePreset) {
    nombrePreset.addEventListener('change', function() {
        if (this.value === 'custom') {
            nombreManuel.style.display = 'block';
            nombreManuel.value = '';
            nombreManuel.focus();
        } else {
            nombreManuel.style.display = 'none';
        }
    });
}

if (nombreManuel) {
    nombreManuel.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            tirage();
        }
    });
}

function getNombreTirage() {
    if (nombrePreset.value === 'custom') {
        let val = parseInt(nombreManuel.value);
        if (isNaN(val) || val < 1) {
            alert("Veuillez saisir un nombre valide (minimum 1)");
            return null;
        }
        return val;
    } else {
        return parseInt(nombrePreset.value);
    }
}

function login() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;
    const msg = document.getElementById("loginMsg");
    
    // Chercher l'utilisateur dans les données chargées
    const utilisateur = utilisateursData.find(u => u.identifiant === user && u.motdepasse === pass);
    
    if (utilisateur) {
        currentUser = utilisateur;
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("tirageDiv").style.display = "block";
        
        const userClasses = utilisateur.classes;
        const selClasse = document.getElementById("classe");
        const selClasse2 = document.getElementById("classe2");
        
        [selClasse, selClasse2].forEach(sel => {
            sel.innerHTML = '<option value="">📚 Choisir une classe</option>';
            userClasses.forEach(c => {
                if (classesData[c]) {
                    sel.innerHTML += `<option>${c}</option>`;
                }
            });
        });
        
        // Vérifier si l'utilisateur est admin (role: "admin" ou identifiant contient "admin")
        if (utilisateur.role === "admin" || utilisateur.identifiant.includes("admin")) {
            document.getElementById("adminDiv").style.display = "block";
            const adminSel = document.getElementById("adminClasse");
            adminSel.innerHTML = '<option value="">📚 Choisir une classe</option>';
            Object.keys(classesData).forEach(c => adminSel.innerHTML += `<option>${c}</option>`);
            adminSel.addEventListener("change", () => {
                const gSel = document.getElementById("adminGroupe");
                const c = adminSel.value;
                gSel.innerHTML = '<option value="">👥 Tous les groupes</option><option value="g1">Groupe 1</option><option value="g2">Groupe 2</option>';
            });
        }
        msg.textContent = "";
    } else {
        msg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Identifiant ou mot de passe incorrect';
        setTimeout(() => msg.innerHTML = '', 3000);
    }
}

function melanger(t) { let a = [...t]; for (let i = a.length - 1; i > 0; i--) { let j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function getEleves(classe, groupeOption) {
    if (!classe || !classesData[classe]) return [];
    if (groupeOption === "g1") return [...classesData[classe].g1];
    if (groupeOption === "g2") return [...classesData[classe].g2];
    return [...classesData[classe].g1, ...classesData[classe].g2];
}

function tirage() {
    const classe = document.getElementById("classe").value;
    const groupeOption = document.getElementById("groupeTirage").value;
    const nombre = getNombreTirage();
    
    if (nombre === null) return;
    
    if (!classe) { alert("Veuillez sélectionner une classe"); return; }
    
    let eleves = getEleves(classe, groupeOption);
    if (eleves.length === 0) { alert("Aucun élève dans cette sélection"); return; }
    
    if (nombre > eleves.length) {
        alert(`Il n'y a que ${eleves.length} élève(s) dans cette sélection. Le tirage sera limité à ce nombre.`);
    }
    
    const melange = melanger(eleves);
    const nbTirage = Math.min(nombre, eleves.length);
    const selection = melange.slice(0, nbTirage);
    dernierTirage = selection;
    
    const container = document.getElementById("tirageResult");
    
    if (groupeOption === "all") {
        const g1Eleves = classesData[classe].g1;
        const g2Eleves = classesData[classe].g2;
        const selectionG1 = selection.filter(e => g1Eleves.includes(e));
        const selectionG2 = selection.filter(e => g2Eleves.includes(e));
        
        container.innerHTML = `
            <div class="tirage-grid">
                <div class="tirage-col">
                    <h3><i class="fas fa-book-open"></i> Groupe 1</h3>
                    <p>${selectionG1.length > 0 ? selectionG1.map(e => `<i class="fas fa-user"></i> ${e}`).join("<br>") : '<i class="fas fa-times"></i> Aucun'}</p>
                </div>
                <div class="tirage-col">
                    <h3><i class="fas fa-book"></i> Groupe 2</h3>
                    <p>${selectionG2.length > 0 ? selectionG2.map(e => `<i class="fas fa-user"></i> ${e}`).join("<br>") : '<i class="fas fa-times"></i> Aucun'}</p>
                </div>
            </div>
        `;
    } else {
        const groupeNom = groupeOption === "g1" ? "Groupe 1" : "Groupe 2";
        container.innerHTML = `
            <div class="tirage-single">
                <h3><i class="fas fa-users"></i> ${groupeNom}</h3>
                <p>${selection.map(e => `<i class="fas fa-user"></i> ${e}`).join("<br>") || '<i class="fas fa-times"></i> Aucun'}</p>
            </div>
        `;
    }
}

let dernierTirage = [];
let derniersGroupes = [];
let groupesSelectionnes = [];

function resetTirage() {
    document.getElementById("tirageResult").innerHTML = '';
    dernierTirage = [];
}

function creerGroupes() {
    const classe = document.getElementById("classe2").value;
    const groupeOption = document.getElementById("groupe2").value;
    const taille = parseInt(document.getElementById("taille").value);
    
    if (!classe) { alert("Veuillez sélectionner une classe"); return; }
    
    let eleves = getEleves(classe, groupeOption);
    if (eleves.length === 0) { alert("Aucun élève dans cette sélection"); return; }
    
    const melange = melanger(eleves);
    const groupes = [];
    for (let i = 0; i < melange.length; i += taille) {
        groupes.push(melange.slice(i, i + taille));
    }
    derniersGroupes = groupes;
    groupesSelectionnes = [];
    
    const container = document.getElementById("groupes");
    container.innerHTML = "";
    
    groupes.forEach((g, idx) => {
        const div = document.createElement("div");
        const typeCouleur = idx % 2 === 0 ? "type-orange" : "type-teal";
        div.className = `group-card ${typeCouleur}`;
        div.onclick = () => toggleSelectionGroupe(idx);
        div.innerHTML = `
            <h3><i class="fas fa-users"></i> Groupe ${idx + 1}</h3>
            <p>${g.map(e => `<i class="fas fa-user"></i> ${e}`).join("<br>")}</p>
        `;
        container.appendChild(div);
    });
    
    document.getElementById("groupActions").style.display = "flex";
}

function toggleSelectionGroupe(index) {
    const pos = groupesSelectionnes.indexOf(index);
    if (pos === -1) {
        groupesSelectionnes.push(index);
    } else {
        groupesSelectionnes.splice(pos, 1);
    }
    updateGroupesSelectionVisuel();
}

function updateGroupesSelectionVisuel() {
    const cards = document.querySelectorAll(".group-card");
    cards.forEach((card, idx) => {
        if (groupesSelectionnes.includes(idx)) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }
    });
}

function selectionnerGroupesAleatoire() {
    if (!derniersGroupes || derniersGroupes.length === 0) {
        alert("Aucun groupe disponible. Veuillez d'abord créer des groupes.");
        return;
    }
    
    groupesSelectionnes = [];
    const nombreGroupes = derniersGroupes.length;
    const nbASelectionner = Math.ceil(nombreGroupes / 2);
    
    const indices = Array.from({ length: nombreGroupes }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    for (let i = 0; i < nbASelectionner; i++) {
        groupesSelectionnes.push(indices[i]);
    }
    
    groupesSelectionnes.sort((a, b) => a - b);
    updateGroupesSelectionVisuel();
}

function viderSelectionGroupes() {
    groupesSelectionnes = [];
    updateGroupesSelectionVisuel();
}

function extrairePrenomNom(nomComplet) {
    const parts = nomComplet.split(" ");
    if (parts.length === 1) return { prenom: "", nom: parts[0] };
    return { prenom: parts[0], nom: parts.slice(1).join(" ") };
}

function exporterTiragePDF(titre, nbColonnes) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.setFont("Times New Roman");
    doc.setFontSize(14);
    
    let x = 10;
    let y = 20;
    
    doc.setFontSize(16);
    doc.text(titre, x, y);
    y += 10;
    doc.setFontSize(14);
    
    let colonnes = ["Prénom", "Nom"];
    let largeurColonne = 180 / nbColonnes;
    
    let colonnesSupp = [];
    const nbColonnesSupp = Math.max(0, nbColonnes - 2);
    for (let i = 0; i < nbColonnesSupp; i++) {
        colonnesSupp.push(`Colonne ${i + 1}`);
    }
    colonnes = [...colonnes, ...colonnesSupp];
    largeurColonne = 180 / colonnes.length;
    
    colonnes.forEach((col, i) => {
        doc.rect(x + i * largeurColonne, y, largeurColonne, 10);
        doc.text(col, x + i * largeurColonne + 2, y + 7);
    });
    y += 10;
    
    dernierTirage.forEach(eleve => {
        const { prenom, nom } = extrairePrenomNom(eleve);
        let valeurs = [prenom, nom];
        for (let i = 0; i < nbColonnesSupp; i++) {
            valeurs.push("");
        }
        valeurs.forEach((v, i) => {
            doc.rect(x + i * largeurColonne, y, largeurColonne, 10);
            doc.text(v, x + i * largeurColonne + 2, y + 7);
        });
        y += 10;
        
        if (y > 280) {
            doc.addPage();
            y = 20;
            colonnes.forEach((col, i) => {
                doc.rect(x + i * largeurColonne, y, largeurColonne, 10);
                doc.text(col, x + i * largeurColonne + 2, y + 7);
            });
            y += 10;
        }
    });
    
    doc.save(`${titre}.pdf`);
}

function exporterGroupesPDF(titre, nbColonnes) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.setFont("Times New Roman");
    doc.setFontSize(14);
    
    let x = 10;
    let y = 20;
    
    doc.setFontSize(16);
    doc.text(titre, x, y);
    y += 10;
    doc.setFontSize(14);
    
    let colonnes = ["N° Groupe", "Prénom", "Nom"];
    let largeurColonne = 180 / colonnes.length;
    
    colonnes.forEach((col, i) => {
        doc.rect(x + i * largeurColonne, y, largeurColonne, 10);
        doc.text(col, x + i * largeurColonne + 2, y + 7);
    });
    y += 10;
    
    derniersGroupes.forEach((groupe, idxGroupe) => {
        groupe.forEach(eleve => {
            const { prenom, nom } = extrairePrenomNom(eleve);
            let valeurs = [(idxGroupe + 1).toString(), prenom, nom];
            valeurs.forEach((v, i) => {
                doc.rect(x + i * largeurColonne, y, largeurColonne, 10);
                doc.text(v, x + i * largeurColonne + 2, y + 7);
            });
            y += 10;
            
            if (y > 280) {
                doc.addPage();
                y = 20;
                colonnes.forEach((col, i) => {
                    doc.rect(x + i * largeurColonne, y, largeurColonne, 10);
                    doc.text(col, x + i * largeurColonne + 2, y + 7);
                });
                y += 10;
            }
        });
    });
    
    doc.save(`${titre}.pdf`);
}

function exporterTirageODT(titre, nbColonnes) {
    let html = `<html><head><meta charset="UTF-8"><style>
        table { border-collapse: collapse; width: 100%; font-family: "Times New Roman"; font-size: 14pt; }
        td, th { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        h2 { font-family: "Times New Roman"; font-size: 16pt; }
    </style></head><body>`;
    html += `<h2>${titre}</h2>`;
    
    let colonnes = ["Prénom", "Nom"];
    const nbColonnesSupp = Math.max(0, nbColonnes - 2);
    for (let i = 0; i < nbColonnesSupp; i++) {
        colonnes.push(`Colonne ${i + 1}`);
    }
    
    html += `<table><thead><tr>${colonnes.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>`;
    
    dernierTirage.forEach(eleve => {
        const { prenom, nom } = extrairePrenomNom(eleve);
        let valeurs = [prenom, nom];
        for (let i = 0; i < nbColonnesSupp; i++) {
            valeurs.push("");
        }
        html += `<tr>${valeurs.map(v => `<td>${v}</td>`).join("")}</tr>`;
    });
    
    html += `</tbody></table></body></html>`;
    
    let blob = new Blob([html], { type: "application/vnd.oasis.opendocument.text" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${titre}.odt`;
    a.click();
}

function exporterGroupesODT(titre) {
    let html = `<html><head><meta charset="UTF-8"><style>
        table { border-collapse: collapse; width: 100%; font-family: "Times New Roman"; font-size: 14pt; }
        td, th { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        h2 { font-family: "Times New Roman"; font-size: 16pt; }
    </style></head><body>`;
    html += `<h2>${titre}</h2>`;
    html += `<table><thead><tr><th>N° Groupe</th><th>Prénom</th><th>Nom</th></tr></thead><tbody>`;
    
    derniersGroupes.forEach((groupe, idxGroupe) => {
        groupe.forEach(eleve => {
            const { prenom, nom } = extrairePrenomNom(eleve);
            html += `<tr><td>${idxGroupe + 1}</td><td>${prenom}</td><td>${nom}</td></tr>`;
        });
    });
    
    html += `</tbody></table></body></html>`;
    
    let blob = new Blob([html], { type: "application/vnd.oasis.opendocument.text" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${titre}.odt`;
    a.click();
}

function exporter() {
    const type = document.getElementById("typeExport").value;
    const format = document.getElementById("format").value;
    const titre = document.getElementById("titre").value || "Export";
    let nbColonnes = parseInt(document.getElementById("colonnes").value);
    
    if (isNaN(nbColonnes) || nbColonnes < 2) {
        nbColonnes = 2;
    }
    
    if (type === "tirage") {
        if (!dernierTirage || dernierTirage.length === 0) {
            alert("Aucun tirage à exporter. Veuillez d'abord effectuer un tirage.");
            return;
        }
        if (format === "pdf") {
            exporterTiragePDF(titre, nbColonnes);
        } else {
            exporterTirageODT(titre, nbColonnes);
        }
    } else if (type === "groupes") {
        if (!derniersGroupes || derniersGroupes.length === 0) {
            alert("Aucun groupe à exporter. Veuillez d'abord créer des groupes.");
            return;
        }
        if (format === "pdf") {
            exporterGroupesPDF(titre, nbColonnes);
        } else {
            exporterGroupesODT(titre);
        }
    }
}

function getListeAdmin() {
    const c = document.getElementById("adminClasse").value;
    const g = document.getElementById("adminGroupe").value;
    const extraCols = document.getElementById("adminCols").value.split(",").map(s => s.trim()).filter(s => s);
    if (!c) return [];
    let liste = [];
    if (!g || g === "") liste = [...classesData[c].g1, ...classesData[c].g2];
    else if (g === "g1") liste = [...classesData[c].g1];
    else if (g === "g2") liste = [...classesData[c].g2];
    return liste.map(e => {
        let parts = e.split(" ");
        return { prenom: parts[0] || "", nom: parts.slice(1).join(" ") || "", extraCols: extraCols };
    });
}

function exportAdminPDF() {
    const data = getListeAdmin();
    if (!data.length) return alert("Veuillez sélectionner une classe");
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.setFont("Times New Roman");
    doc.setFontSize(14);
    let x = 10, y = 20;
    const allCols = ["Prénom", "Nom"];
    if (data[0].extraCols) allCols.push(...data[0].extraCols);
    const colWidth = 180 / allCols.length;
    const rowHeight = 10;
    allCols.forEach((col, i) => { doc.rect(x + i * colWidth, y, colWidth, rowHeight); doc.text(col, x + i * colWidth + 2, y + 7); });
    y += rowHeight;
    data.forEach(row => {
        let vals = [row.prenom, row.nom];
        if (row.extraCols) row.extraCols.forEach(() => vals.push(""));
        vals.forEach((v, i) => { doc.rect(x + i * colWidth, y, colWidth, rowHeight); doc.text(v, x + i * colWidth + 2, y + 7); });
        y += rowHeight;
        if (y > 280) {
            doc.addPage();
            y = 20;
            allCols.forEach((col, i) => { doc.rect(x + i * colWidth, y, colWidth, rowHeight); doc.text(col, x + i * colWidth + 2, y + 7); });
            y += rowHeight;
        }
    });
    doc.save("export_eleves.pdf");
}

function exportAdminODT() {
    const data = getListeAdmin();
    if (!data.length) return alert("Veuillez sélectionner une classe");
    const allCols = ["Prénom", "Nom"];
    if (data[0].extraCols) allCols.push(...data[0].extraCols);
    let html = `<html><head><meta charset="UTF-8"><style>
        table { border-collapse: collapse; width: 100%; font-family: "Times New Roman"; font-size: 14pt; }
        td, th { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
    </style></head><body><h2>Liste des élèves</h2><table><thead><tr>${allCols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>`;
    data.forEach(r => {
        let vals = [r.prenom, r.nom];
        if (r.extraCols) r.extraCols.forEach(() => vals.push(""));
        html += `<tr>${vals.map(v => `<td>${v}</td>`).join("")}</tr>`;
    });
    html += `</tbody></table></body></html>`;
    let blob = new Blob([html], { type: "application/vnd.oasis.opendocument.text" });
    let a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "export_eleves.odt"; a.click();
}
</script>

</body>
</html>