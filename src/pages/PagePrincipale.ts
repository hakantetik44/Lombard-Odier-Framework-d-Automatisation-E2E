import { Page } from '@playwright/test';
import { PageBase } from './PageBase';
import { LocateursPage } from '../locateurs/LocateursPage';
import * as allure from 'allure-js-commons';
import { ENV_CONFIG } from '../config/env.config';

export class PagePrincipale extends PageBase {
    readonly loc: LocateursPage;

    constructor(page: Page) {
        super(page);
        this.loc = new LocateursPage(page);
    }

    async ouvrirPageAccueil(): Promise<void> {
        await allure.step("Naviguer vers la page d'accueil", async () => {
            await this.naviguerVers('/fr/home.html');
            await this.attendreChargementPage();
        });
    }

    async accepterBandeauCookies(): Promise<void> {
        await allure.step('Accepter le bandeau de cookies', async () => {
            await this.accepterCookies(this.loc.boutonAccepterCookies);
        });
    }

    async ouvrirMenu(): Promise<void> {
        await allure.step('Ouvrir le menu de navigation', async () => {
            await this.cliquer(this.loc.boutonMenu);
        });
    }

    async fermerMenu(): Promise<void> {
        await allure.step('Fermer le menu de navigation', async () => {
            await this.cliquer(this.loc.boutonMenu);
        });
    }

    async allerGestionPatrimoine(): Promise<void> {
        await allure.step('Naviguer vers Gestion de Patrimoine', async () => {
            await this.cliquer(this.loc.lienGestionPatrimoine);
            await this.attendreChargementPage();
        });
    }

    async allerGestionActifs(): Promise<void> {
        await allure.step("Naviguer vers Gestion d'Actifs", async () => {
            await this.cliquer(this.loc.lienGestionActifs);
            await this.attendreChargementPage();
        });
    }

    async allerDeveloppementDurable(): Promise<void> {
        await allure.step('Naviguer vers Développement Durable', async () => {
            await this.cliquer(this.loc.lienDeveloppementDurable);
            await this.attendreChargementPage();
        });
    }

    async defilerVersActualites(): Promise<void> {
        await allure.step('Défiler vers la section Actualités', async () => {
            await this.defilerVersElement(this.loc.sectionActualites);
        });
    }

    async defilerVersPiedDePage(): Promise<void> {
        await allure.step('Défiler vers le pied de page', async () => {
            await this.defilerVersElement(this.loc.piedDePage);
        });
    }

    async cliquerLinkedIn(): Promise<void> {
        await allure.step('Cliquer sur le lien LinkedIn', async () => {
            await this.defilerVersElement(this.loc.lienLinkedIn);
        });
    }

    async ouvrirPageConnexion(): Promise<void> {
        await allure.step('Naviguer vers la page de connexion', async () => {
            await this.defilerVersElement(this.loc.boutonConnexion);
            await this.cliquer(this.loc.boutonConnexion, { force: true });
            await this.attendreChargementPage();
        });
    }

    async saisirNomUtilisateur(identifiant: string): Promise<void> {
        await allure.step(`Saisir l'identifiant : ${identifiant}`, async () => {
            await this.saisirTexte(this.loc.champNomUtilisateur, identifiant);
        });
    }

    async saisirMotDePasse(motDePasse: string): Promise<void> {
        await allure.step('Saisir le mot de passe', async () => {
            await this.saisirTexte(this.loc.champMotDePasse, motDePasse);
        });
    }

    async cliquerBoutonConnexion(): Promise<void> {
        await allure.step('Cliquer sur le bouton de connexion', async () => {
            await this.cliquer(this.loc.boutonSoumettre);
            await this.attendreChargementPage();
        });
    }

    async seConnecter(identifiant: string, motDePasse: string): Promise<void> {
        await allure.step('Effectuer la connexion', async () => {
            await this.saisirNomUtilisateur(identifiant);
            await this.saisirMotDePasse(motDePasse);
            await this.cliquerBoutonConnexion();
        });
    }

    async seDeconnecter(): Promise<void> {
        await allure.step('Se déconnecter', async () => {
            await this.cliquer(this.loc.boutonDeconnexion);
            await this.attendreChargementPage();
        });
    }

