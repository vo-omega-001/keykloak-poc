package org.voomega.pocs.resources.api.resource.api;


import org.voomega.pocs.resources.api.resource.helper.ResourceEntityFactory;
import org.voomega.pocs.resources.api.resource.model.ResourceDto;
import org.voomega.pocs.resources.api.resource.model.ResourceEntity;
import org.voomega.pocs.resources.api.resource.helper.ResourceDtoFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Path("/resource")
public class ResourceController
{
    private Map<Integer, ResourceEntity> resources = new HashMap<>();

    public ResourceController() {
        addResource(0, "initial resource", false);
    }

    @PreAuthorize("hasAnyRole('administrator'," +
            "'writer'" +
            ")")
    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    public ResponseEntity<ResourceDto> createResource(@RequestBody final ResourceDto resourceDto) {
        final Optional<ResourceEntity> entity =
                ResourceEntityFactory.toEntity(resourceDto);
        if (entity.isPresent()) {
            final int resourceId = 1+resources.size();
            resources.put(resourceId, entity.get());
            return ResponseEntity.ok(ResourceDtoFactory.toDto(resourceId, resources.get(resourceId)));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PreAuthorize("hasAnyRole('administrator'," +
            "'writer'" +
            ")")
    @GET
    @Path("/{id}")
    @Produces({ MediaType.APPLICATION_JSON })
    public ResponseEntity<ResourceDto> getResource(@PathParam("id") final int resourceId) {
        return ResponseEntity.ok(ResourceDtoFactory.toDto(resourceId, resources.get(resourceId)));
    }

    @PreAuthorize("hasAnyRole('administrator'," +
            "'writer'," +
            "'reader'" +
            ")")
    @GET
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    public ResponseEntity<Object> getResources() {
        final Collection<ResourceDto> dtos =
                resources.entrySet().stream()
                        .map(entry -> ResourceDtoFactory.toDto(entry.getKey(), entry.getValue()))
                        .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

    @PreAuthorize("hasAnyRole('administrator'," +
            "'writer'" +
            ")")
    @PUT
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    public ResponseEntity<ResourceDto> updateResource(@RequestBody final ResourceDto resourceDto) {
        if (resourceDto != null && resourceDto.getId() > 0) {
            final ResourceEntity entity = resources.get(resourceDto.getId());
            if (entity != null) {
                if (ResourceEntityFactory.updateEntity(resourceDto, entity)) {
                    return ResponseEntity.ok(ResourceDtoFactory.toDto(resourceDto.getId(), entity));
                }
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resourceDto);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resourceDto);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PreAuthorize("hasAnyRole('administrator')")
    @DELETE
    @Path("/{id}")
    public ResponseEntity<Integer> deleteResource(@PathVariable final int resourceId) {
        if (resources.get(resourceId) != null) {
            resources.remove(resourceId);
            return ResponseEntity.ok(resourceId);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    private void addResource(final int resourceId, final String resourceName, final boolean state) {
        final ResourceDto dto = new ResourceDto();
        dto.setId(resourceId+1);
        dto.setName(resourceName);
        dto.setEnabled(state);
        final Optional<ResourceEntity> entity =
                ResourceEntityFactory.toEntity(dto);
        entity.ifPresent(resourceEntity -> resources.put(resourceId, resourceEntity));
    }
}
