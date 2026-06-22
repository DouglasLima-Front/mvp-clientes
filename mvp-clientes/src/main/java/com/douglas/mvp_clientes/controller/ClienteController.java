package com.douglas.mvp_clientes.controller;

import com.douglas.mvp_clientes.model.Cliente;
import com.douglas.mvp_clientes.repository.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

        if (cliente.getDataCadastro() == null) {
            cliente.setDataCadastro(LocalDate.now());
        }

        return repository.save(cliente);
    }

    @PutMapping("/{id}")
    public Cliente atualizar(
            @PathVariable Long id,
            @RequestBody Cliente cliente) {

        cliente.setId(id);

        // Mantém a data original caso ela venha nula
        if (cliente.getDataCadastro() == null) {
            repository.findById(id)
                    .ifPresent(c -> cliente.setDataCadastro(c.getDataCadastro()));
        }

        return repository.save(cliente);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}