class Tables {
  init(dbConnect) {
    //console.log('Tables were created')
    this.dbConnect = dbConnect
    this.createExams()
    this.createLabs()
    this.createExamLabs()
  }
  createExams() {
    const examSql = "CREATE TABLE IF NOT EXISTS EXAMS (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, exam_type varchar(50) NOT NULL, status ENUM('ativo', 'inativo') not null DEFAULT 'ativo', PRIMARY KEY(id))"

    this.dbConnect.query(examSql, err => {
      if(err) {
        console.log("Unable to create table EXAMS")
      } else {
        console.log("Table EXAMS created successfully")
      }
    })
  }
  createLabs() {
    const labsSql = "CREATE TABLE IF NOT EXISTS LABS (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, address varchar(100) NOT NULL, status ENUM('ativo', 'inativo') not null DEFAULT 'ativo', PRIMARY KEY(id))"

    this.dbConnect.query(labsSql, err => {
      if (err) {
        console.log("Unable to create table LABS")
      } else {
        console.log("Table LABS created successfully")
      }
    })
  }
  createExamLabs() {
    const examLabsSql = "CREATE TABLE IF NOT EXISTS LABS_EXAMS (id int NOT NULL AUTO_INCREMENT, exam_id int NOT NULL, lab_id int NOT NULL, PRIMARY KEY(id), UNIQUE KEY(exam_id,lab_id), FOREIGN KEY (exam_id) REFERENCES EXAMS(id), FOREIGN KEY(lab_id) REFERENCES LABS(id))"

    this.dbConnect.query(examLabsSql, err => {
      if (err) {
        console.log("Unable to create table LABS_EXAMS")
      } else {
        console.log("Table LABS_EXAMS created successfully")
      }
    })
  }
}

module.exports = new Tables
