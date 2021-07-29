const dbPromisePool = require('./config').promise();

module.exports = {
    query: async (name) => {
        const path = require('path');
        const fs = require('fs');
        const sqlFile = await fs.promises.readFile(path.join(__dirname, './sql/' + name + '.sql'));
        const sql = await sqlFile.toString();
        const [rows, fields] = await dbPromisePool.query(sql);

        return rows;
    },
    sqlQuery: async (sql) => {
        return dbPromisePool.query(sql);
    }
}