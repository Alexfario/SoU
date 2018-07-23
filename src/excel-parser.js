const path = require('path');
const Excel = require('exceljs');
const http = require('./http-request-service');

const excelFilePath = path.resolve('./public/Experty.xlsx');
const artistFilePath = path.resolve('./public/Artists.xlsx');

const customSeparator = ',';


let workbook = new Excel.Workbook();
let artistsWorkbook = new Excel.Workbook();

let artistsWorksheet;
let albumsWorksheet;
let tracksWorksheet;


workbook.xlsx.readFile(excelFilePath)
    .then(() => {
        artistsWorksheet = artistsWorkbook.addWorksheet('Artists');
        albumsWorksheet = artistsWorkbook.addWorksheet('Albums');
        tracksWorksheet = artistsWorkbook.addWorksheet('Tracks');
        setArtistWorksheetColumns();
        setAlbumsWorksheetColumns();
        setTracksWorksheetColumns();

        const groupArr = workbook.worksheets[0].columns[0].values.filter((groupName) => groupName);
        return Promise.all(groupArr.map((groupName) => {
            return new Promise((resolve) => {
                http.getSuggestDataByGroupName(groupName).then(
                    (resp) => {
                        const artists = resp.data.artists.items;
                        if (artists.length) {
                            const artist = artists[0]
                            const artistId = artist.id;
                            http.getArtistDataById(artistId).then((resp) => {
                                const artistName = artist.name;
                                addArtistToWorksheet(resp);
                                http.getAlbumsIdsByArtistId(artistId).then((albumIds) => {
                                    Promise.all(
                                        albumIds.map((albumId) => {
                                            return new Promise((res, rej) => {
                                                http.getAlbumDataById(albumId).then((resp) => {
                                                    addAlbumToWorksheet(artistId, artistName, albumId, resp);
                                                }).then(() => {
                                                    res();
                                                }).catch((e) => {
                                                    console.error(e);
                                                });
                                            })
                                        })
                                    ).then(() => {
                                        resolve();
                                    }).catch((e) => {
                                        console.error(e);
                                    })
                                })
                            });
                        }
                        else {
                            resolve();
                        }
                    }).catch((e) => {
                        console.error(e);
                    })
            });
        }))
    })
    .then(() => {
        artistsWorkbook.xlsx.writeFile(artistFilePath);
    })


const getSimilarSocialCounters = (socialCountersObj) => {
    let socialCounterString = '';
    const socialKeys = Object.keys(socialCountersObj);
    if (socialKeys.length) {
        socialCounterString = `${socialKeys[0]}:${socialCountersObj[socialKeys[0]]}`;
        for (let i = 1, il = socialKeys.length; i < il; ++i) {
            socialCounterString += `,${socialKeys[i]}:${socialCountersObj[socialKeys[i]]}`
        }
    }
    return socialCounterString;
}


const getSimilarFromArtistData = (artistData) => {
    return artistData.similar ? artistData.similar.map((similarObj) => similarObj.name).join(customSeparator) : '';
}

const setArtistWorksheetColumns = () => {
    artistsWorksheet.columns = [
        { header: 'Id', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'SimilarArtists', key: 'similarArtists' },
        { header: 'Info', key: 'artistInfo' },
        { header: 'Tags', key: 'artistTags' },
        { header: 'Country', key: 'artistCountry' },
        { header: 'SocialCounters', key: 'artistSocialCounters' }
    ];
}


const setAlbumsWorksheetColumns = () => {
    albumsWorksheet.columns = [
        { header: 'ArtistId', key: 'artistId' },
        { header: 'Id', key: 'id' },
        { header: 'ArtistName', key: 'artistName' },
        { header: 'Name', key: 'name' },
        { header: 'ReleaseDate', key: 'releaseDate' },
        { header: 'Labels', key: 'labels' }
    ];
}

const setTracksWorksheetColumns = () => {
    tracksWorksheet.columns = [
        { header: 'Id', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'AlbumId', key: 'albumId' },
        { header: 'ArtistId', key: 'artistId' },
        { header: 'AlbumName', key: 'albumName' },
        { header: 'ArtistName', key: 'artistName' }
    ];
}

const addArtistToWorksheet = (resp) => {
    const respData = resp.data;
    const artistData = respData.artist;

    const id = artistData.id
    const name = artistData.name;
    const similarArtists = getSimilarFromArtistData(respData);
    const artistInfo = artistData.description ? artistData.description.text : '';
    const artistTags = artistData.genres ? artistData.genres.join(customSeparator) : '';
    const artistCountry = artistData.countries ? artistData.countries.join(customSeparator) : '';
    const artistSocialCounters = respData.socialCounters ? getSimilarSocialCounters(respData.socialCounters) : '';

    artistsWorksheet.addRow({
        id,
        name,
        similarArtists,
        artistInfo,
        artistTags,
        artistCountry,
        artistSocialCounters
    });
}

const addAlbumToWorksheet = (artistId, artistName, albumId, resp) => {
    const respData = resp.data;
    const name = respData.title || '';

    albumsWorksheet.addRow({
        artistId,
        id: albumId,
        artistName,
        name,
        releaseDate: respData.releaseDate ? respData.releaseDate : respData.year,
        labels: respData.labels ? respData.labels.map((labelObj) => labelObj.name).join(customSeparator) : '',
    });

    addTracksToWorksheet(respData.volumes[0], artistId, albumId, artistName, name);

}

const addTracksToWorksheet = (tracksArr, artistId, albumId, artistName, albumName) => {
    tracksArr.map((trackObj) => {
        tracksWorksheet.addRow({
            id: trackObj.id,
            name: trackObj.title,
            albumId,
            artistId,
            artistName,
            albumName
        });
    })
}

