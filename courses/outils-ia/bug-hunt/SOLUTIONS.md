# Solutions de la chasse aux bugs (à ne pas distribuer)

Huit bugs dans `cart.py`, plus un fichier de tests trompeur. Chacun relève d'une
des quatre familles de la slide « erreurs classiques ».

| # | Fonction | Famille | Problème | Correction |
|---|----------|---------|----------|------------|
| 1 | `total` | Oublie | `round(...)` sans second argument arrondit à l'euro : 59,97 devient 60 | `round(..., 2)` |
| 2 | `apply_discount` | Fait semblant | Renvoie la remise (20) au lieu du montant après remise (80) | `amount * (1 - percent / 100)` |
| 3 | `average_price` | Oublie | Division par zéro sur un panier vide | Renvoyer `0.0` si `prices` est vide |
| 4 | `add_item` | Fragilise | Accepte une quantité négative ou nulle | `raise ValueError` si `qty <= 0` |
| 5 | `add_item` | Fragilise | Argument par défaut modifiable : `cart=[]` est partagé entre tous les appels | `cart=None`, puis `cart = [] if cart is None else cart` |
| 6 | `cheapest_item` | Invente | `min_by` n'existe pas sur une liste Python | `min(cart, key=lambda i: i["price"])["name"]` |
| 7 | `load_prices` | Fragilise | `except Exception: pass` avale les lignes invalides sans rien dire | Laisser l'erreur remonter, ou lever `ValueError` avec le numéro de ligne |
| 8 | `find_item_query` | Fragilise | Requête SQL assemblée à la main : injection SQL (`o'brien` casse la requête) | Renvoyer `("SELECT * FROM items WHERE name = ?", (name,))` |
| 9 | `test_cart.py` | Fait semblant | Les tests passent malgré les 8 bugs : ils ne vérifient que des évidences (`callable`, `isinstance`, panier vide) | Tester des valeurs : `total([...]) == 59.97`, remise, panier vide pour la moyenne, etc. |

## Repères pour l'animation

- `python check.py` affiche 0/8 au départ ; `python test_cart.py` affiche « Tous les tests passent ».
  Question à poser en fin d'atelier : pourquoi les tests n'ont-ils rien vu ?
- Bugs plutôt faciles pour les débutants (à trouver par le comportement) : 1, 2, 3, 6.
- Bugs plus subtils : 5 (comportement différent selon l'ordre des appels), 7 (aucune erreur visible), 8 (le problème n'apparaît qu'avec une entrée piégée).
- Piège attendu : une correction proposée par l'IA qui règle un bug et en ajoute un autre
  (par exemple `round(x, 2)` appliqué à une remise, ou une exception trop large qui masque autre chose).
