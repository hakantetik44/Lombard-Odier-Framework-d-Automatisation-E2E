/**
 * ============================================
 * Lombard Odier - Environment Configuration
 * ============================================
 * Centralized environment configuration manager.
 * Loads settings from .env files based on the target environment.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load base .env first
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Override with environment-specific .env if exists
const envName = process.env.ENV || 'production';
const envFile = `.env.${envName}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile), override: true });

export const ENV_CONFIG = {
    // ── Application ──────────────────────────────────
    baseUrl: process.env.BASE_URL || 'https://www.lombardodier.com',
    language: process.env.LANGUAGE || 'fr',
    environment: process.env.ENV || 'production',

    // ── Credentials ──────────────────────────────────
    credentials: {
        username: process.env.TEST_USERNAME || '',
        password: process.env.TEST_PASSWORD || '',
    },

    // ── Browser ──────────────────────────────────────
    browser: {
        name: process.env.BROWSER || 'chromium',
        headless: process.env.HEADLESS === 'true',
        viewportWidth: parseInt(process.env.VIEWPORT_WIDTH || '1920', 10),
        viewportHeight: parseInt(process.env.VIEWPORT_HEIGHT || '1080', 10),
        slowMo: parseInt(process.env.SLOWMO || '0', 10),
    },

    // ── Timeouts ─────────────────────────────────────
    timeouts: {
        default: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
        navigation: parseInt(process.env.NAVIGATION_TIMEOUT || '60000', 10),
        action: parseInt(process.env.ACTION_TIMEOUT || '15000', 10),
    },

    // ── Recording & Retry ────────────────────────────
    retryCount: parseInt(process.env.RETRY_COUNT || '2', 10),
    screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE === 'true',
    videoRecording: process.env.VIDEO_RECORDING === 'true',
    traceOnFailure: process.env.TRACE_ON_FAILURE === 'true',

    // ── Reporting Paths ──────────────────────────────
    paths: {
        allureResults: process.env.ALLURE_RESULTS_DIR || 'reports/allure-results',
        screenshots: process.env.SCREENSHOT_DIR || 'reports/screenshots',
        videos: process.env.VIDEO_DIR || 'reports/videos',
    },
} as const;

export type EnvConfig = typeof ENV_CONFIG;
