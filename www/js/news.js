
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'news',

	// 所有监听对象
	observer:{},

	// 卡片默认封面
	cover:`data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0MTkuNTI4IDU5NS4yNzYiPg0KPHJlY3QgeD0iLTkuOTM2IiB5PSItOS43NjYiIHN0eWxlPSJmaWxsOiM3NzciIHdpZHRoPSI0MzkuMTQ5IiBoZWlnaHQ9IjYxMy43ODciLz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSI0Mi4zNzUiIHk9IjgwLjEzNCIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjIwNS4yNzciIGhlaWdodD0iMTguMzgzIi8+DQoJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNDIuMzc1NSA5Mi4yMDQpIiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLUxpZ2h0Jztmb250LXNpemU6MTdweCI+WU9VIEFSRSBJTlZJVEVEIFRPPC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iNDIuMzc1IiB5PSIxMTIuNTE3IiBzdHlsZT0iZmlsbDpub25lIiB3aWR0aD0iMzE3LjA1IiBoZWlnaHQ9IjExMS44MyIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDQyLjM3NTUgMTUwLjg1NjMpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjU0cHgiPlRIRSBHUkFORCA8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSI1MCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjU0cHgiPk9QRU5JTkc8L3RzcGFuPjwvdGV4dD4NCgk8L2c+DQoJPGc+DQoJCTxyZWN0IHg9IjQwLjM4NCIgeT0iNDQwLjExMyIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjEyNy4xMTciIGhlaWdodD0iMTIyLjA2NCIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDQwLjM4MzggNTA0LjcwODQpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6I0ZGRkZGRjtmb250LWZhbWlseTonQXplcmV0TW9uby1CbGFjayc7Zm9udC1zaXplOjkwLjk4MThweCI+MDI8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSI1NC41ODkiIHN0eWxlPSJmaWxsOiNGRkZGRkY7Zm9udC1mYW1pbHk6J0F6ZXJldE1vbm8tQmxhY2snO2ZvbnQtc2l6ZTo2MS40MTI3cHgiPlNFUDwvdHNwYW4+PC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjAxLjYxNyIgeT0iNDQxLjY2NiIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjE4MC4xMDYiIGhlaWdodD0iODYuMDQzIi8+DQoJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMjAxLjYxNzQgNDUwLjE4NjEpIj48dHNwYW4geD0iMCIgeT0iMCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPkpvaW4gdXMgZm9yIGV4Y2x1c2l2ZSBzdXJwcmlzZXMsIDwvdHNwYW4+PHRzcGFuIHg9IjAiIHk9IjE5IiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLVNlbWlCb2xkJztmb250LXNpemU6MTJweCI+YWN0aXZpdGllcywgYW5kIHJlZnJlc2htZW50czwvdHNwYW4+PHRzcGFuIHg9IjEzNy4wMzUiIHk9IjE5IiBzdHlsZT0iZmlsbDojMzYzNjM0O2ZvbnQtZmFtaWx5OidBemVyZXRNb25vLUxpZ2h0Jztmb250LXNpemU6MTJweCI+4oCUZG9u4oCZdCA8L3RzcGFuPjx0c3BhbiB4PSIwIiB5PSIzOCIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPm1pc3Mgb3V0ITwvdHNwYW4+PC90ZXh0Pg0KCTwvZz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjAxLjYxNyIgeT0iNTUyLjM5NyIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9IjE2NS41NTMiIGhlaWdodD0iOS42NSIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIwMS42MTczIDU2MC45MTY5KSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPk9uZSBTdC4gOSBMQSAsQ0EgMTIzNDwvdGV4dD4NCgk8L2c+DQoJPGc+DQoJCTxyZWN0IHg9IjIwMS42MTciIHk9IjUzNC40MTgiIHN0eWxlPSJmaWxsOm5vbmUiIHdpZHRoPSIxNTkuNDI2IiBoZWlnaHQ9IjExLjg0NCIvPg0KCQk8dGV4dCB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDIwMS42MTczIDU0Mi45MzgyKSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPnd3dy55b3Vyd2Vic2l0ZS5jb208L3RleHQ+DQoJPC9nPg0KCTxwb2x5bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMzYzNjM0O3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwIiBwb2ludHM9IjQ0LjcwMiw0MDMuMjI1IDQ0LjcwMiwyNTQuNDUzIA0KCQkxOTAuNTMsNDA0Ljg0MyAxOTIuNzczLDI1NC40NTMgMzc3LjEyOCw0MjAuNDc0IDM3Ny4xMjgsODEuMTU1IAkiLz4NCgk8Zz4NCgkJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMjQ3MSAtMC45NjkgMC45NjkgMC4yNDcxIC0zNS44MDc1IDUyMi45NTEpIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBjeD0iMzE4LjYwNiIgY3k9IjI4NC41MTciIHJ4PSIzMi41NTMiIHJ5PSIzOS44MyIvPg0KCQkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMC45Njk5IDAuMjQzMyAtMC4yNDMzIDAuOTY5OSAyOTYuOTM3MSAyNzQuMDEzKSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1SZWd1bGFyJztmb250LXNpemU6MTNweCI+MDI6MDBQTTwvdGV4dD4NCgkJCTx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDAuOTY5OSAwLjI0MzMgLTAuMjQzMyAwLjk2OTkgMjkyLjg5MSAyODkuNTg4OCkiIHN0eWxlPSJmaWxsOiMzNjM2MzQ7Zm9udC1mYW1pbHk6J0F6ZXJldE1vbm8tUmVndWxhcic7Zm9udC1zaXplOjEzcHgiPjA1OjAwUE08L3RleHQ+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMzYzNjM0O3N0cm9rZS1taXRlcmxpbWl0OjEwIiBkPSJNMjU4LjYwMyw1NC4xNDJoLTk3LjY3OGMtNS44MTEsMC0xMC41MjEtNC43MTEtMTAuNTIxLTEwLjUyMQ0KCQkJbDAsMGMwLTUuODExLDQuNzExLTEwLjUyMSwxMC41MjEtMTAuNTIxaDk3LjY3OGM1LjgxMSwwLDEwLjUyMiw0LjcxMSwxMC41MjIsMTAuNTIxbDAsMA0KCQkJQzI2OS4xMjQsNDkuNDMxLDI2NC40MTQsNTQuMTQyLDI1OC42MDMsNTQuMTQyeiIvPg0KCQk8Zz4NCgkJCTxyZWN0IHg9IjE2MS4wNzgiIHk9IjM5LjQzMiIgc3R5bGU9ImZpbGw6bm9uZSIgd2lkdGg9Ijk3LjM3MiIgaGVpZ2h0PSI5LjE5MSIvPg0KCQkJPHRleHQgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAxNzYuNzIyMSA0Ny45NTE5KSIgc3R5bGU9ImZpbGw6IzM2MzYzNDtmb250LWZhbWlseTonQXplcmV0TW9uby1MaWdodCc7Zm9udC1zaXplOjEycHgiPlZJQ1RPUiAmYW1wO1ZJQzwvdGV4dD4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K`,

	// 筛选设置
	filters:{category:'',type:''},

	// 控制参数
	tmap:{
		fsb:{name:'菲商报',types:['fgyw:本地','zgxw:国内','gjxw:国际']},
		flw:{name:'菲龙网',types:['40:本地','82:华人','157:国内','91:国际']},
		fhw:{name:'菲华网',types:['news:快讯','hots:热贴','visa:签证','travel:旅游']},
	},page:0,key:null,

	// 节点监听器
	load_more:null,img_lazy:null,get_nodes:null,

	tab_click:(me,go=_=>true)=>{ // 筛选视频
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
				const a=_.$('.contt>a'),brief=_.$('.container').innerText.replace(/\n{2,}/g,'\n').replace(/^\n+|\n+$/g,'\n').trim()
				return {I:a.href,N:a.innerText,brief,time:_.$('.conpubtime').innerText}
			})
			else if(IX.filters.category=='fhw')o=o.$$('.li_item').map(_=>{
				const I='https://www.phhua.com/'+_.$('.li_item_img>a').href.split('///').pop(),N=_.$('.li_item_title').innerText.trim()
				const brief=_.$('.li_item_des').innerText.replace(/\n{2,}/g,'\n').replace(/^\n+|\n+$/g,'\n').trim()
				return {I,N,brief,cover:_.$('.li_item_img img').src}
			})
			else if(IX.filters.category=='flw')o=o.$$('#threadlist>li').map(_=>{
				if(!_.ga('id'))return null
				const I=`https://www.flw.ph/forum.php?mod=viewthread&tid=${_.ga('id').split('_').pop()}&mobile=2`
				const N=_.$('.threaditem>a>h3').innerText.replace(/(\s+New$|\s*[\r\n\t]\s*)/g,'').trim()
				const brief=_.$('.threaditem>a>.desc .art-title').innerText.replace(/\s*[\r\n\t]\s*/g,'').split('专讯】').pop().trim()
				const time=_.$('.itemhead>.time').innerText.replace(/-/g,'/').trim()
				const cover=_.$('.threaditem>a>.content .piclist>span>b>img')?.ga('src')||null
				return {I,N,brief,time,cover}
			}).filter(Boolean)
			else o=[]
			log('列表数据',o)

			o&&gbox.append(...o.map(({I,N,brief,time,cover})=>$O.node('grid-c',{I,N,W:IX.filters.category,onclick:'run("IX","card_click",WI)(this)'},`${cover?`<img src='${IX.cover}' s='${cover}'/>`:''}<div><div>${N}</div><div>${brief}</div>${time?`<div>${time}</div>`:''}</div>`)))
			go(true)
		},{},'html')
	},

	card_click:me=>{ // 打开详情弹层
		const K=IX.key=crypto.randomUUID(),N=me.ga('N'),U=me.ga('I'),W=me.ga('W')
		const mbox=$O.$('modal-c').html(`<sk pt30 f fv g12><sk f g12><sk q w20 h40></sk><sk q w10 h40></sk><sk q w33 h40></sk><sk q f1 h40></sk></sk><sk f g12><sk q w20 h40></sk><sk q f1 h40></sk></sk><sk x6 g16>${'<sk b h20></sk>'.repeat(6)}</sk><sk q r169></sk><sk f g20><sk b w40 h12></sk><sk f1></sk><sk b w h12></sk></sk><sk q r219></sk></sk>`)
		$O.body.sa('ns')
		$O.$('grid').da('a')
		$O.$('modal').da('hide').$('modal-t>title').da('s10','s12','s14').html(IX.tmap[W]?.name||'未知来源');

		U.get(_=>{
			if(IX.key!=K)return
			if(_===null)return

			log('<pre>'+_.$('body').html(true).replace(/&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')+'<pre>')
			let time='???',o=''
			if(W=='flw'){
				const O=_.$('.message');
				time=_.$('.time').innerText.replace(/\-/g,'/').trim();
				O.$$('a>img,div,font,strong').forEach(_=>{
					if(_.tagName=='IMG'){
						const x=$O.node('img',{src:_.src.startsWith('http')?_.src:`https://www.flw.ph/${_.src}`})
						_.parentNode.parentNode.replaceChild(x,_.parentNode)
						_=x
					}
					if(_.nextElementSibling&&_.nextElementSibling.tagName=='BR')_.nextElementSibling.remove()
					if(_.previousElementSibling&&_.previousElementSibling.tagName=='BR')_.previousElementSibling.remove()
					if(_.tagName=='FONT'&&!_.innerText.trim())_.remove()
				});
				o=O.html().replace(/((\s|\n|&nbsp;)*<br\/?>|(<br\/?>){2,})/g,'<br/>').replace(/(<br\/?>){2,}/g,'<br/>&emsp;&emsp;').split(/<br\/?>(\s|\n|&nbsp;)*延伸阅读(\s|\n|&nbsp;)*<br\/?>/).shift().replaceAll('【菲龙网专讯】','').trim()
				log('<pre>'+o.replace(/&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')+'<pre>')
			
			}else if(W=='fhw'){
				const O=_.$('.content_content>div');
				time=_.$('.content_date').innerText.replace(/\-/g,'/').trim();
				O.$$('p').forEach(_=>{
					if(_.innerText.trim()==''&&!_.$('img'))return
					const img=_.$('img'),x=$O.node('img',{src:img.src})
					_.parentNode.replaceChild(x,_)
				})
				o=O.html().split('--- END ---').shift().replace(/\< *\/? *br *\>|\< *br *\/? *\>/g,'<br>').replace(/^[\s\t\n\r]*\<br\>[\s\t\n\r]*|[\s\t\n\r]*\<br\>[\s\t\n\r]*$|[\s\t]*[\n\r][\s\t]*/g,'').replace(/(\<img src\=[^\>]+\>)([\r\n\d\t]*\<br\>[\r\n\d\t]*)*([^\<]+)(?=\<br\>)(\<br\>)+/g,'$1<div center>$3</div><br>').replace(/\<br\>/g,'<br>&emsp;&emsp;').trim()
			}else if(W=='fsb'){
				
			}else return
			mbox.html(`<div>${N}</div><div>发布时间:&emsp;${time}</div><br>${o}`)
		},{},'html')
	},

	modal_close:async()=>{ // 关闭详情弹层
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
grid-c>div>*:nth-child(2){color:lightgreen;font-size:10px;padding:4px;background:rgba(0,0,0,.06);line-height:1.2}
grid-c>div>*:nth-child(3){color:cyan;font-size:11px;padding:4px;line-height:1.1}
body[dark] grid-c>div>*:first-child{border-top:1px solid rgba(255,255,255,.3);border-bottom:1px solid rgba(255,255,255,.1)}
body[dark] grid-c{background:rgba(255,255,255,.1)}
body[dark] grid-c>div>*:nth-child(2){background:rgba(255,255,255,.1)}

modal-c{display:flex;flex-direction:column;line-height:1.3;font-size:12px;padding:10px 12px 50px 12px;min-height:calc(100vh - 40px)}
modal-c>*{display:block;line-height:1.3;font-size:12px}
modal-c>div:first-child{font-size:18px;line-height:1.2;color:darkorange!important}
modal-c>div:nth-child(2){font-size:14px;line-height:1.2;color:cyan!important}
modal-c>div[center]{line-height:1.5;margin-bottom:10px;text-align:center}
modal-c img{display:block;width:100%;margin:0}
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
