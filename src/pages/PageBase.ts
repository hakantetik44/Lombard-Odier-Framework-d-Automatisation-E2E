/**
 * ============================================
 * Lombard Odier — PageBase (Fonctions Communes)
 * ============================================
 * Classe abstraite fournissant des actions et attentes réutilisables.
 * Tous les Page Objects héritent de cette classe.
 *
 * Opérations communes :
 *   - Navigation & assertions URL
 *   - Helpers d'attente (visible, caché, activé, détaché)
 *   - Actions : clic, saisie, sélection
 *   - Capture d'écran & défilement
 *   - Vérification d'état des éléments
 *   - Gestion des iframes & onglets
 */

import { Page, Locator, expect, BrowserContext } from '@playwright/test';
import { ENV_CONFIG } from '../config/env.config';
import * as fs from 'fs';
import * as path from 'path';
import { allure } from 'allure-playwright';

export abstract class PageBase {
    protected page: Page;
    protected contexte: BrowserContext;

    constructor(page: Page) {
        this.page = page;
        this.contexte = page.context();
        this.page.setDefaultTimeout(ENV_CONFIG.timeouts.default);
        this.page.setDefaultNavigationTimeout(ENV_CONFIG.timeouts.navigation);
    }

    // ══════════════════════════════════════════════
    //  NAVIGATION
    // ══════════════════════════════════════════════

    /** Naviguer vers un chemin relatif à l'URL de base */
    async naviguerVers(cheminUrl: string): Promise<void> {
        const urlComplete = `${ENV_CONFIG.baseUrl}${cheminUrl}`;
        await allure.step(`Naviguer vers : ${urlComplete}`, async () => {
            await this.page.goto(urlComplete, {
                waitUntil: 'domcontentloaded',
                timeout: ENV_CONFIG.timeouts.navigation,
            });
        });
    }

