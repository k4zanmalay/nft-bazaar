(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3678)}])},3678:function(e,t,n){"use strict";n.r(t);var r=n(5666),s=n.n(r),a=n(5893),i=n(5553),c=n(9669),o=n.n(c),l=n(7294),d=n(4311),u=n(6095);function p(e,t,n,r,s,a,i){try{var c=e[a](i),o=c.value}catch(l){return void n(l)}c.done?t(o):Promise.resolve(o).then(r,s)}function x(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function i(e){p(a,r,s,i,c,"next",e)}function c(e){p(a,r,s,i,c,"throw",e)}i(void 0)}))}}t.default=function(){var e=(0,l.useState)([]),t=e[0],n=e[1],r=(0,l.useState)("not-loaded"),c=r[0],p=r[1];(0,l.useEffect)((function(){m()}),[]);var m=x(s().mark((function e(){var t,r,a,c,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.Z)("provider");case 2:return t=e.sent,r=t.token,a=t.market,e.next=7,a.getMarketItems();case 7:return c=e.sent,e.next=10,Promise.all(c.map(x(s().mark((function e(t){var n,a,c,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.tokenURI(t.tokenId);case 2:return n=e.sent,e.next=5,o().get(n);case 5:return a=e.sent,c=i.bM(t.price.toString(),"ether"),l={price:c,itemId:t.itemId.toNumber(),seller:t.seller,owner:t.owner,image:a.data.image,name:a.data.name,description:a.data.description},e.abrupt("return",l);case 9:case"end":return e.stop()}}),e)})))));case 10:l=e.sent,n(l),p("loaded");case 13:case"end":return e.stop()}}),e)}))),f=x(s().mark((function e(t){var n,r,a,c;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.Z)("signer");case 2:return n=e.sent,n.token,r=n.market,a=i.vz(t.price,"ether"),console.log(t.itemId),e.next=9,r.createMarketSale(u._,t.itemId,{value:a});case 9:return c=e.sent,e.next=12,c.wait();case 12:m();case 13:case"end":return e.stop()}}),e)})));return"loaded"!==c||t.length?(0,a.jsx)("div",{className:"flex justify-center",children:(0,a.jsx)("div",{className:"px-4",style:{maxWidth:"1600px"},children:(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4",children:t.map((function(e,t){return(0,a.jsxs)("div",{className:"border shadow rounded-xl overflow-hidden",children:[(0,a.jsx)("img",{src:e.image}),(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsx)("p",{style:{height:"64px"},className:"text-2xl font-semibold",children:e.name}),(0,a.jsx)("div",{style:{height:"70px",overflow:"hidden"},children:(0,a.jsx)("p",{className:"text-gray-400",children:e.description})})]}),(0,a.jsxs)("div",{className:"p-4 bg-black",children:[(0,a.jsxs)("p",{className:"text-2xl mb-4 font-bold text-white",children:[e.price," BNB"]}),(0,a.jsx)("button",{className:"w-full bg-pink-500 text-white font-bold py-2 px-12 rounded",onClick:function(){return f(e)},children:"Buy"})]})]},t)}))})})}):(0,a.jsx)("h1",{className:"px-20 py-10 text-3xl",children:"No items in marketplace"})}}},function(e){e.O(0,[277,797,669,398,774,888,179],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);