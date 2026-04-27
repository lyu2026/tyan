
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'kxwk',

	// 所有监听对象
	observer:{},

	// 筛选设置
	filters:{category:'',xueke:'',type:'',year:'',sort:''},search_key:null,search_val:null,

	// 控制参数
	tmap:{
		'':{name:'收藏夹',xueks:[],types:[],years:[]},
		'?':{name:'搜索',xueks:[],types:[],years:[]},
	},sm:{},page:0,id:null,curr:null,ready:false,key:null,stop:false,

	// Foxit 阅读器模板
	tpl:`<webpdf><div class='fv__ui-body'><viewer @touch-to-scroll></viewer><page-nav-button></page-nav-button></div><template name='template-container'><bookmark-v2:bookmark-contextmenu @lazy></bookmark-v2:bookmark-contextmenu></template></webpdf>`,

	tab_click:(me,go=_=>true)=>{ // 筛选视频
		CF()
		if(!me&&IX.stop)return
		let key,val
		const K=IX.key=crypto.randomUUID(),gbox=$O.$('grid').da('_').sa('a')
		if(me){
			IX.sm={}
			IX.page=0
			IX.stop=false
			IX.modal_close()
			screen.orientation.unlock()
			key=me.parentElement.ga('T');val=me.ga('V')
			log(`手动筛选，点击 ${key}: ${val}`)
			gbox.da('a').sa({_:key=='category'&&val=='?'?'💡 请输入关键字 . . ':'🥏 正在搜索，请稍等 . . .'}).html('')
			if(key=='category'&&val=='?'){
				IX.search_val=prompt('搜索关键字:')||''
				IX.search_key='showQueryModel.nameIsbnAuthor'
				IX.filters.category='?'
				log(`手动搜索，关键词 ${IX.search_val}`)
				gbox.sa({_:IX.search_val?`🔍 开始搜索关键字“${IX.search_val}”`:`————  🚨 关键字为空，肯定冇数据啊瑟瑟！  ————`})
			}else{
				IX.search_key=IX.search_val=null
				IX.filters[key]=val
			}
			$O.$$(`tab[T${key?`='${key}'`:''}]>div`).forEach(_=>_[key&&_==me?'sa':'da']('c'))
			if(key=='category'){
				const ks=Object.keys(IX.filters).filter(_=>_!='category'),{filters}='kxwk_filters'.gc({filters:{}})
				ks.forEach(_=>(IX.filters[_]=IX.filters.category!=filters.category||!filters[_]?'':filters[_]))
				$O.$$(ks.map(_=>`tab[T='${_}']`).join(',')).forEach(_=>_.remove())
			}
			'kxwk_filters'.sc({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
			if(key=='category'){
				if(IX.filters.category==''){
					log(`获取收藏`)
					gbox.da('_')
					const books='kxwk_favorite_books'.gc({})
					gbox.append(...Object.keys(books).map(_=>$O.node('grid-c',{I:_,N:books[_].N,onclick:'run("IX","card_click",WI)(this)'},`<img crossorigin='anonymous' src='${VCVR}' s='${books[_].C}'/><title>${books[_].N}</title>`)))
					return
				}
				if(IX.filters.category!='?'){
					const X=IX.tmap[IX.filters.category]
					const tx=`<div${''==IX.filters.xueke?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.xueks.map(_=>{
						let x=_.split(':');return `<div${x[0]==IX.filters.xueke?' c':''} V='${x[0]}' onclick='run("IX","tab_click",WI)(this)'>${x[1]}</div>`
					}).join('')
					const tt=`<div${''==IX.filters.type?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.types.map(_=>{
						return `<div${_==IX.filters.type?' c':''} V='${_}' onclick='run("IX","tab_click",WI)(this)'>${_}</div>`
					}).join('')
					const ty=`<div${''==IX.filters.year?' c':''} V='' onclick='run("IX","tab_click",WI)(this)'>全部</div>`+X.years.map(_=>{
						return `<div${_==IX.filters.year?' c':''} V='${_}' onclick='run("IX","tab_click",WI)(this)'>${_}</div>`
					}).join('')
					const ts=[
						{k:'-1',v:'默认排序'},{k:'booksimple.publishDate+desc',v:'出版日期降序'},
						{k:'booksimple.publishDate',v:'出版日期升序'},
						{k:'booksimple.name',v:'图书名称'},{k:'booksimple.author',v:'作者'}
					].map(_=>`<div${_.k==(IX.filters.sort||'-1')?' c':''} V='${_.k}' onclick='run("IX","tab_click",WI)(this)'>${_.v}</div>`).join('')
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'xueke'},tx))
					gbox.insertAdjacentElement('beforebegin',$O.node('tab',{T:'type'},tt))
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
		if(IX.search_key&&!IX.search_val||IX.stop)return
		if(IX.page>0){
			gbox.da('_').sa('a')
			scrollTo(0,$O.body.scrollHeight)
		}

		if(Object.keys(IX.filters).filter(_=>IX.filters[_]!='').length<1&&!IX.search_key)return true
		let S=IX.search_key,page=++IX.page
		let U=`https://book.sciencereading.cn/shop/book/Booksimple/list.do?pageSplit.nowPageNumber=${page}&pageSplit.showRow=30&showQueryModel.dp1Value=${IX.filters.category}`
		if(IX.filters.xueke!=='')U+=`&book_xueke=on&showQueryModel.dp3Value=%27${IX.filters.xueke}%27`
		if(IX.filters.type!=='')U+=`&book_type=on&showQueryModel.bookType=%27${encodeURIComponent(IX.filters.type)}%27`
		if(IX.filters.year!=='')U+=`&book_publishYear=on&showQueryModel.publishYear=%27${IX.filters.year}%27`
		if(IX.filters.sort!=='')U+=`&showQueryModel.bookOrderColumn=${IX.filters.sort}`
		if(S)U+=`&${IX.search_key}=${encodeURIComponent(IX.search_val)}`
		const TS=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val})
		U.get(o=>{
			if(IX.key!=K)return
			gbox.da('a').sa({_:`————  ${o===null?'🚨 请求失败，请重试':'🫧 数据为空'}！  ————`})
			if(o===null)return go(false)
			if(TS!=JSON.stringify({filters:IX.filters,search_key:IX.search_key,search_val:IX.search_val}))return go(true)
			o=o.$$('.book_content').map(_=>{
				const n=_.$('.kc_title').innerText.trim(),cover=_.$('img').ga('src'),I=_.$(`[name='recommend_selected']`).value
				if(S&&I in IX.sm)return null
				if(S)IX.sm[I]=1
				let N=n
					.replace(/\s*[\(（]?\s*([上下]|练习)册?[\)）]?\s*/g,'.$1')
					.replace(/\s*[\(（]\s*([英法德])[文语版]+[\)）]\s*/,'.$1')
					.replace(/\s*[\(（]?\s*[^理文农\.\(（\s]*([理文农])[^理文农\)）\s]*类\s*[\)）]?\s*/,'.$1')
					.replace(/\s*[\(（]?\s*第?([一二三四五六七八九十]|加强)版?[\)）]?\s*/,'.$1')
					.replace(/\.一/g,'.1').replace(/\.二/g,'.2').replace(/\.三/g,'.3')
					.replace(/\.四/g,'.4').replace(/\.五/g,'.5').replace(/\.六/g,'.6')
					.replace(/\.七/g,'.7').replace(/\.八/g,'.8').replace(/\.九/g,'.9')
					.replace(/\.十/g,'.10').replace(/(\s*[:：]\s*|\-+|—+)/g,'.')
					.replace(/\.{2,}/g,'.').sb().trim()
				return {I,N,cover:`https://book.sciencereading.cn${cover}`}
			}).filter(Boolean)
			log('列表数据',o)
			o&&gbox.append(...o.map(({I,N,cover})=>$O.node('grid-c',{I,N,onclick:'run("IX","card_click",WI)(this)'},`<img crossorigin='anonymous' src='${BCVR}' s='${cover}'/><title>${N}</title>`)))
			if(o.length<30)IX.stop=true
			go(true)
		},{},'html')
	},

	card_click:me=>{ // 打开详情弹层
		CF()
		const K=IX.key=crypto.randomUUID()
		const id=IX.id=me.ga('I'),books='kxwk_favorite_books'.gc({})
		const sk=`<br><sk w100 p10 f fv g4><sk n h130></sk><sk n h130></sk><sk n h130></sk><sk n h130></sk><sk n h130></sk><sk n h20></sk><sk n h8></sk><sk n h50></sk></sk>`
		const mbox=$O.$('modal-c').html(`${sk}<iframe hide crossorigin='anonymous' onload='run("IX","iframe_show",WI)(this)' src='https://book.sciencereading.cn/!'></iframe>`)
		IX.curr={N:me.ga('N'),C:me.$('img').ga('s')}
		$O.$('modal-t [SC]').innerText=id in books?'♡':'⊕'
		$O.body.sa('ns')
		$O.$('grid').da('a')
		$O.$('modal').da('hide').$('modal-t>title').da('s10','s12','s14').html(IX.curr.N.length>14?(IX.curr.N.substring(0,14)+'\n'+IX.curr.N.substring(14)):IX.curr.N)
		if(IX.curr.N.length>14)$O.$('modal-t>title').sa('s14')
		else if(IX.curr.N.length>12)$O.$('modal-t>title').sa('s12')
		else if(IX.curr.N.length>10)$O.$('modal-t>title').sa('s10');
	},

 iframe_show:async me=>{ // iframe初始化
		IX.ready=false
		const $w=IX.$w=me?.contentWindow,$o=IX.$o=me?.contentDocument
		if(!$o?.body)return

		$w.Document.prototype.node=function(tag='div',attrs={},html=''){
			const o=this.createElement(tag)
			for(let k in attrs){
				if(k.startsWith('on')&&(typeof attrs[k]=='function')){
					o[k]=()=>attrs[k](o)
					continue
				}
				o.setAttribute(k,attrs[k])
			}
			if(html.trim()!='')o.innerHTML=html.trim()
			return o
		}

		const tdark='dark'.gc(null)=='yes',N=IX.id+'.PDF'

		let DX=await DB('o','o')
		if(!DX)DX=await DB('o','o')

		let {licenseSN,licenseKey,text,cmisdoc,appID,userToken,contentKey}=JSON.parse(await DG(DX,'o',IX.id+'-decrypt')||'{}')
		if(!licenseSN||!licenseKey||!cmisdoc){
			text=await $w.fetch(`https://book.sciencereading.cn/shop/book/Booksimple/onlineRead.do?id=${IX.id}&readMark=0`).then(_=>_.text()).then(_=>{
				_=(new $w.DOMParser()).parseFromString(_,'text/html')
				_=_.querySelector('#AESCode')
				return _.value.trim()
			}).catch(e=>null)
			if(!text)return
			log('已得密文','success')
			const body=new $w.FormData()
			body.append('text',text)
			const xx=await $w.fetch(`https://cws-wkreader.sciencereading.cn/cpdfapi/v2/documents/science-server-info-decrypt`,{method:'post',body}).then(_=>_.json()).then(_=>_.data).catch(e=>({}))
			if('appID' in xx)appID=xx.appID
			if('cmisdoc' in xx)cmisdoc=xx.cmisdoc
			if('userToken' in xx)userToken=xx.userToken
			if('contentKey' in xx)contentKey=xx.contentKey
			if(xx.cmisdoc)log('已得密钥','success')
			await $w.fetch('/kxwk5_style/lib/license-key.js').then(_=>_.text()).then(_=>{
				$w.licenseSN=licenseSN=_.split('licenseSN:"').pop().split('"').shift()
				$w.licenseKey=licenseKey=_.split('licenseKey:"').pop().split('"').shift()
			}).catch(e=>{})
			if(!$w.licenseSN||!$w.licenseKey||!cmisdoc)return
			log('已得许可','success')
			await DA(DX,'o',IX.id+'-decrypt',JSON.stringify({licenseSN,licenseKey,text,cmisdoc,appID,userToken,contentKey}))
		}
		log('许可密钥',{licenseSN,licenseKey,text,cmisdoc,appID,userToken,contentKey})

		let css=await DG(DX,'o','UIExtension.css')||''
		if(''===css){
			css=await $w.fetch('/kxwk5_style/lib/UIExtension.css').then(_=>_.text()).catch(e=>null)
			if(!css)return
			await DA(DX,'o','UIExtension.css',css)
		}
		$o.head.appendChild($o.node('style',{},`${css}html,body,.fv__ui-pdfviewer,.fv__pdf-page-container{background:rgba(0,0,0,0)}.context-menu-list,.fv__ui-layer{visibility:hidden!important}.fv__ui-layer-modal{display:none!important}.fv__pdf-view-mode-item{margin:0 auto!important;border-top:1.3px solid rgba(${tdark?'255,255,255,.1':'0,0,0,.1'})}${tdark?'.fv__pdf-page-content-container{filter:invert(1) hue-rotate(180deg)}':''}.fv__ui-page-scroll-button{background-color:rgba(${tdark?'255,255,255,.1':'0,0,0,.1'});font-size:16px;padding-top:3px;color:#${tdark?'ddd':'222'}}`))
		log('载入 UIExtension.css','success')

		let worker=await DG(DX,'o','preload-jr-worker.js')||''
		if(''===worker){
			worker=await $w.fetch('/kxwk5_style/lib/preload-jr-worker.js').then(_=>_.text()).catch(e=>null)
			if(!worker)return
			await DA(DX,'o','preload-jr-worker.js',worker)
		}
		let ui=await DG(DX,'o','UIExtension.full.js')||''
		if(''===ui){
			ui=await $w.fetch('/kxwk5_style/lib/UIExtension.full.js').then(_=>_.text()).catch(e=>null)
			if(!ui)return
			await DA(DX,'o','UIExtension.full.js',ui)
		}

		$o.head.appendChild($o.node('script',{},worker+'\n\n'+ui))
		log('载入 Preload-jr-worker.js + UIExtension.full.js','success')

		const __n=Date.now(),__x=setInterval(()=>(Date.now()-__n>5000||$w.preloadJrWorker&&$w.UIExtension)&&clearInterval(__x),200)
		if(!$w.preloadJrWorker||!$w.UIExtension)return log('插件 UIExtension 载入失败','error')

		$w.readyWorker=$w.preloadJrWorker({
			enginePath:'/kxwk5_style/lib/jr-engine/gsdk',
			fontPath:'/kxwk5_style/external/brotli',
			workerPath:'/kxwk5_style/lib/',
			licenseKey,licenseSN,
		})
		$w.pdf=new $w.UIExtension.PDFUI({
			viewerOptions:{
				libPath:'/kxwk5_style/lib',jr:{readyWorker:$w.readyWorker},
				customs:{
					closeDocBefore:void 0,
					PageCustomRender:function(){
						function F(ec,pr){this.eCustom=ec;this.pdfPageRender=pr}
						F.prototype.destroy=function(){this.eCustom.innerHTML=''}
						F.prototype.render=function(){return this.pdfPageRender.getPDFPage().then(_=>(_.getIndex()+1))}
						return F
					}(),
					ScrollWrap:$w.UIExtension.PDFViewCtrl.CustomScrollWrap
				}
			},
			renderTo:'#pdf',template:IX.tpl,
			appearance:$w.UIExtension.appearances.adaptive,
			addons:'/kxwk5_style/lib/uix-addons/allInOne.mobile.js'
		})

		$w.UIExtension.PDFViewCtrl.shared.setThemeColor([{dom:$o.body,colors:{background:tdark?'#000000':'#FFFFFF'}}])

		let lp,es=$w.UIExtension.PDFViewCtrl.Events
		$w.pdf.addViewerEventListener(es.beforeOpenFile,()=>(lp=$w.pdf.loading()))
		$w.pdf.addViewerEventListener(es.openFileSuccess,async()=>{
			await (await $w.pdf.pdfViewer.currentPDFDoc.getViewPreference()).setPageLayout($w.UIExtension.PDFViewCtrl.PDF.constant.PageLayout.OneColumn)
			me.da('hide').previousElementSibling?.remove()
			lp.then(_=>_.close())
			IX.ready=true
		})
		$w.pdf.addViewerEventListener(es.openFileFailed,_=>{if(_&&_.error===3)return;lp?.then(_=>_.close())})
		$w.pdf.addViewerEventListener(es.renderFileSuccess,()=>$w.pdf.goToPage((IX.id+'_index').gc(2)-1))

		resolveLocalFileSystemURL(cordova.file.dataDirectory+N,e=>{
			e.file(f=>{
				const r=new FileReader()
				r.onloadend=()=>{
					const buff=r.result instanceof ArrayBuffer?r.result.slice(0):r.result
					log(cordova.file.dataDirectory+N+' 从缓存中获取成功','success')
					$w.pdf.openPDFByFile(buff,{cdrm:{appID,userToken,contentKey,encrptType:1,hasPermission:true}})
				}
				r.readAsArrayBuffer(f)
			})
		},e=>{
			log(N+' 从缓存中获取失败，拉取数据','warn')
			$w.fetch(`https://cws-wkreader.sciencereading.cn/cpdfapi/v1/documents/download-file?cmisdoc=${cmisdoc}`,{method:'get',headers:{'Access-Token':userToken,'Foxit-App-Name':'Creader_client_mobile'}}).then(_=>_.arrayBuffer()).then(buff=>{
				if(!buff)return
				const b=structuredClone(buff)
				resolveLocalFileSystemURL(cordova.file.dataDirectory,o=>o.getFile(N,{create:true},e=>e.createWriter(w=>w.write(b))))
				$w.pdf.openPDFByFile(buff,{cdrm:{appID,userToken,contentKey,encrptType:1,hasPermission:true}})
			}).catch(e=>log(e))
		})
		$o.body.innerHTML=`<div id='pdf'></div>`
	},

	collect_toggle:me=>{ // 视频收藏切换
		const uncollected=me.innerText=='⊕',books='kxwk_favorite_books'.gc({})
		me.innerText=uncollected?'♡':'⊕'
		if(uncollected)books[IX.id]=IX.curr
		else if(IX.id in books){
			delete books[IX.id]
			if(IX.filters.category=='')$O.$(`grid-c[I='${IX.id}']`).remove()
		}
		'kxwk_favorite_books'.sc(books)
	},

	download:async()=>{ // 下载pdf
		CF()
		if(!IX.ready)return
		const doc=IX.$w.pdf.pdfViewer.currentPDFDoc,N=IX.curr.N+'.PDF'
		const {id,api,info}=doc,{pageCount,pageSizes}=info,{width,height}=pageSizes[1]||{}
		log('文档信息',{id,width,height,pageCount})
		const X=async o=>{
			if(!o.hasChild)return o
			const c=await IX.$w.Promise.all((await api.getBookmarkChildren({path:'jr/doc'},id,o.id)).map(X))
			return {o,c}
		}
		const s=await IX.$w.Promise.all((await api.getBookmarkChildren({path:'jr/doc'},id)).map(X))
		const bm=s.length>1?s:s.pop()
		log('提取书签',bm,'success')
		for(let i=0;i<pageCount;i++)await doc.getPageByIndex(i)
		await doc.setPagesBox({indexes:IX.$w.Array.from(new IX.$w.Array(pageCount).keys()).slice(1),removeWhiteMargin:false})
		log('清除留白','success')
		const file=await doc.extractPages([[0,pageCount-1]]).then(_=>{
			let x=0
			for(let b of _)x+=b.byteLength
			const o=new IX.$w.ArrayBuffer(x),z=new IX.$w.Uint8Array(o)
			x=0
			for(let b of _){const v=new IX.$w.Uint8Array(b);z.set(v,x);x+=v.length}
			return o
		})
		log('提取数据','success')
		const ndoc=await IX.$w.pdf.createNewDoc(N,'雍爷')
		log('已创新档','success')
		await ndoc.insertPages({file,startIndex:0,endIndex:pageCount-1})
		log('已填新档','success')
		await ndoc.removePage(ndoc.getPageCount()-1)
		log('清除白页','success')
		const bs=await IX.$w.pdf.getBookmarkDataService()
		const Z=async(n,p)=>{
			if(!n)return
			if(_T(n,'array')){
				await IX.$w.Promise.all(n.map(c=>Z(c,p)))
				return
			}
			if(!_T(n,'object'))return
			const o=n.o||n
			o.id=await bs.addBookmark({
				destination:{pageIndex:o.page,left:o.left,top:o.top,zoomFactor:o.zoomFactor,zoomMode:o.zoomMode},
				style:{bold:o.isBold,italic:o.isItalic},color:o.color,
				title:o.title,destId:p?p.id:undefined,relationship:1
			})
			if(n.c)await IX.$w.Promise.all(n.c.map(c=>Z(c,n.o)))
		}
		await Z(bm,null)
		log('已载书签','success')
		const O=await ndoc.getFile(),r=new FileReader()
		log(N+' 大小: '+O.size.usage())
		resolveLocalFileSystemURL(cordova.file.externalDataDirectory,de=>{
			de.getFile(N,{create:true},fe=>{
				fe.createWriter(w=>{
					r.onerror=e=>log('FileReader',e,'error')
					w.onerror=e=>log('fe.createWriter',e,'error')
					r.onload=()=>w.write(r.result)
					w.onwriteend=()=>{
						log('文件保存成功！路径：'+fe.nativeURL,'success')
						ndoc.destroy()
					}
					r.readAsArrayBuffer(O)
				},e=>log('fe.createWriter',e,'error'))
			},e=>log('de.getFile',e,'error'))
		},e=>log('resolveLocalFileSystemURL',e,'error'))
	},

	modal_close:async()=>{ // 关闭详情弹层
		CF()
		const o=IX.$o?.querySelector('.fv__ui-page-scroll-button')||null
		if(o)(IX.id+'_index').sc(parseInt(o.innerText))
		IX.ready=false
		IX.id=IX.curr=null
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
			let o=`<tab T='category'>${['','?',...Object.keys(IX.tmap).filter(_=>_!==''&&_!='?')].map(_=>`<div V='${_}' onclick='run("IX","tab_click",WI)(this)'>${IX.tmap[_].name}</div>`).join('')}</tab>`
			o+=`<grid></grid><modal hide><mbox><modal-t><title></title>`
			o+=`<icc SC onclick='run("IX","collect_toggle",WI)(this)' style='line-height:33px'>⊕</icc>`
			o+=`<icc SC onclick='run("IX","download",WI)(this)' style='line-height:33px'>〶</icc>`
			o+=`<icc onclick='run("IX","modal_close",WI)()'>╳</icc>`
			o+=`</modal-t><modal-c></modal-c></mbox></modal>`
			$O.$$('body>*:not(#w_logs)').forEach(_=>_.remove())
			$O.body.html(o+($O.$('#w_logs')?.html(true)||''))
			log('绑定事件，节点监听')
			IX.watch()
			log('获取记忆，开始筛选')
			const {filters}='kxwk_filters'.gc({filters:{category:''}})
			$O.$(`tab[T='category']>div${filters.category?`[V='${filters.category}']`:''}`).click()
		}

		log('获取记忆，分类数据')
		const tmap='kxwk_tmap'.gc({})
		if(Object.keys(tmap).length>0){
			IX.tmap=tmap
			return render()
		}

		log('获取失败，重新拉取分类数据')
		const K=IX.key=crypto.randomUUID(),S=[],cm={}
		const todo=()=>{
			if(S.length<1){
				log('拉取成功，缓存分类数据')
				'kxwk_tmap'.sc(IX.tmap)
				render()
				return
			}
			const c=S.shift();
			`https://book.sciencereading.cn/shop/book/Booksimple/list.do?showQueryModel.dp1Value=${c}&showQueryModel.bookOrderColumn=booksimple.publishDate%20desc`.get(o=>{
				if(!o||K!=IX.key)return
				IX.tmap[c]={name:cm[c],xueks:[],types:[],years:[]}
				IX.tmap[c].xueks=o.$$('input[name="book_xueke"]').map(_=>(_.ga('xueke')+':'+_.nextElementSibling.innerText))
				IX.tmap[c].types=o.$$('input[name="book_type"]').map(_=>_.ga('bookType'))
				IX.tmap[c].years=o.$$('input[name="book_publishYear"]').map(_=>_.ga('year'))
				log('分类数据',IX.tmap[c])
				todo()
			},{},'html')
		}
		`https://book.sciencereading.cn/shop/head1.html`.get(o=>{
			if(!o||K!=IX.key)return
			for(let _ of o.$$('.nav_link')){
				const c=_.dataset.name
				S.push(c)
				cm[c]=_.innerText.trim()
			}
			todo()
		},{},'html')
	},
}
