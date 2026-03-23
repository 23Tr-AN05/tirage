<html>
 <title>Mathématiques</title>
 <head>
    <meta charset="utf-8"/>
    <link href="style.css" rel="stylesheet" type="text/css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <script src="s.js" data-import=""></script>
    <script src="tirage.js" data-import=""></script>
 </head>
 <body onload="body()">
 
<h2>Tirage au sort</h2>

<!-- Menus déroulants -->
<div>
    <label>Classe :</label>
    <select id="classe">
        <option value="">--choisir--</option>
        <option value="5A">5A</option>
        <option value="5B">5B</option>
    </select>
    <label>Groupe :</label>
    <select id="groupe">
        <option value="">--choisir--</option>
        <option value="g1">Groupe 1</option>
        <option value="g2">Groupe 2</option>
        <option value="tous">Tous</option>
    </select>
    <label>Nombre à tirer :</label>
    <select id="nombre">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
    <button onclick="tirage()">🎲 Tirer</button>
</div>

<!-- Résultats -->
<div class="result-container">
    <div class="col" id="col1"></div>
    <div class="col" id="col2"></div>
</div>
</body>
<!--script java pour le codage-->
<script>
// ✏️ Données
const classes = {
    "5A": {
        g1: ["Alice", "Bob", "Charlie"],
        g2: ["David", "Emma", "Lucas"]
    },
    "5B": {
        g1: ["Nina", "Paul", "Léo"],
        g2: ["Sara", "Tom", "Inès"]
    }
};
// Mélanger un tableau
function melanger(tab) {
    return tab.sort(() => Math.random() - 0.5);
}
// Tirage
function tirage() {
    let classe = document.getElementById("classe").value;
    let groupe = document.getElementById("groupe").value;
    let nombre = parseInt(document.getElementById("nombre").value);
    if (!classe || !groupe) {
        alert("Choisir classe et groupe !");
        return;
    }
    const col1 = document.getElementById("col1");
    const col2 = document.getElementById("col2");
    col1.innerHTML = "";
    col2.innerHTML = "";
    if (groupe === "tous") {
        // Tirage séparé par groupe
        let g1 = melanger([...classes[classe].g1]).slice(0, nombre);
        let g2 = melanger([...classes[classe].g2]).slice(0, nombre);
        // Titres
        col1.innerHTML = `<h3>${classe} - Groupe 1</h3>`;
        col2.innerHTML = `<h3>${classe} - Groupe 2</h3>`;
        g1.forEach(n => col1.innerHTML += `<p>${n}</p>`);
        g2.forEach(n => col2.innerHTML += `<p>${n}</p>`);
    } else {
        // Tirage dans le groupe choisi
        let liste = classes[classe][groupe];
        let tirageGroupe = melanger([...liste]).slice(0, nombre);
        col1.innerHTML = `<h3>${classe} - ${groupe}</h3>`;
        tirageGroupe.forEach(n => col1.innerHTML += `<p>${n}</p>`);
        col2.innerHTML = ""; // Pas de deuxième colonne
    }
}
</script>