/**
 * ============================================
 * Lombard Odier - Browser Configuration
 * ============================================
 * Playwright browser launch options and context configuration.
 */

import { LaunchOptions, BrowserContextOptions } from '@playwright/test';
import { ENV_CONFIG } from './env.config';

export const LAUNCH_OPTIONS: LaunchOptions = {
    headless: ENV_CONFIG.browser.headless,
    slowMo: ENV_CONFIG.browser.slowMo,
    args: ENV_CONFIG.browser.headless
        ? [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
        ]
        : [
            '--start-maximized',
        ],
};

export const CONTEXT_OPTIONS: BrowserContextOptions = {
    // En mode headed, viewport null permet de prendre toute la place.
    // En mode headless (Jenkins), il faut fixer une taille pour éviter les erreurs de clic hors viewport.
    viewport: ENV_CONFIG.browser.headless
        ? { width: ENV_CONFIG.browser.viewportWidth, height: ENV_CONFIG.browser.viewportHeight }
        : null,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    locale: ENV_CONFIG.language === 'fr' ? 'fr-FR' : 'en-US',
    timezoneId: 'Europe/Zurich',
    recordVideo: ENV_CONFIG.videoRecording
        ? {
            dir: ENV_CONFIG.paths.videos,
            size: {
                width: ENV_CONFIG.browser.viewportWidth,
                height: ENV_CONFIG.browser.viewportHeight,
            },
        }
        : undefined,
    userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};
