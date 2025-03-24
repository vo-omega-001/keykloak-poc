package org.voomega.service.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.voomega.service.api.factory.ResourceDtoFactory;
import org.voomega.service.api.factory.ResourceEntityFactory;
import org.voomega.service.api.model.ResourceDto;
import org.voomega.service.api.model.ResourceEntity;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Path("/resource")
public class ResourceController {

    private Map<Integer, ResourceEntity> resources = new HashMap<>();

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

    @GET
    @Path("/{id}")
    @Produces({ MediaType.APPLICATION_JSON })
    public ResponseEntity<ResourceDto> getResource(@PathParam("id") final int resourceId) {
        return ResponseEntity.ok(ResourceDtoFactory.toDto(resourceId, resources.get(resourceId)));
    }

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

    @DELETE
    @Path("/{id}")
    public ResponseEntity<Integer> deleteResource(@PathVariable final int resourceId) {
        if (resources.get(resourceId) != null) {
            resources.remove(resourceId);
            return ResponseEntity.ok(resourceId);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
