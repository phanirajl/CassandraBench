package cassandrabench.web.rest;

import cassandrabench.AbstractCassandraTest;
import cassandrabench.CassandrabenchApp;

import cassandrabench.domain.ServerEntity;
import cassandrabench.repository.ServerEntityRepository;
import cassandrabench.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import java.util.UUID;

import static cassandrabench.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ServerEntityResource REST controller.
 *
 * @see ServerEntityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CassandrabenchApp.class)
public class ServerEntityResourceIntTest extends AbstractCassandraTest {

    private static final String DEFAULT_TEST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TEST_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_TEST_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_TEST_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEST_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TEST_CITY = "AAAAAAAAAA";
    private static final String UPDATED_TEST_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_TEST_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_TEST_COUNTRY = "BBBBBBBBBB";

    private static final Integer DEFAULT_TEST_NUMBER = 1;
    private static final Integer UPDATED_TEST_NUMBER = 2;

    @Autowired
    private ServerEntityRepository serverEntityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restServerEntityMockMvc;

    private ServerEntity serverEntity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServerEntityResource serverEntityResource = new ServerEntityResource(serverEntityRepository);
        this.restServerEntityMockMvc = MockMvcBuilders.standaloneSetup(serverEntityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServerEntity createEntity() {
        ServerEntity serverEntity = new ServerEntity()
            .testName(DEFAULT_TEST_NAME)
            .testAddress(DEFAULT_TEST_ADDRESS)
            .testLastName(DEFAULT_TEST_LAST_NAME)
            .testCity(DEFAULT_TEST_CITY)
            .testCountry(DEFAULT_TEST_COUNTRY)
            .testNumber(DEFAULT_TEST_NUMBER);
        return serverEntity;
    }

    @Before
    public void initTest() {
        serverEntityRepository.deleteAll();
        serverEntity = createEntity();
    }

    @Test
    public void createServerEntity() throws Exception {
        int databaseSizeBeforeCreate = serverEntityRepository.findAll().size();

        // Create the ServerEntity
        restServerEntityMockMvc.perform(post("/api/server-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serverEntity)))
            .andExpect(status().isCreated());

        // Validate the ServerEntity in the database
        List<ServerEntity> serverEntityList = serverEntityRepository.findAll();
        assertThat(serverEntityList).hasSize(databaseSizeBeforeCreate + 1);
        ServerEntity testServerEntity = serverEntityList.get(serverEntityList.size() - 1);
        assertThat(testServerEntity.getTestName()).isEqualTo(DEFAULT_TEST_NAME);
        assertThat(testServerEntity.getTestAddress()).isEqualTo(DEFAULT_TEST_ADDRESS);
        assertThat(testServerEntity.getTestLastName()).isEqualTo(DEFAULT_TEST_LAST_NAME);
        assertThat(testServerEntity.getTestCity()).isEqualTo(DEFAULT_TEST_CITY);
        assertThat(testServerEntity.getTestCountry()).isEqualTo(DEFAULT_TEST_COUNTRY);
        assertThat(testServerEntity.getTestNumber()).isEqualTo(DEFAULT_TEST_NUMBER);
    }

    @Test
    public void createServerEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serverEntityRepository.findAll().size();

        // Create the ServerEntity with an existing ID
        serverEntity.setId(UUID.randomUUID());

        // An entity with an existing ID cannot be created, so this API call must fail
        restServerEntityMockMvc.perform(post("/api/server-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serverEntity)))
            .andExpect(status().isBadRequest());

        // Validate the ServerEntity in the database
        List<ServerEntity> serverEntityList = serverEntityRepository.findAll();
        assertThat(serverEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllServerEntities() throws Exception {
        // Initialize the database
        serverEntity.setId(UUID.randomUUID());
        serverEntityRepository.save(serverEntity);

        // Get all the serverEntityList
        restServerEntityMockMvc.perform(get("/api/server-entities"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serverEntity.getId().toString())))
            .andExpect(jsonPath("$.[*].testName").value(hasItem(DEFAULT_TEST_NAME.toString())))
            .andExpect(jsonPath("$.[*].testAddress").value(hasItem(DEFAULT_TEST_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].testLastName").value(hasItem(DEFAULT_TEST_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].testCity").value(hasItem(DEFAULT_TEST_CITY.toString())))
            .andExpect(jsonPath("$.[*].testCountry").value(hasItem(DEFAULT_TEST_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].testNumber").value(hasItem(DEFAULT_TEST_NUMBER)));
    }
    
    @Test
    public void getServerEntity() throws Exception {
        // Initialize the database
        serverEntity.setId(UUID.randomUUID());
        serverEntityRepository.save(serverEntity);

        // Get the serverEntity
        restServerEntityMockMvc.perform(get("/api/server-entities/{id}", serverEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serverEntity.getId().toString()))
            .andExpect(jsonPath("$.testName").value(DEFAULT_TEST_NAME.toString()))
            .andExpect(jsonPath("$.testAddress").value(DEFAULT_TEST_ADDRESS.toString()))
            .andExpect(jsonPath("$.testLastName").value(DEFAULT_TEST_LAST_NAME.toString()))
            .andExpect(jsonPath("$.testCity").value(DEFAULT_TEST_CITY.toString()))
            .andExpect(jsonPath("$.testCountry").value(DEFAULT_TEST_COUNTRY.toString()))
            .andExpect(jsonPath("$.testNumber").value(DEFAULT_TEST_NUMBER));
    }

    @Test
    public void getNonExistingServerEntity() throws Exception {
        // Get the serverEntity
        restServerEntityMockMvc.perform(get("/api/server-entities/{id}", UUID.randomUUID().toString()))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateServerEntity() throws Exception {
        // Initialize the database
        serverEntity.setId(UUID.randomUUID());
        serverEntityRepository.save(serverEntity);

        int databaseSizeBeforeUpdate = serverEntityRepository.findAll().size();

        // Update the serverEntity
        ServerEntity updatedServerEntity = serverEntityRepository.findById(serverEntity.getId()).get();
        updatedServerEntity
            .testName(UPDATED_TEST_NAME)
            .testAddress(UPDATED_TEST_ADDRESS)
            .testLastName(UPDATED_TEST_LAST_NAME)
            .testCity(UPDATED_TEST_CITY)
            .testCountry(UPDATED_TEST_COUNTRY)
            .testNumber(UPDATED_TEST_NUMBER);

        restServerEntityMockMvc.perform(put("/api/server-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedServerEntity)))
            .andExpect(status().isOk());

        // Validate the ServerEntity in the database
        List<ServerEntity> serverEntityList = serverEntityRepository.findAll();
        assertThat(serverEntityList).hasSize(databaseSizeBeforeUpdate);
        ServerEntity testServerEntity = serverEntityList.get(serverEntityList.size() - 1);
        assertThat(testServerEntity.getTestName()).isEqualTo(UPDATED_TEST_NAME);
        assertThat(testServerEntity.getTestAddress()).isEqualTo(UPDATED_TEST_ADDRESS);
        assertThat(testServerEntity.getTestLastName()).isEqualTo(UPDATED_TEST_LAST_NAME);
        assertThat(testServerEntity.getTestCity()).isEqualTo(UPDATED_TEST_CITY);
        assertThat(testServerEntity.getTestCountry()).isEqualTo(UPDATED_TEST_COUNTRY);
        assertThat(testServerEntity.getTestNumber()).isEqualTo(UPDATED_TEST_NUMBER);
    }

    @Test
    public void updateNonExistingServerEntity() throws Exception {
        int databaseSizeBeforeUpdate = serverEntityRepository.findAll().size();

        // Create the ServerEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServerEntityMockMvc.perform(put("/api/server-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serverEntity)))
            .andExpect(status().isBadRequest());

        // Validate the ServerEntity in the database
        List<ServerEntity> serverEntityList = serverEntityRepository.findAll();
        assertThat(serverEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteServerEntity() throws Exception {
        // Initialize the database
        serverEntity.setId(UUID.randomUUID());
        serverEntityRepository.save(serverEntity);

        int databaseSizeBeforeDelete = serverEntityRepository.findAll().size();

        // Get the serverEntity
        restServerEntityMockMvc.perform(delete("/api/server-entities/{id}", serverEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServerEntity> serverEntityList = serverEntityRepository.findAll();
        assertThat(serverEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServerEntity.class);
        ServerEntity serverEntity1 = new ServerEntity();
        serverEntity1.setId(UUID.randomUUID());
        ServerEntity serverEntity2 = new ServerEntity();
        serverEntity2.setId(serverEntity1.getId());
        assertThat(serverEntity1).isEqualTo(serverEntity2);
        serverEntity2.setId(UUID.randomUUID());
        assertThat(serverEntity1).isNotEqualTo(serverEntity2);
        serverEntity1.setId(null);
        assertThat(serverEntity1).isNotEqualTo(serverEntity2);
    }
}
