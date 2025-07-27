

SET JAVA_HOME=C:\00__INSTALL\04__Platforms\JDK\jdk-8u221
@echo off
REM SET JAVA_OPTS="$JAVA_OPTS -agentlib:jdwp=transport=dt_socket,address=8787,server=y,suspend=n"
REM SET JAVA_OPTS="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8787"
REM SET JAVA_OPTS="$JAVA_OPTS -agentlib:jdwp=transport=dt_socket,address="8787",server=y,suspend=n"
REM SET JAVA_OPTS="-Dprogram.name=standalone.bat -Xms64M -Xmx512M -XX:MaxPermSize=256M -Djava.net.preferIPv4Stack=true -Djboss.modules.system.pkgs=org.jboss.byteman -agentlib:jdwp=transport=dt_socket,address="8787",server=y,suspend=n"
@echo on

SET DEBUG_MODE=true
SET DEBUG_PORT=8787

REM .\wildfly-8.2.0.Final\bin\add-user.bat

.\wildfly-8.2.0.Final\bin\standalone.bat --debug 8787
REM .\wildfly-8.2.0.Final\bin\standalone.bat

