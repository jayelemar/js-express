const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    leaveType: {
        type: String,
        required: [true, "Please add a leave type"],
        enum: ['Annual Leave',
                'Solo Parents',
                'Volunteer Leave',
                'Paternity',
                'Violence Act',
                'Adoption Leave',
                'Sabbatical Leave',
                'Carry Forward Leave',
                'Bereavement',
            ],
        default: 'annual leave',
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    startDate: {
        type: Date,
        required: [ true," Please add a start date"]
    },
    endDate: {
        type: Date,
        required: [ true," Please add a end date"]
    },
    reason: {
        type: String,
        null: true,
        blank: true,
    },
    contactAddress: {
        type:String,
    },
    contactNumber: {
        type:String,
    },
    createdAt: {
        type: Date,
    },
    modifiedAt: {
        type: Date,
    }
},{
    timestamps: true,
});


const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
