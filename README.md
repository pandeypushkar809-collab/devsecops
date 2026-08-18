<img width="1983" height="793" alt="ChatGPT Image Jul 18, 2026, 10_53_29 AM" src="https://github.com/user-attachments/assets/fd4f49f9-a1aa-41a8-8d73-561bc697a980" />DevSecOps — Secure Cloud-Native Application Platform

> An industry-oriented DevSecOps project demonstrating application development, CI/CD automation, security scanning, containerization, Kubernetes orchestration, Helm, GitOps, runtime security, observability, infrastructure security, and troubleshooting.

##  Project Overview

This project is built as a practical end-to-end DevSecOps platform around a backend application, PostgreSQL, frontend services, Docker, Kubernetes, and a security-focused delivery workflow.

The project has been developed incrementally through real implementation and troubleshooting. The repository intentionally distinguishes between components that have been implemented/verified and components that are still being developed.

### Main goals

- Automate build and test workflows
- Integrate security into CI/CD
- Detect secrets and vulnerabilities early
- Containerize application workloads
- Deploy backend, frontend, and PostgreSQL on Kubernetes
- Manage Kubernetes applications with Helm
- Apply Kubernetes security policies
- Use GitOps with Argo CD
- Add runtime security with Falco
- Monitor workloads with Prometheus and Grafana
- Validate Terraform/IaC with Terraform and Checkov
- Practice production-style troubleshooting and operational commands

---

##  High-Level Architecture

```text
Developer
   │
   ▼
Git / GitHub
   │
   ▼
GitHub Actions
   │
   ├── Maven Build / Test
   ├── Gitleaks
   ├── SonarQube
   ├── Trivy
   └── Security Gates
   │
   ▼
Docker Images
   │
   ▼
Container Registry
   │
   ▼
Kubernetes / Kind
   │
   ├── Frontend
   ├── Backend
   └── PostgreSQL
   │
   ├── Helm
   ├── Kyverno
   └── Argo CD
   │
   ├── Falco
   ├── Prometheus
   └── Grafana
   │
   ▼
Observability + Runtime Security
```

> The diagram represents the overall project direction. Individual components are marked by implementation status below.

---

#  Technology Stack

| Category | Technologies |
|---|---|
| Source Control | Git, GitHub |
| Application | Java, Spring Boot |
| Build | Maven / Maven Wrapper |
| Database | PostgreSQL |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Security | Trivy, Gitleaks, SonarQube, Checkov |
| IaC | Terraform |
| Kubernetes | Kubernetes, Kind, kubectl |
| Packaging | Helm |
| Policy | Kyverno |
| GitOps | Argo CD |
| Runtime Security | Falco |
| Monitoring | Prometheus, Grafana |
| Messaging | RabbitMQ |
| Supporting/Local Cloud |
| Troubleshooting | curl, lsof, systemctl, journalctl, grep, sed, awk |

**Jenkins is intentionally not listed because Jenkins was not used in this project.**

---

# Repository Structure

The repository has been inspected using tree/find-based commands during development. A representative structure is:

```text
devsecops/
├── .github/
│   └── workflows/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Docker-related files
├── frontend/
├── k8s/
│   ├── backend/
│   ├── postgres/
│   └── cluster/configuration files
├── terraform/
├── student-app/
├── README.md
└── supporting configuration files
```

Generated build/dependency directories such as `.git`, `target`, `node_modules`, `.idea`, `.vscode`, and Python cache directories were excluded when inspecting the project tree.

---

# Application Layer

The project uses a Java/Spring Boot backend with Maven as the build system and PostgreSQL as the relational database.

Typical application lifecycle:

```text
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
```

---

#  PostgreSQL

PostgreSQL is used as the application's database.

The Kubernetes implementation includes:

- PostgreSQL Secret
- PostgreSQL StatefulSet
- PostgreSQL Service
- Persistent storage/PVC
- Dedicated `devsecops` namespace
- Database verification using `psql`

