"""Mini-quiz en terminal : projet de départ du cours Outils IA."""

# Chaque question est un couple (question, bonne réponse en minuscules).
QUESTIONS = [
    ("Quelle est la capitale de la France ?", "paris"),
    ("Combien font 7 x 8 ?", "56"),
    ("Quel langage utilise-t-on dans ce projet ?", "python"),
    ("Quelle planète est la plus proche du Soleil ?", "mercure"),
    ("Combien de jours y a-t-il dans une semaine ?", "7"),
]


def poser_question(question, bonne_reponse):
    """Pose une question et renvoie True si la réponse est correcte."""
    reponse = input(question + " ")
    return reponse.strip().lower() == bonne_reponse


def lancer_quiz(questions):
    """Pose toutes les questions et renvoie le nombre de bonnes réponses."""
    score = 0
    for question, bonne_reponse in questions:
        if poser_question(question, bonne_reponse):
            print("Bonne réponse !")
            score += 1
        else:
            print("Raté. La bonne réponse était :", bonne_reponse)
    return score


def main():
    print("=== Mini-quiz ===")
    score = lancer_quiz(QUESTIONS)
    print("Score :", str(score) + "/" + str(len(QUESTIONS)))


if __name__ == "__main__":
    main()
