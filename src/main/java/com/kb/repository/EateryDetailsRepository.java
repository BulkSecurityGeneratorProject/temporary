package com.kb.repository;

import com.kb.domain.EateryDetails;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the EateryDetails entity.
 */
public interface EateryDetailsRepository extends JpaRepository<EateryDetails,Long> {

}
