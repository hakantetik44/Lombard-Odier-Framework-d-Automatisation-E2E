/**
 * ============================================
 * Lombard Odier — Configuration Cucumber
 * ============================================
 */

const commun = {
    requireModule: ['ts-node/register'],
    require: [
        'allure-cucumberjs',
        'src/hooks/**/*.ts',
        'src/steps/**/*.ts',
    ],
    paths: ['tests/features/**/*.feature'],
    format: [
        'progress-bar',
        'allure-cucumberjs/reporter',
        'html:reports/rapport-cucumber.html',
        'json:reports/rapport-cucumber.json',
    ],
    formatOptions: {
        snippetInterface: 'async-await',
        resultsDir: 'reports/allure-results',
    },
};

module.exports = {
    default: {
        ...commun,
    },
    smoke: {
        ...commun,
        tags: '@smoke',
    },
    regression: {
        ...commun,
        tags: '@regression',
        formatOptions: {
            ...commun.formatOptions,
        }
    },
    critical: {
        ...commun,
        tags: '@critical',
    },
    e2e: {
        ...commun,
        tags: '@e2e',
    },
};
