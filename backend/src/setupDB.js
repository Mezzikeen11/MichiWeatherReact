const db = require("./config/db");

const setup = async () => {
  try {
    const existeUsuarios = await db.schema.hasTable("usuarios");
    if (!existeUsuarios) {
      await db.schema.createTable("usuarios", (table) => {
        table.increments("id").primary();
        table.string("nombre");
        table.string("email").unique();
        table.string("password");
        table.timestamp("creado").defaultTo(db.fn.now());
      });
      console.log("✅ Tabla usuarios creada");
    }

    const existeConsultas = await db.schema.hasTable("consultas");
    if (!existeConsultas) {
      await db.schema.createTable("consultas", (table) => {
        table.increments("id").primary();
        table.string("ciudad");
        table.float("lat");
        table.float("lon");
        table.json("respuesta");
        table.timestamp("fecha").defaultTo(db.fn.now());
      });
      console.log("✅ Tabla consultas creada");
    }

    const existeCache = await db.schema.hasTable("cache");
    if (!existeCache) {
      await db.schema.createTable("cache", (table) => {
        table.increments("id").primary();
        table.string("ciudad").unique();
        table.json("datos");
        table.timestamp("expiracion");
      });
      console.log("✅ Tabla cache creada");
    }

    console.log("✅ Base de datos lista");
  } catch (error) {
    console.error("❌ Error creando tablas:", error);
    throw error;
  }
};

if (require.main === module) {
  setup()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = setup;
