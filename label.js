'use strict';
const pos = require('pos');
const fs = require('fs');
const nlp = require('nlp-toolkit');
const readline = require('readline');
const tagger = new pos.Tagger();
const lexer = new pos.Lexer();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const helper = require('./helper');
const posIndex = require('./poslabels');


label('trainingData.txt');



function label(file){
    let sampleText = fs.readFileSync('./data/'+file, 'utf8');
    sampleText = helper.createSentences(sampleText);
    let x = 0;
    let results = [];
    next(sampleText[x]);
    function next(toLog) {
        x++;
        let words = lexer.lex(toLog);
        let taggedWords = tagger.tag(words);
        let tagSum = helper.sumTags(taggedWords);

        rl.question(toLog+" ", (data) => {
            console.log({sentence: toLog, call: parseInt(data), tag: tagSum});
            console.log('\n\n\n');
            results.push({sentence: toLog, call: parseInt(data), tag: tagSum});
            if (x < sampleText.length){
                next(sampleText[x]);
            } else {
                console.log('training complete');
                console.log('trained: '+results.length);
                console.log('positive: '+results.filter(sentence => sentence.call).length);
                console.log('negative: '+results.filter(sentence => !sentence.call).length);
                console.log('writing to data/labelled.txt');
                fs.writeFileSync('/data/labelled.txt', JSON.stringify(results));
            }
        });
    }
}

