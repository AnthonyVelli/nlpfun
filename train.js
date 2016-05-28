'use strict';
const fs = require('fs');
const svm = require('node-svm');
const helper = require('./helper');

trainSVM('labelled.txt');

function trainSVM(trainedData){
    const clf = new svm.CSVC();
	let labelled = JSON.parse(fs.readFileSync('./data/'+trainedData, 'utf8')).map(sent => [sent.tag, sent.call]);
    clf.train(labelled)
    .progress(rate => console.log(rate))
    .spread((model, summary) => {
    	console.log(summary);
        fs.writeFileSync('./data/svm.txt', JSON.stringify(model));
    });
}