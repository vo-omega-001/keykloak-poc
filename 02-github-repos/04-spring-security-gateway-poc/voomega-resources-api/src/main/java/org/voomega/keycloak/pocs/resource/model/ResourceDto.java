package org.voomega.keycloak.pocs.resource.model;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ResourceDto {
    private int id = 0;
    private String name;
    private boolean enabled;
}
