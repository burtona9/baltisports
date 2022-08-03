const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio');

const app = express();

const PORT = process.env.port || 3000;

const website = 'https://fulltime.thefa.com/fixtures.html?league=6392495&selectedSeason=40148395&selectedDivision=832332828&selectedCompetition=0&selectedFixtureGroupKey=1_558262093';


const FIXTURE_PARTS = ['TYPE','DATE','HOME','EMPTY','V','EMPTY','AWAY','VENUE','COMP','EMPTY'];
let fixtures = [];
try {
    axios(website).then((res) => {
      const data = res.data;
 
      const $ = cheerio.load(data);
  
     
  
      $('tr', data).each(function () {
        if($(this).text().indexOf('Balti') > 0){
            let curFixture = {};
            let i = 0;
            $('td',$(this)).each(function (){
                if(FIXTURE_PARTS[i] != 'EMPTY' && FIXTURE_PARTS[i] != 'V'){
                    let part = $(this).text();
                    part.trim();
                    part = part.toString().replace(/\t/g, '').split('\r\n');
                    part = part.toString().replace(/\n/g, '').split('\r\n');
                    
                    curFixture[FIXTURE_PARTS[i]] = part;
                }
                i++;
            });
       
            fixtures.push(curFixture);
          
        }

        //console.log(fixtures);
        // let title = $(this).text();
        // if(title.indexOf('Balti') > 0){
        // title.trim();
        // title = title.toString().replace(/\t/g, '').split('\r\n');
        // title = title.toString().replace(/\n/g, '').split('\r\n');
        // fixtures.push(
        //   title
        // );
        // }

        // let fixture = {

        // }
     
        //console.log(fixtures);
      });
      console.log(fixtures);
    });

    let output = '<h1>help</h1>';
       app.get('/', (req, res) => {
          res.json(output);
        });
  } catch (error) {
    console.log(error, error.message);
  }
  
  app.listen(PORT, () => {
     console.log(`server is running on PORT:${PORT}`);
  });