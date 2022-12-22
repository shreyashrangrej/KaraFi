const prioritySchema = require('../models/priority.model')
const seedPriority = async () => {
    try {
        const priorities = [
            {
                priorityId: 'NONE',
                priorityName: 'None',
                priorityDescription: 'Objects with Priority as none'
            },
            {
                priorityId: 'LOW',
                priorityName: 'Low',
                priorityDescription: 'Objects with Priority as Low'
            },
            {
                priorityId: 'MEDIUM',
                priorityName: 'Medium',
                priorityDescription: 'Objects with Priority as medium'
            },
            {
                priorityId: 'HIGH',
                priorityName: 'High',
                priorityDescription: 'Objects with Priority as high'
            },
            {
                priorityId: 'VERYHIGH',
                priorityName: 'Very High',
                priorityDescription: 'Objects with Priority as Very High'
            },
        ]
        for (const priority of priorities) {
            const existingPriority = await prioritySchema.findOne({ priorityId: priority.priorityId })
            if (existingPriority) {
                await prioritySchema.updateOne({ _id: existingPriority._id }, priority)
            } else {
                await prioritySchema.create(priority)
            }
        }
        console.log('Database Seeded With New Default Priorities.')
    } catch (error) {
        console.error(error)
    }
}
module.exports = seedPriority