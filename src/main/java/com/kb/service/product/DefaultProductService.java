package com.kb.service.product;

import java.util.List;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kb.converter.Converter;
import com.kb.domain.Company;
import com.kb.domain.Product;
import com.kb.repository.ProductRepository;
import com.kb.search.model.ProductSearch;
import com.kb.search.repository.product.ProductSearchRepository;
import com.kb.web.rest.dto.product.ProductDto;

@Service
public class DefaultProductService implements ProductService {

	@Inject
	private ProductRepository productRepository;
	
	@Inject
	private ProductSearchRepository productSearchRepository;
	
	@Resource(name = "productSearchConverter")
	private Converter<ProductSearch, ProductDto> productSearchConverter;

	@Resource(name = "productConverter")
	private Converter<Product, ProductDto> productConverter;
	
	@Resource(name = "productEntitySearchConverter")
	private Converter<Product, ProductSearch> productEntitySearchConverter;
	
	@Override
	public List<ProductDto> findAll(final Pageable pageable, final ProductSearch dto, final Boolean applySearch) {
		List<ProductDto> products = null;
		
		if (applySearch) {
			List<ProductSearch> productEntities = productSearchRepository.findGlobal(dto.getTitle(), 
					dto.getDescription(), 
					dto.getBrand(),
					dto.getOrigin(),
					dto.getCertifiedHalal(),
					dto.getCodeGenerate(),
					dto.getUnitDescription(),
					dto.getUnitHide(),
					dto.getAvailable(),
					dto.getCode(),
					dto.getQuantity(),
					dto.getBasePrice(),
					dto.getCategoryId(),
					dto.getSubCategoryId(),
					dto.getSubSubCategoryId(),
					dto.getUnitId(),
					dto.getPictureId(),
					dto.getCompanyId(),
					pageable).getContent();
			products = productSearchConverter.convertAll(productEntities);
		} else {
			List<Product> productEntities = productRepository.findAll(pageable).getContent();
			products = productConverter.convertAll(productEntities);
		}
		
		return products;
	}

	@Override
	public void save(final Product product) {
		productRepository.save(product);
		ProductSearch productSearch = productEntitySearchConverter.convert(product);
		productSearchRepository.save(productSearch);
	}

	@Override
	public Page<Product> findByCompany(final Company company, final Pageable page) {
		return productRepository.findByCompany(company, page);
	}

	@Override
	public List<Product> findByCompanyAndCategoryIsNull(final Company company) {
		return productRepository.findByCompanyAndCategoryIsNull(company);
	}

	@Override
	public Product findOne(final Long id) {
		return productRepository.findOne(id);
	}

	@Override
	public void delete(final Long id) {
		productRepository.delete(id);
		productSearchRepository.delete(id);
	}

}
