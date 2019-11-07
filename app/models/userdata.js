const path = require("path"); 
const fs = require('fs-extra');

settingsName = 'settings.json';

module.exports = {
  initPath: function(usernamePath, settings) {
    fs.mkdirSync(usernamePath)

    let settingsPath = path.join(usernamePath, settingsName);

    fs.writeFileSync(settingsPath, JSON.stringify(settings));
  },

  getSettings: function(usernamePath) {
    let settingsPath = path.join(usernamePath, settingsName);
  	
  	let settings = fs.readFileSync(settingsPath, 'utf8');

  	if (settings.length) {
  		return JSON.parse(settings);
  	}
  	return {};
  },

  updateSettings: function(usernamePath, settings) {
  	let settingsPath = path.join(usernamePath, settingsName);

    fs.writeFileSync(settingsPath, JSON.stringify(settings));
  },

  // do not delete version folder itself
  removeData: function(usernamePath, dataVersion) {
  	dataVersion = dataVersion.toString();
  	let dataPath = path.join(usernamePath, dataVersion);

  	fs.emptyDir(dataPath, err => {
	  if (err) return console.error(err);	
	})
  },

  getUserPath: function(username) {
  	return path.join(__dirname, '..', 'userdata', username);
  }
};
