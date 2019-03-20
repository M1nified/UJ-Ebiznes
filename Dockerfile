FROM ubuntu:18.04

MAINTAINER Student Studencki <student.wazny@uj.edu.pl>

RUN useradd ujot --create-home

RUN apt-get update
RUN apt-get install -y vim unzip curl git

# dodaj konfigurację tutaj

RUN apt-get install -y default-jdk
RUN apt-get install -y scala

RUN apt-get install -y gnupg2

RUN echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2EE0EA64E40A89B84B2DF73499E82A75642AC823 && \
    apt-get update -y && \
    apt-get install -y sbt

#

USER ujot

CMD echo "Hello World"

CMD sbt run
