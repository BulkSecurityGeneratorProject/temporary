package com.kb.repository;

import com.kb.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Company entity.
 */
public interface CompanyRepository extends JpaRepository<Company,Long> {

}
