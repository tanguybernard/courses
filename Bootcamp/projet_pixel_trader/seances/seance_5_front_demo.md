# Seance 5 : Integration Front, KPIs & Demo

**Duree :** 3h
**Objectifs :** Consommer l'API REST depuis du JavaScript vanilla, manipuler le DOM, boucler le projet.

**Pre-requis :** Seance 4 terminee (API REST complete testee avec Postman).

---

## Pas de mini-exo — Tout le temps est consacre au projet.

---

## Partie 1 : Structure du Front (~30min)

Spring Boot sert automatiquement les fichiers statiques places dans `src/main/resources/static/`.

### Creez les fichiers suivants :

```
src/main/resources/static/
├── index.html
├── style.css
└── app.js
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixel Trader - Back Office</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>PIXEL TRADER</h1>
        <p class="subtitle">Retrogaming Stock Manager - Akihabara, Tokyo</p>
    </header>

    <!-- KPIs -->
    <section class="kpis">
        <div class="kpi-card">
            <span class="kpi-value" id="kpi-total">-</span>
            <span class="kpi-label">Produits en stock</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-value" id="kpi-valeur">-</span>
            <span class="kpi-label">Valeur totale</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-value" id="kpi-marge">-</span>
            <span class="kpi-label">Marge estimee</span>
        </div>
    </section>

    <!-- Filtres -->
    <section class="filtres">
        <select id="filtre-plateforme">
            <option value="">Toutes les plateformes</option>
        </select>
        <select id="filtre-etat">
            <option value="">Tous les etats</option>
            <option value="NEUF">Neuf</option>
            <option value="BON">Bon</option>
            <option value="MOYEN">Moyen</option>
            <option value="ABIME">Abime</option>
        </select>
        <button id="btn-reset-filtres">Reset</button>
    </section>

    <!-- Formulaire d'ajout -->
    <section class="form-section">
        <h2>Ajouter un produit</h2>
        <form id="form-ajout">
            <input type="text" id="input-titre" placeholder="Titre du jeu" required>
            <select id="input-plateforme" required>
                <option value="">Plateforme...</option>
            </select>
            <input type="number" id="input-annee" placeholder="Annee" required>
            <select id="input-etat" required>
                <option value="">Etat...</option>
                <option value="NEUF">Neuf</option>
                <option value="BON">Bon</option>
                <option value="MOYEN">Moyen</option>
                <option value="ABIME">Abime</option>
            </select>
            <input type="number" id="input-prix-achat" placeholder="Prix achat (EUR)" step="0.01" required>
            <input type="number" id="input-prix-estime" placeholder="Prix estime (EUR)" step="0.01" required>
            <button type="submit">Ajouter</button>
        </form>
    </section>

    <!-- Galerie de produits -->
    <section class="galerie">
        <h2>Stock</h2>
        <div id="produits-container"></div>
    </section>

    <script src="app.js"></script>
</body>
</html>
```

### `style.css` — Charte Neo-Retro

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #0a0a1a;
    color: #e0e0e0;
    font-family: 'Share Tech Mono', monospace;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

header {
    text-align: center;
    padding: 30px 0;
    border-bottom: 2px solid #00ff88;
    margin-bottom: 30px;
}

header h1 {
    font-family: 'Press Start 2P', cursive;
    font-size: 2em;
    color: #00ff88;
    text-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88;
}

header .subtitle {
    color: #888;
    margin-top: 10px;
    font-size: 0.9em;
}

/* KPIs */
.kpis {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    justify-content: center;
}

.kpi-card {
    background: #1a1a2e;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 20px 30px;
    text-align: center;
    min-width: 200px;
}

.kpi-value {
    display: block;
    font-family: 'Press Start 2P', cursive;
    font-size: 1.5em;
    color: #ff6b9d;
    margin-bottom: 8px;
}

.kpi-label {
    color: #888;
    font-size: 0.8em;
    text-transform: uppercase;
}

/* Filtres */
.filtres {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
}

.filtres select, .filtres button {
    background: #1a1a2e;
    color: #e0e0e0;
    border: 1px solid #444;
    padding: 8px 16px;
    font-family: 'Share Tech Mono', monospace;
    cursor: pointer;
    border-radius: 4px;
}

