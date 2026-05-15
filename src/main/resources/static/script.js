const API_URL = "http://localhost:8080/api/demandas";

const formDemanda = document.getElementById("formDemanda");
const tabelaDemandas = document.getElementById("tabelaDemandas");
const mensagem = document.getElementById("mensagem");
const campoBusca = document.getElementById("campoBusca");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");

const demandaId = document.getElementById("demandaId");
const nomeCliente = document.getElementById("nomeCliente");
const telefoneCliente = document.getElementById("telefoneCliente");
const tipoEquipamento = document.getElementById("tipoEquipamento");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const descricaoProblema = document.getElementById("descricaoProblema");
const observacoesTecnicas = document.getElementById("observacoesTecnicas");
const prioridade = document.getElementById("prioridade");
const statusDemanda = document.getElementById("status");

let demandas = [];

document.addEventListener("DOMContentLoaded", carregarDemandas);

formDemanda.addEventListener("submit", async function (event) {
    event.preventDefault();

    const demanda = {
        nomeCliente: nomeCliente.value,
        telefoneCliente: telefoneCliente.value,
        tipoEquipamento: tipoEquipamento.value,
        marca: marca.value,
        modelo: modelo.value,
        descricaoProblema: descricaoProblema.value,
        observacoesTecnicas: observacoesTecnicas.value,
        prioridade: prioridade.value,
        status: statusDemanda.value
    };

    if (demandaId.value) {
        await atualizarDemanda(demandaId.value, demanda);
    } else {
        await cadastrarDemanda(demanda);
    }
});

campoBusca.addEventListener("input", function () {
    const termo = campoBusca.value.toLowerCase();

    const demandasFiltradas = demandas.filter(demanda =>
        demanda.nomeCliente.toLowerCase().includes(termo)
    );

    renderizarTabela(demandasFiltradas);
});

btnCancelar.addEventListener("click", limparFormulario);

async function carregarDemandas() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar demandas.");
        }

        demandas = await resposta.json();

        renderizarTabela(demandas);
        atualizarDashboard();

    } catch (erro) {
        mostrarMensagem("Erro ao carregar demandas.", true);
        console.error(erro);
    }
}

async function cadastrarDemanda(demanda) {
    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(demanda)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar demanda.");
        }

        mostrarMensagem("Demanda cadastrada com sucesso!");
        limparFormulario();
        await carregarDemandas();

    } catch (erro) {
        mostrarMensagem("Não foi possível cadastrar a demanda.", true);
        console.error(erro);
    }
}

async function atualizarDemanda(id, demanda) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(demanda)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar demanda.");
        }

        mostrarMensagem("Demanda atualizada com sucesso!");
        limparFormulario();
        await carregarDemandas();

    } catch (erro) {
        mostrarMensagem("Não foi possível atualizar a demanda.", true);
        console.error(erro);
    }
}

async function excluirDemanda(id) {
    const confirmar = confirm("Tem certeza que deseja excluir esta demanda?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir demanda.");
        }

        mostrarMensagem("Demanda excluída com sucesso!");
        await carregarDemandas();

    } catch (erro) {
        mostrarMensagem("Não foi possível excluir a demanda.", true);
        console.error(erro);
    }
}

function editarDemanda(id) {
    const demanda = demandas.find(item => item.id === id);

    if (!demanda) {
        mostrarMensagem("Demanda não encontrada.", true);
        return;
    }

    demandaId.value = demanda.id;
    nomeCliente.value = demanda.nomeCliente;
    telefoneCliente.value = demanda.telefoneCliente;
    tipoEquipamento.value = demanda.tipoEquipamento;
    marca.value = demanda.marca;
    modelo.value = demanda.modelo || "";
    descricaoProblema.value = demanda.descricaoProblema;
    observacoesTecnicas.value = demanda.observacoesTecnicas || "";
    prioridade.value = demanda.prioridade;
    statusDemanda.value = demanda.status;

    tituloFormulario.textContent = "Editar demanda";
    btnCancelar.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function limparFormulario() {
    formDemanda.reset();
    demandaId.value = "";
    statusDemanda.value = "ABERTA";
    tituloFormulario.textContent = "Cadastrar nova demanda";
    btnCancelar.style.display = "none";
}

function renderizarTabela(lista) {
    tabelaDemandas.innerHTML = "";

    if (lista.length === 0) {
        tabelaDemandas.innerHTML = `
            <tr>
                <td colspan="7" class="texto-vazio">
                    Nenhuma demanda encontrada.
                </td>
            </tr>
        `;
        return;
    }

    lista.forEach(demanda => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>#${demanda.id}</td>
            <td>${demanda.nomeCliente}</td>
            <td>${formatarTipoEquipamento(demanda.tipoEquipamento)}<br><small>${demanda.marca} ${demanda.modelo || ""}</small></td>
            <td>${limitarTexto(demanda.descricaoProblema, 55)}</td>
            <td>
                <span class="tag prioridade-${demanda.prioridade}">
                    ${formatarPrioridade(demanda.prioridade)}
                </span>
            </td>
            <td>
                <span class="tag status-${demanda.status}">
                    ${formatarStatus(demanda.status)}
                </span>
            </td>
            <td>
                <div class="acoes">
                    <button class="btn-acao btn-editar" onclick="editarDemanda(${demanda.id})">
                        Editar
                    </button>
                    <button class="btn-acao btn-excluir" onclick="excluirDemanda(${demanda.id})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        tabelaDemandas.appendChild(linha);
    });
}

function atualizarDashboard() {
    document.getElementById("totalDemandas").textContent = demandas.length;

    document.getElementById("demandasAbertas").textContent =
        demandas.filter(demanda => demanda.status === "ABERTA").length;

    document.getElementById("demandasManutencao").textContent =
        demandas.filter(demanda => demanda.status === "EM_MANUTENCAO").length;

    document.getElementById("demandasFinalizadas").textContent =
        demandas.filter(demanda => demanda.status === "FINALIZADA").length;
}

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "#991b1b" : "#166534";

    setTimeout(() => {
        mensagem.textContent = "";
    }, 3500);
}

function limitarTexto(texto, limite) {
    if (!texto) {
        return "";
    }

    if (texto.length <= limite) {
        return texto;
    }

    return texto.substring(0, limite) + "...";
}

function formatarTipoEquipamento(tipo) {
    const tipos = {
        COMPUTADOR: "Computador",
        NOTEBOOK: "Notebook",
        IMPRESSORA: "Impressora",
        MONITOR: "Monitor",
        PERIFERICO: "Periférico",
        OUTRO: "Outro"
    };

    return tipos[tipo] || tipo;
}

function formatarPrioridade(prioridade) {
    const prioridades = {
        BAIXA: "Baixa",
        MEDIA: "Média",
        ALTA: "Alta",
        URGENTE: "Urgente"
    };

    return prioridades[prioridade] || prioridade;
}

function formatarStatus(status) {
    const statusFormatado = {
        ABERTA: "Aberta",
        AGUARDANDO_DIAGNOSTICO: "Aguardando diagnóstico",
        EM_MANUTENCAO: "Em manutenção",
        AGUARDANDO_PECA: "Aguardando peça",
        FINALIZADA: "Finalizada",
        CANCELADA: "Cancelada"
    };

    return statusFormatado[status] || status;
}