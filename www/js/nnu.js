
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'nnu',

	// 所有监听对象
	observer:{},
	O:cordova.plugin.sorient,

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
			IX.O.unlock()
			key=me.parentElement.ga('T');val=me.ga('V')
			log(`手动筛选，点击 ${key}: ${val}`)
			gbox.da('a').sa({_:key=='category'&&val=='?'?'💡 请输入关键字 . . ':'🥏 正在搜索，请稍等 . . .'}).html('')
			if(key=='category'&&val=='?'){
				IX.search_val=prompt('搜索关键字:')||''
				IX.search_key='q'
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
				const ks=Object.keys(IX.filters).filter(_=>_!='category'),{filters}='nnu_filters'.gc({filters:{}})
				ks.forEach(_=>(IX.filters[_]=IX.filters.category!=filters.category||!filters[_]?'':filters[_]))
				$O.$$(ks.map(_=>`tab[T='${_}']`).join(',')).forEach(_=>_.remove())
			}
			'nnu_filters'.sc({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
			if(key=='category'){
				if(IX.filters.category==''){
					log(`获取收藏`)
					gbox.da('_')
					const videos='nnu_favorite_videos'.gc({})
					gbox.append(...Object.keys(videos).map(_=>$O.node('grid-c',{I:_,N:videos[_].N,onclick:'run("IX","card_click",WI)(this)'},`<img crossorigin='anonymous' src='${VCVR}' s='${videos[_].C}'/><score>${videos[_].S}</score><title>${videos[_].N}</title>`)))
					return
				}
				if(IX.filters.category!='?'){
					const X=IX.tmap[IX.filters.category]
					const tt=`<div${''==IX.filters.type?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.types.map(_=>{
						let x=_.split(':');return `<div${x[0]==IX.filters.type?' c':''} V='${x[0]}' onclick='run("IX","tab_click",WI)(this)'>${x[1]}</div>`
					}).join('')
					const ta=`<div${''==IX.filters.area?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.areas.map(_=>{
						let x=_.split(':');return `<div${x[0]==IX.filters.area?' c':''} V='${x[0]}' onclick='run("IX","tab_click",WI)(this)'>${x[1]}</div>`
					}).join('')
					const ty=`<div${''==IX.filters.year?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.years.map(_=>{
						let x=_.split(':');return `<div${x[0]==IX.filters.year?' c':''} V='${x[0]}' onclick='run("IX","tab_click",WI)(this)'>${x[1]}</div>`
					}).join('')
					const ts=[{k:'',v:'按时间排序'},{k:'click',v:'按人气排序'},{k:'rating',v:'按评分排序'}].map(_=>`<div${_.k==(IX.filters.sort||'update')?' c':''} V='${_.k}' onclick='run("IX","tab_click",WI)(this)'>${_.v}</div>`).join('')
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
		let S=IX.search_key,page=++IX.page,U=`https://nnyy.in/${IX.filters.category}/?year=${IX.filters.year}&country=${IX.filters.area}&genre=${IX.filters.type}&ob=${IX.filters.sort}&page=${page}`
		if(S)U=`https://nnyy.in/so?${IX.search_key}=${encodeURIComponent(IX.search_val)}&page=${page}`
		const TS=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
		U.get(o=>{
			if(IX.key!=K)return
			log('列表数据',o)
			gbox.da('a').sa({_:`————  ${o===null?'🚨 请求失败，请重试':'🫧 数据为空'}！  ————`})
			if(o===null)return go(false)
			if(TS!=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val}))return go(true)
			o=o.$$('.lists-content li').map(_=>{
				const x=_.$('img'),n=x.alt,cover=x.ga('data-src')||x.ga('src'),I=_.$('a').ga('href').replace(/^\/|\.[a-z]+$/g,'').replace(/\//g,'.'),score=_.querySelector('.rate').innerText.trim()
				if(S&&I in IX.sm)return null
				if(S)IX.sm[I]=1
				let N=n.replace(/\s*[】]\s*/g,'').replace(/(\s*[【】:：·。～]\s*|\-+|—+)/g,'.').replace(/，/g,',').replace(/！/g,'!').replace(/\s\s/g,' ').replace(/\.{2,}/g,'.').trim().replace(/\s/g,'.').replace(/(\s*\.+$|\.?(剧场|真人)版)/g,'')
				return IX.name_reg.test(N)?null:$O.node('grid-c',{I,N,onclick:'run("IX","card_click",WI)(this)'},`<img crossorigin='anonymous' src='${VCVR}' s='https://nnyy.in${cover}'/><score>${score}</score><title>${N}</title>`)
			}).filter(Boolean)
			o&&gbox.append(...o)
			go(true)
		},{},'html')
	},

	fold_toggle:me=>{ // 视频源展开/折叠
		const x=me.html()=='💦'
		me.innerText=x?'🌀':'💦'
		$O.$('modal-c [VS]')[x?'sa':'da']('x')
	},

	card_click:me=>{ // 打开详情弹层
		CF()
		const K=IX.key=crypto.randomUUID()
		const id=IX.id=me.ga('I'),videos='nnu_favorite_videos'.gc({}),mbox=$O.$('modal-c').html(`<sk pt30 f fv g12><sk f g12><sk q w20 h40></sk><sk q w10 h40></sk><sk q w33 h40></sk><sk q f1 h40></sk></sk><sk f g12><sk q w20 h40></sk><sk q f1 h40></sk></sk><sk x6 g16>${'<sk b h20></sk>'.repeat(6)}</sk><sk q r169></sk><sk f g20><sk b w40 h12></sk><sk f1></sk><sk b w h12></sk></sk><sk q r219></sk></sk>`)
		IX.curr={N:me.ga('N'),C:me.$('img').ga('s'),S:me.$('score').innerText}
		$O.$('modal-t [SC]').innerText=id in videos?'♡':'⊕'
		$O.body.sa('ns')
		$O.$('grid').da('a')
		$O.$('modal').da('hide').$('modal-t>title').da('s10','s12','s14').html(IX.curr.N.length>14?(IX.curr.N.substring(0,14)+'\n'+IX.curr.N.substring(14)):IX.curr.N)
		if(IX.curr.N.length>14)$O.$('modal-t>title').sa('s14')
		else if(IX.curr.N.length>12)$O.$('modal-t>title').sa('s12')
		else if(IX.curr.N.length>10)$O.$('modal-t>title').sa('s10');

		`https://nnyy.in/${id.replace(/\./g,'/')}.html`.get(async _=>{
			if(IX.key!=K||_===null)return

			const o=[],x={director:[],actor:[],year:_.$('.product-title span')?.innerText?.replace(/\D/g,'')||'未知'}
			_.$$('.product-excerpt').forEach(_=>{
				let [k,v]=_.innerText.split('：')
				if(k.includes('地区'))x.area=v.trim()
				else if(k.includes('简介'))x.brief=v.trim()
				else if(k.includes('导演'))x.director=v.trim().split(' ').filter(Boolean)
				else if(k.includes('主演'))x.actor=v.trim().split(' ').filter(Boolean)
			})
			const urls=_.$$('#eps-ul li').reverse().map(_=>({ep:_.ga('ep_slug'),title:_.$('a').innerText.trim()}))
			const [trim_start,trim_end]=(id+'_nnu_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))
			o.push(`<div><div><b>地区:</b>&emsp;<em>${x.area}</em>&emsp;&emsp;&emsp;<b>年份:</b>&emsp;<em>${x.year}</em></div></div>`)
			o.push(`<div T='director'${x.director.length>0?'':' hide'}><div b>导演: </div>${x.director.map(_=>`<div V='${_.trim()}' onclick='run("IX","tab_click",WI)(this)'><em>${_.trim()}</em></div>`).join('')}</div>`)
			o.push(`<div T='actor'${x.actor.length>0?'':' hide'}><div b>主演: </div>${x.actor.map(_=>`<div V='${_.trim()}' onclick='run("IX","tab_click",WI)(this)'><em>${_.trim()}</em></div>`).join('')}</div>`)
			o.push(`${urls.length>14?`<div tg><div onclick='run("IX","fold_toggle",WI)(this)'>🌀</div></div>`:''}<div VS${urls.length>14?' x':''}>${urls.map((_,i)=>`<div ep='${_.ep}' onclick='run("IX","part_click",WI)(this)'>${_.title}</div>`).join('')}</div>`)
			o.push(`<div SS></div>`)
			o.push(`<video preload autoplay crossorigin='anonymous' controls poster='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" style="background:%23${$O.body.ha('dark')?'001':'eff'}"%3E%3C/svg%3E'></video>`)
			o.push(`<div VL><div VL S onclick='run("IX","trim_click",WI)(false)'>╟ ${Number(trim_start).dt()}</div><div VL W onclick='run("IX","trim_click",WI)(true)'>${Number(-trim_end).dt()} ╢</div></div>`)
			o.push(`<div BF>${x.brief}</div>`)
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
				const pt_key=id+'_nnu_part_ctime',had_play=pt_key.hc()
				const play_history=had_play?pt_key.gc().split('$'):['','0']
				const history_ctime=parseFloat(play_history.pop())
				const seek_already=$O.$('[VS]>[c]').ga('u')==play_history.pop()
				const tc_key=id+'_nnu_trim_config',trim_start=tc_key.gc('0:0').split(':').map(_=>parseFloat(_))[0]
				V.currentTime=Math.max(trim_start,seek_already?history_ctime:0)
				if(had_play&&!seek_already)pt_key.dc()
			}
			V.ontimeupdate=()=>{
				const m=$O.$('modal-c')
				if(V.duration<250||IX.wait||!m||m.ha('hide'))return
				if(V.duration-V.currentTime>(id+'_nnu_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))[1])return
				const x=$O.$('[VS]>[c]'),$=x?x.nextElementSibling:null
				$&&$.click()
			}
			const ep=(id+'_nnu_part_ep').gc(null)
			$O.$(`[VS]>div${ep?`[ep='${ep}']`:''}`).click()
		},{},'html')
	},

	part_click:me=>{ // 切换视频源
		CF()
		IX.wait=true
		$O.$('[SS]').html('')
		const K=IX.key=crypto.randomUUID(),ep=me.ga('ep');
		(IX.id+'_nnu_part_ep').sc(ep);
		me.parentElement.$$(`div`).forEach(_=>_[_==me?'sa':'da']('c'));
		`https://nnyy.in/_gp/${IX.id.split('.').pop()}/${ep}`.get(o=>{
			log('视频源链',o)
			if(IX.key!=K||!o||!o.video_plays||o.video_plays.length<1)return
			o=o.video_plays.map(({src_site,play_data})=>`<div st='${src_site}' url='${play_data}' onclick='run("IX","source_click",WI)(this)'>${src_site}</div>`)
			$O.$('[SS]').html(o.join(''))
			const st=(IX.id+'_nnu_part_source').gc(null),x=$O.$(`[SS]>div${st?`[st='${st}']`:''}`);
			(x||$O.$(`[SS]>div`)).click()
		},{},'json')
	},

	source_click:me=>{
		CF()
		IX.wait=true
		const url=me.ga('url'),st=me.ga('st')
		me.parentElement.$$(`div`).forEach(_=>_[_==me?'sa':'da']('c'));
		IX.hls.loadSource(url);
		(IX.id+'_nnu_part_source').sc(st)
	},

	trim_click:_=>{ // 视频片头/尾设置
		const video=$O.$('video'),who=$O.$(_?'[VL][W]':'[VL][S]')
		const total=video.duration,now=video.currentTime
		const [trim_start,trim_end]=(IX.id+'_nnu_trim_config').gc('0:0').split(':').map(_=>parseFloat(_))
		who.innerText=who.innerText.replace(/[\d\-\:]+/,Number(_?(now-total):now).dt());
		(IX.id+'_nnu_trim_config').sc(_?`${trim_start}:${total-now}`:`${now}:${trim_end}`)
	},

	collect_toggle:me=>{ // 视频收藏切换
		const uncollected=me.innerText=='⊕',videos='nnu_favorite_videos'.gc({})
		me.innerText=uncollected?'♡':'⊕'
		if(uncollected)videos[IX.id]=IX.curr
		else if(IX.id in videos){
			delete videos[IX.id]
			if(IX.filters.category=='')$O.$(`grid-c[I='${IX.id}']`).remove()
		}
		'nnu_favorite_videos'.sc(videos)
	},

	modal_close:async()=>{ // 关闭详情弹层
		CF()
		const video=$O.$('video')
		video&&(IX.id+'_nnu_part_ctime').sc($O.$('[VS]>[c]').ga('u')+'$'+video.currentTime)
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
			const {filters}='nnu_filters'.gc({filters:{category:''}})
			$O.$(`tab[T='category']>div${filters.category?`[V='${filters.category}']`:''}`).click()
		}

		log('获取记忆，分类数据')
		const tmap='nnu_tmap'.gc({})
		if(Object.keys(tmap).length>0){
			IX.tmap=tmap
			return render()
		}

		log('获取失败，重新拉取分类数据')
		const K=IX.key=crypto.randomUUID(),S=['dianying','dianshiju','zongyi','dongman']
		const cm={dianying:'电影',dianshiju:'电视剧',zongyi:'综艺',dongman:'动漫'}
		const fm={'分类:':'types','地区:':'areas','年代:':'years'}
		const todo=()=>{
			if(S.length<1){
				log('拉取成功，缓存分类数据')
				'nnu_tmap'.sc(IX.tmap)
				render()
				return
			}
			const c=S.shift();
			`https://nnyy.in/${c}`.get(o=>{
				if(!o||K!=IX.key)return
				IX.tmap[c]={name:cm[c],areas:[],years:[],types:[]}
				o.$$('.lists-filter .filter dl').forEach(_=>{
					const f=fm[_.$('dt').innerText.trim()]
					if(!f)return
					IX.tmap[c][f]=_.$$('dd a').map(_=>(_.href.includes('?')?(_.href.split('=').pop()+':'+_.innerText):null)).filter(Boolean)
				})
				log('分类数据',IX.tmap[c])
				todo()
			},{},'html')
		}
		todo()
	},
}
