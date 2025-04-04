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

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<ProductDTO> getAll(){
        return productRepository.findAll().stream()
                .map(ProductDTO::modelToDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ProductDTO save(@RequestBody ProductDTO product) {

        Product entityProduct = product.dtoToModel();
        productRepository.save(entityProduct);
        return ProductDTO.modelToDto(entityProduct);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody ProductDTO product) {
        Optional<Product> entityFounded = productRepository.findById(id);

        if (entityFounded.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Product entityProduct = product.dtoToModel();
        entityProduct.setId(id);
        productRepository.save(entityProduct);

        return ResponseEntity.ok().build();
    }

}
