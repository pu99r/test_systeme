import sqlite3 from "sqlite3";
let db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            name TEXT,
            options OBJECT,
            active INTEGER,
            createdAt TEXT
          )`);
  const data = [
    {
      id: 14381328,
      name: "id quis voluptate nostrud",
      options: `{"size":"XL","amount":100}`,
      active: 1,
      createdAt: "1985-08-09T02:10:18.0Z",
    },
    {
      id: 26785188,
      name: "esse elit",
      options: '{"size":"S","amount":10}',
      active: 1,
      createdAt: "1956-03-20T08:59:40.0Z",
    },
    {
      id: 63878634,
      name: "enim",
      options: '{"size":"L","amount":20}',
      active: 0,
      createdAt: "2016-07-27T16:05:57.0Z",
    },
    {
      id: 79901249,
      name: "eu ad",
      options: '{"size":"XXL","amount":1000}',
      active: 1,
      createdAt: "1988-08-20T03:53:24.0Z",
    },
    {
      id: 53113051,
      name: "proident ipsum",
      options: '{"size":"XL","amount":4}',
      active: 1,
      createdAt: "2003-01-19T20:09:29.0Z",
    },
    {
      id: 49132779,
      name: "aliqua adipisicing",
      options: '{"size":"S","amount":22}',
      active: 0,
      createdAt: "2003-06-14T02:44:44.0Z",
    },
    {
      id: 12135250,
      name: "dolor non in sunt",
      options: '{"size":"M","amount":11}',
      active: 1,
      createdAt: "2000-08-04T19:49:04.0Z",
    },
    {
      id: 47196404,
      name: "dolor culpa in cupidatat",
      options: '{"size":"S","amount":1}',
      active: 0,
      createdAt: "2003-11-15T23:56:45.0Z",
    },
    {
      id: 5112903,
      name: "sunt amet do eu ipsum",
      options: '{"size":"L","amount":10}',
      active: 0,
      createdAt: "1968-09-24T22:07:21.0Z",
    },
    {
      id: 32497729,
      name: "eiusmod",
      options: '{"size":"XXL","amount":0}',
      active: 1,
      createdAt: "2012-09-24T01:42:32.0Z",
    },
  ];

  const stmt = db.prepare(
    "INSERT INTO items (id, name, options, active, createdAt) VALUES (?, ?, ?, ?, ?)"
  );
  data.forEach((row) => {
    stmt.run(row.id, row.name, row.options, row.active, row.createdAt);
  });
  stmt.finalize();
});

export default db;
