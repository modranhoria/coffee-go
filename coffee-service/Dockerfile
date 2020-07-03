# Build stage
FROM maven AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

FROM openjdk:11-jdk
COPY --from=build /home/app/target/coffee-service-0.0.1-SNAPSHOT.jar /usr/src/myapp/app.jar
WORKDIR /usr/src/myapp

EXPOSE 5005
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005","-jar", "app.jar"]

#CMD ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]