package com.douglas.mvp_clientes.controller;

import com.douglas.mvp_clientes.model.Revisao;
import com.douglas.mvp_clientes.repository.RevisaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/revisoes")
@CrossOrigin(origins = "*")
public class RevisaoController {

    @Autowired
    private RevisaoRepository repository;

    @GetMapping
    public List<Revisao> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Revisao agendar(@RequestBody Revisao revisao) {

        long quantidade =
                repository.countByDataRevisao(
                        revisao.getDataRevisao()
                );

        System.out.println(
                "=================================="
        );

        System.out.println(
                "Data recebida: "
                        + revisao.getDataRevisao()
        );

        System.out.println(
                "Quantidade encontrada: "
                        + quantidade
        );

        System.out.println(
                "=================================="
        );

        if (quantidade >= 3) {

            throw new RuntimeException(
                    "Limite de 3 revisões por dia atingido."
            );

        }

        return repository.save(revisao);
    }
}