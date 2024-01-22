# Chat Room Application

## Overview

This is a simple chat room application built with React and TypeScript for the frontend, Go for the backend, WebSockets for real-time communication, PostgreSQL for the database, and Docker and Minikube for local Kubernetes deployment.

## Prerequisites

- Docker
- Minikube

## Deployment Instructions

1. Build the Docker images:

docker build -t new-chat-frontend -f Dockerfile.frontend .
docker build -t new-chat-backend -f Dockerfile.backend .

2. Start the Minikube cluster:

minikube start

3. Apply the Kubernetes configuration:

kubectl apply -f k8s.yaml

4. Access the application at `http://localhost:3000`.

## Application Usage

1. Sign up for a new account with a username and password.
2. Log in with your username and password.
3. After logging in, you can send messages and see history messages from other users.
4. You can upvote or downvote each message.