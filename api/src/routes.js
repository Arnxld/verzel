const { Router } = require('express');

const router = Router();

const ModuleController = require('./app/controllers/ModuleController');
const ClassController = require('./app/controllers/ClassController');
const AuthController = require('./app/controllers/AuthController');
const auth = require('./app/middlewares/auth');

router.post('/login', AuthController.login);
router.post('/signup', AuthController.create);
router.post('/logout', AuthController.logout);

router.get('/modules', ModuleController.index);
router.get('/modules/:id', ModuleController.find);
router.post('/modules', auth, ModuleController.store);
router.put('/modules/:id', auth, ModuleController.update);
router.delete('/modules/:id', auth, ModuleController.delete);

router.get('/classes', ClassController.index);
router.post('/classes', auth, ClassController.store);
router.get('/classes/:id', ClassController.find);
router.put('/classes/:id', auth, ClassController.update);
router.delete('/classes/:id', auth, ClassController.delete);

module.exports = router;
