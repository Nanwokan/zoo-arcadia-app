const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const checkRole = require('../middleware/checkRole');
const checkMultipleRoles = require('../middleware/checkMultipleRoles');
const verifyToken = require('../middleware/verifyToken');

const createMessage = require('../controllers/contact/createMessage');





const getAnimalViews = require('../controllers/statistiques/getAnimalViews');
const incrementAnimalView = require('../controllers/statistiques/incrementAnimalView');
const getAdminStats = require('../controllers/statistiques/getAdminStats');
const getAnimalsByHabitat = require('../controllers/statistiques/getAnimalsByHabitat');
const getHero = require('../controllers/hero/getHero');
const updateHero = require('../controllers/hero/updateHero');
const getHoraires = require('../controllers/horaire/getHoraires');
const updateHoraires = require('../controllers/horaire/updateHoraires');





const getRole = require('../controllers/utilisateur/getRole');
const getAllUsers = require('../controllers/utilisateur/getAllUsers');
const signupUser = require('../controllers/utilisateur/signupUser');
const deleteUser = require('../controllers/utilisateur/deleteUser');
const updateDetailUser = require('../controllers/utilisateur/updateUser');
const updatePassword = require('../controllers/utilisateur/updatePassword');
const loginUser = require('../controllers/utilisateur/loginUser');
const getUserById = require('../controllers/utilisateur/getUserById');



const getAllServices = require('../controllers/service/getAllServices');
const deleteService = require('../controllers/service/deleteService');
const updateService = require('../controllers/service/updateService');
const createService = require('../controllers/service/createService');



const createAvis = require('../controllers/avis/createAvis');
const getAllValidAvis = require('../controllers/avis/getAllValidAvis');
const validerAvis = require('../controllers/avis/validerAvis');
const deleteAvis = require('../controllers/avis/deleteAvis');
const getAllPendingAvis = require('../controllers/avis/getAllPendingAvis');



const getAllHabitats = require('../controllers/habitat/getAllHabitats');
const createHabitat = require('../controllers/habitat/createHabitat');
const updateHabitat = require('../controllers/habitat/updateHabitat');
const deleteHabitat = require('../controllers/habitat/deleteHabitat');
const getCommentairesHabitat = require('../controllers/habitat/getCommentairesHabitat');
const createCommentaireHabitat = require('../controllers/habitat/createCommentaireHabitat');
const deleteCommentaireHabitat = require('../controllers/habitat/deleteCommentaireHabitat');
const getAllCommentairesHabitat = require('../controllers/habitat/getAllCommentairesHabitat');


const getAllAnimals = require('../controllers/animal/getAllAnimals');
const createAnimal = require('../controllers/animal/createAnimal');
const updateAnimal = require('../controllers/animal/updateAnimal');
const deleteAnimal = require('../controllers/animal/deleteAnimal');
const getAnimalImages = require('../controllers/animal/getAnimalImages');
const addAnimalImage = require('../controllers/animal/addAnimalImage');
const deleteAnimalImage = require('../controllers/animal/deleteAnimalImage');
const getAllRaces = require('../controllers/race/getAllRaces');
const createRace = require('../controllers/race/createRace');
const deleteRace = require('../controllers/race/deleteRace');



const createRapportVeterinaire = require('../controllers/rapport/createRapportVeterinaire');
const getAllRapports = require('../controllers/rapport/getAllRapports')
const getRapportsByAnimal = require('../controllers/rapport/getRapportsByAnimal');
const createFoodLog = require('../controllers/rapport/createFoodLog');
const getFoodLogByAnimal = require('../controllers/rapport/getFoodLogByAnimal');
const getAllFoodLog = require('../controllers/rapport/getAllFoodLog');


router.post('/contact', createMessage);


router.get('/consultations', getAnimalViews);
router.post('/statistiques/increment/:id', incrementAnimalView);
router.get('/admin/stats', verifyToken, checkRole(1), getAdminStats);
router.get('/statistiques/animaux-par-habitat', verifyToken, checkRole(1), getAnimalsByHabitat);
router.get('/hero', getHero);
router.put('/hero', verifyToken, checkRole(1), upload.single('image'), updateHero);
router.get('/horaires', getHoraires);
router.put('/horaires', verifyToken, checkRole(1), updateHoraires);


