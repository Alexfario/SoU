const axios = require('axios');

const yandexHelper = require('./yandex-helper');
const userConfig = require('./user-config');

const sign = userConfig.sign;
const cookie = userConfig.cookie;


const yandexSuggestUrl = yandexHelper.suggestUrl;

const getSuggestDataByGroupName = (groupName) => {
  const suggestRequestBody = yandexHelper.buildSuggestRequestBody(groupName, sign);

  return axios({
    method: 'post',
    url: yandexSuggestUrl,
    data: suggestRequestBody,
    headers: {
      Cookie: cookie
    }
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