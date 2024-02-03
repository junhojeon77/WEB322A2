/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Jun Ho JeonStudent ID: 173583212_ Date: 2024-02-02
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const legoData = require("./modules/legoSets");
const express = require('express');
const app = express();


const HTTP_PORT = process.env.PORT || 8080;

legoData.initialize()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Assignment 2: Jun Ho Jeon - 173583212');
    });

    app.get('/lego/sets', (req, res) => {
        legoData.getAllSets()
          .then(allSets => res.json(allSets))
      });

    app.get('/lego/sets/num-demo', (req, res) => {
      const setNum = '045-1'; 
      legoData.getSetByNum(setNum)
        .then((set) => {
          if (set) {
            res.json(set);
          } else {
            res.status(404).send('Set not found');
          }
        })
        .catch((error) => {
          console.error('Error getting set by number:', error);
          res.status(500).send('Internal Server Error');
        });
    });

    app.get('/lego/sets/theme-demo', (req, res) => {
      const theme = 'town'; 
      legoData.getSetsByTheme(theme)
        .then((sets) => {
          res.json(sets);
        })
        .catch((error) => {
          console.error('Error getting sets by theme:', error);
          res.status(500).send('Internal Server Error');
        });
    });

    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing Lego data:', error);
  });


  