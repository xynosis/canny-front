(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{304:function(t,e,r){var content=r(315);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(18).default)("d5e5824c",content,!0,{sourceMap:!1})},314:function(t,e,r){"use strict";r(304)},315:function(t,e,r){var n=r(17)(!1);n.push([t.i,".primary{color:#17333f}.primary-bg{background-color:#4282b3}.secondary{color:#ecf2f5}.secondary-bg{background-color:#ecf2f5}#white{color:#fff}",""]),t.exports=n},339:function(t,e,r){"use strict";r.r(e);var n=r(2),o=(r(24),r(44),r(47),r(50),r(35),r(43),r(74),{data:function(){return{posts:[],listen:null}},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("posts/fetchPosts");case 2:t.listen=t.$store.getters["posts/getPostsByTag"]("listen"),t.posts=t.$store.getters["posts/getAllPosts"],t.posts=t.posts.filter((function(e){return!t.listen.includes(e)})),t.posts=JSON.parse(JSON.stringify(t.posts.slice(0,3)));case 6:case"end":return e.stop()}}),e)})))()},methods:{excerpt:function(t){if(null!=t.excerpt)for(var e=t.html.split("</p>"),i=1;i<e.length;i++)return e[0]},getPostDate:function(t){return dateformat(t.published_at,"mmmm dS, yyyy")}}}),c=(r(314),r(14)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"justify-center items-center primary-bg pv4"},[t._m(0),r("div",{staticClass:"mh5-l mv4",class:{flex:!t.$store.getters["settings/isMobile"]}},t._l(t.posts,(function(e){return e.tags[0]?r("post",{key:e.id,staticClass:"pv4 tl",class:{"w-third":!t.$store.getters["settings/isMobile"],"w-100":!t.$store.getters["settings/isMobile"]},attrs:{white:!0,post:e,path:"news/",link:!1}}):t._e()})),1)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"w-90 center flex"},[r("div",{staticClass:"w-50"},[r("h1",{staticClass:"tl white"},[t._v("Our news")])]),r("div",{staticClass:"underline w-50 pt4 tr"},[r("a",{staticClass:"fw4",attrs:{id:"white",href:"/news"}},[t._v("Read more ")])])])}],!1,null,null,null);e.default=component.exports}}]);