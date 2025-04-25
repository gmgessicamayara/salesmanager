package io.github.gmgessicamayara.vendasapi.rest.products;

import io.github.gmgessicamayara.vendasapi.dto.CustomerDTO;
import io.github.gmgessicamayara.vendasapi.model.Customer;
import io.github.gmgessicamayara.vendasapi.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.notFound;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public Page<CustomerDTO> getAll(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "cpf", required = false, defaultValue = "") String cpf, Pageable pageable) {
        return customerRepository.findByCPFAndName("%" + name + "%", "%" + cpf + "%", pageable)
                .map(CustomerDTO::modelToDto);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody CustomerDTO customer) {
        Customer entityCustomer = customer.dtoToModel();
        customerRepository.save(entityCustomer);
        return ResponseEntity.ok(CustomerDTO.modelToDto(entityCustomer));
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody CustomerDTO customer) {

        Optional<Customer> customerFound = customerRepository.findById(id);
        if (customerFound.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Customer entityCustomer = customer.dtoToModel();
        customer.setId(id);
        customerRepository.save(entityCustomer);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{id}")
    public ResponseEntity<CustomerDTO> getById(@PathVariable Long id) {
        return customerRepository.findById(id).map(CustomerDTO::modelToDto)
                .map(customerDTO -> ResponseEntity.ok(customerDTO)).orElseGet(() -> notFound().build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        return customerRepository.findById(id).map(customer -> {
                    customerRepository.delete(customer);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> notFound().build());
    }

}
