const axios = require('axios');


class characterSearch {

    async getMangaCharacterDetails(name) {
        try{
            const proxyURL = 'https://cors-anywhere.herokuapp.com/';
                    let manga_anime = [];
                    const res = await axios(`${proxyURL}https://api.jikan.moe/v3/search/character?q=${name}`);

                    manga_anime = res.data;
                    return manga_anime;
        } catch(error) {
            alert(error);
        }
    }
    async getComicCharacterDetails(name) {
        try{
            const proxyURL = 'https://cors-anywhere.herokuapp.com/';
                    let comicChar = [];
                    const res = await axios(`${proxyURL}http://comicvine.gamespot.com/api/characters/?api_key=2a984a1e043afbec9e77dfb000cb386c7d87e5c4&filter=name:${name}&format=json`);

                    comicChar = res.data.results;
                    return comicChar;
        } catch(error) {
            alert(error);
        }
    }

    // const res = await axios(`https://api-v3.igdb.com/games/?search=pokemon&fields=name,genres.*,popularity,screenshots.url,cover.url,url,rating`);
    
}

module.exports = characterSearch;