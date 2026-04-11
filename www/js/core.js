(function(W){
	'use strict';

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
		x.http.setRequestTimeout(5)
		x.http.setFollowRedirect(true)
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
		o=o||{}
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
		this.signal=o.signal||(x&&x.signal)||null
		this.bodyUsed=false
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
			const signal=R.signal
			if(signal&&signal.aborted){N(new DOMException('The operation was aborted.','AbortError'));return}
			const http=H(),headers=R.headers.toPlain(),body=B(R._rawBody,headers),X={
				method:R.method.toLowerCase(),headers,
				responseType:'arraybuffer',timeout:5,followRedirect:true
			}
			if(body){X.data=body.data;X.serializer=body.serializer}
			let onAbort=null
			// log('网络请求(fetch)',R.url,Object.keys(headers).length>0?headers:null)
			
			const I=http.sendRequest(R.url,X,o=>{
				if(signal&&onAbort)signal.removeEventListener('abort',onAbort)
				if(signal&&signal.aborted){N(new DOMException('The operation was aborted.','AbortError'));return}
				// const oo=new TextDecoder('utf-8').decode(new Uint8Array(o.data))
				// log('请求成功(fetch)',o,oo.startsWith('{')?JSON.parse(oo):oo)
				
				Y(new RP((o.data instanceof ArrayBuffer)?o.data:new ArrayBuffer(0),{
					status:o.status,statusText:SM[o.status]||'',url:o.url||R.url,
					headers:new HS(o.headers||{}),redirected:!!(o.url&&o.url!==R.url)
				}))
			},o=>{
				// log('请求失败(fetch)',o,'error')
				
				if(signal&&onAbort)signal.removeEventListener('abort',onAbort)
				if(o.status==-8||(signal&&signal.aborted)){N(new DOMException('The operation was aborted.','AbortError'));return}
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
			timeout:(self.timeout>0)?(self.timeout/1000):60,
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
	W.fetch=FC
	W.Headers=HS
	W.Request=RQ
	W.Response=RP
	W.XMLHttpRequest=XR

	W.$O=document // 简化 document

	W.run=(g,n,i)=>(W.I===i&&W[g]&&W[g][n]&&(typeof W[g][n]=='function')?W[g][n]:(_=>{})) // 自定义方法校验

	// 本地缓存操作
	String.prototype.gc=function(_=null){return JSON.parse(localStorage.getItem(this.trim())||'null')||_}
	String.prototype.sc=function(){if(arguments.length>0)localStorage.setItem(this.trim(),JSON.stringify(arguments[0]))}
	String.prototype.hc=function(){return localStorage.hasOwnProperty(this.trim())}
	String.prototype.dc=function(){this.hc()&&localStorage.removeItem(this.trim())}

	// 字符串转Dom树
	String.prototype.html=function(){return(new DOMParser()).parseFromString(this,'text/html')}
	// 字符串MD5加密
	String.prototype.md5=function(){const s=unescape(encodeURIComponent(this));let l=8*s.length,O=[].fill(0,0,s.length>>2-1);for(let i=0;i<l;i+=8)O[i>>5]|=(255&s.charCodeAt(i/8))<<i%32;O[l>>5]|=128<<l%32;O[14+(l+64>>>9<<4)]=l;const A=(a,b,c,d,e,f)=>F(H(F(F(b,a),F(d,f)),e),c);const B=(a,b,c,d,e,f,h)=>A(b&c| ~b&d,a,b,e,f,h);const C=(a,b,c,d,e,f,h)=>A(b&d|c& ~d,a,b,e,f,h);const D=(a,b,c,d,e,f,h)=>A(b^c^d,a,b,e,f,h);const E=(a,b,c,d,e,f,h)=>A(c^(b| ~d),a,b,e,f,h);const F=(a,b)=>{const c=(65535&a)+(65535&b);return (a>>16)+(b>>16)+(c>>16)<<16|65535&c};const H=(a,b)=>a<<b|a>>>32-b;let a=1732584193,b=-271733879,c=-1732584194,d=271733878,e;for(let i=0; i<O.length; i+=16){const x=a,y=b,z=c,oo=d;b=E(b=E(b=E(b=E(b=D(b=D(b=D(b=D(b=C(b=C(b=C(b=C(b=B(b=B(b=B(b=B(b,c=B(c,d=B(d,a=B(a,b,c,d,O[i],7,-680876936),b,c,O[i+1],12,-389564586),a,b,O[i+2],17,606105819),d,a,O[i+3],22,-1044525330),c=B(c,d=B(d,a=B(a,b,c,d,O[i+4],7,-176418897),b,c,O[i+5],12,1200080426),a,b,O[i+6],17,-1473231341),d,a,O[i+7],22,-45705983),c=B(c,d=B(d,a=B(a,b,c,d,O[i+8],7,1770035416),b,c,O[i+9],12,-1958414417),a,b,O[i+10],17,-42063),d,a,O[i+11],22,-1990404162),c=B(c,d=B(d,a=B(a,b,c,d,O[i+12],7,1804603682),b,c,O[i+13],12,-40341101),a,b,O[i+14],17,-1502002290),d,a,O[i+15],22,1236535329),c=C(c,d=C(d,a=C(a,b,c,d,O[i+1],5,-165796510),b,c,O[i+6],9,-1069501632),a,b,O[i+11],14,643717713),d,a,O[i],20,-373897302),c=C(c,d=C(d,a=C(a,b,c,d,O[i+5],5,-701558691),b,c,O[i+10],9,38016083),a,b,O[i+15],14,-660478335),d,a,O[i+4],20,-405537848),c=C(c,d=C(d,a=C(a,b,c,d,O[i+9],5,568446438),b,c,O[i+14],9,-1019803690),a,b,O[i+3],14,-187363961),d,a,O[i+8],20,1163531501),c=C(c,d=C(d,a=C(a,b,c,d,O[i+13],5,-1444681467),b,c,O[i+2],9,-51403784),a,b,O[i+7],14,1735328473),d,a,O[i+12],20,-1926607734),c=D(c,d=D(d,a=D(a,b,c,d,O[i+5],4,-378558),b,c,O[i+8],11,-2022574463),a,b,O[i+11],16,1839030562),d,a,O[i+14],23,-35309556),c=D(c,d=D(d,a=D(a,b,c,d,O[i+1],4,-1530992060),b,c,O[i+4],11,1272893353),a,b,O[i+7],16,-155497632),d,a,O[i+10],23,-1094730640),c=D(c,d=D(d,a=D(a,b,c,d,O[i+13],4,681279174),b,c,O[i],11,-358537222),a,b,O[i+3],16,-722521979),d,a,O[i+6],23,76029189),c=D(c,d=D(d,a=D(a,b,c,d,O[i+9],4,-640364487),b,c,O[i+12],11,-421815835),a,b,O[i+15],16,530742520),d,a,O[i+2],23,-995338651),c=E(c,d=E(d,a=E(a,b,c,d,O[i],6,-198630844),b,c,O[i+7],10,1126891415),a,b,O[i+14],15,-1416354905),d,a,O[i+5],21,-57434055),c=E(c,d=E(d,a=E(a,b,c,d,O[i+12],6,1700485571),b,c,O[i+3],10,-1894986606),a,b,O[i+10],15,-1051523),d,a,O[i+1],21,-2054922799),c=E(c,d=E(d,a=E(a,b,c,d,O[i+8],6,1873313359),b,c,O[i+15],10,-30611744),a,b,O[i+6],15,-1560198380),d,a,O[i+13],21,1309151649),c=E(c,d=E(d,a=E(a,b,c,d,O[i+4],6,-145523070),b,c,O[i+11],10,-1120210379),a,b,O[i+2],15,718787259),d,a,O[i+9],21,-343485551);a=F(a,x);b=F(b,y);c=F(c,z);d=F(d,oo)}O=Array(a,b,c,d);for(a=0,b='';a<32*O.length;a+=8)b+=String.fromCharCode(O[a>>5]>>>a%32&255);for(O=b,b='0123456789ABCDEF',c=null,d='',e=0;e<O.length;e++){c=O.charCodeAt(e);d+=b.charAt(c>>>4&15)+b.charAt(15&c)}return d.toLowerCase()}
	// 链接地址GET请求
	String.prototype.get=function(f,p={},m='text'){
		let u=this.trim(),s=Object.keys(p)
		if(!u.startsWith('http'))return f(null)
		if(s.length>0){
			u+=u.includes('?')?'&':'?'
			for(let k of s)u+=k+'='+p[k]+'&'
			if(u.endsWith('&'))u=u.slice(0,-1)
		}
		let o=W.fetch(u)
		if(m=='json')o=o.then(_=>_.json())
		else o=o.then(_=>_.text())
		if(m=='html')o=o.then(_=>_.html())
		o.then(_=>f(_)).catch(e=>{
			log('请求失败',e.message,e)
			f(null)
		})
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
	Element.prototype.da=function(){
		if(arguments.length>0)(new Set(arguments)).forEach(_=>(typeof _=='string')&&(_=_.trim())&&this.hasAttribute(_)&&this.removeAttribute(_))
		return this
	}

	// 节点内容获取/设置
	Element.prototype.html=function(_){
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
		if(b=='element')return _.includes(b)&&a.isConnected
		return b?_.includes(b):_
	}

})(window)