The development history includes creating `studentdb` inside PostgreSQL and validating database availability from the Kubernetes environment.

---

#  Docker & Docker Compose

Docker is used for containerization and local development.

The project includes Docker image inspection, image loading into Kind, container troubleshooting, and Compose-based database work.

For the Kubernetes practice environment, locally built images were loaded directly into the Kind cluster:

```text
Docker Image
    ↓
kind load docker-image
    ↓
Kind Nodes
    ↓
Kubernetes Pods
```

---

# 🔄 CI/CD with GitHub Actions

GitHub Actions is the project's CI/CD platform.

The workflow is designed around:

```text
Git Push / Pull Request
        ↓
GitHub Actions
        ↓
Java / Maven
        ↓
Tests & Package
        ↓
Security Checks
        ↓
Container Build
        ↓
Deployment
```

**Jenkins is not part of this implementation.**

---

#  DevSecOps Security

Security is treated as a lifecycle concern rather than a final step.

## Security tooling

| Tool | Purpose | Status |
|---|---|---|
| Trivy | Vulnerability scanning | Implemented / practiced |
| Gitleaks | Secret detection | Implemented / practiced |
| SonarQube | Code quality and static analysis | Integrated/planned according to stage |
| Checkov | Terraform/IaC security | Implemented / practiced |
| Terraform validate | IaC validation | Implemented / practiced |
| Terraform fmt | IaC formatting | Implemented / practiced |
| Kyverno | Kubernetes policy enforcement | Planned / integration stage |
| Falco | Runtime threat detection | Planned / integration stage |

---

#  Terraform & Checkov

Terraform is used for Infrastructure as Code practice.

The recorded workflow includes:

```text
Terraform Configuration
        ↓
terraform fmt
        ↓
terraform validate
        ↓
Checkov
        ↓
Security Findings
```

Commands used include:

```bash
terraform fmt
terraform validate
checkov -d .
```

Checkov was also installed in an isolated Python virtual environment to avoid modifying the system Python environment.

---

#  Kubernetes

Kubernetes is a major part of the project.

A local Kind cluster was created with multiple nodes and used for application deployment and troubleshooting.

The environment includes:

```text
Kind Cluster
├── Control Plane
├── Worker
├── Worker 2
└── Worker 3
```

The project deployed/practiced:

- Backend Deployment
- Backend Service
- Frontend Deployment
- Frontend Service
- PostgreSQL StatefulSet
- PostgreSQL Service
- ConfigMaps
- Secrets
- PVCs
- Namespaces
- Health/status inspection
- Pod logs
- Endpoint validation

---

#  Kubernetes Application Flow

```text
                 Kubernetes Cluster
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
    Frontend          Backend        PostgreSQL
        │               │               │
        │               └───────┬───────┘
        │                       │
        └──────── Services ─────┘
```

Backend configuration was inspected using:

```bash
grep -R "localhost:5432\|jdbc:postgresql" -n src
```

and:

```bash
find src/main/resources -maxdepth 2 -type f -print
grep -RniE "datasource|jdbc|postgres|DB_|DATABASE" src/main/resources
cat src/main/resources/application.properties
```

---

#  Helm

Helm is used to validate and template Kubernetes applications.

Commands recorded during the project include:

```bash
helm lint .
helm template student-app .
```

Helm is intended to provide repeatable packaging and deployment for Kubernetes workloads.

---

#  GitOps — Argo CD

Argo CD is used/practiced as the GitOps layer.

The environment was inspected with:

```bash
kubectl get ns argocd
kubectl get pods -n argocd
kubectl get svc -n argocd
```

The Argo CD server was accessed locally through port forwarding:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Argo CD troubleshooting included inspecting server logs, pod termination status, events, and resource requests/limits.

---

#  Monitoring — Prometheus & Grafana

Grafana was exposed locally through Kubernetes port forwarding:

```bash
kubectl port-forward -n monitoring service/monitoring-grafana 3000:80
```

