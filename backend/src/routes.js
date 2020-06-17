const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const SearchNeedController = require('./controllers/SearchNeedController');
const NeedController = require('./controllers/NeedController');
const SessionCompanyController = require('./controllers/SessionCompanyController');
const SessionUserController = require('./controllers/SessionUserController');

const routes = Router();
const upload = multer(uploadConfig);

// Funções de um controller : INDEX, SHOW, STORE, UPDATE, DESTROY

routes.get('/users', SessionUserController.show);
routes.post('/users', SessionUserController.store);
routes.get('/companies', SessionCompanyController.show);
routes.post('/companies', upload.single('profile_photo'), SessionCompanyController.store);
routes.post('/needs', upload.single('img'), NeedController.store);
routes.get('/search', SearchNeedController.index);

module.exports = routes;