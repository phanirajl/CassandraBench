package cassandrabench.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A ServerEntity.
 */
@Table("serverEntity")
public class ServerEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private UUID id;

    private String testName;

    private String testAddress;

    private String testLastName;

    private String testCity;

    private String testCountry;

    private Integer testNumber;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTestName() {
        return testName;
    }

    public ServerEntity testName(String testName) {
        this.testName = testName;
        return this;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getTestAddress() {
        return testAddress;
    }

    public ServerEntity testAddress(String testAddress) {
        this.testAddress = testAddress;
        return this;
    }

    public void setTestAddress(String testAddress) {
        this.testAddress = testAddress;
    }

    public String getTestLastName() {
        return testLastName;
    }

    public ServerEntity testLastName(String testLastName) {
        this.testLastName = testLastName;
        return this;
    }

    public void setTestLastName(String testLastName) {
        this.testLastName = testLastName;
    }

    public String getTestCity() {
        return testCity;
    }

    public ServerEntity testCity(String testCity) {
        this.testCity = testCity;
        return this;
    }

    public void setTestCity(String testCity) {
        this.testCity = testCity;
    }

    public String getTestCountry() {
        return testCountry;
    }

    public ServerEntity testCountry(String testCountry) {
        this.testCountry = testCountry;
        return this;
    }

    public void setTestCountry(String testCountry) {
        this.testCountry = testCountry;
    }

    public Integer getTestNumber() {
        return testNumber;
    }

    public ServerEntity testNumber(Integer testNumber) {
        this.testNumber = testNumber;
        return this;
    }

    public void setTestNumber(Integer testNumber) {
        this.testNumber = testNumber;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ServerEntity serverEntity = (ServerEntity) o;
        if (serverEntity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serverEntity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServerEntity{" +
            "id=" + getId() +
            ", testName='" + getTestName() + "'" +
            ", testAddress='" + getTestAddress() + "'" +
            ", testLastName='" + getTestLastName() + "'" +
            ", testCity='" + getTestCity() + "'" +
            ", testCountry='" + getTestCountry() + "'" +
            ", testNumber=" + getTestNumber() +
            "}";
    }
}