and, when port 3000 was occupied:

```bash
kubectl port-forward -n monitoring service/monitoring-grafana 3001:80
```

Grafana credentials were retrieved from the Kubernetes Secret rather than being hard-coded in documentation.

Monitoring is intended to provide:

- Cluster visibility
- Pod health
- Application metrics
- Resource utilization
- Kubernetes workload status
- Dashboard-based observability

---

#  RabbitMQ

RabbitMQ was introduced as the messaging component for asynchronous/event-driven communication practice.

The project created a dedicated namespace:

```bash
kubectl create namespace rabbitmq
```

A Kubernetes Secret was also created for RabbitMQ credentials during testing.

> **Security note:** Actual passwords and secret values are intentionally not documented in this README. Use Kubernetes Secrets or an external secret-management mechanism instead.

---

#  Kubernetes Troubleshooting & Operations

The project involved real Kubernetes troubleshooting rather than only successful deployment commands.

Examples include:

### Node health

```bash
kubectl get nodes
kubectl get nodes -o wide
```

### Cluster information

```bash
kubectl cluster-info
kubectl config current-context
```

### Workloads

```bash
kubectl get pods
kubectl get pods -A
kubectl get pods -n devsecops
kubectl get pods -n devsecops -o wide
```

### Services

```bash
kubectl get svc
kubectl get services
kubectl get endpoints backend-service
kubectl get endpoints frontend-service
```

### Deployment troubleshooting

```bash
kubectl get deployments
kubectl get deployment backend -n devsecops
kubectl rollout restart deployment backend -n devsecops
kubectl rollout status deployment/backend -n devsecops
```

### Logs

```bash
kubectl logs <pod>
kubectl logs -n devsecops -l app=backend --all-containers=true --prefix --tail=100
kubectl logs <pod> --previous
```

### Pod inspection

```bash
kubectl describe pod <pod>
```

### Execute inside a container

```bash
kubectl exec -it <pod> -- sh
```

### Service connectivity testing

```bash
kubectl run curl-test --rm -it --image=curlimages/curl -- sh
```

### Database access

```bash
kubectl exec -it -n devsecops postgres-0 -- psql -U postgres -d postgres -c "\l"
```

Database creation was tested with:

```bash
kubectl exec -it -n devsecops postgres-0 -- psql -U postgres -d postgres -c "CREATE DATABASE studentdb;"
```

---

#  Kind + Docker Troubleshooting

A significant part of the project involved diagnosing Kind/Docker node issues.

### Kind

```bash
kind version
kind get clusters
kind get nodes --name devsecops-cluster
kind create cluster --config kind-devsecops.yaml
kind create cluster --name devsecops-cluster --config kind-config.yaml
kind delete cluster --name devsecops-cluster
```

### Docker

