const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    const {search} = req.query
    busqueda = {
        name: search
    }
    if(search){
        res.render('artists',busqueda)
    } else{
        res.render('home')
    }
})

module.exports = router