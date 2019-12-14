window.onload = function(){
			var box = document.getElementById('box');
			var oNavlist = document.getElementById('nav').children;
			var slider = document.getElementById('slider');
			var left = document.getElementById('left');
			var right = document.getElementById('right');
			var index = 1;
			var timer;
			var isMoving = false;
			var word = document.getElementById('word');

			//字体滚动效果
			function getStyle(obj,style){
		    	if(obj.currentStyle){
		    		return obj.currentStyle[style];
		    	}else{
		    		return getComputedStyle(obj)[style];
		    	}
	   		}
	   		var wordGun = function(){
				var id = setInterval(function(){
					var now = parseInt(getStyle(word,'left'));
	    			if (now == -450) {
	    				word.style.left= 800 + 'px';
	    			}
	    			else{
	    				word.style.left= now - 2 + 'px';
	   				}
				},30);
			}
			wordGun();



			//轮播下一张图片的函数
			function next(){
				if(!isMoving){
					isMoving = true;
					index++;
					navChange();
					animate(slider,{left:-1200*index},function(){
						if(index==6){
							slider.style.left = "-1200px";
							index = 1;
						}
						isMoving = false;
					});
				}
				
			}
			//上一张的图片的函数
			function prev(){
				if(!isMoving){
					isMoving = true;
					index--;
					navChange();
					animate(slider,{left:-1200*index},function(){
						if(index==0){
							slider.style.left = "-6000px";
							index = 5;
						}
						isMoving = false;
					});
				}
			}

			timer = setInterval(next,3000);

			//鼠标划入清定时器
			box.onmouseover = function(){
				animate(left,{opacity:50});
				animate(right,{opacity:50});
				clearInterval(timer)
			}
			//鼠标划出开定时器
			box.onmouseout = function(){
				animate(left,{opacity:0});
				animate(right,{opacity:0});
				timer = setInterval(next,2000);
			}

			//为左右按钮添加事件
			right.onclick = next;
			left.onclick = prev;
			//小按钮点击事件
			for(var i=0;i<oNavlist.length;i++){
				oNavlist[i].idx = i;
				oNavlist[i].onclick=function(){
					index=this.idx + 1;
					navChange();
					animate(slider,{left:-1200*index});
				}
			}

			//小按钮背景色切换
			function navChange(){ 
				for(var i=0;i<oNavlist.length;i++){
					oNavlist[i].className='';
				}
				if(index == 6){
					oNavlist[0].className = 'active';
				}else if(index==0){
					oNavlist[4].className = 'active';
				}else{
					oNavlist[index-1].className = 'active';
				}
				
			}
}