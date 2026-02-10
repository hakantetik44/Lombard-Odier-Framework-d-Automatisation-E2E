/**
 * ============================================
 * Lombard Odier — Configuration Cucumber
 * ============================================
 */

const commun = {
    requireModule: ['ts-node/register'],
    require: [
        'src/hooks/**/*.ts',
        'src/steps/**/*.ts',
    ],
    paths: ['tests/features/**/*.feature'],
    format: [
        'progress-bar',
        'html:reports/rapport-cucumber.html',
        'json:reports/rapport-cucumber.json',
    ],
    formatOptions: {
        snippetInterface: 'async-await',
    },
    publishQuiet: true,
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
