package com.douglas.mvp_clientes.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "revisoes")
public class Revisao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataRevisao;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    public Revisao() {
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDataRevisao() {
        return dataRevisao;
    }

    public void setDataRevisao(LocalDate dataRevisao) {
        this.dataRevisao = dataRevisao;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}