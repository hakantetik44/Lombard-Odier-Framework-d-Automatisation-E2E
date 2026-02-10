@e2e @regression
Feature: Parcours E2E complet — Lombard Odier Gestion de Patrimoine
  En tant qu'utilisateur du site Lombard Odier
  Je veux naviguer à travers les différentes sections du site
  Afin de vérifier le bon fonctionnement de l'application web

  @smoke @critical
  Scenario: Parcours complet du site Lombard Odier — Accueil, Navigation, Contenu et Pied de page
    # ─── SECTION 1 : Page d'accueil ───
    Given je navigue vers la page d'accueil de Lombard Odier
    And j'accepte le bandeau de cookies
    Then la page d'accueil est chargée avec succès
    And le logo Lombard Odier est visible
    And le bouton du menu de navigation est visible
    And le bouton de connexion est visible

    # ─── SECTION 2 : Menu de navigation ───
    When j'ouvre le menu de navigation principal
    Then le menu de navigation est affiché
    When je ferme le menu de navigation
    Then le menu de navigation est fermé

    # ─── SECTION 3 : Exploration du contenu ───
    When je fais défiler vers le bas de la page
    Then la section des actualités est visible
    And je prends une capture d'écran de la section actualités

    # ─── SECTION 4 : Pied de page ───
    When je fais défiler vers le pied de page
    Then le pied de page est visible
    And les liens du pied de page sont présents
    And le texte de copyright est affiché
    And le lien LinkedIn est visible dans le pied de page

    # ─── SECTION 5 : Retour en haut ───
    When je retourne en haut de la page
    Then le logo Lombard Odier est visible

    # ─── SECTION 6 : Navigation vers la connexion ───
    When je clique sur le bouton de connexion
    Then je suis redirigé vers la page de connexion ou MyLO

    # ─── SECTION 7 : Retour à la page d'accueil ───
    When je retourne à la page d'accueil
    Then la page d'accueil est chargée avec succès

    # ─── SECTION 8 : Capture d'écran finale ───
    And je prends une capture d'écran finale du parcours complet
