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
                        const entities = resp.data.entities;
                        if (entities.length) {
                            const artistId = entities.find((val) => {
                                return val.hasOwnProperty('type') && val.type === 'artist' && val.results && val.results.length
                            }).results[0].artist.id;

                            http.getArtistDataById(artistId).then((resp) => {
                                addRowToArtistWorksheet(resp);
                                http.getAlbumsIdsByArtistId(artistId).then((albumIds) => {
                                    Promise.all(
                                        albumIds.map((albumId) => {
                                            http.getAlbumDataById(albumId).then((resp) => {
                                                addRowToAlbumsWorksheet(artistId, albumId, resp);
                                            })
                                        })
                                    ).then(() => {
                                        resolve();
                                    })
                                })
                            });
                        }
                        else {
                            resolve();
                        }
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
    return artistData.similar.map((similarObj) => similarObj.name).join(customSeparator);
}

const setArtistWorksheetColumns = () => {
    artistsWorksheet.columns = [
        { header: 'Id', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'SimilarArtists.', key: 'similarArtists' },
        { header: 'Info.', key: 'artistInfo' },
        { header: 'Tags.', key: 'artistTags' },
        { header: 'Country.', key: 'artistCountry' },
        { header: 'SocialCounters.', key: 'artistSocialCounters' }
    ];
}


const setAlbumsWorksheetColumns = () => {
    albumsWorksheet.columns = [
        { header: 'ArtistId', key: 'artistId' },
        { header: 'Id', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'ReleaseDate', key: 'releaseDate' },
        { header: 'Label.', key: 'label' }
    ];
}

const setTracksWorksheetColumns = () => {
    tracksWorksheet.columns = [
        { header: 'Id', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'AlbumId', key: 'albumId' },
        { header: 'ArtistId', key: 'artistId' }
    ];
}

const addRowToArtistWorksheet = (resp) => {
    const respData = resp.data;
    const artistData = respData.artist;

    const id = artistData.id
    const name = artistData.name;
    const similarArtists = getSimilarFromArtistData(respData);
    const artistInfo = artistData.description.text;
    const artistTags = artistData.genres.join(customSeparator);
    const artistCountry = artistData.countries.join(customSeparator);
    const artistSocialCounters = getSimilarSocialCounters(respData.socialCounters);

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

const addRowToAlbumsWorksheet = (artistId, albumId, resp) => {
    const respData = resp.data;

    albumsWorksheet.addRow({
        artistId,
        id: albumId,
        name: respData.title,
        releaseDate : respData.releaseDate,
        labels: respData.labels.map((labelObj) => labelObj.name).join(customSeparator),
    });

    addTracksToWorksheet(respData.volumes, artistId, albumId);

}

const addTracksToWorksheet = (tracksArr, artistId, albumId) => {
    tracksArr.map((trackObj) => {
        tracksWorksheet.addRow({
            id: trackObj.id,
            name: trackObj.title,
            albumId : albumId,
            artistId: artistId
        });
    })
}

