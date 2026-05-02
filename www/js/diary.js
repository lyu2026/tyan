
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

	// ===== 配置 =====
	O:{user:"lyuw2026@gmail.com",pswd:"vy75aqa4naicde1r",db:"Journiv",tb:"o",url:"https://app.koofr.net/dav/Koofr/",folder:"tyan",key:"abcdefghijklmnopqrstuvwxyz123456",iv:"abcdefghijklmnop",list:"list.txt"},
	
	// ===== 数据库 =====
	// 打开数据库
	_d(){return window.sqlitePlugin.openDatabase({name:this.O.db+'.db',location:'default'})},
	// 执行SQL
	_s(s,p=[]){return new Promise((o,e)=>this._d().executeSql(s,p,r=>o(r),e=>e))},
	
	// ===== AES加解密 =====
	// 导入密钥
	async _k(){return await crypto.subtle.importKey('raw',new TextEncoder().encode(this.O.key),'AES-CBC',false,['encrypt','decrypt'])},
	// ArrayBuffer转Base64
	_b2(b){return btoa(String.fromCharCode(...new Uint8Array(b)))},
	// Base64转ArrayBuffer
	_a2(s){return Uint8Array.from(atob(s),c=>c.charCodeAt(0)).buffer},
	// 加密
	async _E(t){const k=await this._k(),i=new TextEncoder().encode(this.O.iv);return this._b2(await crypto.subtle.encrypt({name:'AES-CBC',iv:i},k,new TextEncoder().encode(t)))},
	// 解密
	async _D(t){const k=await this._k(),i=new TextEncoder().encode(this.O.iv);return new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-CBC',iv:i},k,this._a2(t)))},
	
	// ===== HTTP请求 =====
	// 通用请求
	async _R(p,m,d){const h={'Authorization':'Basic '+btoa(this.O.user+':'+this.O.pswd)};if(d)h['Content-Type']='application/octet-stream';const r=await fetch(this.O.url+this.O.folder+'/'+p,{method:m,headers:h,body:d||null});if(!r.ok)throw new Error(r.status);const t=await r.text();return t||''},
	
	// ===== 线上list.txt操作 =====
	// 加载list.txt解析为{id:文件名}
	async _L(){try{const t=await this._R(this.O.list,'GET');if(!t)return{};const m={};t.trim().split(' ').forEach(s=>{const p=s.split(':');if(p.length===2)m[p[0]]=p[1];});return m}catch(e){return{}}},
	// 保存list.txt
	async _W(m){const s=Object.entries(m).map(([k,v])=>k+':'+v).join(' ');await this._R(this.O.list,'PUT',s)},
	
	// ===== 线上记录文件操作 =====
	// 上传记录文件
	async _P(id,o){const n=id+'.json';await this._R(n,'PUT',await this._E(JSON.stringify(o)));return n},
	// 下载记录文件
	async _G(n){return JSON.parse(await this._D(await this._R(n,'GET')))},
	// 删除远程文件
	async _X(n){try{await this._R(n,'DELETE')}catch(e){}},
	
	// ===== 文件读写 =====
	// 读取本地文件
	async _F(src){if(!src)return null;if(src.startsWith('http://')||src.startsWith('https://')){const r=await fetch(src);return r.ok?new Uint8Array(await r.arrayBuffer()):null}const r=await fetch(src);return r.ok?new Uint8Array(await r.arrayBuffer()):null},
	// 上传文件到线上
	async _U(d,n){await this._R('files/'+n,'PUT',d);return this.O.url+this.O.folder+'/files/'+n},
	
	// ===== 图片/附件处理 =====
	// 处理单张图片
	async _I(s,id,i){if(!s||s.startsWith(this.O.url+this.O.folder))return s||'';const d=await this._F(s);if(!d)return s;const e=s.includes('.')?s.slice(s.lastIndexOf('.')):'.jpg';return await this._U(d,'img_'+id+'_'+i+e)},
	// 处理单个附件
	async _H(s,id,i){if(!s||s.startsWith(this.O.url+this.O.folder))return s||'';const d=await this._F(s);if(!d)return s;let n=s,e='.bin';if(n.includes('/'))n=n.slice(n.lastIndexOf('/')+1);if(n.includes('.'))e=n.slice(n.lastIndexOf('.'));return await this._U(d,'file_'+id+'_'+i+e)},
	// 清理旧文件
	async _C(oi,of){for(const s of(oi||[]))if(s&&s.startsWith(this.O.url+this.O.folder))await this._X(s.replace(this.O.url+this.O.folder+'/files/','files/'));for(const s of(of||[]))if(s&&s.startsWith(this.O.url+this.O.folder))await this._X(s.replace(this.O.url+this.O.folder+'/files/','files/'))},
	// 打包上传(先删旧再传新)
	async _K(o,oi,of){const id=o.id||0;await this._C(oi,of);if(o.imgs&&o.imgs.length){const ni=[];for(let j=0;j<o.imgs.length;j++)ni.push(await this._I(o.imgs[j],id,j));o.imgs=ni}if(o.files&&o.files.length){const nf=[];for(let j=0;j<o.files.length;j++)nf.push(await this._H(o.files[j],id,j));o.files=nf}return o},
	// 插入时不加密(从线上恢复用)
	async _J(o){const T=this.O.tb;const e=await this._s(`SELECT id FROM ${T} WHERE id=?`,[o.id]);if(e.rows.length>0)await this._s(`UPDATE ${T} SET title=?,content=?,mood=?,tags=?,imgs=?,files=?,lat=?,lng=?,addr=?,at=? WHERE id=?`,[o.title||'',o.content||'',o.mood||'',o.tags||'',JSON.stringify(o.imgs||[]),JSON.stringify(o.files||[]),o.lat||0,o.lng||0,o.addr||'',o.at||String(Date.now()),o.id]);else await this._s(`INSERT INTO ${T}(id,title,content,mood,tags,imgs,files,lat,lng,addr,at)VALUES(?,?,?,?,?,?,?,?,?,?,?)`,[o.id,o.title||'',o.content||'',o.mood||'',o.tags||'',JSON.stringify(o.imgs||[]),JSON.stringify(o.files||[]),o.lat||0,o.lng||0,o.addr||'',o.at||String(Date.now())])},
	
	// ===== 解析行数据 =====
	async _Y(r){if(r.imgs)r.imgs=JSON.parse(r.imgs);if(r.files)r.files=JSON.parse(r.files);try{r.content=await this._D(r.content)}catch(e){}return r},
	
	// 初始化数据库
	async init(){return await this._s(`CREATE TABLE IF NOT EXISTS ${this.O.tb}(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,content TEXT,mood TEXT,tags TEXT,imgs TEXT DEFAULT '[]',files TEXT DEFAULT '[]',lat REAL,lng REAL,addr TEXT,at TEXT)`)},
	// 获取配置
	cfg(){return this.O},
	// 设置配置
	setCfg(o){Object.assign(this.O,o)},
	// 获取线上ID列表或下载指定记录
	async lone(id){if(!id||id<=0){const m=await this._L();return Object.keys(m).map(Number)}else{const m=await this._L();const n=m[id];if(!n)return[];const r=await this._G(n);r.id=id;await this._J(r);return[r]}},
	// 保存记录(第三个参数true时同步线上)
	async save(o,ins=true,sync=false){const T=this.O.tb,now=String(Date.now()),ct=await this._E(o.content||'');if(o.id>0){const e=await this._s(`SELECT id FROM ${T} WHERE id=?`,[o.id]);if(e.rows.length>0)await this._s(`UPDATE ${T} SET title=?,content=?,mood=?,tags=?,imgs=?,files=?,lat=?,lng=?,addr=?,at=? WHERE id=?`,[o.title||'',ct,o.mood||'',o.tags||'',JSON.stringify(o.imgs||[]),JSON.stringify(o.files||[]),o.lat||0,o.lng||0,o.addr||'',now,o.id]);else{if(!ins)throw new Error('记录 '+o.id+' 不存在');const r=await this._s(`INSERT INTO ${T}(title,content,mood,tags,imgs,files,lat,lng,addr,at)VALUES(?,?,?,?,?,?,?,?,?,?)`,[o.title||'',ct,o.mood||'',o.tags||'',JSON.stringify(o.imgs||[]),JSON.stringify(o.files||[]),o.lat||0,o.lng||0,o.addr||'',now]);o.id=r.insertId}}else{const r=await this._s(`INSERT INTO ${T}(title,content,mood,tags,imgs,files,lat,lng,addr,at)VALUES(?,?,?,?,?,?,?,?,?,?)`,[o.title||'',ct,o.mood||'',o.tags||'',JSON.stringify(o.imgs||[]),JSON.stringify(o.files||[]),o.lat||0,o.lng||0,o.addr||'',now]);o.id=r.insertId}if(sync){const oi=o.imgs||[],of=o.files||[];await this._K(o,oi,of);const n=await this._P(o.id,o);const m=await this._L();m[o.id]=n;await this._W(m)}return await this.one(o.id)},
	// 删除记录(第二个参数true时同步删除线上)
	async remove(ids,sync=false){if(!Array.isArray(ids))ids=[ids];for(const id of ids){await this._s(`DELETE FROM ${this.O.tb} WHERE id=?`,[id]);if(sync){const m=await this._L();const n=m[id];if(n){await this._X(n);delete m[id];await this._W(m)}}}},
	// 分页查询
	async page(q={},pg=1,sz=20){const T=this.O.tb;let w='WHERE 1=1',p=[];if(q.kw){w+=' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';const k='%'+q.kw+'%';p.push(k,k,k)}if(q.mood){w+=' AND mood=?';p.push(q.mood)}if(q.tags){const ts=q.tags.split(',');w+=' AND (';ts.forEach((t,i)=>{if(i>0)w+=' OR ';w+='tags LIKE ?';p.push('%'+t.trim()+'%')});w+=')'}if(q.start){w+=' AND at>=?';p.push(q.start)}if(q.end){w+=' AND at<=?';p.push(q.end)}const tr=await this._s(`SELECT COUNT(*) as c FROM ${T} ${w}`,p);const total=tr.rows.item(0).c;const r=await this._s(`SELECT * FROM ${T} ${w} ORDER BY at DESC LIMIT ? OFFSET ?`,[...p,sz,(pg-1)*sz]);const a=[];for(let i=0;i<r.rows.length;i++)a.push(await this._Y(r.rows.item(i)));return{data:a,total,page:pg,size:sz}},
	// 获取单条
	async one(id){const r=await this._s(`SELECT * FROM ${this.O.tb} WHERE id=?`,[id]);if(r.rows.length===0)return{};return await this._Y(r.rows.item(0))},
	// 获取多条
	async multi(ids){const a=[];for(const id of ids)a.push(await this.one(id));return a},
	// 那年今日
	async memory(){const a=[],n=new Date();for(let i=1;i<=10;i++){const y=n.getFullYear()-i,md=(n.getMonth()+1).toString().padStart(2,'0')+'-'+n.getDate().toString().padStart(2,'0');const r=await this._s(`SELECT * FROM ${this.O.tb} WHERE at LIKE ? ORDER BY at DESC`,['%'+md+'%']);if(r.rows.length>0){const d=[];for(let j=0;j<r.rows.length;j++)d.push(await this._Y(r.rows.item(j)));a.push(d)}}return a},
	// 清空(t:0=全部 1=本地 2=线上)
	async clear(t=0){const T=this.O.tb;if(t===0||t===1)await this._s(`DELETE FROM ${T}`);if(t===0||t===2){const m=await this._L();for(const n of Object.values(m))await this._X(n);await this._W({})}},
	// 导出(range:[开始时间戳,结束时间戳], fmt:"json"|"pdf")
	async exp(range,fmt){const r=await this.page({},1,100000);const list=r.data.filter(o=>{const at=parseInt(o.at);return at>=range[0]&&at<=range[1]});const fn=range[0]+'-'+range[1];const blob=new Blob([JSON.stringify(list)],{type:'application/json'});return await this._saveFile(blob,fn+'.'+fmt)},
	// 统计
	async summary(){const T=this.O.tb,r=await this._s(`SELECT imgs,files,content,at FROM ${T}`);let ic=0,fc=0,len=0;const ds=new Set(),hh={};for(let i=0;i<r.rows.length;i++){const row=r.rows.item(i);try{ic+=JSON.parse(row.imgs||'[]').length}catch(e){}try{fc+=JSON.parse(row.files||'[]').length}catch(e){}try{len+=(row.content||'').length}catch(e){}try{const d=new Date(parseInt(row.at));ds.add(d.getFullYear()+'-'+(d.getMonth()+1).toString().padStart(2,'0')+'-'+d.getDate().toString().padStart(2,'0'));const h=d.getHours();hh[h]=(hh[h]||0)+1}catch(e){}}let s=0,now=new Date();while(true){const d=now.getFullYear()+'-'+(now.getMonth()+1).toString().padStart(2,'0')+'-'+now.getDate().toString().padStart(2,'0');if(ds.has(d)){s++;now.setDate(now.getDate()-1)}else break}let pk=0;for(const v of Object.values(hh))if(v>pk)pk=v;return{count:r.rows.length,days:ds.size,streak:s,icount:ic,fcount:fc,lavg:r.rows.length>0?Math.floor(len/r.rows.length):0,peak:pk}},
	// 保存文件到下载目录
	async _saveFile(blob,name){return new Promise((ok,err)=>{const fe=window.cordova?cordova.file.externalRootDirectory+'Download/':'';window.resolveLocalFileSystemURL(fe,dir=>{dir.getFile(name,{create:true},file=>{file.createWriter(w=>{w.onwriteend=()=>ok(file.nativeURL);w.onerror=err;w.write(blob)})},err)},err)})},


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
		const gbox=$O.$('grid').html(''),{streak,count,days,icount,fcount,peak,lavg}=await IX.summary().catch(e=>{
			log('统计失败',e,'error')
			return {streak:0,count:0,days:0,count:0,fcount:0,lavg:0,peak:0}
		})
		gbox.html(`
		<grid-c summary>
			<div streak x='当前持续天数：'>${streak}</div><div days x='记录总天数：'>${days}</div><div count x='记录总数：'>${count}</div>
			<div icount x='图片总数：'>${icount}</div><div fcount x='附件总数：'>${fcount}</div>
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

		const s=await IX.page({},me,30).then(_=>_.list)
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
		const I=me.ga('I'),o=await IX.remove(parseInt(I),true)
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
		const {id,at}=await IX.save({title,content,mood,tags,imgs},false,true)
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
			const s=await IX.lone()
			log(`初始数据，线上记录文件清单:`,s)
			for(const id of s){
				const o=await IX.lone(id)
				const r=await IX.save(o,true,false)
				log(`初始数据，恢复记录 ${id}:`,o,r)
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
