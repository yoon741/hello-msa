pipeline {
    agent any
    
    environment {
        DOCKER_IMEAGE_OWNER = 'yoon741'
        DOCEKR_IMEAGE_TAG = 'v0'
        DOCKER_TOKEN = credentials('dockerhub')
    }
    
    stages {
        stage('clone from SCM') {
            steps {
                sh '''
                rm -rf hello-msa
                git clone https://github.com/yoon741/hello-msa.git
                '''
            }
        }
        
        stage('Docker Image Building') {
            steps {
                sh'''
                cd hello-msa
                docker build -t ${DOCKER_IMEAGE_OWNER}/msa-frontend:${DOCEKR_IMEAGE_TAG} ./msa-frontend
                docker build -t ${DOCKER_IMEAGE_OWNER}/msa-user-service:${DOCEKR_IMEAGE_TAG} ./msa-user-service
                docker build -t ${DOCKER_IMEAGE_OWNER}/msa-product-service:${DOCEKR_IMEAGE_TAG} ./msa-product-service
                '''
            }
        }
        
        stage('Docker Login') {
            steps {
                sh '''
                echo ${DOCKER_TOKEN_PSW} | docker login -u ${DOCKER_TOKEN_USR} --password-stdin
                '''
            }
        }
        
        stage('Docker Image pushing') {
            steps {
                sh'''
                docker push ${DOCKER_IMEAGE_OWNER}/msa-frontend:${DOCEKR_IMEAGE_TAG}
                docker push ${DOCKER_IMEAGE_OWNER}/msa-user-service:${DOCEKR_IMEAGE_TAG}
                docker push ${DOCKER_IMEAGE_OWNER}/msa-product-service:${DOCEKR_IMEAGE_TAG}
                '''
            }
        }
        
        stage('Docker Logout') {
            steps {
                sh '''
                docker logout
                '''
            }
        }
    }
}