    /** Naviguer vers une URL complète */
    async naviguerVersUrl(url: string): Promise<void> {
        await allure.step(`Naviguer vers URL : ${url}`, async () => {
            await this.page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: ENV_CONFIG.timeouts.navigation,
            });
        });
    }

    /** Obtenir l'URL actuelle */
    async obtenirUrlActuelle(): Promise<string> {
        return this.page.url();
    }

    /** Vérifier que l'URL contient le texte attendu */
    async verifierUrlContient(texteAttendu: string): Promise<void> {
        await allure.step(`Vérifier URL contient : "${texteAttendu}"`, async () => {
            await expect(this.page).toHaveURL(new RegExp(texteAttendu));
        });
    }

    /** Obtenir le titre de la page */
    async obtenirTitrePage(): Promise<string> {
        return await this.page.title();
    }

    /** Vérifier le titre de la page */
    async verifierTitrePage(titreAttendu: string): Promise<void> {
        await allure.step(`Vérifier titre page : "${titreAttendu}"`, async () => {
            await expect(this.page).toHaveTitle(new RegExp(titreAttendu));
        });
    }

    // ══════════════════════════════════════════════
    //  FENÊTRE DU NAVIGATEUR
    // ══════════════════════════════════════════════

    /** Maximiser la fenêtre du navigateur (plein écran) */
    async maximiserFenetre(): Promise<void> {
        await this.page.setViewportSize({
            width: 1920,
            height: 1080,
        });
    }

    // ══════════════════════════════════════════════
    //  HELPERS D'ATTENTE
    // ══════════════════════════════════════════════

    /** Attendre que l'élément soit visible */
    async attendreVisible(locateur: Locator, delai?: number): Promise<void> {
        await locateur.waitFor({
            state: 'visible',
            timeout: delai || ENV_CONFIG.timeouts.default,
        });
    }

    /** Attendre que l'élément soit caché */
    async attendreCache(locateur: Locator, delai?: number): Promise<void> {
        await locateur.waitFor({
            state: 'hidden',
            timeout: delai || ENV_CONFIG.timeouts.default,
        });
    }

    /** Attendre que l'élément soit attaché au DOM */
    async attendreAttache(locateur: Locator, delai?: number): Promise<void> {
        await locateur.waitFor({
            state: 'attached',
            timeout: delai || ENV_CONFIG.timeouts.default,
        });
    }

    /** Attendre que l'élément soit détaché du DOM */
    async attendreDetache(locateur: Locator, delai?: number): Promise<void> {
        await locateur.waitFor({
            state: 'detached',
            timeout: delai || ENV_CONFIG.timeouts.default,
        });
    }

    /** Attendre le réseau inactif */
    async attendreReseauInactif(delai?: number): Promise<void> {
        await this.page.waitForLoadState('networkidle', {
            timeout: delai || ENV_CONFIG.timeouts.navigation,
        });
    }

    /** Attendre le chargement complet de la page */
    async attendreChargementPage(): Promise<void> {
        await this.page.waitForLoadState('load');
    }

    /** Attendre le chargement du DOM */
    async attendreChargementDOM(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /** Attente personnalisée avec sondage */
    async attendreCondition(
        fonctionCondition: () => Promise<boolean>,
        delai: number = ENV_CONFIG.timeouts.default,
        intervalle: number = 500
    ): Promise<void> {
        const debut = Date.now();
        while (Date.now() - debut < delai) {
            if (await fonctionCondition()) return;
            await this.page.waitForTimeout(intervalle);
        }
        throw new Error(`Condition non remplie dans les ${delai}ms`);
    }

    // ══════════════════════════════════════════════
    //  INTERACTIONS AVEC LES ÉLÉMENTS
    // ══════════════════════════════════════════════

    /** Cliquer sur un élément avec attente automatique */
    async cliquer(locateur: Locator, options?: { force?: boolean; delai?: number }): Promise<void> {
        await this.attendreVisible(locateur, options?.delai);
        await locateur.click({
            force: options?.force || false,
            timeout: options?.delai || ENV_CONFIG.timeouts.action,
        });
    }

    /** Double-cliquer sur un élément */
    async doubleClic(locateur: Locator): Promise<void> {
        await this.attendreVisible(locateur);
        await locateur.dblclick();
    }

    /** Clic droit sur un élément */
    async clicDroit(locateur: Locator): Promise<void> {
        await this.attendreVisible(locateur);
        await locateur.click({ button: 'right' });
    }

    /** Saisir du texte dans un champ (efface d'abord) */
    async saisirTexte(locateur: Locator, texte: string): Promise<void> {
        await this.attendreVisible(locateur);
        await locateur.clear();
        await locateur.fill(texte);
    }

    /** Saisir du texte caractère par caractère */
    async saisirLentement(locateur: Locator, texte: string, delai: number = 100): Promise<void> {
        await this.attendreVisible(locateur);
        await locateur.clear();
        await locateur.pressSequentially(texte, { delay: delai });
    }

    /** Effacer un champ de saisie */
    async effacerChamp(locateur: Locator): Promise<void> {
        await this.attendreVisible(locateur);
        await locateur.clear();
    }

    /** Sélectionner dans une liste déroulante par valeur */
    async selectionnerParValeur(locateur: Locator, valeur: string): Promise<void> {
        await this.attendreVisible(locateur);
        await locateur.selectOption({ value: valeur });
    }

    /** Sélectionner dans une liste déroulante par texte visible */
    async selectionnerParTexte(locateur: Locator, texte: string): Promise<void> {
        await this.attendreVisible(locateur);
        await locateur.selectOption({ label: texte });
    }

    /** Survoler un élément */
    async survoler(locateur: Locator): Promise<void> {
        await this.attendreVisible(locateur);
        await locateur.hover();
    }

    /** Appuyer sur une touche */
    async appuyerTouche(touche: string): Promise<void> {
        await this.page.keyboard.press(touche);
    }

    /** Téléverser un fichier */
    async televerserFichier(locateur: Locator, cheminFichier: string): Promise<void> {
        await locateur.setInputFiles(cheminFichier);
    }

    // ══════════════════════════════════════════════
    //  VÉRIFICATION D'ÉTAT DES ÉLÉMENTS
    // ══════════════════════════════════════════════

    /** Vérifier si l'élément est visible */
    async estVisible(locateur: Locator): Promise<boolean> {
        return await locateur.isVisible();
    }

    /** Vérifier si l'élément est activé */
    async estActive(locateur: Locator): Promise<boolean> {
        return await locateur.isEnabled();
    }

    /** Vérifier si la case est cochée */
    async estCoche(locateur: Locator): Promise<boolean> {
        return await locateur.isChecked();
    }

    /** Obtenir le texte d'un élément */
    async obtenirTexte(locateur: Locator): Promise<string> {
        await this.attendreVisible(locateur);
        return (await locateur.textContent()) || '';
    }

    /** Obtenir le texte interne */
    async obtenirTexteInterne(locateur: Locator): Promise<string> {
        await this.attendreVisible(locateur);
        return await locateur.innerText();
    }

    /** Obtenir la valeur d'un champ */
    async obtenirValeurChamp(locateur: Locator): Promise<string> {
        await this.attendreVisible(locateur);
        return await locateur.inputValue();
    }

    /** Obtenir la valeur d'un attribut */
    async obtenirAttribut(locateur: Locator, attribut: string): Promise<string | null> {
        await this.attendreVisible(locateur);
        return await locateur.getAttribute(attribut);
    }

    /** Obtenir le nombre d'éléments */
    async obtenirNombreElements(locateur: Locator): Promise<number> {
        return await locateur.count();
    }

    /** Obtenir tous les textes de plusieurs éléments */
    async obtenirTousLesTextes(locateur: Locator): Promise<string[]> {
        return await locateur.allTextContents();
    }

    // ══════════════════════════════════════════════
    //  ASSERTIONS
    // ══════════════════════════════════════════════

    /** Vérifier que l'élément est visible */
    async verifierVisible(locateur: Locator): Promise<void> {
        await expect(locateur).toBeVisible({ timeout: ENV_CONFIG.timeouts.default });
    }

    /** Vérifier que l'élément N'EST PAS visible */
    async verifierNonVisible(locateur: Locator): Promise<void> {
        await expect(locateur).not.toBeVisible({ timeout: ENV_CONFIG.timeouts.default });
    }

    /** Vérifier que l'élément a un texte spécifique */
    async verifierTexte(locateur: Locator, texteAttendu: string): Promise<void> {
        await expect(locateur).toHaveText(texteAttendu, { timeout: ENV_CONFIG.timeouts.default });
    }

    /** Vérifier que l'élément contient un texte */
    async verifierContientTexte(locateur: Locator, texte: string): Promise<void> {
        await expect(locateur).toContainText(texte, { timeout: ENV_CONFIG.timeouts.default });
    }

    /** Vérifier que l'élément est activé */
    async verifierActive(locateur: Locator): Promise<void> {
        await expect(locateur).toBeEnabled({ timeout: ENV_CONFIG.timeouts.default });
    }

    /** Vérifier que l'élément est désactivé */
    async verifierDesactive(locateur: Locator): Promise<void> {
        await expect(locateur).toBeDisabled({ timeout: ENV_CONFIG.timeouts.default });
    }

    /** Vérifier qu'un attribut a une valeur spécifique */
    async verifierAttribut(locateur: Locator, attribut: string, valeur: string): Promise<void> {
        await expect(locateur).toHaveAttribute(attribut, valeur);
    }

    // ══════════════════════════════════════════════
    //  DÉFILEMENT
    // ══════════════════════════════════════════════

    /** Défiler jusqu'à un élément */
    async defilerVersElement(locateur: Locator): Promise<void> {
        await locateur.scrollIntoViewIfNeeded();
    }

    /** Défiler vers le haut de la page */
    async defilerVersLeHaut(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

    /** Défiler vers le bas de la page */
    async defilerVersLeBas(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    // ══════════════════════════════════════════════
    //  CAPTURE D'ÉCRAN & DÉBOGAGE
    // ══════════════════════════════════════════════

    /** Prendre une capture d'écran pleine page */
    async prendreCapture(nom: string): Promise<string> {
        const dossierCaptures = ENV_CONFIG.paths.screenshots;
        if (!fs.existsSync(dossierCaptures)) {
            fs.mkdirSync(dossierCaptures, { recursive: true });
        }
        const horodatage = new Date().toISOString().replace(/[:.]/g, '-');
        const cheminFichier = path.join(dossierCaptures, `${nom}_${horodatage}.png`);

        await this.page.screenshot({
            path: cheminFichier,
            fullPage: true,
        });

        // Attacher au rapport Allure
        const tamponCapture = fs.readFileSync(cheminFichier);
        await allure.attachment(nom, tamponCapture, 'image/png');

        return cheminFichier;
    }

    /** Capture d'écran en cas d'échec */
    async captureEnCasDEchec(nomScenario: string): Promise<string> {
        const nomNettoye = nomScenario.replace(/[^a-zA-Z0-9]/g, '_');
        return await this.prendreCapture(`ECHEC_${nomNettoye}`);
    }

    // ══════════════════════════════════════════════
    //  IFRAME & ONGLETS
    // ══════════════════════════════════════════════

    /** Basculer vers un iframe */
    async basculerVersIframe(locateurIframe: string): Promise<any> {
        return this.page.frameLocator(locateurIframe);
    }

    /** Gérer un nouvel onglet */
    async gererNouvelOnglet(action: () => Promise<void>): Promise<Page> {
        const [nouvellePage] = await Promise.all([
            this.contexte.waitForEvent('page'),
            action(),
        ]);
        await nouvellePage.waitForLoadState('domcontentloaded');
        return nouvellePage;
    }

    // ══════════════════════════════════════════════
    //  GESTION DES DIALOGUES
    // ══════════════════════════════════════════════

    /** Accepter une boîte de dialogue */
    async accepterDialogue(): Promise<void> {
        this.page.on('dialog', async (dialogue) => {
            await dialogue.accept();
        });
    }

    /** Rejeter une boîte de dialogue */
    async rejeterDialogue(): Promise<void> {
        this.page.on('dialog', async (dialogue) => {
            await dialogue.dismiss();
        });
    }

    // ══════════════════════════════════════════════
    //  GESTION DES COOKIES
    // ══════════════════════════════════════════════

    /** Accepter le bandeau de cookies */
    async accepterCookies(locateur: Locator): Promise<void> {
        try {
            const visible = await locateur.isVisible({ timeout: 5000 });
            if (visible) {
                await locateur.click();
                await this.page.waitForTimeout(1000);
            }
        } catch {
            // Le bandeau de cookies peut ne pas apparaître — on continue
        }
    }

    /** Obtenir tous les cookies */
    async obtenirCookies(): Promise<any[]> {
        return await this.contexte.cookies();
    }

    /** Supprimer tous les cookies */
    async supprimerCookies(): Promise<void> {
        await this.contexte.clearCookies();
    }
}
