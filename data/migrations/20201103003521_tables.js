
exports.up = function (knex) {
	return knex.schema
		.createTable('newUser', (tbl) => {
			tbl.increments()
			tbl.string('fullName', 255).notNullable()
			tbl.string('email', 255).notNullable().unique()
			tbl.string('phone',255).notNullable()
			tbl.string('password',255).notNullable()
			tbl.string('role', 50).notNullable()
		})
		.createTable('admin', (admins) => {
      admins.increments()
			admins.integer('user_id').unsigned().references('id').inTable('newUser').onDelete('CASCADE').onUpdate('CASCADE')
		})
		.createTable('patient', (patient) => {
      patient.increments()
      patient.string('card', 255).notNullable().unique()
			patient.integer('user_id').unsigned().references('id').inTable('newUser').onDelete('CASCADE').onUpdate('CASCADE')
		})
		.createTable('clerk', (clerk) => {
      clerk.increments()
			clerk.integer('user_id').unsigned().references('id').inTable('newUser').onDelete('CASCADE').onUpdate('CASCADE')
		})
		.createTable('flower', (flower) => {
			flower.increments()
			flower.string('image', 255).notNullable()
			flower.string('name', 255).notNullable()
			flower.string('type', 255).notNullable()
			flower.integer('thc')
			flower.integer('cbd')
			flower.string('terps', 255)
			flower.integer('pricePerGram').notNullable()

	})
		.createTable('current_flower', (flower) => {
			flower.increments()
			flower.boolean('is_infused').notNullable().defaultTo(false)
			flower.boolean('in_stock').notNullable().defaultTo(false)
			flower.integer('flower_id').unsigned().references('id').inTable('flower').onDelete('CASCADE').onUpdate('CASCADE')
		})
		.createTable('inHouse_preRoll', (pr) => {
			pr.increments()
			pr.boolean('in_stock').notNullable().defaultTo(false)
			pr.integer('flower_id').unsigned().references('id').inTable('flower').onDelete('CASCADE').onUpdate('CASCADE')
		})
		.createTable('company_preRoll', (pr) => {
			pr.increments()
			pr.string('image', 255).notNullable()
			pr.string('name', 255).notNullable()
			pr.string('type', 255).notNullable()
			pr.string('company', 255).notNullable()
			pr.integer('thc')
			pr.integer('cbd')
			pr.string('terps', 255)
			pr.integer('price').notNullable()

		})
		.createTable('current_company_preRoll', (pr) => {
			pr.increments()
			pr.boolean('is_infused').notNullable().defaultTo(false)
			pr.boolean('in_stock').notNullable().defaultTo(false)
			pr.integer('companyPreRoll_id').unsigned().references('id').inTable('company_preRoll').onDelete('CASCADE').onUpdate('CASCADE')
	})
}

exports.down = function (knex, Promise) {
	return knex.schema.dropTableIfExists('current_company_preRoll').dropTableIfExists('company_preRoll').dropTableIfExists('inHouse_preRoll').dropTableIfExists('current_flower').dropTableIfExists('flower').dropTableIfExists('clerk').dropTableIfExists('patient').dropTableIfExists('admin').dropTableIfExists('newUser')
}
