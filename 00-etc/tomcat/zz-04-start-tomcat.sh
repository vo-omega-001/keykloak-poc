#!/bin/bash
#################################################################################################################################

export JAVA_HOME='/c/00__INSTALL/04__Platforms/JDK/jdk-17.0.15+6'
export PATH="$JAVA_HOME/bin:$PATH"
export CATALINA_HOME='./apache-tomcat-11.0.9/bin'
export CATALINA_OPTS="-Dport.shutdown=8085 -Dport.http=8280 -Xdebug -Xrunjdwp:transport=dt_socket,address=5005,server=y,suspend=n"
export JAVA_OPTS=$CATALINA_OPTS

cd apache-tomcat-11.0.9/bin
ls
startup.sh
