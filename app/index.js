const express = require('express');
const { queryPromise } = require('./queryPromise')

const listenApp = async () => {
  const app = express();
  const port = 3000;

  const createTable = `CREATE TABLE IF NOT EXISTS politicians(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;

  await queryPromise.query(createTable);

  const characters = [['Lula'], ['Bolsonaro'], ['Marina Silva'], ['Geraldo Alckmin'], ['Fernando Henrique Cardoso'], ['Dilma Rousseff'], ['Fernando Haddad'], ['Ciro Gomes']]
  const sqlInsert = `INSERT INTO politicians(name) VALUES ?`;

  await queryPromise.queryMultiple(sqlInsert, characters)

  app.get('/', async (req, res) => {
    const selectPoliticians = `SELECT * FROM politicians`
    const allPoliticians = await queryPromise.query(selectPoliticians)

    const html = `<h1>Full Cycle Rocks!</h1>\n
                  <ul>
                    ${allPoliticians.map(politician => `<li>${politician.name}</li>`).join('')}
                  </ul>`

    res.send(html)
  });

  return app.listen(port, () => {
    console.log('Rodando na porta ' + port);
  })
}

listenApp();

