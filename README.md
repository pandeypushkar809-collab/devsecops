🚀 DevSecOps — Secure Cloud-Native Application Platform

End-to-end, security-first DevSecOps project covering application development, CI/CD, SAST, dependency and secret scanning, containerization, Kubernetes, Helm, GitOps, IaC security, runtime security, monitoring, messaging, and real-world troubleshooting.

Project Overview

This repository is a practical DevSecOps and Cloud-Native application platform built around a multi-tier application consisting of:

Frontend

Java / Spring Boot Backend

PostgreSQL Database

The platform progressively introduces security, automation, containerization, Kubernetes orchestration, GitOps, policy enforcement, runtime security, observability, and infrastructure security.

The project is intentionally documented in two states:

✅ Implemented / verified through hands-on work

🔄 Integration / extension stage

What This Project Demonstrates

The project brings together the following lifecycle:

Code
  ↓
Git / GitHub
  ↓
GitHub Actions
  ↓
Build & Test
  ↓
Security Analysis
  ├── Gitleaks
  ├── SonarQube
  ├── OWASP Dependency-Check
  ├── Trivy
  └── Checkov
  ↓
Docker Image
  ↓
Container Registry
  ↓
Kubernetes
  ↓
Helm
  ↓
Kyverno
  ↓
Argo CD
  ↓
Runtime Security
  └── Falco
  ↓
Observability
  ├── Prometheus
  └── Grafana


  High-Level Architecture

                              ┌─────────────────────┐
                              │      Developer      │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │     Git / GitHub    │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │   GitHub Actions    │
                              │                     │
                              │ Maven Build / Test  │
                              │ Gitleaks            │
                              │ SonarQube            │
                              │ Dependency-Check     │
                              │ Trivy               │
                              │ Checkov              │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │     Docker Image     │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │  Container Registry  │
                              └──────────┬──────────┘
                                         │
                                         ▼
               ┌──────────────────────────────────────────────────┐
               │                  Kubernetes / Kind               │
               │                                                  │
               │   ┌───────────┐   ┌───────────┐   ┌──────────┐ │
               │   │ Frontend  │   │  Backend  │   │PostgreSQL│ │
               │   └───────────┘   └─────┬─────┘   └──────────┘ │
               │                         │                       │
               │                     Services                    │
               │                                                  │
               │   Helm  →  Kyverno  →  Argo CD                  │
               └──────────────────────┬───────────────────────────┘
                                      │
                       ┌──────────────┴──────────────┐
                       ▼                             ▼
                ┌─────────────┐              ┌─────────────┐
                │    Falco    │              │ Prometheus  │
                │ Runtime Sec │              │   Metrics   │
                └─────────────┘              └──────┬──────┘
                                                    │
                                                    ▼
                                             ┌─────────────┐
                                             │   Grafana   │
                                             │ Dashboards  │
                                             └─────────────┘

                      
                       Terraform + Checkov → IaC Security

The architecture represents the complete project direction. Implementation status for each component is shown below.

Technology Stack

Layer

Technologies

Source Control

Git, GitHub

Application

Java, Spring Boot

Build & Test

Maven, Maven Wrapper

Database

PostgreSQL

Containerization

Docker, Docker Compose

CI/CD

GitHub Actions

Secret Scanning

Gitleaks

Code Quality / SAST

JaCoCo

SonarQube

Dependency Security

OWASP Dependency-Check

Container Security

Trivy

IaC Security

Terraform, Checkov

Kubernetes

Kubernetes, Kind, kubectl

Packaging

Helm

Policy as Code

Kyverno

GitOps

Argo CD

Runtime Security

Falco

Monitoring

Prometheus, Grafana

Local Cloud Practice

Troubleshooting

curl, lsof, systemctl, journalctl, grep, sed, awk

Jenkins is intentionally not listed because Jenkins was not used in this project.


Repository Structure

devsecops/
│
├── .github/
│   └── workflows/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Docker-related files
│
├── frontend/
│
├── k8s/
│   ├── backend/
│   ├── postgres/
│   └── cluster/configuration files
│
├── terraform/
│
├── student-app/
│
├── docs/
│   └── images/
│       ├── dependency-check.png
│       ├── trivy.png
│       ├── sonarqube.png
│       ├── gitleaks.png
│       └── grafana.png
│
├── README.md
└── supporting configuration files

