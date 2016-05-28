'use strict';
const posIndex = require('./poslabels');

function createSentences(document) {
    return document.match( /[^\.!\?\n]+[\.!\?\n]+/g ).map(sent => sent.trim());
}


function sumTags(taggedSentence){
    let tagIDs = new Array(posIndex.length);
    tagIDs.fill(0);
    taggedSentence.forEach(word => tagIDs[posIndex.indexOf(word[1])]++);
    return tagIDs;
}

module.exports = {
	createSentences: createSentences,
	sumTags: sumTags
};