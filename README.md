API para manutenção de laboratórios e exames

#Contexto

API para as seguintes situações:

Laboratório:

cadastrar um novo laborário;
obter uma lista de laboratórios ativos;
atualizar um laboratório existente;
remover logicamente um laboratório ativo.
Exames:

cadastrar um novo exame;
obter uma lista de exames ativos;
atualizar um exame existente;
remover logicamente um exame ativo.
Associação:

associar um exame ativo à um laboratório ativo;
desassociar um exame ativo de um laboratório ativo;
Importante:

Um exame pode estar associado a mais de um laboratório;
O cadastro de um laboratório/exame é considerado ativo e recebe um id gerado automaticamente.
Informações

Laboratório

name
address
status [ativo, inativo]
Exame

name
exam_type [analise clinica, imagem]
status [ativo, inativo]
Tecnologias Utilizadas
NodeJS v14.15.5
MySQL 8.0.26
Arquitetura
O projeto foi feito para arquitetura Models and Controllers

main:

Config
Controllers
Infra
Models
Modelagem de dados
image

Como executar
Clonar o projeto
Instalar o BD MySQL
Configurar as variáveis do banco no arquivo config/default.json
Executar no terminal o comando: nodemon index.js ou node index.js
Chamar os endpoints de acordo com as definições abaixo
Como testar
O sistema possui os endpoint abaixo:

POST /exam: Cadastra exame, o id do exame é gerado automaticamente, e se não especificado o "status" fica como ativo Exemplo do corpo da requisição para Cadastro de Exame
{
    "name": "Ressonancia",
    "exam_type": "Imagem"
}
GET /exam: Retorna todos os exames cadastrados
*Não possui corpo na requisição*
GET /exam/${id}: Retorna o exame cadastrados
*Não possui corpo na requisição*
PATCH /exam/${id}: Requisita a atualização do id informado na URL com as novas informações daquele exame Exemplo do corpo da requisição para Atualizar o Exame
{
    "name": "Glicose",
    "exam_type": "coleta",
    "status": "inativo"
}
DELETE /exam/${id}: Requisita a remoção lógica do exame informado pelo id na URL (Remoção Lógica = Inativar o status do exame).
*Não possui corpo na requisição*
POST /lab: Cadastra laboratorio, o id do laboratório é gerado automaticamente, e se não especificado o "status" fica como ativo Exemplo do corpo da requisição para Cadastro de Laboratório
{
    "name": "Dr. Consulta Lab",
    "address": "Av Paulista,1000"
}
GET /lab: Retorna todos os laboratórios cadastrados
*Não possui corpo na requisição*
GET /lab/${id}: Retorna o laboratório cadastrado, usando o id
*Não possui corpo na requisição*
PATCH /lab/${id}: Requisita a atualização do id informado na URL com as novas informações daquele laboratório Exemplo do corpo da requisição para Atualizar o Exame
{
    "name": "Dr. Consulta Lab",
    "address": "Av Paulista,2000"
}
DELETE /lab/${id}: Requisita a remoção lógica do laboratório informado pelo id na URL (Remoção Lógica = Inativar o status do lab).
*Não possui corpo na requisição*
POST /labs_exam: Requisita um json, informando a associação do laboratório/exame Exemplo do corpo da requisição para Associar um Exame a um Laboratório
{
    "exam_id": "43",
    "lab_id": "2"
}
DELETE /labs_exam: Requisita a desassociação do id do exame com o do lab, pelo arquivo JSON Exemplo do corpo da requisição para Desassociar um Exame de um Laboratório
{
    "exam_id": "43",
    "lab_id": "2"
}
