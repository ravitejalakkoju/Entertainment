const axios = require('axios');


axios.defaults.headers.common['user-key'] = 'dff438182df1c2274fa19f79925b89c7';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

class gameSearch {

    async getGameDetails(name) {
        try{
            const proxyURL = 'https://cors-anywhere.herokuapp.com/';
                    let games = [];
                    const res = await axios(`${proxyURL}https://api-v3.igdb.com/games/?search=${name}&fields=name,cover.url,url,release_dates.y`);

                    games = res.data;
                    return games;
        } catch(error) {
            alert(error);
        }
    }

    // const res = await axios(`https://api-v3.igdb.com/games/?search=pokemon&fields=name,genres.*,popularity,screenshots.url,cover.url,url,rating`);
    
}

module.exports = gameSearch;