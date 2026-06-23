package com.douglas.mvp_clientes.repository;

import com.douglas.mvp_clientes.model.Revisao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface RevisaoRepository extends JpaRepository<Revisao, Long> {

    long countByDataRevisao(LocalDate dataRevisao);

}