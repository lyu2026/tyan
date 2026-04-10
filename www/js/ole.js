
Date.prototype.vv=function(){const r=Date.parse(this)/1e3;const sb=r=>{let n=[],a=r.split('');for(let i=0;i<a.length;i++){i!=0&&n.push(' ');let u=a[i].charCodeAt().toString(2);n.push(u)}return n.join('')};let n=r.toString(),a=[[],[],[],[]];for(let i=0;i<n.length;i++){let b=sb(n[i]);a[0]+=b.slice(2,3),a[1]+=b.slice(3,4),a[2]+=b.slice(4,5),a[3]+=b.slice(5)}let l=[];for(let i=0;i<a.length;i++){let E=parseInt(a[i],2).toString(16);E.length==2&&(E='0'+E),E.length==1&&(E='00'+E),E.length==0&&(E='000'),l[i]=E}let u=n.md5();return u.slice(0,3)+l[0]+u.slice(6,11)+l[1]+u.slice(14,19)+l[2]+u.slice(22,27)+l[3]+u.slice(30)}

const _T=(a,b)=>{const _=Object.prototype.toString.call(a).split(' ').pop().replace(/]$/,'').toLowerCase();if(b=='element')return _.includes(b)&&a.isConnected;return b?_.includes(b):_}
const _W=function(){let n=arguments.length;if(n>0&&n%2==0)for(let i=0;i<n;i+=2){let k=arguments[i],v=arguments[i+1];if(_T(k,'string')&&(k=k.replace(/\s/,''))){k.includes('.')&&k.split('.').forEach(_=>(window[_]=v))||(window[k]=v)}}}

