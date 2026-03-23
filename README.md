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
