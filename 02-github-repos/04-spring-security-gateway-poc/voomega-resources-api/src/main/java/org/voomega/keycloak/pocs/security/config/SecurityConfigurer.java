package org.voomega.keycloak.pocs.security.config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
// Below, could add : (debug = true)
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(
        prePostEnabled = true ,
        securedEnabled = true,
        jsr250Enabled = true)
@Slf4j
public class SecurityConfigurer extends WebSecurityConfiguration {

    final static String[] UNPROTECTED_URIS = new String[]{
        "/api/healthcheck/heartbeat",
        "/api/resteasy/registry"
    };
    final static String ISS_URI = "http://dv1waeiscd12:9090/dmg-oidc/realms/DMG-REALM";

    @Bean
    protected SecurityFilterChain configure(final HttpSecurity http) {
        try {
            http.authorizeHttpRequests()
                    .antMatchers(UNPROTECTED_URIS)
                    .permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .oauth2ResourceServer()
                    .jwt()
                    .decoder(jwtDecoderFactory())
                    .jwtAuthenticationConverter(jwtAuthenticationConverterFactory());
            return http.build();
        } catch (final Exception e) {
            throw new IllegalStateException("Can't configure HttpSecurity", e);
        }
    }

    private JwtDecoder jwtDecoderFactory() {
        return JwtDecoders.fromIssuerLocation(ISS_URI);
    }

    private JwtAuthenticationConverter jwtAuthenticationConverterFactory() {
        final JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new JwtRoleConverter());
        return converter;
    }
}
