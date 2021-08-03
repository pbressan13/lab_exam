const dbConnect = require('../infra/connection')


class Labs {

  post(lab, res) {
    const nameIsValid = (lab.name.length >= 4 && lab.name.length <= 50)
    const statusIsValid = (lab.status == 'ativo' || lab.status == 'inativo' || lab.status == null)

    const dataValidation = [
      {
        name: 'name',
        valid: nameIsValid,
        message: 'Lab name must be between 4 to 50 chars'
      },
      {
        name: 'status',
        valid: statusIsValid,
        message: 'Status must be ativo or inativo'
      }
    ]

    const errors = dataValidation.filter(field => !field.valid)
    const errorExists = errors.length

    if (errorExists) {
      res.status(400).json(errors)
    } else {
      const sql = 'INSERT INTO LABS SET ?'

      dbConnect.query(sql, lab, (err, result) => {
        if (err) {
          res.status(400).json(err)
        } else {
          const id = result.insertId
          const z = Object.assign({ "id": id} , lab)
          res.status(201).json(z)
        }
      })
    }

  }

  get(res) {
    const sql = 'SELECT * FROM LABS'

    dbConnect.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  }

  getId(id, res) {
    const sql = `SELECT * FROM LABS WHERE ID=${id}`
    dbConnect.query(sql, (err, result) => {
      const lab = result[0]
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(lab)
      }

    })
  }

  patch(id, values, res) {
    const sql = 'UPDATE LABS SET ? WHERE ID=?'
    dbConnect.query(sql, [values, id], (err, result) => {
      if(err) {
        res.status(400).json(err)
      } else {
        res.status(200).json({id, ...values})
      }
    })
  }

  delete(id, res) {
    const sql = 'DELETE FROM LABS WHERE ID=?'
    dbConnect.query(sql, id, (err, result) => {
      if(err) {
        res.status(400).json(err)
      } else {
        res.status(200).json({id})
      }
    })
  }


}



module.exports = new Labs
