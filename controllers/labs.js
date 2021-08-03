const Labs = require('../models/labs')

module.exports = app => {
  app.get('/lab', (req, res) => {
    Labs.get(res)
  })

  app.get('/lab/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Labs.getId(id, res)

  })

  app.post('/lab', (req,res,next) => {
    const lab = req.body
    Labs.post(lab, res)
  })

  app.patch('/lab/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body

    Labs.patch(id, values, res)
  })

  app.delete('/lab/:id', (req,res) => {
    const id = parseInt(req.params.id)
    Labs.delete(id, res)
  })
}
