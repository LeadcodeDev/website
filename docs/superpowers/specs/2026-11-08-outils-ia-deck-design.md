# Deck « Outils IA » (12h) : design

## Objectif

Remplacer le deck `apps/slides/slides/outils-ia` par un deck de 12h (8h + 4h) qui va plus au fond que la fiche officielle
(`Bachelor_1_multi-filieres_Outils_IA_V1.0.pdf`). Public : Bachelor 1 Informatique / Cybersécurité / IA & Data.
Forme : un maximum de schémas, peu de texte. Fil rouge : l'API Go d'emprunts de matériel
(`LeadcodeDev/ai-formation-ynov-project`, qui est le CORRIGÉ du formateur : les élèves ne le clonent pas et ne le reçoivent pas).

L'ancien deck (85 slides) est supprimé dans le working tree. On repart de zéro, il reste dans l'historique git.

## Planning

| Créneau | Durée | Contenu |
|---|---|---|
| Jour 1, matin | 3h30 | Théorie : thèmes 1 à 7, puis méthodologie et démo (la méthodologie vient AVANT le TP) |
| Jour 1, matin | 30 min | Vérification de l'environnement de TP (kit de démarrage, Docker, Go, IAM) : Go et Docker installés, `docker compose up`, PostgreSQL et IAM démarrés, jeton obtenu avec un utilisateur student ; aucun appel à l'API, écrite pendant le TP |
| Jour 1, après-midi | 4h | TP API Go : brief, architecture, pièges, déroulé |
| Jour 2 | 1h | Bilan du TP, skills, contrôle et conformité |
| Jour 2 | 3h | Pratique : serveur MCP sur l'API, skill, revue humaine |

## Contenu et schéma de chaque thème

Jour 1, théorie (3h30) :

1. **Bases de l'IA, modèle / LLM / agent.** Chaîne texte → tokens → modèle → token suivant. Trois boîtes emboîtées :
   modèle, LLM, agent (LLM + outils + boucle).
2. **Date de coupure.** Frise avec zone « connu » et zone « aveugle ».
3. **Un modèle puissant est souvent overkill.** Famille Claude : Haiku, Sonnet, Opus, Fable/Mythos sur une échelle.
   Triangle coût / vitesse / intelligence, courbe de rendements décroissants, grille tâche → modèle adapté.
4. **Un LLM ne connaît pas votre contexte métier.** Cercles modèle / vos données, couches de mémoire persistante,
   donnée sale contre donnée propre. Une slide vide posée ici, itérée plus tard.
5. **Dérives de la hype.** Histogramme de coût (règle simple contre IA). Arbre « faut-il de l'IA ? ».
   Exemple concret 1 : ticket de support (contexte client, base de connaissance, documents liés).
   Exemple concret 2 : compte-rendu de réunion (diarisation, résumé, opportunités commerciales, tickets / roadmap).
6. **MCP, et pourquoi pas un simple appel d'API** (placé après « Exemple concret »). Schéma comparatif :
   appel API sur mesure par outil (N modèles × M services = N×M intégrations) contre protocole commun (N + M).
   Ce que MCP apporte : découverte des outils, schéma décrit pour le modèle, interopérabilité.
   Ce qu'il ne change pas : les droits et la validation restent à votre charge.
7. **Marché du travail.** Escalier bibliothèques → frameworks → IA. Balance : la valeur passe de l'exécution
   à la compréhension du métier, la vision produit, la spécification et la relation client B2C/B2B. Esprit critique.

Jour 1, méthodologie (fin des 3h30 de théorie, avant la vérification d'environnement et avant le TP) : vision produit, spec-driven (`superpowers:brainstorming`), boucle agentique (orchestration,
séparer pour mieux régner, schéma du contexte), délégation de l'implémentation (TDD, zéro trust, programmation défensive).

Jour 1, démonstration (juste après la méthodologie, toujours dans les 3h30 de théorie) : une seule slide, qui pose le postulat de départ :
une issue « simple » à traiter sur FerrisKey. Le formateur fait ensuite la démo en live, sans autre slide.
Schéma de la slide : issue → méthode (spec, boucle, TDD) → code livré, avec les points de contrôle humain.

Jour 2, bilan (1h) : skills (rôles, fonctionnement, « ce ne sont que des instructions » : le LLM peut les ignorer),
contrôle et conformité du chantier par l'humain. Jour 2, pratique (3h) : serveur MCP sur l'API Go.

## Technique

- Un seul deck `apps/slides/slides/outils-ia`, en un seul `index.tsx` (règle du dépôt : pas de fichier frère).
  Le fichier est organisé en sections balisées (design, briques de schéma, une section par thème). Pas de découpage en modules.
- Le style visuel reprend les tokens de l'ancien deck (police mono/Inter, accent orange `#EF7809`, fond `#fafaf9`),
  pour rester cohérent avec les autres decks du dépôt. Le contenu repart de zéro.
- Canvas 1920×1080, React seul, aucune dépendance ajoutée, schémas en SVG / flexbox.
- Notes de présentateur via l'export `notes`, alignées sur le tableau des pages.
- Exercice fil rouge : consignes courtes, étapes numérotées.
- Mise à jour de `courses/outils-ia/README.md` (il décrit encore l'ancien deck de 85 slides).

## Hors périmètre

Aucune modification du dépôt Go. Ni de `package.json`, ni des autres decks.

## Points ouverts

- Nombre exact de slides par thème : fixé dans le plan d'implémentation.
