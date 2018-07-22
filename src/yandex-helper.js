const suggestUrl = 'https://music.yandex.ru/handlers/suggest.jsx';


const buildSuggestRequestBody = (searchQuery, sign) => {
  return `text=${encodeURIComponent(searchQuery)}&sign=${sign}&experiments=%7B%22rotorSimilarDither%22%3A%22new_track_dither_01%22%2C%22rotorRandomStation%22%3A%22default%22%2C%22musicAutoFlow%22%3A%22default%22%2C%22musicNewGenres%22%3A%22on%22%2C%22promoteOnYourWave%22%3A%22promote_on_your_wave%22%2C%22musicYellowButtonAuth%22%3A%22control%22%2C%22rotorNewSettings%22%3A%22on%22%2C%22webMusicPreroll%22%3A%22default%22%2C%22ugc%22%3A%22on-upload%22%2C%22djvuCandidates%22%3A%22daily_based_neverheard%22%2C%22marketingMail_5%22%3A%22disabled%22%2C%22musicCspLogger%22%3A%22default%22%2C%22wizardFromIchwill%22%3A%22ichwill%22%2C%22musicPromoProductsCards%22%3A%22year1690VSyear0%22%2C%22musicExperimentalPlayer%22%3A%22default%22%2C%22wizardPersonalization%22%3A%22wizard_use_personalization%22%2C%22pushXivaWebRequestColors%22%3A%22default%22%2C%22referralCounter%22%3A%22on%22%2C%22rotorSafeTopSize%22%3A%22500%22%2C%22marketingMail_100%22%3A%22enabled%22%2C%22pepsiButton%22%3A%22default%22%2C%22musicPromoProductsHeaderFaqDevices%22%3A%22promoheader169jesus3%22%2C%22marketingMail_95%22%3A%22enabled%22%2C%22musicLandingIntentPlaylistCount%22%3A%22default%22%2C%22musicPlaylistNoTrack%22%3A%22on%22%2C%22musicLoginWall%22%3A%22tracks-0%22%2C%22MusicPreroll%22%3A%22default%22%2C%22musicSuggest%22%3A%22on%22%2C%22musicPrice%22%3A%22default%22%2C%22feedTriggers%22%3A%22default%22%2C%22ugcPrivat%22%3A%22on%22%2C%22strm%22%3A%22default%22%2C%22musicSearchFormula%22%3A%22service-default%22%2C%22musicStatsLogger%22%3A%22default%22%2C%22musicVideoOnArtistPage%22%3A%22default%22%2C%22marketingMail%22%3A%22disabled%22%2C%22musicTakeEMail%22%3A%22on%22%2C%22webAutoplaylistsOnMain%22%3A%22control%22%2C%22logTrackFeatures%22%3A%22playlist_log_tracks%22%2C%22antihype%22%3A%22default%22%2C%22pepsiTheme%22%3A%22default%22%2C%22marketingMail_25%22%3A%22disabled%22%2C%22musicErrorLogger%22%3A%22default%22%2C%22rotorSafeTopTracksCount%22%3A%22twelve%22%2C%22turboQuasar%22%3A%22alice_turbo_hurt_me_plenty%22%2C%22musicMobileWebLocked%22%3A%22no%22%2C%22rotorStations%22%3A%22formula_without_station_time_user_count_v2%22%2C%22musicTestDebugProducts%22%3A%22default%22%2C%22plusWeb%22%3A%22default%22%2C%22miniBrick%22%3A%22app%22%2C%22musicgift%22%3A%22custom_2%22%2C%22branchLinks%22%3A%22default%22%2C%22musicPromoBlockTypes%22%3A%22option7%22%2C%22userFeed%22%3A%22feed_october_streams_potd_rank_formula_with_play_skips%22%2C%22useUserGroups%22%3A%22default%22%2C%22rotorIosHappyNewYearDesign%22%3A%22default%22%2C%22pushXivaWebColorsSwitcher%22%3A%22on%22%2C%22musicCollectivePlaylist%22%3A%22on%22%2C%22plusWebSale%22%3A%22default%22%2C%22adv%22%3A%22uhoFree%22%2C%22promotionsTargeting%22%3A%22takeAndSort%22%2C%22marketingMail_10%22%3A%22disabled%22%2C%22musicCheckPass%22%3A%22on%22%2C%22rotorSampleCandidates%22%3A%22sample_candidates_10000%22%2C%22musicAdsVolumeIncrease%22%3A%22default%22%2C%22musicArmeniaLang%22%3A%22on%22%2C%22musicArtistStat%22%3A%22on%22%7D&lang=ru&external-domain=music.yandex.ru&overembed=false`
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
  buildSuggestRequestBody,
  suggestUrl
};
