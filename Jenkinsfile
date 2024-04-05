@Library(['piper-lib', 'piper-lib-os']) _

pipeline {
  agent any

  stages {
    stage('Setup') {
      steps {
        checkout scm
        setupPipelineEnvironment script: this
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
          kanikoExecute(
            script: this,
            containerImageName: 'gospodinstoianov/node-sample',
            containerImageTag: 'latest',
            containerRegistryUrl: 'https://registry.hub.docker.com/v2',
            containerRegistryUser: 'gospodinstoianov',
            containerRegistryPassword: "${dockerhubpwd}"
          )
        }
      }
    }

    stage('Deploy to Cloud Foundry') {
      steps {
        withCredentials([string(credentialsId: 'cf-pwd', variable: 'cfpwd'), string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
          cloudFoundryDeploy(
            script: this,
            username: "ivan.stoianov@sap.com",
            password: "${cfpwd}",
            dockerEnvVars: [CF_DOCKER_PASSWORD: "${dockerhubpwd}"],
            deployTool: 'cf_native',
            apiEndpoint: 'https://api.cf.eu11.hana.ondemand.com',
            org: 'cf-uis-public-ga-live_user-flows-role-based-y04fnnlu',
            space: 'MySpace 2',
            manifest: 'manifest.yml'
          )
        }
      }
    }
  }
}
