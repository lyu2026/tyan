
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'ayf',

	// 所有监听对象
	observer:{},
	O:cordova.plugin.sorient,

	// 视频名称过滤正则
	name_reg:/(抢先|陈翔六点半|大电影|羊羊|没事|燃烧吧|拜托了|热恋|行不通|吃饭|差评女友|不好惹|怎敌她|永不放弃|鹊刀门|量产型|乡村爱情|扑通扑通|二龙湖|小财迷|武侠世界|别怕)/,

	// 筛选设置
	filters:{category:'',type:'',area:'',lang:'',year:'',sort:''},search_key:null,search_val:null,

	// 控制参数
	tmap:{
		'':{name:'收藏夹',areas:[],years:[],types:[]},
		'?':{name:'搜索',areas:[],years:[],types:[]},
		movie:{name:'电影',areas:[],years:[],langs:[],sorts:[],types:[]},
		drama:{name:'电视剧',areas:[],years:[],langs:[],sorts:[],types:[]},
		variety:{name:'综艺',areas:[],years:[],langs:[],sorts:[],types:[]},
		anime:{name:'动漫',areas:[],years:[],langs:[],sorts:[],types:[]},
		documentary:{name:'记录片',areas:[],years:[],langs:[],sorts:[],types:[]},
		european:{name:'欧美',areas:[],years:[],langs:[],sorts:[],types:[]},
		japan:{name:'日本',areas:[],years:[],langs:[],sorts:[],types:[]},
		domestic:{name:'中国',areas:[],years:[],langs:[],sorts:[],types:[]},
	},hls:null,page:0,mk:null,curr:null,wait:true,key:null,

	// 域名
	mh:'https://api.yfsp.tv/api/',
	wh:'https://api.wyav.tv/api/',

	tab_click:(me,go=_=>true)=>{ // 筛选视频
		CF()
		let key,val
		const K=IX.key=crypto.randomUUID(),gbox=$O.$('grid').da('_').sa('a')
		if(me){
			IX.page=0
			IX.modal_close()
			IX.O.unlock()
			key=me.parentElement.ga('T');val=me.ga('V')
			gbox.da('a').sa({_:key=='category'&&val=='?'?'💡 请输入关键字 . . ':'🥏 正在搜索，请稍等 . . .'}).html('')
			if(key=='category'&&val=='?'){
				IX.search_val=prompt('搜索关键字:')||''
				IX.search_key='name'
				IX.filters.category='?'
				gbox.sa({_:IX.search_val?`🔍 开始搜索关键字“${IX.search_val}”`:`————  🚨 关键字为空，肯定冇数据啊瑟瑟！  ————`})
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
				const ks=Object.keys(IX.filters).filter(_=>_!='category'),{filters}='ayf_filters'.gc({filters:{}})
				ks.forEach(_=>(IX.filters[_]=IX.filters.category!=filters.category||!filters[_]?'':filters[_]))
				$O.$$(ks.map(_=>`tab[T='${_}']`).join(',')).forEach(_=>_.remove())
			}
			'ayf_filters'.sc({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
			if(key=='category'){
				if(IX.filters.category==''){
					gbox.da('_')
					const videos='ayf_favorite_videos'.gc({})
					gbox.append(...Object.keys(videos).map(_=>$O.node('grid-c',{I:_,N:videos[_].N,onclick:'run("IX","card_click",WI)(this)'},`<img crossorigin='anonymous' src='${VCVR}' s='${videos[_].C}'/><score>${videos[_].S}</score><title>${videos[_].N}</title>`)))
					return
				}
				if(IX.filters.category!='?'){
					const X=IX.tmap[IX.filters.category]
					const tt=X.types.map(({id,name})=>`<div${id==IX.filters.type?' c':''} V='${id}' onclick='run("IX","tab_click",WI)(this)'>${name}</div>`).join('')
					const ta=X.areas.map(({id,name})=>`<div${id==IX.filters.area?' c':''} V='${id}' onclick='run("IX","tab_click",WI)(this)'>${name}</div>`).join('')
					const tl=X.langs.map(({id,name})=>`<div${id==IX.filters.lang?' c':''} V='${id}' onclick='run("IX","tab_click",WI)(this)'>${name}</div>`).join('')
					const ty=X.years.map(({id,name})=>`<div${id==IX.filters.year?' c':''} V='${id}' onclick='run("IX","tab_click",WI)(this)'>${name}</div>`).join('')
					const ts=X.sorts.map(({id,name})=>`<div${id==IX.filters.sort?' c':''} V='${id}' onclick='run("IX","tab_click",WI)(this)'>${name}</div>`).join('')
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'type'},tt))
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'area'},ta))
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'lang'},tl))
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
		}
		if(IX.search_key&&!IX.search_val)return

		if(IX.page>0){
			gbox.da('_').sa('a')
			scrollTo(0,$O.body.scrollHeight)
		}

		if(Object.keys(IX.filters).filter(_=>IX.filters[_]!='').length<1&&!IX.search_key)return true
		let S=IX.search_val,page=++IX.page
		let U=`${['japan','european','domestic'].includes(IX.filters.category)?IX.wh:IX.mh}list/getconditionfilterdata?titleid=${IX.filters.category}&ids=${IX.filters.sort||0},${IX.filters.type||0},${IX.filters.area||0},${IX.filters.lang||0},${IX.filters.year||0}&page=${page}&size=24`
		if(S)U=`https://api.yfsp.tv/api/list/gettitlegetdata?SearchCriteria=${encodeURIComponent(IX.search_val)}&page=${page}`
		const TS=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
		U.get(_=>{
			if(IX.key!=K)return
			log('列表数据',_)
			gbox.da('a').sa({_:`————  ${_===null?'🚨 请求失败，请重试':'🫧 数据为空'}！  ————`})
			if(_===null){
				return go(false)
			}
			if(TS!=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val}))return go(true)
			const m={movie:'电影',drama:'电视剧',variety:'综艺',anime:'动漫',documentary:'纪录片',european:'欧美',japan:'日本',domestic:'国产'}
			const o=_.data.list.filter(_=>_.mediaType==m[IX.filters.category])
			o&&gbox.append(...o.map(_=>{
				let {mediaKey,title,coverImgUrl,score,updateStatus,date}=_,tip=updateStatus||(new Date(_.date).toLocaleString())
				let N=title.replace(/\s*[】]\s*/g,'').replace(/(\s*[【】:：·。～]\s*|\-+|—+)/g,'.').replace(/，/g,',').replace(/！/g,'!').replace(/\s\s/g,' ').replace(/\.{2,}/g,'.').trim().replace(/\s/g,'.').replace(/(\s*\.+$|\.?(剧场|真人)版)/g,'')
				if(IX.filters.category=='movie')N=N.replace(/\.?电影版/g,'')
				return IX.name_reg.test(N)?null:$O.node('grid-c',{I:mediaKey,N:title,onclick:'run("IX","card_click",WI)(this)'},`<img crossorigin='anonymous' src='${VCVR}' s='${coverImgUrl}'/><score>${score||''}</score><tip>${tip}</tip><title>${N}</title>`)
			}).filter(Boolean))
			go(true)
		},{},'json')
	},

	fold_toggle:me=>{ // 视频源展开/折叠
		const x=me.html()=='💦'
		me.innerText=x?'🌀':'💦'
		$O.$('modal-c [VS]')[x?'sa':'da']('x')
	},

	card_click:me=>{ // 打开详情弹层
		CF()
		const K=IX.key=crypto.randomUUID(),mk=me.ga('I')
		const videos='ayf_favorite_videos'.gc({}),mbox=$O.$('modal-c').html(`<sk pt30 f fv g12><sk f g12><sk q w20 h40></sk><sk q w10 h40></sk><sk q w33 h40></sk><sk q f1 h40></sk></sk><sk f g12><sk q w20 h40></sk><sk q f1 h40></sk></sk><sk x6 g16>${'<sk b h20></sk>'.repeat(6)}</sk><sk q r169></sk><sk f g20><sk b w40 h12></sk><sk f1></sk><sk b w h12></sk></sk><sk q r219></sk></sk>`)
		IX.mk=mk
		IX.curr={N:me.ga('N'),C:me.$('img').ga('s'),S:me.$('score').innerText}
		$O.$('modal-t [SC]').innerText=mk in videos?'♡':'⊕'
		$O.body.sa('ns')
		$O.$('grid').da('a')
		$O.$('modal').da('hide').$('modal-t>title').da('s10','s12','s14').html(IX.curr.N.length>14?(IX.curr.N.substring(0,14)+'\n'+IX.curr.N.substring(14)):IX.curr.N)
		if(IX.curr.N.length>14)$O.$('modal-t>title').sa('s14')
		else if(IX.curr.N.length>12)$O.$('modal-t>title').sa('s12')
		else if(IX.curr.N.length>10)$O.$('modal-t>title').sa('s10');

		`${['japan','european','domestic'].includes(IX.filters.category)?IX.wh:IX.mh}video/videodetails?mediaKey=${mk}`.get(async _=>{
			if(IX.key!=K||_===null)return

			const {cidMapper,regional,lang,postTime,date,director,starring,episodes,introduce}=_.data.detailInfo
			const [trim_start,trim_end]=(mk+'_ayf_trim_config').gc('0:0').split(':').map(_=>parseFloat(_)),o=[]
			o.push(`<div><div><b>类型:</b>&emsp;<em>${cidMapper}</em>&emsp;&emsp;<b>地区:</b>&emsp;<em>${regional}</em>&emsp;&emsp;<b>年份:</b>&emsp;<em>${new Date(postTime||date).toLocaleString().split('/').shift()}</em></div></div>`)
			o.push(`<div T='director'${director!=''?'':' hide'}><div b>导演:</div>${(director||'').split(/[\/,]/).filter(_=>_.trim()!='').map(_=>`<div V='${_.trim()}' onclick='run("IX","tab_click",WI)(this)'><em>${_.trim()}</em></div>`).join('')}</div>`)
			o.push(`<div T='actor'${starring!=''?'':' hide'}><div b>主演:</div>${(starring||'').split(',').filter(_=>_.trim()!='').map(_=>`<div V='${_.trim()}' onclick='run("IX","tab_click",WI)(this)'><em>${_.trim()}</em></div>`).join('')}</div>`)
			o.push(`${episodes.length>14?`<div tg><div onclick='run("IX","fold_toggle",WI)(this)'>🌀</div></div>`:''}<div VS${episodes.length>14?' x':''}>${episodes.map((_,i)=>`<div mk='${mk}' vid='${_.episodeId}' onclick='run("IX","part_click",WI)(this)'>${_.episodeTitle}</div>`).join('')}</div>`)
			o.push(`<video preload autoplay crossorigin='anonymous' controls poster='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" style="background:%23${$O.body.ha('dark')?'001':'eff'}"%3E%3C/svg%3E'></video>`)
			o.push(`<div VL><div VL S onclick='run("IX","trim_click",WI)(false)'>╟ ${Number(trim_start).dt()}</div><div VL W onclick='run("IX","trim_click",WI)(true)'>${Number(-trim_end).dt()} ╢</div></div>`)
			o.push(`<div BF>${introduce}</div>`)
			mbox.html(o.join(''))

			if(!window.Hls){
				let DX=await DB('o','o')
				if(!DX)DX=await DB('o','o')
				let hls=await DG(DX,'o','hls.js')||''
				if(''===hls){
					hls=await new Promise((res,rej)=>'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.6.13/hls.light.min.js'.get(_=>res(_),{},'text'))
					await DA(DX,'o','hls.js',hls)
				}
				eval(hls)
				log('载入 HLS.JS')
			}

			const V=$O.$('video')
			IX.hls=new Hls({enableWorker:false,levelTargetDuration:8,maxBufferLength:50,maxBufferSize:1000*1000*2})
			IX.hls.attachMedia(V)
			V.addEventListener('fullscreenchange',()=>{
				if(!$O.fullscreenElement){
					IX.O.unlock()
					if(V.fsn)V.fsn=false
					return
				}
				if(!V.fsn){
					IX.O.lock('landscape')
					V.fsn=true
					return
				}
				IX.O.unlock()
				V.fsn=false
			},false)
			V.ondurationchange=()=>{
				const m=$O.$('modal-c')
				if(V.duration<250||!m||m.ha('hide'))return
				IX.wait=false
				V.playbackRate=1.25
				const pt_key=mk+'_ayf_part_ctime',had_play=pt_key.hc()
				const play_history=had_play?pt_key.gc().split('$'):['','0']
				const history_ctime=parseFloat(play_history.pop())
				const seek_already=$O.$('[VS]>[c]').ga('u')==play_history.pop()
				const tc_key=mk+'_ayf_trim_config',trim_start=tc_key.gc('0:0').split(':').map(_=>parseFloat(_))[0]
				V.currentTime=Math.max(trim_start,seek_already?history_ctime:0)
				if(had_play&&!seek_already)pt_key.dc()
			}
			V.ontimeupdate=()=>{
				const m=$O.$('modal-c')
				if(V.duration<250||IX.wait||!m||m.ha('hide'))return
				if(V.duration-V.currentTime>(mk+'_ayf_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))[1])return
				const x=$O.$('[VS]>[c]'),$=x?x.nextElementSibling:null
				$&&$.click()
			}
			let x=(mk+'_ayf_part_url').gc(null)
			x=$O.$(`[VS]>div${x?`[mk='${mk}'][vid='${x}']`:''}`)
			if(!x)x=$O.$(`[VS]>div`)
			if(x)x.click()
		},{},'json')
	},

	part_click:me=>{ // 切换视频源
		CF()
		IX.wait=true
		const K=IX.key=crypto.randomUUID(),{mk,vid}=me.ga('mk','vid')
		me.parentElement.$$(`div`).forEach(_=>_[_==me?'sa':'da']('c'));
		`${['japan','european','domestic'].includes(IX.filters.category)?IX.wh:IX.mh}video/getplaydata`.get(o=>{
			log('视频源链',o)
			if(IX.key!=K||!o||!o.data.list)return
			o=o.data.list.filter(_=>_.mediaUrl).sort((a,b)=>parseInt(a.resolution)-parseInt(b.resolution)).pop()
			if(!o||!o.mediaUrl)return
			IX.hls.loadSource(o.mediaUrl);
			(IX.mk+'_ayf_part_url').sc(vid)
		},{mediaKey:mk,videoId:vid,videoType:1},'json')
	},

	trim_click:_=>{ // 视频片头/尾设置
		const video=$O.$('video'),who=$O.$(_?'[VL][W]':'[VL][S]')
		const total=video.duration,now=video.currentTime
		const [trim_start,trim_end]=(IX.mk+'_ayf_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))
		who.innerText=who.innerText.replace(/[\d\-\:]+/,Number(_?(now-total):now).dt());
		(IX.mk+'_ayf_trim_config').sc(_?`${trim_start}:${total-now}`:`${now}:${trim_end}`)
	},

	collect_toggle:me=>{ // 视频收藏切换
		const uncollected=me.innerText=='⊕',videos='ayf_favorite_videos'.gc({})
		me.innerText=uncollected?'♡':'⊕'
		if(uncollected)videos[IX.mk]=IX.curr
		else if(IX.mk in videos){
			delete videos[IX.mk]
			if(IX.filters.category=='')$O.$(`grid-c[I='${IX.mk}']`).remove()
		}
		'ayf_favorite_videos'.sc(videos)
	},

	modal_close:async()=>{ // 关闭详情弹层
		CF()
		const video=$O.$('video')
		video&&(IX.mk+'_ayf_part_ctime').sc($O.$('[VS]>[c]').ga('u')+'$'+video.currentTime)
		IX.wait=false
		IX.mk=IX.curr=null
		IX.hls&&(await IX.hls.destroy())
		$O.$('modal').sa('hide','_I').$('modal-t>title').html('')
		$O.$('modal-c').html('')
		$O.body.da('ns')
	},

	dark_toggle:me=>{ // 深色模式切换
		const is_light=me.innerText=='⊙'
		$O.$('modal')[is_light?'sa':'da']('DK')
		me.innerText=is_light?'◎':'⊙'
	},

	watch:()=>{ // 监听节点
		IX.observer.load_more=new IntersectionObserver((s,o)=>{
			let card=null
			s.forEach(e=>(e.target.nodeName=='GRID-C')&&(e.intersectionRatio>=0.7)&&(card=e.target))
			if(!card||card.ha('wait')||IX.filters.category==='')return
			card.sa('wait')
			IX.tab_click(null,_=>{
				if(_)o?.unobserve(card)
				card.da('wait')
			})
		},{threshold:0.7})
		IX.observer.img_lazy=new IntersectionObserver((s,o)=>{
			s.forEach(e=>{
				e.target.isConnected&&(e.target.nodeName=='IMG')
				&&(e.intersectionRatio>=0.7)&&(e.target.ga('src')!=e.target.ga('s'))
				&&e.target.sa({src:e.target.ga('s')})&&o?.unobserve(e.target)
			})
		},{threshold:0.7})
		IX.observer.get_nodes=new MutationObserver(s=>{
			let last_card=null
			s.forEach(e=>{
				const t=e.target,tag=t.nodeName
				const is_gbox=tag=='GRID',cards=Array.from(e.addedNodes)
				if(!is_gbox||cards.length<1||(is_gbox&&cards.some(_=>_.nodeName!='GRID-C')))return
				is_gbox&&!last_card&&(last_card=cards[cards.length-1])
				cards.filter(_=>_.nodeName=='GRID-C').forEach(_=>IX.observer.img_lazy?.observe(_.$('img')))
			})
			last_card&&IX.observer.load_more?.observe(last_card)
		})
		IX.observer.get_nodes.observe($O.body,{subtree:true,childList:true,attributeFilter:['hide','_I']});
	},

	run:()=>{ // 启动执行
		log('进入页面，自定义样式')
		$O.$('head>style[ix]').innerHTML=`
body{display:flex!important;flex-direction:column!important}
tab:not(tab:first-of-type):not(tab:last-of-type){padding-left:60px}`
		const render=()=>{
			log('渲染页面，构建 DOM 树')
			let o=`<tab T='category'>${['','?',...Object.keys(IX.tmap).filter(_=>_!=''&&_!='?')].map(_=>`<div V='${_}' onclick='run("IX","tab_click",WI)(this)'>${IX.tmap[_].name}</div>`).join('')}</tab>`
			o+=`<grid></grid>`
			o+=`<modal hide><mbox><modal-t><title></title>`
			o+=`<icc SC onclick='run("IX","collect_toggle",WI)(this)' style='line-height:33px'>⊕</icc>`
			o+=`<icc onclick='run("IX","dark_toggle",WI)(this)' style='line-height:33px'>⊙</icc>`
			o+=`<icc onclick='run("IX","modal_close",WI)()'>╳</icc>`
			o+=`</modal-t><modal-c></modal-c></mbox></modal>`
			$O.$$('body>*:not(#w_logs)').forEach(_=>_.remove())
			$O.body.html(o+($O.$('#w_logs')?.html(true)||''))
			log('绑定事件，节点监听')
			IX.watch()
			log('获取记忆，开始筛选')
			const {filters}='ayf_filters'.gc({filters:{category:''}})
			$O.$(`tab[T='category']>div${filters.category?`[V='${filters.category}']`:''}`).click()
		}

		log('获取记忆，分类信息')
		const tmap='ayf_tmap'.gc({})
		if(tmap.movie&&tmap.movie.types.length>0){
			IX.tmap=tmap
			render()
			return
		}

		const K=IX.key=crypto.randomUUID(),cs=Object.keys(IX.tmap).filter(_=>_!=''&&_!='?'),one=()=>{
			if(cs.length<1){
				if(K!=IX.key)return
				'ayf_tmap'.sc(IX.tmap)
				render()
				return
			}
			const c=cs.shift(),u=`${['japan','european','domestic'].includes(c)?IX.wh:IX.mh}list/getfiltertagsdata`
			u.get(o=>{
				log('分类数据',o)
				if(!o||typeof o.data.list!='object'||o.data.list.length<1||K!=IX.key)return
				o.data.list.forEach((_,i)=>{
					if(i>4)return
					const k=['sorts','types','areas','langs','years'][i]
					_.list.forEach(_=>{
						const id=_.classifyId==0?'':_.classifyId.toString()
						IX.tmap[c][k].push({id,name:_.classifyName})
					})
				})
				one()
			},{SecondaryCode:c},'json')
		}
		one()
	},

}
