#!/bin/bash
#################################################################################################################################

#PASSWORD: admin/azerty



#################################################################################################################################
export JAVA_HOME='/c/00__INSTALL/04__Platforms/JDK/jdk-17.0.15+6'
export KC_USERNAME=admin
export KC_PAWWSORD=azerty

KC_VERSION='26.3.1';
KC_PATH="/c/00__INSTALL/02__Network/Servers/keycloak-$KC_VERSION";



pushd $KC_PATH/bin

echo $(pwd)

#####] CREATE ADMIN USER #################################################################
# ./kc.sh bootstrap-admin user --username:env KC_USERNAME --password:env KC_PAWWSORD --optimized


#####] START OIDC SERVER #################################################################

# Quarkus option: http-forwarded-host-enabled

# --http-relative-path=dmg-oidc \
# ./kc.sh start-dev --http-port 8180;

./kc.sh start-dev \
 --http-enabled=true \
 --http-relative-path=dmg-oidc \
 --proxy-headers xforwarded \
 --proxy-trusted-addresses=192.168.1.51,127.0.0.1/8 \
 --log-console-color=true \
 --log-level="TRACE,org.hibernate:ERROR,org.infinispan:ERROR,io.quarkus.hibernate:ERROR,com.arjuna.ats.jta:ERROR,jdk.event.security:INFO,liquibase:ERROR,liquibase.database.core.PostgresDatabase:TRACE"
 
 # --proxy-protocol-enabled=false
