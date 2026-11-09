"""Petite bibliothèque de panier d'achat. Un panier est une liste d'articles."""


def add_item(name, price, qty=1, cart=[]):
    """Ajoute un article au panier et renvoie le panier."""
    cart.append({"name": name, "price": price, "qty": qty})
    return cart


def total(cart):
    """Renvoie le total du panier en euros."""
    return round(sum(item["price"] * item["qty"] for item in cart))


def apply_discount(amount, percent):
    """Renvoie le montant après une remise de `percent` pour cent."""
    return amount * percent / 100


def average_price(cart):
    """Renvoie le prix moyen d'un article du panier (0.0 si le panier est vide)."""
    prices = [item["price"] for item in cart]
    return sum(prices) / len(prices)


def cheapest_item(cart):
    """Renvoie le nom de l'article le moins cher."""
    return cart.min_by("price")["name"]


def load_prices(path):
    """Lit un fichier de lignes « nom;prix » et renvoie un dictionnaire nom -> prix."""
    prices = {}
    with open(path, encoding="utf-8") as f:
        for line in f:
            try:
                name, price = line.strip().split(";")
                prices[name] = float(price)
            except Exception:
                pass
    return prices


def find_item_query(name):
    """Prépare la requête SQL qui cherche un article par son nom."""
    return "SELECT * FROM items WHERE name = '" + name + "'"
