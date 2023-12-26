FROM openjdk:17 as build
WORKDIR /app
COPY mvnw mvnw
COPY .mvn .mvn
COPY src src
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2,rw ./mvnw clean install -DskipTests

FROM openjdk:17
# Add curl for the health check
#RUN microdnf install curl; microdnf clean all
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
