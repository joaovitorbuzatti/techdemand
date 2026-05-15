package com.techdemand.controller;

import com.techdemand.model.Demanda;
import com.techdemand.model.StatusDemanda;
import com.techdemand.service.DemandaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demandas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DemandaController {

    private final DemandaService demandaService;

    @GetMapping
    public List<Demanda> listarTodas() {
        return demandaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Demanda buscarPorId(@PathVariable Long id) {
        return demandaService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Demanda cadastrar(@RequestBody @Valid Demanda demanda) {
        return demandaService.cadastrar(demanda);
    }

    @PutMapping("/{id}")
    public Demanda atualizar(@PathVariable Long id, @RequestBody @Valid Demanda demanda) {
        return demandaService.atualizar(id, demanda);
    }

    @PatchMapping("/{id}/status")
    public Demanda atualizarStatus(@PathVariable Long id, @RequestParam StatusDemanda status) {
        return demandaService.atualizarStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        demandaService.excluir(id);
    }

    @GetMapping("/status/{status}")
    public List<Demanda> buscarPorStatus(@PathVariable StatusDemanda status) {
        return demandaService.buscarPorStatus(status);
    }

    @GetMapping("/buscar")
    public List<Demanda> buscarPorNomeCliente(@RequestParam String nomeCliente) {
        return demandaService.buscarPorNomeCliente(nomeCliente);
    }
}