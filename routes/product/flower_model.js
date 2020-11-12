const db = require('../../data/dbConfig')

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  findCurrent,
  findCurrentById,
  addCurrent,
  removeCurrent,
  findpreRoll,
  findpreRollById,
  addpreRoll,
  removepreRoll
}


function find() {
	return db('flower')
}

function findById(id) {
	return db('flower').where({ id }).first()
}

function findBy(name) {
	return db('flower').where({name}).first()
}

function add(newFlower) {
  return db('flower')
    .insert(newFlower, 'id')
    .then((ids) => {
      return findById(ids[0])
    })
}
async function update(id, changes) {
	await db('flower').where({ id }).update(changes)
	return findById(id)
}

function findCurrent() {
	return db('current_flower as c')
		.join('flower as f', 'c.flower_id', 'f.id')
		.select('c.id as currentFlower_id', 'f.id as flower_id', 'f.*', 'c.is_infused')
}

async function findCurrentById(id) {
	return await db('current_flower as c')
		.where('c.id', id)
		.join('flower as f', 'c.flower_id', '=', 'f.id')
		.select('c.id as currentFlower_id', 'f.id as flower_id', 'f.*', 'c.is_infused')
		.first()
}

async function addCurrent(currentFlower) {
	const [id] = await db('current_flower').insert(currentFlower, 'id')
	const currentFlowers = await db('current_flower').select('*').where({ id }).first()
	return currentFlowers
}

async function removeCurrent(id) {
	const removed = await db('current_flower').where({ id }).del()

	return removed
}
///In house pre-roll tied to flowers

function findpreRoll() {
	return db('inHouse_preRoll as i')
		.join('flower as f', 'i.flower_id', 'f.id')
		.select('i.id as preRoll_id', 'f.id as flower_id', 'f.*', 'i.quantity')
}

async function findpreRollById(id) {
	return await db('inHouse_preRoll as i')
		.where('i.id', id)
		.join('flower as f', 'i.flower_id', '=', 'f.id')
		.select('i.id as currentFlower_id', 'f.id as flower_id', 'f.*', 'i.quantity')
		.first()
}

async function addpreRoll(preRoll) {
	const [id] = await db('inHouse_preRoll').insert(preRoll, 'id')
	const currentpreRoll = await db('inHouse_preRoll').select('*').where({ id }).first()
	return currentpreRoll
}

async function removepreRoll(id) {
	const removed = await db('inHouse_preRoll').where({ id }).del()

	return removed
}