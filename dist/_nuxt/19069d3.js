(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{493:function(t,e,n){"use strict";n.r(e);var r=n(0),o=(n(13),n(107),n(219),{mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==t.$store.getters["posts/getAllPages"]){e.next=3;break}return e.next=3,t.$store.dispatch("posts/fetchPages");case 3:n=t.$route.path,t.$route.path.startsWith("/")&&(n=n.substring(1,n.length)),t.$route.path.endsWith("/")&&(n=n.substring(0,n.length-1)),t.page=t.$store.getters["posts/getPageBySlug"](n),null==t.page&&(t.page={title:"Oops!",html:"It looks like this page doesn't exist!"},t.error=!0),console.log(t.page);case 9:case"end":return e.stop()}}),e)})))()},data:function(){return{page:null,error:null}}}),l=n(18),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-100 canny-light"},[t.page?n("div",[n("div",{staticClass:"w-100 h4 canny-dark"},[n("div",{staticClass:"w-80 center"},[n("h1",{staticClass:"pt4 f1 canny-logo-serif font-canny-yellow fw5",domProps:{innerHTML:t._s(t.page.title)}})])]),n("div",{staticClass:"w-80-l w-100 tc center canny-light"},[n("div",{staticClass:"f2 font-canny-dark pv5 ph4",domProps:{innerHTML:t._s(t.page.html)}})])]):t._e()])}),[],!1,null,null,null);e.default=component.exports}}]);