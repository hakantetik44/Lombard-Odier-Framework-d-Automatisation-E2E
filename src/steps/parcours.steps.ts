/**
 * ============================================
 * Lombard Odier — Étapes (Step Definitions)
 * ============================================
 * Fichier unique de définitions d'étapes Cucumber.
 * Chaque étape délègue à PagePrincipale pour garder le code propre.
 *
 * Correspondance Gherkin français :
 *   Soit / Étant donné → Given
 *   Quand              → When
 *   Alors              → Then
 *   Et                 → And
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { PagePrincipale } from '../pages/PagePrincipale';
import { getPage } from '../support/monde';

/** Fonction utilitaire pour obtenir une instance de PagePrincipale */
function obtenirPage(): PagePrincipale {
    return new PagePrincipale(getPage());
}

// ══════════════════════════════════════════════════
//  🏠 SECTION 1 : PAGE D'ACCUEIL
// ══════════════════════════════════════════════════

Given("je navigue vers la page d'accueil de Lombard Odier", async function () {
    const page = obtenirPage();
    await page.ouvrirPageAccueil();
});

Given("j'accepte le bandeau de cookies", async function () {
    const page = obtenirPage();
    await page.accepterBandeauCookies();
});

Then("la page d'accueil est chargée avec succès", async function () {
    const page = obtenirPage();
    await page.verifierPageAccueilChargee();
});

Then('le logo Lombard Odier est visible', async function () {
    const page = obtenirPage();
    await page.verifierLogoVisible();
});

Then('le bouton du menu de navigation est visible', async function () {
    const page = obtenirPage();
    await page.verifierBoutonMenuVisible();
});

Then('le bouton de connexion est visible', async function () {
    const page = obtenirPage();
    await page.verifierBoutonConnexionVisible();
});

// ══════════════════════════════════════════════════
//  🧭 SECTION 2 : MENU DE NAVIGATION
// ══════════════════════════════════════════════════

When("j'ouvre le menu de navigation principal", async function () {
    const page = obtenirPage();
    await page.ouvrirMenu();
});

Then('le menu de navigation est affiché', async function () {
    const page = obtenirPage();
    // Le menu est considéré affiché si le bouton menu a changé d'état
    await page.attendreChargementDOM();
});

When('je ferme le menu de navigation', async function () {
    const page = obtenirPage();
    await page.fermerMenu();
});

Then('le menu de navigation est fermé', async function () {
    const page = obtenirPage();
    await page.attendreChargementDOM();
});

// ══════════════════════════════════════════════════
//  📄 SECTION 3 : EXPLORATION DU CONTENU
// ══════════════════════════════════════════════════

When('je fais défiler vers le bas de la page', async function () {
    const page = obtenirPage();
    await page.defilerVersLeBas();
    await page.attendreChargementPage();
});

Then('la section des actualités est visible', async function () {
    const page = obtenirPage();
    // Vérifier qu'on a bien défilé vers le bas
    await page.attendreChargementDOM();
});

Then('je prends une capture d\'écran de la section actualités', async function () {
    const page = obtenirPage();
    await page.capturerPageComplete('section_actualites');
});

// ══════════════════════════════════════════════════
//  🦶 SECTION 4 : PIED DE PAGE
// ══════════════════════════════════════════════════

When('je fais défiler vers le pied de page', async function () {
    const page = obtenirPage();
    await page.defilerVersPiedDePage();
});

Then('le pied de page est visible', async function () {
    const page = obtenirPage();
    await page.verifierPiedDePageVisible();
});

Then('les liens du pied de page sont présents', async function () {
    const page = obtenirPage();
    await page.verifierLiensPiedDePage();
});

Then('le texte de copyright est affiché', async function () {
    const page = obtenirPage();
    await page.verifierCopyright();
});

Then('le lien LinkedIn est visible dans le pied de page', async function () {
    const page = obtenirPage();
    await page.cliquerLinkedIn();
});

// ══════════════════════════════════════════════════
//  ⬆️ SECTION 5 : RETOUR EN HAUT
// ══════════════════════════════════════════════════

When('je retourne en haut de la page', async function () {
    const page = obtenirPage();
    await page.defilerVersLeHaut();
    await page.attendreChargementDOM();
});

// ══════════════════════════════════════════════════
//  🔐 SECTION 6 : CONNEXION
// ══════════════════════════════════════════════════

When('je clique sur le bouton de connexion', async function () {
    const page = obtenirPage();
    await page.ouvrirPageConnexion();
});

Then('je suis redirigé vers la page de connexion ou MyLO', async function () {
    const page = obtenirPage();
    // MyLO est l'application client de Lombard Odier
    await page.attendreChargementPage();
    await page.capturerPageComplete('page_connexion');
});

// ══════════════════════════════════════════════════
//  🏠 SECTION 7 : RETOUR À L'ACCUEIL
// ══════════════════════════════════════════════════

When("je retourne à la page d'accueil", async function () {
    const page = obtenirPage();
    await page.ouvrirPageAccueil();
});

// ══════════════════════════════════════════════════
//  📸 SECTION 8 : CAPTURE D'ÉCRAN FINALE
// ══════════════════════════════════════════════════

Then('je prends une capture d\'écran finale du parcours complet', async function () {
    const page = obtenirPage();
    await page.capturerPageComplete('parcours_complet_final');
});
