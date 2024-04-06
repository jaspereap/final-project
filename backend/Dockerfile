FROM maven:3.9.5-eclipse-temurin-21 AS builder

WORKDIR /app
COPY src src
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn

RUN mvn package -Dmaven.test.skip=true

FROM maven:3.9.5-eclipse-temurin-21
WORKDIR /app
COPY --from=builder /app/target/travlr-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=3000
ENV GOOGLE_API_KEY=
ENV GOOGLE_SEARCH_ID=
ENV JWT_SECRET=
ENV JWT_ISSUER=
EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar