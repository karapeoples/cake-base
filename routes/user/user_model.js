const db = require('../../data/dbConfig')

module.exports = {
  //clerk
  findClerk,
  findClerkById,
  removeClerk,
  //patient
  findPatient,
	findPatientById,
	findPatientCardByPatientId,
  updateCard,
  removePatient,
  //admin
  findAdmin,
  findAdminById,
	removeAdmin,
	findUserById,
	updateUser,
}

function findUserById(id) {
	return db('newUser').where('newUser.id',id).first()
}

//clerk
function findClerk() {
	return db('clerk as c')
		.join('newUser as u', 'c.user_id', 'u.id')
		.select(
			'c.id as clerk_id',
			'u.id as user_id',
			'u.*'
		)
}

async function findClerkById(id) {
	return await db('clerk as c')
		.where('c.id', id)
		.join('newUser as u', 'c.user_id', '=', 'u.id')
		.select(
			'c.id as clerk_id',
			'u.id as user_id',
			'u.*'
		)
		.first()
}

async function updateUser(id, changes) {
	await db('newUser').where({id}).update(changes)
  return findUserById(id)
}

async function removeClerk(id) {
	const removed = await db('clerk').where({ id }).del()

	return removed
}
//patient
function findPatient() {
	return db('patient as p')
		.join('newUser as u', 'p.user_id', 'u.id')
		.select(
			'p.id as patient_id',
			'u.id as user_id',
      'u.*',
      'p.card'
		)
}

async function findPatientById(id) {
	return await db('patient as p')
		.where('p.id', id)
		.join('newUser as u', 'p.user_id', '=', 'u.id')
		.select('p.id as patient_id', 'u.id as user_id', 'u.*', 'p.card')
		.first()
}

async function findPatientCardByPatientId(id) {
	return await db('patient as p')
		.where('p.id', id)
		.join('newUser as u', 'p.user_id', '=', 'u.id')
		.select('u.fullName', 'p.card')
		.first()
}
async function updateCard(id, changes) {
	await db('patient').where({ id }).update(changes)

	return findPatientCardByPatientId(id)
}

async function removePatient(id) {
	const removed = await db('patient').where({ id }).del()

	return removed
}

//admin
function findAdmin() {
	return db('admin as a')
		.join('newUser as u', 'a.user_id', 'u.id')
		.select(
			'a.id as admin_id',
			'u.id as user_id',
			'u.*'
		)
}

async function findAdminById(id) {
	return await db('admin as a')
		.where('a.id', id)
		.join('newUser as u', 'a.user_id', '=', 'u.id')
		.select('a.id as admin_id', 'u.id as user_id', 'u.*')
		.first()
}


async function removeAdmin(id) {
	const removed = await db('admin').where({ id }).del()

	return removed
}