// ROUTES UTILISATEURS

router.get('/roles',getRole);
router.post('/utilisateurs', verifyToken, checkRole(1), upload.single('photo'), signupUser);
router.delete('/utilisateurs/:id', verifyToken, checkRole(1), deleteUser);
router.put('/utilisateurs/:id', verifyToken, checkRole(1), upload.single('photo'), updateDetailUser);
router.put('/utilisateurs/:id/password',verifyToken, checkRole(1), updatePassword);
router.post('/utilisateurs/login', loginUser);
router.get('/utilisateurs/:id', verifyToken, getUserById);
router.get('/utilisateurs', verifyToken, checkRole(1), getAllUsers);

// ROUTES SERVICES

router.get('/services', getAllServices);
router.delete('/services/:id', verifyToken, checkRole(1), deleteService);
router.put('/services/:id', verifyToken, checkMultipleRoles([1, 2]), upload.single('image'), updateService);
router.post('/services', verifyToken, checkRole(1), upload.single('image'), createService);

// ROUTES AVIS

router.post('/avis', createAvis);
router.get('/avis/valides', getAllValidAvis);
router.put('/avis/:id/valider', verifyToken, checkRole(2), validerAvis);
router.delete('/avis/:id', verifyToken, checkRole(2), deleteAvis);
router.get('/avis/en-attente', verifyToken, checkRole(2), getAllPendingAvis);

// ROUTES HABITATS

router.get('/habitats', getAllHabitats);
router.post('/habitats', verifyToken, checkRole(1), upload.single('image'),createHabitat);
router.put('/habitats/:id', verifyToken, checkRole(1), upload.single('image'), updateHabitat);
router.delete('/habitats/:id', verifyToken, checkRole(1), deleteHabitat);
router.get('/habitats/:id/commentaires', verifyToken, checkMultipleRoles([1, 3]), getCommentairesHabitat);
router.post('/habitats/:id/commentaires', verifyToken, checkRole(3), createCommentaireHabitat);
router.delete('/commentaires-habitat/:id', verifyToken, checkMultipleRoles([1, 3]), deleteCommentaireHabitat);
router.get('/commentaires-habitat', verifyToken, checkMultipleRoles([1, 3]), getAllCommentairesHabitat);


// ROUTES ANIMAUX / RACES

router.get('/animals', getAllAnimals);
router.post('/animals', verifyToken, checkRole(1), upload.none(), createAnimal);
router.put('/animals/:id', verifyToken, checkRole(1), upload.none(), updateAnimal);
router.delete('/animals/:id', verifyToken, checkRole(1), deleteAnimal);
router.get('/animals/:id/images', getAnimalImages);
router.post('/animals/:id/images', verifyToken, checkRole(1), upload.array('images'), addAnimalImage);
router.delete('/animals/images/:id', verifyToken, checkRole(1), deleteAnimalImage);
router.get('/races', getAllRaces);
router.post('/races', verifyToken, checkRole(1), createRace);
router.delete('/races/:id', verifyToken, checkRole(1), deleteRace);

// ROUTES RAPPORTS & FOOD LOGS

router.post('/rapports-veterinaires', verifyToken, checkRole(3), createRapportVeterinaire);
router.get('/rapports-veterinaires', getAllRapports);
router.get('/rapports-veterinaires/:id', verifyToken, checkMultipleRoles([1, 3]), getRapportsByAnimal); 
router.get('/public/rapports-veterinaires/:id', getRapportsByAnimal);// 👈 public
router.post('/food-log', verifyToken, checkRole(2), createFoodLog);
router.get('/food-log/:id', verifyToken, checkMultipleRoles([2, 3]), getFoodLogByAnimal);
router.get('/food-logs', verifyToken, checkRole(2), getAllFoodLog);

module.exports = router;
