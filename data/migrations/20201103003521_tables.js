
exports.up = function (knex) {
	return knex.schema
		.createTable('newUser', (tbl) => {
			tbl.increments()
			tbl.string('fullName', 255).notNullable()
			tbl.string('email', 255).notNullable().unique()
			tbl.string('password', 255).notNullable()
			tbl.string('role', 50).notNullable()
		})
		.createTable('admin', (admins) => {
      admins.increments()
      admins.string('passCode', 255).notNullable().unique()
			admins.integer('user_id').unsigned().references('id').inTable('newUser').onDelete('CASCADE').onUpdate('CASCADE')
		})
		.createTable('patient', (patient) => {
      patient.increments()
      patient.boolean('isLegal').notNullable().defaultTo(false)
			patient.integer('user_id').unsigned().references('id').inTable('newUser').onDelete('CASCADE').onUpdate('CASCADE')
		})
		.createTable('clerk', (clerk) => {
      clerk.increments()
      clerk.string('passCode',255).notNullable().unique()
			clerk.integer('user_id').unsigned().references('id').inTable('newUser').onDelete('CASCADE').onUpdate('CASCADE')
		})
}

exports.down = function (knex, Promise) {
	return knex.schema.dropTableIfExists('clerk').dropTableIfExists('patient').dropTableIfExists('admin').dropTableIfExists('newUser')
}