```bash
docker version
docker ps
docker images
docker info
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Container runtime image verification

```bash
docker exec devsecops-cluster-worker crictl images
docker exec devsecops-cluster-worker2 crictl images
```

### Loading local images into Kind

```bash
kind load docker-image devsecops-backend:1.0 --name devsecops-cluster
kind load docker-image devsecops-frontend:1.0 --name devsecops-cluster
```

---

#  Docker `nofile` / Kubelet Troubleshooting

The Kind cluster encountered resource/file-descriptor related troubleshooting.

The following commands were used to inspect limits:

```bash
ulimit -n
cat /proc/sys/fs/inotify/max_user_watches
cat /proc/sys/fs/file-max
cat /proc/sys/fs/inotify/max_user_instances
```

Inside Kind nodes:

```bash
docker exec devsecops-cluster-worker sh -c 'ulimit -n'
docker exec devsecops-cluster-worker2 sh -c 'ulimit -n'
docker exec devsecops-cluster-worker3 sh -c 'ulimit -n'
```

Docker daemon configuration was inspected with:

```bash
sudo cat /etc/docker/daemon.json
docker info | grep -i ulimit
docker info | grep -i -A5 -B2 ulimit
```

Docker service limits were inspected using:

```bash
systemctl status docker --no-pager
systemctl show docker --property=LimitNOFILE
systemctl show docker --property=LimitNOFILESoft
```

A temporary container-level `nofile` test was also performed:

```bash
docker run --rm alpine sh -c 'ulimit -n'
docker run --rm --ulimit nofile=65536:65536 alpine sh -c 'ulimit -n'
```

Docker was restarted after daemon configuration changes:

```bash
sudo systemctl restart docker
```

Kubelet status and logs were investigated using:

```bash
docker exec devsecops-cluster-worker systemctl status kubelet --no-pager
docker exec devsecops-cluster-worker journalctl -u kubelet --no-pager -n 100
docker exec devsecops-cluster-worker journalctl -u kubelet --no-pager -n 100 | grep -iE 'error|failed|fatal'
```

---

#  Complete Commands Reference

The following section is derived from the project's recorded terminal history. Duplicate/repeated commands have been consolidated where appropriate.

## Git / GitHub

```bash
git remote -v
git status
git fetch origin
git pull --no-rebase origin main
git pull --ff-only origin main
git push origin main
git push --force
git branch -a -vv
git branch -vv
git switch main
git switch -c feature/trivy-security-gate --track origin/feature/trivy-security-gate
git branch -D feature/trivy-security-gate
git branch -D master
git log --oneline --decorate -5
git log --oneline --decorate -10
git log --oneline --decorate --graph --all -15
git log --oneline --decorate --graph -12
git log main..feature/trivy-security-gate --oneline
git reset --hard
git merge --no-ff feature/trivy-security-gate -m "Merge DevSecOps security and Kubernetes stack"
git ls-remote origin
curl -I https://github.com
```

### Why these were used

- `git status` — inspect working-tree changes.
- `git fetch origin` — update remote branch references.
- `git pull` — synchronize local `main`.
- `git branch -a -vv` — inspect local/remote branches and tracking.
- `git log` — inspect commit history and branch relationships.
- `git switch` — move between branches.
- `git merge` — merge the security/Kubernetes feature branch.
- `git reset --hard` — discard local changes when intentionally resetting the working tree.
- `git push --force` — used during branch/history management; use with caution.
- `git ls-remote origin` — verify remote repository references.
- `curl -I https://github.com` — verify GitHub connectivity.

> **Caution:** `git reset --hard` and `git push --force` are destructive operations and should only be used when the intended state is verified.

---

## Maven / Java

```bash
./mvnw clean
./mvnw test
./mvnw clean test
./mvnw clean package
java -version
```

Purpose:

- Clean previous build artifacts.
- Run tests.
- Compile/package the application.
- Verify the Java runtime.

---

## Terraform / Checkov

```bash
python3 -m pip install --user checkov
python3 -m venv .venv
source .venv/bin/activate
pip install checkov
checkov --version
checkov -d .
terraform fmt
terraform validate
```

Purpose:

- Create an isolated Python environment.
- Install Checkov.
- Format Terraform.
- Validate Terraform configuration.
- Scan IaC for security/misconfiguration findings.

---

## Docker

```bash
docker version
docker images
docker ps
docker info
docker ps --format "table {{.Names}}\t{{.Status}}"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"
docker image inspect <image>
docker info | grep -i ulimit
docker info | grep -i -A5 -B2 ulimit
docker info | grep -i "Operating System\|Docker Root Dir"
docker exec <container> crictl images
docker exec <container> systemctl status kubelet --no-pager
docker exec <container> journalctl -u kubelet --no-pager -n 100
docker logs --tail 150 <container>
```

Purpose:

- Inspect Docker version, images, containers and daemon information.
- Inspect container runtime images.
- Diagnose Kind node and kubelet problems.

---

## Docker Compose

```bash
docker compose up -d
docker compose ps
docker compose logs
docker compose down
docker compose down -v
```

