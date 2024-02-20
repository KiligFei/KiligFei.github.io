import{R as j,ab as U,ac as $,ad as I,ae as Y,af as R,ag as T,ah as W,K,ai as b,z as B,O as M,L as J}from"./entry.78da1c39.js";import{p as H}from"./index.a6ef77ff.js";const q="memory",G=()=>{const r=new Map;return{name:q,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function Z(r){return!r||typeof r.then!="function"?Promise.resolve(r):r}function g(r,...t){try{return Z(r(...t))}catch(n){return Promise.reject(n)}}function F(r){const t=typeof r;return r===null||t!=="object"&&t!=="function"}function V(r){const t=Object.getPrototypeOf(r);return!t||t.isPrototypeOf(Object)}function D(r){if(F(r))return String(r);if(V(r)||Array.isArray(r))return JSON.stringify(r);if(typeof r.toJSON=="function")return D(r.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function L(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const _="base64:";function Q(r){if(typeof r=="string")return r;L();const t=Buffer.from(r).toString("base64");return _+t}function X(r){return typeof r!="string"||!r.startsWith(_)?r:(L(),Buffer.from(r.slice(_.length),"base64"))}const k=["hasItem","getItem","setItem","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function ee(r,t){if(t=v(t),!t)return r;const n={...r};for(const i of k)n[i]=(s="",...c)=>r[i](t+s,...c);return n.getKeys=(i="",...s)=>r.getKeys(t+i,...s).then(c=>c.map(u=>u.slice(t.length))),n}function p(r){return r?r.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function v(r){return r=p(r),r?r+":":""}const te="memory",re=()=>{const r=new Map;return{name:te,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function ne(r={}){const t={mounts:{"":r.driver||re()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},n=e=>{for(const a of t.mountpoints)if(e.startsWith(a))return{base:a,relativeKey:e.slice(a.length),driver:t.mounts[a]};return{base:"",relativeKey:e,driver:t.mounts[""]}},i=(e,a)=>t.mountpoints.filter(o=>o.startsWith(e)||a&&e.startsWith(o)).map(o=>({relativeBase:e.length>o.length?e.slice(o.length):void 0,mountpoint:o,driver:t.mounts[o]})),s=(e,a)=>{if(t.watching){a=p(a);for(const o of t.watchListeners)o(e,a)}},c=async()=>{if(!t.watching){t.watching=!0;for(const e in t.mounts)t.unwatch[e]=await P(t.mounts[e],s,e)}},u=async()=>{if(t.watching){for(const e in t.unwatch)await t.unwatch[e]();t.unwatch={},t.watching=!1}},h={hasItem(e,a={}){e=p(e);const{relativeKey:o,driver:f}=n(e);return g(f.hasItem,o,a)},getItem(e,a={}){e=p(e);const{relativeKey:o,driver:f}=n(e);return g(f.getItem,o,a).then(m=>j(m))},getItemRaw(e,a={}){e=p(e);const{relativeKey:o,driver:f}=n(e);return f.getItemRaw?g(f.getItemRaw,o,a):g(f.getItem,o,a).then(m=>X(m))},async setItem(e,a,o={}){if(a===void 0)return h.removeItem(e);e=p(e);const{relativeKey:f,driver:m}=n(e);m.setItem&&(await g(m.setItem,f,D(a),o),m.watch||s("update",e))},async setItemRaw(e,a,o={}){if(a===void 0)return h.removeItem(e,o);e=p(e);const{relativeKey:f,driver:m}=n(e);if(m.setItemRaw)await g(m.setItemRaw,f,a,o);else if(m.setItem)await g(m.setItem,f,Q(a),o);else return;m.watch||s("update",e)},async removeItem(e,a={}){typeof a=="boolean"&&(a={removeMata:a}),e=p(e);const{relativeKey:o,driver:f}=n(e);f.removeItem&&(await g(f.removeItem,o,a),a.removeMata&&await g(f.removeItem,o+"$",a),f.watch||s("remove",e))},async getMeta(e,a={}){typeof a=="boolean"&&(a={nativeOnly:a}),e=p(e);const{relativeKey:o,driver:f}=n(e),m=Object.create(null);if(f.getMeta&&Object.assign(m,await g(f.getMeta,o,a)),!a.nativeOnly){const l=await g(f.getItem,o+"$",a).then(w=>j(w));l&&typeof l=="object"&&(typeof l.atime=="string"&&(l.atime=new Date(l.atime)),typeof l.mtime=="string"&&(l.mtime=new Date(l.mtime)),Object.assign(m,l))}return m},setMeta(e,a,o={}){return this.setItem(e+"$",a,o)},removeMeta(e,a={}){return this.removeItem(e+"$",a)},async getKeys(e,a={}){e=v(e);const o=i(e,!0);let f=[];const m=[];for(const l of o){const E=(await g(l.driver.getKeys,l.relativeBase,a)).map(d=>l.mountpoint+p(d)).filter(d=>!f.some(y=>d.startsWith(y)));m.push(...E),f=[l.mountpoint,...f.filter(d=>!d.startsWith(l.mountpoint))]}return e?m.filter(l=>l.startsWith(e)&&!l.endsWith("$")):m.filter(l=>!l.endsWith("$"))},async clear(e,a={}){e=v(e),await Promise.all(i(e,!1).map(async o=>{if(o.driver.clear)return g(o.driver.clear,o.relativeBase,a);if(o.driver.removeItem){const f=await o.driver.getKeys(o.relativeBase,a);return Promise.all(f.map(m=>o.driver.removeItem(m)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(e=>C(e)))},async watch(e){return await c(),t.watchListeners.push(e),async()=>{t.watchListeners=t.watchListeners.filter(a=>a!==e),t.watchListeners.length===0&&await u()}},async unwatch(){t.watchListeners=[],await u()},mount(e,a){if(e=v(e),e&&t.mounts[e])throw new Error(`already mounted at ${e}`);return e&&(t.mountpoints.push(e),t.mountpoints.sort((o,f)=>f.length-o.length)),t.mounts[e]=a,t.watching&&Promise.resolve(P(a,s,e)).then(o=>{t.unwatch[e]=o}).catch(console.error),h},async unmount(e,a=!0){e=v(e),!(!e||!t.mounts[e])&&(t.watching&&e in t.unwatch&&(t.unwatch[e](),delete t.unwatch[e]),a&&await C(t.mounts[e]),t.mountpoints=t.mountpoints.filter(o=>o!==e),delete t.mounts[e])},getMount(e=""){e=p(e)+":";const a=n(e);return{driver:a.driver,base:a.base}},getMounts(e="",a={}){return e=p(e),i(e,a.parents).map(f=>({driver:f.driver,base:f.mountpoint}))}};return h}function P(r,t,n){return r.watch?r.watch((i,s)=>t(i,n+s)):()=>{}}async function C(r){typeof r.dispose=="function"&&await g(r.dispose)}function ie(r={}){const t=ae(n,r.operators);function n(i,s){return typeof s!="object"||s instanceof RegExp?t.$eq(i,s):Object.keys(s||{}).every(c=>{const u=s[c];if(c.startsWith("$")&&t[c]){const h=t[c];return typeof h=="function"?h(i,u):!1}return n(U(i,c),u)})}return n}function ae(r,t={}){return{$match:(n,i)=>r(n,i),$eq:(n,i)=>i instanceof RegExp?i.test(n):n===i,$ne:(n,i)=>i instanceof RegExp?!i.test(n):n!==i,$not:(n,i)=>!r(n,i),$and:(n,i)=>($(i,"$and requires an array as condition"),i.every(s=>r(n,s))),$or:(n,i)=>($(i,"$or requires an array as condition"),i.some(s=>r(n,s))),$in:(n,i)=>I(i).some(s=>Array.isArray(n)?r(n,{$contains:s}):r(n,s)),$contains:(n,i)=>(n=Array.isArray(n)?n:String(n),I(i).every(s=>n.includes(s))),$icontains:(n,i)=>{if(typeof i!="string")throw new TypeError("$icontains requires a string, use $contains instead");return n=String(n).toLocaleLowerCase(),I(i).every(s=>n.includes(s.toLocaleLowerCase()))},$containsAny:(n,i)=>($(i,"$containsAny requires an array as condition"),n=Array.isArray(n)?n:String(n),i.some(s=>n.includes(s))),$exists:(n,i)=>i?typeof n<"u":typeof n>"u",$type:(n,i)=>typeof n===String(i),$regex:(n,i)=>{if(!(i instanceof RegExp)){const s=String(i).match(/\/(.*)\/([dgimsuy]*)$/);i=s?new RegExp(s[1],s[2]||""):new RegExp(i)}return i.test(String(n||""))},$lt:(n,i)=>n<i,$lte:(n,i)=>n<=i,$gt:(n,i)=>n>i,$gte:(n,i)=>n>=i,...t||{}}}function x(r){const t=ie(),n=(s,{query:c,before:u,after:h})=>{const e=typeof c=="string"?{_path:c}:c,a=s.findIndex(f=>t(f,e));u=u??1,h=h??1;const o=new Array(u+h).fill(null,0);return a===-1?o:o.map((f,m)=>s[a-u+m+ +(m>=u)]||null)},i=[(s,c)=>s.filter(u=>I(c.where).every(h=>t(u,h))),(s,c)=>I(c.sort).forEach(u=>Y(s,u)),(s,c)=>c.surround?n(s,c.surround):s,(s,c)=>c.skip?s.slice(c.skip):s,(s,c)=>c.limit?s.slice(0,c.limit):s,(s,c)=>R(T(c.without))(s),(s,c)=>R(W(c.only))(s)];return async s=>{const c=await r(),u=s.params(),h=i.reduce((e,a)=>a(e,u)||e,c);return u.first?h[0]:h}}var se=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},oe={exports:{}};(function(r,t){(function(n,i,s){r.exports=s(),r.exports.default=s()})("slugify",se,function(){var n=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),i=JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');function s(c,u){if(typeof c!="string")throw new Error("slugify: string argument expected");u=typeof u=="string"?{replacement:u}:u||{};var h=i[u.locale]||{},e=u.replacement===void 0?"-":u.replacement,a=u.trim===void 0?!0:u.trim,o=c.normalize().split("").reduce(function(f,m){var l=h[m];return l===void 0&&(l=n[m]),l===void 0&&(l=m),l===e&&(l=" "),f+l.replace(u.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return u.strict&&(o=o.replace(/[^A-Za-z0-9\s]/g,"")),a&&(o=o.trim()),o=o.replace(/\s+/g,e),u.lower&&(o=o.toLowerCase()),o}return s.extend=function(c){Object.assign(n,c)},s})})(oe);const ce=r=>r.split(/[\s-]/g).map(H).join(" ");function ue(r,t){const{navigation:n}=K().public.content,i=c=>({...fe(["title",...n.fields])(c),...me(c==null?void 0:c.navigation)?c.navigation:{}}),s=r.sort((c,u)=>c._path.localeCompare(u._path)).reduce((c,u)=>{const h=u._path.substring(1).split("/"),e=u._id.split(":").slice(1),a=!!e[e.length-1].match(/([1-9][0-9]*\.)?index.md/g),o=l=>({title:l.title,_path:l._path,_file:l._file,children:[],...i(l),...l._draft?{_draft:!0}:{}}),f=o(u);if(a){const l=t[f._path];if(typeof(l==null?void 0:l.navigation)<"u"&&!(l!=null&&l.navigation))return c;if(u._path!=="/"){const w=o(u);f.children.push(w)}Object.assign(f,i(l))}return h.length===1?(c.push(f),c):(h.slice(0,-1).reduce((l,w,E)=>{const d="/"+h.slice(0,E+1).join("/"),y=t[d];if(typeof(y==null?void 0:y.navigation)<"u"&&!y.navigation)return[];let A=l.find(N=>N._path===d);return A||(A={title:ce(w),_path:d,_file:u._file,children:[],...i(y)},l.push(A)),A.children},c).push(f),c)},[]);return z(s)}const le=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function z(r){var n;const t=r.sort((i,s)=>le.compare(i._file,s._file));for(const i of t)(n=i.children)!=null&&n.length?z(i.children):delete i.children,delete i._file;return r}function fe(r){return t=>(t=t||{},r&&r.length?r.filter(n=>typeof t[n]<"u").reduce((n,i)=>Object.assign(n,{[i]:t[i]}),{}):t)}function me(r){return Object.prototype.toString.call(r)==="[object Object]"}const he=r=>J(r,K().public.content.api.baseURL),ge=ee(ne({driver:G()}),"@content");function pe(r){async function t(){const n=new Set(await r.getKeys("cache:")),i=M().getPreviewToken();if(i){const c=await r.getItem(`${i}$`).then(e=>e||{});if(Array.isArray(c.ignoreSources)){const e=c.ignoreSources.map(a=>`cache:${a.trim()}:`);for(const a of n)e.some(o=>a.startsWith(o))&&n.delete(a)}const u=await r.getKeys(`${i}:`),h=await Promise.all(u.map(e=>r.getItem(e)));for(const e of h)n.delete(`cache:${e._id}`),e.__deleted||n.add(`${i}:${e._id}`)}return await Promise.all(Array.from(n).map(c=>r.getItem(c)))}return{storage:r,fetch:x(t),query:n=>b(x(t),n)}}let S=null,O=null;async function de(){return O?await O:S||(O=ye(),S=await O),S}async function ye(){const r=B(),{content:t}=K().public,n=pe(ge),i=await n.storage.getItem("integrity");if(t.integrity!==+(i||0)){const{contents:s,navigation:c}=await $fetch(he(t.integrity?`cache.${t.integrity}.json`:"cache.json"));await Promise.all(s.map(u=>n.storage.setItem(`cache:${u._id}`,u))),await n.storage.setItem("navigation",c),await n.storage.setItem("integrity",t.integrity)}return await r.callHook("content:storage",n.storage),n}async function Ie(r){const t=await de();if(!M().getPreviewToken()&&Object.keys(r||{}).length===0)return t.storage.getItem("navigation");const n=await t.query(r).where({_partial:!1,navigation:{$ne:!1}}).find(),s=(await t.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((c,u)=>{var e;((e=u.title)==null?void 0:e.toLowerCase())==="dir"&&(u.title=void 0);const h=u._path.split("/").slice(0,-1).join("/")||"/";return c[h]={...u,...u.body},c},{});return ue(n,s)}export{ge as contentStorage,pe as createDB,Ie as generateNavigation,de as useContentDatabase};
