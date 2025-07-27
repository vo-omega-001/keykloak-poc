package org.voomega.pocs.resources.api.security.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@Configuration
@EnableWebMvc
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(
        prePostEnabled = true ,
        securedEnabled = true,
        jsr250Enabled = true)
@Slf4j
public class SecurityConfigurer {

    final static String[] UNPROTECTED_URIS = new String[]{
        "/api/healthcheck/heartbeat",
        "/api/resteasy/registry"
    };

    @Value("${org.voomega.oidc.issuer}")
    private  String issuerUri;


    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers(UNPROTECTED_URIS)
                        .permitAll()
                        .anyRequest()
                        .authenticated()
                )
                .oauth2ResourceServer()
                .jwt()
                .decoder(jwtDecoderFactory())
                .jwtAuthenticationConverter(jwtAuthenticationConverterFactory());
        return http.build();
    }

    private JwtDecoder jwtDecoderFactory() {
        return JwtDecoders.fromIssuerLocation(issuerUri);
    }

    private JwtAuthenticationConverter jwtAuthenticationConverterFactory() {
        final JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new JwtRoleConverter());
        return converter;
    }
}
