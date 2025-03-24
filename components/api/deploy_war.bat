SET DEPLOYMENT_DIR=C:\01__PROJECTS\Formations\keykloak-poc\wildfly-8.2.0.Final\standalone\deployments

SET TARGET_DIR=C:\01__PROJECTS\Formations\keykloak-poc\components\api\target

SET WAR=keycloak.test.api-0.0.1-SNAPSHOT.war


RD /S /Q %DEPLOYMENT_DIR%\%WAR%

COPY %TARGET_DIR%\%WAR% %DEPLOYMENT_DIR%