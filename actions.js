const fetch = require('node-fetch');
module.exports = {
    GetDankMeme: async function () {
        return await fetch("https://meme-api.herokuapp.com/gimme/dankmemes", { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .catch(function (err) {
                console.log(`Error: ${err}`)
            });;
    },
    GetInsult: function () {
        return fetch("https://evilinsult.com/generate_insult.php?lang=en", { method: 'GET' })
            .then(response => response.text())
            .then((response) => {
                return response;
            })
            .catch(function (err) {
                console.log(`Error: ${err}`)
            });;
    }
}