const Nightmare = require('nightmare');
const fs = require('fs');

const getData = async () => {
	console.log('Now checking');
	logins = ["jowalz", "ytran"];
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
			  .wait('body')
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
			fs.writeFile(login + '.txt', results[login], function(err) {
				if (err) return console.log(err);
				console.log('Hello World > helloworld.txt');
			});
		}
	});
};

getData();
