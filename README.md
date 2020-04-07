# nestjs-typeorm-graphql

This is a basic service by using NestJS + TypeORM + GraphQL as tech stack.
The idea is to show some example of all those combined frameworks/tools running
altogether.

--- 

### **Instalation**
- Choose any database technology that is supported by TypeORM (MySQL, MariaDB, Postgres, etc). Create a database named `nestjs-typeorm-graphql` or any convenient name you wish. If you chose a different name, then go to `.env` and add the new database name to `TYPEORM_DATABASE` environment variable.

- `npm install`
- `npm run migrate`
- `npm start`

These commands will make the application ready to run under the port number is configured within `SERVER_PORT` environment variable.

---

### **Running from a container**

- Install `Docker engine` and `Docker compose` as dependencies for a containerized application.
- `docker compose up`

This will create a container for a MySQL instance and for your web application.

---

### **Running**

You can run the service by accessing GraphQL's playground from a browser windows. You simply need to type: `http://localhost:<PORT_NUMBER>/graphql` and you will see the playground.
