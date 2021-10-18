const router = require('express').Router();
const vactionController = require('../controllers/vactionSearch.controller')

router.post('/saveNewUser', vactionController.saveNewUser)
router.post('/saveNewSubscriber', vactionController.saveNewSubscriber)
router.post('/saveNewManager', vactionController.saveNewManager)
router.post('/saveNewItem', vactionController.saveNewItem)
router.post('/additionToApartments', vactionController.additionToApartments)
router.post('/additionToSubscribers', vactionController.additionToSubscribers)
router.post('/deleteMessage/:name/:password', vactionController.deleteMessage)
// router.post('/addToMessages', vactionController.addToMessages)
router.post('/uploadImage/:fileName', vactionController.uploadImage)

router.get('/sendEmail', vactionController.sendEmail)

router.get('/getAllArea', vactionController.getAllArea)
router.get('/connectS/:name/:password', vactionController.connectS)
router.get('/connectU/:name/:password', vactionController.connectU)
router.get('/connectM/:name/:password', vactionController.connectM)
router.get('/getAllUserApartment/:name/:password', vactionController.getAllUserApartment)
router.get('/getAllApartmentArea/:area', vactionController.getAllApartmentArea)
router.get('/getAllMessage/:name/:password', vactionController.getAllMessage)
router.get('/getManager', vactionController.getManager)
router.get('/getAllApartmentNew', vactionController.getAllApartmentNew)
router.get('/getAllSubscriberNew', vactionController.getAllSubscriberNew)
router.get('/getAllApartment', vactionController.getAllApartment)
router.get('/getAllApartmentsLiked/:name/:password', vactionController.getAllApartmentsLiked)
router.post('/saveNewItemLiked', vactionController.saveNewItemLiked)
router.get('/getApartmentsCriteria', vactionController.getApartmentsCriteria)

module.exports = router;
