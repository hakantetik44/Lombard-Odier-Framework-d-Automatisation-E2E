/**
 * ============================================
 * Lombard Odier — PagePrincipale (Page Object Unique)
 * ============================================
 * Combine toutes les actions métier en une seule classe :
 *   - Page d'accueil
 *   - Connexion
 *   - Tableau de bord
 *   - Analyse des risques
 *
 * Hérite de PageBase pour les fonctions communes.
 */

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

    // ══════════════════════════════════════════════════
    //  🏠 PAGE D'ACCUEIL
    // ══════════════════════════════════════════════════

    /** Naviguer vers la page d'accueil */
    async ouvrirPageAccueil(): Promise<void> {
        await allure.step("Naviguer vers la page d'accueil", async () => {
            await this.naviguerVers('/fr/home.html');
            await this.attendreChargementPage();
        });
    }

    /** Accepter le bandeau de cookies */
    async accepterBandeauCookies(): Promise<void> {
        await allure.step('Accepter le bandeau de cookies', async () => {
            await this.accepterCookies(this.loc.boutonAccepterCookies);
        });
    }

    /** Ouvrir le menu de navigation */
    async ouvrirMenu(): Promise<void> {
        await allure.step('Ouvrir le menu de navigation', async () => {
            await this.cliquer(this.loc.boutonMenu);
        });
    }

    /** Fermer le menu de navigation */
    async fermerMenu(): Promise<void> {
        await allure.step('Fermer le menu de navigation', async () => {
            await this.cliquer(this.loc.boutonMenu);
        });
    }

    /** Naviguer vers la section Gestion de Patrimoine */
    async allerGestionPatrimoine(): Promise<void> {
        await allure.step('Naviguer vers Gestion de Patrimoine', async () => {
            await this.cliquer(this.loc.lienGestionPatrimoine);
            await this.attendreChargementPage();
        });
    }

    /** Naviguer vers la section Gestion d'Actifs */
    async allerGestionActifs(): Promise<void> {
        await allure.step("Naviguer vers Gestion d'Actifs", async () => {
            await this.cliquer(this.loc.lienGestionActifs);
            await this.attendreChargementPage();
        });
    }

    /** Naviguer vers Développement Durable */
    async allerDeveloppementDurable(): Promise<void> {
        await allure.step('Naviguer vers Développement Durable', async () => {
            await this.cliquer(this.loc.lienDeveloppementDurable);
            await this.attendreChargementPage();
        });
    }

    /** Défiler vers la section Actualités */
    async defilerVersActualites(): Promise<void> {
        await allure.step('Défiler vers la section Actualités', async () => {
            await this.defilerVersElement(this.loc.sectionActualites);
        });
    }

    /** Défiler vers le pied de page */
    async defilerVersPiedDePage(): Promise<void> {
        await allure.step('Défiler vers le pied de page', async () => {
            await this.defilerVersElement(this.loc.piedDePage);
        });
    }

    /** Cliquer sur le lien LinkedIn du pied de page */
    async cliquerLinkedIn(): Promise<void> {
        await allure.step('Cliquer sur le lien LinkedIn', async () => {
            await this.defilerVersElement(this.loc.lienLinkedIn);
            // Ne pas cliquer réellement — juste vérifier sa présence
        });
    }

    // ══════════════════════════════════════════════════
    //  🔐 CONNEXION
    // ══════════════════════════════════════════════════

    /** Naviguer vers la page de connexion */
    async ouvrirPageConnexion(): Promise<void> {
        await allure.step('Naviguer vers la page de connexion', async () => {
            // S'assurer que le bouton est bien dans le champ de vision (sécurité Jenkins)
            await this.defilerVersElement(this.loc.boutonConnexion);
            await this.cliquer(this.loc.boutonConnexion, { force: true });
            await this.attendreChargementPage();
        });
    }

    /** Saisir le nom d'utilisateur */
    async saisirNomUtilisateur(identifiant: string): Promise<void> {
        await allure.step(`Saisir l'identifiant : ${identifiant}`, async () => {
            await this.saisirTexte(this.loc.champNomUtilisateur, identifiant);
        });
    }

    /** Saisir le mot de passe */
    async saisirMotDePasse(motDePasse: string): Promise<void> {
        await allure.step('Saisir le mot de passe', async () => {
            await this.saisirTexte(this.loc.champMotDePasse, motDePasse);
        });
    }

    /** Cliquer sur le bouton de connexion */
    async cliquerBoutonConnexion(): Promise<void> {
        await allure.step('Cliquer sur le bouton de connexion', async () => {
            await this.cliquer(this.loc.boutonSoumettre);
            await this.attendreChargementPage();
        });
    }

    /** Effectuer la connexion complète */
    async seConnecter(identifiant: string, motDePasse: string): Promise<void> {
        await allure.step('Effectuer la connexion', async () => {
            await this.saisirNomUtilisateur(identifiant);
            await this.saisirMotDePasse(motDePasse);
            await this.cliquerBoutonConnexion();
        });
    }

    /** Se déconnecter */
    async seDeconnecter(): Promise<void> {
        await allure.step('Se déconnecter', async () => {
            await this.cliquer(this.loc.boutonDeconnexion);
            await this.attendreChargementPage();
        });
    }

    // ══════════════════════════════════════════════════
    //  📊 TABLEAU DE BORD
    // ══════════════════════════════════════════════════

    /** Obtenir la valeur totale des actifs */
    async obtenirValeurTotaleActifs(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.valeurTotaleActifs);
        await allure.step(`Valeur totale des actifs : ${resultat}`, async () => { });
        return resultat;
    }

    /** Obtenir le pourcentage de performance */
    async obtenirPerformance(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.pourcentagePerformance);
        await allure.step(`Performance : ${resultat}`, async () => { });
        return resultat;
    }

    // ══════════════════════════════════════════════════
    //  ⚡ ANALYSE DES RISQUES
    // ══════════════════════════════════════════════════

    /** Obtenir le score de risque */
    async obtenirScoreRisque(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.scoreRisque);
        await allure.step(`Score de risque : ${resultat}`, async () => { });
        return resultat;
    }

    /** Obtenir la volatilité */
    async obtenirVolatilite(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.valeurVolatilite);
        await allure.step(`Volatilité : ${resultat}`, async () => { });
        return resultat;
    }

    /** Obtenir le ratio de Sharpe */
    async obtenirRatioSharpe(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.ratioSharpe);
        await allure.step(`Ratio de Sharpe : ${resultat}`, async () => { });
        return resultat;
    }

    /** Lancer un stress test */
    async lancerStressTest(scenario: string): Promise<void> {
        await allure.step(`Lancer le stress test : ${scenario}`, async () => {
            await this.selectionnerParTexte(this.loc.listeDeRoulanteScenario, scenario);
            await this.cliquer(this.loc.boutonLancerStressTest);
            await this.attendreVisible(this.loc.resultatsStressTest);
        });
    }

    /** Obtenir le statut de conformité */
    async obtenirStatutConformite(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.statutConformite);
        await allure.step(`Statut de conformité : ${resultat}`, async () => { });
        return resultat;
    }

    /** Obtenir la note ESG globale */
    async obtenirNoteESG(): Promise<string> {
        const resultat = await this.obtenirTexte(this.loc.noteESGGlobale);
        await allure.step(`Note ESG globale : ${resultat}`, async () => { });
        return resultat;
    }

    // ══════════════════════════════════════════════════
    //  ✅ VÉRIFICATIONS
    // ══════════════════════════════════════════════════

    /** Vérifier que la page d'accueil est chargée */
    async verifierPageAccueilChargee(): Promise<void> {
        await allure.step("Vérifier que la page d'accueil est chargée", async () => {
            await this.verifierUrlContient('lombardodier');
        });
    }

    /** Vérifier la visibilité du logo */
    async verifierLogoVisible(): Promise<void> {
        await allure.step('Vérifier la visibilité du logo', async () => {
            await this.verifierVisible(this.loc.logo);
        });
    }

    /** Vérifier la visibilité du bouton menu */
    async verifierBoutonMenuVisible(): Promise<void> {
        await allure.step('Vérifier la visibilité du bouton menu', async () => {
            await this.verifierVisible(this.loc.boutonMenu);
        });
    }

    /** Vérifier la visibilité du bouton connexion */
    async verifierBoutonConnexionVisible(): Promise<void> {
        await allure.step('Vérifier la visibilité du bouton connexion', async () => {
            await this.verifierVisible(this.loc.boutonConnexion);
        });
    }

    /** Vérifier que le pied de page est visible */
    async verifierPiedDePageVisible(): Promise<void> {
        await allure.step('Vérifier que le pied de page est visible', async () => {
            await this.defilerVersElement(this.loc.piedDePage);
            await this.verifierVisible(this.loc.piedDePage);
        });
    }

    /** Vérifier les liens du pied de page */
    async verifierLiensPiedDePage(): Promise<void> {
        await allure.step('Vérifier les liens du pied de page', async () => {
            const nombreLiens = await this.obtenirNombreElements(this.loc.liensPiedDePage);
            if (nombreLiens === 0) {
                throw new Error('Aucun lien trouvé dans le pied de page');
            }
        });
    }

    /** Vérifier le texte de copyright */
    async verifierCopyright(): Promise<void> {
        await allure.step('Vérifier le texte de copyright', async () => {
            await this.defilerVersElement(this.loc.piedDePage);
            await this.verifierVisible(this.loc.texteCopyright);
        });
    }

    /** Vérifier que le tableau de bord est chargé */
    async verifierTableauDeBordCharge(): Promise<void> {
        await allure.step('Vérifier que le tableau de bord est chargé', async () => {
            await this.verifierVisible(this.loc.messageAccueil);
            await this.verifierVisible(this.loc.valeurTotaleActifs);
        });
    }

    /** Vérifier le résumé du portefeuille */
    async verifierResumePortefeuille(): Promise<void> {
        await allure.step('Vérifier le résumé du portefeuille', async () => {
            await this.verifierVisible(this.loc.valeurTotaleActifs);
            await this.verifierVisible(this.loc.pourcentagePerformance);
        });
    }

    /** Vérifier les métriques de risque */
    async verifierMetriquesRisque(): Promise<void> {
        await allure.step('Vérifier les métriques de risque', async () => {
            await this.verifierVisible(this.loc.valeurVolatilite);
            await this.verifierVisible(this.loc.ratioSharpe);
            await this.verifierVisible(this.loc.valeurARisque);
        });
    }

    /** Vérifier les résultats du stress test */
    async verifierResultatsStressTest(): Promise<void> {
        await allure.step('Vérifier les résultats du stress test', async () => {
            await this.verifierVisible(this.loc.resultatsStressTest);
            await this.verifierVisible(this.loc.graphiqueStressTest);
        });
    }

    /** Vérifier la section ESG */
    async verifierSectionESG(): Promise<void> {
        await allure.step('Vérifier la section ESG', async () => {
            await this.verifierVisible(this.loc.noteESGGlobale);
            await this.verifierVisible(this.loc.scoreEnvironnemental);
        });
    }

    /** Prendre une capture d'écran de la page */
    async capturerPageComplete(nomCapture: string): Promise<string> {
        return await this.prendreCapture(nomCapture);
    }
}