Purpose:

- Start local services.
- Inspect service state/logs.
- Stop services.
- Remove Compose-managed volumes when a clean reset is required.

---

## Kubernetes / kubectl

```bash
kubectl version --client
kubectl get nodes
kubectl get nodes -o wide
kubectl get pods
kubectl get pods -A
kubectl get pods -o wide
kubectl get pods -n kube-system
kubectl get pods -n devsecops
kubectl get pods -n devsecops -o wide
kubectl get deployments
kubectl get deployment -n devsecops
kubectl get services
kubectl get svc -n devsecops
kubectl get endpoints backend-service
kubectl get endpoints frontend-service
kubectl get endpoints backend -n devsecops
kubectl get namespace devsecops
kubectl get ns argocd
kubectl get configmap backend-config -n devsecops
kubectl get secret backend-secret -n devsecops
kubectl get pvc -n devsecops
kubectl get statefulset -n devsecops
kubectl get cluster-info
kubectl cluster-info
kubectl config current-context
kubectl describe pod <pod>
kubectl describe node <node>
kubectl logs <pod>
kubectl logs <pod> --previous
kubectl exec -it <pod> -- sh
kubectl apply -f <file>.yaml
kubectl delete pod <pod>
kubectl create namespace <namespace>
kubectl rollout restart deployment <deployment> -n <namespace>
kubectl rollout status deployment/<deployment> -n <namespace>
kubectl run <pod> --image=<image>
kubectl run curl-test --rm -it --image=curlimages/curl -- sh
```

Purpose:

- Inspect cluster state.
- Deploy/update resources.
- Diagnose pods and nodes.
- Validate services/endpoints.
- Restart and monitor rollouts.
- Test connectivity from inside the cluster.

---

## Kubernetes Secrets / ConfigMaps

```bash
kubectl apply -f postgres-secret.yaml
kubectl apply -f backend-configmap.yaml
kubectl apply -f backend-secret.yaml
kubectl get secret postgres-secret -n devsecops
kubectl get secret backend-secret -n devsecops
kubectl get configmap backend-config -n devsecops
```

For controlled debugging, secret fields were inspected through JSONPath. Avoid printing secret values in shared logs or documentation.

---

## Kubernetes Port Forwarding

