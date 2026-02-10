@e2e @regression
Feature: Parcours E2E
  En tant qu'utilisateur
  Je veux naviguer sur le site
  Afin de vérifier le fonctionnement

  @smoke @critical
  Scenario: Parcours complet
    Given je navigue vers la page d'accueil de Lombard Odier
    And j'accepte le bandeau de cookies
    Then la page d'accueil est chargée avec succès
    And le logo Lombard Odier est visible
    And le bouton du menu de navigation est visible
    And le bouton de connexion est visible

    When j'ouvre le menu de navigation principal
    Then le menu de navigation est affiché
    When je ferme le menu de navigation
    Then le menu de navigation est fermé

    When je fais défiler vers le bas de la page
    Then la section des actualités est visible
    And je prends une capture d'écran de la section actualités

    When je fais défiler vers le pied de page
    Then le pied de page est visible
    And les liens du pied de page sont présents
    And le texte de copyright est affiché
    And le lien LinkedIn est visible dans le pied de page

    When je retourne en haut de la page
    Then le logo Lombard Odier est visible

    When je clique sur le bouton de connexion
    Then je suis redirigé vers la page de connexion ou MyLO

    When je retourne à la page d'accueil
    Then la page d'accueil est chargée avec succès

    And je prends une capture d'écran finale du parcours complet
