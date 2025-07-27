package org.voomega.keycloak.pocs.resource.helper;

import com.google.common.base.Strings;
import org.voomega.keycloak.pocs.resource.model.ResourceDto;
import org.voomega.keycloak.pocs.resource.model.ResourceEntity;

import java.util.Optional;


public class ResourceEntityFactory {

    private ResourceEntityFactory() {}

    public static Optional<ResourceEntity> toEntity(final ResourceDto dto) {
        if (dto != null && !Strings.isNullOrEmpty(dto.getName())) {
            final ResourceEntity entity = new ResourceEntity(dto.getName());
            entity.setEnabled(dto.isEnabled());
            return Optional.of(entity);
        }
        return Optional.empty();
    }

    public static boolean updateEntity(final ResourceDto dto, final ResourceEntity entity) {
        if (entity != null &&
                dto != null && !Strings.isNullOrEmpty(dto.getName())) {
            entity.setName(dto.getName());
            entity.setEnabled(dto.isEnabled());
            entity.setUpdateDate();
            return true;
        }
        return false;
    }
}
