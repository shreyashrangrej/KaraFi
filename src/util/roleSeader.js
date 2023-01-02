const roleSchema = require('../models/role.model')
const seedRole = async () => {
    try {
        const roles = [
            {
                name: 'admin',
                description: 'Admin Role for KaraFi Users'
            },
            {
                name: 'projectManager',
                description: 'Project Manager Role for KaraFi Users'
            },
            {
                name: 'user',
                description: 'User Role for KaraFi Users'
            }
        ]
        for (const role of roles) {
            const existingRole = await roleSchema.findOne({ name: role.name })
            if (existingRole){
                await roleSchema.updateOne({ _id: existingRole._id }, role)
                console.log('Database is upto date for role: '+ existingRole.name)
            } else {
                await roleSchema.create(role)
                console.log('Database seeded with new role: '+ role.name)
            }
        }
    } catch (error) {
        console.error(error)
    }
}
module.exports = seedRole