class vcard{
	construct(){
		this.card = [];
	}
	output(){
		this.add('d');
	}
	add(val){
		var card = [];
		card.push(this.begin());
		card.push(this.end());
		console.log(card);
	}
	name(first,last,title){
		return 'N:'+last+';'+first+';;'+title+';';
	}
	begin(){
		var a = [];
		a.push('BEGIN:VCARD');
		a.push('VERSION:2.0');
		return a.join('\r\n');
	}
	end(){
		var a = [];
		a.push('END:VCARD');
		return a.join('\r\n');
	}
}