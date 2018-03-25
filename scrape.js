const Nightmare = require('nightmare');
const fs = require('fs');

const getData = async (logins) => {
	console.log('Now checking');
	logins_str = fs
	logins = logins.split(',');
	results = [];
	const nightmare = Nightmare({show: true});
	await nightmare
	  .goto('https://signin.intra.42.fr/users/sign_in')
	  .type('#user_login', 'jowalz')
	  .type('#user_password', 'x_BGrCi7')
	  .click('.btn-login')
	  .wait(3000)

	logins.reduce(function(accumulator, login) {
		return accumulator.then(function(results) {
			return nightmare
			  .goto('https://profile.intra.42.fr/users/' + login)
			  .wait(3000)
			  .evaluate(function(){
				  return document.body.innerHTML;
			  })
			  .then(function(res){
			  	results[login] = res;
			  	return results;
			  });
		});
	}, Promise.resolve([])).then(function (results){
		for (var login in results) {
			fs.writeFile('./data/' + login + '.txt', results[login], function(err) {
				if (err) return console.log(err);
				console.log('Wrote file');
			});
		}
	});
};

fs.readFile('./login_list.csv', 'utf8', function read(err, data) {
	if (err) {
		throw err;
	}
	getData(data.trim());
});