_W(
	'D',document,
	'R',{
		T:{G:'',T:'',A:'',Y:'',L:'',S:'',U:''},TM:{},
		O:null,D:null,VM:{},P:0,I:'',C:{},X:false
	},
	'DB',()=>new Promise((S,C)=>{
		let $=indexedDB.open('tyan',8)
		$.onerror=e=>C(e)
		$.onsuccess=e=>S($.result)
		$.onupgradeneeded=e=>{
			$=e.target.result
			$.objectStoreNames.contains('o')||$.createObjectStore('o',{keyPath:'id'})
			location.reload()
		}
	}),
	'DA',(id,o)=>new Promise((S,C)=>{
		const r=R.D.transaction('o','readwrite').objectStore('o').add({id,o})
		r.onsuccess=e=>S(true)
		r.onerror=e=>S(false)
	}),
	'DG',i=>new Promise((S,C)=>{
		const r=R.D.transaction('o').objectStore('o').get(i)
		r.onsuccess=e=>S(r.result?r.result.o:null)
		r.onerror=e=>S(null)
	}),
	'DU',o=>new Promise((S,C)=>{
		const r=R.D.transaction('o','readwrite').objectStore('o').put(o)
		r.onsuccess=e=>S(null)
		r.onerror=e=>S(null)
	}),
	'NF',/(抢先|陈翔六点半|大电影|羊羊|没事|燃烧吧|拜托了|热恋|行不通|吃饭|差评女友|不好惹|怎敌她|永不放弃|鹊刀门|量产型|乡村爱情|扑通扑通|二龙湖|小财迷|武侠世界|别怕)/,
	'II',`data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0MTkuNTI4IDU5NS4yNzYiPg0KPHJlY3QgeD0iLTkuOTM2IiB5PSItOS43NjYiIHN0eWxlPSJmaWxsOiM3NzciIHdpZHRoPSI0MzkuMTQ5IiBoZWlnaHQ9IjYxMy43ODciLz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSI0Mi4zNzUiIHk9IjgwLjEzNCIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjIwNS4yNzciIGhlaWdodD0iMTguMzgzIi8+DQoJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNDIuMzc1NSA5Mi4yMDQpIiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLUxpZ2h0Jztmb250LXNpemU6MTdweCI+WU9VIEFSRSBJTlZJVEVEIFRPPC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iNDIuMzc1IiB5PSIxMTIuNTE3IiBzdHlsZT0iZmlsbDpub25lIiB3aWR0aD0iMzE3LjA1IiBoZWlnaHQ9IjExMS44MyIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDQyLjM3NTUgMTUwLjg1NjMpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjU0cHgiPlRIRSBHUkFORCA8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSI1MCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjU0cHgiPk9QRU5JTkc8L3RzcGFuPjwvdGV4dD4NCgk8L2c+DQoJPGc+DQoJCTxyZWN0IHg9IjQwLjM4NCIgeT0iNDQwLjExMyIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjEyNy4xMTciIGhlaWdodD0iMTIyLjA2NCIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDQwLjM4MzggNTA0LjcwODQpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6I0ZGRkZGRjtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjkwLjk4MThweCI+MDI8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSI1NC41ODkiIHN0eWxlPSJmaWxsOiNGRkZGRkY7Zm9udC1mYW1pbHk6J0F6ZXJldE1vbm8tQmxhY2snO2ZvbnQtc2l6ZTo2MS40MTI3cHgiPlNFUDwvdHNwYW4+PC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjAxLjYxNyIgeT0iNDQxLjY2NiIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjE4MC4xMDYiIGhlaWdodD0iODYuMDQzIi8+DQoJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMjAxLjYxNzQgNDUwLjE4NjEpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPkpvaW4gdXMgZm9yIGV4Y2x1c2l2ZSBzdXJwcmlzZXMsIDwvdHNwYW4+PHRzcGFuIHg9IjAiIHk9IjE5IiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLVNlbWlCb2xkJztmb250LXNpemU6MTJweCI+YWN0aXZpdGllcywgYW5kIHJlZnJlc2htZW50czwvdHNwYW4+PHRzcGFuIHg9IjEzNy4wMzUiIHk9IjE5IiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLUxpZ2h0Jztmb250LXNpemU6MTJweCI+4oCUZG9u4oCZdCA8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSIzOCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPm1pc3Mgb3V0ITwvdHNwYW4+PC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjAxLjYxNyIgeT0iNTUyLjM5NyIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjE2NS41NTMiIGhlaWdodD0iOS42NSIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIwMS42MTczIDU2MC45MTY5KSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPk9uZSBTdC4gOSBMQSAsQ0EgMTIzNDwvdGV4dD4NCgk8L2c+DQoJPGc+DQoJCTxyZWN0IHg9IjIwMS42MTciIHk9IjUzNC40MTgiIHN0eWxlPSJmaWxsOm5vbmUiIHdpZHRoPSIxNTkuNDI2IiBoZWlnaHQ9IjExLjg0NCIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIwMS42MTczIDU0Mi45MzgyKSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPnd3dy55b3Vyd2Vic2l0ZS5jb208L3RleHQ+DQoJPC9nPg0KCTxwb2x5bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMzYzNjM0O3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwIiBwb2ludHM9IjQ0LjcwMiw0MDMuMjI1IDQ0LjcwMiwyNTQuNDUzIA0KCQkxOTAuNTMsNDA0Ljg0MyAxOTIuNzczLDI1NC40NTMgMzc3LjEyOCw0MjAuNDc0IDM3Ny4xMjgsODEuMTU1IAkiLz4NCgk8Zz4NCgkJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMjQ3MSAtMC45NjkgMC45NjkgMC4yNDcxIC0zNS44MDc1IDUyMi45NTEpIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBjeD0iMzE4LjYwNiIgY3k9IjI4NC41MTciIHJ4PSIzMi41NTMiIHJ5PSIzOS44MyIvPg0KCQkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMC45Njk5IDAuMjQzMyAtMC4yNDMzIDAuOTY5OSAyOTYuOTM3MSAyNzQuMDEzKSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1SZWd1bGFyJztmb250LXNpemU6MTNweCI+MDI6MDBQTTwvdGV4dD4NCgkJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDAuOTY5OSAwLjI0MzMgLTAuMjQzMyAwLjk2OTkgMjkyLjg5MSAyODkuNTg4OCkiIHN0eWxlPSJmaWxsOiMzNjM2MzQ7Zm9udC1mYW1pbHk6J0F6ZXJldE1vbm8tUmVndWxhcic7Zm9udC1zaXplOjEzcHgiPjA1OjAwUE08L3RleHQ+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMzYzNjM0O3N0cm9rZS1taXRlcmxpbWl0OjEwIiBkPSJNMjU4LjYwMyw1NC4xNDJoLTk3LjY3OGMtNS44MTEsMC0xMC41MjEtNC43MTEtMTAuNTIxLTEwLjUyMQ0KCQkJbDAsMGMwLTUuODExLDQuNzExLTEwLjUyMSwxMC41MjEtMTAuNTIxaDk3LjY3OGM1LjgxMSwwLDEwLjUyMiw0LjcxMSwxMC41MjIsMTAuNTIxbDAsMA0KCQkJQzI2OS4xMjQsNDkuNDMxLDI2NC40MTQsNTQuMTQyLDI1OC42MDMsNTQuMTQyeiIvPg0KCQk8Zz4NCgkJCTxyZWN0IHg9IjE2MS4wNzgiIHk9IjM5LjQzMiIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9Ijk3LjM3MiIgaGVpZ2h0PSI5LjE5MSIvPg0KCQkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAxNzYuNzIyMSA0Ny45NTE5KSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPlZJQ1RPUiAmYW1wO1ZJQzwvdGV4dD4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K`,
)


