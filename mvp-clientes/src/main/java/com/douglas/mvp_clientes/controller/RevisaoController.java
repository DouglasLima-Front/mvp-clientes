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

        System.out.println("\n");
        System.out.println("====================================");
        System.out.println("NOVA TENTATIVA DE AGENDAMENTO");
        System.out.println("====================================");

        System.out.println(
                "Data recebida: "
                        + revisao.getDataRevisao()
        );

        List<Revisao> todas = repository.findAll();

        System.out.println(
                "Total de revisões cadastradas: "
                        + todas.size()
        );

        for (Revisao r : todas) {

            System.out.println(
                    "ID: " + r.getId()
                            + " | Data: "
                            + r.getDataRevisao()
            );

        }

        long quantidade =
                repository.countByDataRevisao(
                        revisao.getDataRevisao()
                );

        System.out.println(
                "Quantidade encontrada para esta data: "
                        + quantidade
        );

        System.out.println("====================================");

        if (quantidade >= 3) {

            throw new RuntimeException(
                    "Limite de 3 revisões por dia atingido."
            );

        }

        return repository.save(revisao);
    }
}