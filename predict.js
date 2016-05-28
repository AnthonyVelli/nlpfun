'use strict';
const pos = require('pos');
const fs = require('fs');
const tagger = new pos.Tagger();
const lexer = new pos.Lexer();
const helper = require('./helper');
const svm = require('node-svm');


const svmModel = loadTrainedModel('svm.txt');
const toPredict = getPredictData('predictionData.txt');
predict(svmModel, toPredict);

function loadTrainedModel(trainedSVM){
    let oldModel = JSON.parse(fs.readFileSync('./data/'+trainedSVM), 'utf8');
    const clf = new svm.CSVC();
    return svm.restore(oldModel);
}

function getPredictData(file){
    let trainText = fs.readFileSync('./data/'+file, 'utf8');
    trainText = helper.createSentences(trainText);
    let tagSum = trainText.map(trainSent => {
        let words = lexer.lex(trainSent);
        let taggedSent = tagger.tag(words);
        return [trainSent, helper.sumTags(taggedSent)];
    });
    return tagSum;
}

function predict(svmModel, toPredict){
    let results = toPredict.map(each => [each[0], svmModel.predictSync(each[1])]);
    console.log('training complete');
    console.log('trained: '+results.length);
    console.log('positive: '+results.filter(sentence => sentence[1]).length);
    console.log('negative: '+results.filter(sentence => !sentence[1]).length);
    console.log('\n');
    console.log('writing to /data/results');
    console.log('\n');
    fs.writeFileSync('./data/results/fact.txt', results.filter(each => each[1]).map(each => each[0]).join('\n\n'));
    fs.writeFileSync('./data/results/noFact.txt', results.filter(each => !each[1]).map(each => each[0]).join('\n\n'));
}