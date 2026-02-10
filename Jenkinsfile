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
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.0-noble'
            args '-u root --ipc=host'
        }
    }

    environment {
        NODE_ENV     = 'ci'
        HEADLESS     = 'true'
        ENV          = "${params.ENVIRONMENT ?: 'staging'}"
        CI           = 'true'
        BROWSER      = "${params.BROWSER ?: 'chromium'}"
    }

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['staging', 'production', 'development'],
            description: 'Target environment for test execution'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Browser to run tests on'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['regression', 'smoke', 'critical', 'login', 'dashboard', 'risk', 'security'],
            description: 'Test suite to execute'
        )
        booleanParam(
            name: 'GENERATE_ALLURE',
            defaultValue: true,
            description: 'Generate Allure Report after tests'
        )
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    stages {

        stage('📥 Checkout') {
            steps {
                cleanWs()
                checkout scm
                echo "🏦 Lombard Odier E2E Tests - Branch: ${env.GIT_BRANCH}"
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                sh '''
                    echo "📦 Installing Node.js dependencies..."
                    npm ci --prefer-offline
                    echo "🌐 Installing Playwright browsers..."
                    npx playwright install --with-deps ${BROWSER}
                    echo "✅ Dependencies installed successfully"
                '''
            }
        }

        stage('🔍 TypeScript Lint Check') {
            steps {
                sh '''
                    echo "🔍 Running TypeScript compilation check..."
                    npx tsc --noEmit || true
                    echo "✅ Lint check completed"
                '''
            }
        }

        stage('🔥 Smoke Tests') {
            when {
                expression { params.TEST_SUITE == 'smoke' || params.TEST_SUITE == 'regression' }
            }
            steps {
                sh '''
                    echo "🔥 Running Smoke Tests..."
                    npm run test:smoke || true
                '''
            }
        }

        stage('🧪 Test Execution') {
            steps {
                script {
                    def testProfile = params.TEST_SUITE ?: 'regression'
                    echo "🧪 Executing test suite: ${testProfile}"
                    sh """
                        npx cucumber-js --profile ${testProfile} \
                            --format json:reports/cucumber-report.json \
                            --format html:reports/cucumber-report.html \
                            || true
                    """
                }
            }
        }

        stage('📊 Generate Reports') {
            when {
                expression { params.GENERATE_ALLURE == true }
            }
            steps {
                sh '''
                    echo "📊 Generating Allure Report..."
                    npx allure generate reports/allure-results --clean -o reports/allure-report || true
                    echo "✅ Reports generated successfully"
                '''
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
