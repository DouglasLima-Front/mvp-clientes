package com.douglas.mvp_clientes.repository;

import com.douglas.mvp_clientes.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}