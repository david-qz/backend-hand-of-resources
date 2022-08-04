const { AbstractModelBase } = require('./AbstractModelBase');

class Invention extends AbstractModelBase {
    static TABLE = 'inventions';
    static NOUN = 'invention';

    id;
    name;
    description;
    inventor;
    year;

    constructor(row) {
        super();
        this.id = row.id;
        this.name = row.name;
        this.description = row.description;
        this.inventor = row.inventor;
        this.year = row.year;
    }

    static async getAll() {
        return await super.getAll(['id', 'name']);
    }
}

module.exports.Invention = Invention;
