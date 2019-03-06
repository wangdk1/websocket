/**
 * 本js和所关联的html中,echarts图是使用不同类型进行命名的,每个类型分别从1开始计算
 * 而表格,是将所有表格从1开始统计到最后
 */
//点击tab键的时候,将参数传递过来
var tableIdAndName = new Map();
//点击tab键的时候,将参数传递过来,因为图片不唯一,设为数组
var imgIdAndName = new Map();
/*********************导出为excel相关的方法****************/
tabParams('tab', 1, 1);
//处理表格参数传递给导出excel方法
function dealParams(tableIdAndName){
	if(tableIdAndName.size > 0){  //如果map为空则没有表格
		tableIdAndName.forEach(function (value, key, map) {
			if($('#' + key).css('display') != 'none'){
				HtmlExportToExcel(key, value);
			}else{
				console.log('当前图表为隐藏状态不能导出');
			}
		});
	}else{
		console.log('没有数据表格');
	}
}
/***************************导出为图片*************************/	
//页面加载后自动传递第一个统计参数
expressParams('vil', 1, 2);
//导出为图片的方法
function exportpng(imgIdAndName){  //获取echarts的canvas并保存图片
	if(imgIdAndName.size > 0){  //判断key是否为空,如果为空说明没有图片可以导出
		imgIdAndName.forEach(function (value, key, map) {
			var mycanvas = $('#' + key).find('canvas')[0];
		    var imagesrc = mycanvas.toDataURL('image/png');
		    var $a = document.createElement('a');
		    $a.setAttribute("href", imagesrc);
		    $a.setAttribute("download", value);
		    $a.click();
		});
	}else{
		console.log('没有图片');
	}
}

