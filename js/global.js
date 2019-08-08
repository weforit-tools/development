verbs = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With','Is','Am','Are'];
uppers = ['Id', 'Tv'];
var snackbar_timeout = 5000;
var copied_message = 'Copied';

(function($){
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
	$.fn.scrollto = function(target,offset){
		if(!offset){
			offset = 0;
		}
        $('html, body').animate({
            scrollTop: ($("#"+target).offset().top - offset)
        }, 500);
        return this;
	}
})(jQuery);

function snackbar(message,timeout){
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
function scrollto(target,offset){
	if(!offset){
		offset = 0;
	}
    $('html, body').animate({
        scrollTop: ($("#"+target).offset().top - offset)
    }, 500);
    return this;
}
function load_css(url){
    var node = document.createElement("link");
    node.setAttribute("href",url);
   node.setAttribute("type","text/css"); node.setAttribute("rel","stylesheet");
    document.getElementsByTagName("head")[0].appendChild(node);
}

function load_js(url){
    var node = document.createElement("script");
    node.setAttribute("src",url);
    node.setAttribute("type","text/javascript");
    document.getElementsByTagName("head")[0].appendChild(node);
}

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
function download(input,filename){
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

function inlineWorker(selector, callback) {
  window.URL = window.URL || window.webkitURL || null;
  
  var script = document.querySelector(selector);
  if (script.type === 'javascript/worker') {
    var blob = new Blob([script.textContent]);
    callback( new Worker( window.URL.createObjectURL(blob) ) );
  }
}

function start_process(selector, callback) {
  window.URL = window.URL || window.webkitURL || null;
  
  var script = document.querySelector(selector);
  if (script.type === 'javascript/process') {
    var blob = new Blob([script.textContent]);
    callback( new Worker( window.URL.createObjectURL(blob) ) );
  }
}
function random_str(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

if(!$(".modal").parent().is('body'))
    $(".modal").appendTo("body");