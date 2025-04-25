package io.github.gmgessicamayara.vendasapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.gmgessicamayara.vendasapi.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private Long id;
    private String name;
    private String cpf;
    private String address;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthday;
    private String email;
    private String phoneNumber;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate registrationDate;

    public Customer dtoToModel() {
        return new Customer(id, name, cpf, address, birthday, email, phoneNumber, registrationDate);
    }

    public static CustomerDTO modelToDto(Customer client) {
        return new CustomerDTO(client.getId(), client.getName(), client.getCpf(), client.getAddress(), client.getBirthday(), client.getEmail(), client.getPhoneNumber(), client.getRegistrationDate());
    }
}
