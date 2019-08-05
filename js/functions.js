
function param(name) {
  return (location.search.split(name + '=')[1] || '').split('&')[0];
}
function get_filetype(name){
  if(name){
    name = (name.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
    return name;
  }
}
function get_filesize(bytes) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
}
function is_url(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}

String.prototype.reverseText = function() {
	var text = '';
    for(i=this.length-1;i>=0;i--){
    	text = text+this[i];
    }
    return text;
}

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
String.prototype.removeSlug = function() {
  return this.replace(/[-_]+/g, ' ');
}
String.prototype.slugify = function(hyphen) {
 var slug;
 if(hyphen==true){
  slug = this.replace(/[\s_]+/g, '-');
 }else{
  slug = this.replace(/[\s-]+/g, '_');
 }
 slug =  slug.toString().toLowerCase()
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
       .replace(/\-\-+/g, '-')         // Replace multiple - with single -
       .replace(/^-+/, '')             // Trim - from start of text
       .replace(/-+$/, '');            // Trim - from end of text
 return slug.trim();
}
String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

String.prototype.str_replace = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.encodeHTML = function () {
	return this.replace(/&/g, '&amp;')
	           .replace(/</g, '&lt;')
	           .replace(/>/g, '&gt;')
	           .replace(/"/g, '&quot;')
	           .replace(/'/g, '&apos;');
};
String.prototype.decodeHTML = function () {
    return this.replace(/&apos;/g, "'")
               .replace(/&quot;/g, '"')
               .replace(/&gt;/g, '>')
               .replace(/&lt;/g, '<')
               .replace(/&amp;/g, '&');
};