```bash
kubectl port-forward -n monitoring service/monitoring-grafana 3000:80
kubectl port-forward -n monitoring service/monitoring-grafana 3001:80
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Purpose:

- Access Grafana locally.
- Access Argo CD locally without exposing services publicly.

---

## Argo CD Troubleshooting

```bash
kubectl get ns argocd
kubectl get pods -n argocd
kubectl get svc -n argocd
kubectl logs -n argocd deployment/argocd-server --previous --tail=100
kubectl get pod -n argocd <pod> -o jsonpath='{.status.containerStatuses[0].lastState.terminated.reason}{" | exit="}{.status.containerStatuses[0].lastState.terminated.exitCode}{"\n"}'
kubectl describe pod -n argocd <pod> | sed -n '/Events:/,$p'
kubectl describe pod -n argocd <pod> | grep -A12 -E "Limits:|Requests:"
kubectl get svc argocd-server -n argocd -o yaml | grep -A8 "ports:"
```

Purpose:

- Inspect Argo CD availability.
- Inspect previous container termination.
- Inspect pod events and resource configuration.
- Verify exposed service ports.

---

## Helm

```bash
helm version
helm lint .
helm template student-app .
helm list
helm status <release>
helm install <release> .
helm upgrade <release> .
helm uninstall <release>
```

Purpose:

- Validate charts.
- Render Kubernetes manifests locally.
- Install, upgrade and inspect Helm releases.

---

## PostgreSQL / psql

```bash
kubectl exec -it -n devsecops postgres-0 -- psql -U postgres -d postgres -c "\l"
kubectl exec -it -n devsecops postgres-0 -- psql -U postgres -d postgres -c "CREATE DATABASE studentdb;"
```

Purpose:

- List databases.
- Create the application database.
- Verify PostgreSQL from inside the Kubernetes pod.

---

## Linux / System Troubleshooting

```bash
ls
ls -la
ls -lh
ls -l
pwd
find . -maxdepth 3 -type f
find . -type f
tree -a
tree -a -I '.git|target|node_modules'
history
history | less
history | wc -l
wc -l <file>
cat <file>
nano <file>
grep -R <pattern> <path>
grep -RniE "<patterns>" <path>
sed -n '<pattern>,$p' <file>
```

Purpose:

- Inspect files and directories.
- Inspect project structure.
- Search source/configuration.
- Review command history.
- Troubleshoot configuration.

---

## Network / Connectivity

```bash
curl -I https://github.com
lsof -i :3000
```

Purpose:

- Verify external HTTP connectivity.
- Identify processes occupying local ports.

---

# 🧪 Troubleshooting Lessons

This project includes practical troubleshooting cases such as:

### 1. Kind node / kubelet health

Investigated:

- kubelet status
- kubelet journal logs
- Docker daemon limits
- file descriptor limits
- inotify limits
- container runtime images

### 2. Kubernetes pod startup

Used:

```bash
kubectl describe pod <pod>
kubectl logs <pod>
kubectl get pods -o wide
```

to identify scheduling, image-pull, creation and runtime conditions.

### 3. Backend ↔ PostgreSQL connectivity

Inspected:

- JDBC configuration
- datasource configuration
- Kubernetes Secret
- ConfigMap
- PostgreSQL Service
- endpoints
- backend logs

### 4. Argo CD

Investigated:

- service exposure
- server pod status
- previous container termination
- events
- resource limits/requests
- port forwarding

### 5. RabbitMQ API/server issue

A Kubernetes API `EOF` error was encountered while creating a Secret. Cluster readiness, control-plane container logs and kubelet state were then checked rather than assuming the Secret definition itself was the root cause.

---

# 📸 Project Evidence / Screenshots

Screenshots should be stored under:

```text
docs/
└── images/
    ├── github-actions.png
    ├── docker.png
    ├── kubernetes.png
    ├── helm.png
    ├── argocd.png
    ├── prometheus.png
    ├── grafana.png
    ├── trivy.png
    └── security.png
```

Recommended README evidence sections:

### GitHub / Repository

![GitHub Repository](docs/images/github-repository.png)

### GitHub Actions

![GitHub Actions](docs/images/github-actions.png)

### Docker / Containers

![Docker](docs/images/docker.png)

### Kubernetes

![Kubernetes](docs/images/kubernetes.png)

### Helm

![Helm](docs/images/helm.png)

### Argo CD

![Argo CD](docs/images/argocd.png)

### Prometheus / Grafana

![Grafana](docs/images/grafana.png)

### Security Scanning

![Security](docs/images/security.png)

> Replace image filenames with the actual uploaded screenshot filenames before committing.

---

# 📈 Implementation Status

| Component | Status |
|---|---|
| Java / Spring Boot | ✅ Implemented |
| Maven | ✅ Implemented |
| PostgreSQL | ✅ Implemented |
| Docker | ✅ Implemented / practiced |
| Docker Compose | ✅ Implemented / practiced |
| Git / GitHub | ✅ Implemented |
| GitHub Actions | ✅ Implemented |
| Terraform | ✅ Practiced |
| Checkov | ✅ Practiced |
| Kind | ✅ Implemented / practiced |
| Kubernetes | ✅ Implemented / practiced |
| Backend Deployment | ✅ Implemented |
| Frontend Deployment | ✅ Implemented / practiced |
| PostgreSQL StatefulSet | ✅ Implemented |
| Kubernetes ConfigMaps/Secrets | ✅ Implemented |
| Helm | 🔄 Implemented / integration stage |
| Trivy | 🔄 Security integration stage |
| Gitleaks | 🔄 Security integration stage |
| SonarQube | 🔄 Integration stage |
| Kyverno | 🔄 Integration stage |
| Argo CD | 🔄 Integration / troubleshooting stage |
| Falco | 🔄 Planned / integration stage |
| Prometheus | 🔄 Monitoring stage |
| Grafana | 🔄 Monitoring stage |
| RabbitMQ | 🔄 Integration stage |
| Floci | 🔄 Supporting/local-cloud stage |

---

# 🗺️ DevSecOps Roadmap

```text
Spring Boot
    ↓
