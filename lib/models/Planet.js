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
}

module.exports.Planet = Planet;
