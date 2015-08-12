$(function(){
	$(".close-btn").click(function(){
		$(".fixed-bar").hide();
		$(".news-content").css("margin-top","0");
	});
	$(".btn-share").click(function(){
		$("#panel1").css("position","fixed");
		$("#panel1").css("display","block");
	});
	$(".share-btn").click(function(){
		$("#panel1").css("position","fixed");
		$("#panel1").css("display","block");
	});
	$("#panel1").click(function(){
		$("#panel1").css("display","none");
	});
	$(".more-btn").click(function(){
		$("#panel2").css("position","fixed");
		$("#panel2").css("display","block");
	});
	$(".makeDiv").click(function(){
		location.href = "http://www.niuco.cn/";
		$("#panel2").css("display","none"); 
		
	});
	$(".support").click(function(){
		$("#panel2").css("position","fixed");
		$("#panel2").css("display","block");
	});
	$(".oppose").click(function(){
		$("#panel2").css("position","fixed");
		$("#panel2").css("display","block");
	});
	$("#panel2").click(function(){
		$("#panel2").css("display","none");
	});

	var appid = 'wxb414d8cfd28ae3ed';
	var secret = 'f58483fd45cfde1a918e66df7af8c7d4';
	//获取token  待输入
    	var accessToken = obtainAccessToken();
	//获取当前时间秒数
    	var timestamp = new Date().getTime();
    	var timeStr = timestamp+"";
    	timestamp = timeStr.substring(0, timeStr.length -3);
	//生成签名的随机串
    	var noncestr = "Wm3WZYTPz0wzccnW";
	//获取ticket
    	var ticketStr = obtainTicketStr(accessToken);
	//获取当前页面url
    	var url = location.href.split('#')[0]；
	//获取签名
	var signature = obtainSignature(ticketStr, noncestr, timestamp, url);
/**
 * 获取AccessToken
 * @param appid
 * @param secret
 * @returns
 */
function obtainAccessToken(){
	var accessToken = "";
	$.ajax({
		async: false,
		type :"GET",                                                                                                                      
		url: root+"/siims/vmaque/reserveManage/obtainAccessToken.jspx",
		dataType : "json",
		success : function(data){
			if(data.access_token != null) {
				accessToken = data.access_token;
			}
		}
	});
	if(accessToken == ""){
		return obtainAccessToken();
	} else {
		return accessToken;
	}
}

/**
 * 获取TicketStr
 * @returns
 */
function obtainTicketStr(accessToken){
	var ticketStr = "";
	$.ajax({
		async: false,
		type :"GET",                                                                                                                      
		url: root+"/siims/vmaque/reserveManage/obtainTicketStr.jspx?access_token="+accessToken,
		dataType : "json",
		success : function(data){
			if(data.ticket != null){
				ticketStr = data.ticket;
			}
		}
	});
	if(ticketStr == ""){
		return obtainTicketStr(accessToken);
	} else {
		return ticketStr;
	}
	
}
/**
 * 获取签名
 * @param ticketStr
 * @returns
 */
function obtainSignature(ticketStr, noncestr, timenum, url){
	var signature = "";
	$.ajax({
		async: false,
		type :"POST",                                                                                                                      
		url: root+"/siims/vmaque/reserveManage/shaSignature.jspx",
		data : {ticketStr:ticketStr+"",noncestr:noncestr+"",timenum:timenum+"",url:url+""},
		dataType : "json",
		success : function(data){
			if(data.signature != null){
				signature = data.signature;
			}
		}
	});
	if(signature == ""){
		return obtainSignature(ticketStr, noncestr, timenum, url);
	} else {
		return signature
	}
}




wx.config({
    		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    		appId: appid, // 必填，公众号的唯一标识
    		timestamp: timestamp, // 必填，生成签名的时间戳
    		nonceStr: noncestr, // 必填，生成签名的随机串
    		signature: signature,// 必填，签名，见附录1
    		jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    	});
    	wx.ready(function(){
    		var lineLink = root+window.location.pathname;
    		var imgUrl=root+$("#banner_img").attr("src");
    		var descContent =(($("#line_content").html()).replace("&nbsp;","")).replace(/<[^>]+>/g,"");//红包宣传语
		var shareTitle =(($("#banner_slogan").html()).replace("&nbsp;","")).replace(/<[^>]+>/g,"");//红包名称
		//分享到朋友圈
    		wx.onMenuShareAppMessage({
    		    title: shareTitle, // 分享标题
    		    desc: descContent, // 分享描述
    		    link: lineLink, // 分享链接
    		    imgUrl: imgUrl, // 分享图标
    		    type: 'link', // 分享类型,music、video或link，不填默认为link
    		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    		    success: function () { 
    		    },
    		    cancel: function () { 
    		    }
    		});

    		//分享到朋友
    		wx.onMenuShareTimeline({
    		    title: shareTitle, // 分享标题
    		    link: lineLink, // 分享链接
    		    imgUrl: imgUrl, // 分享图标
    		    success: function () { 
    		        // 用户确认分享后执行的回调函数
    		    },
    		    cancel: function () { 
    		        // 用户取消分享后执行的回调函数
    		    }
    		});
    		
    		//分享到qq
    		wx.onMenuShareQQ({
    		    title: shareTitle, // 分享标题
    		    desc: descContent, // 分享描述
    		    link: lineLink, // 分享链接
    		    imgUrl: imgUrl, // 分享图标
    		    success: function () { 
    		       	// 用户确认分享后执行的回调函数
    		    },
    		    cancel: function () { 
    		      	// 用户取消分享后执行的回调函数
    		    }
    		});
    		
    		//分享到微博
    		wx.onMenuShareWeibo({
    			title: shareTitle, // 分享标题
    		    desc: descContent, // 分享描述
    		    link: lineLink, // 分享链接
    		    imgUrl: imgUrl, // 分享图标
    		    success: function () { 
    		       	// 用户确认分享后执行的回调函数
    		    },
    		    cancel: function () { 
    		        // 用户取消分享后执行的回调函数
    		    }
    		});
    	});
	

})


