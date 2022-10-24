const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/appController');


//api/thoughts
router.route('/').get(getThoughts).post(createThought);

//api/thoughts/:thoughtsId/reactions

