const dbConnect = require('../infra/connection')

class LabsExams {

  assoc(exam_assoc, res) {
    const sql = 'INSERT INTO LABS_EXAMS SET ?'

    dbConnect.query(sql, exam_assoc, (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        const id = result.insertId
        const resultFinal = Object.assign({ "id": id }, exam_assoc)
        res.status(201).json(resultFinal)
      }
    })
  }

  delete(exam_assoc, res) {
    const sql = `DELETE FROM LABS_EXAMS WHERE exam_id=${exam_assoc.exam_id} AND lab_id=${exam_assoc.lab_id}`
    dbConnect.query(sql, exam_assoc, (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else if (result.affectedRows == 0) {
        res.status(404).json(exam_assoc)
      } else {
        res.status(200).json(exam_assoc)
      }
    })
  }
}

module.exports = new LabsExams
