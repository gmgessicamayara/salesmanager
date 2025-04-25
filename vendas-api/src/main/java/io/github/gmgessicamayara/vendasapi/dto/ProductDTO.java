package io.github.gmgessicamayara.vendasapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.gmgessicamayara.vendasapi.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String sku;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate registrationDate;

    public Product dtoToModel() {
        return new Product(id, name, description, price, sku, registrationDate);
    }

    public static ProductDTO modelToDto(Product product) {
        return new ProductDTO(product.getId(), product.getName(),
                product.getDescription(), product.getPrice(),
                product.getSku(), product.getRegistrationDate());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", sku='" + sku + '\'' +
                ", registrationDate=" + registrationDate +
                '}';
    }
}
