package io.github.gmgessicamayara.vendasapi.rest.products;

import io.github.gmgessicamayara.vendasapi.dto.ProductDTO;
import io.github.gmgessicamayara.vendasapi.model.Product;
import io.github.gmgessicamayara.vendasapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<ProductDTO> getAll() {
        return productRepository.findAll().stream()
                .map(ProductDTO::modelToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductDTO> getById(@PathVariable Long id) {

        Optional<Product> productFound = productRepository.findById(id);
        if (productFound.isEmpty()) {
            return notFound().build();
        }
        var product = productFound.map(ProductDTO::modelToDto).get();
        return ok(product);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody ProductDTO product) {

        Product entityProduct = product.dtoToModel();
        productRepository.save(entityProduct);
        return ResponseEntity.ok(ProductDTO.modelToDto(entityProduct));
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody ProductDTO product) {
        Optional<Product> entityFounded = productRepository.findById(id);

        if (entityFounded.isEmpty()) {
            return notFound().build();
        }
        Product entityProduct = product.dtoToModel();
        entityProduct.setId(id);
        productRepository.save(entityProduct);

        return ok().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Product> entityFounded = productRepository.findById(id);
        if (entityFounded.isEmpty()) {
            return notFound().build();
        }
        productRepository.delete(entityFounded.get());
        return ResponseEntity.noContent().build();
    }


}
