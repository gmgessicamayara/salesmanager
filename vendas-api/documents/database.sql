CREATE DATABASE vendas;
CREATE TABLE tb_product (
                            id BIGSERIAL NOT NULL PRIMARY KEY,
                            p_name VARCHAR(100) NOT NULL,
                            p_description VARCHAR(255),
                            p_price numeric(16,2),
                            p_sku VARCHAR(20)
);