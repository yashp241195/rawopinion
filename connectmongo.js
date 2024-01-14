const mongoose = require('mongoose');
const { MONGOURI, LOCALMONGOURI } = require('./config')

// const uri = LOCALMONGOURI
const uri = MONGOURI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(connect => console.log('connected to mongodb..'))
.catch(e => console.log('could not connect to mongodb', e));
