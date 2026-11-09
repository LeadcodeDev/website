# Outils IA : matériel du cours

Matériel du module « Outils IA » (Bachelor 1). Les slides sont dans
`apps/slides/slides/outils-ia` (un seul deck de 65 slides) :

- Ouverture : pages 1 à 2.
- J1 matin (3h30 de théorie, méthodologie et démonstration comprises) : pages 3 à 61 (bases 3-7, apprentissage et coupure 8-13, modèles 14-22 dont architecture et langages typés, contexte 23-28, dérives 29-34, MCP 35-39, sécuriser un MCP 40-44, marché 45-49, méthodologie 50-59).
- J1 matin, fin (30 min de vérification d'environnement) : pages 60 à 61 (environnement et présentation de l'exercice en quatre phases).
- J1 après-midi (4h de TP) : pages 62 à 65, une slide par phase de l'exercice.

Le cours n'a qu'un seul exercice, le fil rouge : une API de prêt de matériel, construite en quatre phases (API, sécurité de l'API, MCP, sécurité du MCP). Le dépôt `LeadcodeDev/ai-formation-ynov-project` est le corrigé du formateur : il n'est pas distribué aux étudiants, qui reçoivent seulement le kit de démarrage (docker-compose, realm pré-importé, migrations, openapi).

| Dossier | Utilisé dans | Contenu |
|---------|--------------|---------|
| `starter-quiz/` | Ancienne version (blocs 2 et 3) | Mini-quiz en Python, avec le test d'acceptation de la mission « meilleur score » |
| `bug-hunt/` | Ancienne version (bloc 3) | Petite bibliothèque de panier d'achat avec 8 bugs plantés, `check.py` et un `test_cart.py` trompeur |

Ces deux dossiers appartiennent à la version précédente du cours et ne sont pas utilisés par ce deck (le fil rouge est maintenant en Go).

Python 3 suffit, sans aucune bibliothèque. Sur Mac et Linux, la commande est souvent `python3`.

## Avant le cours (ancienne version du cours, dossiers Python non utilisés par ce deck)

- Pour l'ancienne version seulement : copier chaque dossier dans une archive à remettre aux étudiants.
- Ne **pas** distribuer `bug-hunt/SOLUTIONS.md`.
- Vérifier les deux scripts : `python3 starter-quiz/test_mission.py` doit afficher `FAIL` (la mission n'est pas faite),
  et `python3 bug-hunt/check.py` doit afficher `0/8`.
