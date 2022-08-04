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
}

module.exports.Beverage = Beverage;
