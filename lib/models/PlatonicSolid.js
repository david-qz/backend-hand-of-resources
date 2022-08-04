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
}

module.exports.PlatonicSolid = PlatonicSolid;
