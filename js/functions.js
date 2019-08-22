/* * * * * * * * * * * * * * * * * * *
 * @post_message can be used only
 * inside a Worker
 * * * * * * * * * * * * * * * * * *
*/
function post_message(type,message){
  postMessage({'type':type,'message':message});
} 
function param(name) {
  return (location.search.split(name + '=')[1] || '').split('&')[0];
}
function get_filetype(name){
  if(name){
    name = (name.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
    return name;
  }
}
function get_filename(filename){
  return filename.split('.').slice(0, -1).join('.');
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
function timestamp(microseconds){
  if(microseconds === true){
    return Math.floor(Date.now())
  }
  return Math.floor(Date.now() / 1000);
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
function num_to_alpha(num){
  var s = '', t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t)/26 | 0;
  }
  return s || undefined;
}
/* * * * * * * * * * * * * * * * * * * * * * * * *
 * @romanize function
 * https://stackoverflow.com/a/9083076
 * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
      roman = '',
      i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
/* * * * * * * * * * * * * * * * * * * * * * * * *
 * @get_filesize function
 * https://stackoverflow.com/a/14919494
 * * * * * * * * * * * * * * * * * * * * * * * * *
*/
function get_filesize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}