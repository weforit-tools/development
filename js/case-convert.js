verbs = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With','Is','Am','Are'];
uppers = ['Id', 'Tv'];
String.prototype.toCapitalizeCase = function(){
  return this.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};
String.prototype.toSentenceCase = function(){
  var text = this;
  text = text + '.';
  text = text.replace(/\w[^.?!:\n]*[.?!:\n$]+/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  text = text.substr(0, text.length - 1);
  return text;
}

String.prototype.toAlternatingCase = function() {
    var str = "",
        i;
    var isLower = false;
    for (i = 0; i < this.length; i++) {
        if (/\s/.test(this[i])) {
            str += this[i];
            continue;
        }
        if (isLower)
            str += this[i].toLowerCase();
        else
            str += this[i].toUpperCase();
        if (this[i] != this[i].toUpperCase() || this[i] != this[i].toLowerCase())
            isLower = !isLower;
    }
    return str;
}
String.prototype.toTitleCase = function() {
  var i, str;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    
    for (i = 0; i < verbs.length; i++)
        str = str.replace(new RegExp('\\s' + verbs[i] + '\\s', 'g'), function(txt) {
            return txt.toLowerCase();
        });
    for (i = 0; i < uppers.length; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());
    return str;
};