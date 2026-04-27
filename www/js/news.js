
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'news',

	// 所有监听对象
	observer:{},

	// 筛选设置
	filters:{category:'',type:''},

	// 控制参数
	tmap:{
		fsb:{name:'菲商报',types:['fgyw:本地','zgxw:国内','gjxw:国际']},
		flw:{name:'菲龙网',types:['40:本地','82:华人','157:国内','91:国际']},
		fhw:{name:'菲华网',types:['news:快讯','hots:热贴','visa:签证','travel:旅游']},
	},page:0,key:null,

	tab_click:(me,go=_=>true)=>{ // 筛选视频
		CF()
		let key,val
		const K=IX.key=crypto.randomUUID(),gbox=$O.$('grid').da('_').sa('a')
		if(me){
			IX.page=0
			IX.modal_close()
			screen.orientation.unlock()
			key=me.parentElement.ga('T');val=me.ga('V')
			IX.filters[key]=val
			log(`手动筛选，点击 ${key}: ${val}`)
			gbox.da('a').sa({_:'🥏 正在搜索，请稍等 . . .'}).html('')
			$O.$$(`tab[T${key?`='${key}'`:''}]>div`).forEach(_=>_[key&&_==me?'sa':'da']('c'))
			if(key=='category'){
				const ks=Object.keys(IX.filters).filter(_=>_!='category'),filters='news_filters'.gc({})
				ks.forEach(_=>(IX.filters[_]=IX.filters.category!=filters.category||!filters[_]?'':filters[_]))
				$O.$$(ks.map(_=>`tab[T='${_}']`).join(',')).forEach(_=>_.remove())
			}
			'news_filters'.sc(IX.filters)
			if(key=='category'){
				const X=IX.tmap[IX.filters.category]
				const tt=X.types.map(_=>{let x=_.split(':');return `<div${x[0]==IX.filters.type?' c':''} V='${x[0]}' onclick='run("IX","tab_click",WI)(this)'>${x[1]}</div>`}).join('')
				gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'type'},tt))
				if(!$O.$(`tab[T='type']>[c]`))IX.filters.type=$O.$(`tab[T='type']>div`).sa('c').ga('V')
			}
		}
		if(IX.page>0){
			gbox.da('_').sa('a')
			scrollTo(0,$O.body.scrollHeight)
		}
		if(Object.keys(IX.filters).filter(_=>IX.filters[_]!='').length<1)return true
		let page=++IX.page,U=`https://www.flw.ph/forum.php?mod=forumdisplay&fid=${IX.filters.type}&filter=lastpost&orderby=dateline&mobile=2&page=${page}`
		if(IX.filters.category=='fhw')U=`https://www.phhua.com/${IX.filters.type}/index${page>1?page:''}.html`
		else if(IX.filters.category=='fsb')U=`https://www.shangbao.com.ph/more/${IX.filters.type}${page>1?page:''}.html`
		const TS=JSON.stringify(IX.filters)
		U.get(o=>{
			if(IX.key!=K)return
			gbox.da('a').sa({_:`————  ${o===null?'🚨 请求失败，请重试':'🫧 数据为空'}！  ————`})
			if(o===null)return go(false)
			if(TS!=JSON.stringify(IX.filters))return go(true)
			if(IX.filters.category=='fsb')o=o.$$('.conlist').map(_=>{
				const a=_.$('.contt>a'),brief=_.$('.container').innerText.replace(/\n{2,}/g,'\n').replace(/^\n+|\n+$/g,'\n').trim().f2j().sb().replace(/ *\[详细\]|本报讯\:/g,'')
				return {I:a.href.replace('http://','https://'),N:a.innerText.f2j().sb(),brief,time:_.$('.conpubtime').innerText}
			})
			else if(IX.filters.category=='fhw')o=o.$$('.li_item').map(_=>{
				const I='https://www.phhua.com/'+_.$('.li_item_img>a').href.split('///').pop(),N=_.$('.li_item_title').innerText.sb().trim()
				const brief=_.$('.li_item_des').innerText.replace(/\n{2,}/g,'\n').replace(/^\n+|\n+$/g,'\n').sb().trim()
				return {I,N,brief,cover:_.$('.li_item_img img').src}
			})
			else if(IX.filters.category=='flw')o=o.$$('#threadlist>li').map(_=>{
				if(!_.ga('id'))return null
				const I=`https://www.flw.ph/forum.php?mod=viewthread&tid=${_.ga('id').split('_').pop()}&mobile=2`
				const N=_.$('.threaditem>a>h3').innerText.replace(/(\s+New$|\s*[\r\n\t]\s*)/g,'').sb().trim()
				const brief=_.$('.threaditem>a>.desc .art-title').innerText.replace(/\s*[\r\n\t]\s*/g,'').split('专讯】').pop().sb().trim()
				const time=_.$('.itemhead>.time').innerText.replace(/-/g,'/').trim()
				const cover=_.$('.threaditem>a>.content .piclist>span>b>img')?.ga('src')||null
				return {I,N,brief,time,cover}
			}).filter(Boolean)
			else o=[]
			log('列表数据',o)
			o&&gbox.append(...o.map(({I,N,brief,time,cover})=>$O.node('grid-c',{I,N,W:IX.filters.category,onclick:'run("IX","card_click",WI)(this)'},`${cover?`<img crossorigin='anonymous' src='${NCVR}' s='${cover}'/>`:''}<div><div>${N}</div><div>${brief}</div>${time?`<div>${time}</div>`:''}</div>`)))
			go(true)
		},{},'html')
	},

	card_click:me=>{ // 打开详情弹层
		CF()
		const K=IX.key=crypto.randomUUID(),N=me.ga('N'),U=me.ga('I'),W=me.ga('W')
		const mbox=$O.$('modal-c').html(`<sk pt30 f fv g12><sk f g12><sk q w20 h40></sk><sk q w10 h40></sk><sk q w33 h40></sk><sk q f1 h40></sk></sk><sk f g12><sk q w20 h40></sk><sk q f1 h40></sk></sk><sk x6 g16>${'<sk b h20></sk>'.repeat(6)}</sk><sk q r169></sk><sk f g20><sk b w40 h12></sk><sk f1></sk><sk b w h12></sk></sk><sk q r219></sk></sk>`)
		$O.body.sa('ns')
		$O.$('grid').da('a')
		$O.$('modal').da('hide').$('modal-t>title').da('s10','s12','s14').html(IX.tmap[W]?.name||'未知来源');

		U.get(_=>{
			if(IX.key!=K)return
			if(_===null)return

			let O,X,time='???',o=''
			if(W=='flw'){
				time=_.$('.time').innerText.replace(/\-/g,'/').trim()
				O=_.$('.message')
				X=O.$(':scope>font')
				if(X&&O.innerText.trim()==X.innerText.trim())O=X
				O.innerHTML=O.innerHTML.replaceAll('<div align="left">','<br><div align="left">')
			}else if(W=='fhw'){
				time=_.$('.content_date').innerText.replace(/\-/g,'/').trim()
				O=_.$('.content_content>div')
				O.$$('[data-we-empty-p]').forEach(_=>{
					_.da('style').$$('br').forEach(_=>_.remove())
					if(_.innerText.trim()=='')_.remove()
				})
			}else if(W=='fsb'){
				time=_.$('.wap_time>p:last-child').innerText.replace(/[年月日]/g,'/').trim()
				O=_.$('#fontzoom')
				O.$('#function_code_page')?.remove()
				O.innerHTML=O.innerHTML.replaceAll('</p>','</p><br>').f2j()
			}else return
			log('<pre>'+O.html(true).replace(/&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')+'<pre>')
			
			O.$$(':scope>br').forEach(_=>_.parentNode.replaceChild($O.createTextNode('[???]'),_))
			O.$$('a').forEach(_=>{
				if(_.$('img'))return _.parentNode.replaceChild(_.$('img'),_)
				const x=_.innerText.sb().trim()
				if(x=='')return _.remove()
				_.parentNode.replaceChild($O.createTextNode(x),_)
			})
			O.$$('strong,b').forEach(_=>{
				const x=_.innerText.sb().trim()
				if(x=='')return _.remove()
				_.parentNode.replaceChild($O.node('b',{},x),_)
			})
			o=O.html().split('[???]').filter(Boolean).map(_=>{
				_=_.sb().replace(/\<br\>$/g,'').trim()
				if(_==='')return null
				if(_.replace(/\<[^\>]+\>/g,'').trim()===''){
					if(_.includes('<img '))return [..._.matchAll(/<img\b[^>]*\bsrc\s*=\s*['"]?([^'"\s>]+)/gi)].map(_=>_[1]).map(_=>{
						if(!_.startsWith('http')&&W=='flw')_=`https://www.flw.ph/${_}`
						_=_.replaceAll(':////','://').replace('http:','https:')
						if(_.startsWith('https://'))return `<img crossorigin='anonymous' src='${_}'/>`
						return ''
					}).join('')
					return null
				}
				if(_.startsWith('<p')){
					_=_.replace(/^\<p[^\>]*\>(.+)(?=\<\/p\>)\<\/p\>$/g,'$1').trim()
					if(_===''||_=='<br>')return null
				}
				if(!_.startsWith('<'))return `<div p>&emsp;${_}</div>`
				if(_.startsWith('<div')){
					_=_.replace(/^\<div[^\>]*\>([^\<]+)\<\/div\>/g,'$1').trim()
					if(_===''||_=='<br>')return null
				}
				if(_.startsWith('<font')){
					_=_.replace(/^\<font[^\>]*\>([^\<]+)\<\/font\>/g,'$1').trim()
					if(_===''||_=='<br>')return null
				}
				if(_.startsWith('<a')||_.startsWith('<p')){
					_=_.replace(/^\<a[^\>]*\>([^\<]+)\<\/a\>/g,'$1').replace(/^\<p[^\>]*\>([^\<]+)\<\/p\>/g,'$1').trim()
					if(_===''||_=='<br>')return null
				}
				if(_.startsWith('<img')){
					let iu=_.split('src="').pop().split('"').shift()
					if(!iu.startsWith('http'))iu=`https://www.flw.ph/${iu}`
					iu=iu.replaceAll(':////','://').replace('http:','https:')
					return `<img crossorigin='anonymous' src='${iu}'/>`
				}
				if(_=='<br>')return null
				if(_.startsWith('<b>'))return `<div p>&emsp;${_}</div>`
				return `<div p>&emsp;${_}</div>`
			}).filter(Boolean).join('').split(/(\s|\n|&nbsp;)*延伸阅读(\s|\n|&nbsp;)*|\-\-\- END \-\-\-|了解更多请搜索/).shift().replace(/\[菲龙网专讯\]|本报讯\:/g,'').trim()
			mbox.html(`<div>${N}</div><div>发布时间:&emsp;${time}</div><br>${o}`)
		},{},'html')
	},

	modal_close:async()=>{ // 关闭详情弹层
		CF()
		$O.$('modal').sa('hide','_I').$('modal-t>title').html('')
		$O.$('modal-c').html('')
		$O.body.da('ns')
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
				cards.filter(_=>_.nodeName=='GRID-C'&&_.$('img')).forEach(_=>IX.observer.lazy_img?.observe(_.$('img')))
			})
			last_card&&IX.observer.load_more?.observe(last_card)
		})
		IX.observer.get_nodes.observe($O.body,{subtree:true,childList:true,attributeFilter:['hide','_I']})
	},

	run:()=>{ // 启动执行
		log('进入页面，自定义样式')
		$O.$('head>style[ix]').innerHTML=`
body{display:flex!important;flex-direction:column!important}

grid-c{float:unset;display:flex;width:100%;height:auto;margin-bottom:3px;background:rgba(0,0,0,.1)}
grid-c>img{display:block;width:30%;aspect-ratio:5/3;object-fit:cover;margin-right:3px}
grid-c>div{flex:1;display:flex;flex-direction:column}
grid-c>div>*:first-child{color:darkorange;font-size:13px;font-weight:700;line-height:1.2;border-top:1px solid rgba(0,0,0,.3);border-bottom:1px solid rgba(0,0,0,.1);padding:2px}
grid-c>div>*:nth-child(2){color:darkgreen;font-size:10px;padding:4px;background:rgba(0,0,0,.06);line-height:1.2}
body[dark] grid-c>div>*:nth-child(2){color:lightgreen}
grid-c>div>*:nth-child(3){color:grey;font-size:11px;padding:4px;line-height:1.1}
body[dark] grid-c>div>*:nth-child(3){color:cyan}
body[dark] grid-c>div>*:first-child{border-top:1px solid rgba(255,255,255,.3);border-bottom:1px solid rgba(255,255,255,.1)}
body[dark] grid-c{background:rgba(255,255,255,.1)}
body[dark] grid-c>div>*:nth-child(2){background:rgba(255,255,255,.1)}

modal-c{display:flex;flex-direction:column;line-height:1.3;font-size:12px;padding:10px 12px 50px 12px;min-height:calc(100vh - 40px)}
modal-c>*{display:block;line-height:1.4;font-size:16px}
modal-c>div:first-child{font-size:18px;line-height:1.2;color:darkorange!important}
modal-c>div:nth-child(2){font-size:14px;line-height:1.2;color:grey!important}
body[dark] modal-c>div:nth-child(2){color:cyan!important}
modal-c>div[c]{line-height:1.5;margin-bottom:10px;text-align:center}
modal-c>div[p]{color:black!important;font-size:15px!important;line-height:1.5!important;margin-bottom:5px}
body[dark] modal-c>div[p]{color:white!important}
modal-c>img{display:block;width:100%;margin:0 0 5px 0}
`
		log('渲染页面，构建 DOM 树')
		let o=`<tab T='category'>${Object.keys(IX.tmap).map(_=>`<div V='${_}' onclick='run("IX","tab_click",WI)(this)'>${IX.tmap[_].name}</div>`).join('')}</tab>`
		o+=`<grid></grid><modal hide><mbox><modal-t><title></title>`
		o+=`<icc onclick='run("IX","modal_close",WI)()'>╳</icc>`
		o+=`</modal-t><modal-c></modal-c></mbox></modal>`
		$O.$$('body>*:not(#w_logs)').forEach(_=>_.remove())
		$O.body.html(o+($O.$('#w_logs')?.html(true)||''))
		log('绑定事件，节点监听')
		IX.watch()
		log('获取记忆，开始筛选')
		const filters='news_filters'.gc({})
		$O.$(`tab[T='category']>div${filters.category?`[V='${filters.category}']`:''}`).click()
	},
}
