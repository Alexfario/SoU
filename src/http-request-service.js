const axios = require('axios');

const yandexHelper = require('./yandex-helper');


const getSuggestDataByGroupName = (groupName) => {
  const searchUrl = yandexHelper.buildSearchUrl(groupName);

  return axios({
    method: 'get',
    url: searchUrl,
  });
}

const getArtistDataById = (artistId) => {
  const artistUrl = yandexHelper.buildArtistInfoUrl(artistId);

  return axios({
    method: 'get',
    url: artistUrl,
  });
}

const getAlbumsIdsByArtistId = (artistId) => {
  const artistUrl = yandexHelper.buildArtistAlbumsUrl(artistId);

  return axios({
    method: 'get',
    url: artistUrl,
  }).then((resp) => {
    return resp.data.albumIds;
  });
}


const getAlbumDataById = (albumId) => {
  const albumUrl = yandexHelper.buildAlbumUrl(albumId);

  return axios({
    method: 'get',
    url: albumUrl,
  });
}


module.exports = {
  getSuggestDataByGroupName,
  getArtistDataById,
  getAlbumsIdsByArtistId,
  getAlbumDataById
}