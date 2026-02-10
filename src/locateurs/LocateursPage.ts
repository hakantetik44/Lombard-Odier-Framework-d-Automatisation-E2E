/**
 * ============================================
 * Lombard Odier — LocateursPage
 * ============================================
 * Classe unique centralisant TOUS les sélecteurs du site.
 * Utilise des stratégies de repli multiples pour la robustesse.
 *
 * Sections couvertes :
 *   - Page d'accueil (bandeau cookies, navigation, héros, pied de page)
 *   - Page de connexion (formulaire, erreurs, 2FA)
 *   - Tableau de bord (portefeuille, comptes, transactions)
 *   - Analyse des risques (métriques, stress test, conformité, ESG)
 */

import { Page, Locator } from '@playwright/test';

export class LocateursPage {

    // ══════════════════════════════════════════════
    //  BANDEAU DE COOKIES
    // ══════════════════════════════════════════════
    readonly boutonAccepterCookies: Locator;
    readonly boutonRefuserCookies: Locator;
    readonly bandeauCookies: Locator;

    // ══════════════════════════════════════════════
    //  EN-TÊTE & NAVIGATION PRINCIPALE
    // ══════════════════════════════════════════════
    readonly logo: Locator;
    readonly boutonMenu: Locator;
    readonly menuNavigation: Locator;
    readonly boutonConnexion: Locator;
    readonly boutonRecherche: Locator;
    readonly selecteurLangue: Locator;

    // ══════════════════════════════════════════════
    //  LIENS DU MENU
    // ══════════════════════════════════════════════
    readonly lienGestionPatrimoine: Locator;
    readonly lienGestionActifs: Locator;
    readonly lienTechnologie: Locator;
    readonly lienDeveloppementDurable: Locator;
    readonly lienNousDecouvrir: Locator;

    // ══════════════════════════════════════════════
    //  SECTION HÉROS (PAGE D'ACCUEIL)
    // ══════════════════════════════════════════════
    readonly sectionHeros: Locator;
    readonly titreHeros: Locator;
    readonly sousTitreHeros: Locator;

    // ══════════════════════════════════════════════
    //  SECTIONS DE CONTENU
    // ══════════════════════════════════════════════
    readonly sectionExpertise: Locator;
    readonly sectionActualites: Locator;
    readonly cartesActualites: Locator;
    readonly sectionServicesPrives: Locator;

    // ══════════════════════════════════════════════
    //  PIED DE PAGE
    // ══════════════════════════════════════════════
    readonly piedDePage: Locator;
    readonly liensPiedDePage: Locator;
    readonly texteCopyright: Locator;
    readonly liensReseauxSociaux: Locator;
    readonly lienLinkedIn: Locator;
    readonly lienMentionsLegales: Locator;

    // ══════════════════════════════════════════════
    //  FORMULAIRE DE CONNEXION
    // ══════════════════════════════════════════════
    readonly champNomUtilisateur: Locator;
    readonly champMotDePasse: Locator;
    readonly boutonSoumettre: Locator;
    readonly messageErreur: Locator;
    readonly lienMotDePasseOublie: Locator;
    readonly titreConnexion: Locator;

    // ══════════════════════════════════════════════
    //  DOUBLE AUTHENTIFICATION (2FA)
    // ══════════════════════════════════════════════
    readonly champCodeOTP: Locator;
    readonly boutonValiderOTP: Locator;

    // ══════════════════════════════════════════════
    //  TABLEAU DE BORD
    // ══════════════════════════════════════════════
    readonly messageAccueil: Locator;
    readonly nomClient: Locator;
    readonly boutonDeconnexion: Locator;
    readonly valeurTotaleActifs: Locator;
    readonly pourcentagePerformance: Locator;
    readonly devisePortefeuille: Locator;
    readonly sectionAllocationActifs: Locator;
    readonly graphiquePerformance: Locator;
    readonly sectionTransactionsRecentes: Locator;
    readonly lignesTransactions: Locator;
    readonly sectionMarcheVueEnsemble: Locator;

    // ══════════════════════════════════════════════
    //  ACTIONS RAPIDES
    // ══════════════════════════════════════════════
    readonly boutonVirement: Locator;
    readonly boutonInvestissement: Locator;
    readonly boutonContacterConseiller: Locator;

