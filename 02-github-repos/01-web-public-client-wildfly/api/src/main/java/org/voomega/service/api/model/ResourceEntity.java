package org.voomega.service.api.model;

import com.google.common.base.Strings;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.ZoneId;

@Getter
public class ResourceEntity {
    @Setter
    private String name;
    @Setter
    private boolean enabled;
    private LocalDate creationDate;
    private LocalDate updatedDate;
    private ZoneId zoneId = ZoneId.of( "Europe/Paris" );

    public ResourceEntity(final String name) {
        this.name = Strings.isNullOrEmpty(name) ? "" : name;
        enabled = true;
        creationDate = LocalDate.now( zoneId );
        updatedDate = creationDate;
    }

    public ResourceEntity setUpdateDate() {
        updatedDate = LocalDate.now( zoneId );
        return this;
    }
}
