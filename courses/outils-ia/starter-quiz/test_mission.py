"""Test d'acceptation de la mission « meilleur score » (atelier 8).

Usage : python test_mission.py   (ou python3 sur Mac et Linux)

Le test lance quiz.py trois fois dans un dossier temporaire, en tapant les
réponses à ta place. Il vérifie que le quiz affiche « Meilleur score : X/5 »
au lancement, avec le meilleur score des parties précédentes.
"""
import os
import shutil
import subprocess
import sys
import tempfile

QUIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "quiz.py")
BONNES = ["paris", "56", "python", "mercure", "7"]
FAUSSES = ["x", "x", "x", "x", "x"]


def jouer(dossier, reponses):
    """Lance quiz.py avec les réponses données et renvoie ce qu'il affiche."""
    resultat = subprocess.run(
        [sys.executable, QUIZ],
        input="\n".join(reponses) + "\n",
        capture_output=True,
        text=True,
        cwd=dossier,
        timeout=20,
    )
    return resultat.stdout, resultat.returncode


def verifier(sortie, attendu):
    ligne = "Meilleur score : " + attendu
    return ligne in sortie


def main():
    dossier = tempfile.mkdtemp()
    try:
        sortie, code = jouer(dossier, BONNES)
        if code != 0:
            print("FAIL : le quiz plante au premier lancement")
            return 1

        sortie, code = jouer(dossier, FAUSSES)
        if not verifier(sortie, "5/5"):
            print("FAIL : au deuxième lancement, « Meilleur score : 5/5 » n'est pas affiché")
            print("Ce que le quiz a affiché :")
            print(sortie)
            return 1

        sortie, code = jouer(dossier, BONNES[:3] + FAUSSES[:2])
        if not verifier(sortie, "5/5"):
            print("FAIL : un moins bon score ne doit pas remplacer le meilleur")
            return 1

        print("OK")
        return 0
    finally:
        shutil.rmtree(dossier, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
