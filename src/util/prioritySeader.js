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
                console.log('Database is upto date for priority: '+ existingPriority.priorityName)
            } else {
                await prioritySchema.create(priority)
                console.log('Database seeded with new priority: '+ priority.priorityName)
            }
        }
    } catch (error) {
        console.error(error)
    }
}
module.exports = seedPriority