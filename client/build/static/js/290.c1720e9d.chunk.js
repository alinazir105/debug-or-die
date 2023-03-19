"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[290],{77290:function(e,n,a){a.r(n),a.d(n,{default:function(){return _}});var t=a(70885),r=a(42982),i=a(72791),s=a(88446),c=a(16871),o=a(10703),l=a(39281),d=a(79836),u=a(56890),m=a(35855),g=a(53994),h=a(53382),f=a(36151),b=a(94515),x=a(72426),j=a.n(x),p={succRow:"LeaderTable_succRow__zAfqr",errRow:"LeaderTable_errRow__ZZZHT",headRow:"LeaderTable_headRow__WYNmH",quesRow:"LeaderTable_quesRow__OaWWh"},v=a(31292),w=a(80184),Z=[{id:"quesName",label:"Question Name",align:"center"},{id:"username",label:"Username",align:"center"},{id:"status",label:"Status",align:"center"},{id:"msg",label:"Message",align:"center"},{id:"time",label:"Total Time(s)",align:"center",format:function(e){return e.toFixed(2)}},{id:"language",label:"Language",align:"center"},{id:"submitTime",label:"Submit Time",align:"center"},{id:"code",label:"Code",align:"center"}],T=function(e){var n=e.quesName,a=e.status,t=e.language,r=e.submitTime,i=e.completeTime,s=e.startTime,c=e.quesId,o=e.output,l=e.username,d=e.codeId;return(void 0===n||null===n)&&(n="Binary Search"),(void 0===c||null===c)&&(c="62d2def98f76467879c21e29"),(void 0===l||null===l)&&(l="guest"),{quesName:n,status:a="pending"===a?"Pending":"success"===a?"Accepted":"Rejected",language:t,time:Math.abs(new Date(i)-new Date(s))/1e3,submitTime:r=j()(r).fromNow(),quesId:c,msg:o&&o.msg?o.msg:"NA",username:l,codeId:d}},q=function(e){var n=e.leaders,a=(0,c.s0)(),r=n.map(T),s=(0,i.useState)(0),x=(0,t.Z)(s,2),j=x[0],q=x[1],k=(0,i.useState)(10),R=(0,t.Z)(k,2),N=R[0],_=R[1];return(0,w.jsxs)(o.Z,{sx:{width:"100%",overflow:"hidden"},children:[(0,w.jsx)(l.Z,{sx:{maxHeight:"80vh"},children:(0,w.jsxs)(d.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,w.jsx)(u.Z,{children:(0,w.jsx)(m.Z,{children:Z.map((function(e){return(0,w.jsx)(g.Z,{align:e.align,style:{minWidth:e.minWidth,backgroundColor:"rgb(38, 45, 51)",color:"rgba(240,240,240, 0.9)"},children:e.label},e.id)}))})}),(0,w.jsx)(h.Z,{children:r.slice(j*N,j*N+N).map((function(e,n){return(0,w.jsx)(m.Z,{hover:!0,role:"checkbox",tabIndex:-1,className:p["Accepted"===e.status?"succRow":"Rejected"===e.status?"errRow":""],children:Z.map((function(n){var t=e[n.id];return(0,w.jsx)(g.Z,{align:n.align,role:"quesName"===n.id?"link":"cell",onClick:"quesName"===n.id?function(){return a("/questions/".concat(e.quesId))}:null,className:p["quesName"===n.id?"quesRow":""],children:"code"===n.id?(0,w.jsx)(f.Z,{variant:"contained",onClick:function(){return a("/codes/".concat(e.quesId).concat(e.codeId?"?codeId="+e.codeId:""))},children:(0,w.jsx)(v.Z,{})}):n.format?n.format(t):t},n.id)}))},n)}))})]})}),(0,w.jsx)(b.Z,{rowsPerPageOptions:[10,30,50,80,100],component:"div",count:r.length,rowsPerPage:N,page:j,onPageChange:function(e,n){q(n)},onRowsPerPageChange:function(e){_(+e.target.value),q(0)}})]})},k=a(7091),R=a(83550),N=function(){var e=(0,i.useState)(!0),n=(0,t.Z)(e,2),a=n[0],r=n[1],c=(0,i.useState)(void 0),o=(0,t.Z)(c,2),l=o[0],d=o[1],u=(0,i.useState)(void 0),m=(0,t.Z)(u,2),g=m[0],h=m[1];return(0,i.useEffect)((function(){fetch("".concat(s.p,"/api/explore/leaderboard"),{headers:{"Content-Type":"application/json"},method:"GET"}).then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){return h(e)})).catch(d).finally((function(){return r(!1)}))}),[]),{loading:a,error:l,leaders:g}},_=function(){var e=N(),n=e.loading,a=e.error,t=e.leaders;return(0,w.jsxs)(i.Fragment,{children:[n&&(0,w.jsx)(k.Z,{}),!n&&a&&(0,w.jsx)("div",{children:(0,w.jsxs)("div",{className:"errorTemplate",children:[(0,w.jsxs)("div",{children:[(0,w.jsx)("span",{children:"Msg : "}),"Wasn't able to connect to server check if your are not offline or server might not be working !"]}),a&&(0,w.jsxs)("div",{children:[(0,w.jsx)("span",{children:"Error : "}),(0,R.JW)(a)]})]})}),!n&&!a&&(0,w.jsx)(q,{leaders:(0,r.Z)(t)})]})}}}]);
//# sourceMappingURL=290.c1720e9d.chunk.js.map