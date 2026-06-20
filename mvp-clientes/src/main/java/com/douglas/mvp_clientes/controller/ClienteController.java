package com.douglas.mvp_clientes.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.douglas.mvp_clientes.model.Cliente;
import com.douglas.mvp_clientes.repository.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @GetMapping
    public List<Cliente> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> buscarPorId(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping
    public Cliente salvar(@RequestBody Cliente cliente) {
        return repository.save(cliente);
    }
}