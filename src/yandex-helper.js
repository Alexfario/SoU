
const buildSearchUrl = (searchQuery) => {
  return `https://music.yandex.ru/handlers/music-search.jsx?text=${encodeURIComponent(searchQuery)}+&type=artists`
}

const buildArtistInfoUrl = (artistId) => {
  return `https://music.yandex.ru/handlers/artist.jsx?artist=${artistId}&what=info`;
}

const buildArtistAlbumsUrl = (artistId) => {
  return `https://music.yandex.ru/handlers/artist.jsx?artist=${artistId}&what=albums`;
}

const buildAlbumUrl = (albumId) => {
  return `https://music.yandex.ru/handlers/album.jsx?album=${albumId}`;
}


module.exports = {
  buildArtistInfoUrl,
  buildArtistAlbumsUrl,
  buildAlbumUrl,
  buildSearchUrl
};
