const pool = require('../utils/pool');
const ErrorWithStatus = require('../utils/ErrorWithStatus');

class Planet {
    id;
    name;
    mass_kg;
    mean_radius_km;
    aphelion_au;
    perihelion_au;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.mass_kg = row.mass_kg;
        this.mean_radius_km = row.mean_radius_km;
        this.aphelion_au = row.aphelion_au;
        this.perihelion_au = row.perihelion_au;
    }

    static async getAll() {
        const { rows } = await pool.query(
            'select id, name from planets;'
        );

        return rows.map(x => new Planet(x));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'select * from planets where id = $1;',
            [id]
        );

        if (rows.length !== 1) {
            throw new ErrorWithStatus(`no planet with id=${id}`, 404);
        }

        return new Planet(rows[0]);
    }

    static async insert({ name, mass_kg, mean_radius_km, aphelion_au, perihelion_au }) {
        const { rows } = await pool.query(
            `insert into planets (name, mass_kg, mean_radius_km, aphelion_au, perihelion_au)
            values ($1, $2, $3, $4, $5)
            returning *;`,
            [name, mass_kg, mean_radius_km, aphelion_au, perihelion_au]
        );

        return new Planet(rows[0]);
    }
}

module.exports.Planet = Planet;
