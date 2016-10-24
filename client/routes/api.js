//create new express router
var express = require('express')
var router = express.Router()
var dataController = require('../controller/data')
var datadateController = require('../controller/data-date')
//export router

router.post('/data', dataController.insert)
router.get('/data', dataController.displays)
router.get('/data/:id', dataController.displayOne)
router.put('/data/:id', dataController.update)
router.delete('/data/:id', dataController.deleteitem)
router.get('/search', dataController.searchData)


router.post('/datadate', datadateController.insert)
router.get('/datadate', datadateController.displays)
router.get('/datadate/:id', datadateController.displayOne)
router.put('/datadate/:id', datadateController.update)
router.delete('/datadate/:id', datadateController.deleteitem)
router.get('/searchdate', datadateController.searchDataDate)


module.exports = router
