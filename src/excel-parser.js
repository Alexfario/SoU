const path = require('path');
const Excel = require('exceljs');
const httpRequestService = require('./http-request-service');

const excelFilePath = path.resolve('./public/Experty.xlsx');


let workbook = new Excel.Workbook();
workbook.xlsx.readFile(excelFilePath)
    .then(() => {
      const groupArr =  workbook.worksheets[0].columns[0].values.filter((groupName) => groupName);
      groupArr.forEach((groupName) => {
        httpRequestService.getSuggestDataByGroupName(groupName).then((resp) => {
          const entities = resp.entities;
          if(entities.length) {
            const artistData = entities.find((val) => val.hasOwndProperty('type') && val.results.length && val.results[0]);
                        // get artist
              // save to groups.csv and get albums
          }
        })
      })
    });