window.SC=$=>{
	const X=$.innerText=='⊕',O=JSON.parse(localStorage.getItem('SC')||'{}')
	$.innerText=X?'♡':'⊕'
	if(X)O[R.I]=R.C
	else if(R.I in O){
		delete O[R.I]
		if(R.T.G=='')D.$(`grid-c[I='${R.I}']`).remove()
	}
	localStorage.setItem('SC',JSON.stringify(O))
}
window.TM=$=>{
	const X=$.innerText=='⊙'
	D.$('modal')[X?'sa':'da']('DK')
	$.innerText=X?'◎':'⊙'
}
window.SL=X=>{
	const V=D.$('video'),I=R.I,N=D.$(X?'[VL][W]':'[VL][S]')
	const L=(localStorage.getItem(I+'_SW')||'0:0').split(':').map(_=>parseFloat(_)),T=V.currentTime
	N.innerText=N.innerText.replace(/[\d\-\:]+/,Number(X?(T-V.duration):T).dt())
	localStorage.setItem(I+'_SW',X?`${L[0]}:${V.duration-T}`:`${T}:${L[1]}`)
}
window.SV=$=>{
	R.X=true
	const U=$.ga('u')
	$.parentElement.$$(`span`).forEach(_=>_[_==$?'sa':'da']('c'))
	R.O.loadSource(U)
	localStorage.setItem(R.I+'_P',U)
}

