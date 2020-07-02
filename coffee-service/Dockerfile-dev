FROM openjdk:11-jdk
COPY ./target/coffee-service-0.0.1-SNAPSHOT.jar /usr/src/myapp/app.jar
WORKDIR /usr/src/myapp

CMD ["java", "-jar", "app.jar"]