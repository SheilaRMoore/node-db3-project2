const knex = require('knex');
const db = knex(require('../knexfile').development);




module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
  };

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id }).first();
}

function findStepById(id) {
    return db("steps").where({ id }).first();
  }

function findSteps(id) {
  return db("steps")
    .join("schemes", "schemes.id", "=", "steps.scheme_id")
    .where({ scheme_id: id })
    .select("steps.id", "steps.step_number", "steps.instructions");
}

function add(scheme) {
    return db('schemes', 'id')
    .insert(scheme)
    .then(id => findById(...id));
};


function addStep(stepData, id) {
    stepData.scheme_id = id;
    return db('steps')
    .insert(stepData)
    .then(stepId => {
        console.log(stepId);
        return findStepById(...stepId);
    });  
}

function update(changes, id) {
  return db("schemes")
    .update(changes)
    .where({ id });
}

function remove(id) {
  return db("schemes")
    .delete()
    .where({ id });
}