const express = require("express");
const app = express();
const { Pool } = require("pg");

/*
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_hotels",
  password: "",
  port: 5432,
});


const pool = new Pool({
user: "cyf06",
 host: "database-1.c7jkbbjyxtpj.us-east-1.rds.amazonaws.com",
 database: "cyf06",
  password: "VZi17s2c",
  port: 5432,
});



Host
ec2-34-248-169-69.eu-west-1.compute.amazonaws.com
Database
defqjch4sbhtq4
User
pjqvzvatuwouud
Port
5432
Password
79093ad9e03d2fbeb10c09200e918a975f442433c30f1622a96106bf4e3f04b8
URI
postgres://pjqvzvatuwouud:79093ad9e03d2fbeb10c09200e918a975f442433c30f1622a96106bf4e3f04b8@ec2-34-248-169-69.eu-west-1.compute.amazonaws.com:5432/defqjch4sbhtq4



URI is the PostgreSQL connection string
postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DB>
You can access the PostgreSQL via PSQL or
$ psql -h <HOST> -p <PORT> -U <USERNAME> -W <DB>

psql -h ec2-34-248-169-69.eu-west-1.compute.amazonaws.com -p 5432 -U pjqvzvatuwouud -W defqjch4sbhtq4

*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
        rejectUnauthorized: false
  }
});

const PORT = process.env.PORT || 3100;

// DATABASE_URL=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DB>

// export PORT=9999;
// export DATABASE_URL=postgres://cyf06:VZi17s2c@database-1.c7jkbbjyxtpj.us-east-1.rds.amazonaws.com:5432/cyf06

// export DATABASE_URL=postgres://cyf06:VZi17s2c@database-1.c7jkbbjyxtpj.us-east-1.rds.amazonaws.com:5432/cyf06?sslmode=disable

// psql -h <HOST> -p <PORT> -U <USERNAME> -W <DB>
app.get("/hotels", function (req, res) {
  pool
    .query("SELECT * FROM hotels")
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
