// connect with mongo, i recommend install Datagrip (is free for students :D) or other software to see data storage
const mongoose = require('mongoose')
const user = 'gato_banana_master'
const password = 'y6ouR1f8vwjwnTSC'
const uri = `mongodb+srv://${user}:${password}@cluster0-hpzet.mongodb.net/test`

mongoose.connect(uri)
