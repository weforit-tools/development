verbs = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With','Is','Am','Are'];
uppers = ['Id', 'Tv'];

(function($){
	var snackbar_timeout = 5000;
	var copied_message = 'Copied';
	$(document).on('click','[data-dismiss="snackbar"]',function(){
		$('.snackbar').collapse('hide');
		setTimeout(function(){
			$('.snackbar').remove();
		},200);
	});

	$.fn.snackbar = function(message,timeout){
		$('body').append(function(){
			var snackbar = '<div class="collapse snackbar"><div class="content">'+message+'</div><button data-dismiss="snackbar">&times;</button></div>'
			return snackbar;
		});
		setTimeout(function(){
			$('.snackbar').collapse('show');
		},0);
		
		setTimeout(function(){
			$('.snackbar').collapse('hide');
		},timeout?timeout:snackbar_timeout);

	}
	$.fn.click2download = function(input,filename){
		$(this).on('click',function(e){
			e.preventDefault();
			if(!input){
				return false;
			}
			input = $(input).val();
			if(!input.trim()){
				return false;
			}
			var filename = prompt('Please Enter File Name',filename?filename:'file.txt');
			if(!filename || filename == 'null'){
				return false;
			}
			filename = filename.trim();
			if(!filename){
				return false;
			}
			var blob = new Blob([input], {type:'text/plain'});
			var downloadLink = document.createElement("a");
			downloadLink.download = filename;
			if (window.webkitURL != null){
				// Chrome allows the link to be clicked
				// without actually adding it to the DOM.
				downloadLink.href = window.webkitURL.createObjectURL(blob);
			}else{
				// Firefox requires the link to be added to the DOM
				// before it can be clicked.
				downloadLink.href = window.URL.createObjectURL(blob);
				downloadLink.onclick = destroyClickedElement;
				downloadLink.style.display = "none";
				document.body.appendChild(downloadLink);
			}
			downloadLink.click();
		});
		return this;
	}
	$.fn.click2copy = function(input){
		$(this).on('click',function(e){
			e.preventDefault();
			if(!input){
				return false;
			}
			if(!$(input).val().trim()){
				return false;
			}
			$(input).select();
			if(document.execCommand("copy") == true){
				$(document).snackbar(copied_message);
			}
		});
	}
	$.fn.click2loadFile = function(output,callback){
		$(this).on('change',function(e){
			e.preventDefault();
			var reader = new FileReader();
			reader.onload = function(e){
				$(output).val(e.target.result);
				if (typeof callback === "function") {
				    // do something
					callback(e);
				}
			}
			input = $(this).prop('files')[0];
			if(!input){
				return;
			}
			reader.readAsText(input);
		});
	}
})(jQuery);
$('[data-toggle="tooltip"]').tooltip();
/*
setInterval(function(){
	if(adblock() == true && app.current_url.indexOf('/something-wrong') == '-1'){
		var target = (window.protocol?window.protocol:'https')+'://'+window.location.hostname+'/something-wrong';
		window.location = target;
	}
},1000);
*/

function adblock(){
	if(!$('.ads').height() || 
		!$('.ads').width() ||
		$('.ads').css('visibility') != 'visible'){
		return true;
	}
	return false;
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
function copy_text(target){
	$(target).select();
	return document.execCommand("copy");
}
function load_file(input,output,callback){
	var reader = new FileReader();
	reader.onload = function(e){
		$(output).val(e.target.result);
		if (typeof callback === "function") {
		    // do something
			callback(e);
		}
	}
	input = $(input).prop('files')[0];
	if(!input){
		return;
	}
	reader.readAsText(input);
}
function save_file(string, filename){
	var blob = new Blob([string], {type:'text/plain'});
	var downloadLink = document.createElement("a");
	downloadLink.download = filename;
	if (window.webkitURL != null){
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(blob);
	}else{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(blob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function text_counter(str){ 
	if(!str){
		return {
		    'chars':0,
		    'lines':0,
		    'words':0
		}
	}
  var v = str.trim();
  v = v.replace(/[ ]{2,}/gi," "); //2 or space into 1 space
  var chars = v.length;
  var total_lines=0,lines = v.split(/\r?\n/g); // lines
  var total_words=0, words = v.split(/[\s,]+/); // words
  //total_lines = lines.length;
  
  $.each(lines,function(key,value){
    value = value.trim();
    if(!value){
      return true;
    }
    total_lines++;
  });
  
  String.prototype.toTitleCase
  $.each(words,function(key,value){
    value = value.trim();
    if(!value){
      return false;
    }
    total_words++;
  });
  return {
    'chars':chars,
    'lines':total_lines,
    'words':total_words
  }
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