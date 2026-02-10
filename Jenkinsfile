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
        pollSCM('H/5 * * * *')
    }

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Navigateur'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['regression', 'smoke', 'critical', 'e2e'],
            description: 'Suite'
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
        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Installation') {
            steps {
                sh '''
                    npm install --legacy-peer-deps
                    npx playwright install --with-deps ${BROWSER}
                '''
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Tests') {
            steps {
                script {
                    sh "HEADLESS=true npx cucumber-js --profile ${params.TEST_SUITE} || true"
                }
            }
        }

        stage('Reports') {
            steps {
                sh 'npm run report:generate || true'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: true,
                jdk: '',
                results: [[path: 'reports/allure-results']]
            ])

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber Report',
                reportTitles: 'Test Report'
            ])

            archiveArtifacts artifacts: 'reports/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/videos/**/*.webm', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/cucumber-report.json', allowEmptyArchive: true

            cleanWs(
                deleteDirs: true,
                patterns: [
                    [pattern: 'node_modules/**', type: 'INCLUDE'],
                    [pattern: 'reports/**', type: 'EXCLUDE']
                ]
            )
        }
    }
}
