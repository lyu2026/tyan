document.addEventListener('deviceready',()=>{

const _W=function(){let n=arguments.length;if(n>0&&n%2==0)for(let i=0;i<n;i+=2){let k=arguments[i],v=arguments[i+1];if(_T(k,'string')&&(k=k.replace(/\s/,''))){k.includes('.')&&k.split('.').forEach(_=>(window[_]=v))||(window[k]=v)}}}
const _T=(a,b)=>{const _=Object.prototype.toString.call(a).split(' ').pop().replace(/]$/,'').toLowerCase();if(b=='element')return _.includes(b)&&a.isConnected;return b?_.includes(b):_};
String.prototype.html=function(){return(new DOMParser()).parseFromString(this,'text/html')};
Element.prototype.sa=function(){if(arguments.length>0){for(let arg of arguments){let a=arguments[0];if(_T(a,'object')){for(let k in a)if((k=k.trim()))this.setAttribute(k,a[k].toString());break}if(typeof arg=='string'&&(arg=arg.trim()))this.setAttribute(arg,'')}}return this};
Element.prototype.ga=function(){if(arguments.length<1)return null;const ks=[...(new Set(arguments))].filter(_=>(typeof _=='string')&&_.trim()).map(_=>_.trim());if(ks.length==1)return this.getAttribute(ks[0]);let _={};for(let k of ks)_[k]=this.getAttribute(k);return _};
Element.prototype.da=function(){if(arguments.length>0)(new Set(arguments)).forEach(_=>_T(_,'string')&&(_=_.trim())&&this.hasAttribute(_)&&this.removeAttribute(_));return this};
Document.prototype.n=function(t,as,s){let _=this.createElement(t);if(as){for(let k in as){if(k.startsWith('on')&&_T(as[k],'function')){_[k]=as[k];continue}_.sa({[k]:as[k]})}}if(s)_.h(s);return _};
Document.prototype.o=Element.prototype.o=function(_){return this.querySelector(_)};
Document.prototype.os=Element.prototype.os=function(_){if(_=='text'){const NS=[],X=document.createNodeIterator(this,NodeFilter.SHOW_TEXT,_=>_.textContent.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);_=X.nextNode();while(_){NS.push(_);_=X.nextNode()}return NS}return Array.from(this.querySelectorAll(_))};
Element.prototype.h=function(_){if(undefined===_)return this.innerHTML.trim();if(_T(_,'string'))this.innerHTML=_.trim();return this};
Number.prototype.t=function(){const s=Math.abs(Math.floor(this)),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),rs=Math.floor(s%60),fh=h>0?String(h).padStart(2,'0')+':':'',fm=String(m).padStart(2,'0'),fs=String(rs).padStart(2,'0');return s==0?'00:00':`${this>0?'':'-'}${fh}${fm}:${fs}`};
String.prototype.md5=function(){const s=unescape(encodeURIComponent(this));let l=8*s.length,O=[].fill(0,0,s.length>>2-1);for(let i=0;i<l;i+=8)O[i>>5]|=(255&s.charCodeAt(i/8))<<i%32;O[l>>5]|=128<<l%32;O[14+(l+64>>>9<<4)]=l;const A=(a,b,c,d,e,f)=>F(H(F(F(b,a),F(d,f)),e),c);const B=(a,b,c,d,e,f,h)=>A(b&c| ~b&d,a,b,e,f,h);const C=(a,b,c,d,e,f,h)=>A(b&d|c& ~d,a,b,e,f,h);const D=(a,b,c,d,e,f,h)=>A(b^c^d,a,b,e,f,h);const E=(a,b,c,d,e,f,h)=>A(c^(b| ~d),a,b,e,f,h);const F=(a,b)=>{const c=(65535&a)+(65535&b);return (a>>16)+(b>>16)+(c>>16)<<16|65535&c};const H=(a,b)=>a<<b|a>>>32-b;let a=1732584193,b=-271733879,c=-1732584194,d=271733878,e;for(let i=0; i<O.length; i+=16){const x=a,y=b,z=c,oo=d;b=E(b=E(b=E(b=E(b=D(b=D(b=D(b=D(b=C(b=C(b=C(b=C(b=B(b=B(b=B(b=B(b,c=B(c,d=B(d,a=B(a,b,c,d,O[i],7,-680876936),b,c,O[i+1],12,-389564586),a,b,O[i+2],17,606105819),d,a,O[i+3],22,-1044525330),c=B(c,d=B(d,a=B(a,b,c,d,O[i+4],7,-176418897),b,c,O[i+5],12,1200080426),a,b,O[i+6],17,-1473231341),d,a,O[i+7],22,-45705983),c=B(c,d=B(d,a=B(a,b,c,d,O[i+8],7,1770035416),b,c,O[i+9],12,-1958414417),a,b,O[i+10],17,-42063),d,a,O[i+11],22,-1990404162),c=B(c,d=B(d,a=B(a,b,c,d,O[i+12],7,1804603682),b,c,O[i+13],12,-40341101),a,b,O[i+14],17,-1502002290),d,a,O[i+15],22,1236535329),c=C(c,d=C(d,a=C(a,b,c,d,O[i+1],5,-165796510),b,c,O[i+6],9,-1069501632),a,b,O[i+11],14,643717713),d,a,O[i],20,-373897302),c=C(c,d=C(d,a=C(a,b,c,d,O[i+5],5,-701558691),b,c,O[i+10],9,38016083),a,b,O[i+15],14,-660478335),d,a,O[i+4],20,-405537848),c=C(c,d=C(d,a=C(a,b,c,d,O[i+9],5,568446438),b,c,O[i+14],9,-1019803690),a,b,O[i+3],14,-187363961),d,a,O[i+8],20,1163531501),c=C(c,d=C(d,a=C(a,b,c,d,O[i+13],5,-1444681467),b,c,O[i+2],9,-51403784),a,b,O[i+7],14,1735328473),d,a,O[i+12],20,-1926607734),c=D(c,d=D(d,a=D(a,b,c,d,O[i+5],4,-378558),b,c,O[i+8],11,-2022574463),a,b,O[i+11],16,1839030562),d,a,O[i+14],23,-35309556),c=D(c,d=D(d,a=D(a,b,c,d,O[i+1],4,-1530992060),b,c,O[i+4],11,1272893353),a,b,O[i+7],16,-155497632),d,a,O[i+10],23,-1094730640),c=D(c,d=D(d,a=D(a,b,c,d,O[i+13],4,681279174),b,c,O[i],11,-358537222),a,b,O[i+3],16,-722521979),d,a,O[i+6],23,76029189),c=D(c,d=D(d,a=D(a,b,c,d,O[i+9],4,-640364487),b,c,O[i+12],11,-421815835),a,b,O[i+15],16,530742520),d,a,O[i+2],23,-995338651),c=E(c,d=E(d,a=E(a,b,c,d,O[i],6,-198630844),b,c,O[i+7],10,1126891415),a,b,O[i+14],15,-1416354905),d,a,O[i+5],21,-57434055),c=E(c,d=E(d,a=E(a,b,c,d,O[i+12],6,1700485571),b,c,O[i+3],10,-1894986606),a,b,O[i+10],15,-1051523),d,a,O[i+1],21,-2054922799),c=E(c,d=E(d,a=E(a,b,c,d,O[i+8],6,1873313359),b,c,O[i+15],10,-30611744),a,b,O[i+6],15,-1560198380),d,a,O[i+13],21,1309151649),c=E(c,d=E(d,a=E(a,b,c,d,O[i+4],6,-145523070),b,c,O[i+11],10,-1120210379),a,b,O[i+2],15,718787259),d,a,O[i+9],21,-343485551);a=F(a,x);b=F(b,y);c=F(c,z);d=F(d,oo)}O=Array(a,b,c,d);for(a=0,b='';a<32*O.length;a+=8)b+=String.fromCharCode(O[a>>5]>>>a%32&255);for(O=b,b='0123456789ABCDEF',c=null,d='',e=0;e<O.length;e++){c=O.charCodeAt(e);d+=b.charAt(c>>>4&15)+b.charAt(15&c)}return d.toLowerCase()};
Date.prototype.vv=function(){const r=Date.parse(this)/1e3;const sb=r=>{let n=[],a=r.split('');for(let i=0;i<a.length;i++){i!=0&&n.push(' ');let u=a[i].charCodeAt().toString(2);n.push(u)}return n.join('')};let n=r.toString(),a=[[],[],[],[]];for(let i=0;i<n.length;i++){let b=sb(n[i]);a[0]+=b.slice(2,3),a[1]+=b.slice(3,4),a[2]+=b.slice(4,5),a[3]+=b.slice(5)}let l=[];for(let i=0;i<a.length;i++){let E=parseInt(a[i],2).toString(16);E.length==2&&(E='0'+E),E.length==1&&(E='00'+E),E.length==0&&(E='000'),l[i]=E}let u=n.md5();return u.slice(0,3)+l[0]+u.slice(6,11)+l[1]+u.slice(14,19)+l[2]+u.slice(22,27)+l[3]+u.slice(30)};
String.prototype.r=function(f,x){
	cordova.plugin.http.get(this,{_vv:(new Date).vv()},{'Content-Type':'text/plain'},_=>{
		_=_.data
		if(x=='j')_=JSON.parse(_)
		else if(x=='h')_=_.html()
		f(_)
	},_=>f(null));
};


