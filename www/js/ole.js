
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'ole',

	// 所有监听对象
	observer:{},

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

	// 筛选设置
	filters:{category:'',type:'',area:'',year:'',sort:''},search_key:null,search_val:null,

	// 控制参数
	tmap:{
		'':{name:'收藏夹',areas:[],years:[],types:[]},
		'?':{name:'搜索',areas:[],years:[],types:[]},
	},sm:{},hls:null,page:0,id:null,curr:null,wait:true,key:null,

	tab_click:(me,go=_=>true)=>{ // 筛选视频
		CF()
		let key,val
		const K=IX.key=crypto.randomUUID(),gbox=$O.$('grid').da('_').sa('a')
		if(me){
			IX.sm={}
			IX.page=0
			IX.modal_close()
			screen.orientation.unlock()
			key=me.parentElement.ga('T');val=me.ga('V')
			log(`手动筛选，点击 ${key}: ${val}`)
			gbox.da('a').sa({_:key=='category'&&val=='?'?'💡 请输入关键字 . . ':'🥏 正在搜索，请稍等 . . .'}).html('')
			if(key=='category'&&val=='?'){
				IX.search_val=prompt('搜索关键字:')||''
				IX.search_key='name'
				IX.filters.category='?'
				log(`手动搜索，关键词 ${IX.search_val}`)
				gbox.sa({_:IX.search_val?`🔍 开始搜索关键字“${IX.search_val}”`:`————  🚨 关键字为空，肯定冇数据啊瑟瑟！  ————`})
			}else if(key=='actor'||key=='director'){
				me=$O.$(`tab[T='category']>div[V='?']`)
				IX.filters.category='?'
				IX.search_key=key
				IX.search_val=val
				key='category'
				log(`特定搜索，关键词 ${IX.search_val}`)
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
					log(`获取收藏`)
					gbox.da('_')
					const videos='ole_favorite_videos'.gc({})
					gbox.append(...Object.keys(videos).map(_=>$O.node('grid-c',{I:_,N:videos[_].N,onclick:'run("IX","card_click",WI)(this)'},`<img crossorigin='anonymous' src='${VCVR}' s='${videos[_].C}'/><score>${videos[_].S}</score><title>${videos[_].N}</title>`)))
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
		}
		if(IX.search_key&&!IX.search_val)return

		if(IX.page>0){
			gbox.da('_').sa('a')
			scrollTo(0,$O.body.scrollHeight)
		}

		if(Object.keys(IX.filters).filter(_=>IX.filters[_]!='').length<1&&!IX.search_key)return true
		let S=IX.search_key,page=++IX.page,U=`https://api.olelive.com/v1/pub/vod/list/true/3/0/${encodeURIComponent(IX.filters.area)}/${IX.filters.category}/${IX.filters.type}/${IX.filters.year}/${IX.filters.sort}/${page}/30`
		if(S)U=`https://www.olehdtv.com/index.php/vod/search/${IX.search_key}/${encodeURIComponent(IX.search_val)}/page/${page}.html`
		const TS=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
		U.get(o=>{
			if(IX.key!=K)return
			log('列表数据',o)
			gbox.da('a').sa({_:`————  ${o===null?'🚨 请求失败，请重试':'🫧 数据为空'}！  ————`})
			if(o===null)return go(false)
			if(TS!=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val}))return go(true)
			o=S?o.$$('.vodlist_thumb'):o.data.list
			o&&gbox.append(...o.map(_=>{
				const n=(S?_.ga('title'):_.name).trim(),I=S?_.ga('href').split('/').pop().split('.').shift():_.id
				if(S&&I in IX.sm)return null
				IX.sm[I]=1
				let N=n.replace(/\s*[】]\s*/g,'').replace(/(\s*[【】:：·。～]\s*|\-+|—+)/g,'.').replace(/，/g,',').replace(/！/g,'!').replace(/\s\s/g,' ').replace(/\.{2,}/g,'.').trim().replace(/\s/g,'.').replace(/(\s*\.+$|\.?(剧场|真人)版)/g,'')
				if(IX.filters.category=='1')N=N.replace(/\.?电影版/g,'')
				return IX.name_reg.test(N)?null:$O.node('grid-c',{I,N,onclick:'run("IX","card_click",WI)(this)'},`<img crossorigin='anonymous' src='${VCVR}' s='${S?_.ga('data-original'):`https://static.olelive.com/${_.pic}`}'/><score>${S?'':_.score}</score><tip>${S?_.$('.pic_text').innerText.trim():(_.remarks?_.remarks.trim():'')}</tip><title>${N}</title>`)
			}).filter(Boolean))
			go(true)
		},{_vv:IX.vv()},S?'html':'json')
	},

	fold_toggle:me=>{ // 视频源展开/折叠
		const x=me.html()=='💦'
		me.innerText=x?'🌀':'💦'
		$O.$('modal-c [VS]')[x?'sa':'da']('x')
	},

	card_click:me=>{ // 打开详情弹层
		CF()
		const K=IX.key=crypto.randomUUID()
		const id=IX.id=me.ga('I'),videos='ole_favorite_videos'.gc({}),mbox=$O.$('modal-c').html(`<sk pt30 f fv g12><sk f g12><sk q w20 h40></sk><sk q w10 h40></sk><sk q w33 h40></sk><sk q f1 h40></sk></sk><sk f g12><sk q w20 h40></sk><sk q f1 h40></sk></sk><sk x6 g16>${'<sk b h20></sk>'.repeat(6)}</sk><sk q r169></sk><sk f g20><sk b w40 h12></sk><sk f1></sk><sk b w h12></sk></sk><sk q r219></sk></sk>`)
		IX.curr={N:me.ga('N'),C:me.$('img').ga('s'),S:me.$('score').innerText}
		$O.$('modal-t [SC]').innerText=id in videos?'♡':'⊕'
		$O.body.sa('ns')
		$O.$('grid').da('a')
		$O.$('modal').da('hide').$('modal-t>title').da('s10','s12','s14').html(IX.curr.N.length>14?(IX.curr.N.substring(0,14)+'\n'+IX.curr.N.substring(14)):IX.curr.N)
		if(IX.curr.N.length>14)$O.$('modal-t>title').sa('s14')
		else if(IX.curr.N.length>12)$O.$('modal-t>title').sa('s12')
		else if(IX.curr.N.length>10)$O.$('modal-t>title').sa('s10');

		`https://api.olelive.com/v1/pub/vod/detail/${id}/true`.get(async _=>{
			if(IX.key!=K)return
			log('详情数据',_)
			const {area,year,director,actor,urls,content}=_.data,o=[]
			const [trim_start,trim_end]=(id+'_ole_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))
			o.push(`<div><div><b>地区:</b>&emsp;<em>${area}</em>&emsp;&emsp;&emsp;<b>年份:</b>&emsp;<em>${year}</em></div></div>`)
			o.push(`<div T='director'${director!=''?'':' hide'}><div b>导演: </div>${director.split('/').filter(_=>_.trim()!='').map(_=>`<div V='${_.trim()}' onclick='run("IX","tab_click",WI)(this)'><em>${_.trim()}</em></div>`).join('')}</div>`)
			o.push(`<div T='actor'${actor!=''?'':' hide'}><div b>主演: </div>${actor.split('/').filter(_=>_.trim()!='').map(_=>`<div V='${_.trim()}' onclick='run("IX","tab_click",WI)(this)'><em>${_.trim()}</em></div>`).join('')}</div>`)
			o.push(`${urls.length>14?`<div tg><div onclick='run("IX","fold_toggle",WI)(this)'>🌀</div></div>`:''}<div VS${urls.length>14?' x':''}>${urls.map((_,i)=>`<div u='${_.url}' onclick='run("IX","part_click",WI)(this)'>${_.title}</div>`).join('')}</div>`)
			o.push(`<video preload autoplay crossorigin='anonymous' controls poster='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" style="background:%23${$O.body.ha('dark')?'001':'eff'}"%3E%3C/svg%3E'></video>`)
			o.push(`<div VL><div VL S onclick='run("IX","trim_click",WI)(false)'>╟ ${Number(trim_start).dt()}</div><div VL W onclick='run("IX","trim_click",WI)(true)'>${Number(-trim_end).dt()} ╢</div></div>`)
			o.push(`<div BF>${content}</div>`)
			mbox.html(o.join(''))

			if(!window.Hls){
				let hls=await DG(DX,'o','hls.js')||''
				if(''===hls){
					hls=await $w.fetch('https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.6.13/hls.light.min.js').then(_=>_.text())
					await DA(DX,'o','hls.js',hls)
				}
				$O.head.appendChild($o.node('script',{ix:''},hls))
				log('载入 hls.js')
				while(true)if(window.Hls)break
			}

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
				const m=$O.$('modal-c')
				if(V.duration<250||!m||m.ha('hide'))return
				IX.wait=false
				V.playbackRate=1.25
				const pt_key=id+'_ole_part_ctime',had_play=pt_key.hc()
				const play_history=had_play?pt_key.gc().split('$'):['','0']
				const history_ctime=parseFloat(play_history.pop())
				const seek_already=$O.$('[VS]>[c]').ga('u')==play_history.pop()
				const tc_key=id+'_ole_trim_config',trim_start=tc_key.gc('0:0').split(':').map(_=>parseFloat(_))[0]
				V.currentTime=Math.max(trim_start,seek_already?history_ctime:0)
				if(had_play&&!seek_already)pt_key.dc()
			}
			V.ontimeupdate=()=>{
				const m=$O.$('modal-c')
				if(V.duration<250||IX.wait||!m||m.ha('hide'))return
				if(V.duration-V.currentTime>(id+'_ole_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))[1])return
				const x=$O.$('[VS]>[c]'),$=x?x.nextElementSibling:null
				$&&$.click()
			}
			const u=(id+'_ole_part_url').gc(null)
			$O.$(`[VS]>div${u?`[u='${u}']`:''}`).click()
		},{_vv:IX.vv()},'json')
	},

	part_click:me=>{ // 切换视频源
		CF()
		IX.wait=true
		const url=me.ga('u')
		log('视频源链',url)
		me.parentElement.$$(`div`).forEach(_=>_[_==me?'sa':'da']('c'))
		IX.hls.loadSource(url);
		(IX.id+'_ole_part_url').sc(url)
	},

	trim_click:_=>{ // 视频片头/尾设置
		const video=$O.$('video'),who=$O.$(_?'[VL][W]':'[VL][S]')
		const total=video.duration,now=video.currentTime
		const [trim_start,trim_end]=(IX.id+'_ole_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))
		who.innerText=who.innerText.replace(/[\d\-\:]+/,Number(_?(now-total):now).dt());
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
		CF()
		const video=$O.$('video')
		video&&(IX.id+'_ole_part_ctime').sc($O.$('[VS]>[c]').ga('u')+'$'+video.currentTime)
		IX.wait=false
		IX.id=IX.curr=null
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
		IX.observer.lazy_img=new IntersectionObserver((s,o)=>{
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
				cards.filter(_=>_.nodeName=='GRID-C').forEach(_=>IX.observer.lazy_img?.observe(_.$('img')))
			})
			last_card&&IX.observer.load_more?.observe(last_card)
		})
		IX.observer.get_nodes.observe($O.body,{subtree:true,childList:true,attributeFilter:['hide','_I']})
	},

	run:()=>{ // 启动执行
		log('进入页面，自定义样式')
		$O.$('head>style[ix]').innerHTML=`body{display:flex!important;flex-direction:column!important}`
		const render=()=>{
			log('渲染页面，构建 DOM 树')
			let o=`<tab T='category'>${['','?',...Object.keys(IX.tmap).filter(_=>_!=''&&_!='?')].map(_=>`<div V='${_}' onclick='run("IX","tab_click",WI)(this)'>${IX.tmap[_].name}</div>`).join('')}</tab>`
			o+=`<grid></grid><modal hide><mbox><modal-t><title></title>`
			o+=`<icc SC onclick='run("IX","collect_toggle",WI)(this)' style='line-height:33px'>⊕</icc>`
			o+=`<icc onclick='run("IX","dark_toggle",WI)(this)' style='line-height:33px'>⊙</icc>`
			o+=`<icc onclick='run("IX","modal_close",WI)()'>╳</icc>`
			o+=`</modal-t><modal-c></modal-c></mbox></modal>`
			$O.$$('body>*:not(#w_logs)').forEach(_=>_.remove())
			$O.body.html(o+($O.$('#w_logs')?.html(true)||''))
			log('绑定事件，节点监听')
			IX.watch()
			log('获取记忆，开始筛选')
			const {filters}='ole_filters'.gc({filters:{category:''}})
			$O.$(`tab[T='category']>div${filters.category?`[V='${filters.category}']`:''}`).click()
		}

		log('获取记忆，分类数据')
		const tmap='ole_tmap'.gc({})
		if(Object.keys(tmap).length>0){
			IX.tmap=tmap
			return render()
		}

		log('获取失败，重新拉取分类数据')
		const K=IX.key=crypto.randomUUID()
		'https://api.olelive.com/v1/pub/vod/list/type'.get(o=>{
			if(!o||K!=IX.key)return
			log('分类数据',o)
			o.data.filter(_=>_.typeId<5).forEach(_=>(IX.tmap[_.typeId]={name:_.typeName,areas:_.area,years:_.year,types:_.children.map(x=>(x.typeId+'').startsWith(_.typeId+'')?(x.typeId+':'+x.typeName):null).filter(_=>_)}))
			log('拉取成功，缓存分类数据')
			'ole_tmap'.sc(IX.tmap)
			render()
		},{_vv:IX.vv()},'json')
	},
}
