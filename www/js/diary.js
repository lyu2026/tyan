
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'diary',

	// 所有监听对象
	observer:{},

	// 核心库
	J:cordova.plugin.journiv,

	// 配置项
	page:0,stop:false,

	ftime:_=>{
		const O=new Date(parseInt(_)),X=_=>(_<10?'0'+_:_)
		const W=['日','一','二','三','四','五','六'],M=['元','二','三','四','五','六','七','八','九','十','十一','腊']
		return {
			d:X(O.getDate()),m:M[O.getMonth()]+'月',y:O.getFullYear(),
			w:'周'+W[O.getDay()],t:`${X(O.getHours())}:${X(O.getMinutes())}:${X(O.getSeconds())}`
		}
	},

	statistics:async(me)=>{ // 统计
		'diary_tab'.sc(me.ga('v'))
		$O.$$('tab>*').forEach(_=>_[_!=me?'da':'sa']('c'))
		const gbox=$O.$('grid').html(''),{streak,totalCount,totalDays,imgCount,fileCount,peakHour,avgLen}=await IX.J.summary().catch(e=>{
			log('统计失败',e,'error')
			return {streak:0,totalCount:0,totalDays:0,imgCount:0,fileCount:0,avgLen:0,peakHour:0}
		})
		gbox.html(`
		<grid-c summary>
			<div streak x='当前持续天数：'>${streak}</div><div days x='记录总天数：'>${totalDays}</div><div count x='记录总数：'>${totalCount}</div>
			<div icount x='图片总数：'>${imgCount}</div><div fcount x='附件总数：'>${fileCount}</div>
			<div lavg x='平均字数：'>${avgLen}</div><div peak x='最活跃时段：'>${peakHour}点</div>
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

		const s=await IX.J.page({},me,30).then(_=>_.data)
		if(s.length<30)IX.stop=true
		for(let d,m,y,i=0;i<s.length;i++){
			const x=s[i].x=IX.ftime(s[i].at)
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
		const I=me.ga('I'),o=await IX.J.remove(parseInt(I),true)
		log('删除结果',o)
		if(o&&o.includes('OK'))me.remove()
	},

	calendar:async(me)=>{ // 日历
		'diary_tab'.sc(me.ga('v'))
		$O.$$('tab>*').forEach(_=>_[_!=me?'da':'sa']('c'))
		
	},

	add:async()=>{ // 新增
		const title='挖掘客户举报检测方法关系还记得盖好'
		const content='顾虑感觉刚放假你好哥哥很多地方个非常喜欢好看'
		const mood='said',tags='徐',imgs=['https://pixabay.com/zh/images/download/x-10222434_1920.jpg']
		const {id,at}=await IX.J.save({title,content,mood,tags,imgs},true)
		if(!id||id<1)return
		const {y,m,w,d,t}=IX.ftime(at)
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

grid-c[dr]>[I]>[L]{opacity:0;width:12%;aspect-ratio:3/4.5;padding-left:6px}
grid-c[dr]>[I]:first-child>[L]{background:#ddd;opacity:1;text-align:center;font-size:22px}
body[dark] grid-c[dr]>[I]:first-child>[L]{background:#222}
grid-c[dr]>[I]:first-child>[L]::after{content:'';display:block;position:absolute;top:6%;left:6px;z-index:10;width:80%;height:88%;background:rgba(0,0,0,.2);border-radius:24px}
body[dark] grid-c[dr]>[I]>[L]::after{background:rgba(255,255,255,.2)}
grid-c[dr]>[I]:first-child>[L]>div{font-size:12px;margin:16px auto 4px auto}

grid-c[dr]>[I]>[R]{flex:1;overflow:hidden}
grid-c[dr]>[I]>[R]>button{position:absolute;right:0;top:0;width:80px;height:100%;background:#e74c3c;color:#fff;border:none;font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center;z-index:1}
grid-c[dr]>[I]>[R]>[F]{background:#ddd;width:100%;height:100%;z-index:2;display:flex;flex-direction:column;padding:6px 4px 6px 8px;transition:transform 0.25s ease;touch-action:pan-y}
body[dark] grid-c[dr]>[I]>[R]>[F]{background:#222}
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
			<div v='statistics' onclick='run("IX","statistics",WI)(this)'>📦</div>
			<div v='list' onclick='run("IX","list",WI)(this)'>列表</div>
			<div v='calendar' onclick='run("IX",calendar",WI)(this)'>日历</div>
			<div onclick='run("IX","add",WI)(this)'>╋ 新条目</div>
			<div onclick='run("IX","sync",WI)(this)'>同步</div>
		</tab><grid></grid><modal hide><mbox><modal-t><title></title>
		<icc onclick='run("IX","modal_close",WI)()'>╳</icc>
		</modal-t><modal-c><textarea IT></textarea><textarea IC></textarea></modal-c></mbox></modal>`+($O.$('#w_logs')?.html(true)||''))

		if(!'diary_already'.gc(false)){
			await IX.J.clear(1)
			log('初始数据，本地记录已清空')
			const m=await IX.J.lmap();
			await IX.J.init()
			for(const id in m){
				const r=await IX.J.journiv.lsync(Number(id))
				log(`初始数据，恢复记录 ${id}:`+(r.ok?'成功':r.msg))
			}
			log('初始数据，本地记录已同步')
			'diary_already'.gc(true)
		}

		log('绑定事件，节点监听')
		IX.watch()
		log('获取缓存，点击 TAB')
		let tab=$O.$(`tab>[v='${'diary_tab'.gc('statistics')}']`)
		if(!tab)tab=$O.$(`tab>[v='statistics']`)
		tab.click()
	},
}
