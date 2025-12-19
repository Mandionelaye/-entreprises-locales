# Recherche d'Entreprises Locales

Une application React moderne pour rechercher des entreprises locales avec affichage de résultats, pagination et visualisation de coordonnées GPS.

## ✨ Fonctionnalités

- 🔍 Recherche par mots-clés et localisation
- 📱 Interface responsive et moderne avec Tailwind CSS et daisyUI
- 🗂️ Affichage des résultats sous forme de cartes
- 📄 Pagination (10 résultats par page)
- 📍 Visualisation des coordonnées GPS dans un modal
- 🗺️ Lien vers Google Maps
- ⚡ Requêtes API avec Axios
- 🔄 Gestion des états de chargement et d'erreur

## 🛠️ Technologies Utilisées

- React.js 18.2.0
- Axios 1.6.0
- Tailwind CSS 3.3.0
- daisyUI 4.4.0
- React Scripts 5.0.1

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Un serveur PHP local avec l'endpoint API : `http://localhost/api/search.php`

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   cd /mnt/okcomputer/output
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm start
   ```

4. **Ouvrir l'application**
   
   L'application sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

## 📡 Structure de l'API

L'application attend une réponse JSON de l'API PHP avec la structure suivante :

```json
[
  {
    "name": "Nom de l'entreprise",
    "address": "Adresse complète",
    "phone": "+33 1 23 45 67 89",
    "website": "www.example.com",
    "image": "https://example.com/image.jpg",
    "latitude": 48.8566,
    "longitude": 2.3522,
    "city": "Paris",
    "country": "France"
  }
]
```

## 🗂️ Structure du Projet

```
src/
├── components/
│   ├── Results.js          # Composant d'affichage des résultats
│   ├── Pagination.js       # Composant de pagination
│   └── LocationModal.js    # Modal pour les coordonnées GPS
├── App.js                  # Composant principal avec formulaire
├── index.js                # Point d'entrée
└── index.css               # Styles globaux et Tailwind

public/
├── index.html              # Template HTML
└── manifest.json           # Configuration PWA
```

## 🎨 Composants

### App.js
- Formulaire de recherche avec mots-clés et localisation
- Gestion de l'état global (résultats, chargement, erreurs)
- Appels API avec Axios
- Affichage conditionnel des états

### Results.js
- Affichage des résultats sous forme de cartes
- Gestion des images avec fallback
- Bouton pour ouvrir le modal de localisation
- Liens cliquables vers téléphone et site web

### Pagination.js
- Navigation entre les pages
- Affichage de 10 résultats par page
- Indicateur de page actuelle

### LocationModal.js
- Modal pour afficher les coordonnées GPS
- Copie facile des coordonnées
- Lien vers Google Maps
- Aperçu de l'adresse complète

## 🎯 Utilisation

1. **Recherche**
   - Entrez des mots-clés (ex: Restaurant, Coiffeur)
   - Entrez une localisation (ex: Paris, Lyon)
   - Cliquez sur "Rechercher"

2. **Navigation**
   - Parcourez les résultats avec la pagination
   - Cliquez sur les boutons "Précédent" / "Suivant"

3. **Localisation**
   - Cliquez sur le bouton de localisation (icône GPS) sur chaque carte
   - Visualisez les coordonnées dans le modal
   - Copiez les coordonnées ou ouvrez dans Google Maps

## 🔧 Configuration

### Configuration de l'API

Modifiez l'URL de l'API dans `App.js` si nécessaire :

```javascript
const response = await axios.get('http://localhost/api/search.php', {
  params: {
    keywords: searchData.keywords,
    location: searchData.location
  }
});
```

### Configuration des Styles

Le fichier `tailwind.config.js` contient la configuration personnalisée :

- Couleurs primaires, secondaires et d'accent
- Police de caractères (Inter)
- Thème daisyUI personnalisé

## 🐛 Gestion des Erreurs

L'application gère plusieurs cas d'erreur :

- **Champs vides** : Message d'alerte si aucun champ n'est rempli
- **Erreur réseau** : Message si le serveur PHP n'est pas accessible
- **Aucun résultat** : Message informatif avec suggestions
- **Images manquantes** : Image de remplacement automatique

## 📱 Responsive Design

L'application est entièrement responsive :

- **Mobile** : Colonne unique, boutons adaptés
- **Tablette** : 2 colonnes pour les résultats
- **Desktop** : 3 colonnes pour les résultats

## 🚀 Build pour la Production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `build/`.

## 📄 Licence

Ce projet est créé pour RYM Holding dans le cadre d'un test technique.

## 👤 Auteur

Développé par un Senior React.js Developer

---

**Note importante** : Assurez-vous que votre serveur PHP est bien démarré et accessible à l'adresse `http://localhost/api/search.php` avant d'utiliser l'application.