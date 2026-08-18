Project at a Glance

This project demonstrates how a modern application can move from source code to a monitored Kubernetes workload while security checks are placed throughout the lifecycle.

The goal is not simply to deploy an application. The goal is to demonstrate how development, security, operations, automation, and monitoring work together.

End-to-End DevSecOps Lifecycle

                     ┌───────────────┐
                     │   Developer   │
                     └───────┬───────┘
                             │
                             ▼
                     ┌───────────────┐
                     │ Git / GitHub  │
                     └───────┬───────┘
                             │
                             ▼
                   ┌──────────────────┐
                   │ GitHub Actions   │
                   └────────┬─────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   Maven/Test          Gitleaks            SonarQube
        │                   │                   │
        ▼                   ▼                   ▼
     JaCoCo         Secret Security       Code Quality
        │
        └───────────────────┬───────────────────┘
                            ▼
                   Dependency-Check
                            │
                            ▼
                          Trivy
                            │
                            ▼
                     Docker Image
                            │
                            ▼
                   Container Registry
                            │
                            ▼
                        Terraform
                            │
                            ▼
                     Kind / Kubernetes
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
             Frontend    Backend    PostgreSQL
                │           │           │
                └───────────┼───────────┘
                            ▼
                          Helm
                            │
                          Kyverno
                            │
                          Argo CD
                            │
                            ▼
                     Running Workload
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
            Falco       Prometheus      Grafana
              │             │             │
              ▼             └──────┬──────┘
        Runtime Alerts              │
                                    ▼
                              Observability 
Category

Tool / Technology

Purpose

Application

Java / Spring Boot

Backend application

Build

Maven

Build, dependencies and test execution

Version Control

Git

Source control

Repository

GitHub

Source-code hosting

CI

GitHub Actions

Automated CI workflow

Containerization

Docker

Build application containers

Local Containers

Docker Compose

Run application + database locally

Database

PostgreSQL

Persistent relational database

Code Coverage

JaCoCo

Measure test coverage

Secret Security

Gitleaks

Detect secrets in source/history

Code Quality

SonarQube

Static analysis and quality metrics

Dependency Security

OWASP Dependency-Check

Detect vulnerable dependencies

Image Security

Trivy

Scan container images/filesystems

IaC

Terraform

Infrastructure provisioning

IaC Security

Checkov

Scan Infrastructure-as-Code

Kubernetes

Kubernetes

Container orchestration

Local Kubernetes

Kind

Local Kubernetes cluster

Kubernetes CLI

kubectl

Manage Kubernetes resources

Packaging

Helm

Package/deploy Kubernetes applications

Policy

Kyverno

Kubernetes policy enforcement

GitOps

Argo CD

Git-based continuous delivery

Runtime Security

Falco

Detect suspicious runtime activity

Metrics

Prometheus

Collect application/platform metrics

Visualization

Grafana

Monitoring dashboards

✌️✌️Proof / Evidence — Screenshots of metrics, dashboards, targets, and application health 🤞🤞 

1 - <img width="1019" height="498" alt="1" src="https://github.com/user-attachments/assets/8b4ae349-5c28-4558-a294-62627296e07f" />

2 - <img width="629" height="671" alt="2" src="https://github.com/user-attachments/assets/eab4d2e9-c20e-41c7-a6a9-fee3e1230de3" />

3 - <img width="906" height="661" alt="4" src="https://github.com/user-attachments/assets/137d22cb-fc2a-4347-9afc-e83ddb4ffc3e" />

4 - <img width="1325" height="599" alt="WhatsApp Image 2026-08-17 at 8 11 58 PM" src="https://github.com/user-attachments/assets/8fbf3b50-524c-4155-9b7d-7c68902e9f39" />

5 - <img width="1325" height="599" alt="WhatsApp Image 2026-08-17 at 8 11 58 PM" src="https://github.com/user-attachments/assets/1486d877-bec0-4573-af2a-9516329ba65a" />

6 - <img width="502" height="289" alt="Screenshot 2026-08-06 135507" src="https://github.com/user-attachments/assets/024611ba-ac40-49a0-8644-5ea2b3bcb074" />

 Project Focus

DevSecOps | CI/CD | Docker | Kubernetes | GitOps | Infrastructure as Code | Cloud-Native Security | Observability

Built as a practical hands-on project to understand how application delivery, security automation, Kubernetes operations, GitOps, runtime security, and monitoring fit together into one lifecycle

By Pushkar Pandey 





