webpackJsonp([1],{NHnr:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("7t+N"),i=e.n(a),n=e("7+uW"),r={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{attrs:{id:"app"}},[this._m(0),t("router-view"),this._m(1)],1)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"disclaimer"},[this._v("This is an"),t("strong",[this._v("UNOFFICIAL")]),this._v("website built to share information around the MCO token. Visit"),t("a",{attrs:{href:"https://crypto.com",target:"_blank"}},[this._v("crypto.com")]),this._v("for Official Information.")])},function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"footer"},[e("div",{staticClass:"donations"},[e("div",{staticClass:"label"},[s._v("As always, donations are always appreciated to help keep the servers running"),e("em",[s._v("#willworkformco")])]),e("ul",{staticClass:"methods"},[e("li",[e("span",[s._v("BTC:")]),s._v("18HXh3Z6v284cy6F1PA6mPtFQig39zrNWq")]),e("li",[e("span",[s._v("ETH/MCO:")]),s._v("0x2415f94dF452C91BbfF510aEEc7eF89640b1cB63")])])]),e("div",{staticClass:"built-by"},[s._v("Built with"),e("span",[s._v("100% Pure Believe")]),s._v("from"),e("span",[s._v("Austin, TX.")]),s._v("Find me on the Crypto.com Discord"),e("strong",[s._v("@mikef")])])])}]};var o=e("VU/8")({name:"app",metaInfo:{title:"mco.life | MCO Token Information",link:[{rel:"favicon",href:"./assets/images/favicon-32x32.png"}]}},r,!1,function(s){e("hfz6")},null,null).exports,l=e("/ocq"),c={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"nav-area"},[t("div",{staticClass:"header"},[t("div",{staticClass:"logo"},[t("router-link",{attrs:{to:{name:"RegistrationsPage"}}},[this._v("mco.life")])],1),t("div",{staticClass:"navigation"},[t("ul",[t("li",[t("router-link",{attrs:{to:{name:"RegistrationsPage"}}},[this._v("Registrations")])],1)])])])])},staticRenderFns:[]};var u=e("VU/8")({name:"Navigation"},c,!1,function(s){e("jp1Z")},"data-v-0ebdbfbc",null).exports,p={name:"FlipClock",mounted:function(){e("kzyQ"),$(this.$el).find(".money-2020-countdown").FlipClock((new Date("3/13/2018")-new Date)/1e3,{clockFace:"DailyCounter",countdown:!0})}},h={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"flipclock"},[t("div",{staticClass:"money-2020-countdown"})])}]};var j=e("VU/8")(p,h,!1,function(s){e("esBj")},null,null).exports,d=(e("M4fF"),e("ViqS")),m=e.n(d),v=e("PJh5"),f=e.n(v),g={name:"RegistrationsPage",data:function(){return{loaded:!1,cardChart:null,price:{availableSupply:null,totalSupply:null,priceBtc:null,priceUsd:null,rank:null,timestamp:null},reservations:{today:null,total:null,timestamp:null},daily:null}},computed:{apiResponse:function(){return this.$store.state.apiResponse},updatedAt:function(){return this.reservations.timestamp?f()(this.reservations.timestamp).calendar():null}},components:{navigation:u,Flipclock:j},mounted:function(){this.loadData()},methods:{loadData:function(){var s=this;this.apiResponse?this.handleApiResponse(this.apiResponse):i.a.get("https://mco-life-api.herokuapp.com/status").then(function(t){s.$store.commit("apiResponse",t),s.handleApiResponse(s.apiResponse)}).catch(function(s){console.log("error:",s)})},handleApiResponse:function(s){this.price.availableSupply=s.price.available_supply,this.price.totalSupply=s.price.available_supply,this.price.priceBtc=s.price.price_btc,this.price.priceUsd=s.price.price_usd,this.price.rank=s.price.rank,this.price.timestamp=s.price.timestamp,this.reservations.timestamp=s.reservations.timestamp,this.reservations.today=s.reservations.today,this.reservations.total=s.reservations.total,this.daily=s.daily,this.loaded=!0},formatNumeral:function(s){return m()(s).format("0,0")},formatPrice:function(s){return m()(s).format("$0,0.00")},formatPriceSmall:function(s){return m()(s).format("$0,0")},formatPercent:function(s){return m()(s).format("0,0.00%")}}},y={render:function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"registrations-page"},[t("div",{staticClass:"section hero"},[t("navigation"),t("div",{staticClass:"header-text-container bold split"},[this._m(0),t("div",{staticClass:"right-area"},[t("div",{staticClass:"block"},[this.loaded?this._e():t("div",{staticClass:"loading-indicator"},[this._m(1)]),t("transition",{attrs:{name:"fade"}},[this.loaded?t("div",{staticClass:"slow-loader"},[t("p",{staticClass:"block-title"},[t("strong",[this._v("Total Card Reservations")])]),t("p",{staticClass:"reserved-count"},[t("strong",[this._v(this._s(this.formatNumeral(this.reservations.total)))])]),t("p",{staticClass:"updated-at"},[this._v("Updated "+this._s(this.updatedAt))])]):this._e()])],1)])])],1)])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"left-area"},[t("h1",[this._v("An unofficial website built & maintained by "),t("i",[this._v("(and for)")]),this._v(" the Crypto.com community")]),t("h2",[this._v("If you’re looking for the official Crypto.com website, please visit "),t("a",{attrs:{href:"https://crypto.com",target:"_blank"}},[this._v("crypto.com")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"spinner-white"},[t("div"),t("div"),t("div")])}]};var _=e("VU/8")(g,y,!1,function(s){e("QYJM")},"data-v-2d41d40f",null).exports,b=e("AYPi"),k=e.n(b),C=e("p3jY"),w=e.n(C);n.a.use(l.a),n.a.use(w.a);var z=new l.a({routes:[{path:"/",name:"RegistrationsPage",component:_}]});n.a.use(k.a,{id:"UA-112492567-1",router:z});var F=z,R=e("NYxO");window.$=i.a,n.a.use(R.a),n.a.config.productionTip=!1;var E=new R.a.Store({state:{apiResponse:null},mutations:{apiResponse:function(s,t){s.apiResponse=t}}});new n.a({el:"#app",router:F,store:E,template:"<App/>",components:{App:o}})},QYJM:function(s,t){},esBj:function(s,t){},hfz6:function(s,t){},jp1Z:function(s,t){},uslO:function(s,t,e){var a={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(s){return e(n(s))}function n(s){var t=a[s];if(!(t+1))throw new Error("Cannot find module '"+s+"'.");return t}i.keys=function(){return Object.keys(a)},i.resolve=n,s.exports=i,i.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.6bff24d17ac7f784317d.js.map