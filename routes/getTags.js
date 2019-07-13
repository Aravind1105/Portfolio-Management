var _ = require('underscore');

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function getTags(sentence, lexicon) {
  // console.log(sentence);
  var keyToMatch = _.keys(lexicon)[0];
  var exp = "\\b(" + escapeRegExp(keyToMatch) + ")\\s";
  var regExp = new RegExp(exp, 'ig');
  if (sentence.match(regExp))
    return lexicon;
}
module.exports = getTags;