window.GD=async $=>{
	const I=R.I=$.ga('I'),SC=JSON.parse(localStorage.getItem('SC')||'{}')
	R.C={N:$.ga('N'),C:$.$('img').ga('s'),S:$.$('score').innerText.trim()}
	D.$('modal-t [SC]').innerText=I in SC?'♡':'⊕'
	D.$('body').sa('ns')
	D.$('grid').da('a')
	D.$('modal').da('hide').$('modal-t>title').html('&nbsp;&nbsp;'+R.C.N);
	`https://api.olelive.com/v1/pub/vod/detail/${I}/true`.get(o=>{
		o=o.data
		const M=D.$('modal-c'),L=(localStorage.getItem(I+'_SW')||'0:0').split(':').map(_=>parseFloat(_))
		M.html(`<p><span>地区:&emsp;<em>${o.area}</em>&emsp;&emsp;&emsp;年份:&emsp;<em>${o.year}</em></span></p>
		<p T='U'${o.director!=''?'':' hide'}><span>导演: </span>${o.director.split('/').filter(_=>_.trim()!='').map(_=>`<span V='${_.trim()}' onclick='CT(this)'><em>${_.trim()}</em></span>`).join('')}</p>
		<p T='U'><span>主演: </span>${o.actor.split('/').filter(_=>_.trim()!='').map(_=>`<span V='${_.trim()}' onclick='CT(this)'><em>${_.trim()}</em></span>`).join('')}</p>
		<p VS>${o.urls.map(_=>`<span u='${_.url}' onclick='SV(this)'>${_.title}</span>`).join('')}</p>
		<video preload autoplay crossorigin='anonymous' controls poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3C/svg%3E"></video>
		<p VL><span VL S onclick='SL(false)'>╟ ${Number(L[0]).dt()}</span><span VL W onclick='SL(true)'>${Number(-L[1]).dt()} ╢</span></p>
		<p BF>${o.content}</p>`)
		const V=D.$('video')
		R.O=new Hls({enableWorker:false,levelTargetDuration:8,maxBufferLength:50,maxBufferSize:1000*1000*2})
		R.O.attachMedia(V)
		V.addEventListener('fullscreenchange',()=>{
			if(!document.fullscreenElement){
				screen.orientation.unlock()
				if(V.fsn)V.fsn=false
				return
			}
			if(!V.fsn){
				screen.orientation.lock('landscape')
				V.fsn=true
				return
			}
			screen.orientation.unlock()
			V.fsn=false
		},false)
		V.ondurationchange=()=>{
			if(V.duration<250)return
			R.X=false
			V.playbackRate=1.25
			const hk=localStorage.hasOwnProperty(I+'_PC'),lx=hk?localStorage.getItem(I+'_PC').split('$'):['','0']
			const lc=parseFloat(lx.pop()),su=D.$('p[VS]>span[c]').ga('u')==lx.pop()
			const vc=(localStorage.getItem(I+'_SW')||'0:0').split(':').map(_=>parseFloat(_))[0]
			V.currentTime=Math.max(vc,su?lc:0)
			if(hk&&!su)localStorage.removeItem(I+'_PC')
		}
		V.ontimeupdate=()=>{
			if(V.duration<250||R.X)return
			if(V.duration-V.currentTime>(localStorage.getItem(I+'_SW')||'0:0').split(':').map(_=>parseFloat(_))[1])return
			const x=D.$('p[VS]>span[c]'),xx=x?x.nextElementSibling:null
			xx&&xx.click()
		}
		const U=localStorage.getItem(I+'_P')||''
		D.$(`p[VS]>span${U?`[u='${U}']`:''}`).click()
	},{_vv:(new Date).vv()},'json')
}

window.CM=async()=>{
	const V=D.$('video')
	V&&localStorage.setItem(R.I+'_PC',D.$('p[VS]>span[c]').ga('u')+'$'+V.currentTime)
	R.X=false
	R.I=''
	R.C={}
	R.O&&(await R.O.destroy())
	D.$('modal').sa('hide','_I').$('modal-t>title').html('')
	D.$('modal-c').html('')
	D.$('body').da('ns')
};

