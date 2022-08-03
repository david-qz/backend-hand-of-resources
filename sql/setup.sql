-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists captains;
drop table if exists planets;
drop table if exists beverages;
drop table if exists inventions;
drop table if exists platonic_solids;

create table captains (
    id bigint generated always as identity primary key,
    name varchar not null,
    ship varchar not null,
    association varchar
);

insert into captains (name, ship, association)
values
    ('Captain Jean Luc Picard', 'USS Enterprise-D', 'United Federation of Planets'),
    ('Captain Ahab', 'Pequod', 'Nantucket Whalers'),
    ('Captain Jack Sparrow', 'Black Pearl', 'Caribbean Pirates'),
    ('Captain Crunch', 'Guppy', 'Sea of Milk Armada');

create table planets (
    id bigint generated always as identity primary key,
    name varchar not null,
    mass_kg decimal not null,
    mean_radius_km decimal not null,
    aphelion_au decimal not null,
    perihelion_au decimal not null
);

insert into planets (name, mass_kg, mean_radius_km, aphelion_au, perihelion_au)
values
    ('Mercury', 3.3011e23, 2439.7, 0.467, 0.307),
    ('Venus', 4.8675e24, 6051.8, 0.728, 0.718),
    ('Earth', 5.9724e24, 6371.0, 1.017, 0.983),
    ('Mars', 6.4171e23, 3389.5, 1.666, 1.381),
    ('Jupiter', 1.8982e27, 69911, 5.457, 4.951),
    ('Saturn', 5.6835e26, 58232, 10.12, 9.041),
    ('Uranus', 8.6810e25, 25362, 20.10, 18.29),
    ('Neptune', 1.024e26, 24622, 30.33, 29.81);

create table beverages (
    id bigint generated always as identity primary key,
    name varchar not null,
    rating smallint not null constraint five_star_scale check(rating >= 0 and rating <=5)
);

insert into beverages (name, rating)
values
    ('Water', 4),
    ('Coconut Water', 5),
    ('Coffee', 5),
    ('Tea', 3),
    ('Milk', 1);

create table inventions (
    id bigint generated always as identity primary key,
    name varchar not null,
    description varchar not null,
    inventor varchar,
    year smallint
);

insert into inventions (name, description, inventor, year)
values
    ('The Wheel', 'An object with a circular profile used to roll heavy loads.', NULL, NULL),
    ('The Movable Type Printing Press', 'A mechanical device for applying pressure to an inked surface resting upon a print medium, thereby transferring the ink.', 'Johannes Gutenberg', 1440),
    ('The Telephone', 'A telephone is a telecommunications device that permits two or more users to conduct a conversation when they are too far apart to be heard directly.', 'Alexander Graham Bell', 1876),
    ('The Ice Cream Maker', 'A machine to simultaneously freeze a cream-based mixture while churning it so as to aerate the mixture and keep the ice crystals small.', 'Nancy Johnson', 1843);

create table platonic_solids (
    id bigint generated always as identity primary key,
    name varchar not null,
    vertices smallint not null constraint positive_vertices check(vertices > 0),
    edges smallint not null constraint positive_edges check(edges > 0),
    faces smallint not null constraint positive_faces check(faces > 0),
    schlafli_symbol varchar(64) not null
);

insert into platonic_solids (name, vertices, edges, faces, schlafli_symbol)
values
    ('tetrahedron', 4, 6, 4, '{3, 3}'),
    ('cube', 8, 12, 6, '{4, 3}'),
    ('octahedron', 6, 12, 8, '{3, 4}'),
    ('dodecahedron', 20, 30, 12, '{5, 3}'),
    ('icosahedron', 12, 30, 20, '{3, 5}');