.filtres button {
    background: #333;
    border-color: #00ff88;
    color: #00ff88;
}

/* Formulaire */
.form-section {
    background: #1a1a2e;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
}

.form-section h2 {
    color: #00ff88;
    margin-bottom: 15px;
    font-size: 1em;
}

#form-ajout {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

#form-ajout input, #form-ajout select {
    background: #0a0a1a;
    color: #e0e0e0;
    border: 1px solid #444;
    padding: 8px 12px;
    font-family: 'Share Tech Mono', monospace;
    border-radius: 4px;
    flex: 1;
    min-width: 150px;
}

#form-ajout button {
    background: #00ff88;
    color: #0a0a1a;
    border: none;
    padding: 8px 24px;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.7em;
    cursor: pointer;
    border-radius: 4px;
}

#form-ajout button:hover {
    background: #00cc6a;
}

/* Galerie */
.galerie h2 {
    color: #00ff88;
    margin-bottom: 15px;
}

#produits-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
}

.produit-card {
    background: #1a1a2e;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    transition: border-color 0.2s;
}

.produit-card:hover {
    border-color: #00ff88;
}

.produit-card .titre {
    font-size: 1em;
    color: #fff;
    margin-bottom: 8px;
}

.produit-card .details {
    font-size: 0.85em;
    color: #888;
    line-height: 1.6;
}

.produit-card .prix {
    color: #ff6b9d;
    font-weight: bold;
}

.produit-card .marge {
    color: #00ff88;
}

.produit-card .btn-supprimer {
    background: transparent;
    color: #ff4444;
    border: 1px solid #ff4444;
    padding: 4px 12px;
    cursor: pointer;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8em;
    margin-top: 10px;
    border-radius: 4px;
}

.produit-card .btn-supprimer:hover {
    background: #ff4444;
    color: #fff;
}
```

---

## Partie 2 : JavaScript — Connexion a l'API (~1h30)

### `app.js`

Construisez le fichier etape par etape.

### Etape 1 : Charger et afficher les produits

```javascript
const API_URL = '/api';

// --- CHARGEMENT DES PRODUITS ---

async function chargerProduits(filtres = {}) {
    let url = `${API_URL}/produits`;

    if (filtres.plateforme) {
        url = `${API_URL}/produits/filtre?plateforme=${filtres.plateforme}`;
    } else if (filtres.etat) {
        url = `${API_URL}/produits/filtre?etat=${filtres.etat}`;
    }

    const response = await fetch(url);
    const produits = await response.json();

    afficherProduits(produits);
    calculerKPIs(produits);
}

