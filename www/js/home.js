
// 页面唯一标识
WI=window.I=crypto.randomUUID()

window.IX={
	name:'home',

	cards:[ // 所有页面
		{key:'ole',name:'欧乐视频',title:'数据来源',brief:'www.olehdtv.com'},
		{key:'ayf',name:'爱一帆',title:'数据来源',brief:'m.yfsp.tv'},
	],

 goto:me=>{ // 页面跳转
		setTimeout(()=>{
			const js=`${me.ga('K')}.js`
			$O.head.appendChild($O.node('script',{ix:'',src:`./js/${js}?_=${crypto.randomUUID()}`,onload:()=>{
				$O.body.html(window._loader)
				$O.$('head>style[ix]').innerHTML=''
				$O.$$('head>script[ix]').forEach(_=>_.remove())
				IX.run()
			},onerror:e=>log(`脚本文件${js}不存在`,e)}))
		},200)
 },

	run:()=>{ // 启动执行
		$O.$('head>style[ix]').innerHTML=`
body{padding:30px}
card{display:inline-block;width:100%;text-align:center;margin-bottom:14px}
card:last-child{margin-bottom:0}
card>.front,card>.back{width:inherit;transition:.5s cubic-bezier(.175,.885,.32,1.275);color:#fff;aspect-ratio:7/4;padding:1em 2em;background:#313131;border-radius:10px;background-size:cover;background-position:center}
card>.front{transform:rotateY(0)}
card>.back{position:absolute;opacity:0;top:0;left:0;width:100%;height:100%;transform:rotateY(-180deg)}
card:hover>.front{transform:rotateY(180deg)}
card:hover>.back{opacity:1;transform:rotateY(0)}
card[v]>.back{transform:rotateX(-180deg)}
card[v]:hover>.front{transform:rotateX(180deg)}
card[v]:hover>.back{transform:rotateX(0)}
card>.front p,card>.back p{font-size:18px;line-height:3.5;color:#999}
card h2{font-size:20px}
card h1{font-size:26px;text-shadow:1px 1px #0000000a,2px 2px #0000000a,3px 3px #0000000a,4px 4px #0000000a,.125rem .125rem #0000000a,6px 6px #0000000a,7px 7px #0000000a,8px 8px #0000000a,9px 9px #0000000a,.3125rem .3125rem #0000000a,11px 11px #0000000a,12px 12px #0000000a,13px 13px #0000000a,14px 14px #0000000a,.625rem .625rem #0000000a,16px 16px #0000000a,17px 17px #0000000a,18px 18px #0000000a,19px 19px #0000000a,1.25rem 1.25rem #0000000a}`
		let o=[],i=0
		for(let {key,name,title,brief} of IX.cards)o.push(`<card${(i++)%2<1?' v':''} onclick='run("IX","goto",WI)(this)' K='${key}'><div class='front' style='background-image:url(./img/${key}.jpg)'><h1>${name}</h1></div><div class='back'><h2>${title}</h2><p>${brief}</p></div></card>`)
		$O.body.html(o.join(''))
	},

}

IX.run()