_W(
	'D',document,
	'R',{
		T:{G:'',T:'',A:'',Y:'',L:'',S:'',U:''},TM:{},
		O:null,D:null,VM:{},P:0,I:'',C:{},X:false
	},
	'DB',()=>new Promise((S,C)=>{
		let $=indexedDB.open('tyan',8);
		$.onerror=e=>C(e);
		$.onsuccess=e=>S($.result);
		$.onupgradeneeded=e=>{
			$=e.target.result;
			$.objectStoreNames.contains('o')||$.createObjectStore('o',{keyPath:'id'});
			location.reload()
		};
	}),
	'DA',(id,o)=>new Promise((S,C)=>{
		let r=R.D.transaction('o','readwrite').objectStore('o').add({id,o});
		r.onsuccess=e=>S(true);
		r.onerror=e=>S(false);
	}),
	'DG',i=>new Promise((S,C)=>{
		let r=R.D.transaction('o').objectStore('o').get(i);
		r.onerror=e=>S(null);
		r.onsuccess=e=>S(r.result?r.result.o:null);
	}),
	'DU',o=>new Promise((S,C)=>{
		let r=R.D.transaction('o','readwrite').objectStore('o').put(o);
		r.onerror=e=>S(null);
		r.onsuccess=e=>S(null);
	}),
	'NF',/(抢先|陈翔六点半|大电影|羊羊|没事|燃烧吧|拜托了|热恋|行不通|吃饭|差评女友|不好惹|怎敌她|永不放弃|鹊刀门|量产型|乡村爱情|扑通扑通|二龙湖|小财迷|武侠世界|别怕)/,
	'II',`data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0MTkuNTI4IDU5NS4yNzYiPg0KPHJlY3QgeD0iLTkuOTM2IiB5PSItOS43NjYiIHN0eWxlPSJmaWxsOiM3NzciIHdpZHRoPSI0MzkuMTQ5IiBoZWlnaHQ9IjYxMy43ODciLz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSI0Mi4zNzUiIHk9IjgwLjEzNCIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjIwNS4yNzciIGhlaWdodD0iMTguMzgzIi8+DQoJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNDIuMzc1NSA5Mi4yMDQpIiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLUxpZ2h0Jztmb250LXNpemU6MTdweCI+WU9VIEFSRSBJTlZJVEVEIFRPPC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iNDIuMzc1IiB5PSIxMTIuNTE3IiBzdHlsZT0iZmlsbDpub25lIiB3aWR0aD0iMzE3LjA1IiBoZWlnaHQ9IjExMS44MyIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDQyLjM3NTUgMTUwLjg1NjMpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjU0cHgiPlRIRSBHUkFORCA8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSI1MCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjU0cHgiPk9QRU5JTkc8L3RzcGFuPjwvdGV4dD4NCgk8L2c+DQoJPGc+DQoJCTxyZWN0IHg9IjQwLjM4NCIgeT0iNDQwLjExMyIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjEyNy4xMTciIGhlaWdodD0iMTIyLjA2NCIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDQwLjM4MzggNTA0LjcwODQpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6I0ZGRkZGRjtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjkwLjk4MThweCI+MDI8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSI1NC41ODkiIHN0eWxlPSJmaWxsOiNGRkZGRkY7Zm9udC1mYW1pbHk6J0F6ZXJldE1vbm8tQmxhY2snO2ZvbnQtc2l6ZTo2MS40MTI3cHgiPlNFUDwvdHNwYW4+PC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjAxLjYxNyIgeT0iNDQxLjY2NiIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjE4MC4xMDYiIGhlaWdodD0iODYuMDQzIi8+DQoJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMjAxLjYxNzQgNDUwLjE4NjEpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPkpvaW4gdXMgZm9yIGV4Y2x1c2l2ZSBzdXJwcmlzZXMsIDwvdHNwYW4+PHRzcGFuIHg9IjAiIHk9IjE5IiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLVNlbWlCb2xkJztmb250LXNpemU6MTJweCI+YWN0aXZpdGllcywgYW5kIHJlZnJlc2htZW50czwvdHNwYW4+PHRzcGFuIHg9IjEzNy4wMzUiIHk9IjE5IiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLUxpZ2h0Jztmb250LXNpemU6MTJweCI+4oCUZG9u4oCZdCA8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSIzOCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPm1pc3Mgb3V0ITwvdHNwYW4+PC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjAxLjYxNyIgeT0iNTUyLjM5NyIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjE2NS41NTMiIGhlaWdodD0iOS42NSIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIwMS42MTczIDU2MC45MTY5KSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPk9uZSBTdC4gOSBMQSAsQ0EgMTIzNDwvdGV4dD4NCgk8L2c+DQoJPGc+DQoJCTxyZWN0IHg9IjIwMS42MTciIHk9IjUzNC40MTgiIHN0eWxlPSJmaWxsOm5vbmUiIHdpZHRoPSIxNTkuNDI2IiBoZWlnaHQ9IjExLjg0NCIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIwMS42MTczIDU0Mi45MzgyKSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPnd3dy55b3Vyd2Vic2l0ZS5jb208L3RleHQ+DQoJPC9nPg0KCTxwb2x5bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMzYzNjM0O3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwIiBwb2ludHM9IjQ0LjcwMiw0MDMuMjI1IDQ0LjcwMiwyNTQuNDUzIA0KCQkxOTAuNTMsNDA0Ljg0MyAxOTIuNzczLDI1NC40NTMgMzc3LjEyOCw0MjAuNDc0IDM3Ny4xMjgsODEuMTU1IAkiLz4NCgk8Zz4NCgkJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMjQ3MSAtMC45NjkgMC45NjkgMC4yNDcxIC0zNS44MDc1IDUyMi45NTEpIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBjeD0iMzE4LjYwNiIgY3k9IjI4NC41MTciIHJ4PSIzMi41NTMiIHJ5PSIzOS44MyIvPg0KCQkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMC45Njk5IDAuMjQzMyAtMC4yNDMzIDAuOTY5OSAyOTYuOTM3MSAyNzQuMDEzKSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1SZWd1bGFyJztmb250LXNpemU6MTNweCI+MDI6MDBQTTwvdGV4dD4NCgkJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDAuOTY5OSAwLjI0MzMgLTAuMjQzMyAwLjk2OTkgMjkyLjg5MSAyODkuNTg4OCkiIHN0eWxlPSJmaWxsOiMzNjM2MzQ7Zm9udC1mYW1pbHk6J0F6ZXJldE1vbm8tUmVndWxhcic7Zm9udC1zaXplOjEzcHgiPjA1OjAwUE08L3RleHQ+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMzYzNjM0O3N0cm9rZS1taXRlcmxpbWl0OjEwIiBkPSJNMjU4LjYwMyw1NC4xNDJoLTk3LjY3OGMtNS44MTEsMC0xMC41MjEtNC43MTEtMTAuNTIxLTEwLjUyMQ0KCQkJbDAsMGMwLTUuODExLDQuNzExLTEwLjUyMSwxMC41MjEtMTAuNTIxaDk3LjY3OGM1LjgxMSwwLDEwLjUyMiw0LjcxMSwxMC41MjIsMTAuNTIxbDAsMA0KCQkJQzI2OS4xMjQsNDkuNDMxLDI2NC40MTQsNTQuMTQyLDI1OC42MDMsNTQuMTQyeiIvPg0KCQk8Zz4NCgkJCTxyZWN0IHg9IjE2MS4wNzgiIHk9IjM5LjQzMiIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9Ijk3LjM3MiIgaGVpZ2h0PSI5LjE5MSIvPg0KCQkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAxNzYuNzIyMSA0Ny45NTE5KSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPlZJQ1RPUiAmYW1wO1ZJQzwvdGV4dD4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K`,
);

