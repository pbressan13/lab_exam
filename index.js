const express = require('express')

const app = express()

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

app.get('/exam', (req, res) => res.send('Você está na rota de exames'))