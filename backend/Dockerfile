# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml mvnw ./
COPY .mvn .mvn 
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B
COPY src src 
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre

WORKDIR /app

# Run application as non-root user
RUN useradd -r -u 1001 springuser

# Copy JAR from build stage
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

RUN chown springuser:springuser app.jar

USER springuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


 