    async obtenirValeurTotaleActifs(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.valeurTotaleActifs);
        await allure.step(`Valeur totale des actifs : ${resultat}`, async () => { });
        return resultat;
    }

    async obtenirPerformance(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.pourcentagePerformance);
        await allure.step(`Performance : ${resultat}`, async () => { });
        return resultat;
    }

    async obtenirScoreRisque(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.scoreRisque);
        await allure.step(`Score de risque : ${resultat}`, async () => { });
        return resultat;
    }

    async obtenirVolatilite(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.valeurVolatilite);
        await allure.step(`Volatilité : ${resultat}`, async () => { });
        return resultat;
    }

    async obtenirRatioSharpe(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.ratioSharpe);
        await allure.step(`Ratio de Sharpe : ${resultat}`, async () => { });
        return resultat;
    }

    async lancerStressTest(scenario: string): Promise<void> {
        await allure.step(`Lancer le stress test : ${scenario}`, async () => {
            await this.selectionnerParTexte(this.loc.listeDeRoulanteScenario, scenario);
            await this.cliquer(this.loc.boutonLancerStressTest);
            await this.attendreVisible(this.loc.resultatsStressTest);
        });
    }

    async obtenirStatutConformite(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.statutConformite);
        await allure.step(`Statut de conformité : ${resultat}`, async () => { });
        return resultat;
    }

    async obtenirNoteESG(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.noteESGGlobale);
        await allure.step(`Note ESG globale : ${resultat}`, async () => { });
        return resultat;
    }

    async verifierPageAccueilChargee(): Promise<void> {
        await allure.step("Vérifier que la page d'accueil est chargée", async () => {
            await this.verifierUrlContient('lombardodier');
        });
    }

    async verifierLogoVisible(): Promise<void> {
        await allure.step('Vérifier la visibilité du logo', async () => {
            await this.verifierVisible(this.loc.logo);
        });
    }

    async verifierBoutonMenuVisible(): Promise<void> {
        await allure.step('Vérifier la visibilité du bouton menu', async () => {
            await this.verifierVisible(this.loc.boutonMenu);
        });
    }

    async verifierBoutonConnexionVisible(): Promise<void> {
        await allure.step('Vérifier la visibilité du bouton connexion', async () => {
            await this.verifierVisible(this.loc.boutonConnexion);
        });
    }

    async verifierPiedDePageVisible(): Promise<void> {
        await allure.step('Vérifier que le pied de page est visible', async () => {
            await this.defilerVersElement(this.loc.piedDePage);
            await this.verifierVisible(this.loc.piedDePage);
        });
    }

    async verifierLiensPiedDePage(): Promise<void> {
        await allure.step('Vérifier les liens du pied de page', async () => {
            const nombreLiens = await this.obtenirNombreElements(this.loc.liensPiedDePage);
            if (nombreLiens === 0) {
                throw new Error('Aucun lien trouvé dans le pied de page');
            }
        });
    }

    async verifierCopyright(): Promise<void> {
        await allure.step('Vérifier le texte de copyright', async () => {
            await this.defilerVersElement(this.loc.piedDePage);
            await this.verifierVisible(this.loc.texteCopyright);
        });
    }

    async verifierTableauDeBordCharge(): Promise<void> {
        await allure.step('Vérifier que le tableau de bord est chargé', async () => {
            await this.verifierVisible(this.loc.messageAccueil);
            await this.verifierVisible(this.loc.valeurTotaleActifs);
        });
    }

    async verifierResumePortefeuille(): Promise<void> {
        await allure.step('Vérifier le résumé du portefeuille', async () => {
            await this.verifierVisible(this.loc.valeurTotaleActifs);
            await this.verifierVisible(this.loc.pourcentagePerformance);
        });
    }

    async verifierMetriquesRisque(): Promise<void> {
        await allure.step('Vérifier les métriques de risque', async () => {
            await this.verifierVisible(this.loc.valeurVolatilite);
            await this.verifierVisible(this.loc.ratioSharpe);
            await this.verifierVisible(this.loc.valeurARisque);
        });
    }

    async verifierResultatsStressTest(): Promise<void> {
        await allure.step('Vérifier les résultats du stress test', async () => {
            await this.verifierVisible(this.loc.resultatsStressTest);
            await this.verifierVisible(this.loc.graphiqueStressTest);
        });
    }

    async verifierSectionESG(): Promise<void> {
        await allure.step('Vérifier la section ESG', async () => {
            await this.verifierVisible(this.loc.noteESGGlobale);
            await this.verifierVisible(this.loc.scoreEnvironnemental);
        });
    }

    async capturerPageComplete(nomCapture: string): Promise<string> {
        return await this.prendreCapture(nomCapture);
    }
}
