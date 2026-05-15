# TechDemand

Sistema de gerenciamento de demandas para assistência técnica de hardware, desenvolvido com Java, Spring Boot e frontend em HTML, CSS e JavaScript puro.

## Sobre o projeto

O TechDemand é uma aplicação web criada para registrar e acompanhar demandas de manutenção de equipamentos de hardware, como computadores, notebooks, impressoras, monitores e periféricos.

A proposta do sistema é permitir que uma assistência técnica cadastre a entrada de equipamentos, registre os dados do cliente, descreva o problema relatado, defina a prioridade do atendimento e acompanhe o status da demanda até sua finalização.

## Funcionalidades

- Cadastro de demandas
- Listagem de demandas registradas
- Edição de informações
- Exclusão de demandas
- Busca por nome do cliente
- Controle de prioridade
- Controle de status
- Dashboard com resumo das demandas

## Tecnologias utilizadas

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- Bean Validation
- Lombok
- HTML
- CSS
- JavaScript

## Estrutura do projeto

O backend foi organizado em camadas:

- `controller`: responsável pelos endpoints da API
- `service`: responsável pelas regras de negócio
- `repository`: responsável pelo acesso ao banco de dados
- `model`: responsável pelas entidades e enums
- `exception`: responsável pelo tratamento de erros da aplicação

## Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/joaovitorbuzatti/techdemand.git
```

Entre na pasta do projeto:

```bash
cd techdemand
```

Execute a aplicação:

```bash
mvn spring-boot:run
```

Depois acesse no navegador:

```text
http://localhost:8080
```

## Banco de dados H2

O projeto utiliza banco de dados H2 em memória para facilitar testes e demonstração.

Console do H2:

```text
http://localhost:8080/h2-console
```

JDBC URL:

```text
jdbc:h2:mem:techdemanddb
```

Usuário:

```text
sa
```

Senha:

```text
deixe em branco
```

## Principais endpoints da API

```text
GET    /api/demandas
POST   /api/demandas
GET    /api/demandas/{id}
PUT    /api/demandas/{id}
PATCH  /api/demandas/{id}/status?status=EM_MANUTENCAO
DELETE /api/demandas/{id}
GET    /api/demandas/buscar?nomeCliente=João
```

## Exemplos de status disponíveis

```text
ABERTA
AGUARDANDO_DIAGNOSTICO
EM_MANUTENCAO
AGUARDANDO_PECA
FINALIZADA
CANCELADA
```

## Exemplos de prioridades disponíveis

```text
BAIXA
MEDIA
ALTA
URGENTE
```

## Exemplos de tipos de equipamento

```text
COMPUTADOR
NOTEBOOK
IMPRESSORA
MONITOR
PERIFERICO
OUTRO
```

## Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar conceitos fundamentais de desenvolvimento backend com Java e Spring Boot, incluindo criação de API REST, organização em camadas, persistência de dados com JPA, validação de dados, tratamento de exceções e integração com frontend puro.

## Autor

Desenvolvido por João Vitor Buzatti.
