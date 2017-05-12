// import the modules we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the promotions schema
var leadershipSchema = new Schema({

	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},	
	designation: {
		type: String,
		required: true,
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
}, {
    timestamps: true
});

// create the model
var Leaders = mongoose.model('Leadership', leadershipSchema);

//export the module
module.exports = Leaders;
