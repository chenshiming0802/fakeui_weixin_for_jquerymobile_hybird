(function(window){
function IScrollLoadData(wrapperEl,contentEl,dropTopAction,dropBottomAction,limit){
	this.wrapper=wrapperEl;
	this.content=contentEl;
	this.pullDownEl=this.wrapper.querySelector('#scroller-pullDown');
	this.pullUpEl=this.wrapper.querySelector('#scroller-pullUp');
	this.scrollerEl=this.wrapper.querySelector('.scroller');
	this.dropTopAction=dropTopAction;
	this.dropBottomAction=dropBottomAction;
	this.limit=limit||30;
	
	this.clickTop_bind=this.clickTop.bind(this);
	this.clickBottom_bind=this.clickBottom.bind(this);
	
	this.pullUpLabel_Text='';//上翻刷新
	this.pullDownLabel_Text='下拉刷新';//...
	this.pullLoading_Text='加载中';
	this.releaseLoading_Text='松开加载';
	this.loading_top_flag=false;
	this.loading_bottom_flag=false;
	this.checkIScroll(true);
	this.createIScroll();
};
IScrollLoadData.prototype.refresh=function(direct){
	//this.updateContentLen(direct);
	this.checkIScroll();
	delete this.myScroll.waitLoadTop;
	this.myScroll.refresh();
}
IScrollLoadData.prototype.updateContentLen=function(direct){
	var children=this.content.children;
	if(children.len>this.limit){
		if(direct=='bottom'){
			
		}else{
			
		}
	}
}
IScrollLoadData.prototype.checkIScroll=function(flag){
	
	var soh=this.content.offsetHeight+this.pullDownEl.offsetHeight+this.pullUpEl.offsetHeight;
	var woh=this.wrapper.clientHeight;
	var holder=this.scrollerEl.querySelector('.scroller-holder');
	if(soh<woh){
		if(!holder){
			var ul=document.createElement('ul');
			ul.className='scroller-holder';
			this.scrollerEl.appendChild(ul);
			holder=ul;
		}
		holder.style.height=(woh-soh+2)+'px';
	}else if(holder){
		this.scrollerEl.removeChild(holder);
	}
}
IScrollLoadData.prototype.pullDownAction=function(){
	var self=this;
	//this.myScroll.scrollTo(0,this.pullDownEl.offsetHeight);
	T.loadUI(true);
	if(this.dropTopAction){
		/*
		this.dropTopAction(function(out){
			var firstChild=self.content.querySelector(':first-child');
			if(firstChild)
			  self.content.insertBefore(out,firstChild);
			else
			  self.content.appendChild(out);
			self.refresh('top');
		});//comment by chenshiming	
		*/ 
		//this._pullDownAction(self.content);
		setTimeout(function(){
			for (var i=self.content.childNodes.length-1;i>=2;i--) {
			 	var childNode = self.content.childNodes[i];
			 	self.content.removeChild(childNode);
			}	
			self.dropTopAction();
			self.refresh('top');
			T.loadUI(false);				
		},2000);//add by chenshiming		
	}else{
		this.refresh('top');
		T.loadUI(false);	
	} 
};
 

IScrollLoadData.prototype.pullUpAction=function(){
	var self=this;
	T.loadUI(true);
	if(this.dropBottomAction){
		/*this.dropBottomAction(function(){
			self.content.appendChild();
			self.refresh('bottom');
		});*/  //comment by chenshiming
		
		setTimeout(function(){
			self.dropBottomAction(); 
			self.refresh('bottom'); 	
			T.loadUI(false);	
		},2000);//add by chenshiming
	}else{
		this.refresh('bottom');
		T.loadUI(false);
	}
};





IScrollLoadData.prototype.clickTop=function(){
	var self=this;
	if(this.dropTopAction){
		this.dropTopAction(function(out){
			var firstChild=self.content.querySelector(':first-child');
			if(firstChild)
			  self.content.insertBefore(out,firstChild);
			else
			  self.content.appendChild(out);
			self.initIScroll(false);
			
		});
	}
};
IScrollLoadData.prototype.clickBottom=function(){
	var self=this;
	if(this.dropBottomAction){
		this.dropBottomAction(function(out){
			self.content.appendChild(out);
			self.initIScroll(false);
			
		});
	}
};
IScrollLoadData.prototype.initIScroll=function(flag){
	if(this.overflow_window){
		return;
	}
	
	if(this.scrollerEl.offsetHeight-this.pullDownEl.offsetHeight>=document.documentElement.clientHeight){
		this.wrapper.style.bottom='0px';
		this.wrapper.style.top=((-1)*this.pullDownEl.offsetHeight)+'px';
		this.pullUpEl.querySelector('.pullUpLabel').innerText=this.pullUpLabel_Text;
		this.pullDownEl.querySelector('.pullDownLabel').innerText=this.pullDownLabel_Text;
		this.pullUpEl.removeEventListener('click',this.clickBottom_bind);
		this.pullDownEl.removeEventListener('click',this.clickUp_bind);
		this.myScroll.refresh();
		this.overflow_window=true;
	}else{
		this.wrapper.style.bottom=(document.documentElement.clientHeight-this.scrollerEl.offsetHeight)+'px';
		this.pullUpEl.querySelector('.pullUpLabel').innerText='点击获取最近...';
		this.pullDownEl.querySelector('.pullDownLabel').innerText='点击获取最新...';
		if(flag){
			this.pullUpEl.addEventListener('click',this.clickBottom_bind);
			this.pullDownEl.addEventListener('click',this.clickTop_bind);
		}
		
	}
	/*
	console.log('initIScroll this.content.offsetHeight='+this.content.offsetHeight
		    +' this.wrapper.clientHeight='+this.wrapper.clientHeight+
		    '  this.pullDownEl.offsetHeight='+this.pullDownEl.offsetHeight+
		    '  html.height='+document.documentElement.clientHeight);*/
}
IScrollLoadData.prototype.createIScroll=function(){
	var self=this;
	this.myScroll = new IScrollLoadData.IScroll(this.wrapper, {
		probeType: 2, mouseWheel: false,bindToWrapper:true,scrollY:true,scrollbars: false,
	}).on('scroll',function(){
		if (this.y > 50 &&  
			(!self.pullDownEl.className.match('flip') && 
			 !self.pullDownEl.className.match('loading'))) {
			self.pullDownEl.className = 'flip';
			self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.releaseLoading_Text;
			this.waitLoadTop=self.pullDownEl.offsetHeight;
		} else if (this.y < 50 && self.pullDownEl.className.match('flip')) {
			self.pullDownEl.className = '';
			self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullDownLabel_Text;
			 delete this.waitLoadTop;
		} else if (this.y < (this.maxScrollY - 5) && 
				  (!self.pullUpEl.className.match('flip')&&
				   !self.pullUpEl.className.match('loading'))) {
			self.pullUpEl.className = 'flip';
			self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.releaseLoading_Text;
		} else if (this.y > (this.maxScrollY + 5) && self.pullUpEl.className.match('flip')) {
			self.pullUpEl.className = '';
			self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullUpLabel_Text;
		}
	}).on('scrollEnd',function(){
		//console.log('scrollEnd ',this);
		
		if (self.pullDownEl.className.match('flip')) {
			self.pullDownEl.className = 'loading';
			self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullLoading_Text;	
			self.pullDownAction();// Execute custom function (ajax call?)
			
		} else if (self.pullUpEl.className.match('flip')) {
			self.pullUpEl.className = 'loading';
			self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullLoading_Text;				
			self.pullUpAction();	// Execute custom function (ajax call?)
		}
	}).on('refresh',function(){
		/*console.log('refresh this.y='+this.y+
				' , this.maxScrollY='+this.maxScrollY+
				' , this.scrollerHeight='+this.scrollerHeight+
				' , this.wrapperHeight='+this.wrapperHeight);*/
		if (self.pullDownEl.className.match('loading')) {
			self.pullDownEl.className = '';
			self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullDownLabel_Text;
		} else if (self.pullUpEl.className.match('loading')) {
			self.pullUpEl.className = '';
			self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullUpLabel_Text;
		}
	});
	
};
if("function" == typeof define &&  define.amd){
  define("IScrollLoadData", ['IScroll'], function(IScroll) {
        IScrollLoadData.IScroll=IScroll;
        return IScrollLoadData;
    });   
}else {
    IScrollLoadData.IScroll=window.IScroll;
    window.IScrollLoadData = IScrollLoadData;
}

})(window);