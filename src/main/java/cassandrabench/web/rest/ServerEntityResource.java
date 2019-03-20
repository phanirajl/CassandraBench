package cassandrabench.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.github.javafaker.Address;
import com.github.javafaker.Faker;

import cassandrabench.domain.ServerEntity;
import cassandrabench.repository.ServerEntityRepository;
import cassandrabench.web.rest.errors.BadRequestAlertException;
import cassandrabench.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * REST controller for managing ServerEntity.
 */
@RestController
@RequestMapping("/api")
public class ServerEntityResource {

    private final Logger log = LoggerFactory.getLogger(ServerEntityResource.class);

    private static final String ENTITY_NAME = "cassandrabenchServerEntity";

    private final ServerEntityRepository serverEntityRepository;

    public ServerEntityResource(ServerEntityRepository serverEntityRepository) {
        this.serverEntityRepository = serverEntityRepository;
    }

    /**
     * POST  /server-entities : Create a new serverEntity.
     *
     * @param serverEntity the serverEntity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serverEntity, or with status 400 (Bad Request) if the serverEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @GetMapping("/start")
    @Timed
    public ResponseEntity<Long> createServerEntity() throws URISyntaxException {
        Faker faker = new Faker();
        ArrayList<ServerEntity> collection = new ArrayList<ServerEntity>();
        for (int i = 0; i < 1000 ; i++) {
        	ServerEntity entity  = new ServerEntity();
        	entity.setId(UUID.randomUUID());
        	entity.setTestName(faker.name().firstName());
        	entity.setTestLastName(faker.name().lastName());
        	
        	Address address = faker.address();
        	entity.setTestAddress(address.fullAddress());
        	entity.setTestCity(address.city());
        	entity.setTestCountry(address.country());
        	
        	entity.setTestNumber(i);
        	
        	collection.add(entity);
        }
        log.info("Finished creating querries");
        long startTime = System.currentTimeMillis();
        List<ServerEntity> result = serverEntityRepository.saveAll(collection);
        long endTime = System.currentTimeMillis();
        long execTime = endTime - startTime;
        log.info("Execution time was {} millis", execTime);
        return ResponseEntity
        		.ok().body(execTime);
    }

    /**
     * PUT  /server-entities : Updates an existing serverEntity.
     *
     * @param serverEntity the serverEntity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serverEntity,
     * or with status 400 (Bad Request) if the serverEntity is not valid,
     * or with status 500 (Internal Server Error) if the serverEntity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/server-entities")
    @Timed
    public ResponseEntity<ServerEntity> updateServerEntity(@RequestBody ServerEntity serverEntity) throws URISyntaxException {
        log.debug("REST request to update ServerEntity : {}", serverEntity);
        if (serverEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServerEntity result = serverEntityRepository.save(serverEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serverEntity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /server-entities : get all the serverEntities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of serverEntities in body
     */
    @GetMapping("select")
    @Timed
    public ResponseEntity<Long> getServerEntity() {
    	ArrayList<UUID>searches = new ArrayList<UUID>();
    	for (int i = 0; i < 1000; i++) {
    		UUID search = UUID.randomUUID();
    		
        	searches.add(search);
        }
        Long startTime = System.currentTimeMillis();
        
        serverEntityRepository.findAllById(searches);
        
        Long endTime = System.currentTimeMillis();
        Long execTime = endTime - startTime;
        return ResponseEntity.ok().body(execTime);
    }

    /**
     * GET  /server-entities/:id : get the "id" serverEntity.
     *
     * @param id the id of the serverEntity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serverEntity, or with status 404 (Not Found)
     */
    @GetMapping("/server-entities/{id}")
    @Timed
    public ResponseEntity<ServerEntity> getServerEntity(@PathVariable UUID id) {
        log.debug("REST request to get ServerEntity : {}", id);
        Optional<ServerEntity> serverEntity = serverEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serverEntity);
    }

    /**
     * DELETE  /server-entities/:id : delete the "id" serverEntity.
     *
     * @param id the id of the serverEntity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @GetMapping("delete")
    @Timed
    public ResponseEntity<Long> deleteServerEntity() {
    	Long startTime = System.currentTimeMillis();
        serverEntityRepository.deleteAll();
        Long endTime = System.currentTimeMillis();
        Long execTime = endTime - startTime;
        return ResponseEntity.ok().body(execTime);
    }
}
