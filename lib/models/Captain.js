const pool = require('../utils/pool');
const ErrorWithStatus = require('../utils/ErrorWithStatus');

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

    static async getById(id) {
        const { rows } = await pool.query(
            'select * from captains where id = $1',
            [id]
        );

        if (rows.length !== 1) {
            throw new ErrorWithStatus(`no captain with id=${id}`, 404);
        }

        return new Captain(rows[0]);
    }

    static async insert({ name, ship, association }) {
        const { rows } = await pool.query(
            `insert into captains (name, ship, association)
            values ($1, $2, $3)
            returning *;`,
            [name, ship, association]
        );

        return new Captain(rows[0]);
    }

    static async updateById(id, data) {
        const captain = await Captain.getById(id);

        const updatedData = { ...captain, ...data };

        const { rows } = await pool.query(
            `update captains
            set name = $2, ship = $3, association = $4
            where id = $1
            returning *`,
            [id, updatedData.name, updatedData.ship, updatedData.association]
        );

        return new Captain(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            `delete from captains
            where id = $1
            returning *;`,
            [id]
        );

        return new Captain(rows[0]);
    }
}

module.exports.Captain = Captain;
