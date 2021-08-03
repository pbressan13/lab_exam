const dbConnect = require('../infra/connection')


class Exams {

  post(exam, res) {
    const nameIsValid = (exam.name.length >= 4 && exam.name.length <= 50)
    const examTypeIsValid = (exam.exam_type.length >= 4 && exam.exam_type.length <= 50)
    const statusIsValid = (exam.status == 'ativo' || exam.status == 'inativo' || exam.status == null)

    const dataValidation = [
      {
        name: 'name',
        valid: nameIsValid,
        message: 'Exam name must be between 4 to 50 chars'
      },
      {
        name: 'status',
        valid: statusIsValid,
        message: 'Status must be ativo or inativo'
      },
      {
        name: 'exam_type',
        valid: examTypeIsValid,
        message: 'Exam name must be between 4 to 50 chars'
      }
    ]

    const errors = dataValidation.filter(field => !field.valid)
    const errorExists = errors.length

    if (errorExists) {
      res.status(400).json(errors)
    } else {
      const sql = 'INSERT INTO EXAMS SET ?'

      dbConnect.query(sql, exam, (err, result) => {
        if (err) {
          res.status(400).json(err)
        } else {
          const id = result.insertId
          const z = Object.assign({ "id": id} , exam)
          res.status(201).json(z)
        }
      })
    }

  }

  get(res) {
    const sql = `SELECT * FROM EXAMS WHERE STATUS = 'ativo'`

    dbConnect.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  }

  getId(id, res) {
    const sql = `SELECT * FROM EXAMS WHERE ID=${id}`
    dbConnect.query(sql, (err, result) => {
      const exam = result[0]
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(exam)
      }

    })
  }

  patch(id, values, res) {
    const sql = 'UPDATE EXAMS SET ? WHERE ID=?'
    dbConnect.query(sql, [values, id], (err, result) => {
      if(err) {
        res.status(400).json(err)
      } else {
        res.status(200).json({id, ...values})
      }
    })
  }

  delete(id, res) {
    const sql = `UPDATE EXAMS SET STATUS = 'inativo' WHERE ID=?`
    dbConnect.query(sql, id, (err, result) => {
      if(err) {
        res.status(400).json(err)
      } else {
        res.status(200).json({id})
      }
    })
  }
}

module.exports = new Exams
