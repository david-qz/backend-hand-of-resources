const { AbstractModelBase } = require('./AbstractModelBase');

class Captain extends AbstractModelBase {
    static TABLE = 'captains';
    static NOUN = 'captain';

    id;
    name;
    ship;
    association;

    constructor(row) {
        super();
        this.id = row.id;
        this.name = row.name;
        this.ship = row.ship;
        this.association = row.association;
    }

    static async getAll() {
        return await super.getAll(['id', 'name']);
    }

    static async getById(id) {
        return await super.getById(id);
    }

    static async insert(data) {
        return await super.insert(['name', 'ship', 'association'], data);
    }

    static async updateById(id, data) {
        return await super.updateById(id, ['name', 'ship', 'association'], data);
    }

    static async deleteById(id) {
        return await super.deleteById(id);
    }
}

module.exports.Captain = Captain;
