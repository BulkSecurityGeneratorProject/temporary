package com.kb.repository;

import com.kb.domain.ProductType;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ProductType entity.
 */
public interface ProductTypeRepository extends JpaRepository<ProductType,Long> {

}