window.SC=$=>{
	const X=$.innerText=='⊕',O=JSON.parse(localStorage.getItem('SC')||'{}');
	$.innerText=X?'♡':'⊕';
	if(X){
		O[R.I]=R.C;
	}else if(R.I in O){
		delete O[R.I];
		if(R.T.G=='')D.o(`grid-c[I='${R.I}']`).remove();
	}
	localStorage.setItem('SC',JSON.stringify(O));
};
window.TM=$=>{
	const X=$.innerText=='⊙';
	D.o('modal')[X?'sa':'da']('DK');
	$.innerText=X?'◎':'⊙';
};
window.SL=X=>{
	const V=D.o('video'),I=R.I,N=D.o(X?'[VL][W]':'[VL][S]');
	const L=(localStorage.getItem(I+'_SW')||'0:0').split(':').map(_=>parseFloat(_)),T=V.currentTime;
	N.innerText=N.innerText.replace(/[\d\-\:]+/,Number(X?(T-V.duration):T).t());
	localStorage.setItem(I+'_SW',X?`${L[0]}:${V.duration-T}`:`${T}:${L[1]}`);
};
window.SV=$=>{
	R.X=true;
	const U=$.ga('u');
	$.parentElement.os(`span`).forEach(_=>_[_==$?'sa':'da']('c'));
	R.O.loadSource(U);
	localStorage.setItem(R.I+'_P',U);
};

