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
        'html:reports/cucumber-report.html',
        'json:reports/cucumber-report.json',
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
