(function(W){
	'use strict';

	document.addEventListener('backbutton',()=>{
		if(!W.IX||W.IX.name=='home')return navigator.app.exitApp()
		const modal=$O.$('modal')
		if(modal&&!modal.ha('hide')){
			if(typeof W.IX.modal_close=='function')return W.IX.modal_close()
			return navigator.app.exitApp()
		}
		if(W.CF)W.CF()
		Object.values(typeof W.IX.observer=='object'?W.IX.observer:{}).forEach(_=>{
			_.disconnect()
			_=null
		})
		const sk=`<sk w100 p30 pt60 f fv g30><sk q r73></sk><sk q r73></sk><sk q h110></sk><sk b w80 h12></sk><sk b w50 h12></sk></sk>`
		$O.$('head>style[ix]').innerHTML=''
		$O.body.html(sk+($O.$('#w_logs')?.html(true)||''))
		Array.from($O.$$('head>script[ix]')).forEach(_=>_.remove())
		$O.head.appendChild($O.node('script',{ix:'',src:`./js/home.js?_=${crypto.randomUUID()}`}))
	},false)

	W._NM={fetch:W.fetch,Request:W.Request,Headers:W.Headers,Response:W.Response,XMLHttpRequest:W.XMLHttpRequest}
	const SM={100:'Continue',101:'Switching Protocols',200:'OK',201:'Created',
		202:'Accepted',204:'No Content',206:'Partial Content',
		301:'Moved Permanently',302:'Found',303:'See Other',304:'Not Modified',
		307:'Temporary Redirect',308:'Permanent Redirect',400:'Bad Request',
		401:'Unauthorized',403:'Forbidden',404:'Not Found',405:'Method Not Allowed',
		406:'Not Acceptable',408:'Request Timeout',409:'Conflict',410:'Gone',
		412:'Precondition Failed',416:'Range Not Satisfiable',429:'Too Many Requests',
		500:'Internal Server Error',501:'Not Implemented',502:'Bad Gateway',
		503:'Service Unavailable',504:'Gateway Timeout'
	},H=()=>{
		const x=cordova.plugin
		x.http.setFollowRedirect(true)
		x.http.setRequestTimeout(600)
		x.http.setConnectTimeout(600)
		x.http.setServerTrustMode('nocheck',_=>null,_=>null)
		return x.http
	},B=(_,h)=>{
		if(_===null||_===undefined)return null
		const x=Object.keys(h).find(k=>k.toLowerCase()=='content-type')
		if(typeof _=='string')return{data:_,serializer:'utf8'}
		if(_ instanceof ArrayBuffer)return{data:_,serializer:'raw'}
		if(ArrayBuffer.isView(_))return{data:_.buffer.slice(_.byteOffset,_.byteOffset+_.byteLength),serializer:'raw'}
		if(typeof URLSearchParams!='undefined'&&_ instanceof URLSearchParams){
			if(!x)h['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
			return{data:_.toString(),serializer:'utf8'}
		}
		if(typeof FormData!='undefined'&&_ instanceof FormData){
			if(!x)h['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
			return{data:new URLSearchParams(_).toString(),serializer:'utf8'}
		}
		if(typeof _=='object'){
			if(!x)h['Content-Type']='application/json;charset=UTF-8'
			return{data:_,serializer:'json'}
		}
		return{data:String(_),serializer:'utf8'}
	},E=(o,s)=>{
		const a={},b={}
		s.forEach(k=>{
			a[k]=[]
			b[k]=null
			Object.defineProperty(o,'on'+k,{
				enumerable:true,configurable:true,
				get:()=>b[k],set:v=>(b[k]=(typeof v=='function')?v:null)
			})
		})
		o.addEventListener=(k,f,m)=>{
			if(!a[k])a[k]=[]
			if(a[k].indexOf(f)==-1)a[k].push(f)
		}
		o.removeEventListener=(k,f,m)=>{
			if(!a[k])return;
			a[k]=a[k].filter(_=>_!==f)
		}
		o.dispatchEvent=e=>{
			const k=e.type,c=b[k],x=a[k]
			if(c)c.call(o,e)
			if(x&&x.length)x.slice().forEach(f=>f.call(o,e))
			return true
		}
		o._fire=(k,m)=>o.dispatchEvent(Object.assign({
			type:k,target:o,currentTarget:o,bubbles:false,cancelable:false,
			loaded:0,total:0,lengthComputable:false,timeStamp:Date.now()
		},m||{}))
	}

	function HS(o){
		this.s={}
		if(!o)return
		if(o instanceof HS){
			const s=o.s
			for(let k in s)this.s[k]=s[k]
		}else if(Array.isArray(o)){
			for(let [k,v] of o)this.s[k]=v
		}else if(typeof o=='object')for(let k in o)this.s[k]=o[k]
	}
	const _HS=HS.prototype,HI=s=>{
		let i=0
		return{next:()=>(i<s.length?{value:s[i++],done:false}:{done:true})}
	}
	_HS.append=function(k,v){
		k=k.toLowerCase()
		if(this.s[k])this.s[k]+=', '+String(v)
		else this.s[k]=String(v)
	}
	_HS.set=function(k,v){this.s[k.toLowerCase()]=String(v)}
	_HS.get=function(k){return this.s[k.toLowerCase()]||null}
	_HS.has=function(k){return k.toLowerCase() in this.s}
	_HS.delete=function(k){delete this.s[k.toLowerCase()]}
	_HS.forEach=function(fn,o){for(let k in this.s)fn.call(o,this.s[k],k)}
	_HS.keys=function(){
		const o=Object.keys(this.s)
		return o[Symbol.iterator]?o[Symbol.iterator]():HI(o)
	}
	_HS.values=function(){
		const o=Object.keys(this.s).map(_=>this.s[_])
		return o[Symbol.iterator]?o[Symbol.iterator]():HI(o)
	}
	_HS.entries=function(){
		const o=Object.keys(this.s).map(k=>([k,this.s[k]]))
		return o[Symbol.iterator]?o[Symbol.iterator]():HI(o)
	}
	if(typeof Symbol!='undefined'&&Symbol.iterator)_HS[Symbol.iterator]=_HS.entries
	_HS.toPlain=function(){return this.s}

	function RQ(_,o){
		if(!W.IX)W.IX={}
		if(!_T(W.IX.fetch_abort_controllers,'object'))W.IX.fetch_abort_controllers={}

		o=o||{}
		this._k=crypto.randomUUID()
		const x=(_ instanceof RQ)?_:null
		this.url=x?x.url:String(_)
		this.method=((o.method||(x&&x.method)||'GET')).toUpperCase()
		if((this.method=='GET'||this.method=='HEAD')&&(o.body!==undefined&&o.body!==null))throw new TypeError(this.method+' cannot have a body')
		this.headers=new HS(o.headers||(x&&x.headers)||{})
		this._rawBody=(o.body!==undefined)?o.body:(x?x._rawBody:null)
		this.mode=o.mode||(x&&x.mode)||'cors'
		this.credentials=o.credentials||(x&&x.credentials)||'same-origin'
		this.cache=o.cache||(x&&x.cache)||'default'
		this.redirect=o.redirect||(x&&x.redirect)||'follow'
		this._abc=new AbortController()
		this.signal=this._abc.signal
		const timeout=x?.timeout||o.timeout||0
		this._sto=timeout>0?setTimeout(()=>{
			if(!this.signal.aborted)this._abc.abort()
			if(this._k in W.IX.fetch_abort_controllers)delete W.IX.fetch_abort_controllers[this._k]
		},(timeout+1)*1000):0
		this.bodyUsed=false
		W.IX.fetch_abort_controllers[this._k]=this
	}
	RQ.prototype.clone=function(){
		if(this.bodyUsed)throw new TypeError('body has already been consumed')
		return new RQ(this,{})
	}

	function RP(_,o){
		o=o||{}
		this.status=o.status!==undefined?o.status:200
		this.statusText=o.statusText!==undefined?o.statusText:SM[this.status]||''
		this.ok=this.status>=200&&this.status<=299
		this.headers=(o.headers instanceof HS)?o.headers:new HS(o.headers||{})
		this.url=o.url||''
		this.redirected=!!o.redirected
		this.type=o.type||'basic'
		this.bodyUsed=false
		this._raw=(_ instanceof ArrayBuffer)?_:new ArrayBuffer(0)
	}
	const _RP=RP.prototype
	_RP._consume=function(){
		if(this.bodyUsed)return Promise.reject(new TypeError('body has already been consumed'))
		this.bodyUsed=true
		return Promise.resolve(this._raw)
	}
	_RP.arrayBuffer=function(){return this._consume()}
	_RP.text=function(){
		const m=(this.headers.get('Content-Type')||'').match(/charset=([^\s;]+)/i),c=m?m[1]:'utf-8'
		return this._consume().then(_=>{
			try{return new TextDecoder(c||'utf-8').decode(new Uint8Array(_))}catch(e){
				let s=new Uint8Array(_),o=''
				for(let i=0;i<s.length;i++)o+=String.fromCharCode(s[i])
				return o
			}
		})
	}
	_RP.json=function(){return this.text().then(_=>JSON.parse(_||'null'))}
	_RP.blob=function(){return this._consume().then(_=>new Blob([_],{type:(this.headers.get('Content-Type')||'application/octet-stream').split(';')[0].trim()}))}
	_RP.clone=function(){
		if(this.bodyUsed)throw new TypeError('body has already been consumed')
		return new RP(this._raw.slice(0),{
			status:this.status,statusText:this.statusText,
			headers:new HS(this.headers),
			url:this.url,redirected:this.redirected,type:this.type
		})
	}
	RP.error=()=>{
		const o=new RP(null,{status:0,statusText:''})
		o.type='error';o.ok=false;return o
	}
	RP.redirect=(Location,status)=>new RP(null,{status:status||302,headers:new HS({Location})})

	function FC(_,o){
		return new Promise(function(Y,N){
			let R;try{R=new RQ(_,o)}catch(e){N(e);return}
			const ks=W.IX&&IX.fetch_abort_controllers?Object.keys(IX.fetch_abort_controllers).filter(_=>_!=R._k):[]
			if(ks.length>5)for(let i=0;i<ks.length-5;i++){
				const k=ks[i],c=IX.fetch_abort_controllers[k],o=c._abc,t=c._sto
				if(t>0)clearTimeout(t)
				IX.fetch_abort_controllers[k]._sto=0
				if(!o.signal.aborted)o.abort()
				delete W.IX.fetch_abort_controllers[k]
			}
			const signal=R.signal,_k=R._k,sto=R._sto
			if(signal&&signal.aborted){N(new DOMException('The operation was aborted.','AbortError'));return}
			const http=H(),headers=R.headers.toPlain(),body=B(R._rawBody,headers),X={
				method:R.method.toLowerCase(),headers,
				responseType:'arraybuffer',followRedirect:true,
				timeout:600,connectTimeout:600
			}
			if(body){X.data=body.data;X.serializer=body.serializer}
			let onAbort=null
			log('网络请求',R.url,X,'debug')
			const I=http.sendRequest(R.url,X,o=>{
				if(sto>0)clearTimeout(sto)
				if(W.IX&&W.IX.fetch_abort_controllers&&_k in W.IX.fetch_abort_controllers)delete W.IX.fetch_abort_controllers[_k]
				if(signal&&onAbort)signal.removeEventListener('abort',onAbort)
				if(signal&&signal.aborted){
					N(new DOMException('The operation was aborted.','AbortError'))
					return
				}
				log('请求成功','success')
				
				Y(new RP((o.data instanceof ArrayBuffer)?o.data:new ArrayBuffer(0),{
					status:o.status,statusText:SM[o.status]||'',url:o.url||R.url,
					headers:new HS(o.headers||{}),redirected:!!(o.url&&o.url!==R.url)
				}))
			},o=>{
				if(sto>0)clearTimeout(sto)
				if(W.IX&&W.IX.fetch_abort_controllers&&_k in W.IX.fetch_abort_controllers)delete W.IX.fetch_abort_controllers[_k]
				if(signal&&onAbort)signal.removeEventListener('abort',onAbort)
				if(o.status==-8||(signal&&signal.aborted)){
					N(new DOMException('The operation was aborted.','AbortError'))
					return
				}
				log('请求失败',o,'error')
				
				if(o.status>0){
					let ao,ae=o.error||''
					if(typeof TextEncoder!='undefined')ao=new TextEncoder().encode(o.error||'').buffer
					else{
						const ax=new Uint8Array(ao=new ArrayBuffer(ae.length))
						for(let i=0;i<ae.length;i++)ax[i]=ae.charCodeAt(i)&0xff
					}
					Y(new RP(ao,{url:R.url,status:o.status,statusText:SM[o.status]||'',headers:new HS(o.headers||{})}))
				}else if(o.status==-2){
					N(new DOMException('The operation timed out.','TimeoutError'))
				}else N(new TypeError('Network request failed (status '+o.status+'): '+(o.error||'')))
			})
			if(signal)signal.addEventListener('abort',(onAbort=()=>{
				http.abort(I,()=>null,()=>null)
				log(R._sto>0?'请求超时':'请求中断','error')
				N(new DOMException('The operation was aborted.','AbortError'))
			}))
		})
	}

	function XU(){E(this,['loadstart','progress','abort','error','load','timeout','loadend'])}
	function XR(){
		this.upload=new XU()
		this.withCredentials=false
		this.response=this.responseXML=null
		this.readyState=this.status=this.timeout=0
		this.statusText=this.responseURL=this.responseType=''

		this._qh={}
		this._ph={}
		this._async=true
		this._url=this._rt=''
		this._method='GET'
		this._canceled=false
		this._loaded=this._total=0
		this._user=this._pass=this._mime=this._id=null

		E(this,['readystatechange','loadstart','progress','abort','error','load','timeout','loadend'])
	}
	XR.UNSENT=0;XR.OPENED=1;XR.HEADERS_RECEIVED=2;XR.LOADING=3;XR.DONE=4
	const _XR=XR.prototype,_BF=_=>{
		if(_ instanceof ArrayBuffer)return _
		if(_&&ArrayBuffer.isView(_))return _.buffer.slice(_.byteOffset,_.byteOffset+_.byteLength)
		return new ArrayBuffer(0)
	}
	_XR.UNSENT=0;_XR.OPENED=1;_XR.HEADERS_RECEIVED=2;_XR.LOADING=3;_XR.DONE=4
	Object.defineProperty(_XR,'responseText',{
		enumerable:true,configurable:true,set:function(_){this._rt=_},
		get:function(){return(this.responseType==''||this.responseType=='text')?(this._rt||''):''}
	})
	_XR._ss=function(_){this.readyState=_;this._fire('readystatechange')}
	_XR.open=function(method,url,async,user,pass){
		this._url=url
		this._method=(method||'GET').toUpperCase()
		this._canceled=this.readyState>0&&this.readyState<4
		this._async=(async===undefined||async===null)?true:!!async
		this._user=user||null
		this._pass=pass||null
		this._qh={};this._ph={}
		this._loaded=this._total=this.status=0
		this.statusText=this._rt=this.responseURL=''
		this._id=this.response=this.responseXML=null
		this._ss(1)
	}
	_XR.setRequestHeader=function(k,v){
		if(this.readyState!==1)throw new DOMException('setRequestHeader requires OPENED state','InvalidStateError')
		this._qh[k]=this._qh[k]?this._qh[k]+', '+String(v):String(v)
	};
	_XR.overrideMimeType=function(_){this._mime=_}
	_XR.getResponseHeader=function(_){
		let k=_.toLowerCase(),o=null
		Object.keys(this._ph).forEach(x=>(x.toLowerCase()==k)&&(o=this._ph[x]))
		return o
	}
	_XR.getAllResponseHeaders=function(){
		if(this.readyState<2)return ''
		return Object.keys(this._ph).map(_=>(_.toLowerCase()+': '+this._ph[_])).join('\r\n')
	}
	_XR.abort=function(){
		if(this.readyState==0||this.readyState==4)return
		this._canceled=true
		if(this._id!==null){
			try{H().abort(this._id,()=>null,()=>null)}catch(e){}
			this._id=null
		}
		this.response=this.responseXML=null
		this.status=0;this.statusText=this._rt=''
		const m={loaded:this._loaded,total:this._total,lengthComputable:this._total>0}
		this.readyState=4
		this._fire('readystatechange')
		this._fire('abort',m)
		this.upload._fire('abort',m)
		this._fire('loadend',m)
		this.readyState=0
	}
	_XR.send=function(_){
		if(this.readyState!==1)throw new DOMException('send requires OPENED state','InvalidStateError')
		if(this._canceled)return
		const self=this,http=H(),rt=this.responseType||'',headers=Object.assign({},this._qh)
		if(self._user)headers['Authorization']='Basic '+btoa(self._user+':'+(self._pass||''))
		const body=B(_,headers),X={
			method:self._method.toLowerCase(),headers,
			responseType:(rt=='arraybuffer'||rt=='blob')?'arraybuffer':'text',
			timeout:(self.timeout>0)?(self.timeout/1000):5,
			followRedirect:true
		}
		if(body){X.data=body.data;X.serializer=body.serializer}
		const m={loaded:0,total:0,lengthComputable:false}
		self._fire('loadstart',m)
		self.upload._fire('loadstart',m)
		if(self._canceled)return
		self._ss(2);self._ss(3)
		self._id=http.sendRequest(self._url,X,o=>{
			if(self._canceled)return
			self._id=null
			self.status=o.status
			self.statusText=SM[o.status]||''
			self.responseURL=o.url||self._url
			self._ph=o.headers||{}
			const cl=self.getResponseHeader('Content-Length')
			self._total=(cl&&parseInt(cl,10)>0)?parseInt(cl,10):0
			let data=o.data,loaded=0
			if(rt=='arraybuffer'){
				self._rt=''
				self.response=_BF(data)
				loaded=self.response.byteLength
			}else if(rt=='blob'){
				self._rt=''
				const x=_BF(data)
				loaded=x.byteLength
				self.response=new Blob([x],{type:(self._mime||self.getResponseHeader('Content-Type')||'application/octet-stream').split(';')[0].trim()})
			}else if(rt=='json'){
				self._rt=typeof data=='string'?data:(data==null?'null':JSON.stringify(data))
				try{self.response=JSON.parse(self._rt)}catch(e){self.response=null}
				loaded=self._rt.length
			}else if(rt=='document'){
				self._rt=typeof data=='string'?data:''
				try{
					self.response=self.responseXML=new DOMParser().parseFromString(self._rt,(self._mime||self.getResponseHeader('Content-Type')||'text/html').split(';')[0].trim())
				}catch(e){self.response=null}
				loaded=self._rt.length
			}else{
				self._rt=self.response=typeof data=='string'?data:(data==null?'':String(data))
				loaded=self._rt.length
			}
			self._loaded=loaded
			if(!self._total||self._total<loaded)self._total=loaded
			self._ss(4)
			const m={loaded:self._loaded,total:self._total,lengthComputable:self._total>0}
			self._fire('progress',m);self.upload._fire('progress',m);self.upload._fire('load',m)
			self.upload._fire('loadend',m);self._fire('load',m);self._fire('loadend',m)
		},o=>{
			if(self._canceled)return
			self._id=null
			self._ph=o.headers||{}
			self.responseURL=self._url
			if(o.status==-8)return
			if(o.status>0){
				self.status=o.status
				self.statusText=SM[o.status]||''
				if(rt===''||rt=='text')self._rt=self.response=o.error||''
				else{self.response=null;self._rt=''}
				self._ss(4)
				const m={loaded:0,total:0,lengthComputable:false}
				self._fire('progress',m);self._fire('load',m);self._fire('loadend',m)
			}else if((o.status==-2)||(o.status==-1&&self.timeout>0)||o.status==408){
				self.statusText=self._rt=''
				self.response=null
				self.status=0
				self._ss(4);
				const m={loaded:self._loaded,total:self._total,lengthComputable:false}
				self._fire('timeout',m);self.upload._fire('timeout',m);self._fire('loadend',m)
			}else{
				self.statusText=self._rt=''
				self.response=null
				self.status=0
				self._ss(4)
				const m={loaded:self._loaded,total:self._total,lengthComputable:false}
				self._fire('error',m);self.upload._fire('error',m);self._fire('loadend',m)
			}
		})
	}
	W.ofetch=W.fetch
	W.fetch=FC
	W.Headers=HS
	W.Request=RQ
	W.Response=RP
	W.XMLHttpRequest=XR
	W.CF=()=>{
		const ks=W.IX&&W.IX.fetch_abort_controllers?Object.keys(W.IX.fetch_abort_controllers):[]
		for(let i=0;i<ks.length;i++){
			const k=ks[i],c=W.IX.fetch_abort_controllers[k],o=c._abc,t=c._sto
			if(t>0)clearTimeout(t)
			W.IX.fetch_abort_controllers[k]._sto=0
			if(!o.signal.aborted)o.abort()
			delete W.IX.fetch_abort_controllers[k]
		}
	}

	W.$O=document // 简化 document

	W.run=(g,n,i)=>(W.I===i&&W[g]&&W[g][n]&&(typeof W[g][n]=='function')?W[g][n]:(_=>{})) // 自定义方法校验

	// 本地缓存操作
	String.prototype.gc=function(_=null){return JSON.parse(localStorage.getItem(this.trim())||'null')||_}
	String.prototype.sc=function(){if(arguments.length>0)localStorage.setItem(this.trim(),JSON.stringify(arguments[0]))}
	String.prototype.hc=function(){return localStorage.hasOwnProperty(this.trim())}
	String.prototype.dc=function(){this.hc()&&localStorage.removeItem(this.trim())}

	// 繁简转换
	String.prototype.f2j=function(){
		const ps={'一目瞭然':'一目了然','上鍊':'上链','不瞭解':'不了解','么麼':'幺麽','么麽':'幺麽','乾乾淨淨':'干干净净','乾乾脆脆':'干干脆脆','乾元':'乾元','乾卦':'乾卦','乾嘉':'乾嘉','乾圖':'乾图','乾坤':'乾坤','乾坤一擲':'乾坤一掷','乾坤再造':'乾坤再造','乾坤大挪移':'乾坤大挪移','乾宅':'乾宅','乾斷':'乾断','乾旦':'乾旦','乾曜':'乾曜','乾清宮':'乾清宫','乾盛世':'乾盛世','乾紅':'乾红','乾綱':'乾纲','乾縣':'乾县','乾象':'乾象','乾造':'乾造','乾道':'乾道','乾陵':'乾陵','乾隆':'乾隆','乾隆年間':'乾隆年间','乾隆皇帝':'乾隆皇帝','二噁英':'二𫫇英','以免藉口':'以免借口','以功覆過':'以功复过','侔德覆載':'侔德复载','傢俱':'家具','傷亡枕藉':'伤亡枕藉','八濛山':'八濛山','凌藉':'凌借','出醜狼藉':'出丑狼藉','函覆':'函复','千鍾粟':'千锺粟','反反覆覆':'反反复复','反覆':'反复','反覆思維':'反复思维','反覆思量':'反复思量','反覆性':'反复性','名覆金甌':'名复金瓯','哪吒':'哪吒','回覆':'回复','壺裏乾坤':'壶里乾坤','大目乾連冥間救母變文':'大目乾连冥间救母变文','宫商角徵羽':'宫商角徵羽','射覆':'射复','尼乾陀':'尼乾陀','幺麼':'幺麽','幺麼小丑':'幺麽小丑','幺麼小醜':'幺麽小丑','康乾':'康乾','張法乾':'张法乾','彷彿':'仿佛','彷徨':'彷徨','徵弦':'徵弦','徵絃':'徵弦','徵羽摩柯':'徵羽摩柯','徵聲':'徵声','徵調':'徵调','徵音':'徵音','情有獨鍾':'情有独钟','憑藉':'凭借','憑藉着':'凭借着','手鍊':'手链','扭轉乾坤':'扭转乾坤','找藉口':'找借口','拉鍊':'拉链','拉鍊工程':'拉链工程','拜覆':'拜复','據瞭解':'据了解','文錦覆阱':'文锦复阱','於世成':'於世成','於乎':'於乎','於仲完':'於仲完','於倫':'於伦','於其一':'於其一','於則':'於则','於勇明':'於勇明','於呼哀哉':'於呼哀哉','於單':'於单','於坦':'於坦','於崇文':'於崇文','於忠祥':'於忠祥','於惟一':'於惟一','於戲':'於戏','於敖':'於敖','於梨華':'於梨华','於清言':'於清言','於潛':'於潜','於琳':'於琳','於穆':'於穆','於竹屋':'於竹屋','於菟':'於菟','於邑':'於邑','於陵子':'於陵子','旋乾轉坤':'旋乾转坤','旋轉乾坤':'旋转乾坤','旋轉乾坤之力':'旋转乾坤之力','明瞭':'明了','明覆':'明复','書中自有千鍾粟':'书中自有千锺粟','有序':'有序','朝乾夕惕':'朝乾夕惕','木吒':'木吒','李乾德':'李乾德','李澤鉅':'李泽钜','李鍊福':'李链福','李鍾郁':'李锺郁','樊於期':'樊於期','沈沒':'沉没','沈沒成本':'沉没成本','沈積':'沉积','沈船':'沉船','沈默':'沉默','流徵':'流徵','浪蕩乾坤':'浪荡乾坤','滑藉':'滑借','無序':'无序','牴牾':'抵牾','牴觸':'抵触','狐藉虎威':'狐借虎威','珍珠項鍊':'珍珠项链','甚鉅':'甚钜','申覆':'申复','畢昇':'毕昇','發覆':'发复','瞭如':'了如','瞭如指掌':'了如指掌','瞭望':'瞭望','瞭然':'了然','瞭然於心':'了然于心','瞭若指掌':'了若指掌','瞭解':'了解','瞭解到':'了解到','示覆':'示复','神祇':'神祇','稟覆':'禀复','答覆':'答复','篤麼':'笃麽','簡單明瞭':'简单明了','籌畫':'筹划','素藉':'素借','老態龍鍾':'老态龙钟','肘手鍊足':'肘手链足','茵藉':'茵借','萬鍾':'万锺','蒜薹':'蒜薹','蕓薹':'芸薹','蕩覆':'荡复','蕭乾':'萧乾','藉代':'借代','藉以':'借以','藉助':'借助','藉助於':'借助于','藉卉':'借卉','藉口':'借口','藉喻':'借喻','藉寇兵':'借寇兵','藉寇兵齎盜糧':'借寇兵赍盗粮','藉手':'借手','藉據':'借据','藉故':'借故','藉故推辭':'借故推辞','藉方':'借方','藉條':'借条','藉槁':'借槁','藉機':'借机','藉此':'借此','藉此機會':'借此机会','藉甚':'借甚','藉由':'借由','藉着':'借着','藉端':'借端','藉端生事':'借端生事','藉箸代籌':'借箸代筹','藉草枕塊':'借草枕块','藉藉':'藉藉','藉藉无名':'藉藉无名','藉詞':'借词','藉讀':'借读','藉資':'借资','衹得':'只得','衹見樹木':'只见树木','衹見樹木不見森林':'只见树木不见森林','袖裏乾坤':'袖里乾坤','覆上':'复上','覆住':'复住','覆信':'复信','覆冒':'复冒','覆呈':'复呈','覆命':'复命','覆墓':'复墓','覆宗':'复宗','覆帳':'复帐','覆幬':'复帱','覆成':'复成','覆按':'复按','覆文':'复文','覆杯':'复杯','覆校':'复校','覆瓿':'复瓿','覆盂':'复盂','覆盆':'覆盆','覆盆子':'覆盆子','覆盤':'覆盘','覆育':'复育','覆蕉尋鹿':'复蕉寻鹿','覆逆':'复逆','覆醢':'复醢','覆醬瓿':'复酱瓿','覆電':'复电','覆露':'复露','覆鹿尋蕉':'复鹿寻蕉','覆鹿遺蕉':'复鹿遗蕉','覆鼎':'复鼎','見覆':'见复','角徵':'角徵','角徵羽':'角徵羽','計畫':'计划','變徵':'变徵','變徵之聲':'变徵之声','變徵之音':'变徵之音','貂覆額':'貂复额','買臣覆水':'买臣复水','踅門瞭戶':'踅门了户','躪藉':'躏借','郭子乾':'郭子乾','酒逢知己千鍾少':'酒逢知己千锺少','酒逢知己千鍾少話不投機半句多':'酒逢知己千锺少话不投机半句多','醞藉':'酝借','重覆':'重复','金吒':'金吒','金鍊':'金链','鈞覆':'钧复','鉅子':'钜子','鉅萬':'钜万','鉅防':'钜防','鉸鍊':'铰链','銀鍊':'银链','錢鍾書':'钱锺书','鍊墜':'链坠','鍊子':'链子','鍊形':'链形','鍊條':'链条','鍊錘':'链锤','鍊鎖':'链锁','鍛鍾':'锻锺','鍾繇':'钟繇','鍾萬梅':'锺万梅','鍾重發':'锺重发','鍾鍛':'锺锻','鍾馗':'锺馗','鎖鍊':'锁链','鐵鍊':'铁链','鑽石項鍊':'钻石项链','雁杳魚沈':'雁杳鱼沉','雖覆能復':'虽覆能复','電覆':'电复','露覆':'露复','項鍊':'项链','頗覆':'颇复','頸鍊':'颈链','顛乾倒坤':'颠乾倒坤','顛倒乾坤':'颠倒乾坤','顧藉':'顾借','麼些族':'麽些族','黄鍾公':'黄锺公','龍鍾':'龙钟'}
		const cs={'㑯':'㑔','㑳':'㑇','㑶':'㐹','㓨':'刾','㗲':'𠵾','㘚':'㘎','㜄':'㚯','㜏':'㛣','㜢':'𡞱','㠏':'㟆','㠣':'𫵷','㥮':'㤘','㩜':'㨫','㩳':'㧐','㩵':'擜','䁻':'䀥','䃮':'鿎','䊷':'䌶','䋙':'䌺','䋚':'䌻','䋹':'䌿','䋻':'䌾','䍦':'䍠','䎱':'䎬','䓣':'𬜯','䙡':'䙌','䜀':'䜧','䝼':'䞍','䡵':'𫟦','䥇':'䦂','䥑':'鿏','䥕':'𬭯','䥱':'䥾','䦛':'䦶','䦟':'䦷','䧢':'𨸟','䮄':'𫠊','䯀':'䯅','䰾':'鲃','䱷':'䲣','䱽':'䲝','䲁':'鳚','䲘':'鳤','䴉':'鹮','丟':'丢','並':'并','乾':'干','亂':'乱','亙':'亘','亞':'亚','佇':'伫','佈':'布','佔':'占','併':'并','來':'来','侖':'仑','侶':'侣','侷':'局','俁':'俣','係':'系','俔':'伣','俠':'侠','俥':'伡','俬':'私','倀':'伥','倆':'俩','倈':'俫','倉':'仓','個':'个','們':'们','倖':'幸','倫':'伦','倲':'㑈','偉':'伟','偑':'㐽','側':'侧','偵':'侦','偽':'伪','傌':'㐷','傑':'杰','傖':'伧','傘':'伞','備':'备','傢':'家','傭':'佣','傯':'偬','傳':'传','傴':'伛','債':'债','傷':'伤','傾':'倾','僂':'偻','僅':'仅','僉':'佥','僑':'侨','僕':'仆','僞':'伪','僤':'𫢸','僥':'侥','僨':'偾','僱':'雇','價':'价','儀':'仪','儁':'俊','儂':'侬','億':'亿','儈':'侩','儉':'俭','儎':'傤','儐':'傧','儔':'俦','儕':'侪','儘':'尽','償':'偿','優':'优','儲':'储','儷':'俪','儸':'㑩','儺':'傩','儻':'傥','儼':'俨','兇':'凶','兌':'兑','兒':'儿','兗':'兖','內':'内','兩':'两','冊':'册','冑':'胄','冪':'幂','凈':'净','凍':'冻','凜':'凛','凱':'凯','別':'别','刪':'删','剄':'刭','則':'则','剋':'克','剎':'刹','剗':'刬','剛':'刚','剝':'剥','剮':'剐','剴':'剀','創':'创','剷':'铲','劃':'划','劇':'剧','劉':'刘','劊':'刽','劌':'刿','劍':'剑','劏':'㓥','劑':'剂','劚':'㔉','勁':'劲','動':'动','務':'务','勛':'勋','勝':'胜','勞':'劳','勢':'势','勣':'𪟝','勩':'勚','勱':'劢','勳':'勋','勵':'励','勸':'劝','勻':'匀','匭':'匦','匯':'汇','匱':'匮','區':'区','協':'协','卹':'恤','卻':'却','卽':'即','厙':'厍','厠':'厕','厤':'历','厭':'厌','厲':'厉','厴':'厣','參':'参','叄':'叁','叢':'丛','吒':'咤','吳':'吴','吶':'呐','呂':'吕','咼':'呙','員':'员','唄':'呗','唸':'念','問':'问','啓':'启','啞':'哑','啟':'启','啢':'唡','喎':'㖞','喚':'唤','喪':'丧','喫':'吃','喬':'乔','單':'单','喲':'哟','嗆':'呛','嗇':'啬','嗊':'唝','嗎':'吗','嗚':'呜','嗩':'唢','嗶':'哔','嘆':'叹','嘍':'喽','嘓':'啯','嘔':'呕','嘖':'啧','嘗':'尝','嘜':'唛','嘩':'哗','嘮':'唠','嘯':'啸','嘰':'叽','嘵':'哓','嘸':'呒','嘽':'啴','噁':'恶','噓':'嘘','噚':'㖊','噝':'咝','噠':'哒','噥':'哝','噦':'哕','噯':'嗳','噲':'哙','噴':'喷','噸':'吨','噹':'当','嚀':'咛','嚇':'吓','嚌':'哜','嚐':'尝','嚕':'噜','嚙':'啮','嚥':'咽','嚦':'呖','嚨':'咙','嚮':'向','嚲':'亸','嚳':'喾','嚴':'严','嚶':'嘤','囀':'啭','囁':'嗫','囂':'嚣','囅':'冁','囈':'呓','囉':'啰','囌':'苏','囑':'嘱','囪':'囱','圇':'囵','國':'国','圍':'围','園':'园','圓':'圆','圖':'图','團':'团','垻':'坝','埡':'垭','埨':'𫭢','埰':'采','執':'执','堅':'坚','堊':'垩','堖':'垴','堝':'埚','堯':'尧','報':'报','場':'场','塊':'块','塋':'茔','塏':'垲','塒':'埘','塗':'涂','塚':'冢','塢':'坞','塤':'埙','塵':'尘','塸':'𫭟','塹':'堑','塿':'𪣻','墊':'垫','墜':'坠','墠':'𫮃','墮':'堕','墰':'坛','墳':'坟','墶':'垯','墻':'墙','墾':'垦','壇':'坛','壋':'垱','壎':'埙','壓':'压','壗':'𡋤','壘':'垒','壙':'圹','壚':'垆','壜':'坛','壞':'坏','壟':'垄','壠':'垅','壢':'坜','壩':'坝','壪':'塆','壯':'壮','壺':'壶','壼':'壸','壽':'寿','夠':'够','夢':'梦','夥':'伙','夾':'夹','奐':'奂','奧':'奥','奩':'奁','奪':'夺','奬':'奖','奮':'奋','奼':'姹','妝':'妆','姍':'姗','姦':'奸','娙':'𫰛','娛':'娱','婁':'娄','婦':'妇','婭':'娅','媧':'娲','媯':'妫','媰':'㛀','媼':'媪','媽':'妈','嫋':'袅','嫗':'妪','嫵':'妩','嫺':'娴','嫻':'娴','嫿':'婳','嬀':'妫','嬃':'媭','嬈':'娆','嬋':'婵','嬌':'娇','嬙':'嫱','嬡':'嫒','嬤':'嬷','嬪':'嫔','嬰':'婴','嬸':'婶','孃':'娘','孋':'㛤','孌':'娈','孫':'孙','學':'学','孿':'孪','宮':'宫','寀':'采','寢':'寝','實':'实','寧':'宁','審':'审','寫':'写','寬':'宽','寵':'宠','寶':'宝','將':'将','專':'专','尋':'寻','對':'对','導':'导','尷':'尴','屆':'届','屍':'尸','屓':'屃','屜':'屉','屢':'屡','層':'层','屨':'屦','屬':'属','岡':'冈','峯':'峰','峴':'岘','島':'岛','峽':'峡','崍':'崃','崑':'昆','崗':'岗','崙':'仑','崢':'峥','崬':'岽','嵐':'岚','嵗':'岁','嵽':'𫶇','嵾':'㟥','嶁':'嵝','嶄':'崭','嶇':'岖','嶔':'嵚','嶗':'崂','嶠':'峤','嶢':'峣','嶧':'峄','嶨':'峃','嶮':'崄','嶸':'嵘','嶺':'岭','嶼':'屿','嶽':'岳','巋':'岿','巒':'峦','巔':'巅','巖':'岩','巘':'𪩘','巰':'巯','巹':'卺','帥':'帅','師':'师','帳':'帐','帶':'带','幀':'帧','幃':'帏','幓':'㡎','幗':'帼','幘':'帻','幟':'帜','幣':'币','幫':'帮','幬':'帱','幹':'干','幾':'几','庫':'库','廁':'厕','廂':'厢','廄':'厩','廈':'厦','廎':'庼','廕':'荫','廚':'厨','廝':'厮','廞':'𫷷','廟':'庙','廠':'厂','廡':'庑','廢':'废','廣':'广','廩':'廪','廬':'庐','廳':'厅','弒':'弑','弔':'吊','弳':'弪','張':'张','強':'强','彄':'𫸩','彆':'别','彈':'弹','彌':'弥','彎':'弯','彔':'录','彙':'汇','彠':'彟','彥':'彦','彫':'雕','彲':'彨','彷':'彷','彿':'佛','後':'后','徑':'径','從':'从','徠':'徕','復':'复','徵':'征','徹':'彻','恆':'恒','恥':'耻','悅':'悦','悞':'悮','悵':'怅','悶':'闷','悽':'凄','惡':'恶','惱':'恼','惲':'恽','惻':'恻','愛':'爱','愜':'惬','愨':'悫','愴':'怆','愷':'恺','愾':'忾','慄':'栗','態':'态','慍':'愠','慘':'惨','慚':'惭','慟':'恸','慣':'惯','慤':'悫','慪':'怄','慫':'怂','慮':'虑','慳':'悭','慶':'庆','慺':'㥪','慼':'戚','慾':'欲','憂':'忧','憊':'惫','憐':'怜','憑':'凭','憒':'愦','憖':'慭','憚':'惮','憤':'愤','憫':'悯','憮':'怃','憲':'宪','憶':'忆','懇':'恳','應':'应','懌':'怿','懍':'懔','懞':'蒙','懟':'怼','懣':'懑','懤':'㤽','懨':'恹','懲':'惩','懶':'懒','懷':'怀','懸':'悬','懺':'忏','懼':'惧','懾':'慑','戀':'恋','戇':'戆','戔':'戋','戧':'戗','戩':'戬','戰':'战','戱':'戯','戲':'戏','戶':'户','拋':'抛','挩':'捝','挱':'挲','挾':'挟','捨':'舍','捫':'扪','捱':'挨','捲':'卷','掃':'扫','掄':'抡','掆':'㧏','掗':'挜','掙':'挣','掛':'挂','採':'采','揀':'拣','揚':'扬','換':'换','揮':'挥','揯':'搄','損':'损','搖':'摇','搗':'捣','搵':'揾','搶':'抢','摑':'掴','摜':'掼','摟':'搂','摯':'挚','摳':'抠','摶':'抟','摺':'折','摻':'掺','撈':'捞','撏':'挦','撐':'撑','撓':'挠','撝':'㧑','撟':'挢','撣':'掸','撥':'拨','撫':'抚','撲':'扑','撳':'揿','撻':'挞','撾':'挝','撿':'捡','擁':'拥','擄':'掳','擇':'择','擊':'击','擋':'挡','擓':'㧟','擔':'担','據':'据','擠':'挤','擣':'捣','擬':'拟','擯':'摈','擰':'拧','擱':'搁','擲':'掷','擴':'扩','擷':'撷','擺':'摆','擻':'擞','擼':'撸','擽':'㧰','擾':'扰','攄':'摅','攆':'撵','攏':'拢','攔':'拦','攖':'撄','攙':'搀','攛':'撺','攜':'携','攝':'摄','攢':'攒','攣':'挛','攤':'摊','攪':'搅','攬':'揽','敎':'教','敓':'敚','敗':'败','敘':'叙','敵':'敌','數':'数','斂':'敛','斃':'毙','斆':'敩','斕':'斓','斬':'斩','斷':'断','於':'于','旂':'旗','旣':'既','昇':'升','時':'时','晉':'晋','晛':'𬀪','晝':'昼','暈':'晕','暉':'晖','暐':'𬀩','暘':'旸','暢':'畅','暫':'暂','曄':'晔','曆':'历','曇':'昙','曉':'晓','曏':'向','曖':'暧','曠':'旷','曨':'昽','曬':'晒','書':'书','會':'会','朥':'𦛨','朧':'胧','朮':'术','東':'东','枴':'拐','柵':'栅','柺':'拐','査':'查','桿':'杆','梔':'栀','梘':'枧','梜':'𬂩','條':'条','梟':'枭','梲':'棁','棄':'弃','棊':'棋','棖':'枨','棗':'枣','棟':'栋','棡':'㭎','棧':'栈','棲':'栖','棶':'梾','椏':'桠','椲':'㭏','楊':'杨','楓':'枫','楨':'桢','業':'业','極':'极','榘':'矩','榦':'干','榪':'杩','榮':'荣','榲':'榅','榿':'桤','構':'构','槍':'枪','槓':'杠','槤':'梿','槧':'椠','槨':'椁','槮':'椮','槳':'桨','槶':'椢','槼':'椝','樁':'桩','樂':'乐','樅':'枞','樑':'梁','樓':'楼','標':'标','樞':'枢','樢':'㭤','樣':'样','樧':'榝','樫':'㭴','樳':'桪','樸':'朴','樹':'树','樺':'桦','樿':'椫','橈':'桡','橋':'桥','機':'机','橢':'椭','橫':'横','檁':'檩','檉':'柽','檔':'档','檜':'桧','檟':'槚','檢':'检','檣':'樯','檮':'梼','檯':'台','檳':'槟','檸':'柠','檻':'槛','櫃':'柜','櫍':'𬃊','櫓':'橹','櫚':'榈','櫛':'栉','櫝':'椟','櫞':'橼','櫟':'栎','櫥':'橱','櫧':'槠','櫨':'栌','櫪':'枥','櫫':'橥','櫬':'榇','櫱':'蘖','櫳':'栊','櫸':'榉','櫻':'樱','欄':'栏','欅':'榉','權':'权','欏':'椤','欒':'栾','欓':'𣗋','欖':'榄','欞':'棂','欽':'钦','歎':'叹','歐':'欧','歟':'欤','歡':'欢','歲':'岁','歷':'历','歸':'归','歿':'殁','殘':'残','殞':'殒','殤':'殇','殨':'㱮','殫':'殚','殭':'僵','殮':'殓','殯':'殡','殰':'㱩','殲':'歼','殺':'杀','殻':'壳','殼':'壳','毀':'毁','毆':'殴','毿':'毵','氂':'牦','氈':'毡','氌':'氇','氣':'气','氫':'氢','氬':'氩','氳':'氲','氾':'泛','汎':'泛','汙':'污','決':'决','沒':'没','沖':'冲','況':'况','泝':'溯','洩':'泄','洶':'汹','浹':'浃','浿':'𬇙','涇':'泾','涗':'涚','涼':'凉','淒':'凄','淚':'泪','淥':'渌','淨':'净','淩':'凌','淪':'沦','淵':'渊','淶':'涞','淺':'浅','渙':'涣','減':'减','渢':'沨','渦':'涡','測':'测','渾':'浑','湊':'凑','湋':'𣲗','湞':'浈','湧':'涌','湯':'汤','溈':'沩','準':'准','溝':'沟','溫':'温','溮':'浉','溳':'涢','溼':'湿','滄':'沧','滅':'灭','滌':'涤','滎':'荥','滙':'汇','滬':'沪','滯':'滞','滲':'渗','滷':'卤','滸':'浒','滻':'浐','滾':'滚','滿':'满','漁':'渔','漊':'溇','漍':'𬇹','漚':'沤','漢':'汉','漣':'涟','漬':'渍','漲':'涨','漵':'溆','漸':'渐','漿':'浆','潁':'颍','潑':'泼','潔':'洁','潕':'𣲘','潙':'沩','潚':'㴋','潛':'潜','潤':'润','潯':'浔','潰':'溃','潷':'滗','潿':'涠','澀':'涩','澆':'浇','澇':'涝','澐':'沄','澗':'涧','澠':'渑','澤':'泽','澦':'滪','澩':'泶','澫':'𬇕','澮':'浍','澱':'淀','澾':'㳠','濁':'浊','濃':'浓','濄':'㳡','濆':'𣸣','濕':'湿','濘':'泞','濚':'溁','濛':'蒙','濜':'浕','濟':'济','濤':'涛','濧':'㳔','濫':'滥','濰':'潍','濱':'滨','濺':'溅','濼':'泺','濾':'滤','瀂':'澛','瀅':'滢','瀆':'渎','瀇':'㲿','瀉':'泻','瀋':'沈','瀏':'浏','瀕':'濒','瀘':'泸','瀝':'沥','瀟':'潇','瀠':'潆','瀦':'潴','瀧':'泷','瀨':'濑','瀰':'弥','瀲':'潋','瀾':'澜','灃':'沣','灄':'滠','灑':'洒','灕':'漓','灘':'滩','灝':'灏','灡':'㳕','灣':'湾','灤':'滦','灧':'滟','灩':'滟','災':'灾','為':'为','烏':'乌','烴':'烃','無':'无','煉':'炼','煒':'炜','煙':'烟','煢':'茕','煥':'焕','煩':'烦','煬':'炀','煱':'㶽','熅':'煴','熒':'荧','熗':'炝','熰':'𬉼','熱':'热','熲':'颎','熾':'炽','燀':'𬊤','燁':'烨','燈':'灯','燉':'炖','燒':'烧','燖':'𬊈','燙':'烫','燜':'焖','營':'营','燦':'灿','燬':'毁','燭':'烛','燴':'烩','燶':'㶶','燻':'熏','燼':'烬','燾':'焘','爍':'烁','爐':'炉','爛':'烂','爭':'争','爲':'为','爺':'爷','爾':'尔','牀':'床','牆':'墙','牘':'牍','牴':'牴','牽':'牵','犖':'荦','犛':'牦','犢':'犊','犧':'牺','狀':'状','狹':'狭','狽':'狈','猙':'狰','猶':'犹','猻':'狲','獁':'犸','獃':'呆','獄':'狱','獅':'狮','獎':'奖','獨':'独','獪':'狯','獫':'猃','獮':'狝','獰':'狞','獱':'㺍','獲':'获','獵':'猎','獷':'犷','獸':'兽','獺':'獭','獻':'献','獼':'猕','玀':'猡','現':'现','琱':'雕','琺':'珐','琿':'珲','瑋':'玮','瑒':'玚','瑣':'琐','瑤':'瑶','瑩':'莹','瑪':'玛','瑲':'玱','璉':'琏','璊':'𫞩','璕':'𬍤','璗':'𬍡','璡':'琎','璣':'玑','璦':'瑷','璫':'珰','璯':'㻅','環':'环','璵':'玙','璸':'瑸','璽':'玺','璿':'璇','瓅':'𬍛','瓊':'琼','瓏':'珑','瓔':'璎','瓚':'瓒','瓛':'𤩽','甌':'瓯','甕':'瓮','產':'产','産':'产','甦':'苏','甯':'宁','畝':'亩','畢':'毕','畫':'画','異':'异','畵':'画','當':'当','疇':'畴','疊':'叠','痙':'痉','痠':'酸','痾':'疴','瘂':'痖','瘋':'疯','瘍':'疡','瘓':'痪','瘞':'瘗','瘡':'疮','瘧':'疟','瘮':'瘆','瘲':'疭','瘺':'瘘','瘻':'瘘','療':'疗','癆':'痨','癇':'痫','癉':'瘅','癒':'愈','癘':'疠','癟':'瘪','癡':'痴','癢':'痒','癤':'疖','癥':'症','癧':'疬','癩':'癞','癬':'癣','癭':'瘿','癮':'瘾','癰':'痈','癱':'瘫','癲':'癫','發':'发','皁':'皂','皚':'皑','皰':'疱','皸':'皲','皺':'皱','盃':'杯','盜':'盗','盞':'盏','盡':'尽','監':'监','盤':'盘','盧':'卢','盪':'荡','眞':'真','眥':'眦','眾':'众','睍':'𪾢','睏':'困','睜':'睁','睞':'睐','瞘':'眍','瞜':'䁖','瞞':'瞒','瞭':'瞭','瞶':'瞆','瞼':'睑','矇':'蒙','矓':'眬','矚':'瞩','矯':'矫','硃':'朱','硜':'硁','硤':'硖','硨':'砗','硯':'砚','碕':'埼','碩':'硕','碭':'砀','碸':'砜','確':'确','碼':'码','碽':'䂵','磑':'硙','磚':'砖','磠':'硵','磣':'碜','磧':'碛','磯':'矶','磽':'硗','磾':'䃅','礄':'硚','礆':'硷','礎':'础','礐':'𬒈','礙':'碍','礦':'矿','礪':'砺','礫':'砾','礬':'矾','礱':'砻','祇':'祇','祕':'秘','祿':'禄','禍':'祸','禎':'祯','禕':'祎','禡':'祃','禦':'御','禪':'禅','禮':'礼','禰':'祢','禱':'祷','禿':'秃','秈':'籼','稅':'税','稈':'秆','稏':'䅉','稜':'棱','稟':'禀','種':'种','稱':'称','穀':'谷','穇':'䅟','穌':'稣','積':'积','穎':'颖','穠':'秾','穡':'穑','穢':'秽','穩':'稳','穫':'获','穭':'穞','窩':'窝','窪':'洼','窮':'穷','窯':'窑','窵':'窎','窶':'窭','窺':'窥','竄':'窜','竅':'窍','竇':'窦','竈':'灶','竊':'窃','竪':'竖','競':'竞','筆':'笔','筍':'笋','筧':'笕','筴':'䇲','箇':'个','箋':'笺','箏':'筝','節':'节','範':'范','築':'筑','篋':'箧','篔':'筼','篠':'筿','篢':'𬕂','篤':'笃','篩':'筛','篳':'筚','簀':'箦','簍':'篓','簑':'蓑','簞':'箪','簡':'简','簣':'篑','簫':'箫','簹':'筜','簽':'签','簾':'帘','籃':'篮','籅':'𥫣','籌':'筹','籔':'䉤','籙':'箓','籛':'篯','籜':'箨','籟':'籁','籠':'笼','籤':'签','籩':'笾','籪':'簖','籬':'篱','籮':'箩','籲':'吁','粵':'粤','糉':'粽','糝':'糁','糞':'粪','糧':'粮','糰':'团','糲':'粝','糴':'籴','糶':'粜','糹':'纟','糾':'纠','紀':'纪','紂':'纣','紃':'𬘓','約':'约','紅':'红','紆':'纡','紇':'纥','紈':'纨','紉':'纫','紋':'纹','納':'纳','紐':'纽','紓':'纾','純':'纯','紕':'纰','紖':'纼','紗':'纱','紘':'纮','紙':'纸','級':'级','紛':'纷','紜':'纭','紝':'纴','紞':'𬘘','紡':'纺','紬':'䌷','紮':'扎','細':'细','紱':'绂','紲':'绁','紳':'绅','紵':'纻','紹':'绍','紺':'绀','紼':'绋','紿':'绐','絀':'绌','終':'终','絃':'弦','組':'组','絅':'䌹','絆':'绊','絎':'绗','結':'结','絕':'绝','絛':'绦','絝':'绔','絞':'绞','絡':'络','絢':'绚','給':'给','絨':'绒','絪':'𬘡','絰':'绖','統':'统','絲':'丝','絳':'绛','絶':'绝','絹':'绢','絺':'𫄨','綁':'绑','綃':'绡','綄':'𬘫','綆':'绠','綈':'绨','綉':'绣','綌':'绤','綎':'𬘩','綏':'绥','綐':'䌼','綑':'捆','經':'经','綖':'𫄧','綜':'综','綝':'𬘭','綞':'缍','綠':'绿','綡':'𫟅','綢':'绸','綣':'绻','綧':'𬘯','綪':'𬘬','綫':'线','綬':'绶','維':'维','綯':'绹','綰':'绾','綱':'纲','網':'网','綳':'绷','綴':'缀','綵':'彩','綸':'纶','綹':'绺','綺':'绮','綻':'绽','綽':'绰','綾':'绫','綿':'绵','緄':'绲','緇':'缁','緊':'紧','緋':'绯','緑':'绿','緒':'绪','緓':'绬','緔':'绱','緗':'缃','緘':'缄','緙':'缂','線':'线','緝':'缉','緞':'缎','締':'缔','緡':'缗','緣':'缘','緦':'缌','編':'编','緩':'缓','緬':'缅','緯':'纬','緱':'缑','緲':'缈','練':'练','緶':'缏','緹':'缇','緻':'致','緼':'缊','縈':'萦','縉':'缙','縊':'缢','縋':'缒','縐':'绉','縑':'缣','縕':'缊','縗':'缞','縛':'缚','縝':'缜','縞':'缟','縟':'缛','縣':'县','縧':'绦','縫':'缝','縭':'缡','縮':'缩','縯':'𬙂','縱':'纵','縲':'缧','縳':'䌸','縴':'纤','縵':'缦','縶':'絷','縷':'缕','縹':'缥','總':'总','績':'绩','繃':'绷','繅':'缫','繆':'缪','繒':'缯','織':'织','繕':'缮','繚':'缭','繞':'绕','繡':'绣','繢':'缋','繩':'绳','繪':'绘','繫':'系','繭':'茧','繮':'缰','繯':'缳','繰':'缲','繳':'缴','繶':'𫄷','繸':'䍁','繹':'绎','繻':'𦈡','繼':'继','繽':'缤','繾':'缱','繿':'䍀','纁':'𫄸','纆':'𬙊','纇':'颣','纈':'缬','纊':'纩','續':'续','纍':'累','纏':'缠','纓':'缨','纔':'才','纕':'𬙋','纖':'纤','纘':'缵','纜':'缆','缽':'钵','罃':'䓨','罈':'坛','罌':'罂','罎':'坛','罰':'罚','罵':'骂','罷':'罢','羅':'罗','羆':'罴','羈':'羁','羋':'芈','羣':'群','羥':'羟','羨':'羡','義':'义','羶':'膻','習':'习','翫':'玩','翬':'翚','翹':'翘','翽':'翙','耬':'耧','耮':'耢','聖':'圣','聞':'闻','聯':'联','聰':'聪','聲':'声','聳':'耸','聵':'聩','聶':'聂','職':'职','聹':'聍','聽':'听','聾':'聋','肅':'肃','脅':'胁','脈':'脉','脛':'胫','脣':'唇','脩':'修','脫':'脱','脹':'胀','腎':'肾','腖':'胨','腡':'脶','腦':'脑','腫':'肿','腳':'脚','腸':'肠','膃':'腽','膕':'腘','膚':'肤','膞':'䏝','膠':'胶','膢':'𦝼','膩':'腻','膽':'胆','膾':'脍','膿':'脓','臉':'脸','臍':'脐','臏':'膑','臘':'腊','臚':'胪','臟':'脏','臠':'脔','臢':'臜','臥':'卧','臨':'临','臺':'台','與':'与','興':'兴','舉':'举','舊':'旧','舘':'馆','艙':'舱','艤':'舣','艦':'舰','艫':'舻','艱':'艰','艷':'艳','芻':'刍','苧':'苎','茲':'兹','荊':'荆','莊':'庄','莖':'茎','莢':'荚','莧':'苋','華':'华','菴':'庵','菸':'烟','萇':'苌','萊':'莱','萬':'万','萴':'荝','萵':'莴','葉':'叶','葒':'荭','葤':'荮','葦':'苇','葯':'药','葷':'荤','蒍':'𫇭','蒐':'搜','蒓':'莼','蒔':'莳','蒕':'蒀','蒞':'莅','蒼':'苍','蓀':'荪','蓆':'席','蓋':'盖','蓮':'莲','蓯':'苁','蓴':'莼','蓽':'荜','蔄':'𬜬','蔔':'卜','蔘':'参','蔞':'蒌','蔣':'蒋','蔥':'葱','蔦':'茑','蔭':'荫','蔿':'𫇭','蕁':'荨','蕆':'蒇','蕎':'荞','蕒':'荬','蕓':'芸','蕕':'莸','蕘':'荛','蕢':'蒉','蕩':'荡','蕪':'芜','蕭':'萧','蕷':'蓣','薀':'蕰','薈':'荟','薊':'蓟','薌':'芗','薑':'姜','薔':'蔷','薘':'荙','薟':'莶','薦':'荐','薩':'萨','薳':'䓕','薴':'苧','薵':'䓓','薹':'苔','薺':'荠','藉':'藉','藍':'蓝','藎':'荩','藝':'艺','藥':'药','藪':'薮','藭':'䓖','藴':'蕴','藶':'苈','藹':'蔼','藺':'蔺','蘀':'萚','蘄':'蕲','蘆':'芦','蘇':'苏','蘊':'蕴','蘋':'苹','蘚':'藓','蘞':'蔹','蘟':'𦻕','蘢':'茏','蘭':'兰','蘺':'蓠','蘿':'萝','虆':'蔂','虉':'𬟁','處':'处','虛':'虚','虜':'虏','號':'号','虧':'亏','虯':'虬','蛺':'蛱','蛻':'蜕','蜆':'蚬','蝀':'𬟽','蝕':'蚀','蝟':'猬','蝦':'虾','蝨':'虱','蝸':'蜗','螄':'蛳','螞':'蚂','螢':'萤','螮':'䗖','螻':'蝼','螿':'螀','蟄':'蛰','蟈':'蝈','蟎':'螨','蟣':'虮','蟬':'蝉','蟯':'蛲','蟲':'虫','蟶':'蛏','蟻':'蚁','蠁':'蚃','蠅':'蝇','蠆':'虿','蠍':'蝎','蠐':'蛴','蠑':'蝾','蠔':'蚝','蠟':'蜡','蠣':'蛎','蠨':'蟏','蠱':'蛊','蠶':'蚕','蠻':'蛮','衆':'众','衊':'蔑','術':'术','衕':'同','衚':'胡','衛':'卫','衝':'冲','衹':'衹','袞':'衮','裊':'袅','裏':'里','補':'补','裝':'装','裡':'里','製':'制','複':'复','褌':'裈','褘':'袆','褲':'裤','褳':'裢','褸':'褛','褻':'亵','襀':'𫌀','襇':'裥','襉':'裥','襏':'袯','襖':'袄','襝':'裣','襠':'裆','襤':'褴','襪':'袜','襬':'摆','襯':'衬','襲':'袭','襴':'襕','覆':'覆','覈':'核','見':'见','覎':'觃','規':'规','覓':'觅','視':'视','覘':'觇','覡':'觋','覥':'觍','覦':'觎','親':'亲','覬':'觊','覯':'觏','覲':'觐','覷':'觑','覺':'觉','覽':'览','覿':'觌','觀':'观','觴':'觞','觶':'觯','觸':'触','訁':'讠','訂':'订','訃':'讣','計':'计','訊':'讯','訌':'讧','討':'讨','訏':'𬣙','訐':'讦','訒':'讱','訓':'训','訕':'讪','訖':'讫','託':'托','記':'记','訛':'讹','訝':'讶','訟':'讼','訢':'䜣','訣':'诀','訥':'讷','訩':'讻','訪':'访','設':'设','許':'许','訴':'诉','訶':'诃','診':'诊','註':'注','証':'证','詁':'诂','詆':'诋','詎':'讵','詐':'诈','詒':'诒','詔':'诏','評':'评','詖':'诐','詗':'诇','詘':'诎','詛':'诅','詝':'𬣞','詞':'词','詠':'咏','詡':'诩','詢':'询','詣':'诣','試':'试','詩':'诗','詪':'𬣳','詫':'诧','詬':'诟','詭':'诡','詮':'诠','詰':'诘','話':'话','該':'该','詳':'详','詵':'诜','詷':'𫍣','詼':'诙','詿':'诖','誄':'诔','誅':'诛','誆':'诓','誇':'夸','誌':'志','認':'认','誑':'诳','誒':'诶','誕':'诞','誘':'诱','誚':'诮','語':'语','誠':'诚','誡':'诫','誣':'诬','誤':'误','誥':'诰','誦':'诵','誨':'诲','說':'说','説':'说','誰':'谁','課':'课','誶':'谇','誹':'诽','誼':'谊','誾':'訚','調':'调','諂':'谄','諄':'谆','談':'谈','諉':'诿','請':'请','諍':'诤','諏':'诹','諑':'诼','諒':'谅','諓':'𬣡','論':'论','諗':'谂','諛':'谀','諜':'谍','諝':'谞','諞':'谝','諟':'𬤊','諡':'谥','諢':'诨','諤':'谔','諦':'谛','諧':'谐','諫':'谏','諭':'谕','諮':'咨','諱':'讳','諲':'𬤇','諳':'谙','諴':'𫍯','諶':'谌','諷':'讽','諸':'诸','諺':'谚','諼':'谖','諾':'诺','謀':'谋','謁':'谒','謂':'谓','謄':'誊','謅':'诌','謊':'谎','謎':'谜','謏':'𫍲','謐':'谧','謔':'谑','謖':'谡','謗':'谤','謙':'谦','謚':'谥','講':'讲','謝':'谢','謠':'谣','謡':'谣','謨':'谟','謫':'谪','謬':'谬','謭':'谫','謳':'讴','謹':'谨','謾':'谩','譁':'哗','證':'证','譎':'谲','譏':'讥','譓':'𬤝','譖':'谮','識':'识','譙':'谯','譚':'谭','譜':'谱','譞':'𫍽','譟':'噪','譫':'谵','譭':'毁','譯':'译','議':'议','譴':'谴','護':'护','譸':'诪','譽':'誉','譾':'谫','讀':'读','讅':'谉','變':'变','讋':'詟','讌':'䜩','讎':'雠','讒':'谗','讓':'让','讕':'谰','讖':'谶','讚':'赞','讜':'谠','讞':'谳','豈':'岂','豎':'竖','豐':'丰','豔':'艳','豬':'猪','豶':'豮','貓':'猫','貙':'䝙','貝':'贝','貞':'贞','貟':'贠','負':'负','財':'财','貢':'贡','貧':'贫','貨':'货','販':'贩','貪':'贪','貫':'贯','責':'责','貯':'贮','貰':'贳','貲':'赀','貳':'贰','貴':'贵','貶':'贬','買':'买','貸':'贷','貺':'贶','費':'费','貼':'贴','貽':'贻','貿':'贸','賀':'贺','賁':'贲','賂':'赂','賃':'赁','賄':'贿','賅':'赅','資':'资','賈':'贾','賊':'贼','賑':'赈','賒':'赊','賓':'宾','賕':'赇','賙':'赒','賚':'赉','賜':'赐','賞':'赏','賠':'赔','賡':'赓','賢':'贤','賣':'卖','賤':'贱','賦':'赋','賧':'赕','質':'质','賫':'赍','賬':'账','賭':'赌','賰':'䞐','賴':'赖','賵':'赗','賺':'赚','賻':'赙','購':'购','賽':'赛','賾':'赜','贄':'贽','贅':'赘','贇':'赟','贈':'赠','贊':'赞','贋':'赝','贍':'赡','贏':'赢','贐':'赆','贓':'赃','贔':'赑','贖':'赎','贗':'赝','贛':'赣','贜':'赃','赬':'赪','趕':'赶','趙':'赵','趨':'趋','趲':'趱','跡':'迹','踐':'践','踰':'逾','踴':'踊','蹌':'跄','蹕':'跸','蹟':'迹','蹠':'跖','蹣':'蹒','蹤':'踪','蹺':'跷','躂':'跶','躉':'趸','躊':'踌','躋':'跻','躍':'跃','躎':'䟢','躑':'踯','躒':'跞','躓':'踬','躕':'蹰','躚':'跹','躡':'蹑','躥':'蹿','躦':'躜','躪':'躏','軀':'躯','車':'车','軋':'轧','軌':'轨','軍':'军','軏':'𫐄','軑':'轪','軒':'轩','軔':'轫','軛':'轭','軝':'𬨂','軟':'软','軤':'轷','軫':'轸','軲':'轱','軸':'轴','軹':'轵','軺':'轺','軻':'轲','軼':'轶','軾':'轼','較':'较','輄':'𨐈','輅':'辂','輇':'辁','輈':'辀','載':'载','輊':'轾','輋':'𪨶','輒':'辄','輓':'挽','輔':'辅','輕':'轻','輗':'𫐐','輛':'辆','輜':'辎','輝':'辉','輞':'辋','輟':'辍','輥':'辊','輦':'辇','輩':'辈','輪':'轮','輬':'辌','輮':'𫐓','輯':'辑','輳':'辏','輶':'𬨎','輸':'输','輻':'辐','輼':'辒','輾':'辗','輿':'舆','轀':'辒','轂':'毂','轄':'辖','轅':'辕','轆':'辘','轉':'转','轍':'辙','轎':'轿','轔':'辚','轟':'轰','轡':'辔','轢':'轹','轤':'轳','辦':'办','辭':'辞','辮':'辫','辯':'辩','農':'农','迴':'回','逕':'迳','這':'这','連':'连','週':'周','進':'进','遊':'游','運':'运','過':'过','達':'达','違':'违','遙':'遥','遜':'逊','遞':'递','遠':'远','遡':'溯','適':'适','遱':'𫐷','遲':'迟','遷':'迁','選':'选','遺':'遗','遼':'辽','邁':'迈','還':'还','邇':'迩','邊':'边','邏':'逻','邐':'逦','郟':'郏','郵':'邮','鄆':'郓','鄉':'乡','鄒':'邹','鄔':'邬','鄖':'郧','鄧':'邓','鄩':'𬩽','鄭':'郑','鄰':'邻','鄲':'郸','鄳':'𫑡','鄴':'邺','鄶':'郐','鄺':'邝','酇':'酂','酈':'郦','醃':'腌','醖':'酝','醜':'丑','醞':'酝','醟':'蒏','醣':'糖','醫':'医','醬':'酱','醱':'酦','醲':'𬪩','釀':'酿','釁':'衅','釃':'酾','釅':'酽','釋':'释','釐':'厘','釒':'钅','釓':'钆','釔':'钇','釕':'钌','釗':'钊','釘':'钉','釙':'钋','針':'针','釣':'钓','釤':'钐','釦':'扣','釧':'钏','釩':'钒','釴':'𬬩','釵':'钗','釷':'钍','釹':'钕','釺':'钎','釾':'䥺','釿':'𬬱','鈀':'钯','鈁':'钫','鈃':'钘','鈄':'钭','鈅':'钥','鈇':'𫓧','鈈':'钚','鈉':'钠','鈍':'钝','鈎':'钩','鈐':'钤','鈑':'钣','鈒':'钑','鈔':'钞','鈕':'钮','鈞':'钧','鈡':'钟','鈣':'钙','鈥':'钬','鈦':'钛','鈧':'钪','鈮':'铌','鈰':'铈','鈳':'钶','鈴':'铃','鈷':'钴','鈸':'钹','鈹':'铍','鈺':'钰','鈽':'钸','鈾':'铀','鈿':'钿','鉀':'钾','鉅':'巨','鉆':'钻','鉈':'铊','鉉':'铉','鉊':'𬬿','鉋':'铇','鉍':'铋','鉑':'铂','鉕':'钷','鉗':'钳','鉚':'铆','鉛':'铅','鉝':'𫟷','鉞':'钺','鉢':'钵','鉤':'钩','鉥':'𬬸','鉦':'钲','鉧':'𬭁','鉬':'钼','鉭':'钽','鉮':'𬬹','鉳':'锫','鉶':'铏','鉷':'𫟹','鉸':'铰','鉺':'铒','鉻':'铬','鉿':'铪','銀':'银','銃':'铳','銅':'铜','銈':'𫓯','銍':'铚','銑':'铣','銓':'铨','銖':'铢','銘':'铭','銚':'铫','銛':'铦','銜':'衔','銠':'铑','銣':'铷','銥':'铱','銦':'铟','銨':'铵','銩':'铥','銪':'铕','銫':'铯','銬':'铐','銱':'铞','銳':'锐','銶':'𨱇','銷':'销','銹':'锈','銻':'锑','銼':'锉','鋁':'铝','鋃':'锒','鋅':'锌','鋇':'钡','鋌':'铤','鋏':'铗','鋐':'𬭎','鋒':'锋','鋗':'𫓶','鋙':'铻','鋝':'锊','鋟':'锓','鋣':'铘','鋤':'锄','鋥':'锃','鋦':'锔','鋨':'锇','鋩':'铓','鋪':'铺','鋭':'锐','鋮':'铖','鋯':'锆','鋰':'锂','鋱':'铽','鋶':'锍','鋸':'锯','鋹':'𬬮','鋼':'钢','錀':'𬬭','錁':'锞','錄':'录','錆':'锖','錇':'锫','錈':'锩','錏':'铔','錐':'锥','錒':'锕','錕':'锟','錘':'锤','錙':'锱','錚':'铮','錛':'锛','錞':'𬭚','錟':'锬','錠':'锭','錡':'锜','錢':'钱','錤':'𫓹','錦':'锦','錨':'锚','錩':'锠','錫':'锡','錮':'锢','錯':'错','録':'录','錳':'锰','錶':'表','錸':'铼','錼':'镎','鍀':'锝','鍁':'锨','鍃':'锪','鍅':'钫','鍆':'钔','鍇':'锴','鍈':'锳','鍊':'炼','鍋':'锅','鍍':'镀','鍔':'锷','鍘':'铡','鍚':'钖','鍛':'锻','鍠':'锽','鍤':'锸','鍥':'锲','鍩':'锘','鍬':'锹','鍭':'𬭤','鍰':'锾','鍵':'键','鍶':'锶','鍺':'锗','鍼':'针','鍾':'钟','鎂':'镁','鎄':'锿','鎇':'镅','鎊':'镑','鎌':'镰','鎓':'𬭩','鎔':'镕','鎖':'锁','鎘':'镉','鎚':'锤','鎛':'镈','鎝':'𨱏','鎡':'镃','鎢':'钨','鎣':'蓥','鎦':'镏','鎧':'铠','鎩':'铩','鎪':'锼','鎬':'镐','鎭':'镇','鎮':'镇','鎰':'镒','鎲':'镋','鎳':'镍','鎵':'镓','鎶':'鿔','鎸':'镌','鎿':'镎','鏃':'镞','鏇':'旋','鏈':'链','鏌':'镆','鏍':'镙','鏏':'𬭬','鏐':'镠','鏑':'镝','鏗':'铿','鏘':'锵','鏜':'镗','鏝':'镘','鏞':'镛','鏟':'铲','鏡':'镜','鏢':'镖','鏤':'镂','鏨':'錾','鏰':'镚','鏵':'铧','鏷':'镤','鏹':'镪','鏺':'䥽','鏻':'𬭸','鏽':'锈','鐃':'铙','鐄':'𨱑','鐇':'𫔍','鐋':'铴','鐍':'𫔎','鐏':'𨱔','鐐':'镣','鐒':'铹','鐓':'镦','鐔':'镡','鐘':'钟','鐙':'镫','鐝':'镢','鐠':'镨','鐥':'䦅','鐦':'锎','鐧':'锏','鐨':'镄','鐩':'𬭼','鐫':'镌','鐮':'镰','鐯':'䦃','鐲':'镯','鐳':'镭','鐵':'铁','鐶':'镮','鐸':'铎','鐺':'铛','鐽':'𫟼','鐿':'镱','鑄':'铸','鑊':'镬','鑌':'镔','鑑':'鉴','鑒':'鉴','鑔':'镲','鑕':'锧','鑞':'镴','鑠':'铄','鑣':'镳','鑥':'镥','鑪':'𬬻','鑭':'镧','鑰':'钥','鑱':'镵','鑲':'镶','鑷':'镊','鑹':'镩','鑼':'锣','鑽':'钻','鑾':'銮','鑿':'凿','钁':'镢','钂':'镋','長':'长','門':'门','閂':'闩','閃':'闪','閆':'闫','閈':'闬','閉':'闭','開':'开','閌':'闶','閎':'闳','閏':'闰','閑':'闲','閒':'闲','間':'间','閔':'闵','閘':'闸','閡':'阂','閣':'阁','閤':'合','閥':'阀','閨':'闺','閩':'闽','閫':'阃','閬':'阆','閭':'闾','閱':'阅','閲':'阅','閶':'阊','閹':'阉','閻':'阎','閼':'阏','閽':'阍','閾':'阈','閿':'阌','闃':'阒','闆':'板','闇':'暗','闈':'闱','闉':'𬮱','闊':'阔','闋':'阕','闌':'阑','闍':'阇','闐':'阗','闑':'𫔶','闒':'阘','闓':'闿','闔':'阖','闕':'阙','闖':'闯','關':'关','闞':'阚','闠':'阓','闡':'阐','闢':'辟','闤':'阛','闥':'闼','阪':'阪','陘':'陉','陝':'陕','陞':'升','陣':'阵','陰':'阴','陳':'陈','陸':'陆','陽':'阳','隉':'陧','隊':'队','階':'阶','隑':'𬮿','隕':'陨','際':'际','隤':'𬯎','隨':'随','險':'险','隮':'𬯀','隯':'陦','隱':'隐','隴':'陇','隸':'隶','隻':'只','雋':'隽','雖':'虽','雙':'双','雛':'雏','雜':'杂','雞':'鸡','離':'离','難':'难','雲':'云','電':'电','霑':'沾','霢':'霡','霧':'雾','霽':'霁','靂':'雳','靄':'霭','靆':'叇','靈':'灵','靉':'叆','靚':'靓','靜':'静','靝':'靔','靦':'腼','靨':'靥','鞏':'巩','鞝':'绱','鞦':'秋','鞽':'鞒','韁':'缰','韃':'鞑','韆':'千','韉':'鞯','韋':'韦','韌':'韧','韍':'韨','韓':'韩','韙':'韪','韜':'韬','韝':'鞲','韞':'韫','韻':'韵','響':'响','頁':'页','頂':'顶','頃':'顷','項':'项','順':'顺','頇':'顸','須':'须','頊':'顼','頌':'颂','頍':'𫠆','頎':'颀','頏':'颃','預':'预','頑':'顽','頒':'颁','頓':'顿','頔':'𬱖','頗':'颇','領':'领','頜':'颌','頠':'𬱟','頡':'颉','頤':'颐','頦':'颏','頫':'𫖯','頭':'头','頮':'颒','頰':'颊','頲':'颋','頴':'颕','頵':'𫖳','頷':'颔','頸':'颈','頹':'颓','頻':'频','頽':'颓','顆':'颗','題':'题','額':'额','顎':'颚','顏':'颜','顒':'颙','顓':'颛','顔':'颜','顗':'𫖮','願':'愿','顙':'颡','顛':'颠','類':'类','顢':'颟','顥':'颢','顧':'顾','顫':'颤','顬':'颥','顯':'显','顰':'颦','顱':'颅','顳':'颞','顴':'颧','風':'风','颭':'飐','颮':'飑','颯':'飒','颱':'台','颳':'刮','颶':'飓','颸':'飔','颺':'飏','颻':'飖','颼':'飕','飀':'飗','飄':'飘','飆':'飙','飈':'飚','飛':'飞','飠':'饣','飢':'饥','飣':'饤','飥':'饦','飩':'饨','飪':'饪','飫':'饫','飭':'饬','飯':'饭','飱':'飧','飲':'饮','飴':'饴','飼':'饲','飽':'饱','飾':'饰','飿':'饳','餃':'饺','餄':'饸','餅':'饼','餈':'糍','餉':'饷','養':'养','餌':'饵','餎':'饹','餏':'饻','餑':'饽','餒':'馁','餓':'饿','餕':'馂','餖':'饾','餗':'𫗧','餘':'余','餚':'肴','餛':'馄','餜':'馃','餞':'饯','餡':'馅','館':'馆','餬':'糊','餱':'糇','餳':'饧','餵':'喂','餶':'馉','餷':'馇','餺':'馎','餼':'饩','餾':'馏','餿':'馊','饁':'馌','饃':'馍','饅':'馒','饈':'馐','饉':'馑','饊':'馓','饋':'馈','饌':'馔','饑':'饥','饒':'饶','饗':'飨','饘':'𫗴','饜':'餍','饞':'馋','饢':'馕','馬':'马','馭':'驭','馮':'冯','馱':'驮','馳':'驰','馴':'驯','馹':'驲','馼':'𫘜','駁':'驳','駃':'𫘝','駉':'𬳶','駐':'驻','駑':'驽','駒':'驹','駓':'𬳵','駔':'驵','駕':'驾','駘':'骀','駙':'驸','駛':'驶','駝':'驼','駟':'驷','駡':'骂','駢':'骈','駪':'𬳽','駭':'骇','駰':'骃','駱':'骆','駸':'骎','駼':'𬳿','駿':'骏','騁':'骋','騂':'骍','騄':'𫘧','騅':'骓','騊':'𫘦','騌':'骔','騍':'骒','騎':'骑','騏':'骐','騑':'𬴂','騖':'骛','騙':'骗','騞':'𬴃','騠':'𫘨','騤':'骙','騧':'䯄','騫':'骞','騭':'骘','騮':'骝','騰':'腾','騱':'𫘬','騵':'𫘪','騶':'驺','騷':'骚','騸':'骟','騾':'骡','驀':'蓦','驁':'骜','驂':'骖','驃':'骠','驄':'骢','驅':'驱','驊':'骅','驌':'骕','驍':'骁','驎':'𬴊','驏':'骣','驕':'骄','驗':'验','驚':'惊','驛':'驿','驟':'骤','驢':'驴','驤':'骧','驥':'骥','驦':'骦','驪':'骊','驫':'骉','骯':'肮','髏':'髅','髒':'脏','體':'体','髕':'髌','髖':'髋','髮':'发','鬆':'松','鬍':'胡','鬚':'须','鬢':'鬓','鬥':'斗','鬧':'闹','鬨':'哄','鬩':'阋','鬮':'阄','鬱':'郁','鬹':'鬶','魎':'魉','魘':'魇','魚':'鱼','魛':'鱽','魟':'𫚉','魢':'鱾','魨':'鲀','魯':'鲁','魴':'鲂','魷':'鱿','魺':'鲄','鮀':'𬶍','鮁':'鲅','鮃':'鲆','鮆':'𫚖','鮈':'𬶋','鮊':'鲌','鮋':'鲉','鮍':'鲏','鮎':'鲇','鮐':'鲐','鮑':'鲍','鮒':'鲋','鮓':'鲊','鮚':'鲒','鮜':'鲘','鮝':'鲞','鮞':'鲕','鮟':'𩽾','鮠':'𬶏','鮡':'𬶐','鮣':'䲟','鮦':'鲖','鮪':'鲔','鮫':'鲛','鮭':'鲑','鮮':'鲜','鮳':'鲓','鮶':'鲪','鮸':'𩾃','鮺':'鲝','鯀':'鲧','鯁':'鲠','鯇':'鲩','鯉':'鲤','鯊':'鲨','鯒':'鲬','鯔':'鲻','鯕':'鲯','鯖':'鲭','鯗':'鲞','鯛':'鲷','鯝':'鲴','鯡':'鲱','鯢':'鲵','鯤':'鲲','鯧':'鲳','鯨':'鲸','鯪':'鲮','鯫':'鲰','鯰':'鲶','鯴':'鲺','鯷':'鳀','鯻':'𬶟','鯽':'鲫','鯿':'鳊','鰁':'鳈','鰂':'鲗','鰃':'鳂','鰆':'䲠','鰈':'鲽','鰉':'鳇','鰊':'𬶠','鰌':'䲡','鰍':'鳅','鰏':'鲾','鰐':'鳄','鰒':'鳆','鰓':'鳃','鰛':'鳁','鰜':'鳒','鰟':'鳑','鰠':'鳋','鰣':'鲥','鰤':'𫚕','鰥':'鳏','鰧':'䲢','鰨':'鳎','鰩':'鳐','鰭':'鳍','鰮':'鳁','鰱':'鲢','鰲':'鳌','鰳':'鳓','鰵':'鳘','鰶':'𬶭','鰷':'鲦','鰹':'鲣','鰺':'鲹','鰻':'鳗','鰼':'鳛','鰾':'鳔','鱀':'𬶨','鱂':'鳉','鱅':'鳙','鱇':'𩾌','鱈':'鳕','鱉':'鳖','鱒':'鳟','鱔':'鳝','鱖':'鳜','鱗':'鳞','鱘':'鲟','鱚':'𬶮','鱝':'鲼','鱟':'鲎','鱠':'鲙','鱣':'鳣','鱤':'鳡','鱧':'鳢','鱨':'鲿','鱭':'鲚','鱯':'鳠','鱲':'𫚭','鱷':'鳄','鱸':'鲈','鱺':'鲡','鳥':'鸟','鳧':'凫','鳩':'鸠','鳬':'凫','鳲':'鸤','鳳':'凤','鳴':'鸣','鳶':'鸢','鳾':'䴓','鴆':'鸩','鴇':'鸨','鴉':'鸦','鴒':'鸰','鴕':'鸵','鴛':'鸳','鴝':'鸲','鴞':'鸮','鴟':'鸱','鴣':'鸪','鴦':'鸯','鴨':'鸭','鴯':'鸸','鴰':'鸹','鴴':'鸻','鴷':'䴕','鴻':'鸿','鴿':'鸽','鵁':'䴔','鵂':'鸺','鵃':'鸼','鵏':'𬷕','鵐':'鹀','鵑':'鹃','鵒':'鹆','鵓':'鹁','鵜':'鹈','鵝':'鹅','鵟':'𫛭','鵠':'鹄','鵡':'鹉','鵪':'鹌','鵬':'鹏','鵮':'鹐','鵯':'鹎','鵰':'雕','鵲':'鹊','鵷':'鹓','鵾':'鹍','鶄':'䴖','鶇':'鸫','鶉':'鹑','鶊':'鹒','鶓':'鹋','鶖':'鹙','鶘':'鹕','鶚':'鹗','鶠':'𬸘','鶡':'鹖','鶥':'鹛','鶩':'鹜','鶪':'䴗','鶬':'鸧','鶯':'莺','鶱':'𬸣','鶲':'鹟','鶴':'鹤','鶹':'鹠','鶺':'鹡','鶻':'鹘','鶼':'鹣','鶿':'鹚','鷀':'鹚','鷁':'鹢','鷂':'鹞','鷄':'鸡','鷉':'䴘','鷊':'鹝','鷓':'鹧','鷖':'鹥','鷗':'鸥','鷙':'鸷','鷚':'鹨','鷟':'𬸦','鷥':'鸶','鷦':'鹪','鷫':'鹔','鷭':'𬸪','鷯':'鹩','鷲':'鹫','鷳':'鹇','鷴':'鹇','鷸':'鹬','鷹':'鹰','鷺':'鹭','鷽':'鸴','鸂':'㶉','鸇':'鹯','鸊':'䴙','鸌':'鹱','鸏':'鹲','鸑':'𬸚','鸕':'鸬','鸘':'鹴','鸚':'鹦','鸛':'鹳','鸝':'鹂','鸞':'鸾','鹵':'卤','鹹':'咸','鹺':'鹾','鹼':'碱','鹽':'盐','麗':'丽','麥':'麦','麩':'麸','麪':'面','麫':'面','麬':'𤿲','麯':'曲','麳':'𪎌','麴':'曲','麵':'面','麼':'么','麽':'么','黃':'黄','黌':'黉','點':'点','黨':'党','黲':'黪','黴':'霉','黶':'黡','黷':'黩','黽':'黾','黿':'鼋','鼂':'鼌','鼉':'鼍','鼕':'冬','鼴':'鼹','齊':'齐','齋':'斋','齎':'赍','齏':'齑','齒':'齿','齔':'龀','齕':'龁','齗':'龂','齘':'𬹼','齙':'龅','齜':'龇','齟':'龃','齠':'龆','齡':'龄','齣':'出','齦':'龈','齧':'啮','𧵳':'䞌','𨋢':'䢂','𨦫':'䦀','𨧀':'𬭊','𨧜':'䦁','𨨏':'𬭛','𨭆':'𬭶','𨭎':'𬭳','𨯅':'䥿','𩣑':'䯃','𩶘':'䲞','齪':'龊','齬':'龉','齮':'𬺈','齯':'𫠜','齲':'龋','齶':'腭','齷':'龌','齼':'𬺓','龍':'龙','龎':'厐','龐':'庞','龑':'䶮','龔':'龚','龕':'龛','龜':'龟','鿁':'䜤','鿓':'鿒','𡑭':'𡋗','𡞵':'㛟','𡠹':'㛿','𡢃':'㛠','𡻕':'岁','𣾷':'㳢','𤪺':'㻘','𤫩':'㻏','𥕥':'𥐰','𧜵':'䙊','𧝞':'䘛','𧩙':'䜥'}
		const me=this,l=me.length
		if(l<1||me.trim()=='')return me
		let o='',i=0
		while(i<l){
			let x=false
			for(let u=Math.min(6,l-i);u>=1;u--){
				const w=me.substr(i,u)
				for(let m of [ps,cs]){
					const v=m[w]
					if(v!==undefined){
						o+=v
						i+=u
						x=true
						break
					}
				}
				if(x)break
			}
			if(!x){
				o+=me[i]
				i++
			}
		}
		return o
	}
	// 字符串转Dom树
	String.prototype.html=function(){return(new DOMParser()).parseFromString(this,'text/html')}
	// 字符串MD5加密
	String.prototype.md5=function(){const s=unescape(encodeURIComponent(this));let l=8*s.length,O=[].fill(0,0,s.length>>2-1);for(let i=0;i<l;i+=8)O[i>>5]|=(255&s.charCodeAt(i/8))<<i%32;O[l>>5]|=128<<l%32;O[14+(l+64>>>9<<4)]=l;const A=(a,b,c,d,e,f)=>F(H(F(F(b,a),F(d,f)),e),c);const B=(a,b,c,d,e,f,h)=>A(b&c| ~b&d,a,b,e,f,h);const C=(a,b,c,d,e,f,h)=>A(b&d|c& ~d,a,b,e,f,h);const D=(a,b,c,d,e,f,h)=>A(b^c^d,a,b,e,f,h);const E=(a,b,c,d,e,f,h)=>A(c^(b| ~d),a,b,e,f,h);const F=(a,b)=>{const c=(65535&a)+(65535&b);return (a>>16)+(b>>16)+(c>>16)<<16|65535&c};const H=(a,b)=>a<<b|a>>>32-b;let a=1732584193,b=-271733879,c=-1732584194,d=271733878,e;for(let i=0; i<O.length; i+=16){const x=a,y=b,z=c,oo=d;b=E(b=E(b=E(b=E(b=D(b=D(b=D(b=D(b=C(b=C(b=C(b=C(b=B(b=B(b=B(b=B(b,c=B(c,d=B(d,a=B(a,b,c,d,O[i],7,-680876936),b,c,O[i+1],12,-389564586),a,b,O[i+2],17,606105819),d,a,O[i+3],22,-1044525330),c=B(c,d=B(d,a=B(a,b,c,d,O[i+4],7,-176418897),b,c,O[i+5],12,1200080426),a,b,O[i+6],17,-1473231341),d,a,O[i+7],22,-45705983),c=B(c,d=B(d,a=B(a,b,c,d,O[i+8],7,1770035416),b,c,O[i+9],12,-1958414417),a,b,O[i+10],17,-42063),d,a,O[i+11],22,-1990404162),c=B(c,d=B(d,a=B(a,b,c,d,O[i+12],7,1804603682),b,c,O[i+13],12,-40341101),a,b,O[i+14],17,-1502002290),d,a,O[i+15],22,1236535329),c=C(c,d=C(d,a=C(a,b,c,d,O[i+1],5,-165796510),b,c,O[i+6],9,-1069501632),a,b,O[i+11],14,643717713),d,a,O[i],20,-373897302),c=C(c,d=C(d,a=C(a,b,c,d,O[i+5],5,-701558691),b,c,O[i+10],9,38016083),a,b,O[i+15],14,-660478335),d,a,O[i+4],20,-405537848),c=C(c,d=C(d,a=C(a,b,c,d,O[i+9],5,568446438),b,c,O[i+14],9,-1019803690),a,b,O[i+3],14,-187363961),d,a,O[i+8],20,1163531501),c=C(c,d=C(d,a=C(a,b,c,d,O[i+13],5,-1444681467),b,c,O[i+2],9,-51403784),a,b,O[i+7],14,1735328473),d,a,O[i+12],20,-1926607734),c=D(c,d=D(d,a=D(a,b,c,d,O[i+5],4,-378558),b,c,O[i+8],11,-2022574463),a,b,O[i+11],16,1839030562),d,a,O[i+14],23,-35309556),c=D(c,d=D(d,a=D(a,b,c,d,O[i+1],4,-1530992060),b,c,O[i+4],11,1272893353),a,b,O[i+7],16,-155497632),d,a,O[i+10],23,-1094730640),c=D(c,d=D(d,a=D(a,b,c,d,O[i+13],4,681279174),b,c,O[i],11,-358537222),a,b,O[i+3],16,-722521979),d,a,O[i+6],23,76029189),c=D(c,d=D(d,a=D(a,b,c,d,O[i+9],4,-640364487),b,c,O[i+12],11,-421815835),a,b,O[i+15],16,530742520),d,a,O[i+2],23,-995338651),c=E(c,d=E(d,a=E(a,b,c,d,O[i],6,-198630844),b,c,O[i+7],10,1126891415),a,b,O[i+14],15,-1416354905),d,a,O[i+5],21,-57434055),c=E(c,d=E(d,a=E(a,b,c,d,O[i+12],6,1700485571),b,c,O[i+3],10,-1894986606),a,b,O[i+10],15,-1051523),d,a,O[i+1],21,-2054922799),c=E(c,d=E(d,a=E(a,b,c,d,O[i+8],6,1873313359),b,c,O[i+15],10,-30611744),a,b,O[i+6],15,-1560198380),d,a,O[i+13],21,1309151649),c=E(c,d=E(d,a=E(a,b,c,d,O[i+4],6,-145523070),b,c,O[i+11],10,-1120210379),a,b,O[i+2],15,718787259),d,a,O[i+9],21,-343485551);a=F(a,x);b=F(b,y);c=F(c,z);d=F(d,oo)}O=Array(a,b,c,d);for(a=0,b='';a<32*O.length;a+=8)b+=String.fromCharCode(O[a>>5]>>>a%32&255);for(O=b,b='0123456789ABCDEF',c=null,d='',e=0;e<O.length;e++){c=O.charCodeAt(e);d+=b.charAt(c>>>4&15)+b.charAt(15&c)}return d.toLowerCase()}
	// 链接地址GET请求
	String.prototype.get=async function(f,v={},m='text',h=null,z='get',t=10){
		let u=this.trim(),o,hs
		if(!u.startsWith('http'))return f(null)
		z=z.toUpperCase().trim()
		const s=Object.keys(v),x={method:z,timeout:t}
		if(z=='GET'&&s.length>0){
			u+=u.includes('?')?'&':'?'
			for(let k of s)u+=k+'='+v[k]+'&'
			if(u.endsWith('&'))u=u.slice(0,-1)
		}
		if(typeof h=='object'&&h)x.headers=h
		if(z.startsWith('P')&&v){
			const ij=_T(v,'object')
			x.body=ij?JSON.stringify(v):v
			if(ij)x.headers['Content-Type']='application/json'
		}
		try{
			o=await W.fetch(u,x)
			hs=o.headers.toPlain()
			if(m=='json')o=await o.json()
			else if(m=='buff')o=await o.arrayBuffer()
			else o=await o.text()
			if(m=='html')o=o.html()
			f(o,hs)
		}catch(e){f(null,hs)}
	}
	// 转换中英符号
	String.prototype.sb=function(){
		const m={
			'\uff0c':',','\u3001':',','\uff0e':'.','\u3002':'.','\uff1a':':','\uff1b':';',
			'\uff01':'!','\uff1f':'?',
			'\u2026':'...','\u22ef':'...',
			'\u201c':'"','\u201d':'"','\u2018':"'",'\u2019':"'",'\uff02':'"','\uff07':"'",
			'\u300c':'"','\u300d':'"','\u300e':'"','\u300f':'"',
			'\u300a':'<','\u300b':'>','\u3008':'<','\u3009':'>',
			'\uff08':'(','\uff09':')','\u3010':'[','\u3011':']','\uff3b':'[','\uff3d':']',
			'\uff5b':'{','\uff5d':'}','\u3014':'[','\u3015':']','\u3016':'[','\u3017':']',
			'\u3018':'{','\u3019':'}','\u301a':'[','\u301b':']',
			'\u2014':'-','\u2015':'-','\u2013':'-','\uff0d':'-','\u2500':'-','\u2501':'-',
			'\u2e3a':'-','\u2e3b':'-','\u30fc':'-','\ufe63':'-','\uff70':'-'
		}
		return this.replace(new RegExp(`[${Object.keys(m).join('')}]`,'g'),ch=>m[ch])
	}
	// 容量
	Number.prototype.usage=function(){
		if(this<1024)return `${this}B`
		if(this/1024<1024)return `${parseFloat((this/1024).toFixed(3))}KB`
		if(this/1024/1024<1024)return `${parseFloat((this/1024/1024).toFixed(3))}MB`
		if(this/1024/1024/1024<1024)return `${parseFloat((this/1024/1024/1024).toFixed(3))}GB`
		if(this/1024/1024/1024/1024<1024)return `${parseFloat((this/1024/1024/1024/1024).toFixed(3))}TB`
		return `~`
	}
	// 时间戳转时间字串
	Number.prototype.dt=function(){const s=Math.abs(Math.floor(this)),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),rs=Math.floor(s%60),fh=h>0?String(h).padStart(2,'0')+':':'',fm=String(m).padStart(2,'0'),fs=String(rs).padStart(2,'0');return s==0?'00:00':`${this>0?'':'-'}${fh}${fm}:${fs}`}

	// 节点筛选
	Document.prototype.$=Element.prototype.$=function(_){return this.querySelector(_)}
	Document.prototype.$$=Element.prototype.$$=function(_){
		if(_=='text'){
			const o=[],$=document.createNodeIterator(this,NodeFilter.SHOW_TEXT,_=>_.textContent.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT)
			_=$.nextNode()
			while(_){
				o.push(_)
				_=$.nextNode()
			}
			return o
		}
		return Array.from(this.querySelectorAll(_))
	}

	// 节点属性操作
	Element.prototype.sa=function(){
		if(arguments.length<1)return this
		const x=arguments[0]
		if(typeof x=='object'){
			for(let k in x)if((k=k.trim()))this.setAttribute(k,x[k].toString())
			return this
		}
		let s=Array.from(arguments)
		if(s.find(_=>typeof _!='string'))return this
		s=s.map(_=>_.trim())
		for(let _ of s)this.setAttribute(_,'')
		return this
	}
	Element.prototype.ga=function(){
		if(arguments.length<1)return null
		const s=[...(new Set(arguments))].filter(_=>(typeof _=='string')&&_.trim()).map(_=>_.trim())
		if(s.length==1)return this.getAttribute(s[0])
		const o={}
		for(let k of s)o[k]=this.getAttribute(k)
		return o
	}
	Element.prototype.ha=function(){
		let a=arguments.length>0&&typeof arguments[0]=='string'?arguments[0].trim():''
		return a===''?false:this.hasAttribute(a)
	}
	Element.prototype.da=function(){
		if(arguments.length>0)(new Set(arguments)).forEach(_=>(typeof _=='string')&&(_=_.trim())&&this.hasAttribute(_)&&this.removeAttribute(_))
		return this
	}

	// 节点内容获取/设置
	Element.prototype.html=function(_){
		if(typeof _=='boolean')return this.outerHTML.trim()
		if(undefined===_)return this.innerHTML.trim()
		if(typeof _=='string')this.innerHTML=_.trim()
		return this
	}

	// 数据库操作
	W.DB=(db,store)=>new Promise((S,C)=>{
		let $=indexedDB.open(db,8)
		$.onerror=e=>C(e)
		$.onsuccess=e=>S($.result)
		$.onupgradeneeded=e=>{
			$=e.target.result
			$.objectStoreNames.contains(store)||$.createObjectStore(store,{keyPath:'id'})
			W.DB(db,store)
		}
	})
	W.DA=(_,store,id,o)=>new Promise((S,C)=>{
		const r=_.transaction(store,'readwrite').objectStore(store).add({id,o})
		r.onsuccess=e=>S(true)
		r.onerror=e=>S(false)
	})
	W.DG=(_,store,i)=>new Promise((S,C)=>{
		const r=_.transaction(store).objectStore(store).get(i)
		r.onsuccess=e=>S(r.result?r.result.o:null)
		r.onerror=e=>S(null)
	})
	W.DU=(_,store,o)=>new Promise((S,C)=>{
		const r=_.transaction(store,'readwrite').objectStore(store).put(o)
		r.onsuccess=e=>S(null)
		r.onerror=e=>S(null)
	})

	// 数据类型获取/验证
	W._T=(a,b)=>{
		const _=Object.prototype.toString.call(a).split(' ').pop().replace(/]$/,'').toLowerCase()
		if(b=='element'||b=='exception'||b=='error')return _.includes(b)
		return b?_.includes(b):_
	}

	// 监听错误记录
	const ecm=new WeakSet(),ecc=me=>{
		if(ecm.has(me))return
		me.addEventListener('click',()=>me.remove())
		ecm.add(me)
	}
	const eoc=me=>me.$$('div[type]').forEach(ecc),wgs=$O.$('#w_logs')
	new MutationObserver(s=>s.forEach(_=>_.addedNodes.forEach(_=>{
		if(_.nodeType!==1)return
		if(_.id=='w_logs')eoc(_)
		if(_.matches?.('div[type]'))ecc(_)
		_.$$?.('div[type]').forEach(ecc)
		_=_.$?.('#w_logs')
		_&&eoc(_)
	}))).observe($O.body,{childList:true,subtree:true})
	if(wgs)eoc(wgs)

})(window)