window.GD=async $=>{
	const I=R.I=$.ga('I'),SC=JSON.parse(localStorage.getItem('SC')||'{}');;
	R.C={N:$.ga('N'),C:$.o('img').ga('s'),S:$.o('score').innerText.trim()};
	D.o('modal-t [SC]').innerText=I in SC?'♡':'⊕';
	D.o('body').sa('ns');
	D.o('grid').da('a');
	D.o('modal').da('hide').o('modal-t>title').h('&nbsp;&nbsp;'+R.C.N);
	`https://api.olelive.com/v1/pub/vod/detail/${I}/true`.r(o=>{
		o=o.data;
		const M=D.o('modal-c'),L=(localStorage.getItem(I+'_SW')||'0:0').split(':').map(_=>parseFloat(_));
		M.h(`<p><span>地区:&emsp;<em>${o.area}</em>&emsp;&emsp;&emsp;年份:&emsp;<em>${o.year}</em></span></p>
		<p T='U'${o.director!=''?'':' hide'}><span>导演: </span>${o.director.split('/').filter(_=>_.trim()!='').map(_=>`<span V='${_.trim()}' onclick='CT(this)'><em>${_.trim()}</em></span>`).join('')}</p>
		<p T='U'><span>主演: </span>${o.actor.split('/').filter(_=>_.trim()!='').map(_=>`<span V='${_.trim()}' onclick='CT(this)'><em>${_.trim()}</em></span>`).join('')}</p>
		<p VS>${o.urls.map(_=>`<span u='${_.url}' onclick='SV(this)'>${_.title}</span>`).join('')}</p>
		<video preload autoplay crossorigin='anonymous' controls></video>
		<p><span VL S onclick='SL(false)'>╟ ${Number(L[0]).t()}</span><span VL W onclick='SL(true)'>${Number(-L[1]).t()} ╢</span></p>
		<p BF>${o.content}</p>`);
		const V=D.o('video');
		R.O=new Hls({levelTargetDuration:8,maxBufferLength:50,maxBufferSize:1000*1000*2});
		R.O.attachMedia(V);
		V.addEventListener('fullscreenchange',()=>{
			if(!document.fullscreenElement){
				screen.orientation.unlock();
				if(V.fsn)V.fsn=false;
				return
			}
			if(!V.fsn){
				screen.orientation.lock('landscape');
				V.fsn=true
				return
			}
			screen.orientation.unlock();
			V.fsn=false
		},false);
		V.ondurationchange=()=>{
			if(V.duration<250)return;
			R.X=false;
			V.playbackRate=1.25;
			const hk=localStorage.hasOwnProperty(I+'_PC'),lx=hk?localStorage.getItem(I+'_PC').split('$'):['','0'];
			const lc=parseFloat(lx.pop()),su=D.o('p[VS]>span[c]').ga('u')==lx.pop();
			const vc=(localStorage.getItem(I+'_SW')||'0:0').split(':').map(_=>parseFloat(_))[0];
			V.currentTime=Math.max(vc,su?lc:0);
			if(hk&&!su)localStorage.removeItem(I+'_PC');
		};
		V.ontimeupdate=()=>{
			if(V.duration<250||R.X)return;
			if(V.duration-V.currentTime>(localStorage.getItem(I+'_SW')||'0:0').split(':').map(_=>parseFloat(_))[1])return;
			const x=D.o('p[VS]>span[c]'),xx=x?x.nextElementSibling:null;
			xx&&xx.click();
		};
		const U=localStorage.getItem(I+'_P')||'';
		D.o(`p[VS]>span${U?`[u='${U}']`:''}`).click();
	},'j');
};

