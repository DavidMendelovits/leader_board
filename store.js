const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({users: []}).write();

var to_Seconds = function(s) {
	var p = s.split('h');
	return parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60;
}

fs.readdir('./data/form_data/', function(err, files) {
	if(err) {
		console.error("Could not list the directory.", err);
	}

	files.forEach(function(file, index) {
		fs.readFile('./data/form_data/' + file, "utf8", function(err, txt_file) {
			hr_logs = txt_file.trim().split('\n');
			login = file.replace('.txt', '');
			secs = 0;
			for (var i = 0; i < hr_logs.length; i++)
			{
				secs += to_Seconds(hr_logs[i]);
			}
			if (db.has('users').value()) {
				if (db.find({login: login}).value()) {
				    db.find({login: login})
				      .assign({total_secs: secs})
				      .write();
				} else {
				    db.get('users')
		              .push({login: login, total_secs: secs})
					  .write();
				}
			}
			console.log(file.replace('.txt', ''), secs);

		});
	});
});
