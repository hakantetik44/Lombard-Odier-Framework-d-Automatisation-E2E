import { Given, When, Then } from '@cucumber/cucumber';
import { PagePrincipale } from '../pages/PagePrincipale';
import { getPage } from '../support/monde';

function obtenirPage(): PagePrincipale {
    return new PagePrincipale(getPage());
}

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

When("j'ouvre le menu de navigation principal", async function () {
    const page = obtenirPage();
    await page.ouvrirMenu();
});

Then('le menu de navigation est affiché', async function () {
    const page = obtenirPage();
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

When('je fais défiler vers le bas de la page', async function () {
    const page = obtenirPage();
    await page.defilerVersLeBas();
    await page.attendreChargementPage();
});

Then('la section des actualités est visible', async function () {
    const page = obtenirPage();
    await page.attendreChargementDOM();
});

Then('je prends une capture d\'écran de la section actualités', async function () {
    const page = obtenirPage();
    await page.capturerPageComplete('section_actualites');
});

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

When('je retourne en haut de la page', async function () {
    const page = obtenirPage();
    await page.defilerVersLeHaut();
    await page.attendreChargementDOM();
});

When('je clique sur le bouton de connexion', async function () {
    const page = obtenirPage();
    await page.ouvrirPageConnexion();
});

Then('je suis redirigé vers la page de connexion ou MyLO', async function () {
    const page = obtenirPage();
    await page.attendreChargementPage();
    await page.capturerPageComplete('page_connexion');
});

When("je retourne à la page d'accueil", async function () {
    const page = obtenirPage();
    await page.ouvrirPageAccueil();
});

Then('je prends une capture d\'écran finale du parcours complet', async function () {
    const page = obtenirPage();
    await page.capturerPageComplete('parcours_complet_final');
});
