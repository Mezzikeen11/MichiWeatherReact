const db = require("./config/db");

const setup = async () => {
  try {
    // Usuarios
    const existeUsuarios = await db.schema.hasTable("usuarios");
    if (!existeUsuarios) {
      await db.schema.createTable("usuarios", (table) => {
        table.increments("id").primary();
        table.string("nombre");
        table.string("email").unique();
        table.string("password");
      });
      console.log("Tabla usuarios creada");
    }

    // Consultas
    const existeConsultas = await db.schema.hasTable("consultas");
    if (!existeConsultas) {
      await db.schema.createTable("consultas", (table) => {
        table.increments("id").primary();
        table.string("ciudad");
        table.float("lat");
        table.float("lon");
        table.jsonb("respuesta");
        table.timestamp("fecha").defaultTo(db.fn.now());
      });
      console.log("Tabla consultas creada");
    }

    // Cache
    const existeCache = await db.schema.hasTable("cache");
    if (!existeCache) {
      await db.schema.createTable("cache", (table) => {
        table.increments("id").primary();
        table.string("ciudad").unique();
        table.jsonb("datos");
        table.timestamp("expiracion");
      });
      console.log("Tabla cache creada");
    }

    console.log("Base lista");
    process.exit(0);

  } catch (err) {
    console.error("Error creando tablas:", err);
    process.exit(1);
  }
};

setup();

