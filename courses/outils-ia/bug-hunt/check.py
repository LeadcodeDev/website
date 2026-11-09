"""Vérifie les comportements attendus de cart.py.

Usage : python check.py   (ou python3 sur Mac et Linux)

Chaque ligne affiche OK ou FAIL pour un comportement. Le script ne dit pas
d'où vient l'erreur : c'est à toi de la trouver.
"""
import os
import tempfile

import cart


def verifie(nom, test):
    try:
        ok = test()
    except Exception:
        print("FAIL  " + nom + "  (le programme a planté)")
        return False
    print(("OK    " if ok else "FAIL  ") + nom)
    return ok


def total_arrondi_au_centime():
    return cart.total([{"name": "a", "price": 19.99, "qty": 3}]) == 59.97


def remise_de_20_pour_cent():
    return cart.apply_discount(100, 20) == 80


def panier_vide_prix_moyen():
    return cart.average_price([]) == 0.0


def quantite_negative_refusee():
    try:
        cart.add_item("pomme", 1.0, -2, cart=[])
    except ValueError:
        return True
    return False


def paniers_independants():
    cart.add_item("a", 1.0)
    second = cart.add_item("b", 1.0)
    return len(second) == 1


def article_le_moins_cher():
    panier = [
        {"name": "stylo", "price": 2.0, "qty": 1},
        {"name": "gomme", "price": 0.5, "qty": 1},
    ]
    return cart.cheapest_item(panier) == "gomme"


def ligne_invalide_signalee():
    with tempfile.TemporaryDirectory() as dossier:
        chemin = os.path.join(dossier, "prix.txt")
        with open(chemin, "w", encoding="utf-8") as f:
            f.write("pomme;1.5\npoire;abc\nkiwi;2\n")
        try:
            cart.load_prices(chemin)
        except ValueError:
            return True
        return False


def requete_sans_texte_brut():
    resultat = cart.find_item_query("o'brien")
    return (
        isinstance(resultat, tuple)
        and len(resultat) == 2
        and "o'brien" not in resultat[0]
    )


TESTS = [
    ("total arrondi au centime", total_arrondi_au_centime),
    ("remise de 20 % sur 100", remise_de_20_pour_cent),
    ("prix moyen d'un panier vide", panier_vide_prix_moyen),
    ("quantité négative refusée", quantite_negative_refusee),
    ("deux paniers indépendants", paniers_independants),
    ("article le moins cher", article_le_moins_cher),
    ("ligne invalide signalée", ligne_invalide_signalee),
    ("requête sans texte collé dedans", requete_sans_texte_brut),
]

if __name__ == "__main__":
    reussis = sum(verifie(nom, test) for nom, test in TESTS)
    print()
    print(str(reussis) + "/" + str(len(TESTS)) + " comportements corrects")
