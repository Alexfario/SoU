const axios = require('axios');

const yandexHelper = require('./yandex-helper');


const yandexArtistUrl = yandexHelper.artistUrl;
const yandexSuggestUrl = yandexHelper.suggestUrl;


static const getSuggestDataByGroupName = (groupName) => {
  const suggestRequestBody = yandexHelper.buildSuggestRequestBody(groupName);

  axios({
    method: 'post',
    url: yandexSuggestUrl,
    data: suggestRequestBody,
    headers: {
      Cookie: 'yandexuid=1964478881501233192; _ym_uid=1502261297154585437; mda=0; fuid01=5993031d4d38d607.shsyKsTA0C2YetpBe3ySX8Vz-U-TJNX8jBEQW4hW30hanYa5DqfCqhi0ND1WzK89F0qyWJKXY3q3Y0Klw243BZYqYjY0zw68ax4ByvXJAghgGAP2rhAqDrlXUT5wkiOg; my=YwA=; L=B0p5BnZtQlFSB2kIU19kYlxeB3dPRHxZJQg3SyEgMQ==.1526471196.13501.384876.a05a962a6f534098db7d0f3ffdb4bbda; yandex_login=A1exfar; i=rDKoUWun2zvYrGUbOsSREnTS85ytcoNtyjyDMWkcrKc+VJSOYnrWt5RSEz/botBcfOYGHnCSB8qdVyarP1divCNQVGI=; _ym_d=1531131102; Session_id=3:1531836128.5.0.1526471196393:CzgV2Q:1c.1|440553800.0.2|184684.577873.HfjuZlAl1iXQnJF_W8lB-OLaEwI; sessionid2=3:1531836128.5.0.1526471196393:CzgV2Q:1c.1|440553800.0.2|184684.304974.tnPAqz5adSdW_52p6Zi-MWFLCvY; _ym_isad=1; yp=1816593192.yrts.1501233192#1841831196.udn.cDpBbGV4ZXkgRmFyYm90a28%3D#1547246050.szm.1:1920x1080:1920x974#1563025477.as.1; device_id="a2abab550fea6f33fd023d4676e90293e7df5848c"; lastVisitedPage=%7B%22440553800%22%3A%22%2Fusers%2FA1exfar%2Fplaylists%22%7D; _ym_visorc_1028356=b'
    }
  });
}


module.exports = {
  getSuggestDataByGroupName
}