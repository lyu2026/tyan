
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'diary',
	observer:{},
	K:cordova.plugin.koofr,
	S:cordova.plugin.sqlite,

	ftime:ts=>{
		const wd=['日','一','二','三','四','五','六'],mc=['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','冬月','腊月']
		let d=new Date(ts),y=d.getFullYear(),m=d.getMonth(),w=d.getDay(),t=d.toTimeString().slice(0,8)
		return{w:'星期'+wd[w],y,m:mc[m],d:d.getDate(),t}
	},

	statistics:async(me)=>{ // 统计
		'diary_tab'.sc(me.ga('v'))
		$O.$$('tab>*').forEach(_=>_[_!=me?'da':'sa']('c'))
		const gbox=$O.$('grid').html('')
		// 统计 - 多次select按需拉取，避免全表
		// 总条数和平均字数
		const s=await IX.S.select('O',{cs:['content','at'],oy:'id DESC'})
		const count=s.length
		const days=new Set(s.map(r=>new Date(r.at).toLocaleDateString())).size
		const lavg=Math.round(s.reduce((x,r)=>x+(r.content||'').length,0)/count*10)/10
		const peak=Math.round(s.reduce((x,r)=>x+new Date(r.at).getHours(),0)/count*10)/10
		
		// 图片/文件去重 - 只查有数据的
		const imgs=await IX.S.select('O',{cs:['imgs'],w:{imgs:{ne:'[]'}}}),si=new Set()
		imgs.forEach(r=>{if(r.imgs)JSON.parse(r.imgs).forEach(v=>si.add(v))})
		
		const files=await IX.S.select('O',{cs:['files'],w:{files:{ne:'[]'}}}),sf=new Set()
		files.forEach(r=>{if(r.files)JSON.parse(r.files).forEach(v=>sf.add(v))})
		
		// 连续天数 - 只查不同日期
		const ds=await IX.S.select('O',{cs:['at']}),dm=new Map()
		ds.forEach(r=>{let d=new Date(r.at).toLocaleDateString();dm.set(d,true)})
		const da=[...dm.keys()].sort().reverse()
		let streak=0,today=new Date().toLocaleDateString()
		for(let i=0;i<da.length;i++){
			if(i==0&&da[i]!=today)break
			if(i==0||(new Date(da[i-1])-new Date(da[i]))/864e5==1)streak++
			else break
		}
		gbox.html(`
		<grid-c summary>
			<div streak x='当前持续天数：'>${streak}</div><div days x='记录总天数：'>${days}</div><div count x='记录总数：'>${count}</div>
			<div icount x='图片总数：'>${si.size}</div><div fcount x='附件总数：'>${sf.size}</div>
			<div lavg x='平均字数：'>${lavg}</div><div peak x='最活跃时段：'>${peak}点</div>
		</grid-c>`)
	},

	list:async(me,go)=>{ // 列表
		let gbox=$O.$('grid')
		if(!_T(me,'int')){
			IX.stop=false
			gbox=gbox.html('')
			'diary_tab'.sc(me.ga('v'))
			$O.$$('tab>*').forEach(_=>_[me!=_?'da':'sa']('c'))
			IX.page=me=1
		}else if(IX.stop)return go&&go(true)

		const s=await IX.S.page('O',{p:me,z:30,oy:'at DESC'}).then(_=>_.rows)
		if(s.length<30)IX.stop=true
		for(let d,m,y,i=0;i<s.length;i++){
			const x=IX.ftime(s[i].at)
			if(i===0||x.m!=m||x.y!=y){
				y=x.y
				m=x.m
				if(i===0)d=x.d
				gbox.append($O.node('grid-c',{my:''},`${m} ${y}`))
				gbox.append($O.node('grid-c',{dr:''},`<div I='${s[i].id}'><div L><div>${x.w}</div>${x.d}</div><div R><button onclick='run("IX","remove",WI)(this)'>删除</button><div F><div>${s[i].title}</div><div>${s[i].content}</div><div>${x.t}</div></div></div></div>`))
				continue
			}
			gbox.$(':scope>grid-c[dr]:last-child').append($O.node('div',{I:s[i].id},`<div L><div>${x.w}</div>${x.d}</div><div R><button onclick='run("IX","remove",WI)(this)'>删除</button><div F><div>${s[i].title}</div><div>${s[i].content}</div><div>${x.t}</div></div></div>`))
		}
		go&&go(true)
	},

	remove:async(me)=>{ // 删除记录
		if(!confirm('你确定删除此记录吗？'))return
		const I=me.ga('I'),o=await IX.S.remove('O',parseInt(I))
		log('删除结果',o)
		if(o&&o.includes('OK'))me.remove()
	},

	calendar:async(me)=>{ // 日历
		'diary_tab'.sc(me.ga('v'))
		$O.$$('tab>*').forEach(_=>_[_!=me?'da':'sa']('c'))
		
		log('开始转屏')
		// cordova.plugin.orient.set('H')
		log('已经转屏')
		
		log('开始检查')
		// let ok=await cordova.plugin.badge.check()
		// log('支持角标:',ok)
		
		cordova.plugin.badge.set(5)
		log('设置成功')
		
		let n=await cordova.plugin.badge.get()
		log('当前角标:',n)
		
		
	},

	add:async()=>{ // 新增
		const title='挖掘客户举报检测方法关系还记得盖好'
		const content='顾虑感觉刚放假你好哥哥很多地方个非常喜欢好看'
		const address='中国.黑龙江.漠河',location='45.89666,86.88556'
		const mood='said',tags='徐',imgs=['https://pixabay.com/zh/images/download/x-10222434_1920.jpg']
		let o=await IX.S.insert('O',{title,content,address,location,mood,tags,imgs,files:[]})
		if(!o||!o.id||o.id<1){
			log('添加失败','error')
			return
		}
		log('已添数据',o)
		
		o=await IX.S.select('O',{w:{id:o.id},ec:false}).then(_=>_.shift())
		log('该编详细',o)
		
		const id=o.id,uo=await IX.K.upload('tyan',`${o.id}.json`,Array.from(new Uint8Array(new TextEncoder().encode(JSON.stringify(o)))))
		log('已传数据',uo.o.name+' '+uo.o.hash)
		
		if('diary_tab'.gc()!='list')return
		
		o=await IX.S.select('O',{cs:'at',w:id})
		const {y,m,d,w,t}=IX.ftime(o.at)
		if(!$O.$('grid-c'))$O.$('grid').append($O.node('grid-c',{my:''},`${m} ${y}`))
		if(!$O.$('grid-c[dr]'))$O.$('grid').append($O.node('grid-c',{dr:''},`<div I='${id}'><div L><div>${w}</div>${d}</div><div M><button onclick='run("IX","remove",WI)(this)'>删除</button><div F><div>${title}</div><div>${content}</div><div>${t}</div></div></div></div>`))
		else $O.$('grid>grid-c[dr]:last-child').append($O.node('div',{I:id},`<div L><div>${w}</div>${d}</div><div R><button onclick='run("IX","remove",WI)(this)'>删除</button><div F><div>${title}</div><div>${content}</div><div>${t}</div></div></div>`))
	},

	watch:()=>{ // 监听节点
		$O.addEventListener('touchstart',e=>{
			if(e.target.closest('grid-c[dr] [M]'))return
			$O.$$('grid-c[dr] [M]').forEach(_=>IX.srest(_))
			IX.layer=null
		},{passive:true})
		IX.observer.load_more=new IntersectionObserver((s,o)=>{
			let last=null
			s.forEach(e=>(e.target.nodeName=='DIV')&&(e.target.ha('I'))&&(e.intersectionRatio>=0.7)&&(last=e.target))
			if(!last||last.ha('wait'))return
			last.sa('wait')
			IX.list(++IX.page,_=>{
				if(_)o?.unobserve(card)
				last.da('wait')
			})
		},{threshold:0.7})
		IX.observer.get_nodes=new MutationObserver(s=>{
			let last=null
			s.forEach(e=>{
				const t=e.target,o=[],s=Array.from(e.addedNodes)
				if(t.nodeName=='GRID'||t.nodeName=='DIV'&&t.ha('I')){
					if(!s.some(_=>_.$('[F]')||_.ha('F')))return
					s.forEach(_=>o.push(...(_.ha('F')?[_]:_.$$('[F]'))))
				}
				log(o.length)
				if(o.length<1)return
				for(let v of o){
					last=v.parentElement.parentElement
					log(_T(last))
					v.addEventListener('touchstart',_=>{
						const o=_.currentTarget
						o.style.transition='transform 0.25s ease'
						o.style.transform='translateX(0)'
						o.da('S')
						o.sa({_x:_.touches[0].clientX,_c:0,_d:false})
						o.style.transition='none'
					},{passive:false})
					v.addEventListener('touchmove',_=>{
						const o=_.currentTarget,_x=_.touches[0].clientX-Number(o.ga('_x'))
						o.ga({_x})
						if(_x<-5){
							o.ga({_d:true})
							_.preventDefault()
						}
						o.style.transform=`translateX(${Math.min(0,Math.max(-80,_x))}px)`
					},{passive:false})
					v.addEventListener('touchend',_=>{
						const o=_.currentTarget,_x=Number(o.ga('_x'))
						o.style.transition='transform 0.25s ease'
						if(_x<-40){
							o.style.transform='translateX(-80px)'
							o.sa('S')
						}else{
							o.style.transition='transform 0.25s ease'
							o.style.transform='translateX(0)'
							o.da('S')
						}
						o.sa({_d:false})
					})
				}
			})
			last&&IX.observer.load_more?.observe(last)
		})
		IX.observer.get_nodes.observe($O.body,{subtree:true,childList:true,attributeFilter:['hide','_I']})
	},

	run:async()=>{ // 启动执行
		log('进入页面，自定义样式')
		$O.$('head>style[ix]').innerHTML=`
body{display:flex!important;flex-direction:column!important}

grid-c{float:left;display:block;width:calc(100vw - 20px);height:auto}

grid-c[summary]{margin-top:12px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr 1fr 1fr;height:600px;color:rgba(0,0,0,.6);font-size:40px;font-weight:800;gap:10px}
body[dark] grid-c[summary]{color:rgba(255,255,255,.6)}
grid-c[summary]>*{display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.06);border-radius:6px}
body[dark] grid-c[summary]>*{background:rgba(255,255,255,.06)}
grid-c[summary]>*::before{content:attr(x);display:block;position:absolute;top:12px;left:10px;font-size:20px}
grid-c[summary]>[streak]{grid-column:1;grid-row:1/3}
grid-c[summary]>[days]{grid-column:2;grid-row:1}
grid-c[summary]>[const]{grid-column:2;grid-row:2}
grid-c[summary]>[icount]{grid-column:1;grid-row:3}
grid-c[summary]>[fcount]{grid-column:2;grid-row:3}
grid-c[summary]>[lavg]{grid-column:1;grid-row:4}
grid-c[summary]>[peak]{grid-column:2;grid-row:4}

grid-c[my]{background:rgba(0,0,0,0);color:black;font-size:26px;line-height:40px;color:black;padding:0}
body[dark] grid-c[my]{color:white}

grid-c[dr]{display:flex;flex-direction:column;border-radius:14px;background:rgba(0,0,0,.04);overflow:hidden;margin-bottom:5px}
body[dark] grid-c[dr]{background:rgba(255,255,255,.04)}
grid-c[dr]:last-child{margin-bottom:36px}

grid-c[dr]>[I]{background:#ddd;display:flex;margin-bottom:1px}
body[dark] grid-c[dr]>[I]{background:#222}
grid-c[dr]>[I]:hover{background:#aaa}
body[dark] grid-c[dr]>[I]:hover{background:#555}
grid-c[dr]>[I]:last-child{margin-bottom:0}

grid-c[dr]>[I]>[L]{opacity:0;width:12%;aspect-ratio:3/4.5;padding-left:3px}
grid-c[dr]>[I]:first-child>[L]{background:translate;opacity:1;text-align:center;font-size:22px}
grid-c[dr]>[I]:first-child>[L]::after{content:'';display:block;position:absolute;top:6%;left:6px;z-index:10;width:80%;height:88%;background:rgba(0,0,0,.2);border-radius:20px}
body[dark] grid-c[dr]>[I]>[L]::after{background:rgba(255,255,255,.2)}
grid-c[dr]>[I]:first-child>[L]>div{font-size:12px;margin:20px auto 4px auto}

grid-c[dr]>[I]>[R]{flex:1;overflow:hidden}
grid-c[dr]>[I]>[R]>button{position:absolute;right:0;top:0;width:80px;height:100%;background:#e74c3c;color:#fff;border:none;font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center;z-index:1}
grid-c[dr]>[I]>[R]>[F]{background:translate;width:100%;height:100%;z-index:2;display:flex;flex-direction:column;padding:6px 4px 6px 8px;transition:transform 0.25s ease;touch-action:pan-y}
grid-c[dr]>[I]>[R]>[F].swiped{transform:translateX(-80px)}
grid-c[dr]>[I]>[R]>[F]>*:first-child{font-size:16px;color:black;padding-bottom:3px}
grid-c[dr]>[I]>[R]>[F]>*:nth-child(2){flex:1;font-size:13px;line-height:1.3;color:rgba(0,0,0,.9);padding-bottom:3px}
grid-c[dr]>[I]>[R]>[F]>*:last-child{font-size:10px;color:rgba(0,0,0,.9)}
body[dark] grid-c[dr]>[I]>[R]>[F]>*{color:rgba(255,255,255,.9)}
body[dark] grid-c[dr]>[I]>[R]>[F]>*:first-child{color:white}
`
		log('渲染页面，构建 DOM 树')
		$O.$$('body>*:not(#w_logs)').forEach(_=>_.remove())
		$O.body.html(`
		<tab>
			<div v='statistics' onclick='run("IX","statistics",WI)(this)'>🟡🟢</div>
			<div v='list' onclick='run("IX","list",WI)(this)'>列表</div>
			<div v='calendar' onclick='run("IX","calendar",WI)(this)'>日历</div>
			<div onclick='run("IX","add",WI)(this)'>╋ 新条目</div>
			<div onclick='run("IX","sync",WI)(this)'>同步</div>
		</tab><grid></grid><modal hide><mbox><modal-t><title></title>
		<icc onclick='run("IX","modal_close",WI)()'>╳</icc>
		</modal-t><modal-c><textarea IT></textarea><textarea IC></textarea></modal-c></mbox></modal>`+($O.$('#w_logs')?.html(true)||''))

		const e=await IX.S.exist('O')
		if(!e)await IX.S.create('O',{
			cs:[
				{n:'id',tp:'INTEGER',pk:true,ai:true},
				{n:'title',tp:'TEXT',nn:true},
				{n:'content',tp:'TEXT'},
				{n:'address',tp:'TEXT'},
				{n:'location',tp:'TEXT'},
				{n:'imgs',tp:'TEXT',df:'[]'},
				{n:'files',tp:'TEXT',df:'[]'},
				{n:'mood',tp:'TEXT'},
				{n:'tags',tp:'TEXT',df:'[]'}
			],ec:['content'],ix:['title','mood','tags','address']
		})
		const s=await IX.K.list('tyan').then(_=>_.o.files.map(_=>_.name.endsWith('.json')?_.name:null).filter(Boolean)).catch(_=>{
			log('线上数据，文件清单获取失败',_,'error')
			return []
		})
		log('线上数据，文件清单',s)
		for(let _ of s){
			const o=await IX.K.download('tyan',_).then(_=>JSON.parse(_.o)).catch(_=>{
				log(`线上数据，文件 ${_} 内容获取失败`,_,'error')
				return null
			})
			if(!o)continue
			o.imgs=JSON.stringify(o.imgs)
			o.files=JSON.stringify(o.files)
			const {id}=await IX.S.insert('O',o,{ec:false})
			log(`线上数据，存储 ${_} 内容，记录编号: `+id)
		}
		
		log('绑定事件，节点监听')
		// IX.watch()
		log('获取缓存，点击 TAB')
		let tab=$O.$(`tab>[v='${'diary_tab'.gc('statistics')}']`)
		if(!tab)tab=$O.$(`tab>[v='statistics']`)
		tab.click()
	},
}
