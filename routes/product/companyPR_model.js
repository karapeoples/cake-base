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
  removeCurrent
}

function find() {
	return db('company_preRoll')
}

function findById(id) {
	return db('company_preRoll').where({ id }).first()
}

function findBy(name) {
	return db('company_preRoll').where({ name }).first()
}

function add(newPR) {
	return db('company_preRoll')
		.insert(newPR, 'id')
		.then((ids) => {
			return findById(ids[0])
		})
}
async function update(id, changes) {
	await db('company_preRoll').where({ id }).update(changes)
	return findById(id)
}

function findCurrent() {
	return db('current_company_preRoll as c')
		.join('company_preRoll as p', 'c.companyPreRoll_id', 'p.id')
		.select('c.id as currentPR_id', 'p.id as preRoll_id', 'p.*', 'c.is_infused')
}

async function findCurrentById(id) {
	return await db('current_company_preRoll as c')
		.where('c.id', id)
		.join('company_preRoll as p', 'c.companyPreRoll_id', '=', 'p.id')
		.select('c.id as currentPR_id', 'p.id as preRoll_id', 'p.*', 'c.is_infused', 'c.in_stock')
		.first()
}

async function addCurrent(currentPR) {
	const [id] = await db('current_company_preRoll').insert(currentPR, 'id')
	const currentPRs = await db('current_company_preRoll').select('*').where({ id }).first()
	return currentPRs
}

async function removeCurrent(id) {
	const removed = await db('current_company_preRoll').where({ id }).del()

	return removed
}