//公共方法  点击tab键传递参数用于导出图片,导出excel
function expressParams(divname, start, end){
	imgIdAndName.clear();  //清空png map
	if(divname != ''){
		for(i = start;i <= end; i++){
			imgIdAndName.set(divname+i,getfilename(divname+i+'title'));
		}
	}
	return imgIdAndName;
}
function tabParams(divname, start, end){
	tableIdAndName.clear();  //清空表格map
	if(divname != ''){
		for(var i = start;i <= end; i++){
			tableIdAndName.set(divname+i,getfilename(divname+i+'title'));
		}
	}
	return tableIdAndName;
}
//获取filename,导出excel和图片的文件名
function getfilename(nameid){
	var filename = $('#' + nameid).text();
	return filename;
}
//点击顶部tab和左侧tab传递方法名称
var selMed = getVilBasicData;
function selItem(methodName){
    selMed = methodName;
}
getVilBasicData(2017);//初始化第一个图表
//页面加载后将日期补全
function setYear(){
    $('#yearDiv .ulDiv ul').empty();
	$.get("getYears",function(res){
		var years = jQuery.parseJSON(res.data);
		for(var i = 0; i < years.length; i++){
			$('#yearDiv .ulDiv ul').append("<li>"+years[i]+"</li>");
		}
	});
}
$(function(){
	// 统计页面 顶部tab切换
	$(".tab_title li a").click(function(){
        var liindex = $('.tab_title li a').index(this);
        $(this).addClass('active').parent().siblings().find("a").removeClass('active');
        $('.statistics_content').eq(liindex).stop(true,false).show().siblings('.statistics_content').stop(true,false).hide();
        $("#btnSelect").text('2017');
        $("#typeSelect").text('规上企业');
        //顶部tab切换时首先显示的进行加载
	    if(liindex == 0){
	    	//乡镇统计
	    	$(".basic_left ul li a:not(:first)").eq(0).addClass('active').parent().siblings().find("a").removeClass('active');
		    $('.basic_right').eq(0).stop(true,false).show().siblings('.basic_right').stop(true,false).hide();
		    $('#viltext0').stop(true,false).show().siblings('div').stop(true,false).hide();
            selItem(getVilBasicData);
            getVilBasicData(2017);
            $("#yearItem").show();
            $("#typeItem").hide();
	    }else if(liindex == 1){
	        //行业统计
	    	$(".trade_left ul li a:not(:first)").eq(0).addClass('active').parent().siblings().find("a").removeClass('active');
	 	    $('.trade_right').eq(0).stop(true,false).show().siblings('.trade_right').stop(true,false).hide();
	 	    $('#tradetext0').stop(true,false).show().siblings('div').stop(true,false).hide();
            selItem(getTradeBasicData);
	 	    getTradeBasicData(2017);
            $("#yearItem").show();
            $("#typeItem").hide();
	    }else if(liindex == 2){
	        //年份统计
	    	$(".year_left ul li a:not(:first)").eq(0).addClass('active').parent().siblings().find("a").removeClass('active');
		    $('.year_right').eq(0).stop(true,false).show().siblings('.year_right').stop(true,false).hide();
		    $('#yeartext0').stop(true,false).show().siblings('div').stop(true,false).hide();
            yearStats();
            $("#yearItem").hide();
            $("#typeItem").hide();
	    }else if(liindex == 3){//自定义区域统计
            $("#yearItem").show();
            $("#typeItem").hide();
            customStats([1],1);//初次加载全部结果,但此时array为空,变成1才能查询全部
            // src="/#/analysisMap"
			$("#iframe").attr("src","/#/analysisMap");//点击加载地图
		}
	});
	
	//统计页面左侧tab键
	//基本统计 页面左侧tab键
	$(".basic_left ul li a:not(:first)").click(function(){
	    var liindex = $('.basic_left ul li a:not(:first)').index(this);
	    $(this).addClass('active').parent().siblings().find("a").removeClass('active');
	    $('.basic_right').eq(liindex).stop(true,false).show().siblings('.basic_right').stop(true,false).hide();
	    $('#viltext'+liindex).stop(true,false).show().siblings('div').stop(true,false).hide();
        $("#btnSelect").text('2017');
        $("#typeSelect").text('规上企业');
	    //左侧tab切换时进行加载
	    if(liindex == 0){
	    	// resizeEcharts(1, 2, 'vil');
            getVilBasicData(2017);
            $("#yearItem").show();
            $("#typeItem").hide();
	    }else if(liindex == 1){
	    	//resizeEcharts(5, 11, 'vil');
            getVilComData(2017, 'gs');
            $("#yearItem").show();
            $("#typeItem").show();
	    }else{
	        //myChart_vil12.resize();  //各乡镇2017年企业亩产效益评价结果统计
            evaRes(2017);
            $("#yearItem").show();
            $("#typeItem").hide();
	    }
	});
	//行业统计  页面左侧tab键
	$(".trade_left ul li a:not(:first)").click(function(){
	    var liindex = $('.trade_left ul li a:not(:first)').index(this);
	    $(this).addClass('active').parent().siblings().find("a").removeClass('active');
	    $('.trade_right').eq(liindex).stop(true,false).show().siblings('.trade_right').stop(true,false).hide();
	    $('#tradetext'+liindex).stop(true,false).show().siblings('div').stop(true,false).hide();
        $("#btnSelect").text('2017');
        $("#typeSelect").text('规上企业');
	    //左侧tab切换时进行加载
	    if(liindex == 0){
            getTradeBasicData(2017);
            $("#yearItem").show();
            $("#typeItem").hide();
	    }else if(liindex == 1){
            getTradeData(2017, 'gs');
            $("#yearItem").show();
            $("#typeItem").show();
	    }else{
            tradeRes(2017);
            $("#yearItem").show();
            $("#typeItem").hide();
	    }
	});
	//年份统计  页面左侧tab键
	$(".year_left ul li a:not(:first)").click(function(){
	    var liindex = $('.year_left ul li a:not(:first)').index(this);
	    $(this).addClass('active').parent().siblings().find("a").removeClass('active');
	    $('.year_right').eq(liindex).stop(true,false).show().siblings('.year_right').stop(true,false).hide();
	    $('#yeartext'+liindex).stop(true,false).show().siblings('div').stop(true,false).hide();
	  	//左侧tab切换时进行加载
        if(liindex == 0){
            yearStats();
        }else{
            yearRes()
        }
        $("#yearItem").hide();
        $("#typeItem").hide();
	});
	//时间选择
    $('#yearDiv #btnSelect').on('click',function(){
        setYear();
        $(this).siblings('.ulDiv').toggleClass('ulShow');
    });
    $('#yearDiv .ulDiv ul').on('click','li',function(){
        var selTxt=$(this).text();
        $('#btnSelect').text(selTxt);
        $('#yearDiv .ulDiv').removeClass('ulShow');
        selMed(selTxt, $('#typeSelect').text()=='规上企业'?'gs':'gx');
        $('.vilYear').text($('#btnSelect').text()+'年');
    });
    //类型选择
    $('#typeDiv #typeSelect').on('click',function(){
        $(this).siblings('.ulDiv').toggleClass('ulShow');
    });
    $('#typeDiv .ulDiv ul li').on('click',function(){
        var selTxt=$(this).text();
        $('#typeSelect').text(selTxt);
        $('#typeDiv .ulDiv').removeClass('ulShow');
        selMed($("#btnSelect").text(), $('#typeSelect').text()=='规上企业'?'gs':'gx');
    });
})

//固定1234四个表头
for(var i = 1; i <= 11; i++){
	if(i == 6){
        fixedTable('.tabScroll'+i,1);//表头需要控制两行
	}else{
        fixedTable('.tabScroll'+i,0);
	}
}
//固定表头和列D
function fixedTable(tableDiv, index){
	$(tableDiv).scroll(function(){//给table外面的div滚动事件绑定一个函数
		var left=$(tableDiv).scrollLeft();//获取滚动的距离
		var top=$(tableDiv).scrollTop();//获取滚动的距离
		var trs=$(tableDiv + " table tr");//获取表格的所有tr
		trs.each(function(i){//对每一个tr（每一行）进行处理
			//获得每一行下面的所有的td，然后选中下标为0的，即第一列，设置position为相对定位
			//相对于父div左边的距离为滑动的距离，然后设置个背景颜色，覆盖住后面几列数据滑动到第一列下面的情况
			//如果有必要也可以设置一个z-index属性
			if(i <= index){
				$(this).children().css({"position":"relative","top":top,"background-color":"#3E4A6F","z-index":"666"});
			}
		});
	});
}