Generated directories such as .git, target, node_modules, .idea, .vscode, and Python caches are intentionally excluded from the documented project tree.


pplication Layer

The backend is implemented using Java + Spring Boot, with Maven as the build system and PostgreSQL as the relational database.

Typical lifecycle:

Source Code
    ↓
Maven
    ↓
Compile
    ↓
Unit Tests
    ↓
Package
    ↓
Docker Image
    ↓
Kubernetes Deployment

🐘 PostgreSQL

PostgreSQL is used as the application's database.

The Kubernetes implementation includes:

PostgreSQL Secret

PostgreSQL StatefulSet

PostgreSQL Service

PersistentVolumeClaim

Dedicated devsecops namespace

Database verification using psql

Database persistence in the Docker Compose environment uses:

postgres_data:/var/lib/postgresql/data

The project also included creating and verifying the studentdb database inside the PostgreSQL workload.

🐳 Docker & Docker Compose

Docker is used for:

Application containerization

Image creation and inspection

Container troubleshooting

Local development

Loading locally built images into Kind

For the Kubernetes practice environment:

Docker Image
     ↓
kind load docker-image
     ↓
Kind Nodes
     ↓
Kubernetes Pods

Docker Compose is used for local multi-container workflows and database persistence.

🔄 CI/CD — GitHub Actions

GitHub Actions is the project's CI/CD platform.

Target workflow:

Git Push / Pull Request
        ↓
GitHub Actions
        ↓
Maven Test
        ↓
Maven Build / Package
        ↓
Gitleaks
        ↓
SonarQube
        ↓
OWASP Dependency-Check
        ↓
Trivy
        ↓
Checkov
        ↓
Docker Build
        ↓
Registry
        ↓
Kubernetes / GitOps

The pipeline is developed incrementally so that each quality and security stage can be tested independently before becoming a deployment gate.

🔐 DevSecOps Security

Security is integrated throughout the delivery lifecycle rather than being treated as a final deployment step.

Security Controls

Tool

Role

Evidence / Status

Gitleaks

Detect committed secrets

✅ Hands-on scan

SonarQube

Static analysis and code quality

✅ Analysis performed

OWASP Dependency-Check

Open-source dependency vulnerability analysis

✅ Report generated

Trivy

Vulnerability scanning

✅ Hands-on scan

Checkov

Terraform / IaC security

✅ Hands-on scan

Kyverno

Kubernetes policy enforcement

🔄 Integration stage

Falco

Runtime threat detection

🔄 Integration stage

🕵️ Gitleaks — Secret Detection

Gitleaks was executed against the backend repository.

The recorded scan completed successfully with:

2 commits scanned
No leaks found

This demonstrates a shift-left control for detecting accidentally committed credentials, tokens, and other secrets.

Example:

gitleaks detect
gitleaks detect --log-opts="--all"

Evidence



📦 OWASP Dependency-Check

OWASP Dependency-Check was used against the backend Maven project to identify known vulnerabilities in third-party dependencies.

The generated report shows vulnerable dependencies including packages such as:

log4j-api

tomcat-embed-core

postgresql

The report also provides severity, CVE counts, confidence, and evidence information.

Why it matters

Dependency security is important because vulnerabilities can enter the application through libraries even when the application source code itself looks secure.

Evidence



🔎 Trivy — Container Vulnerability Scanning

Trivy was used to scan the application container image for known vulnerabilities.

The scan output displays:

Vulnerability IDs

Severity

Installed versions

Fixed versions

Vulnerability descriptions / titles

This forms the container-security stage of the DevSecOps pipeline.

Evidence



🧪 SonarQube — Code Quality & Static Analysis

The backend was analyzed using SonarQube.

The captured project analysis shows:

Security: 2 open issues

Reliability: 0 open issues

Maintainability: 1 open issue

Coverage: 73.8%

Duplications: 0.0%

Security Hotspots: 0

