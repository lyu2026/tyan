
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'ole',

	vv:()=>{ // 链接公共参数
		const x=(Date.parse(new Date())/1e3).toString(),a=x.md5(),b=[],c=[[],[],[],[]]
		const z=_=>{
			const s=_.split('');_=[]
			for(let i=0;i<s.length;i++){
				if(i>0)_.push(' ')
				_.push(s[i].charCodeAt().toString(2))
			}
			return _.join('')
		}
		for(let i=0;i<x.length;i++){
			let _=z(x[i])
			c[0]+=_.slice(2,3)
			c[1]+=_.slice(3,4)
			c[2]+=_.slice(4,5)
			c[3]+=_.slice(5)
		}
		for(let i=0;i<c.length;i++){
			let _=parseInt(c[i],2).toString(16)
			if(_.length<3)_='0'.repeat(3-_.length)+_
			b[i]=_
		}
		return a.slice(0,3)+b[0]+a.slice(6,11)+b[1]+a.slice(14,19)+b[2]+a.slice(22,27)+b[3]+a.slice(30)
	},

	// 视频名称过滤正则
	name_reg:/(抢先|陈翔六点半|大电影|羊羊|没事|燃烧吧|拜托了|热恋|行不通|吃饭|差评女友|不好惹|怎敌她|永不放弃|鹊刀门|量产型|乡村爱情|扑通扑通|二龙湖|小财迷|武侠世界|别怕)/,

	// 视频卡片默认封面
	cover:`data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0MTkuNTI4IDU5NS4yNzYiPg0KPHJlY3QgeD0iLTkuOTM2IiB5PSItOS43NjYiIHN0eWxlPSJmaWxsOiM3NzciIHdpZHRoPSI0MzkuMTQ5IiBoZWlnaHQ9IjYxMy43ODciLz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSI0Mi4zNzUiIHk9IjgwLjEzNCIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjIwNS4yNzciIGhlaWdodD0iMTguMzgzIi8+DQoJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNDIuMzc1NSA5Mi4yMDQpIiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLUxpZ2h0Jztmb250LXNpemU6MTdweCI+WU9VIEFSRSBJTlZJVEVEIFRPPC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iNDIuMzc1IiB5PSIxMTIuNTE3IiBzdHlsZT0iZmlsbDpub25lIiB3aWR0aD0iMzE3LjA1IiBoZWlnaHQ9IjExMS44MyIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDQyLjM3NTUgMTUwLjg1NjMpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjU0cHgiPlRIRSBHUkFORCA8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSI1MCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjU0cHgiPk9QRU5JTkc8L3RzcGFuPjwvdGV4dD4NCgk8L2c+DQoJPGc+DQoJCTxyZWN0IHg9IjQwLjM4NCIgeT0iNDQwLjExMyIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjEyNy4xMTciIGhlaWdodD0iMTIyLjA2NCIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDQwLjM4MzggNTA0LjcwODQpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6I0ZGRkZGRjtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjkwLjk4MThweCI+MDI8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSI1NC41ODkiIHN0eWxlPSJmaWxsOiNGRkZGRkY7Zm9udC1mYW1pbHk6J0F6ZXJldE1vbm8tQmxhY2snO2ZvbnQtc2l6ZTo2MS40MTI3cHgiPlNFUDwvdHNwYW4+PC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjAxLjYxNyIgeT0iNDQxLjY2NiIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjE4MC4xMDYiIGhlaWdodD0iODYuMDQzIi8+DQoJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMjAxLjYxNzQgNDUwLjE4NjEpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPkpvaW4gdXMgZm9yIGV4Y2x1c2l2ZSBzdXJwcmlzZXMsIDwvdHNwYW4+PHRzcGFuIHg9IjAiIHk9IjE5IiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLVNlbWlCb2xkJztmb250LXNpemU6MTJweCI+YWN0aXZpdGllcywgYW5kIHJlZnJlc2htZW50czwvdHNwYW4+PHRzcGFuIHg9IjEzNy4wMzUiIHk9IjE5IiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLUxpZ2h0Jztmb250LXNpemU6MTJweCI+4oCUZG9u4oCZdCA8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSIzOCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPm1pc3Mgb3V0ITwvdHNwYW4+PC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjAxLjYxNyIgeT0iNTUyLjM5NyIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjE2NS41NTMiIGhlaWdodD0iOS42NSIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIwMS42MTczIDU2MC45MTY5KSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPk9uZSBTdC4gOSBMQSAsQ0EgMTIzNDwvdGV4dD4NCgk8L2c+DQoJPGc+DQoJCTxyZWN0IHg9IjIwMS42MTciIHk9IjUzNC40MTgiIHN0eWxlPSJmaWxsOm5vbmUiIHdpZHRoPSIxNTkuNDI2IiBoZWlnaHQ9IjExLjg0NCIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIwMS42MTczIDU0Mi45MzgyKSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPnd3dy55b3Vyd2Vic2l0ZS5jb208L3RleHQ+DQoJPC9nPg0KCTxwb2x5bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMzYzNjM0O3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwIiBwb2ludHM9IjQ0LjcwMiw0MDMuMjI1IDQ0LjcwMiwyNTQuNDUzIA0KCQkxOTAuNTMsNDA0Ljg0MyAxOTIuNzczLDI1NC40NTMgMzc3LjEyOCw0MjAuNDc0IDM3Ny4xMjgsODEuMTU1IAkiLz4NCgk8Zz4NCgkJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMjQ3MSAtMC45NjkgMC45NjkgMC4yNDcxIC0zNS44MDc1IDUyMi45NTEpIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBjeD0iMzE4LjYwNiIgY3k9IjI4NC41MTciIHJ4PSIzMi41NTMiIHJ5PSIzOS44MyIvPg0KCQkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMC45Njk5IDAuMjQzMyAtMC4yNDMzIDAuOTY5OSAyOTYuOTM3MSAyNzQuMDEzKSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1SZWd1bGFyJztmb250LXNpemU6MTNweCI+MDI6MDBQTTwvdGV4dD4NCgkJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDAuOTY5OSAwLjI0MzMgLTAuMjQzMyAwLjk2OTkgMjkyLjg5MSAyODkuNTg4OCkiIHN0eWxlPSJmaWxsOiMzNjM2MzQ7Zm9udC1mYW1pbHk6J0F6ZXJldE1vbm8tUmVndWxhcic7Zm9udC1zaXplOjEzcHgiPjA1OjAwUE08L3RleHQ+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMzYzNjM0O3N0cm9rZS1taXRlcmxpbWl0OjEwIiBkPSJNMjU4LjYwMyw1NC4xNDJoLTk3LjY3OGMtNS44MTEsMC0xMC41MjEtNC43MTEtMTAuNTIxLTEwLjUyMQ0KCQkJbDAsMGMwLTUuODExLDQuNzExLTEwLjUyMSwxMC41MjEtMTAuNTIxaDk3LjY3OGM1LjgxMSwwLDEwLjUyMiw0LjcxMSwxMC41MjIsMTAuNTIxbDAsMA0KCQkJQzI2OS4xMjQsNDkuNDMxLDI2NC40MTQsNTQuMTQyLDI1OC42MDMsNTQuMTQyeiIvPg0KCQk8Zz4NCgkJCTxyZWN0IHg9IjE2MS4wNzgiIHk9IjM5LjQzMiIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9Ijk3LjM3MiIgaGVpZ2h0PSI5LjE5MSIvPg0KCQkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAxNzYuNzIyMSA0Ny45NTE5KSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPlZJQ1RPUiAmYW1wO1ZJQzwvdGV4dD4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K`,

	// 筛选设置
	filters:{category:'',type:'',area:'',year:'',sort:''},search_key:null,search_val:null,

	// 控制参数
	tmap:{},hls:null,page:0,id:null,curr:null,wait:true,

	// 节点监听器
	load_more:null,img_lazy:null,get_nodes:null,

	tab_click:me=>{ // 筛选视频
		let gbox=$O.$('grid').da('_').sa('a'),key,val
		if(me){
			IX.page=0
			IX.modal_close()
			screen.orientation.unlock()
			key=me.parentElement.ga('T');val=me.ga('V')
			gbox.da('a').sa({_:key=='category'&&val=='?'?'💡 请输入关键字 . . ':'🥏 正在搜索，请稍等 . . .'}).html('')
			if(key=='category'&&val=='?'){
				IX.search_val=prompt('搜索关键字:')
				IX.search_key='name'
				IX.filters.category='?'
				gbox.sa({_:`————  ${IX.search_val?`🔍 开始搜索关键字“${IX.search_val}”`:'🚨 关键字为空，肯定冇数据啊瑟瑟'}！  ————`})
			}else if(key=='actor'||key=='director'){
				me=$O.$(`tab[T='category']>div[V='?']`)
				IX.filters.category='?'
				IX.search_key=key
				IX.search_val=val
				key='category'
			}else{
				IX.search_key=IX.search_val=null
				IX.filters[key]=val
			}
			$O.$$(`tab[T${key?`='${key}'`:''}]>div`).forEach(_=>_[key&&_==me?'sa':'da']('c'))
			if(key=='category'){
				const ks=Object.keys(IX.filters).filter(_=>_!='category'),{filters}='ole_filters'.gc({filters:{}})
				ks.forEach(_=>(IX.filters[_]=IX.filters.category!=filters.category||!filters[_]?'':filters[_]))
				$O.$$(ks.map(_=>`tab[T='${_}']`).join(',')).forEach(_=>_.remove())
			}
			'ole_filters'.sc({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
			if(key=='category'){
				if(IX.filters.category==''){
					gbox.da('_')
					const videos='ole_favorite_videos'.gc({})
					gbox.append(...Object.keys(videos).map(_=>$O.node('grid-c',{I:_,N:videos[_].N,onclick:'run("IX","card_click",WI)(this)'},`<img src='${IX.cover}' s='${videos[_].C}'/><score>${videos[_].S}</score><title>${videos[_].N}</title>`)))
					return
				}
				if(IX.filters.category!='?'){
					const X=IX.tmap[IX.filters.category]
					const tt=`<div${''==IX.filters.type?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.types.map(_=>{
						let x=_.split(':');return `<div${x[0]==IX.filters.type?' c':''} V='${x[0]}' onclick='run("IX","tab_click",WI)(this)'>${x[1]}</div>`
					}).join('')
					const ta=`<div${''==IX.filters.area?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.areas.map(_=>`<div${_==IX.filters.area?' c':''} V='${_}' onclick='run("IX","tab_click",WI)(this)'>${_}</div>`).join('')
					const ty=`<div${''==IX.filters.year?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.years.map(_=>`<div${_==IX.filters.year?' c':''} V='${_}' onclick='run("IX","tab_click",WI)(this)'>${_}</div>`).join('')
					const ts=[{k:'update',v:'最新'},{k:'hot',v:'最热'},{k:'desc',v:'添加'},{k:'score',v:'评分'},].map(_=>`<div${_.k==(IX.filters.sort||'update')?' c':''} V='${_.k}' onclick='run("IX","tab_click",WI)(this)'>${_.v}</div>`).join('')
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'type'},tt))
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'area'},ta))
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'year'},ty))
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'sort'},ts))
					const ks=Object.keys(IX.filters).filter(_=>IX.filters[_]!=''&&_!='category')
					if(ks.length>0){
						const k=ks.pop(),$=$O.$(`tab[T='${k}']>div[V='${IX.filters[k]}']`)
						$&&$.click()
						return
					}
				}
			}
		}else gbox.da('_').sa('a')
		if(Object.keys(IX.filters).filter(_=>IX.filters[_]!='').length<1&&!IX.search_key)return
		let S=IX.search_key,page=++IX.page,U=`https://api.olelive.com/v1/pub/vod/list/true/3/0/${encodeURIComponent(IX.filters.area)}/${IX.filters.category}/${IX.filters.type}/${IX.filters.year}/${IX.filters.sort}/${page}/30`
		if(S)U=`https://www.olehdtv.com/index.php/vod/search/${IX.search_key}/${encodeURIComponent(IX.search_val)}/page/${page}.html`
		const TS=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
		U.get(o=>{
			gbox.da('a').sa({_:`————  ${o===null?'🚨 请求失败，请重试':'🫧 数据为空'}！  ————`})
			if(!o||TS!=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val}))return
			o=S?o.$$('.vodlist_thumb'):o.data.list
			o&&gbox.append(...o.map(_=>{
				const n=(S?_.ga('title'):_.name).trim()
				let N=n.replace(/\s*[】]\s*/g,'').replace(/(\s*[【】:：·。～]\s*|\-+|—+)/g,'.').replace(/，/g,',').replace(/！/g,'!').replace(/\s\s/g,' ').replace(/\.{2,}/g,'.').trim().replace(/\s/g,'.').replace(/(\s*\.+$|\.?(剧场|真人)版)/g,'')
				if(IX.filters.category=='1')N=N.replace(/\.?电影版/g,'')
				return IX.name_reg.test(N)?null:$O.node('grid-c',{I:S?_.ga('href').split('/').pop().split('.').shift():_.id,N,onclick:'run("IX","card_click",WI)(this)'},`<img src='${IX.cover}' s='${S?_.ga('data-original'):`https://static.olelive.com/${_.pic}`}'/><score>${S?'':_.score}</score><tip>${S?_.$('.pic_text').innerText.trim():(_.remarks?_.remarks.trim():'')}</tip><title>${N}</title>`)
			}).filter(Boolean))
		},{_vv:IX.vv()},S?'html':'json')
	},

	card_click:me=>{ // 打开详情弹层
		const id=IX.id=me.ga('I'),videos='ole_favorite_videos'.gc({}),mbox=$O.$('modal-c').html(window._loader)
		IX.curr={N:me.ga('N'),C:me.$('img').ga('s'),S:me.$('score').innerText}
		$O.$('modal-t [SC]').innerText=id in videos?'♡':'⊕'
		$O.$('body').sa('ns')
		$O.$('grid').da('a')
		$O.$('modal').da('hide').$('modal-t>title').html('&nbsp;&nbsp;'+IX.curr.N);
		`https://api.olelive.com/v1/pub/vod/detail/${id}/true`.get(o=>{
			o=o.data
			const [trim_start,trim_end]=(id+'_ole_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))
			mbox.html(`<p><span>地区:&emsp;<em>${o.area}</em>&emsp;&emsp;&emsp;年份:&emsp;<em>${o.year}</em></span></p>
				<p T='director'${o.director!=''?'':' hide'}><span>导演: </span>${o.director.split('/').filter(_=>_.trim()!='').map(_=>`<span V='${_.trim()}' onclick='run("IX","tab_click",WI)(this)'><em>${_.trim()}</em></span>`).join('')}</p>
				<p T='actor'><span>主演: </span>${o.actor.split('/').filter(_=>_.trim()!='').map(_=>`<span V='${_.trim()}' onclick='run("IX","tab_click",WI)(this)'><em>${_.trim()}</em></span>`).join('')}</p>
				<p VS>${o.urls.map(_=>`<span u='${_.url}' onclick='run("IX","part_click",WI)(this)'>${_.title}</span>`).join('')}</p>
				<video preload autoplay crossorigin='anonymous' controls poster='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"%3E%3C/svg%3E'></video>
				<p VL><span VL S onclick='run("IX","trim_click",WI)(false)'>╟ ${Number(trim_start).dt()}</span><span VL W onclick='run("IX","trim_click",WI)(true)'>${Number(-trim_end).dt()} ╢</span></p>
				<p BF>${o.content}</p>`)
			const V=$O.$('video')
			IX.hls=new Hls({enableWorker:false,levelTargetDuration:8,maxBufferLength:50,maxBufferSize:1000*1000*2})
			IX.hls.attachMedia(V)
			V.addEventListener('fullscreenchange',()=>{
				if(!$O.fullscreenElement){
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
				IX.wait=false
				V.playbackRate=1.25
				const pt_key=id+'_ole_part_ctime',had_play=pt_key.hc()
				const play_history=had_play?pt_key.gc().split('$'):['','0']
				const history_ctime=parseFloat(play_history.pop())
				const seek_already=$O.$('p[VS]>span[c]').ga('u')==play_history.pop()
				const tc_key=id+'_ole_trim_config',trim_start=tc_key.gc('0:0').split(':').map(_=>parseFloat(_))[0]
				V.currentTime=Math.max(trim_start,seek_already?history_ctime:0)
				if(had_play&&!seek_already)pt_key.dc()
			}
			V.ontimeupdate=()=>{
				if(V.duration<250||IX.wait)return
				if(V.duration-V.currentTime>(id+'_ole_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))[1])return
				const x=$O.$('p[VS]>span[c]'),$=x?x.nextElementSibling:null
				$&&$.click()
			}
			const url=(id+'_ole_part_url').gc('')
			$O.$(`p[VS]>span${url?`[u='${url}']`:''}`).click()
		},{_vv:IX.vv()},'json')
	},

	part_click:me=>{ // 切换视频源
		IX.wait=true
		const url=me.ga('u')
		me.parentElement.$$(`span`).forEach(_=>_[_==me?'sa':'da']('c'))
		IX.hls.loadSource(url);(IX.id+'_ole_part_url').sc(url)
	},

	trim_click:_=>{ // 视频片头/尾设置
		const video=$O.$('video'),span=$O.$(_?'[VL][W]':'[VL][S]')
		const total=video.duration,now=video.currentTime
		const [trim_start,trim_end]=(IX.id+'_ole_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))
		span.innerText=span.innerText.replace(/[\d\-\:]+/,Number(_?(now-total):now).dt());
		(IX.id+'_ole_trim_config').sc(_?`${trim_start}:${total-now}`:`${now}:${trim_end}`)
	},

	collect_toggle:me=>{ // 视频收藏切换
		const uncollected=me.innerText=='⊕',videos='ole_favorite_videos'.gc({})
		me.innerText=uncollected?'♡':'⊕'
		if(uncollected)videos[IX.id]=IX.curr
		else if(IX.id in videos){
			delete videos[IX.id]
			if(IX.filters.category=='')$O.$(`grid-c[I='${IX.id}']`).remove()
		}
		'ole_favorite_videos'.sc(videos)
	},

	modal_close:async()=>{ // 关闭详情弹层
		const video=$O.$('video')
		video&&(IX.id+'_ole_part_ctime').sc($O.$('p[VS]>span[c]').ga('u')+'$'+video.currentTime)
		IX.wait=false
		IX.id=IX.curr=null
		IX.hls&&(await IX.hls.destroy())
		$O.$('modal').sa('hide','_I').$('modal-t>title').html('')
		$O.$('modal-c').html('')
		$O.$('body').da('ns')
	},

	dark_toggle:me=>{ // 深色模式切换
		const is_light=me.innerText=='⊙'
		$O.$('modal')[is_light?'sa':'da']('DK')
		me.innerText=is_light?'◎':'⊙'
	},

	watch:()=>{ // 监听节点
		IX.load_more=new IntersectionObserver((s,o)=>{
			let card=null
			s.forEach(e=>(e.target.nodeName=='GRID-C')&&(e.intersectionRatio>=0.7)&&(card=e.target))
			card&&o.unobserve(card)
			card&&(IX.filters.category!='')&&IX.tab_click()
		},{threshold:0.7})
		IX.img_lazy=new IntersectionObserver((s,o)=>{
			s.forEach(e=>{
				e.target.isConnected&&(e.target.nodeName=='IMG')
				&&(e.intersectionRatio>=0.7)&&(e.target.ga('src')!=e.target.ga('s'))
				&&e.target.sa({src:e.target.ga('s')})&&o.unobserve(e.target)
			})
		},{threshold:0.7})
		IX.get_nodes=new MutationObserver(s=>{
			let last_card=null
			s.forEach(e=>{
				const t=e.target,tag=t.nodeName
				const is_gbox=tag=='GRID',cards=Array.from(e.addedNodes)
				if(!is_gbox||cards.length<1||(is_gbox&&cards.some(_=>_.nodeName!='GRID-C')))return
				is_gbox&&!last_card&&(last_card=cards[cards.length-1])
				cards.filter(_=>_.nodeName=='GRID-C').forEach(_=>IX.img_lazy.observe(_.$('img')))
			})
			last_card&&IX.load_more.observe(last_card)
		})
		IX.get_nodes.observe($O.body,{subtree:true,childList:true,attributeFilter:['hide','_I']});
	},

	run:()=>{ // 启动执行
		$O.$('head>style[ix]').innerHTML=`
body[ns]{overflow-y:hidden!important}
body>img{position:absolute;top:50%;left:50%;width:90vw;object-fit:contain;transform:translate(-50%,-50%)}
body *{overflow-wrap:break-word;white-space:pre-line;word-break:break-word;font-synthesis:weight style small-caps}

rbox,cbox{display:flex!important}
rbox{flex-direction:column!important}
tab{height:26px;display:flex;align-items:center;overflow-x:auto;overflow-y:hidden;border-bottom:1px solid rgba(255,255,255,.04);background:rgba(255,255,255,.02)}
tab::-webkit-scrollbar{width:0;height:0}
tab>div{width:auto;padding:0 10px;color:rgba(255,255,255,.5);line-height:25px;white-space:nowrap}
tab>div[c]{position:relative;color:#fff;font-weight:bold}
tab>div[c]::after{content:'';position:absolute;bottom:0;left:30%;z-index:100;display:block;width:40%;height:1.5px;background:#7bda3e}
grid{flex:.91;display:block;padding:2px 2px 0 0;overflow-y:auto;overflow-x:hidden}
grid[a]{padding-bottom:20px}
grid[a]::after{content:'加载中，请稍后 . . .';color:#fff;background:linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 40%,rgba(0,0,0,.9) 100%);font-size:12px;display:block;padding:2px 0;position:fixed;left:0;right:0;bottom:0;z-index:10000000000;text-align:center}
grid:empty{min-height:40vh}
grid:empty::after{content:attr(_,'————  🫧 数据为空！  ————')!important;color:#ccc!important;background:rgba(0,0,0,0)!important;text-align:center;display:block;font-size:14px;position:absolute!important;top:20vh!important;left:0;right:0;bottom:unset!important;z-index:100000000;text-align:center}
grid-c{display:block;float:left;width:calc((100vw - 2px) / 3 - 2px);height:calc(((100vw - 2px) / 3 - 2px) * 1.34);overflow:hidden;background:rgba(255,255,255,.02);border-radius:2px;margin:0 0 2px 2px}
grid-c[X='ok']{padding:16px;background:rgba(255,255,255,.3)}
grid-c img{display:block;width:100%;object-fit:cover}
grid-c score{position:absolute;top:8px;left:8px;z-index:20;display:block;font-size:12px;color:orange;-webkit-text-stroke:.3px blue}
grid-c tip{position:absolute;top:calc(((100vw - 2px) / 3 - 2px) * 1.34 - 60px);left:20px;right:20px;text-align:center;z-index:20;display:block;font-size:12px;color:#fff;-webkit-text-stroke:.3px blue}
grid-c title{position:absolute;bottom:0;left:0;right:0;z-index:10;display:block;font-size:12px;color:#fff;line-height:14px;padding:4px 3px;background:linear-gradient(rgba(60,60,60,.6),rgba(0,0,0,.9))}
modal{touch-action:none;display:block;width:100vw.height:100vh;position:fixed;top:0;left:0;bottom:0;z-index:1000000}
modal mbox{touch-action:none;position:relative;display:block;width:100vw;height:100vh;background:rgba(0,0,0,.95);overflow:hidden}
modal-t{position:absolute;top:0;z-index:222;display:flex;width:100%;overflow:hidden;height:40px;padding:10px 4px 0 4px;background:rgba(0,0,0,.8)}
modal-t>title{flex:1;display:block;height:30px;font-size:18px;line-height:30px;color:#fff;white-space:pre-line;word-break:break-word}
modal-t>icc{display:inline-block;width:30px;height:30px;line-height:30px;font-size:28px;color:#fff;margin-right:20px}
modal-c{margin-top:45px;display:flex;flex-direction:column;height:calc(100vh - 100px);overflow:hidden auto}
modal-c>p{line-height:20px;font-size:12px;color:#999;padding:2px 8px;margin:0}
modal-c>p>span{display:block;float:left;padding:0 4px;margin-right:4px;line-height:1.8}
modal-c>p>span[c]{text-decoration:underline;text-underline-offset:3px}
modal-c>video{display:block;margin-top:8px;border-radius:4px}
modal-c>p[VL]{border-top:1px solid #555}
modal-c>p>[VL]{display:block;line-height:30px;text-align:left;width:auto}
modal-c>p>[VL]:nth-child(2){float:right;text-align:right}
modal-c>p[VS],modal-c>p[BF]{border-radius:4px;background:rgb(172 0 255 / 17%)}}
modal-c>p[BF]{font-size:8px;line-height:1.5}
modal[DK] modal-c{display:block!important;flex-direction:unset!important}
modal[DK] modal-c>*:not(video){visibility:hidden!important}
modal[DK] modal-c>video{position:fixed!important;left:0;right:0;bottom:30px;width:100%;object-fit:contain;margin-top:unset!important}

@media(min-aspect-ratio:16 / 9){
	grid-c{width:calc((100vw - 2px) / 6 - 2px)!important;height:calc(((100vw - 2px) / 6 - 2px) * 1.34)!important}
}
@media(min-aspect-ratio:18 / 9){
	grid-c{width:calc((100vw - 2px) / 8 - 2px)!important;height:calc(((100vw - 2px) / 8 - 2px) * 1.34)!important}
}

@media(pointer:coarse){
	grid-c:hover{background:initial}
	grid-c:focus-visible,modal-c>p>span:focus-visible{
		outline:6px solid #fff;
		outline-offset:6px;
		transform:scale(1.05);
		transition:transform 0.1s;
	}
}`;
	const render=()=>{
		let o=`<tab T='category'>${Object.keys(IX.tmap).map(_=>`<div V='${_}' onclick='run("IX","tab_click",WI)(this)'>${IX.tmap[_].name}</div>`).join('')}</tab>`
		o+=`<grid></grid>`
		o+=`<modal hide><mbox><modal-t><title></title>`
		o+=`<icc SC onclick='run("IX","collect_toggle",WI)(this)' style='line-height:33px'>⊕</icc>`
		o+=`<icc onclick='run("IX","dark_toggle",WI)(this)' style='line-height:33px'>⊙</icc>`
		o+=`<icc onclick='run("IX","modal_close",WI)()'>╳</icc>`
		o+=`</modal-t><modal-c></modal-c></mbox></modal>`
		$O.body.html(o)
		IX.watch()
		const {filters}='ole_filters'.gc({filters:{}})
		$O.$(`tab[T='category']>div${filters.category?`[V='${filters.category}']`:''}`).click()
	}

	IX.tmap='ole_tmap'.gc({})
	if(Object.keys(IX.tmap).length>0)return render()

	'https://api.olelive.com/v1/pub/vod/list/type'.get(o=>{
			if(!o)return
			o.data.filter(_=>_.typeId<5).forEach(_=>(IX.tmap[_.typeId]={name:_.typeName,areas:_.area,years:_.year,types:_.children.map(x=>(x.typeId+'').startsWith(_.typeId+'')?(x.typeId+':'+x.typeName):null).filter(_=>_)}))
			IX.tmap['']={name:'收藏夹',areas:[],years:[],types:[]}
			IX.tmap['?']={name:'搜索',areas:[],years:[],types:[]}
			'ole_tmap'.sc(IX.tmap)
			render()
		},{_vv:IX.vv()},'json')
	},
}
