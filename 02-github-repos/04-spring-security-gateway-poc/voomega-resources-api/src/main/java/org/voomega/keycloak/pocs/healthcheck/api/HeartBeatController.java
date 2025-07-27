package org.voomega.keycloak.pocs.healthcheck.api;

import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RestController
@Path("/healthcheck")
public class HeartBeatController {

    @GET
    @Path("/heartbeat")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getTest() {
        return Response.status(HttpServletResponse.SC_OK).entity("{\"status\": \"DMG-API is working\"}").build();
    }
}