This evidence demonstrates that SonarQube is actively analyzing the backend rather than being listed only as a planned tool.

Evidence



The README reports the analysis snapshot visible in the captured evidence; it should not be interpreted as a permanently fixed project score because SonarQube results change as the code changes.

🏗️ Terraform + Checkov

Terraform is used for Infrastructure as Code practice.

Validation workflow:

Terraform Configuration
        ↓
terraform fmt
        ↓
terraform validate
        ↓
Checkov
        ↓
Security Findings

Commands used:

terraform fmt
terraform validate
checkov -d .

Checkov was also installed in an isolated Python virtual environment to avoid modifying the system Python environment.

☸️ Kubernetes

Kubernetes is a core component of the project.

A local multi-node Kind cluster was used for application deployment, networking, storage, troubleshooting, and security experimentation.

The working environment includes:

Kind Cluster
├── Control Plane
├── Worker
├── Worker 2
└── Worker 3

Kubernetes resources practiced/implemented include:

Backend Deployment

Backend Service

Frontend Deployment

Frontend Service

PostgreSQL StatefulSet

PostgreSQL Service

ConfigMaps

Secrets

PersistentVolumeClaims

Namespaces

Pod health/status inspection

Logs

Endpoint validation

🧩 Kubernetes Application Flow

                    Kubernetes Cluster
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      Frontend           Backend        PostgreSQL
          │                │                │
          │                └──────┬─────────┘
          │                       │
          └────────── Services ───┘

Backend-to-database troubleshooting included inspecting:

JDBC URL

datasource configuration

PostgreSQL Service

Kubernetes Secrets

ConfigMaps

endpoints

backend logs

📦 Helm

Helm is used to package and template Kubernetes applications.

Typical operations:

helm lint .
helm template student-app .
helm list
helm status <release>
helm install <release> .
helm upgrade <release> .
helm uninstall <release>

Helm provides:

Reusable templates

Parameterized deployments

Versioned releases

Repeatable Kubernetes packaging

🔄 GitOps — Argo CD

Argo CD is the GitOps layer of the architecture.

Conceptually:

Git Repository
      ↓
   Argo CD
      ↓
Kubernetes Cluster

Argo CD resources were inspected using:

kubectl get ns argocd
kubectl get pods -n argocd
kubectl get svc -n argocd

Local UI access was practiced through:

kubectl port-forward svc/argocd-server -n argocd 8080:443

Troubleshooting included inspecting:

server logs

previous container termination

pod events

resource requests and limits

service ports

local port forwarding

🛡️ Kyverno — Policy as Code

Kyverno is included as the Kubernetes policy enforcement layer.

Target controls include policies around:

Required labels

Approved image registries

Security context

Resource requirements

Deployment standards

Architecture:

Kubernetes Request
        ↓
      Kyverno
        ↓
Policy Validation
        ↓
 Allow / Reject

Status: 🔄 Integration stage.

🚨 Falco — Runtime Security

Falco is the runtime-security layer.

Unlike Trivy and Dependency-Check, which focus on vulnerabilities before/during delivery, Falco focuses on suspicious behavior while workloads are running.

Example:

Container / Kubernetes Runtime
            ↓
          Falco
            ↓
     Security Event

Potential runtime signals include:

unexpected process execution

suspicious shell activity

unusual file access

privilege-related behavior

Status: 🔄 Integration stage.

📊 Prometheus & Grafana — Observability

Prometheus and Grafana provide the monitoring and visualization layer.

Application / Kubernetes
          ↓
      Prometheus
          ↓
        Grafana

The captured Grafana dashboard demonstrates active monitoring data including:

RPS

request latency

HTTP response categories

build information

dashboard metrics

Evidence



Monitoring goals include:

Cluster visibility

Pod health

Application metrics

Resource utilization

Request behavior

Dashboard-based operational visibility

🐇 RabbitMQ — Messaging

RabbitMQ is used as the messaging component for asynchronous and event-driven communication practice.

Conceptually:

Producer
   ↓
RabbitMQ
   ↓
Consumer

A dedicated Kubernetes namespace was created during testing:

kubectl create namespace rabbitmq

