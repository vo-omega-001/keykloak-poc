REM setlocal
set JAVA_HOME=C:\00__INSTALL\04__Platforms\JDK\jdk-17.0.15+6
set PATH=%JAVA_HOME%\bin;%PATH%
set CATALINA_HOME=
set JAVA_OPTS=
set CATALINA_OPTS=-Dport.shutdown=8006 -Dhttp.port=8280 -Dhttp.port.redirect=8443
set JAVA_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
CD .\apache-tomcat-11.0.9\bin
startup.bat
CD ..\..
REM endlocal
EXIT