package io.github.gmgessicamayara.vendasapi.repository;

import io.github.gmgessicamayara.vendasapi.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query(" select c from Customer c where upper(c.name) like upper(:name) and c.cpf like :cpf ")
    Page<Customer> findByCPFAndName(@Param("name") String name, @Param("cpf") String cpf, Pageable pageable);
}