Credentials are intentionally excluded from documentation and should be handled through Kubernetes Secrets or an external secret-management solution.

Status: 🔄 Integration stage.

🧰 Real-World Troubleshooting

A major objective of this project is not only making deployments work, but learning how to diagnose failures.

Kubernetes

Examples:

kubectl get pods -A
kubectl describe pod <pod>
kubectl logs <pod>
kubectl logs <pod> --previous
kubectl get endpoints <service>
kubectl rollout status deployment/<deployment>

Kind / Docker

kind get nodes --name devsecops-cluster
docker ps
docker images
docker info
docker exec <container> crictl images

Linux / Systemd

systemctl status docker --no-pager
systemctl show docker --property=LimitNOFILE
journalctl -u kubelet --no-pager -n 100

Network / Ports

curl -I https://github.com
lsof -i :3000

⚙️ Docker nofile / Kubelet Troubleshooting

The Kind environment required investigation of file-descriptor and system limits.

Checks included:

ulimit -n
cat /proc/sys/fs/inotify/max_user_watches
cat /proc/sys/fs/file-max
cat /proc/sys/fs/inotify/max_user_instances

Docker daemon limits were inspected using:

docker info | grep -i ulimit
systemctl show docker --property=LimitNOFILE
systemctl show docker --property=LimitNOFILESoft

Temporary container tests were also performed:

docker run --rm alpine sh -c 'ulimit -n'
docker run --rm --ulimit nofile=65536:65536 alpine sh -c 'ulimit -n'

This troubleshooting work provided practical experience with:

Docker daemon limits

file descriptors

inotify limits

kubelet health

container runtime diagnostics

🧪 Important Troubleshooting Scenarios

1. Kind / Kubelet Health

Investigated:

kubelet status

kubelet logs

Docker service configuration

nofile limits

inotify limits

container runtime images

2. Kubernetes Pod Startup

Used:

kubectl describe pod <pod>
kubectl logs <pod>
kubectl get pods -o wide

to distinguish scheduling, image-pull, container creation, and runtime issues.

3. Backend → PostgreSQL Connectivity

Validated:

Backend configuration
        ↓
Kubernetes Secret / ConfigMap
        ↓
PostgreSQL Service
        ↓
Endpoints
        ↓
PostgreSQL Pod

4. Argo CD

Investigated:

server pod status

previous termination state

events

resource limits

service exposure

port forwarding

5. RabbitMQ / Kubernetes API

A Kubernetes API EOF error was encountered while creating a Secret. Instead of assuming the Secret manifest was the problem, cluster readiness, control-plane logs, and kubelet state were investigated.

📸 Security & Monitoring Evidence

Gitleaks



OWASP Dependency-Check



Trivy



SonarQube



Grafana



📈 Implementation Status

Component

Status

Java / Spring Boot

✅ Implemented

Maven

✅ Implemented

PostgreSQL

✅ Implemented

Docker

✅ Implemented / Practiced

Docker Compose

✅ Implemented / Practiced

Git / GitHub

✅ Implemented

GitHub Actions

✅ Implemented

Terraform

✅ Practiced

Checkov

✅ Practiced

Kind

✅ Implemented / Practiced

Kubernetes

✅ Implemented / Practiced

Backend Deployment

✅ Implemented

Frontend Deployment

✅ Implemented / Practiced

PostgreSQL StatefulSet

✅ Implemented

ConfigMaps / Secrets / PVCs

✅ Implemented

Helm

✅ Implemented / Integration Stage

Gitleaks

✅ Hands-on Scan

OWASP Dependency-Check

✅ Report Generated

Trivy

✅ Hands-on Scan

SonarQube

✅ Analysis Performed

Kyverno

🔄 Integration Stage

Argo CD

🔄 Integration / Troubleshooting Stage

Prometheus

🔄 Monitoring Stage

Grafana

✅ Dashboard Evidence

Falco

🔄 Integration Stage

RabbitMQ

🔄 Integration Stage

Floci

🔄 Supporting / Local Cloud Stage

🗺️ Project Roadmap

Spring Boot
    ↓
Maven
    ↓
