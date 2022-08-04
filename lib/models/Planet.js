const { AbstractModelBase } = require('./AbstractModelBase');

class Planet extends AbstractModelBase {
    static TABLE = 'planets';
    static NOUN = 'planet';

    id;
    name;
    mass_kg;
    mean_radius_km;
    aphelion_au;
    perihelion_au;

    constructor(row) {
        super();
        this.id = row.id;
        this.name = row.name;
        this.mass_kg = row.mass_kg;
        this.mean_radius_km = row.mean_radius_km;
        this.aphelion_au = row.aphelion_au;
        this.perihelion_au = row.perihelion_au;
    }

    static async getAll() {
        return await super.getAll(['id', 'name']);
    }

    static async getById(id) {
        return await super.getById(id);
    }

    static async insert(data) {
        return await super.insert([
            'name',
            'mass_kg',
            'mean_radius_km',
            'aphelion_au',
            'perihelion_au'
        ], data);
    }

    static async updateById(id, data) {
        return await super.updateById(id, [
            'name',
            'mass_kg',
            'mean_radius_km',
            'aphelion_au',
            'perihelion_au'
        ], data);
    }

    static async deleteById(id) {
        return await super.deleteById(id);
    }
}

module.exports.Planet = Planet;
