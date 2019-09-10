const axios = require('axios');


class comicSearch {

    async getComicDetails(name) {
        try{
            const proxyURL = 'https://cors-anywhere.herokuapp.com/';
                    let comics = [];
                    const res = await axios(`${proxyURL}http://comicvine.gamespot.com/api/issues/?api_key=2a984a1e043afbec9e77dfb000cb386c7d87e5c4&filter=name:${name}&format=json`);

                    comics = res.data.results;
                    return comics;
        } catch(error) {
            alert(error);
        }
    }

    // const res = await axios(`https://api-v3.igdb.com/games/?search=pokemon&fields=name,genres.*,popularity,screenshots.url,cover.url,url,rating`);
    
}

module.exports = comicSearch;