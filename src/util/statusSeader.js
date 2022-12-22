const statusSchema = require('../models/status.model')
const seedStatus = async () => {
    try {
        const statuses = [
            {
                statusId: 'OPEN',
                statusName: 'Open',
                statusDescription: 'Task with Status As Open'
            },
            {
                statusId: 'CLOSED',
                statusName: 'Closed',
                statusDescription: 'Task with Status As Closed'
            },
            {
                statusId: 'HOLD',
                statusName: 'On Hold',
                statusDescription: 'Task with Status As On Hold'
            },
            {
                statusId: 'CANCEL',
                statusName: 'Cancelled',
                statusDescription: 'Task with Status As Cancelled'
            },
            {
                statusId: 'PENDING',
                statusName: 'Pending',
                statusDescription: 'Task with Status As Pending'
            },
        ]
        for (const status of statuses) {
            const existingStatus = await statusSchema.findOne({ statusId: status.statusId })
            if (existingStatus) {
                await statusSchema.updateOne({ _id: existingStatus._id }, status)
            } else {
                await statusSchema.create(status)
            }
        }
        console.log('Database Seeded With New Default Statuses.')
    } catch (error) {
        console.error(error)
    }
}
module.exports = seedStatus