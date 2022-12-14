const { AbstractModelBase } = require('./AbstractModelBase');

class Beverage extends AbstractModelBase {
    static TABLE = 'beverages';
    static NOUN = 'beverage';

    id;
    name;
    rating;

    constructor(row) {
        super();
        this.id = row.id;
        this.name = row.name;
        this.rating = row.rating;
    }

    static async getAll() {
        return await super.getAll(['id', 'name']);
    }

    static async getById(id) {
        return await super.getById(id);
    }

    static async insert(data) {
        return await super.insert(['name', 'rating'], data);
    }

    static async updateById(id, data) {
        return await super.updateById(id, ['name', 'rating'], data);
    }

    static async deleteById(id) {
        return await super.deleteById(id);
    }
}

module.exports.Beverage = Beverage;
