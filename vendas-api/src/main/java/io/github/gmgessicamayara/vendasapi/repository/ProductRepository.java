package io.github.gmgessicamayara.vendasapi.repository;

import io.github.gmgessicamayara.vendasapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
