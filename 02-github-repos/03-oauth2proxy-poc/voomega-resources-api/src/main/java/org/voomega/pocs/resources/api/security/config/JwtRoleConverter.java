package org.voomega.pocs.resources.api.security.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class JwtRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private final static String JWT_PROFILE_KEY= "role";

    //"", ", "", "", "", "", "", "", ""

    private Map<String, Collection<String>> rights = Map.of(
            "SUPER_MANAGER", Arrays.asList(
                    "administrator", "writer", "reader"
            ),
            "LEADER", Arrays.asList(
                    "writer", "reader"
            ),
            "ROF", Arrays.asList(
                    "writer", "reader"
            ),
            "RAA", Arrays.asList(
                    "reader"
            ),
            "RAIRMB", Arrays.asList(
                    "reader"
            ),
            "RRC3", Arrays.asList(
                    "reader"
            ),
            "RRDE", Arrays.asList(
                    "reader"
            ),
            "RISRE", Arrays.asList(
                    "reader"
            ),
            "RJP", Arrays.asList(
                    "reader"
            )
    );

    @Override
    public Collection<GrantedAuthority> convert(final Jwt jwt) {
        return jwt.getClaimAsStringList(JWT_PROFILE_KEY)
                .stream()
                .flatMap(profile -> {
                    if (rights.keySet().contains(profile)) {
                        return  rights.get(profile).stream();
                    }
                    return Stream.empty();
                })
                .collect(Collectors.toSet())
                .stream()
                .map(role -> String.format("ROLE_%s", role))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
