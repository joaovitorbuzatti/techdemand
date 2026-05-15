package com.techdemand.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "demandas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Demanda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do cliente é obrigatório.")
    @Column(nullable = false)
    private String nomeCliente;

    @NotBlank(message = "O telefone do cliente é obrigatório.")
    @Column(nullable = false)
    private String telefoneCliente;

    @NotNull(message = "O tipo do equipamento é obrigatório.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoEquipamento tipoEquipamento;

    @NotBlank(message = "A marca do equipamento é obrigatória.")
    @Column(nullable = false)
    private String marca;

    private String modelo;

    @NotBlank(message = "A descrição do problema é obrigatória.")
    @Column(nullable = false, length = 1000)
    private String descricaoProblema;

    private String observacoesTecnicas;

    @NotNull(message = "A prioridade é obrigatória.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PrioridadeDemanda prioridade;

    @NotNull(message = "O status é obrigatório.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusDemanda status;

    private LocalDateTime dataAbertura;

    private LocalDateTime dataAtualizacao;

    private LocalDateTime dataFinalizacao;

    @PrePersist
    public void aoCriar() {
        this.dataAbertura = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();

        if (this.status == null) {
            this.status = StatusDemanda.ABERTA;
        }
    }

    @PreUpdate
    public void aoAtualizar() {
        this.dataAtualizacao = LocalDateTime.now();

        if (this.status == StatusDemanda.FINALIZADA && this.dataFinalizacao == null) {
            this.dataFinalizacao = LocalDateTime.now();
        }
    }
}
