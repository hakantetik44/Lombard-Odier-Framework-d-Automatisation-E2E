import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { ENV_CONFIG } from '../config/env.config';
import { LAUNCH_OPTIONS, CONTEXT_OPTIONS } from '../config/browser.config';

let navigateur: Browser;
let contexte: BrowserContext;
let page: Page;

export function getPage(): Page {
    if (!page) {
        throw new Error("La page n'est pas initialisée.");
    }
    return page;
}

export function getContexte(): BrowserContext {
    if (!contexte) {
        throw new Error("Le contexte n'est pas initialisé.");
    }
    return contexte;
}

export function getNavigateur(): Browser {
    if (!navigateur) {
        throw new Error("Le navigateur n'est pas initialisé.");
    }
    return navigateur;
}

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

export async function creerContexte(): Promise<BrowserContext> {
    if (!navigateur) {
        await lancerNavigateur();
    }
    contexte = await navigateur.newContext(CONTEXT_OPTIONS);
    contexte.setDefaultTimeout(ENV_CONFIG.timeouts.default);
    contexte.setDefaultNavigationTimeout(ENV_CONFIG.timeouts.navigation);
    return contexte;
}

export async function creerPage(): Promise<Page> {
    if (!contexte) {
        await creerContexte();
    }
    page = await contexte.newPage();

    return page;
}

export async function fermerPage(): Promise<void> {
    if (page) {
        await page.close();
    }
}

export async function fermerContexte(): Promise<void> {
    if (contexte) {
        await contexte.close();
    }
}

export async function fermerNavigateur(): Promise<void> {
    if (navigateur) {
        await navigateur.close();
    }
}

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
