
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'img',

	// 所有监听对象
	observer:{},

	// 筛选设置
	filters:{orientation:'',size:''},search:null,

	// 控制参数
	tmap:{
		size:{name:'尺寸',_:[':全部','small:4MP','medium:12MP','large:24MP']},
		orientation:{name:'方向',_:[':全部','landscape:横向','portrait:竖向','square:正方形']},
	},page:0,id:null,curr:null,wait:true,key:null,stop:false,

	a:'qaJeh5r2ipJFU8WiaDLgoabIqpOyqDZaVB7T5cItvyzGh4ynhSpkVKDe',

	tab_click:async(me,go=_=>true)=>{ // 筛选视频
		CF()
		const K=IX.key=crypto.randomUUID(),gbox=$O.$('grid').da('_').sa('a')
		if(me){
			IX.page=0
			IX.stop=false
			if(me.nodeName=='INPUT'){
				IX.search=me.value.trim()||''
				log(`手动搜索，关键字 ${IX.search}`)
			}else{
				const key=me.parentElement.ga('T')
				const val=IX.filters[key]=me.ga('V')
				log(`手动筛选，点击 ${key}: ${val}`)
				$O.$$(`tab[T${key?`='${key}'`:''}]>div`).forEach(_=>_[key&&_==me?'sa':'da']('c'))
			}
			'img_filters'.sc({filters:IX.filters,search:IX.search})
			gbox.da('a').sa({_:'🥏 正在搜索，请稍等 . . .'}).html('')
			gbox.sa({_:IX.search?`🔍 开始搜索关键字“${IX.search}”`:`————  🚨 关键字为空，肯定冇数据啊瑟瑟！  ————`})
			if(!IX.search)return
		}else if(IX.stop)return
		if(IX.page>0){
			gbox.da('_').sa('a')
			scrollTo(0,$O.body.scrollHeight)
		}

		const page=++IX.page,TS=JSON.stringify({filters:IX.filters,search:IX.search});
		'https://api.pexels.com/v1/search'.get((o,hs)=>{
			if(IX.key!=K)return
			log('列表数据',o)
			gbox.da('a').sa({_:`————  ${o===null?'🚨 请求失败，请重试':'🫧 数据为空'}！  ————`})
			if(o===null)return go(false)
			if(TS!=JSON.stringify({filters:IX.filters,search:IX.search}))return go(true)
			if(!o.next_page||o.next_page==='')IX.stop=true
			o=o.photos.map(({id,alt,src:{large:s}})=>$O.node('grid-c',{},`<img crossorigin='anonymous' src='${ICVR}' s='${s}' ondblclick='run("IX","download",WI)(this)'/><title>${alt}</title>`))
			o&&gbox.append(...o)
			go(true)
		},{
			page,per_page:60,
			query:IX.search,locale:'zh-CN',
			size:IX.filters.size,orientation:IX.filters.orientation
		},'json',{Authorization:IX.a,Accept:'application/json','User-Agent':'Pexels/JavaScript','Content-Type':'application/json'})
	},

	download:me=>{
		let uri=(me.ga('s')||me.ga('src')||'').split('?').shift()
		if(!uri.startsWith('http'))return
		uri+='?w=1200'
		log('图片链接: '+uri)
		cordova.plugins.Downloader.download({
			uri,title:'图片下载',description:'正在下载图片文件',
			destinationInExternalPublicDir:{
				dirType:'Download',subPath:uri.split('-').pop().trim()
			}
		},p=>log('下载完成，保存路径：'+p,'success'),e=>log('下载失败：',e,'error'))
	},

	watch:()=>{ // 监听节点
		IX.observer.load_more=new IntersectionObserver((s,o)=>{
			let card=null
			s.forEach(e=>(e.target.nodeName=='GRID-C')&&(e.intersectionRatio>=0.7)&&(card=e.target))
			if(!card||card.ha('wait'))return
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
		$O.$('head>style[ix]').innerHTML=`
body{display:flex!important;flex-direction:column!important}
body>input{background:rgba(0,0,0,.1);color:black;display:block;margin:26px 0 5px 0;outline:0;border:1px solid rgba(255,255,255,.2);border-radius:20px;line-height:38px;padding:0 12px}
body[dark]>input{background:rgba(255,255,255,.1);color:white}
grid-c{float:left;display:block;width:calc(100vw - 20px);height:auto}
`
		log('渲染页面，构建 DOM 树')
		$O.$$('body>*:not(#w_logs)').forEach(_=>_.remove())
		$O.body.html(`<input id='search' type='search' placeholder='请输入查询关键字' onsearch='run("IX","tab_click",WI)(this)'/><grid></grid>`+($O.$('#w_logs')?.html(true)||''))
		for(let k in IX.tmap){
			const tab=`<div>${IX.tmap[k].name}</div>`+IX.tmap[k]._.map(_=>{
				let x=_.split(':');return `<div${x[0]==IX.filters[k]?' c':''} V='${x[0]}' onclick='run("IX","tab_click",WI)(this)'>${x[1]}</div>`
			}).join('')
			$O.$('grid').insertAdjacentElement('beforebegin',$O.node('tab',{T:k},tab))
		}
		log('绑定事件，节点监听')
		IX.watch()
		log('获取记忆，开始筛选')
		const {filters}='img_filters'.gc({filters:{orientation:''}})
		$O.$(`tab[T]>div${filters.orientation?`[V='${filters.orientation}']`:''}`).click()
	},
}
