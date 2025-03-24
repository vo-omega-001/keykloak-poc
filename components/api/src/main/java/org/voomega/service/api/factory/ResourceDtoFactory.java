package org.voomega.service.api.factory;

import org.voomega.service.api.model.ResourceEntity;
import org.voomega.service.api.model.ResourceDto;

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