    // ══════════════════════════════════════════════
    //  ANALYSE DES RISQUES
    // ══════════════════════════════════════════════
    readonly scoreRisque: Locator;
    readonly niveauRisque: Locator;
    readonly valeurVolatilite: Locator;
    readonly ratioSharpe: Locator;
    readonly baisseMaximale: Locator;
    readonly valeurARisque: Locator;
    readonly listeDeRoulanteScenario: Locator;
    readonly boutonLancerStressTest: Locator;
    readonly resultatsStressTest: Locator;
    readonly graphiqueStressTest: Locator;
    readonly statutConformite: Locator;
    readonly noteESGGlobale: Locator;
    readonly scoreEnvironnemental: Locator;
    readonly scoreSocial: Locator;
    readonly scoreGouvernance: Locator;

    constructor(page: Page) {

        // ── Bandeau de Cookies ──
        this.boutonAccepterCookies = page.locator('.rounded-link.accept, button:has-text("Accepter"), button:has-text("Accept"), #onetrust-accept-btn-handler').first();
        this.boutonRefuserCookies = page.locator('.rounded-link.reject, button:has-text("Refuser"), button:has-text("Reject")').first();
        this.bandeauCookies = page.locator('#cookie-banner, .cookie-consent, .cookies-overlay, #onetrust-banner-sdk').first();

        // ── En-tête & Navigation ──
        this.logo = page.locator('.header-logo img, .logo img, a.logo, header a[href="/fr/home.html"] img, .site-logo').first();
        this.boutonMenu = page.locator('.burger-menu, .menu-toggle, button[aria-label="Menu"], .navbar-toggler, .header-burger').first();
        this.menuNavigation = page.locator('.main-nav, .navigation-menu, nav.primary-nav, .nav-overlay, .menu-panel').first();
        this.boutonConnexion = page.locator('a[href*="mylo"], a[href*="login"], a:has-text("MyLO"), .login-btn, a:has-text("Connexion"), a:has-text("Se connecter")').first();
        this.boutonRecherche = page.locator('.search-btn, button[aria-label="Search"], .search-toggle, a[href*="search"]').first();
        this.selecteurLangue = page.locator('.language-selector, .lang-switch, .locale-selector').first();

        // ── Liens du Menu ──
        this.lienGestionPatrimoine = page.locator('a:has-text("Gestion de patrimoine"), a:has-text("Wealth management"), a[href*="private-clients"]').first();
        this.lienGestionActifs = page.locator('a:has-text("Gestion d\'actifs"), a:has-text("Asset management"), a[href*="asset-management"]').first();
        this.lienTechnologie = page.locator('a:has-text("Technologie"), a:has-text("Technology"), a[href*="technology"]').first();
        this.lienDeveloppementDurable = page.locator('a:has-text("Développement durable"), a:has-text("Sustainability"), a[href*="sustainability"]').first();
        this.lienNousDecouvrir = page.locator('a:has-text("Nous découvrir"), a:has-text("About us"), a[href*="about"]').first();

        // ── Section Héros ──
        this.sectionHeros = page.locator('.hero-section, .hero-banner, .hero, [class*="hero"], .banner-main').first();
        this.titreHeros = page.locator('.hero-title, .hero h1, .hero-section h1, .banner-title').first();
        this.sousTitreHeros = page.locator('.hero-subtitle, .hero p, .hero-section p, .banner-subtitle').first();

        // ── Sections de Contenu ──
        this.sectionExpertise = page.locator('.expertise-section, section:has-text("expertise"), [class*="expertise"]').first();
        this.sectionActualites = page.locator('.news-section, .insights-section, section:has-text("Actualités"), section:has-text("Insights"), [class*="news"], [class*="insight"]').first();
        this.cartesActualites = page.locator('.news-card, .insight-card, .article-card, [class*="news-item"]');
        this.sectionServicesPrives = page.locator('.private-services, section:has-text("clients privés"), [class*="private"]').first();

        // ── Pied de Page ──
        this.piedDePage = page.locator('footer, .site-footer, .footer-main, [role="contentinfo"]').first();
        this.liensPiedDePage = page.locator('footer a, .footer-links a');
        this.texteCopyright = page.locator('.copyright, footer .legal, footer small, footer p:has-text("©")').first();
        this.liensReseauxSociaux = page.locator('footer .social-links a, footer a[href*="linkedin"], footer a[href*="twitter"], footer a[href*="youtube"]');
        this.lienLinkedIn = page.locator('a[href*="linkedin.com/company/lombard-odier"], footer a[href*="linkedin"]').first();
        this.lienMentionsLegales = page.locator('a:has-text("Mentions légales"), a:has-text("Legal"), a[href*="legal"]').first();

        // ── Formulaire de Connexion ──
        this.champNomUtilisateur = page.locator('#username, input[name="username"], input[type="email"], #email').first();
        this.champMotDePasse = page.locator('#password, input[name="password"], input[type="password"]').first();
        this.boutonSoumettre = page.locator('button[type="submit"], input[type="submit"], button:has-text("Se connecter"), button:has-text("Login")').first();
        this.messageErreur = page.locator('.error-message, .alert-danger, .login-error, [role="alert"], .form-error').first();
        this.lienMotDePasseOublie = page.locator('a:has-text("Mot de passe oublié"), a:has-text("Forgot password"), a[href*="forgot"]').first();
        this.titreConnexion = page.locator('.login-title, h1:has-text("Connexion"), h1:has-text("Login"), .auth-title').first();

        // ── Double Authentification ──
        this.champCodeOTP = page.locator('#otp, input[name="otp"], input[name="code"], #verification-code').first();
        this.boutonValiderOTP = page.locator('button:has-text("Valider"), button:has-text("Verify"), button:has-text("Confirmer")').first();

        // ── Tableau de Bord ──
        this.messageAccueil = page.locator('.welcome-message, .greeting, h1:has-text("Bienvenue"), h1:has-text("Welcome")').first();
        this.nomClient = page.locator('.client-name, .user-name, .profile-name').first();
        this.boutonDeconnexion = page.locator('button:has-text("Déconnexion"), button:has-text("Logout"), a:has-text("Logout"), #logout-btn').first();
        this.valeurTotaleActifs = page.locator('.total-assets, .portfolio-value, .total-value, [class*="total-asset"]').first();
        this.pourcentagePerformance = page.locator('.performance-percentage, .perf-value, [class*="performance"]').first();
        this.devisePortefeuille = page.locator('.currency-label, .portfolio-currency').first();
        this.sectionAllocationActifs = page.locator('.asset-allocation, .allocation-chart, [class*="allocation"]').first();
        this.graphiquePerformance = page.locator('.performance-chart, canvas.performance, [class*="perf-chart"]').first();
        this.sectionTransactionsRecentes = page.locator('.recent-transactions, .transactions-section, [class*="transaction"]').first();
        this.lignesTransactions = page.locator('.transaction-row, .transaction-item, tr.transaction');
        this.sectionMarcheVueEnsemble = page.locator('.market-overview, .market-section, [class*="market"]').first();

        // ── Actions Rapides ──
        this.boutonVirement = page.locator('button:has-text("Virement"), button:has-text("Transfer"), .quick-transfer, [data-action="transfer"]').first();
        this.boutonInvestissement = page.locator('button:has-text("Investir"), button:has-text("Invest"), .quick-invest, [data-action="invest"]').first();
        this.boutonContacterConseiller = page.locator('button:has-text("Contacter"), button:has-text("Contact"), .contact-advisor, [data-action="contact"]').first();

        // ── Analyse des Risques ──
        this.scoreRisque = page.locator('.risk-score, .risk-value, [class*="risk-score"]').first();
        this.niveauRisque = page.locator('.risk-level, .risk-indicator, [class*="risk-level"]').first();
        this.valeurVolatilite = page.locator('.volatility-value, [data-metric="volatility"], [class*="volatility"]').first();
        this.ratioSharpe = page.locator('.sharpe-ratio, [data-metric="sharpe"], [class*="sharpe"]').first();
        this.baisseMaximale = page.locator('.max-drawdown, [data-metric="drawdown"], [class*="drawdown"]').first();
        this.valeurARisque = page.locator('.var-value, [data-metric="var"], [class*="value-at-risk"]').first();
        this.listeDeRoulanteScenario = page.locator('#stress-scenario, select.scenario-select, [data-test="scenario-dropdown"]').first();
        this.boutonLancerStressTest = page.locator('button:has-text("Lancer"), button:has-text("Run"), #run-stress-test').first();
        this.resultatsStressTest = page.locator('.stress-results, .stress-test-results, [class*="stress-result"]').first();
        this.graphiqueStressTest = page.locator('.stress-chart, canvas.stress, [class*="stress-chart"]').first();
        this.statutConformite = page.locator('.compliance-status, .compliance-badge, [class*="compliance"]').first();
        this.noteESGGlobale = page.locator('.esg-rating, .esg-overall, [class*="esg-rating"]').first();
        this.scoreEnvironnemental = page.locator('.env-score, [data-esg="environmental"], [class*="environmental"]').first();
        this.scoreSocial = page.locator('.social-score, [data-esg="social"], [class*="social-score"]').first();
        this.scoreGouvernance = page.locator('.governance-score, [data-esg="governance"], [class*="governance"]').first();
    }
}
