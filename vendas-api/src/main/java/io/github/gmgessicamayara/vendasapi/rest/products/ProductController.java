package io.github.gmgessicamayara.vendasapi.rest.products;

import io.github.gmgessicamayara.vendasapi.dto.ProductDTO;
import io.github.gmgessicamayara.vendasapi.model.Product;
import io.github.gmgessicamayara.vendasapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ProductDTO save(@RequestBody ProductDTO product){

        Product entityProduct = product.dtoToModel();
        productRepository.save(entityProduct);
        return ProductDTO.modelToDto(entityProduct);
    }

}
