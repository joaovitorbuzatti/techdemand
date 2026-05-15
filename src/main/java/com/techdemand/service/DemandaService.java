package com.techdemand.service;

import com.techdemand.exception.RecursoNaoEncontradoException;
import com.techdemand.model.Demanda;
import com.techdemand.model.StatusDemanda;
import com.techdemand.repository.DemandaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DemandaService {

    private final DemandaRepository demandaRepository;

    public List<Demanda> listarTodas() {
        return demandaRepository.findAll();
    }

    public Demanda buscarPorId(Long id) {
        return demandaRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Demanda não encontrada com o ID: " + id));
    }

    public Demanda cadastrar(Demanda demanda) {
        demanda.setStatus(StatusDemanda.ABERTA);
        return demandaRepository.save(demanda);
    }

    public Demanda atualizar(Long id, Demanda demandaAtualizada) {
        Demanda demandaExistente = buscarPorId(id);

        demandaExistente.setNomeCliente(demandaAtualizada.getNomeCliente());
        demandaExistente.setTelefoneCliente(demandaAtualizada.getTelefoneCliente());
        demandaExistente.setTipoEquipamento(demandaAtualizada.getTipoEquipamento());
        demandaExistente.setMarca(demandaAtualizada.getMarca());
        demandaExistente.setModelo(demandaAtualizada.getModelo());
        demandaExistente.setDescricaoProblema(demandaAtualizada.getDescricaoProblema());
        demandaExistente.setObservacoesTecnicas(demandaAtualizada.getObservacoesTecnicas());
        demandaExistente.setPrioridade(demandaAtualizada.getPrioridade());
        demandaExistente.setStatus(demandaAtualizada.getStatus());

        return demandaRepository.save(demandaExistente);
    }

    public Demanda atualizarStatus(Long id, StatusDemanda novoStatus) {
        Demanda demanda = buscarPorId(id);
        demanda.setStatus(novoStatus);
        return demandaRepository.save(demanda);
    }

    public void excluir(Long id) {
        Demanda demanda = buscarPorId(id);
        demandaRepository.delete(demanda);
    }

    public List<Demanda> buscarPorStatus(StatusDemanda status) {
        return demandaRepository.findByStatus(status);
    }

    public List<Demanda> buscarPorNomeCliente(String nomeCliente) {
        return demandaRepository.findByNomeClienteContainingIgnoreCase(nomeCliente);
    }
}