function afficherProduits(produits) {
    const container = document.getElementById('produits-container');
    container.innerHTML = '';

    produits.forEach(produit => {
        const card = document.createElement('div');
        card.className = 'produit-card';
        card.innerHTML = `
            <div class="titre">${produit.titre}</div>
            <div class="details">
                ${produit.plateforme} | ${produit.anneeSortie || '?'} | ${produit.etat}<br>
                Prix estime : <span class="prix">${produit.prixEstime.toFixed(2)} EUR</span><br>
                Marge : <span class="marge">${produit.marge.toFixed(2)} EUR</span>
            </div>
            <button class="btn-supprimer" onclick="supprimerProduit(${produit.id})">
                Supprimer
            </button>
        `;
        container.appendChild(card);
    });
}
```

### Etape 2 : Calculer et afficher les KPIs

```javascript
function calculerKPIs(produits) {
    const total = produits.length;
    const valeur = produits.reduce((sum, p) => sum + p.prixEstime, 0);
    const marge = produits.reduce((sum, p) => sum + p.marge, 0);

    document.getElementById('kpi-total').textContent = total;
    document.getElementById('kpi-valeur').textContent = valeur.toFixed(0) + ' EUR';
    document.getElementById('kpi-marge').textContent = marge.toFixed(0) + ' EUR';
}
```

### Etape 3 : Ajouter un produit

```javascript
document.getElementById('form-ajout').addEventListener('submit', async (e) => {
    e.preventDefault();

    const produit = {
        titre: document.getElementById('input-titre').value,
        plateforme: document.getElementById('input-plateforme').value,
        anneeSortie: parseInt(document.getElementById('input-annee').value),
        etat: document.getElementById('input-etat').value,
        prixAchat: parseFloat(document.getElementById('input-prix-achat').value),
        prixEstime: parseFloat(document.getElementById('input-prix-estime').value)
    };

    const response = await fetch(`${API_URL}/produits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produit)
    });

    if (response.ok) {
        e.target.reset();
        chargerProduits(); // Recharger la liste
    } else {
        const erreur = await response.json();
        alert('Erreur : ' + erreur.erreur);
    }
});
```

### Etape 4 : Supprimer un produit

```javascript
async function supprimerProduit(id) {
    if (!confirm('Supprimer ce produit ?')) return;

    const response = await fetch(`${API_URL}/produits/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        chargerProduits(); // Recharger la liste
    } else {
        alert('Erreur lors de la suppression.');
    }
}
```

### Etape 5 : Filtres

```javascript
document.getElementById('filtre-plateforme').addEventListener('change', (e) => {
    chargerProduits({ plateforme: e.target.value });
});

document.getElementById('filtre-etat').addEventListener('change', (e) => {
    chargerProduits({ etat: e.target.value });
});

document.getElementById('btn-reset-filtres').addEventListener('click', () => {
    document.getElementById('filtre-plateforme').value = '';
    document.getElementById('filtre-etat').value = '';
    chargerProduits();
});
```

### Etape 6 : Remplir les selects de plateformes dynamiquement

```javascript
const PLATEFORMES = [
    'NES', 'SNES', 'N64', 'GAMEBOY', 'GAMEBOY_COLOR', 'GAMEBOY_ADVANCE',
    'GAMECUBE', 'PS1', 'PS2', 'PS3', 'MEGADRIVE', 'MASTER_SYSTEM',
    'SATURN', 'DREAMCAST', 'XBOX', 'PC', 'SWITCH', 'ARCADE', 'ATARI_2600'
];

function remplirSelectsPlateformes() {
    const selects = [
        document.getElementById('filtre-plateforme'),
        document.getElementById('input-plateforme')
    ];

    selects.forEach(select => {
        PLATEFORMES.forEach(p => {
            const option = document.createElement('option');
            option.value = p;
            option.textContent = p;
            select.appendChild(option);
        });
    });
}
```

### Etape 7 : Initialisation

```javascript
// Au chargement de la page
remplirSelectsPlateformes();
chargerProduits();
```

---

## Partie 3 : Tests et Ajustements (~30min)

Verifiez que tout fonctionne de bout en bout :

1. **La page se charge** et affiche les produits depuis la BDD
2. **Les KPIs** sont corrects (comparez avec Postman)
3. **Ajouter un produit** via le formulaire -> il apparait dans la galerie
4. **Supprimer un produit** -> il disparait, les KPIs se mettent a jour
5. **Filtrer** par plateforme ou par etat -> la liste se met a jour
6. **Erreur** : essayez d'ajouter un produit sans titre -> un message d'erreur s'affiche

### Bonus (si le temps le permet)
- Afficher les images des produits (dossier `ressources/images/`)
- Ajouter un compteur par plateforme (combien de jeux N64, PS1, etc.)
- Ameliorer le design (animations, transitions)

---

## Demo (~30min)

Chaque groupe (ou individu) presente son application en **5 minutes**.

### Scenario impose

Montrez les operations suivantes en direct :

1. **Ouvrez** l'application dans le navigateur
2. **Montrez** les KPIs (valeur du stock, nombre de produits)
3. **Filtrez** par plateforme N64 -> montrez les jeux N64
4. **Ajoutez** le jeu "Zelda: Ocarina of Time" (N64, 1998, NEUF, achat 20 EUR, estime 75 EUR)
5. **Verifiez** que les KPIs se sont mis a jour
6. **Supprimez** le jeu que vous venez d'ajouter
7. **Verifiez** que les KPIs sont revenus a la valeur precedente

### Criteres d'evaluation

1. **Fonctionnel :** L'API repond correctement ? Le front affiche les donnees ?
2. **Architecture POO :** Le code utilise l'heritage, le polymorphisme, les interfaces ?
3. **Qualite de code :** Noms de variables clairs, code indente, pas de code mort
4. **Gestion des erreurs :** Le formulaire rejette les donnees invalides ? L'API retourne des codes HTTP corrects ?
5. **Git :** Historique de commits propre, branches utilisees
