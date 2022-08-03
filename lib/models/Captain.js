const pool = require('../utils/pool');

class Captain {
    id;
    name;
    ship;
    association;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.ship = row.ship;
        this.association = row.association;
    }

    static async getAll() {
        const { rows } = await pool.query(
            'select id, name from captains;'
        );

        return rows.map(x => new Captain(x));
    }
}

module.exports.Captain = Captain;
