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
					callback();
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
			callback();
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