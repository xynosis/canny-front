(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{415:function(t,e,r){var content=r(435);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("d4e2f494",content,!0,{sourceMap:!1})},434:function(t,e,r){"use strict";r(415)},435:function(t,e,r){var n=r(29)(!1);n.push([t.i,"img[data-v-55ead1a6]{height:20%}",""]),t.exports=n},498:function(t,e,r){"use strict";r.r(e);var n=r(0),c=(r(13),r(50),r(41),{data:function(){return{product:null}},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("shop/fetchProducts");case 2:t.product=t.$store.getters["shop/getAllProducts"].filter((function(e){return e.handle===t.$route.params.product}))[0],console.log(t.product);case 4:case"end":return e.stop()}}),e)})))()},methods:{toSentenceCase:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},toCurrency:function(t){return t/=100,new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(t)}}}),o=(r(434),r(18)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.product?r("div",[r("div",{staticClass:"w-80 center h4 canny-dark"},[r("h1",{staticClass:"pt4 f1 canny-logo-serif font-canny-yellow fw5"},[t._v(t._s(t.product.title))])]),r("div",{staticClass:"w-100 canny-light h-100 center flex items-center align-center justify-center"},[r("div",[t._v(t._s(t.product.description)+" ")]),t._l(t.product.images,(function(t){return r("img",{attrs:{src:t.url}})})),t._l(t.product.variants,(function(e){return r("div",[r("div",[t._v(t._s(e.title)+" ")]),r("div",[t._v(t._s(t.toCurrency(e.prices[0].amount)))])])})),t._l(t.product.tags,(function(e){return t.product.tags?r("div",[t._v(t._s(e.value))]):t._e()})),r("div",[t._v("Add to cart")])],2)]):t._e()}),[],!1,null,"55ead1a6",null);e.default=component.exports}}]);