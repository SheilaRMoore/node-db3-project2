const knex = require('knex');
const db = knex(require('../knexfile').development);


const find = () => db('schemes');

const findById = (id) => db('schemes').where({ id });

const findSteps = (id) => {
    return db('schemes')
        .select(['steps.id', 'scheme_name', 'step_number', 'instructions'])
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .where({ scheme_id: id });
};
const add = (scheme) => {
    return db('schemes')
        .insert(scheme)
        .then(ids => findByID(ids[0]));
}

const update = (changes, id) => {
    return db('schemes')
        .where({ id: id})
        .update(changes)
        .then(() => findByID(id));
}

const remove = async (id) => {
    const scheme = await findByID(id);
    if (!scheme) return null;
    return db('schemes')
        .where({ id: id })
        .del()
        .then(() => scheme);
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}