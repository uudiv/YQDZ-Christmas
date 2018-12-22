$(function(){
	var winW = $(window).width();
	var winH = $(window).height();
	$('.mc').height(winH);
	//$("#music")[0].volume = 0;
	
	//加载
	var wloaded = false;
	var loaded = false;
	
	$(window).load(function(){
		wloaded = true;
	})
	var loadtime = 0;
	
	var loading = setInterval(function(){
		if(!wloaded){
			loadtime ++;
			if(loadtime >= 11){
				wloaded = true;
			}
		}else{
			clearInterval(loading);
			if(loadtime>=5){
				showmain();
				
			}else{
				var last = (5-loadtime)*1000;
				setTimeout(function(){
					showmain();
				},last)
			}
			//showmain();
		}
	},1000)
	
	var count = 0;
    var timer1 = setInterval(function() {
        count+=3;
        $('.loading-num span').html(count);
        if (count >= 32) {
            clearInterval(timer1);
            setTimeout(function(){
            	var timer2 = setInterval(function() {
			        count+=8;
			        $('.loading-num span').html(count);
			        if (count >= 54) {
			            clearInterval(timer2);
			            var timer3 = setInterval(function() {
					        count+=4;
					        $('.loading-num span').html(count);
					        if (count >= 83) {
					            clearInterval(timer3);
					            setTimeout(function(){
					            	 var timer4 = setInterval(function() {
								        count+=2;
								        $('.loading-num span').html(count);
								        if (count >= 97) {
								            clearInterval(timer4);
								        }
								    }, 120);
					            },250)
					        }
					    }, 250);
			        }
			    }, 120);
            },250)
        }
    }, 180);
	
	
	//禁止下拉回弹
	var overscroll = function(el){      
		el.addEventListener('touchstart', function(){        
			var top = el.scrollTop;        
			var totalScroll = el.scrollHeight;        
			var currentScroll = top + el.offsetHeight;        
			if(top === 0) {          
			el.scrollTop = 1;        
			}else if(currentScroll === totalScroll){          
			el.scrollTop = top - 1;        
			}      
			});      
			el.addEventListener('touchmove', function(evt){        
			if(el.offsetHeight < el.scrollHeight){
		        evt._isScroller = true;
		    }
	    });
    }
    overscroll(document.querySelector('body'));   
	document.body.addEventListener('touchmove', function(evt) {      
		if(!evt._isScroller){        
			evt.preventDefault();      
		}    
	});  
	/*$(document.body).on('touchmove', function(event) {
        event.preventDefault();
    });*/
    
	/*
	 * 音乐开关
	*/ 
	var pauseMark = true;
	/*$(".music").click(function(){
		if(pauseMark){
			pauseMark = false;
		    $(this).attr('src','img/music-off.png');
			$("#music")[0].pause();
		}else{
			$(this).attr('src','img/music-on.png');
			$("#music")[0].play();
			pauseMark = true;
		}
	});*/
	function audioAutoPlay(id){
	    var audio = document.getElementById(id);
	    audio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
		    if(pauseMark){
		        audio.play();
		        //audio.volume = 0;
		    }
		}, false);
	}
	audioAutoPlay('music');
	
	//
	function showmain(){
		$('.loading-num span').html(100);
		setTimeout(function(){
			$('.loading').fadeOut();
			loaded = true;
		},1000)
		var mc = new Swiper('.mc', {
			direction : 'vertical',
			effect : 'fade',
			fadeEffect: {
			    crossFade: true,
			},
			mousewheelControl : true,
			noSwiping : true,
			longSwipesRatio : 0.1,
		    touchAngle : 15,
		    speed:500,
		    resistanceRatio : 0,
	        on:{
	  			init: function(){
		        	swiperAnimateCache(this); //隐藏动画元素 
		        	var timer = setInterval(function(){
		        		if(loaded){
		        			clearInterval(timer);
			        		swiperAnimate(mc); //初始化完成开始动画
			        	}
		        	},500)
		        	
		      	}, 
		      	slideChangeTransitionStart: function(){
		      		
		      	},
	  			slideChangeTransitionEnd: function(){ 
	  				swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
	  				if(this.activeIndex == 0){
	  					$('.question').show();
						$('.answer-w').hide();
						$('.answer-r').hide();
						$('.active').removeClass('active');
						$('.page3-car').removeClass('carout');
						$('.page4-wu').removeClass('wusan');
	  				}
	  				if(this.activeIndex == 1){
	  					setTimeout(function(){
	  						$('.con2').click(function(){
	  							mc.allowTouchMove= true;
						    	mc.slideTo(2);
						    	mc.allowTouchMove= false;
	  						})
	  					},1000)
	  				}
	  				if(this.activeIndex == 6){
	  					setTimeout(function(){
	  						$('.mask').fadeIn();
	  					},3000)
	  				}
	  			} 
			}
	    }); 
	    mc.allowTouchMove= false;
	    
	    //点击开始
		$('.page1-butt').click(function(){
			$(this).addClass('anjian');
			setTimeout(function(){
				$('.page1-butt').removeClass('anjian');
		    	mc.allowTouchMove= true;
		    	mc.slideNext();
		    	mc.allowTouchMove= false;
			},400)
		})
		//重新开始
		$('.cxks').click(function(){
			$(this).addClass('anjian');
			setTimeout(function(){
				$('.cxks').removeClass('anjian');
		    	mc.allowTouchMove= true;
		    	mc.slideTo(0);
		    	mc.allowTouchMove= false;
		    	clickable = true;
		    	
			},400)
		})
		
		//选择答案
		var clickable = true;
		$('.txt-con').click(function(){
			if(clickable){
				clickable =false;
				$('.active').removeClass('active');
				$(this).addClass('active');
				//$(this).siblings('.txt-con').removeClass('active');
				if($(this).attr('answer') == 1){
					//答对
					if(mc.activeIndex == 2){
						$('.page3-car').addClass('carout');
					}else if(mc.activeIndex == 3){
						$('.page4-wu').addClass('wusan');
					}
					setTimeout(function(){
						$('.active').parent('.question').fadeOut();
						$('.active').parent('.question').siblings('.answer-r').fadeIn();
					},500)
					
					setTimeout(function(){
						mc.allowTouchMove= true;
				    	mc.slideNext();
				    	mc.allowTouchMove= false;
				    	clickable = true;
					},2500)
				}else{
					//答错
					setTimeout(function(){
						$('.active').parent('.question').fadeOut();
						$('.active').parent('.question').siblings('.answer-w').fadeIn();
					},500)
					
				}
				
			}
		})
	    
		
		var can = document.getElementById('canvas');
		var cxt = $('#canvas')[0].getContext('2d');
		$('#canvas').attr('width',winW*2);
		$('#canvas').attr('height',winH*2);
		
		cxt.fillStyle="#f3f0e9";
		cxt.fillRect(0,0,winW*2,winH*2);
		
		var img1 = new Image();
		img1.src = "img/logo-t-l-b.png";
		var img1W = winW*0.22;
		var img1H = img1W*54/142;
		var img1T = 15;
		var img1L = 15;
		
		var img2 = new Image();
		img2.src = "img/logo-t-r-b.png";
		var img2W = winW*0.1;
		var img2H = img2W*68/66;
		var img2T = 15;
		var img2L = winW-15-img2W;
		
		var img3 = new Image();
		img3.src = "img/logo-b-l-b.png";
		var img3W = winW*0.27;
		var img3H = img3W*46/176;
		var img3T = winH-15-img3H;
		var img3L = 15;
		
		var img4 = new Image();
		img4.src = "img/logo-b-r-b.png";
		var img4W = winW*0.19;
		var img4H = img4W*110/125;
		var img4T = winH-15-img4H;
		var img4L = winW-10-img4W;
		
		var img5 = new Image();
		img5.src = "img/hb-img.png";
		var img5W = winW;
		var img5H = img5W*767/640;
		var img5T = winH*0.1;
		var img5L = 0;
		
		var nowok = false;
	    function drawCanvas(){
	    	cxt.drawImage(img5,img5L*2,img5T*2,img5W*2,img5H*2);
			cxt.drawImage(img1,img1L*2,img1T*2,img1W*2,img1H*2);
			cxt.drawImage(img2,img2L*2,img2T*2,img2W*2,img2H*2);
			cxt.drawImage(img3,img3L*2,img3T*2,img3W*2,img3H*2);
			cxt.drawImage(img4,img4L*2,img4T*2,img4W*2,img4H*2);
			
	        setTimeout(function(){
	        	convertCanvasToImage(can);
	        },500)
		}
		/*setTimeout(function(){
			$('#canvas').show();
			drawCanvas();
			nowok = true;
		},5000)*/
		
		function convertCanvasToImage(canvas) {
			var image = new Image();
			image.src = canvas.toDataURL("image/png");
			image.style.width = winW+'px';
			image.style.height = winH+'px';
			$('.hb').append(image);
			canvas.style.display = 'none';
		}
		
		/*
		 * 表单提交
		 */
		$('#sub').click(function(){
			$(this).addClass('anjian');
			setTimeout(function(){
				$('#sub').removeClass('anjian');
			},400)
			if(!$('#user').val()){
				alert('请输入您的姓名！');
				return false;
			}else if(!$('#tel').val()){
				alert('请输入您的电话！');
				return false;
			}else if(!(/^1[345678]\d{9}$/.test($('#tel').val()))){
				//手机号格式错误
				alert('请输入正确的手机号！');
				return false;
			}else{
				setTimeout(function(){
					//$('.mask').fadeOut();
					if(!nowok){
						$('.hb').css('z-index','4');
						drawCanvas();
						nowok = true;
						$('.hint').show();
					}
				},800)
				return false;
			}
		})
		window.onload=function() {
		  document.forms[0].reset();
		}
		
	}
})
