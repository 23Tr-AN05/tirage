// site root / import_modules / title

const name_script = "tirage.js";

const root_path = document.head.getElementsByTagName("script")[0].getAttribute("src").replace(name_script, '');
const import_module = document.head.getElementsByTagName("script")[0].hasAttribute("data-import") ? document.head.getElementsByTagName("script")[0].getAttribute("data-import").split(" ") : [];
//console.log("root_path : "+root_path);
//console.log("import_module : " + import_module);



// code de tirage au sort 
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
