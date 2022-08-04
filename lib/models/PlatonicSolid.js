const { AbstractModelBase } = require('./AbstractModelBase');

class PlatonicSolid extends AbstractModelBase {
    static TABLE = 'platonic_solids';
    static NOUN = 'platonic solid';

    id;
    name;
    vertices;
    edges;
    faces;
    schlafliSymbol;

    constructor(row) {
        super();
        this.id = row.id;
        this.name = row.name;
        this.vertices = row.vertices;
        this.edges = row.edges;
        this.faces = row.faces;
        this.schlafliSymbol = row.schlafli_symbol;
    }

    static async getAll() {
        return await super.getAll(['id', 'name']);
    }

    static async getById(id) {
        return await super.getById(id);
    }

    static async insert(data) {
        return await super.insert(
            ['name', 'vertices', 'edges', 'faces', 'schlafli_symbol'],
            data
        );
    }

    static async updateById(id, data) {
        return await super.updateById(
            id,
            ['name', 'vertices', 'edges', 'faces', 'schlafli_symbol'],
            data
        );
    }

    static async deleteById(id) {
        return await super.deleteById(id);
    }

    static modelToPostgresCase(data) {
        if(data.schlafliSymbol) {
            data.schlafli_symbol = data.schlafliSymbol;
            delete data.schlafliSymbol;
        }
    }
}

module.exports.PlatonicSolid = PlatonicSolid;
