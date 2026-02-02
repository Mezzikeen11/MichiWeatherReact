const db = require("./config/db");

const setup = async () => {
  try {
    // ---------------- USUARIOS ----------------
    const existeUsuarios = await db.schema.hasTable("usuarios");

    if (!existeUsuarios) {
      await db.schema.createTable("usuarios", (table) => {
        table.increments("id").primary();
        table.string("nombre").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.string("michi").nullable(); // 👈 aquí vive el michi
        table.timestamp("creado").defaultTo(db.fn.now());
      });

      console.log("✅ Tabla usuarios creada");
    } else {
      // Si la tabla ya existe, verificamos solo la columna michi
      const tieneMichi = await db.schema.hasColumn("usuarios", "michi");

      if (!tieneMichi) {
        await db.schema.table("usuarios", (table) => {
          table.string("michi").nullable();
        });

        console.log("✅ Columna michi agregada a usuarios");
      }
    }

    // ---------------- CONSULTAS ----------------
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

    // ---------------- CACHE ----------------
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
  }
};

module.exports = setup;
