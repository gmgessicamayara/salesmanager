package io.github.gmgessicamayara.vendasapi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_client")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "p_name")
    private String name;

    @Column(name = "p_cpf")
    private String cpf;

    @Column(name = "p_address")
    private String address;

    @Column(name = "p_birthday")
    private LocalDate birthday;

    @Column(name = "p_email")
    private String email;

    @Column(name = "p_phone_number")
    private String phoneNumber;

    @Column(name = "p_registration_date")
    private LocalDate registrationDate;

    @PrePersist
    public void prePersist() {
           setRegistrationDate(LocalDate.now());
    }

    public Customer(String name, String cpf, String address, String phoneNumber, LocalDate birthday, String email) {
        this.name = name;
        this.cpf = cpf;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cpf='" + cpf + '\'' +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", registrationDate=" + registrationDate +
                '}';
    }
}
