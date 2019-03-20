package cassandrabench.repository;

import cassandrabench.domain.ServerEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Spring Data Cassandra repository for the ServerEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServerEntityRepository extends CassandraRepository<ServerEntity, UUID> {

}
