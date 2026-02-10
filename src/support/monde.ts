/**
 * ============================================
 * Lombard Odier — Monde (État Partagé des Tests)
 * ============================================
 * Gère les instances du navigateur, du contexte et de la page Playwright
 * partagées entre les étapes Cucumber dans un même scénario.
 */

import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { ENV_CONFIG } from '../config/env.config';
import { LAUNCH_OPTIONS, CONTEXT_OPTIONS } from '../config/browser.config';

let navigateur: Browser;
let contexte: BrowserContext;
let page: Page;

/** Obtenir l'instance de page active */
export function getPage(): Page {
    if (!page) {
        throw new Error("La page n'est pas initialisée. Vérifiez que les hooks sont bien configurés.");
    }
    return page;
}

/** Obtenir le contexte du navigateur */
export function getContexte(): BrowserContext {
    if (!contexte) {
        throw new Error("Le contexte n'est pas initialisé.");
    }
    return contexte;
}

/** Obtenir l'instance du navigateur */
export function getNavigateur(): Browser {
    if (!navigateur) {
        throw new Error("Le navigateur n'est pas initialisé.");
    }
    return navigateur;
}

/** Lancer le navigateur selon la configuration */
export async function lancerNavigateur(): Promise<Browser> {
    switch (ENV_CONFIG.browser.name) {
        case 'firefox':
            navigateur = await firefox.launch(LAUNCH_OPTIONS);
            break;
        case 'webkit':
            navigateur = await webkit.launch(LAUNCH_OPTIONS);
            break;
        case 'chromium':
        default:
            navigateur = await chromium.launch(LAUNCH_OPTIONS);
            break;
    }
    return navigateur;
}

/** Créer un nouveau contexte de navigation */
export async function creerContexte(): Promise<BrowserContext> {
    if (!navigateur) {
        await lancerNavigateur();
    }
    contexte = await navigateur.newContext(CONTEXT_OPTIONS);
    contexte.setDefaultTimeout(ENV_CONFIG.timeouts.default);
    contexte.setDefaultNavigationTimeout(ENV_CONFIG.timeouts.navigation);
    return contexte;
}

/** Créer une nouvelle page dans le contexte actuel */
export async function creerPage(): Promise<Page> {
    if (!contexte) {
        await creerContexte();
    }
    page = await contexte.newPage();


    return page;
}

/** Fermer la page actuelle */
export async function fermerPage(): Promise<void> {
    if (page) {
        await page.close();
    }
}

/** Fermer le contexte actuel */
export async function fermerContexte(): Promise<void> {
    if (contexte) {
        await contexte.close();
    }
}

/** Fermer le navigateur */
export async function fermerNavigateur(): Promise<void> {
    if (navigateur) {
        await navigateur.close();
    }
}

/** Obtenir le chemin de la vidéo de la page actuelle */
export async function obtenirCheminVideo(): Promise<string | null> {
    if (page && page.video()) {
        try {
            return await page.video()!.path();
        } catch {
            return null;
        }
    }
    return null;
}
