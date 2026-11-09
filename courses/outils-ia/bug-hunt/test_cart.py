"""Tests de cart.py, écrits en même temps que le code."""
import cart


def test_total_panier_vide():
    assert cart.total([]) == 0


def test_add_item_renvoie_une_liste():
    panier = cart.add_item("pomme", 1.0, 1, cart=[])
    assert isinstance(panier, list)


def test_fonctions_existent():
    assert callable(cart.apply_discount)
    assert callable(cart.average_price)


if __name__ == "__main__":
    test_total_panier_vide()
    test_add_item_renvoie_une_liste()
    test_fonctions_existent()
    print("Tous les tests passent.")