window.CT=$=>{
	screen.orientation.unlock()
	let $G=D.$('grid'),K
	if($){
		CM()
		R.P=0
		$G.html('')
		K=$.parentElement.ga('T')
		R.T[K]=$.ga('V')
		D.$$(`tab[T${K!='U'?`='${K}'`:''}]>div`).forEach(_=>_[K!='U'&&_==$?'sa':'da']('c'))
		if(K=='G'||K=='U'){
			const ks=Object.keys(R.T).filter(_=>_!='G'&&_!='U'),T=JSON.parse(localStorage.getItem('T')||'{}')
			if(K=='U')R.T.G=''
			if(K=='G')R.T.U=''
			ks.forEach(_=>(R.T[_]=R.T.G!=T.G||!T[_]?'':T[_]))
			D.$$(ks.map(_=>`tab[T='${_}']`).join(',')).forEach(_=>_.remove())
		}
		localStorage.setItem('T',JSON.stringify(R.T))
		if(K=='G'){
			if(R.T.G==''){
				const O=JSON.parse(localStorage.getItem('SC')||'{}')
				D.$('grid').da('a').append(...Object.keys(O).map(_=>D.node('grid-c',{I:_,N:O[_].N,onclick:'GD(this)'},`<img src='${II}' s='${O[_].C}'/><score>${O[_].S}</score><title>${O[_].N}</title>`)))
				return
			}
			if(R.T.G=='?'){
				const kw=prompt('搜索关键字:')
				if(!kw||kw.trim()=='')return
				const U=`https://www.olehdtv.com/index.php/vod/search.html?wd=${encodeURIComponent(kw)}&submit=`
				U.get(o=>{
					if(!o)return
					o=o.$$('.searchlist_item .vodlist_thumb')
					o&&D.$('grid').append(...o.map(_=>{
						let n=_.ga('title').trim(),N=n.replace(/\s*[】]\s*/g,'').replace(/(\s*[【】:：·。～]\s*|\-+|—+)/g,'.').replace(/，/g,',').replace(/！/g,'!').replace(/\s\s/g,' ').replace(/\.{2,}/g,'.').trim().replace(/\s/g,'.').replace(/(\s*\.+$|\.?(剧场|真人)版)/g,'')
						return NF.test(N)?null:D.node('grid-c',{I:_.ga('href').split('/').pop().split('.').shift(),N,onclick:'GD(this)'},`<img src='${II}' s='${_.ga('data-original')}'/><score></score><tip>${_.$('.pic_text').innerText.trim()}</tip><title>${N}</title>`)
					}).filter(_=>_))
				},{_vv:(new Date).vv()},'html')
				return
			}
			if(R.T.G!='?'&&R.T.G!='')$G.sa('a')
			const X=R.TM[R.T.G]
			const tt=`<div${''==R.T.T?' c':''} V='' onclick='CT(this)'>全部</div>`+X.T.map(_=>{
				let x=_.split(':');return `<div${x[0]==R.T.T?' c':''} V='${x[0]}' onclick='CT(this)'>${x[1]}</div>`
			}).join('')
			const ta=`<div${''==R.T.A?' c':''} V='' onclick='CT(this)'>全部</div>`+X.A.map(_=>`<div${_==R.T.A?' c':''} V='${_}' onclick='CT(this)'>${_}</div>`).join('')
			const ty=`<div${''==R.T.Y?' c':''} V='' onclick='CT(this)'>全部</div>`+X.Y.map(_=>`<div${_==R.T.Y?' c':''} V='${_}' onclick='CT(this)'>${_}</div>`).join('')
			const ts=[{k:'update',v:'最新'},{k:'hot',v:'最热'},{k:'desc',v:'添加'},{k:'score',v:'评分'},].map(_=>`<div${_.k==(R.T.S||'update')?' c':''} V='${_.k}' onclick='CT(this)'>${_.v}</div>`).join('')
			D.$('grid').insertAdjacentElement('beforebegin',D.node('tab',{T:'T'},tt))
			D.$('grid').insertAdjacentElement('beforebegin',D.node('tab',{T:'A'},ta))
			D.$('grid').insertAdjacentElement('beforebegin',D.node('tab',{T:'Y'},ty))
			D.$('grid').insertAdjacentElement('beforebegin',D.node('tab',{T:'S'},ts))
			const ks=Object.keys(R.T).filter(_=>R.T[_]!=''&&_!='G'&&_!='U')
			if(ks.length>0){
				const ct=ks.pop(),cn=D.$(`tab[T='${ct}']>div[V='${R.T[ct]}']`)
				cn&&cn.click()
				return
			}
		}
	}
	if(Object.keys(R.T).filter(_=>R.T[_]!='').length<1)return
	const TS=JSON.stringify(R.T),J=R.T.U==''
	const U=J?`https://api.olelive.com/v1/pub/vod/list/true/3/0/${encodeURIComponent(R.T.A)}/${R.T.G}/${R.T.T}/${R.T.Y}/${R.T.S}/${++R.P}/30`:`https://www.olehdtv.com/index.php/vod/search/page/${++R.P}/wd/${encodeURIComponent(R.T.U)}.html`
	U.get(o=>{
		if(TS!=JSON.stringify(R.T))return
		o=J?o.data.list:o.$$('.vodlist_thumb')
		const x=D.$('grid').da('a')
		o&&x.append(...o.map(_=>{
			let n=(J?_.name:_.ga('title')).trim(),N=n.replace(/\s*[】]\s*/g,'').replace(/(\s*[【】:：·。～]\s*|\-+|—+)/g,'.').replace(/，/g,',').replace(/！/g,'!').replace(/\s\s/g,' ').replace(/\.{2,}/g,'.').trim().replace(/\s/g,'.').replace(/(\s*\.+$|\.?(剧场|真人)版)/g,'')
			if(R.T.G=='1')N=N.replace(/\.?电影版/g,'')
			return NF.test(N)?null:D.node('grid-c',{I:J?_.id:_.ga('href').split('/').pop().split('.').shift(),N,onclick:'GD(this)'},`<img src='${II}' s='${J?`https://static.olelive.com/${_.pic}`:_.ga('data-original')}'/><score>${J?_.score:''}</score><tip>${J?(_.remarks?_.remarks.trim():''):_.$('.pic_text').innerText.trim()}</tip><title>${N}</title>`)
		}).filter(_=>_))
	},{_vv:(new Date).vv()},R.T.U!=''?'html':'json')
};


DB().then(_=>{
	log('DB() 已执行')
	if(!(R.D=_))return
	DG('..').then(async o=>{
		log('DG(..) 已执行')
		if(!o)await DA('..',{})
		'https://api.olelive.com/v1/pub/vod/list/type'.get(o=>{
			log('筛选数据',o)
			o.data.filter(_=>_.typeId<5).forEach(_=>(R.TM[_.typeId]={N:_.typeName,A:_.area,Y:_.year,T:_.children.map(x=>(x.typeId+'').startsWith(_.typeId+'')?(x.typeId+':'+x.typeName):null).filter(_=>_)}))
			R.TM['']={N:'收藏夹',A:[],Y:[],T:[]}
			R.TM['?']={N:'搜索',A:[],Y:[],T:[]}
			const ic=[
				`<icc SC onclick='SC(this)' style='line-height:33px'>⊕</icc>`,
				`<icc onclick='TM(this)' style='line-height:33px'>⊙</icc>`,
				`<icc onclick='CM(this)'>╳</icc>`
			].join('')
			D.body.html(`<tab T='G'>${Object.keys(R.TM).map(_=>`<div V='${_}' onclick='CT(this)'>${R.TM[_].N}</div>`).join('')}</tab><grid></grid><modal hide><mbox><modal-t><title></title>${ic}</modal-t><modal-c></modal-c></mbox></modal>`)
			const __=JSON.parse(localStorage.getItem('T')||'{}'),T=__&&__.G?`[V='${__.G}']`:''
			D.$(`tab[T='G']>div${T}`).click()
		},{_vv:(new Date).vv()},'json')
	})
})

const OX=new IntersectionObserver((s,o)=>{
	let $=null
	s.forEach(e=>e.target.isConnected&&(e.target.nodeName=='GRID-C')&&(e.intersectionRatio>=0.7)&&($=e.target))
	$&&o.unobserve($)
	$&&(R.T.G!=''&&R.T.G!='?')&&CT()
},{threshold:0.7})
const OY=new IntersectionObserver((s,o)=>s.forEach(e=>e.target.isConnected&&(e.target.nodeName=='IMG')&&(e.intersectionRatio>=0.7)&&(e.target.ga('src')!=e.target.ga('s'))&&e.target.sa({src:e.target.ga('s')})&&o.unobserve(e.target)),{threshold:0.7})
const OO=new MutationObserver(s=>{
	let $=null
	s.forEach(e=>{
		const t=e.target,tp=t.nodeName
		const ig=tp=='GRID',$s=Array.from(e.addedNodes)
		if(!ig||$s.length<1||(ig&&$s.some(_=>_.nodeName!='GRID-C')))return
		ig&&!$&&($=$s[$s.length-1])
		$s.filter(_=>_.nodeName=='GRID-C').forEach(_=>OY.observe(_.$('img')))
	})
	$&&OX.observe($)
})
OO.observe(D.body,{subtree:true,childList:true,attributeFilter:['hide','_I']});
