# API para manutenção de laboratórios e exames

## Contexto

- Laboratório:
  - cadastrar um novo laborário;
  - obter uma lista de laboratórios ativos;
  - atualizar um laboratório existente;
  - remover logicamente um laboratório ativo.

- Exames:
  - cadastrar um novo exame;
  - obter uma lista de exames ativos;
  - atualizar um exame existente;
  - remover logicamente um exame ativo.

- Associação:
  - associar um exame ativo à um laboratório ativo;
  - desassociar um exame ativo de um laboratório ativo;

  **Importante:**

  - Um exame pode estar associado a mais de um laboratório;
  - O cadastro de um laboratório/exame é considerado ativo e recebe um `id` gerado automaticamente.

### Informações

- Laboratório
  - name
  - address
  - status [ativo, inativo]

- Exame
  - name
  - exam_type [analise clinica, imagem]
  - status [ativo, inativo]

## Tecnologias Utilizadas 

- NodeJS v14.15.5
- MySQL 8.0.26


## Arquitetura 

O projeto foi feito para arquitetura Models and Controllers

1. Config
2. Controllers
3. Infra
4. Models

## Modelagem de dados

![image](https://user-images.githubusercontent.com/49291866/128099957-35590f6b-ca8a-4dd3-a8d3-8e5538f7ebe4.png)


## Como executar
1. Clonar o projeto
2. Instalar o BD MySQL
3. Configurar as variáveis do banco no arquivo config/default.json
4. Executar no terminal o comando: nodemon index.js ou node index.js
5. Chamar os endpoints de acordo com as definições abaixo

## Execução
Os seguintes endpoints foram configurados
1. **``POST /exam``**: Cadastra exame, o id do exame é gerado automaticamente, e se não especificado o "status" fica como ativo
*Exemplo do corpo da requisição para Cadastro de Exame*
```javascript
{
    "name": "Ressonancia",
    "exam_type": "Imagem"
}
```

*Exemplo de response*

```javascript
{
    "id": 45,
    "name": "Ressonancia",
    "exam_type": "Imagem"
}
```

2. **``GET /exam:``**: Retorna todos os exames cadastrados.
```javascript
*Não possui corpo na requisição*
```

*Exemplo de response*

```javascript
[
    {
        "id": 15,
        "name": "Ressonancia",
        "exam_type": "Imagem",
        "status": "ativo"
    },
    {
        "id": 25,
        "name": "Ressonancia",
        "exam_type": "Imagem",
        "status": "ativo"
    },
    {
        "id": 35,
        "name": "Tomografia",
        "exam_type": "Imagem",
        "status": "ativo"
    },
    {
        "id": 45,
        "name": "Ressonancia",
        "exam_type": "Imagem",
        "status": "ativo"
    }
]
```

3. **``GET /exam/${id}``**: Retorna o exame cadastrado com o id especificado
```javascript
*Não possui corpo na requisição*
```

*Exemplo de response*

```javascript
{
    "id": 45,
    "name": "Ressonancia",
    "exam_type": "Imagem",
    "status": "ativo"
}
```

4. **``PATCH /exam/${id}``**: Requisita a atualização do id informado na URL com as novas informações daquele exame 
*Exemplo do corpo da requisição para Atualizar o Exame*
```javascript
{
    "name": "Tomografia", 
    "exam_type": "Imagem"
}
```

*Exemplo de response*

```javascript
{
    "id": 45,
    "name": "Tomografia",
    "exam_type": "Imagem"
}
```

5. **``DELETE /exam/${id}``**: Faz a remoção lógica do exame informado pelo id na URL (Remoção Lógica = colocar o status como inativo).
```javascript
*Não possui corpo na requisição*
```

*Exemplo de response*

```javascript
{
    "id": 45
}
```

6. **``POST /lab``**: Cadastra laboratorio, o id do laboratório é gerado automaticamente, e se não especificado o "status" fica como ativo 
*Exemplo do corpo da requisição para Cadastro de Laboratório*
```javascript
{
    "name": "Dr. Consulta Lab",
    "address": "Av Paulista,1000"
}
```

*Exemplo de response*

```javascript
{
    "id": 5,
    "name": "Dr. Consulta Lab",
    "address": "Av Paulista,1000"
}
```

7. **``GET /lab``**: Retorna todos os laboratórios cadastrados ativos
```javascript
*Não possui corpo na requisição*
```


*Exemplo de response*

```javascript
[
    {
        "id": 5,
        "name": "Dr. Consulta Lab",
        "address": "Av Paulista,1000",
        "status": "ativo"
    },
    {
        "id": 15,
        "name": "Delboni",
        "address": "Av Brasil, 500",
        "status": "ativo"
    }
]
```

8. **``GET /lab/${id}``**: Retorna o laboratório cadastrado, usando o id
```javascript
*Não possui corpo na requisição*
```

*Exemplo de response*

```javascript
{
    "id": 5,
    "name": "Dr. Consulta Lab",
    "address": "Av Paulista,1000",
    "status": "ativo"
}
```

9. **``PATCH /lab/${id}``**: Altera as informações dos campos do id informado 
*Exemplo do corpo da requisição para Atualizar o Exame*

```javascript
*Não possui corpo na requisição*
```

*Exemplo de response*

```javascript
{
    "id": 15,
    "name": "Lavoisier",
    "address": "Av Brasil, 500"
}
```

10. **``DELETE /lab/${id}``**: Remove logicamente o laboratório informado pelo id na URL (Remoção Lógica = colocar status como inativo).
*Exemplo do corpo da requisição para Atualizar o Laboratório*

```javascript
*Não possui corpo na requisição*
```

*Exemplo de response*

```javascript
{
    "id": 15
}
```

11. **``POST /labs_exam``**: Requisita um json, informando a associação do laboratório/exame
*Exemplo do corpo da requisição para Associar um Exame a um Laboratório*

```javascript
{
    "exam_id": "15",
    "lab_id": "5"
}
```

*Exemplo de response*
```javascript
{
    "id": 5,
    "exam_id": "15",
    "lab_id": "5"
}
```

12. **``DELETE /labs_exam/``**: Requisita a desassociação do id do exame com o do lab, pelo arquivo JSON
*Exemplo do corpo da requisição para Desassociar um Exame de um Laboratório*
```javascript
{
    "exam_id": "15",
    "lab_id": "5"
}
```

*Exemplo de response*
```javascript
{
    "exam_id": "15",
    "lab_id": "5"
}
```

