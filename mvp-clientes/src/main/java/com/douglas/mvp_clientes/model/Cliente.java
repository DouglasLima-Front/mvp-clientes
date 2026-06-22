package com.douglas.mvp_clientes.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String telefone;

    private Boolean locatario;

    private String placaMoto;

    private String observacoes;

    private LocalDate dataCadastro;

    public Cliente() {
    }

    public Cliente(
            Long id,
            String nome,
            String telefone,
            Boolean locatario,
            String placaMoto,
            String observacoes,
            LocalDate dataCadastro) {

        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.locatario = locatario;
        this.placaMoto = placaMoto;
        this.observacoes = observacoes;
        this.dataCadastro = dataCadastro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Boolean getLocatario() {
        return locatario;
    }

    public void setLocatario(Boolean locatario) {
        this.locatario = locatario;
    }

    public String getPlacaMoto() {
        return placaMoto;
    }

    public void setPlacaMoto(String placaMoto) {
        this.placaMoto = placaMoto;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}