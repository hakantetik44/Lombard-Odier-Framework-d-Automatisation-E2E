import { defineConfig, devices } from '@playwright/test';
import { ENV_CONFIG } from './src/config/env.config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: ENV_CONFIG.retryCount,
    workers: process.env.CI ? 1 : 2,
    reporter: [
        ['html', { open: 'never', outputFolder: 'reports/playwright-report' }],
        ['allure-playwright', { outputFolder: ENV_CONFIG.paths.allureResults }],
        ['list'],
    ],
    use: {
        baseURL: ENV_CONFIG.baseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: ENV_CONFIG.videoRecording ? 'on' : 'off',
        viewport: {
            width: ENV_CONFIG.browser.viewportWidth,
            height: ENV_CONFIG.browser.viewportHeight,
        },
        ignoreHTTPSErrors: true,
        actionTimeout: ENV_CONFIG.timeouts.action,
        navigationTimeout: ENV_CONFIG.timeouts.navigation,
        locale: 'fr-FR',
        timezoneId: 'Europe/Zurich',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'mobile-chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'mobile-safari',
            use: { ...devices['iPhone 13'] },
        },
    ],
});
