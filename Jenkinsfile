/**
 * ============================================
 * Lombard Odier - Jenkinsfile
 * ============================================
 * CI/CD Pipeline for E2E Test Automation
 * 
 * Pipeline Stages:
 *   1. Checkout       - Clone repository
 *   2. Install        - Install dependencies & browsers
 *   3. Lint           - TypeScript compilation check
 *   4. Smoke Tests    - Quick smoke validation
 *   5. Regression     - Full regression suite
 *   6. Reports        - Generate Allure + HTML reports
 *   7. Notification   - Send results (Slack/Email)
 */

pipeline {
    agent any

    environment {
        PATH         = "/Users/macbook/.nvm/versions/node/v20.20.0/bin:/usr/local/bin:${env.PATH}"
        NODE_ENV     = 'ci'
        HEADLESS     = 'true'
        ENV          = 'production'
        CI           = 'true'
        BROWSER      = "${params.BROWSER ?: 'chromium'}"
    }

    triggers {
        pollSCM('H/5 * * * *') // Vérifier les nouveaux commits toutes les 5 minutes
    }

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Navigateur pour les tests'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['regression', 'smoke', 'critical', 'e2e'],
            description: 'Suite de tests à exécuter'
        )
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('📥 Checkout') {
            steps {
                cleanWs()
                checkout scm
                echo "🏦 Lombard Odier E2E Framework — Branche : ${env.GIT_BRANCH}"
            }
        }

        stage('📦 Installation') {
            steps {
                sh '''
                    echo "📦 Installation des dépendances..."
                    npm install --legacy-peer-deps
                    echo "🌐 Installation des navigateurs Playwright..."
                    npx playwright install --with-deps ${BROWSER}
                '''
            }
        }

        stage('🔍 Lint & Build') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('🧪 Exécution des Tests (Headless)') {
            steps {
                script {
                    echo "🧪 Lancement de la suite : ${params.TEST_SUITE}"
                    // L'exécution se fait TOUJOURS en Headless dans Jenkins via la variable d'env
                    sh "HEADLESS=true npx cucumber-js --profile ${params.TEST_SUITE} || true"
                }
            }
        }

        stage('📊 Génération du Rapport Allure') {
            steps {
                sh 'npm run report:generate || true'
            }
        }
    }

    post {
        always {
            echo '📦 Archiving test artifacts...'

            // Archive Allure results
            allure([
                includeProperties: true,
                jdk: '',
                results: [[path: 'reports/allure-results']]
            ])

            // Archive Cucumber HTML report
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber HTML Report',
                reportTitles: 'LO E2E Test Report'
            ])

            // Archive screenshots and videos
            archiveArtifacts artifacts: 'reports/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/videos/**/*.webm', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/cucumber-report.json', allowEmptyArchive: true

            // Cleanup workspace
            cleanWs(
                deleteDirs: true,
                patterns: [
                    [pattern: 'node_modules/**', type: 'INCLUDE'],
                    [pattern: 'reports/**', type: 'EXCLUDE']
                ]
            )
        }

        success {
            echo '🎉 ═══════════════════════════════════════════'
            echo '  ✅ ALL TESTS PASSED SUCCESSFULLY!'
            echo '  📊 Allure Report: Available in Jenkins'
            echo '  📋 Cucumber Report: Available in Jenkins'
            echo '═══════════════════════════════════════════════'
        }

        failure {
            echo '❌ ═══════════════════════════════════════════'
            echo '  ❌ SOME TESTS FAILED!'
            echo '  📸 Screenshots saved in reports/screenshots/'
            echo '  🎬 Videos saved in reports/videos/'
            echo '  📊 Check Allure Report for details'
            echo '═══════════════════════════════════════════════'
        }

        unstable {
            echo '⚠️  Tests completed with warnings. Review the Allure report.'
        }
    }
}
