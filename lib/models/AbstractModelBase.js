const pool = require('../utils/pool');
const ErrorWithStatus = require('../utils/ErrorWithStatus');

/*
 * A abstract base class for a model with no relational data.
 */
class AbstractModelBase {
    static TABLE = 'you_forgot_to_override_this';
    static NOUN = 'you_forgot_to_override_this';

    constructor() {
    }

    // A bunch of very ugly generalized sql queries. To whoever is reading this file, I'm sorry.
    static async getAll(columns) {
        const sqlColumnList = columns.join(', ');

        const { rows } = await pool.query(
            `select ${sqlColumnList} from ${this.TABLE};`
        );

        return rows.map(x => new this(x));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `select * from ${this.TABLE} where id = $1;`,
            [id]
        );

        if (rows.length !== 1) {
            throw new ErrorWithStatus(`no ${this.NOUN} with id=${id}`, 404);
        }

        return new this(rows[0]);
    }

    static async insert(columns, data) {
        this.modelToPostgresCase(data);

        const sqlColumnList = columns.join(', ');
        const pgBindings = columns.map((x, i) => '$' + (i + 1)).join(', ');

        const { rows } = await pool.query(
            `insert into ${this.TABLE} (${sqlColumnList})
             values (${pgBindings})
             returning *;`,
            [...columns.map(x => data[x])]
        );

        return new this(rows[0]);
    }

    static async updateById(id, columns, data) {
        const instance = await this.getById(id);

        this.modelToPostgresCase(instance);
        this.modelToPostgresCase(data);

        const updatedData = { ...instance, ...data };

        const sqlAssignment = columns.map((x, i) => `${x} = $${i + 1}`).join(', ');
        const idBinding = '$' + (columns.length + 1);

        const { rows } = await pool.query(
            `update ${this.TABLE}
             set ${sqlAssignment}
             where id = ${idBinding}
             returning *;`,
            [...columns.map(x => updatedData[x]), id]
        );

        return new this(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            `delete from ${this.TABLE}
             where id = $1
             returning *;`,
            [id]
        );

        if (rows.length !== 1) {
            throw new ErrorWithStatus(`no ${this.NOUN} with id=${id}`, 404);
        }

        return new this(rows[0]);
    }

    // eslint-disable-next-line no-unused-vars
    static modelToPostgresCase(data) {}
}

module.exports.AbstractModelBase = AbstractModelBase;