Maven
    ↓
PostgreSQL
    ↓
Docker / Compose
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
Trivy Security Gate
    ↓
Docker Image
    ↓
Registry
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
```

---

# 🔒 Security & Secret Handling

Never commit:

- Database passwords
- RabbitMQ passwords
- API tokens
- GitHub tokens
- Cloud credentials
- Private keys
- `.env` files containing secrets

Use:

- Kubernetes Secrets
- GitHub Actions Secrets
- External secret managers where appropriate
- Least-privilege credentials

The terminal history used to build this documentation contained secret-related commands. Actual secret values are deliberately excluded from this README.

---

# 🧹 Git Repository Hygiene

Before pushing changes:

```bash
git status
git diff
git branch -a -vv
git log --oneline --decorate -10
```

Recommended workflow:

```text
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
```

---

# ⚠️ Destructive Commands

Use extra caution with:

```bash
git reset --hard
git push --force
git branch -D <branch>
kind delete cluster --name <cluster>
kubectl delete <resource>
docker system/container cleanup commands
docker compose down -v
```

Always verify the target resource/branch before executing destructive operations.

---

# 🎯 What This Project Demonstrates

This project is intended to demonstrate practical understanding of:

- Git and GitHub workflows
- CI/CD automation
- Maven and Java builds
- Docker containerization
- PostgreSQL
- Kubernetes orchestration
- Kubernetes troubleshooting
- Helm packaging
- GitOps concepts
- Security scanning
- Infrastructure as Code
- Terraform validation
- Checkov security analysis
- Runtime security concepts
- Monitoring and observability
- Messaging systems
- Production-style troubleshooting

---

# 📚 Command History Transparency

The command reference in this README was derived from the project's recorded terminal history and then consolidated to remove repetitive entries.

It intentionally documents commands used during implementation, verification, troubleshooting, cleanup, and environment inspection.

It should not be interpreted as a claim that every command represents a completed production feature.

---

# 👨‍💻 Author

**Pushkar Pandey**

DevOps / Cloud Engineering Learner

GitHub:  
https://github.com/pandeypushkar809-collab

---

# ⭐ Project Vision

The objective is to evolve this project into a complete secure software delivery platform:

```text
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
```

> **Build securely. Deploy automatically. Operate reliably.**

<img width="1325" height="599" alt="WhatsApp Image 2026-08-17 at 8 11 58 PM" src="https://github.com/user-attachments/assets/82b63e1d-fe0f-43fa-88f8-8b9a52517273" />

<img width="1019" height="498" alt="1" src="https://github.com/user-attachments/assets/1abdec9c-893b-49ad-b197-6613bcc31f0b" />

<img width="629" height="671" alt="2" src="https://github.com/user-attachments/assets/c7b2ce5e-d10e-45fa-8f6e-e24f721f19c2" />

<img width="1307" height="555" alt="3" src="https://github.com/user-attachments/assets/73d5c456-fea0-456e-a4e3-f8a2caa3f255" />

<img width="906" height="661" alt="4" src="https://github.com/user-attachments/assets/e077ef80-f8ff-4cce-876a-3b04698523d1" />

<img width="1983" height="793" alt="ChatGPT Image Jul 18, 2026, 10_53_29 AM" src="https://github.com/user-attachments/assets/9622a27d-eea4-408b-a4cb-3e0f477e8af3" />








