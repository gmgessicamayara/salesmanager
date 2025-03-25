package io.github.gmgessicamayara.vendasapi.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "tb_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "p_name")
    private String name;

    @Column(name = "p_description", length =500)
    private String description;

    @Column(name = "p_price", precision = 16, scale = 2)
    private BigDecimal price;

    @Column(name = "p_sku")
    private String sku;

    @Column(name = "p_registration_date")
    private LocalDate registrationDate;

       public Product(String name, String description, BigDecimal price, String sku, LocalDate registrationDate) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.sku = sku;
        this.registrationDate = registrationDate;
    }

    public Product(Long id, String name, String description, BigDecimal price, String sku, LocalDate registrationDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.sku = sku;
        this.registrationDate = registrationDate;
    }
    @PrePersist
    public void prePersist() {
           setRegistrationDate(LocalDate.now());
    }
}