window.CM=async()=>{
	const V=D.o('video');
	V&&localStorage.setItem(R.I+'_PC',D.o('p[VS]>span[c]').ga('u')+'$'+V.currentTime);
	R.X=false;
	R.I='';
	R.C={};
	R.O&&(await R.O.destroy());
	D.o('modal').sa({hide:'',_I:''}).o('modal-t>title').h('');
	D.o('modal-c').h('');
	D.o('body').da('ns');
};

window.CT=$=>{
	screen.orientation.unlock();
	let $G=D.o('grid'),K;
	if($){
		CM();
		R.P=0;
		$G.h('');
		K=$.parentElement.ga('T');
		R.T[K]=$.ga('V');
		D.os(`tab[T${K!='U'?`='${K}'`:''}]>div`).forEach(_=>_[K!='U'&&_==$?'sa':'da']('c'));
		if(K=='G'||K=='U'){
			const ks=Object.keys(R.T).filter(_=>_!='G'&&_!='U'),T=JSON.parse(localStorage.getItem('T')||'{}');
			if(K=='U')R.T.G='';
			if(K=='G')R.T.U='';
			ks.forEach(_=>(R.T[_]=R.T.G!=T.G||!T[_]?'':T[_]));
			D.os(ks.map(_=>`tab[T='${_}']`).join(',')).forEach(_=>_.remove());
		}
		localStorage.setItem('T',JSON.stringify(R.T));
		if(K=='G'){
			if(R.T.G==''){
				const O=JSON.parse(localStorage.getItem('SC')||'{}');
				D.o('grid').da('a').append(...Object.keys(O).map(_=>D.n('grid-c',{I:_,N:O[_].N,onclick:'GD(this)'},`<img src='${II}' s='${O[_].C}'/><score>${O[_].S}</score><title>${O[_].N}</title>`)));
				return;
			}
			if(R.T.G=='?'){
				const kw=prompt('搜索关键字:')
				if(!kw||kw.trim()=='')return
				const U=`https://www.olehdtv.com/index.php/vod/search.html?wd=${encodeURIComponent(kw)}&submit=`;
				U.r(o=>{
					if(!o)return;
					o=o.os('.searchlist_item .vodlist_thumb');
					o&&D.o('grid').append(...o.map(_=>{
						let n=_.ga('title').trim(),N=n.replace(/\s*[】]\s*/g,'').replace(/(\s*[【】:：·。～]\s*|\-+|—+)/g,'.').replace(/，/g,',').replace(/！/g,'!').replace(/\s\s/g,' ').replace(/\.{2,}/g,'.').trim().replace(/\s/g,'.').replace(/(\s*\.+$|\.?(剧场|真人)版)/g,'');
						return NF.test(N)?null:D.n('grid-c',{I:_.ga('href').split('/').pop().split('.').shift(),N,onclick:'GD(this)'},`<img src='${II}' s='${_.ga('data-original')}'/><score></score><tip>${_.o('.pic_text').innerText.trim()}</tip><title>${N}</title>`);
					}).filter(_=>_));
				},'h');
				return;
			}
			if(R.T.G!='?'&&R.T.G!='')$G.sa('a');
			const X=R.TM[R.T.G];
			const tt=`<div${''==R.T.T?' c':''} V='' onclick='CT(this)'>全部</div>`+X.T.map(_=>{
				let x=_.split(':');return `<div${x[0]==R.T.T?' c':''} V='${x[0]}' onclick='CT(this)'>${x[1]}</div>`;
			}).join('');
			const ta=`<div${''==R.T.A?' c':''} V='' onclick='CT(this)'>全部</div>`+X.A.map(_=>`<div${_==R.T.A?' c':''} V='${_}' onclick='CT(this)'>${_}</div>`).join('');
			const ty=`<div${''==R.T.Y?' c':''} V='' onclick='CT(this)'>全部</div>`+X.Y.map(_=>`<div${_==R.T.Y?' c':''} V='${_}' onclick='CT(this)'>${_}</div>`).join('');
			const ts=[{k:'update',v:'最新'},{k:'hot',v:'最热'},{k:'desc',v:'添加'},{k:'score',v:'评分'},].map(_=>`<div${_.k==(R.T.S||'update')?' c':''} V='${_.k}' onclick='CT(this)'>${_.v}</div>`).join('');
			D.o('grid').insertAdjacentElement('beforebegin',D.n('tab',{T:'T'},tt));
			D.o('grid').insertAdjacentElement('beforebegin',D.n('tab',{T:'A'},ta));
			D.o('grid').insertAdjacentElement('beforebegin',D.n('tab',{T:'Y'},ty));
			D.o('grid').insertAdjacentElement('beforebegin',D.n('tab',{T:'S'},ts));
			const ks=Object.keys(R.T).filter(_=>R.T[_]!=''&&_!='G'&&_!='U');
			if(ks.length>0){
				const ct=ks.pop(),cn=D.o(`tab[T='${ct}']>div[V='${R.T[ct]}']`);
				cn&&cn.click();
				return;
			}
		}
	}
	if(Object.keys(R.T).filter(_=>R.T[_]!='').length<1)return;
	const TS=JSON.stringify(R.T),J=R.T.U=='';
	const U=J?`https://api.olelive.com/v1/pub/vod/list/true/3/0/${encodeURIComponent(R.T.A)}/${R.T.G}/${R.T.T}/${R.T.Y}/${R.T.S}/${++R.P}/30`:`https://www.olehdtv.com/index.php/vod/search/page/${++R.P}/wd/${encodeURIComponent(R.T.U)}.html`;
	U.r(o=>{
		if(TS!=JSON.stringify(R.T))return;
		o=J?o.data.list:o.os('.vodlist_thumb');
		const x=D.o('grid').da('a');
		o&&x.append(...o.map(_=>{
			let n=(J?_.name:_.ga('title')).trim(),N=n.replace(/\s*[】]\s*/g,'').replace(/(\s*[【】:：·。～]\s*|\-+|—+)/g,'.').replace(/，/g,',').replace(/！/g,'!').replace(/\s\s/g,' ').replace(/\.{2,}/g,'.').trim().replace(/\s/g,'.').replace(/(\s*\.+$|\.?(剧场|真人)版)/g,'');
			if(R.T.G=='1')N=N.replace(/\.?电影版/g,'');
			return NF.test(N)?null:D.n('grid-c',{I:J?_.id:_.ga('href').split('/').pop().split('.').shift(),N,onclick:'GD(this)'},`<img src='${II}' s='${J?`https://static.olelive.com/${_.pic}`:_.ga('data-original')}'/><score>${J?_.score:''}</score><tip>${J?(_.remarks?_.remarks.trim():''):_.o('.pic_text').innerText.trim()}</tip><title>${N}</title>`);
		}).filter(_=>_));
	},R.T.U!=''?'h':'j');
};


DB().then(_=>{
	if(!(R.D=_))return;
	DG('..').then(async o=>{
		if(!o)await DA('..',{});
		'https://api.olelive.com/v1/pub/vod/list/type'.r(o=>{
			o.data.filter(_=>_.typeId<5).forEach(_=>(R.TM[_.typeId]={N:_.typeName,A:_.area,Y:_.year,T:_.children.map(x=>(x.typeId+'').startsWith(_.typeId+'')?(x.typeId+':'+x.typeName):null).filter(_=>_)}));
			R.TM['']={N:'收藏夹',A:[],Y:[],T:[]};
			R.TM['?']={N:'搜索',A:[],Y:[],T:[]};
			const ic=[
				`<icc SC onclick='SC(this)' style='line-height:33px'>⊕</icc>`,
				`<icc onclick='TM(this)' style='line-height:33px'>⊙</icc>`,
				`<icc onclick='CM(this)'>╳</icc>`
			].join('');
			D.body.h(`<tab T='G'>${Object.keys(R.TM).map(_=>`<div V='${_}' onclick='CT(this)'>${R.TM[_].N}</div>`).join('')}</tab><grid></grid><modal hide><mbox><modal-t><title></title>${ic}</modal-t><modal-c></modal-c></mbox></modal>`);
			const __=JSON.parse(localStorage.getItem('T')||'{}'),T=__&&__.G?`[V='${__.G}']`:'';
			D.o(`tab[T='G']>div${T}`).click();
		},'j')
	});
})

const OX=new IntersectionObserver((s,o)=>{
	let $=null;
	s.forEach(e=>e.target.isConnected&&(e.target.nodeName=='GRID-C')&&(e.intersectionRatio>=0.7)&&($=e.target));
	$&&o.unobserve($);
	$&&(R.T.G!='')&&CT();
},{threshold:0.7});
const OY=new IntersectionObserver((s,o)=>s.forEach(e=>e.target.isConnected&&(e.target.nodeName=='IMG')&&(e.intersectionRatio>=0.7)&&(e.target.ga('src')!=e.target.ga('s'))&&e.target.sa({src:e.target.ga('s')})&&o.unobserve(e.target)),{threshold:0.7});
const OO=new MutationObserver(s=>{
	let $=null;
	s.forEach(e=>{
		const t=e.target,tp=t.nodeName;
		const ig=tp=='GRID',$s=Array.from(e.addedNodes);
		if(!ig||$s.length<1||(ig&&$s.some(_=>_.nodeName!='GRID-C')))return;
		ig&&!$&&($=$s[$s.length-1]);
		$s.filter(_=>_.nodeName=='GRID-C').forEach(_=>OY.observe(_.o('img')));
	});
	$&&OX.observe($);
});
OO.observe(D.body,{subtree:true,childList:true,attributeFilter:['hide','_I']});

},false)