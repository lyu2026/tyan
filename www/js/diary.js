
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'diary',

	// 所有监听对象
	observer:{},

// Journiv.save("标题", "内容", "开心", "标签", e=>log('保存成功',e,'success'), e=>log('保存失败',e,'error'));
// Journiv.all(e=>log('列表成功',e,'success'), e=>log('列表失败',e,'error'));
// Journiv.syncUp(e=>log('同步成功',e,'success'), e=>log('同步失败',e,'error'));
// Journiv.memory(e=>log('记忆成功',e,'success'), e=>log('记忆失败',e,'error'));
// Journiv.syncStatus(e=>log('同步状态成功',e,'success'), e=>log('同步状态失败',e,'error'));

	ftime:_=>{
		const d=new Date(_),x=_=>_<10?'0'+_:_
		const wm=['日','一','二','三','四','五','六']
		const mm=['元','二','三','四','五','六','七','八','九','十','十一','腊']
		return {
			day:x(d.getDate()),month:mm[d.getMonth()],year:d.getFullYear(),
			week:wm[d.getDay()],time:`${x(d.getHours())}:${x(d.getMinutes())}:${x(d.getSeconds())}`
		}
	}

	statistics:async(me)=>{ // 统计
		'diary_tab'.sc(me.ga('v'))
		me.parentElement.children.forEach(_=>_[_!=me?'da':'sa']('c'))
		const gbox=$O.$('grid').html(''),{streak,count,days}=await Journiv.summary().catch(e=>{
			log('统计失败',e,'error')
			return {streak:0,count:0,days:0}
		})
		gbox.html(`<div summary><div streak>${streak}</div><div count>${count}</div><div days>${days}</div></div>`)
	},

	list:async(me)=>{ // 列表
		'diary_tab'.sc(me.ga('v'))
		me.parentElement.children.forEach(_=>_[_!=me?'da':'sa']('c'))
		const gbox=$O.$('grid').html(''),s=await Journiv.all(true).catch(_=>[])
		for(let d,m,y,i=0;i<s.length;i++){
			s[i].dt=IX.ftime(s[i].created)
			if(i===0||s[i].dt.month!=m||s[i].dt.year!=y){
				y=s[i].dt.year
				m=s[i].dt.month
				if(i===0)d=s[i].dt.day
				gbox.append($O.node('div',{my:''},`${m} ${y}`))
				gbox.append($O.node('div',{d:''},`<div><div>${s[i].dt.week}<br>${d}</div><div>${s[i].dt.content}<div>${s[i].dt.time}</div></div></div>`))
				continue
			}
			gbox.$(':scope>*:last-child').append($O.node('div',{},`<div></div><div>${s[i].dt.content}<div>${s[i].dt.time}</div></div>`))
		}
	},

	calendar:async(me)=>{ // 日历
		'diary_tab'.sc(me.ga('v'))
		me.parentElement.children.forEach(_=>_[_!=me?'da':'sa']('c'))
		
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

	run:async()=>{ // 启动执行
		log('进入页面，自定义样式')
		$O.$('head>style[ix]').innerHTML=`
body{display:flex!important;flex-direction:column!important}
body>input{background:rgba(0,0,0,.1);color:black;display:block;margin:26px 0 5px 0;outline:0;border:1px solid rgba(255,255,255,.2);border-radius:20px;line-height:38px;padding:0 12px}
body[dark]>input{background:rgba(255,255,255,.1);color:white}
grid-c{float:left;display:block;width:calc(100vw - 20px);height:auto}
`
		log('渲染页面，构建 DOM 树')
		$O.$$('body>*:not(#w_logs)').forEach(_=>_.remove())
		$O.body.html(`<tab><div v='statistics' onclick='run("IX","statistics",WI)(this)'>📦</div><div v='list' onclick='run("IX","list",WI)(this)'>列表</div><div v='calendar' onclick='run("IX",calendar",WI)(this)'>日历</div></tab><grid></grid>`+($O.$('#w_logs')?.html(true)||''))

		log('日记数据，本地同步')
		await Journiv.syncDown()

		log('获取缓存，点击 TAB')
		let tab=$O.$(`tab>[v='${'diary_tab'.gc('list')}']`)
		if(!tab)tab=$O.$(`tab>[v='list']`)
		tab.click()
	},
}
