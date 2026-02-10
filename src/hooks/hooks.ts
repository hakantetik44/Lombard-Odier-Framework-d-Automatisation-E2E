import 'allure-cucumberjs';
import { Before, After, BeforeAll, AfterAll, Status, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import {
    lancerNavigateur,
    creerContexte,
    creerPage,
    fermerPage,
    fermerContexte,
    fermerNavigateur,
    getPage,
    obtenirCheminVideo,
} from '../support/monde';
import { ENV_CONFIG } from '../config/env.config';
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(60 * 1000);

BeforeAll({ timeout: 30000 }, async function () {
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║   🏦 Lombard Odier — Suite de Tests E2E      ║');
    console.log('║   Environnement : ' + ENV_CONFIG.environment.padEnd(26) + '║');
    console.log('║   Navigateur : ' + ENV_CONFIG.browser.name.padEnd(29) + '║');
    console.log('║   URL de base : ' + ENV_CONFIG.baseUrl.padEnd(31) + '║');
    console.log('╚══════════════════════════════════════════════╝');

    const dossiers = [
        ENV_CONFIG.paths.allureResults,
        ENV_CONFIG.paths.screenshots,
        ENV_CONFIG.paths.videos,
    ];
    dossiers.forEach((dossier) => {
        if (!fs.existsSync(dossier)) {
            fs.mkdirSync(dossier, { recursive: true });
        }
    });

    await lancerNavigateur();
    console.log(`✅ Navigateur lancé : ${ENV_CONFIG.browser.name} (headless: ${ENV_CONFIG.browser.headless})`);
});

AfterAll({ timeout: 30000 }, async function () {
    console.log('\n🧹 Nettoyage des ressources...');
    await fermerNavigateur();
    console.log('✅ Navigateur fermé');
    console.log('══════════════════════════════════════════════');
    console.log('  📊 Exécution terminée !');
    console.log('  📁 Rapports : ' + ENV_CONFIG.paths.allureResults);
    console.log('  📸 Captures : ' + ENV_CONFIG.paths.screenshots);
    console.log('  🎬 Vidéos : ' + ENV_CONFIG.paths.videos);
    console.log('══════════════════════════════════════════════');
});

let debutScenario: number;

Before({ timeout: 60000 }, async function (scenario: ITestCaseHookParameter) {
    debutScenario = Date.now();
    const nomScenario = scenario.pickle.name;
    const tags = scenario.pickle.tags.map((t) => t.name).join(', ');

    console.log(`\n▶ Démarrage du scénario : ${nomScenario}`);
    if (tags) console.log(`  Tags : ${tags}`);

    await creerContexte();
    const page = await creerPage();

    const { PagePrincipale } = require('../pages/PagePrincipale');
    const pagePrincipale = new PagePrincipale(page);
    await pagePrincipale.maximiserFenetre();

    console.log('  🖥 Navigateur prêt et maximisé selon la résolution d\'écran');

    ecrireEnvironnementAllure();
});

After({ timeout: 60000 }, async function (scenario: ITestCaseHookParameter) {
    const nomScenario = scenario.pickle.name;
    const statut = scenario.result?.status;

    console.log(`  Statut : ${statut === Status.PASSED ? '✅ RÉUSSI' : '❌ ÉCHOUÉ'} — ${nomScenario}`);

    if (statut === Status.FAILED) {
        console.error(`  ❌ MESSAGE D'ERREUR : ${scenario.result?.message}`);
    }

    if (statut === Status.FAILED) {
        try {
            const page = getPage();
            const nomNettoye = nomScenario.replace(/[^a-zA-Z0-9]/g, '_');
            const horodatage = new Date().toISOString().replace(/[:.]/g, '-');
            const cheminCapture = path.join(
                ENV_CONFIG.paths.screenshots,
                `ECHEC_${nomNettoye}_${horodatage}.png`
            );

            await page.screenshot({ path: cheminCapture, fullPage: true });
            console.log(`  📸 Capture sauvegardée : ${cheminCapture}`);

            const tampon = fs.readFileSync(cheminCapture);
            this.attach(tampon, 'image/png');

            const urlActuelle = page.url();
            this.attach(`Échec à l'URL : ${urlActuelle}`, 'text/plain');
        } catch (erreur) {
            console.error("  ⚠ Échec de la capture d'écran :", erreur);
        }
    }

    if (ENV_CONFIG.videoRecording) {
        try {
            const finScenario = Date.now();
            const dureeSecondes = Math.floor((finScenario - debutScenario) / 1000);

            const cheminVideo = await obtenirCheminVideo();
            if (cheminVideo && fs.existsSync(cheminVideo)) {
                const tamponVideo = fs.readFileSync(cheminVideo);
                this.attach(tamponVideo, 'video/webm');
                this.attach(`Durée totale du test : ${dureeSecondes} secondes`, 'text/plain');
                console.log(`  🎬 Vidéo attachée (${dureeSecondes}s) : ${cheminVideo}`);
            }
        } catch (erreur) {
            console.error('  ⚠ Échec de l\'attachement vidéo :', erreur);
        }
    }

    await fermerPage();
    await fermerContexte();
});

Before({ tags: '@smoke' }, async function () {
    console.log('  🔥 Test SMOKE');
});

Before({ tags: '@critical' }, async function () {
    console.log('  🚨 Test CRITIQUE');
});

function ecrireEnvironnementAllure(): void {
    const contenu = [
        `Environnement=${ENV_CONFIG.environment}`,
        `URL_Base=${ENV_CONFIG.baseUrl}`,
        `Navigateur=${ENV_CONFIG.browser.name}`,
        `Headless=${ENV_CONFIG.browser.headless}`,
        `Viewport=${ENV_CONFIG.browser.viewportWidth}x${ENV_CONFIG.browser.viewportHeight}`,
        `Langue=${ENV_CONFIG.language}`,
        `Timeout=${ENV_CONFIG.timeouts.default}ms`,
        `Tentatives=${ENV_CONFIG.retryCount}`,
        `Enregistrement_Video=${ENV_CONFIG.videoRecording}`,
        `OS=${process.platform}`,
        `Node=${process.version}`,
        `Horodatage=${new Date().toISOString()}`,
    ].join('\n');

    const dossierAllure = ENV_CONFIG.paths.allureResults;
    if (!fs.existsSync(dossierAllure)) {
        fs.mkdirSync(dossierAllure, { recursive: true });
    }
    fs.writeFileSync(path.join(dossierAllure, 'environment.properties'), contenu);
}
