# Amazing New Tab

Site officiel de l'extension Chrome Amazing New Tab.

## Contenu

- Page d'accueil avec sélecteur des trois univers
- Présentation des fonctions, illustrée par des maquettes de l'interface
- Politique de confidentialité
- Métadonnées SEO, données structurées, sitemap, robots.txt et page 404

## Déploiement

Site statique servi par GitHub Pages depuis la racine du dépôt, sur le domaine
indiqué dans `CNAME`. Aucune étape de build : les fichiers du dépôt sont
publiés tels quels.

## Structure

```
index.html          page d'accueil
styles.css          styles de toutes les pages
script.js           sélecteur d'univers, horloge, année du pied de page
privacy/index.html  politique de confidentialité
404.html            page d'erreur (chemins absolus, servie à toute profondeur)
assets/             visuels
```

## Images

Les captures sources sont les fichiers `assets/*.png` (1280 x 800, cadre inclus).
Les versions publiées sont les `.webp` recadrés sur l'interface seule :

- `<univers>.webp` 1161 x 651, affiché sur grand écran
- `<univers>-760.webp` version mobile
- `<univers>-tile.webp` fragment de décor des cartes de fonctions
- `<univers>-thumb.webp` vignette du sélecteur de fond
- `og-cover.jpg` image de partage sur les réseaux sociaux

Les `.png` ne sont plus chargés par le site : ils ne sont conservés que comme
sources. Vous pouvez les supprimer du dépôt pour l'alléger de 4 Mo.
