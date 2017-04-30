// import the modules we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// define the promotions schema
var promotionsSchema = new Schema({

	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: false,
		default: ""
	},
	price: {
		type: Currency,
		required: true,
	},
	description: {
		type: String,
		required: true
	}
});

// create the model
var Promotions = mongoose.model('Promotions', promotionsSchema);

//export the module
module.exports = Promotions;