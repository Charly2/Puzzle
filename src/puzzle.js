(function(){var t,e,n,o;n=function(){function t(t){var e,n;this.number=t.number,this.controller=t.controller,this.node=$("<div/>",{class:"cell",text:this.number}),this.node.mousedown(function(t){return function(){return t.controller.handleCellClicked(t.rowNum,t.colNum)}}(this)),this.node.html("<img src='img/"+this.number+".jpg'/>"),n=parseInt((this.number-1)/4,10),e=parseInt((this.number-1)%4,10),console.log(this.number),(n+e)%2==0?this.node.addClass("dark"):this.node.addClass("light")}return t.prototype.spacing=5,t.prototype.cellSize=100,t.prototype.setPosition=function(t,e,n,o){return this.rowNum=t,this.colNum=e,null==n&&(n=0),null==o&&(o=$.noop),this.node.animate({top:this.spacing+this.rowNum*(this.spacing+this.cellSize)+"px",left:this.spacing+this.colNum*(this.spacing+this.cellSize)+"px"},n,o)},t}(),t=function(){return function(t){var e,n,o;this.controller=t.controller,this.node=$("<div/>",{class:"control-bar"}),this.controls=$("<div/>"),e=$("<div/>",{text:"Generar",class:"shuffle-button",click:function(t){return function(){return t.controller.handleShuffleClicked()}}(this)}),o=$("<div/>",{text:"",class:"title-text"}),n=$("<div/>",{text:"Resolver",class:"solve-button",click:function(t){return function(){return t.controller.handleSolveClicked()}}(this)}),this.controls.append(e),this.controls.append(o),this.controls.append(n),this.node.append(this.controls)}}(),e=function(){function t(t){this.controller=t.controller,this.node=$("<div/>",{class:"overlay-container"}),this.overlay=$("<div/>",{class:"overlay"}),this.glowing=!1,this.node.append(this.overlay),this.node.hide()}return t.prototype.setMessage=function(t){return this.overlay.text(t)},t.prototype.show=function(t,e){return null!=t&&this.setMessage(t),this.node.fadeIn(function(t){return function(){return e&&e(),t.glowing=!0,t.glowOut()}}(this))},t.prototype.hide=function(t){return this.glowing=!1,this.node.fadeOut(t)},t.prototype.glowOut=function(){if(this.glowing)return this.overlay.animate({opacity:.6},1e3,function(t){return function(){return t.glowIn()}}(this))},t.prototype.glowIn=function(){if(this.glowing)return this.overlay.animate({opacity:.8},1e3,function(t){return function(){return t.glowOut()}}(this))},t}(),o=function(){function o(o){var i,r,s,l,u;this.controller=o.controller,this.container=o.container,s=o.grid,this.container.addClass("puzzle-container"),this.node=$("<div/>").addClass("puzzle").appendTo(this.container),this.controlsShown=!0,this.moving=!1,this.moveQueue=[],this.cellViews=[];for(u in s){u=parseInt(u,10),this.cellViews[u]=[];for(r in s[u])r=parseInt(r,10),0===(l=s[u][r])&&(i=null,this.emptyPos=[u,r]),0!==l&&((i=new n({number:l,controller:this.controller})).setPosition(u,r),this.node.append(i.node)),this.cellViews[u].push(i)}this.controlBarView=new t({controller:this.controller}),this.node.append(this.controlBarView.node),this.overlayView=new e({controller:this.controller}),this.node.append(this.overlayView.node)}return o.prototype.queueMoves=function(t){return this.moveQueue=this.moveQueue.concat(t)},o.prototype.runQueue=function(t,e,n){null==n&&(n=$.noop);{if(0!==this.moveQueue.length)return this.moving=!0,this.moveFrom(this.moveQueue.shift(),t,function(o){return function(){return o.moveQueue.length>0?setTimeout(function(){return o.runQueue(t,e,n)},e):(o.moving=!1,n())}}(this));n()}},o.prototype.moveFrom=function(t,e,n){var o,i,r,s,l,u,h,c,a,p;return s=this.emptyPos,p=s[0],a=s[1],l=directionToDelta(t),r=l[0],i=l[1],this.emptyPos=(u=[p+r,a+i],c=u[0],h=u[1],u),o=this.cellViews[c][h],this.cellViews[p][a]=o,this.cellViews[c][h]=null,o.setPosition(p,a,e,n)},o.prototype.hideControls=function(t){return this.controlsShown=!1,$(this.node).animate({height:"-=50px"},t)},o.prototype.showControls=function(t){return this.controlsShown=!0,$(this.node).animate({height:"+=50px"},t)},o.prototype.showOverlay=function(t,e){return this.overlayView.show(t,e)},o.prototype.setOverlayMessage=function(t){return this.overlayView.setMessage(t)},o.prototype.hideOverlay=function(t){return this.overlayView.hide(t)},o.prototype.isInteractive=function(){return this.controlsShown&&!this.moving},o}(),this.randomMoveList=function(t,e,n){var o,i,r,s,l;return null==n&&(n=[]),n.length===e?n:(l=t.validMoves(),n.length>0&&(o=_.last(n),(r=directionToDelta(o))[0],r[1],l=_.filter(l,function(t){return!directionsAreOpposites(o,t)})),s=_.shuffle(l)[0],i=t.applyMoveFrom(s),n.push(s),randomMoveList(i,e,n))},this.Puzzle=function(){function t(t){this.container=t,this.grid=new Grid(INIT_GRID,[3,3]),this.view=new o({container:this.container,grid:INIT_GRID,controller:this})}return t.prototype.moveDuration=100,t.prototype.movePause=20,t.prototype.shuffle=function(t,e){return this.applyMoves(randomMoveList(this.grid,t),e)},t.prototype.applyMoves=function(t,e){return this.grid=this.grid.applyMoves(t),this.view.queueMoves(t),this.view.runQueue(this.moveDuration,this.movePause,e)},t.prototype.handleShuffleClicked=function(){if(this.view.isInteractive())return this.view.showOverlay("Generando"),this.view.hideControls(function(t){return function(){return t.shuffle(25,function(){return t.view.hideOverlay(),t.view.showControls(),swal({title:"Se genero tu tablero",text:"Comienza a resolverlo.",imageUrl:"/img/thumbs-up.jpg"})})}}(this))},t.prototype.handleSolveClicked=function(){if(this.view.isInteractive()&&!this.grid.isSolved())return this.view.hideControls(function(t){return function(){return t.view.showOverlay("Resolviendo",function(){return solve(t.grid,{complete:function(e){var n;return n=e.steps,t.view.hideOverlay(function(){return t.applyMoves(n,function(){return t.view.showControls(),swal("Felicidades","Se resolvio corectamente en "+n.length+" pasos","success")})})},error:function(e){return e.msg,t.view.hideOverlay(),t.view.showControls()}})})}}(this))},t.prototype.handleCellClicked=function(t,e){var n;if(this.view.isInteractive()&&null!=(n=this.grid.positionToMove(t,e)))return this.applyMoves([n])},t}()}).call(this);