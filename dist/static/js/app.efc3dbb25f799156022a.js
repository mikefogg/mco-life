webpackJsonp([1],{NHnr:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("7t+N"),n=e.n(a),i=e("7+uW"),r={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{attrs:{id:"app"}},[this._m(0),t("router-view"),this._m(1)],1)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"disclaimer"},[this._v("This is an"),t("strong",[this._v("UNOFFICIAL")]),this._v("website built to share information around the MCO token. Visit"),t("a",{attrs:{href:"https://crypto.com",target:"_blank"}},[this._v("crypto.com")]),this._v("for Official Information.")])},function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"footer"},[e("div",{staticClass:"donations"},[e("div",{staticClass:"label"},[s._v("As always, donations are always appreciated to help keep the servers running"),e("em",[s._v("#willworkformco")])]),e("ul",{staticClass:"methods"},[e("li",[e("span",[s._v("BTC:")]),s._v("18HXh3Z6v284cy6F1PA6mPtFQig39zrNWq")]),e("li",[e("span",[s._v("ETH/MCO:")]),s._v("0x2415f94dF452C91BbfF510aEEc7eF89640b1cB63")])])]),e("div",{staticClass:"built-by"},[s._v("Built with"),e("span",[s._v("100% Pure Believe")]),s._v("from"),e("span",[s._v("Austin, TX.")]),s._v("Find me on the Crypto.com Discord"),e("strong",[s._v("@mikef")])])])}]};var o=e("VU/8")({name:"app",metaInfo:{title:"mco.life | MCO Token Information",link:[{rel:"favicon",href:"./assets/images/favicon-32x32.png"}]}},r,!1,function(s){e("hfz6")},null,null).exports,l=e("/ocq"),c={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"nav-area"},[t("div",{staticClass:"header"},[t("div",{staticClass:"logo"},[t("router-link",{attrs:{to:{name:"RegistrationsPage"}}},[this._v("mco.life")])],1),t("div",{staticClass:"navigation"},[t("ul",[t("li",[t("router-link",{attrs:{to:{name:"RegistrationsPage"}}},[this._v("Registrations")])],1)])])])])},staticRenderFns:[]};var u=e("VU/8")({name:"Navigation"},c,!1,function(s){e("jp1Z")},"data-v-0ebdbfbc",null).exports,p={name:"FlipClock",mounted:function(){e("kzyQ"),$(this.$el).find(".money-2020-countdown").FlipClock((new Date("3/13/2018")-new Date)/1e3,{clockFace:"DailyCounter",countdown:!0})}},d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"flipclock"},[t("div",{staticClass:"money-2020-countdown"})])}]};var m=e("VU/8")(p,d,!1,function(s){e("esBj")},null,null).exports,v=e("M4fF"),j=e.n(v),h=e("ViqS"),f=e.n(h),y=e("PJh5"),_=e.n(y),g={name:"RegistrationsPage",data:function(){return{loaded:!1,cardChart:null,price:{availableSupply:null,totalSupply:null,priceBtc:null,priceUsd:null,rank:null,timestamp:null},reservations:{today:null,total:null,timestamp:null},daily:null}},computed:{apiResponse:function(){return this.$store.state.apiResponse},updatedAt:function(){return this.reservations.timestamp?_()(this.reservations.timestamp).calendar():null},dailyResults:function(){var s=j.a.take(j.a.reverse(this.daily),14);if(!j.a.isEmpty(s)){var t=j.a.max(s.map(function(s){return s.reservations})),e=j.a.size(s);return j.a.map(j.a.reverse(s),function(s,a){var n=s.reservations/t*100;return{count:s.reservations,percent:n,margin:100-n,opacity:.1+a/e,timestamp:_()(s.date).format("MM/DD")}})}}},components:{navigation:u,Flipclock:m},mounted:function(){this.loadData()},methods:{loadData:function(){var s=this;this.apiResponse?this.handleApiResponse(this.apiResponse):n.a.get("https://mco-life-api.herokuapp.com/status").then(function(t){s.$store.commit("apiResponse",t),s.handleApiResponse(s.apiResponse)}).catch(function(s){console.log("error:",s)})},handleApiResponse:function(s){this.price.availableSupply=s.price.available_supply,this.price.totalSupply=s.price.available_supply,this.price.priceBtc=s.price.price_btc,this.price.priceUsd=s.price.price_usd,this.price.rank=s.price.rank,this.price.timestamp=s.price.timestamp,this.reservations.timestamp=s.reservations.timestamp,this.reservations.today=s.reservations.today,this.reservations.total=s.reservations.total,this.daily=s.daily,this.loaded=!0},formatNumeral:function(s){return f()(s).format("0,0")},formatPrice:function(s){return f()(s).format("$0,0.00")},formatPriceSmall:function(s){return f()(s).format("$0,0")},formatPercent:function(s){return f()(s).format("0,0.00%")}}},b={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"registrations-page"},[e("div",{staticClass:"section hero"},[e("navigation"),e("div",{staticClass:"header-text-container bold split"},[e("div",{staticClass:"left-area"},[s._m(0),s.loaded?e("h2",[s._v("There are currently "),e("strong",[s._v(s._s(s.formatNumeral(s.reservations.total)))]),s._v(" card reservations!")]):s._e(),s.loaded?e("h3",[s._v("Last Updated "+s._s(s.updatedAt))]):s._e()]),s.loaded?s._e():e("div",{staticClass:"loading-indicator"},[s._m(1)]),e("transition",{attrs:{name:"fade"}},[s.loaded?e("div",{staticClass:"right-area"},[e("div",{staticClass:"chart-label"},[s._v("Daily New Card Reservations")]),e("div",{staticClass:"custom-chart"},s._l(s.dailyResults,function(t){return e("div",{staticClass:"row"},[e("div",{staticClass:"bar",style:{height:t.percent+"%",top:t.margin+"%",opacity:t.opacity}},[e("div",{staticClass:"count"},[s._v(s._s(t.count)+" "),e("span",{staticClass:"date"},[s._v(s._s(t.timestamp))])])])])}))]):s._e()])],1)],1)])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("h1",[this._v("An unofficial website built & maintained by "),t("i",[this._v("(and for)")]),this._v(" the Crypto.com community")])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"spinner-white"},[t("div"),t("div"),t("div")])}]};var k=e("VU/8")(g,b,!1,function(s){e("ibzx")},"data-v-5c8248fc",null).exports,z=e("AYPi"),C=e.n(z),w=e("p3jY"),R=e.n(w);i.a.use(l.a),i.a.use(R.a);var F=new l.a({routes:[{path:"/",name:"RegistrationsPage",component:k}]});i.a.use(C.a,{id:"UA-112492567-1",router:F});var x=F,E=e("NYxO");window.$=n.a,i.a.use(E.a),i.a.config.productionTip=!1;var P=new E.a.Store({state:{apiResponse:null},mutations:{apiResponse:function(s,t){s.apiResponse=t}}});new i.a({el:"#app",router:x,store:P,template:"<App/>",components:{App:o}})},esBj:function(s,t){},hfz6:function(s,t){},ibzx:function(s,t){},jp1Z:function(s,t){},uslO:function(s,t,e){var a={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function n(s){return e(i(s))}function i(s){var t=a[s];if(!(t+1))throw new Error("Cannot find module '"+s+"'.");return t}n.keys=function(){return Object.keys(a)},n.resolve=i,s.exports=n,n.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.efc3dbb25f799156022a.js.map