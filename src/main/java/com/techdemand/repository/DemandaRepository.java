package com.techdemand.repository;


import com.techdemand.model.Demanda;
import com.techdemand.model.StatusDemanda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandaRepository extends JpaRepository<Demanda, Long> {

    List<Demanda> findByStatus(StatusDemanda status);

    List<Demanda> findByNomeClienteContainingIgnoreCase(String nomeCliente);
}
