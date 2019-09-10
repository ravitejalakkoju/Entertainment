const axios = require('axios');


class anime_mangaSearch {

    async getmangaDetails(name) {
        try{
            const proxyURL = 'https://cors-anywhere.herokuapp.com/';
                    let manga_anime = [];
                    const res = await axios(`${proxyURL}https://api.jikan.moe/v3/search/manga?q=${name}&page=1`);

                    manga_anime = res.data;
                    return manga_anime;
        } catch(error) {
            alert(error);
        }
    }
    async getanimeDetails(name) {
        try{
            const proxyURL = 'https://cors-anywhere.herokuapp.com/';
                    let manga_anime = [];
                    const res = await axios(`${proxyURL}https://api.jikan.moe/v3/search/anime?q=${name}&page=1`);

                    manga_anime = res.data;
                    return manga_anime;
        } catch(error) {
            alert(error);
        }
    }

    // const res = await axios(`https://api-v3.igdb.com/games/?search=pokemon&fields=name,genres.*,popularity,screenshots.url,cover.url,url,rating`);
    
}

module.exports = anime_mangaSearch;