PostgreSQL
    ↓
Docker / Docker Compose
    ↓
Git / GitHub
    ↓
GitHub Actions
    ↓
Maven Test / Build
    ↓
Gitleaks
    ↓
SonarQube
    ↓
OWASP Dependency-Check
    ↓
Trivy
    ↓
Checkov
    ↓
Docker Image
    ↓
Container Registry
    ↓
Kubernetes
    ↓
Helm
    ↓
Kyverno
    ↓
Argo CD
    ↓
Falco
    ↓
Prometheus + Grafana
    ↓
RabbitMQ
    ↓
Continuous Improvement

🔒 Security & Secret Handling

Never commit:

Database passwords

RabbitMQ credentials

API tokens

GitHub tokens

Cloud credentials

Private keys

.env files containing secrets

Use:

Kubernetes Secrets

GitHub Actions Secrets

External secret-management systems where appropriate

Least-privilege credentials

Actual secret values are intentionally excluded from this repository documentation.

🧹 Git Repository Hygiene

Before pushing changes:

git status
git diff
git branch -a -vv
git log --oneline --decorate -10

Recommended workflow:

Change
  ↓
Test
  ↓
Security Check
  ↓
git status
  ↓
Commit
  ↓
Push
  ↓
Verify GitHub Actions

Be especially careful with:

git reset --hard
git push --force
git branch -D <branch>
kind delete cluster --name <cluster>
kubectl delete <resource>
docker compose down -v

These can be destructive.

📚 Command Reference

This repository also maintains a consolidated command reference covering the actual commands used during development, verification, troubleshooting, and cleanup.

Main command families include:

Git / GitHub

Maven / Java

Docker

Docker Compose

Kubernetes / kubectl

Kubernetes Secrets / ConfigMaps

Port Forwarding

Argo CD troubleshooting

Helm

PostgreSQL / psql

Terraform / Checkov

Linux / systemd

Network / connectivity

Kind / Docker runtime troubleshooting

The command reference documents hands-on activity; a command appearing here does not automatically mean that every related production feature is fully implemented.

💡 Key DevSecOps Principles Demonstrated

Shift Left

Find security and quality issues as early as possible.

Security as Code

Use automated tools such as Gitleaks, SonarQube, Dependency-Check, Trivy, and Checkov.

Infrastructure as Code

Use Terraform to represent infrastructure in version-controlled configuration.

Containerized Delivery

Package the application into immutable, versioned Docker images.

Kubernetes Orchestration

Deploy and operate workloads using Kubernetes.

Policy as Code

Use Kyverno to enforce Kubernetes standards.

GitOps

Use Argo CD to manage the desired application state from Git.

Runtime Security

Use Falco to detect suspicious runtime behavior.

Observability

Use Prometheus and Grafana to understand application and infrastructure health.

🎓 What I Learned From This Project

This project provided hands-on practice with:

Git and GitHub workflows

CI/CD automation

Java / Spring Boot builds

Maven

Docker and Docker Compose

PostgreSQL

Kubernetes orchestration

Kind

Kubernetes networking and services

Persistent storage

Helm

GitOps concepts

Security scanning

SAST and dependency analysis

Container vulnerability management

Infrastructure as Code

Terraform validation

Checkov

Runtime-security concepts

Prometheus and Grafana monitoring

RabbitMQ messaging

Production-style troubleshooting

The project focuses on connecting these technologies into one delivery and operations workflow, rather than learning each tool in isolation.

👨‍💻 Author

Pushkar Pandey

DevOps / Cloud Engineering Learner

GitHub:
https://github.com/pandeypushkar809-collab

Project Repository:
https://github.com/pandeypushkar809-collab/devsecops

⭐ Project Vision

The final goal is to evolve this repository into a secure, automated, observable cloud-native delivery platform:

CODE
  ↓
BUILD
  ↓
TEST
  ↓
SCAN
  ↓
SECURE
  ↓
PACKAGE
  ↓
DEPLOY
  ↓
POLICY
  ↓
GITOPS
  ↓
MONITOR
  ↓
PROTECT

Build securely. Deploy automatically. Operate reliably.



  
