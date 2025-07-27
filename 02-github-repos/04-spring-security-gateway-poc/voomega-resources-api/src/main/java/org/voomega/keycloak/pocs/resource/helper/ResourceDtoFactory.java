package org.voomega.keycloak.pocs.resource.helper;

import org.voomega.keycloak.pocs.resource.model.ResourceDto;
import org.voomega.keycloak.pocs.resource.model.ResourceEntity;


public class ResourceDtoFactory {
    private ResourceDtoFactory() {}

    public static ResourceDto toDto(final int resourceId, final ResourceEntity entity) {
        final ResourceDto dto = new ResourceDto();
        dto.setId(0);

        if (resourceId > 0) {
            dto.setId(resourceId);
        }
        if (entity != null) {
            dto.setName(entity.getName());
            dto.setEnabled(entity.isEnabled());
        }
        return dto;
    }
}
