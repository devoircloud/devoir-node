/**
 *  Node holds basic API of Devoir Node.
 *
 */


// Initialize and create an account of Devoir.
// Then open the devoir to the world.

// We need to accept the item uploading from the customers,
//  with getting the session token and player's wallet address and account data on blockchain,
//  since we do not have account data on blockchain, we are getting a json DATA with plan, plan creation, algorithm
//  parameters.

// Devoir sets the data uploaded by player to the special folder. If that folder is not exists.
//  Then, devoir creates it.
//  If folder had any data within it
//  Then devoir node will format the directory.
//  After filling in, devoir node will add to virtual server the route listener for user.
//  And will redirect back to player the data from Server.

// When server requests the data for particular player
//  Devoir node will check does the folder name exist.
//  If does, then checks does the file in the within path exists.
//  If does and that is file, not a directory.
//  Then devoir will send it out to player in binary format.

const express = require('express');
const formidable = require('express-formidable');   // to support post parameters
const path = require('path');
const fs = require("fs"); 
const unzip = require("unzip"); 
// const bcrypt = require('bcryptjs');
// const passport = require('passport');

const router = express.Router();

const Userdata = require('../models/userdata');
// const User = require('../models/user');
// const Utils = require('../helpers/utils');

config = require('../../config/default');

router.get('/', (req, res, next) => {
  res.send('Added default index page');
});

// show requested file
router.get('/:username/*?', (req, res, next) => {
  // the username should have folder.
  // otherwise return error 404!

  // get settings

  // get last used version of files

  // check is item on the folder exists

  let username = req.params.username;
  let userdataPath = Userdata.getUserPath(username);

   if (!fs.existsSync(userdataPath)) {
      // file is not exists
      res.status(404);
      res.send('404! User has no data');
    }
    else {
      let settings = Userdata.getSettings(userdataPath);

      const urlParam = req.path.substring(req.params.username.length+1);
      
      filePath = path.join(userdataPath, settings.updateVersion.toString(), urlParam);

      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          res.status(404);
          res.send(filePath+" - does not exist!");
        }
        else {
          res.sendFile(filePath);
        }
      });
    }
});


// get home page
router.post('/upload', (req, res, next) => {
  // get parameters
  let username = req.fields.username;
  let file = req.files.data;
  try {
    let settings = JSON.parse(req.fields.settings);

    let userdataPath = Userdata.getUserPath(username);

    settings.updateVersion = 0;

    if (!fs.existsSync(userdataPath)) {
      // file is not exists
      console.log("directory is not exist! creating one");
      Userdata.initPath(userdataPath, settings);

    }
    else {
      console.log('directiry exists, get settings json file');

      let oldSettings = Userdata.getSettings(userdataPath);
      settings.updateVersion = oldSettings.updateVersion;
    }

    if (!file) {
      res.send('file is missing');
    }
    else if (file.type != config.uploadType) {
      res.send('Only '+config.uploadType+' supported! Given '+file.type);
    }
    else 
    {
      let oldDataPath = settings.updateVersion;
      
      settings.updateVersion += 1;
      
      let newDataPath = path.join(userdataPath, settings.updateVersion.toString());

      fs.createReadStream(file.path).pipe(unzip.Extract({ path: newDataPath })).on('close', (x) => {
        Userdata.updateSettings(userdataPath, settings);
        Userdata.removeData(userdataPath, oldDataPath);
      });

      res.send('ok');
    }
  }
  catch (e) {
    console.log(e);
    // res.send(req);
      res.send('Invalid Settings parameter. At this version need to get JSON. Later will be requested from Blockchain');
  }

  // check that folder with a username exists
  //  if doesn't, then create a folder with a username and a settings.json and set the incoming settings too
  //  get number of folders within username folder.
  //  increase number that was calculated by getting amount of folders within username.
  //  create a new folder
  //  put file in a folder with username
  //  extract data to latest folder.
  //  if extracted, get the last used folder.
  //  erase permanently all files from there.
  //  and set new folder as a new destination for requests in settings.

  // new todo model
  // const newTodo = new Todo({ name, done: false });

  // newTodo.save()
    // .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    // .catch((err) => { console.log(err); });

  // console.log("\n\n\n\n\n\n");
  // console.log(req.app.get('views'));
  // console.log(username)

  // res.send('OK!');
});

// get register page
// router.get('/:username/', (req, res, next) => {
  // check if the name exists.
  //  if exists, then 

  // new todo model
  // const newTodo = new Todo({ name, done: false });

  // newTodo.save()
    // .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    // .catch((err) => { console.log(err); });

  // res.render('register', { title: 'Express' });
// });

module.exports = router;
