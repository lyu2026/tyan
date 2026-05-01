
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
		const o=new Date(parseInt(_)),x=_=>(_<10?'0'+_:_)
		const wm=['日','一','二','三','四','五','六']
		const mm=['元','二','三','四','五','六','七','八','九','十','十一','腊']
		return {
			d:x(o.getDate()),m:mm[o.getMonth()]+'月',y:o.getFullYear(),
			w:'周'+wm[o.getDay()],t:`${x(o.getHours())}:${x(o.getMinutes())}:${x(o.getSeconds())}`
		}
	},

	add:async()=>{ // 新增
		await IX.J.save({title:'挖掘客户举报检测方法关系还记得盖好',content:'魔女还不晓得都是当天就看了看和爸爸重新打说的话回家吃饭好吃',mood:'开心',tags:'瞎说'},true)
	},

	statistics:async(me)=>{ // 统计
		'diary_tab'.sc(me.ga('v'))
		$O.$$('tab>*').forEach(_=>_[_!=me?'da':'sa']('c'))
		const gbox=$O.$('grid').html(''),{streak,count,days,icount,fcount,peak,lavg}=await IX.J.summary().catch(e=>{
			log('统计失败',e,'error')
			return {streak:0,count:0,days:0,icount:0,fcount:0,lavg:0,peak:0}
		})
		gbox.html(`
		<grid-c summary>
			<div streak x='当前持续天数：'>${streak}</div><div days x='记录总天数：'>${days}</div><div count x='记录总数：'>${count}</div>
			<div icount x='图片总数：'>${icount}</div><div fcount x='文件总数：'>${fcount}</div>
			<div lavg x='平均字数：'>${lavg}</div><div peak x='最活跃时段：'>${peak}点</div>
		</grid-c>`)
	},

	list:async(_,go)=>{ // 列表
		let gbox=$O.$('grid')
		if(!_T(_,'int')){
			IX.stop=false
			gbox=gbox.html('')
			'diary_tab'.sc(_.ga('v'))
			$O.$$('tab>*').forEach(_=>_[_!=_?'da':'sa']('c'))
		}else if(IX.stop)return
		const s=await IX.J.page({},me,30).then(_=>_.data)
		if(s.length<30)IX.stop=true
		for(let d,m,y,i=0;i<s.length;i++){
			const x=s[i].x=IX.ftime(s[i].created)
			if(i===0||x.m!=m||x.y!=y){
				y=x.y
				m=x.m
				if(i===0)d=x.d
				gbox.append($O.node('grid-c',{my:''},`${m} ${y}`))
				gbox.append($O.node('grid-c',{dr:''},`<div I='${s[i].id}' ondblclick='run("IX","remove",WI)(this)'><div><div>${x.w}</div>${x.d}</div><div><div>${s[i].title}</div><div>${s[i].content}</div><div>${x.t}</div></div></div>`))
				continue
			}
			gbox.$(':scope>grid-c[dr]:last-child').append($O.node('div',{I:s[i].id,ondblclick:'run("IX","remove",WI)(this)'},`<div><div>${x.w}</div>${x.d}</div><div><div>${s[i].title}</div><div>${s[i].content}</div><div>${x.t}</div></div>`))
		}
	},

	calendar:async(me)=>{ // 日历
		'diary_tab'.sc(me.ga('v'))
		$O.$$('tab>*').forEach(_=>_[_!=me?'da':'sa']('c'))
		
	},

	remove:async(me)=>{ // 删除记录
		if(!confirm('你确定删除此记录吗？'))return
		const I=me.ga('I'),o=await IX.J.remove(parseInt(I),true)
		log('删除结果',o)
		if(o&&o.includes('成功'))me.remove()
	},

	watch:()=>{ // 监听节点
		IX.observer.load_more=new IntersectionObserver((s,o)=>{
			let card=null
			s.forEach(e=>(e.target.nodeName=='GRID-C')&&(e.intersectionRatio>=0.7)&&(card=e.target))
			if(!card||card.ha('wait'))return
			card.sa('wait')
			IX.list(null,_=>{
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

	run:async()=>{ // 启动执行
		log('进入页面，自定义样式')
		$O.$('head>style[ix]').innerHTML=`
body{display:flex!important;flex-direction:column!important}

grid-c{float:left;display:block;width:calc(100vw - 20px);height:auto}

grid-c[summary]{margin-top:12px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;height:240px;color:rgba(0,0,0,.6);font-size:40px;font-weight:800;gap:10px}
body[dark] grid-c[summary]{color:rgba(255,255,255,.6)}
grid-c[summary]>*{display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.06);border-radius:6px}
body[dark] grid-c[summary]>*{background:rgba(255,255,255,.06)}
grid-c[summary]>*::before{content:attr(x);display:block;position:absolute;top:12px;left:10px;font-size:20px}
grid-c[summary]>[streak]{grid-column:1;grid-row:1/3}
grid-c[summary]>[days]{grid-column:2;grid-row:1}
grid-c[summary]>[const]{grid-column:2;grid-row:2}
grid-c[summary]>[icount]{grid-column:1}
grid-c[summary]>[fcount]{grid-column:2}
grid-c[summary]>[lavg]{grid-column:1}
grid-c[summary]>[peak]{grid-column:2}

grid-c[my]{background:rgba(0,0,0,0);color:black;font-size:26px;line-height:40px;color:black;padding:0}
body[dark] grid-c[my]{color:white}
grid-c[dr]{display:flex;flex-direction:column;border-radius:14px;background:rgba(0,0,0,.04);overflow:hidden;margin-bottom:5px}
body[dark] grid-c[dr]{background:rgba(255,255,255,.04)}
grid-c[dr]:last-child{margin-bottom:36px}
grid-c[dr]>*{background:rgba(0,0,0,.08);display:flex;margin-bottom:1px}
body[dark] grid-c[dr]>*{background:rgba(255,255,255,.08)}
grid-c[dr]>*:hover{background:rgba(0,0,0,.16)}
body[dark] grid-c[dr]>*:hover{background:rgba(255,255,255,.16)}
grid-c[dr]>*:last-child{margin-bottom:0}

grid-c[dr]>*>*:first-child{opacity:0;width:12%;aspect-ratio:3/4.5;padding-left:6px}
grid-c[dr]>*:first-child>*:first-child{opacity:1;text-align:center;font-size:22px}
grid-c[dr]>*:first-child>*:first-child>div{font-size:12px;margin:16px auto 4px auto}
grid-c[dr]>*:first-child>*:first-child::after{content:'';display:block;position:absolute;top:6%;left:6px;z-index:10;width:80%;height:88%;background:rgba(0,0,0,.2);border-radius:24px}

body[dark] grid-c[dr]>*>*:first-child::after{background:rgba(255,255,255,.2)}
grid-c[dr]>*>*:last-child{padding:6px 4px 6px 8px;flex:1;display:flex;flex-direction:column}
grid-c[dr]>*>*:last-child>*:first-child{font-size:16px;color:black;padding-bottom:3px}
grid-c[dr]>*>*:last-child>*:nth-child(2){flex:1;font-size:13px;line-height:1.3;color:rgba(0,0,0,.9);padding-bottom:3px}
grid-c[dr]>*>*:last-child>*:last-child{font-size:10px;color:rgba(0,0,0,.9)}
body[dark] grid-c[dr]>*>*:last-child>*{color:rgba(255,255,255,.9)}
body[dark] grid-c[dr]>*>*:last-child>*:first-child{color:white}
`
		log('渲染页面，构建 DOM 树')
		$O.$$('body>*:not(#w_logs)').forEach(_=>_.remove())
		$O.body.html(`
		<tab>
			<div v='statistics' onclick='run("IX","statistics",WI)(this)'>📦</div>
			<div v='list' onclick='run("IX","list",WI)(this)'>列表</div>
			<div v='calendar' onclick='run("IX",calendar",WI)(this)'>日历</div>
			<div onclick='run("IX","add",WI)(this)'>╋ 新日记条目</div>
		</tab><grid></grid>`+($O.$('#w_logs')?.html(true)||''))

		log('日记数据，本地同步')
		await IX.J.sync(false)

		log('获取缓存，点击 TAB')
		let tab=$O.$(`tab>[v='${'diary_tab'.gc('list')}']`)
		if(!tab)tab=$O.$(`tab>[v='list']`)
		tab.click()
	},
}
