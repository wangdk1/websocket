/*
 * 批量创建echarts图表
 * @author duwc
 * @date 2019/1/21 12:09
 * @param divId:图表所在div部分id,option:图表的option
 * @return echarts的option
 */
function createEcharts(divIndex, divId, option){
    var chart = document.getElementById(divId + '' + divIndex);
    var echart = echarts.init(chart);
    echart.setOption(option);
}
/********************************乡镇统计***********************************/
//乡镇统计图表生成:基础和经济信息
function vil(title, yName, xData, color){
    /**
     * title: 下载标题
     * yName: 纵轴单位
     * xData: 横轴数据
     * color: 柱状颜色
     */
    var option = {  //各乡镇企业综合能耗统计
        backgroundColor: '#212943',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            right: 15,
            feature: {
                saveAsImage: {
                    name: title,
                    title: '图片导出'
                }
            },
            iconStyle:{
                borderColor:'#fff'
            }
        },
        legend: {
            data:['规上企业','规下企业'],
            textStyle:{
                color: '#fff'
            },
            orient: 'vertical',
            top:'middle',
            right: '1%'
        },
        grid: {
            top: '12%',
            left: '2%',
            right: '10%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            name: yName,
            nameLocation: 'end',
            boundaryGap: [0, 0.01],
            axisLabel:{
                textStyle:{color:'#fff'}
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            }
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisLabel:{
                textStyle:{color:'#fff'}
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            }
        },
        color: color,
        series: []
    }
    return option;
}
//乡镇统计图表生成:亩均评价图表
function vilEva(xData, gradeA, gradeB, gradeC, gradeD) {
    /*
     *xData:横坐标行政区
     *gradeA...:abcd级别数据
     */
    var option = {
        backgroundColor: '#212943',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            right: 15,
            feature: {
                saveAsImage: {
                    name: '各乡镇企业亩产效益评价结果统计',
                    title: '图片导出'
                }
            },
            iconStyle: {
                borderColor: '#fff'
            }
        },
        legend: {
            data: ['A级', 'B级', 'C级', 'D级'],
            textStyle: {
                color: '#fff'
            },
            orient: 'vertical',
            top: 'middle',
            right: '1%'
        },
        grid: {
            top: '12%',
            left: '2%',
            right: '10%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            name: '企业个数(个)',
            boundaryGap: [0, 0.01],
            axisLabel: {
                textStyle: {color: '#fff'}
            },
            axisLine: {
                lineStyle: {color: '#fff'}
            }
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisLabel:{
                textStyle:{color:'#fff'}
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            }
        },
        color: ['#0099DA', '#E7B700', '#C22A31', '#21B24B'],
        series: [
            {
                name: 'A级',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: gradeA
            },
            {
                name: 'B级',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: gradeB
            },
            {
                name: 'C级',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: gradeC
            },
            {
                name: 'D级',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: gradeD
            }
        ]
    }
    return option;
};
//基础统计
function getVilBasicData(year){
    $("#tab1 table tbody").empty();
    $('.vilYear').text($('#btnSelect').text()+'年');
    $.ajax({
        url: 'vilBasic',
        async: false,
        type: "POST",
        dataType: "json",
        data:{year: year},
        success:function(res){
            if(res.result == "Success"){
                var vilData = jQuery.parseJSON(res.data);
                var xDatas = [];
                var xDatas1 = [];
                var gsNum = [];
                var gsYdmj = [];
                var gxNum = [];
                var gxYdmj = [];
                for(var i = 0; i < vilData.length; i++){
                    //表格数据全部乡镇名称
                    if(xDatas1.indexOf(vilData[i].NAME) == -1){
                        xDatas1.push(vilData[i].NAME);
                    }
                    //echarts数据部分乡镇名称
                    var partName;
                    if(vilData[i].NAME != '开发区'&&vilData[i].NAME != '泽雅镇'){
                        partName = vilData[i].NAME.substring(0,vilData[i].NAME.length-2);
                    }else{
                        partName = vilData[i].NAME;
                    }
                    if(xDatas.indexOf(partName) == -1){
                        xDatas.push(partName);
                    }
                    if(vilData[i].TYPE == 'gs'){
                        gsNum.push(vilData[i].NUM);
                        gsYdmj.push(vilData[i].YDMJ.toFixed(2));
                    }else{
                        gxNum.push(vilData[i].NUM);
                        gxYdmj.push(vilData[i].YDMJ.toFixed(2));
                    }
                }
                //表格数据
                for(var i = 0; i < xDatas1.length; i++){
                    $("#tab1 table tbody").append("<tr><td>"+xDatas1[i]+"</td><td>"+(gsNum[i]+gxNum[i])+"</td><td>"+gsNum[i]+"</td><td>"+gxNum[i]+"</td><td>"+(parseFloat(gsYdmj[i])+parseFloat(gxYdmj[i])).toFixed(2)+"</td><td>"+gsYdmj[i]+"</td><td>"+gxYdmj[i]+"</td></tr>");
                    //文字描述
                    if(xDatas1[i] == '总计'){
                        var content = $('#btnSelect').text()+"年，温州市瓯海区共有"+(gsNum[i]+gxNum[i])+"家企业，其中规上企业有"+gsNum[i]+"家，规下企业有"+gxNum[i]+"家；所有企业用地面积有"+(parseFloat(gsYdmj[i])+parseFloat(gxYdmj[i])).toFixed(2)+"亩，其中规上企业有"+gsYdmj[i]+"亩，规下企业有"+gxYdmj[i]+"亩。";
                        $("#viltext0 p").text(content);
                    }
                }
                var vilData = [[gsNum.slice(0,gsNum.length-1), gxNum.slice(0,gsNum.length-1)],[gsYdmj.slice(0,gsNum.length-1), gxYdmj.slice(0,gsNum.length-1)]];
                //创建echarts图表
                var titles = ['各乡镇企业个数统计','各乡镇企业用地面积统计'];
                var basicDw = ['个','亩'];
                var basicColors = [['#0099DA','#E7B700'],['#C22A31','#21B24B']];
                for(var i = 1; i <= 2; i++){
                    var series = [
                        {
                            name: '规上企业',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: vilData[i-1][0]
                        },
                        {
                            name: '规下企业',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: vilData[i-1][1]
                        }
                    ]
                    var option = vil(titles[i-1], basicDw[i-1], xDatas.slice(0,xDatas.length-1), basicColors[i-1]);
                    option.series = series;
                    createEcharts(i, 'vil',option);
                }
            }
        }
    });
    expressParams('vil', 1, 2);tabParams('tab', 1, 1);selItem(getVilBasicData);
}
//企业信息
function getVilComData(year, type){
    $("#tab2 table thead").empty();
    $("#tab2 table tbody").empty();
    $.ajax({
        url: 'vilCom',
        async: false,
        type: "POST",
        dataType: "json",
        data:{
            year: year,
            type: type
        },
        success:function(res){
            if(res.result == "Success"){
                var vilData = jQuery.parseJSON(res.data);
                var xDatas = [];
                var xDatas1 = [];
                var qyrs = [];
                var sjsj = [];
                var zyywsr = [];
                var gyzjz = [];
                var jfzc = [];
                var pwl = [];
                var zhnh = [];
                for(var i = 0; i < vilData.length; i++){
                    //表格数据全部乡镇名称
                    xDatas1.push(vilData[i].NAME);
                    //echarts数据部分乡镇名称
                    var partName;
                    if(vilData[i].NAME != '开发区'&&vilData[i].NAME != '泽雅镇'){
                        partName = vilData[i].NAME.substring(0,vilData[i].NAME.length-2);
                    }else{
                        partName = vilData[i].NAME;
                    }
                    xDatas.push(partName);
                    qyrs.push(vilData[i].NPJZGRS.toFixed(2));
                    sjsj.push(vilData[i].SJSJ.toFixed(2));
                    zyywsr.push(vilData[i].ZYYWSR.toFixed(2));
                    gyzjz.push(vilData[i].GYZJZ.toFixed(2));
                    jfzc.push(vilData[i].RDJFZC.toFixed(2));
                    pwl.push(vilData[i].PWL.toFixed(2));
                    zhnh.push(vilData[i].ZHNH.toFixed(2));
                }
                //表格数据
                if(type == 'gs'){
                    $("#tab2 table thead").append("<tr><th>镇街</th><th>企业类型</th><th>从业人员（人）</th><th>税收总额（万元）</th><th>主营业务收入（万元）</th><th>工业增加值（万元）</th><th>R&D经费支出（万元）</th><th>排污量（吨）</th><th>综合能耗（吨标煤）</th></tr>");
                    for(var i = 0; i < xDatas1.length; i++){
                        $("#tab2 table tbody").append("<tr><td>"+xDatas1[i]+"</td><td>规上企业</td><td>"+qyrs[i]+"</td><td>"+sjsj[i]+"</td><td>"+zyywsr[i]+"</td><td>"+gyzjz[i]+"</td><td>"+jfzc[i]+"</td><td>"+pwl[i]+"</td><td>"+zhnh[i]+"</td></tr>");
                        //文字描述
                        if(xDatas1[i] == '总计'){
                            var content = $('#btnSelect').text()+"年，温州市瓯海区所有规上企业共有从业人数"+qyrs[i]+"人，税收总额有"+sjsj[i]+"万元，主营业务收入"+zyywsr[i]+"万元，工业增加值"+gyzjz[i]+"万元，R&D经费支出"+jfzc[i]+"万元，排污量"+pwl[i]+"吨，综合能耗"+zhnh[i]+"万吨标准煤。";
                            $("#viltext1 p").text(content);
                        }
                    }
                }else{
                    $("#tab2 table thead").append("<tr><th>镇街</th><th>企业类型</th><th>税收总额（万元）</th><th>用电量（万千瓦时）</th></tr>");
                    for(var i = 0; i < xDatas1.length; i++){
                        $("#tab2 table tbody").append("<tr><td>"+xDatas1[i]+"</td><td>规下企业</td><td>"+sjsj[i]+"</td><td>"+zhnh[i]+"</td></tr>");
                        //文字描述
                        if(xDatas1[i] == '总计'){
                            var content = $('#btnSelect').text()+"年，温州市瓯海区所有规下企业税收总额有"+sjsj[i]+"万元，用电量高达"+zhnh[i]+"万千瓦时。";
                            $("#viltext1 p").text(content);
                        }
                    }
                }
                var gsData = [qyrs.slice(0,qyrs.length-1),sjsj.slice(0,sjsj.length-1),zyywsr.slice(0,zyywsr.length-1),gyzjz.slice(0,gyzjz.length-1),jfzc.slice(0,jfzc.length-1),pwl.slice(0,pwl.length-1),zhnh.slice(0,zhnh.length-1)];
                var gxData = [sjsj.slice(0,sjsj.length-1),zhnh.slice(0,zhnh.length-1)];
                //创建echarts图表
                var gsTitles = ['各乡镇企业从业人数统计','各乡镇企业税收总额统计','各乡镇企业主营业务收入统计','各乡镇企业工业增加值统计','各乡镇企业R&D经费支出统计','各乡镇企业排污量统计','各乡镇企业综合能耗统计'];
                var gxTitles = ['各乡镇企业税收总额统计','各乡镇用电量统计'];
                var gsDw = ['人','万元','万元','万元','万元','吨','吨标煤'];
                var gxDw = ['万元','万千瓦时'];
                var colors = [['#354EBB','#09B3CD'],['#65BF4D','#8ACF7B'],['#0099DA','#E7B700'],['#354EBB','#21B24B'],['#8CC540','#09B3CD'],['#7267E6','#55BEF2'],['#354EBB','#65BF4D']];
                var comData = type=='gs'?gsTitles:gxTitles;
                //动态添加echarts容器
                $('.basic_right').find('.comDiv').remove();//首先初始化
                for(var i = 1; i <= comData.length; i++){
                    var divContent = '<div class="charts comDiv">'+
                        '<h4 id="vil'+(i+4)+'title"><span class="comYear"></span>'+(type=='gs'?gsTitles[i-1]:gxTitles[i-1])+'</h4>'+
                        '<div id="vil'+(i+4)+'" style="width: 100%;height:280px;"></div>'+
                        '</div>';
                    //在表格前增加div
                    $('#tab2').before(divContent);
                    var series = [
                        {
                            name: '规上企业',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: gsData[i-1]
                        },
                        {
                            name: '规下企业',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: gxData[i-1]
                        }
                    ]
                    var option = type=='gs'?vil(gsTitles[i-1], gsDw[i-1], xDatas.slice(0,xDatas.length-1), colors[i-1]):vil(gxTitles[i-1], gxDw[i-1], xDatas.slice(0,xDatas.length-1), colors[i-1]);
                    option.series = type=='gs'?series[0]:series[1];
                    createEcharts(i+4, 'vil', option);
                }
                $('.comYear').text($('#btnSelect').text()+'年');
                expressParams('vil', 5, comData.length+4);tabParams('tab', 2, 2);selItem(getVilComData);
            }
        }
    });
}
//乡镇亩均评价
function evaRes(year){
    $("#tab3 table tbody").empty();
    $('.evaYear').text($('#btnSelect').text()+'年');
    $.ajax({
        url: 'vilEvaRes',
        async: false,
        type: "POST",
        dataType: "json",
        data: {year: year},
        success: function (res) {
            if (res.result == "Success") {
                var evaRes = jQuery.parseJSON(res.data);
                var xDatas = [];
                var gradeA = [];
                var gradeB = [];
                var gradeC = [];
                var gradeD = [];
                for(var i = 0; i < evaRes.length; i++){
                    if(evaRes[i].NAME != '总计') {
                        gradeA.push(evaRes[i].A);
                        gradeB.push(evaRes[i].B);
                        gradeC.push(evaRes[i].C);
                        gradeD.push(evaRes[i].D);
                        //echarts乡镇
                        if (evaRes[i].NAME != '开发区' && evaRes[i].NAME != '泽雅镇') {
                            xDatas.push(evaRes[i].NAME.substring(0, evaRes[i].NAME.length - 2));
                        } else {
                            xDatas.push(evaRes[i].NAME);
                        }
                    }
                    //将数据加入表格
                    $("#tab3 table tbody").append("<tr><td>"+evaRes[i].NAME+"</td><td>"+evaRes[i].A+"</td><td>"+evaRes[i].B+"</td><td>"+evaRes[i].C+"</td><td>"+evaRes[i].D+"</td><td>"+evaRes[i].ZJ+"</td></tr>");
                    //文字描述
                    if(evaRes[i].NAME == '总计'){
                        var content = $('#btnSelect').text()+"年，温州市瓯海区"+evaRes[i].ZJ+"家企业中，A级有"+evaRes[i].A+"家，B级有"+evaRes[i].B+"家，C级有"+evaRes[i].C+"家，D级有"+evaRes[i].D+"家。";
                        $("#viltext2 p").text(content);
                    }
                }
                createEcharts(12, 'vil', vilEva(xDatas, gradeA, gradeB, gradeC, gradeD));
            }
        }
    });
    expressParams('vil', 12, 12);tabParams('tab', 3, 3);selItem(evaRes);
}

/********************************行业统计***********************************/
//基础统计图表
function tradeBasic(legendData, nums, ydmj){
    var option = {  //不同行业企业基本信息统计
            backgroundColor: '#212943',
                tooltip: {
            trigger: 'item',
        },
        toolbox: {
            right: 15,
                feature: {
                saveAsImage: {
                    name:'不同行业企业基本信息统计',
                        title: '图片导出'
                }
            },
            iconStyle:{
                borderColor:'#fff'
            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right:5,
            top:20,
            bottom:20,
            data: legendData,
            textStyle:{
                color: '#fff'
            }
        },
        series: [
            {
                name:'企业个数(个)',
                type:'pie',
                radius: ['0', '70%'],
                center : ['25%', '50%'],
                //roseType:'area',
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter:'{a}:{c}'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '23',
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = ['#EB1C22','#FEF200','#F1582C','#21B24B','#92278F','#F36523','#F8931F','#262163','#8CC540','#09B3CD','#2E3094','#652D92','#EB1C22','#FEF200','#F1582C','#21B24B','#92278F','#F36523','#F8931F','#262163','#8CC540','#09B3CD','#2E3094','#652D92','#EB1C22','#FEF200','#F1582C','#21B24B','#92278F','#F36523','#F8931F','#262163','#8CC540','#09B3CD','#2E3094','#652D92'];
                            return colorList[params.dataIndex]
                        },
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: nums
            },
            {
                name:'用地面积(亩)',
                type:'pie',
                radius: ['0', '70%'],
                center : ['60%', '50%'],
                //roseType:'area',
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter:'{a}:{c}'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '23',
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = ['#EB1C22','#FEF200','#F1582C','#21B24B','#92278F','#F36523','#F8931F','#262163','#8CC540',,'#09B3CD','#2E3094','#652D92','#EB1C22','#FEF200','#F1582C','#21B24B','#92278F','#F36523','#F8931F','#262163','#8CC540',,'#09B3CD','#2E3094','#652D92','#EB1C22','#FEF200','#F1582C','#21B24B','#92278F','#F36523','#F8931F','#262163','#8CC540',,'#09B3CD','#2E3094','#652D92'];
                            return colorList[params.dataIndex]
                        },
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: ydmj
            }
        ]
    }
    return option;
}
//行业分析公共方法
function trade(title, legendData, xName, yData, color){
    /**
     * title:下载工具标题
     * xName:纵轴单位
     * color:柱状颜色
     */
    var option = {
        backgroundColor: '#212943',
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            right: 15,
            feature: {
                saveAsImage: {
                    name: title,
                    title: '图片导出'
                }
            },
            iconStyle:{
                borderColor:'#fff'
            }
        },
        legend: {
            data:legendData,
            textStyle:{
                color: '#fff'
            },
            orient: 'vertical',
            top:'middle',
            right: '1%'
        },
        grid: {
            top: '2%',
            left: '1%',
            right: '10.5%',
            bottom: '2%',
            containLabel: true
        },
        xAxis:  {
            type: 'value',
            name: xName,
            axisLabel:{
                textStyle:{color:'#fff'}
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            }
        },
        yAxis: {
            type: 'category',
            data: yData,
            axisLabel:{
                textStyle:{color:'#fff'},
                //rotate:40
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            },
        },
        color: color,
        series: []
    }
    return option;
}
//基本统计
function getTradeBasicData(year){
    $("#tab4 table tbody").empty();
    $('.tradeBasicYear').text($('#btnSelect').text()+'年');
    $.ajax({
        url: 'tradeBasic',
        async: false,
        type: "POST",
        dataType: "json",
        data: {year: year},
        success: function (res) {
            if (res.result == "Success") {
                var tradeBasics = jQuery.parseJSON(res.data);
                var legenData = [];
                var qynums = [];
                var ydmj = [];
                for(var i = 0; i < tradeBasics.length; i++){
                    legenData.push(tradeBasics[i].NAME);
                    qynums.push({value: tradeBasics[i].NUMS, name: tradeBasics[i].NAME});
                    ydmj.push({value: tradeBasics[i].YDMJ.toFixed(2), name: tradeBasics[i].NAME});
                    $("#tab4 table tbody").append("<tr><td>"+tradeBasics[i].NAME+"</td><td>"+tradeBasics[i].NUMS+"</td><td>"+tradeBasics[i].YDMJ.toFixed(2)+"</td></tr>");
                    //文字描述
                    if(tradeBasics[i].NAME == '总计'){
                        var content = $('#btnSelect').text()+"年，温州市瓯海区"+tradeBasics[i].NUMS+"家企业遍及了"+i+"个行业，用地面积共达"+tradeBasics[i].YDMJ.toFixed(2)+"亩。";
                        $("#tradetext0 p").text(content);
                    }
                }
                createEcharts(1, 'trade', tradeBasic(legenData.slice(0,legenData.length-1), qynums.slice(0,qynums.length-1), ydmj.slice(0,ydmj.length-1)));
            }
        }
    });
    expressParams('trade', 1, 1);tabParams('tab', 4, 4);selItem(getTradeBasicData);
}
//企业信息
function getTradeData(year, type){
    $("#tab5 table thead").empty();
    $("#tab5 table tbody").empty();
    $.ajax({
        url: 'tradeData',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            year: year,
            type: type
        },
        success: function (res) {
            if (res.result == "Success") {
                var tradeData = jQuery.parseJSON(res.data);
                var xDatas = [];
                var qyrs = [];
                var sjsj = [];
                var zyywsr = [];
                var gyzjz = [];
                var jfzc = [];
                var pwl = [];
                var zhnh = [];
                for(var i = 0; i < tradeData.length; i++){
                    //表格数据全部乡镇名称
                    xDatas.push(tradeData[i].NAME);
                    qyrs.push(tradeData[i].NPJZGRS.toFixed(2));
                    sjsj.push(tradeData[i].SJSJ.toFixed(2));
                    zyywsr.push(tradeData[i].ZYYWSR.toFixed(2));
                    gyzjz.push(tradeData[i].GYZJZ.toFixed(2));
                    jfzc.push(tradeData[i].RDJFZC.toFixed(2));
                    pwl.push(tradeData[i].PWL.toFixed(2));
                    zhnh.push(tradeData[i].ZHNH.toFixed(2));
                }
                //表格数据
                if(type == 'gs'){
                    $("#tab5 table thead").append("<tr><th>行业类型</th><th>企业类型</th><th>从业人员（人）</th><th>税收总额（万元）</th><th>主营业务收入（万元）</th><th>工业增加值（万元）</th><th>R&D经费支出（万元）</th><th>排污量（吨）</th><th>综合能耗（吨标煤）</th></tr>");
                    for(var i = 0; i < xDatas.length; i++){
                        $("#tab5 table tbody").append("<tr><td>"+xDatas[i]+"</td><td>规上企业</td><td>"+qyrs[i]+"</td><td>"+sjsj[i]+"</td><td>"+zyywsr[i]+"</td><td>"+gyzjz[i]+"</td><td>"+jfzc[i]+"</td><td>"+pwl[i]+"</td><td>"+zhnh[i]+"</td></tr>");
                        //文字描述
                        if(xDatas[i] == '总计'){
                            var content = $('#btnSelect').text()+"年，温州市瓯海区所有规上企业共有从业人数"+qyrs[i]+"人，税收总额有"+sjsj[i]+"万元，主营业务收入"+zyywsr[i]+"万元，工业增加值"+gyzjz[i]+"万元，R&D经费支出"+jfzc[i]+"万元，排污量"+pwl[i]+"吨，综合能耗"+zhnh[i]+"万吨标准煤。";
                            $("#tradetext1 p").text(content);
                        }
                    }
                }else{
                    $("#tab5 table thead").append("<tr><th>镇街</th><th>企业类型</th><th>税收总额（万元）</th><th>用电量（万千瓦时）</th></tr>");
                    for(var i = 0; i < xDatas.length; i++){
                        $("#tab5 table tbody").append("<tr><td>"+xDatas[i]+"</td><td>规下企业</td><td>"+sjsj[i]+"</td><td>"+zhnh[i]+"</td></tr>");
                        //文字描述
                        if(xDatas[i] == '总计'){
                            var content = $('#btnSelect').text()+"年，温州市瓯海区所有规下企业税收总额有"+sjsj[i]+"万元，用电量高达"+zhnh[i]+"万千瓦时。";
                            $("#tradetext1 p").text(content);
                        }
                    }
                }
                var gsData = [qyrs.slice(0,qyrs.length-1),sjsj.slice(0,sjsj.length-1),zyywsr.slice(0,zyywsr.length-1),gyzjz.slice(0,gyzjz.length-1),jfzc.slice(0,jfzc.length-1),pwl.slice(0,pwl.length-1),zhnh.slice(0,zhnh.length-1)];
                var gxData = [sjsj.slice(0,sjsj.length-1),zhnh.slice(0,zhnh.length-1)];
                //创建echarts图表
                var gsTitles = ['不同行业企业从业人数统计','不同行业企业税收总额统计','不同行业企业主营业务收入统计','不同行业企业工业增加值统计','不同行业企业R&D经费支出统计','不同行业企业排污量统计','不同行业企业综合能耗统计'];
                var gxTitles = ['不同行业企业税收总额统计','不同行业用电量统计'];
                var gsDw = ['人','万元','万元','万元','万元','吨','吨标煤'];
                var gxDw = ['万元','万千瓦时'];
                var colors = [['#354EBB','#09B3CD'],['#65BF4D','#8ACF7B'],['#0099DA','#E7B700'],['#354EBB','#21B24B'],['#8CC540','#09B3CD'],['#7267E6','#55BEF2'],['#354EBB','#65BF4D']];
                var comData = type=='gs'?gsTitles:gxTitles;
                //动态添加echarts容器
                $('.trade_right').find('.tradeDiv').remove();//首先初始化
                for(var i = 1; i <= comData.length; i++){
                    var divContent = '<div class="charts tradeDiv">'+
                        '<h4 id="trade'+(i+2)+'title"><span class="tradeYear"></span>'+(type=='gs'?gsTitles[i-1]:gxTitles[i-1])+'</h4>'+
                        '<div id="trade'+(i+2)+'" style="width: 100%;height:280px;"></div>'+
                        '</div>';
                    //在表格前增加div
                    $('#tab5').before(divContent);
                    var series = [
                        {
                            name: '规上企业',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: gsData[i-1]
                        },
                        {
                            name: '规下企业',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: gxData[i-1]
                        }
                    ]
                    var legend = ['规上企业','规下企业'];
                    var option = type=='gs'?trade(gsTitles[i-1], legend, gsDw[i-1], xDatas.slice(0,xDatas.length-1), colors[i-1]):trade(gxTitles[i-1], legend, gxDw[i-1], xDatas.slice(0,xDatas.length-1), colors[i-1]);
                    option.series = type=='gs'?series[0]:series[1];
                    createEcharts(i+2, 'trade', option);
                }
                $('.tradeYear').text($('#btnSelect').text()+'年');
                expressParams('trade', 3, comData.length+2);tabParams('tab', 5, 5);selItem(getTradeData);
            }
        }
    });

}
//行业亩均评价
function tradeRes(year){
    $("#tab6 table tbody").empty();
    $('.tradeEvaYear').text($('#btnSelect').text()+'年');
    $.ajax({
        url: 'tradeEvaRes',
        async: false,
        type: "POST",
        dataType: "json",
        data: {year: year},
        success: function (res) {
            if (res.result == "Success") {
                var tradeEvaRes = jQuery.parseJSON(res.data);
                var xDatas = [];
                var gradeA = [];
                var gradeB = [];
                var gradeC = [];
                var gradeD = [];
                for(var i = 0; i < tradeEvaRes.length; i++){
                    if(tradeEvaRes[i].NAME != '总计') {
                        gradeA.push(tradeEvaRes[i].A);
                        gradeB.push(tradeEvaRes[i].B);
                        gradeC.push(tradeEvaRes[i].C);
                        gradeD.push(tradeEvaRes[i].D);
                        xDatas.push(tradeEvaRes[i].NAME);
                    }
                    //将数据加入表格
                    $("#tab6 table tbody").append("<tr><td>"+tradeEvaRes[i].NAME+"</td><td>"+tradeEvaRes[i].A+"</td><td>"+tradeEvaRes[i].B+"</td><td>"+tradeEvaRes[i].C+"</td><td>"+tradeEvaRes[i].D+"</td><td>"+tradeEvaRes[i].ZJ+"</td></tr>");
                    if(tradeEvaRes[i].NAME == '总计'){
                        var content = $('#btnSelect').text()+"年，温州市瓯海区"+tradeEvaRes[i].ZJ+"家企业中，A级有"+tradeEvaRes[i].A+"家，B级有"+tradeEvaRes[i].B+"家，C级有"+tradeEvaRes[i].C+"家，D级有"+tradeEvaRes[i].D+"家。";
                        $("#tradetext2 p").text(content);
                    }
                }
                var legend = ['A级','B级','C级','D级'];
                var grade = [gradeA,gradeB,gradeC,gradeD];
                var option = trade('不同行业企业亩产效益评价结果统计', legend, '企业个数(个)', xDatas, ['#0099DA','#E7B700','#C22A31','#21B24B']);
                var series = [];
                for(var i = 0; i < legend.length; i++){
                    series.push({
                        name: legend[i],
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                        },
                        data: grade[i]
                    });
                }
                option.series = series;
                createEcharts(10, 'trade', option);
            }
        }
    });
    expressParams('trade', 10, 10);tabParams('tab', 6, 6);selItem(tradeRes);
}

/********************************年份统计***********************************/
//年份统计渲染方法
function renderItem(params, api) {
    var xValue = api.value(0);
    var currentSeriesIndices = api.currentSeriesIndices();
    var barLayout = api.barLayout({
        barGap: '30%', barCategoryGap: '20%', count: currentSeriesIndices.length - 1
    });

    var points = [];
    for (var i = 0; i < currentSeriesIndices.length; i++) {
        var seriesIndex = currentSeriesIndices[i];
        if (seriesIndex !== params.seriesIndex) {
            var point = api.coord([xValue, api.value(seriesIndex)]);
            point[0] += barLayout[i - 1].offsetCenter;
            point[1] -= 20;
            points.push(point);
        }
    }
    var style = api.style({
        stroke: api.visual('color'),
        fill: null
    });

    return {
        type: 'polyline',
        shape: {
            points: points
        },
        style: style
    };
}
//年份趋势变化公共方法
function year(title, legendData, yName, xData, customData, dataList){
    /**
     * title:下载工具标题
     * legendData: 图例
     * yName:纵轴单位
     * xData: 横轴数据
     * customData:趋势数据
     * dataList:横轴条形图数据
     */
    var option = {
        backgroundColor: '#212943',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            right: 15,
            feature: {
                saveAsImage: {
                    name: title,
                    title: '图片导出'
                }
            },
            iconStyle:{
                borderColor:'#fff'
            }
        },
        legend: {
            data: legendData,
            type: 'scroll',
            textStyle:{
                color: '#fff'
            },
            orient: 'vertical',
            top:'middle',
            right: '1%',
            bottom: 10
        },
        grid: {
            top: '12%',
            left: '2%',
            right: '10%',
            bottom: '12%',
            containLabel: true
        },
        dataZoom: [{
            type: 'slider',
            start: 0,
            end: 100,
            textStyle:{
                color:'#fff'
            }
        }, {
            type: 'inside',
            start: 0,
            end: 100
        }],
        yAxis: {
            type: 'value',
            name: yName,
            boundaryGap: [0, 0.01],
            axisLabel:{
                textStyle:{color:'#fff'}
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            }
        },
        xAxis: {
            data: xData,
            axisLabel:{
                textStyle:{color:'#fff'}
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            }
        },
        color:['#C22A31','#0099DA','#E7B700','#21B24B'],
        series: [{
            type: 'custom',
            name: '趋势',
            renderItem: renderItem,
            itemStyle: {
                normal: {
                    borderWidth: 2
                }
            },
            data: customData
        }].concat(echarts.util.map(dataList, function (data, index) {
            return {
                type: 'bar',
                animation: false,
                name: legendData[index + 1],
                data: data
            };
        }))
    }
    return option;
}
//亩均效益亩均变化
function yearEva(legendData){

    var option ={
        backgroundColor: '#212943',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: legendData,
            type: 'scroll',
            textStyle:{
                color: '#fff'
            },
            orient: 'vertical',
            top:'middle',
            right: '1%',
            bottom: 10
        },
        grid: {
            top: '10%',
            left: '2%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },
        dataZoom: [{
            type: 'slider',
            start: 0,
            end: 100
        }, {
            type: 'inside',
            start: 0,
            end: 100
        }],
        toolbox: {
            right: 15,
            feature: {
                saveAsImage: {
                    name:'不同等级亩产效益企业数量变化',
                    title: '图片导出'
                }
            },
            iconStyle:{
                borderColor:'#fff'
            }
        },
        xAxis : {
            type: 'category',
            name: '企业等级',
            data: ['A级', 'B级', 'C级', 'D级'],
            axisLabel:{
                textStyle:{color:'#fff'}
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            },
            axisTick: {
                alignWithLabel: false
            }
        },
        yAxis : {
            type: 'value',
            name: '企业个数(个)',
            axisLabel: {
                textStyle:{color:'#fff'}
            },
            axisLine:{
                lineStyle:{color:'#fff'}
            }
        },
        color:['#0099DA','#E7B700','#C22A31','#21B24B'],
        series : []
    }
    return option;
}
//不同指标统计
function yearStats(){
    $('#tab7 table thead').empty();
    $('#tab8 table thead').empty();
    $('#tab9 table thead').empty();
    $('#tab7 table tbody').empty();
    $('#tab8 table tbody').empty();
    $('#tab9 table tbody').empty();
    $.ajax({
        url: 'yearStats',
        async: false,
        type: "POST",
        dataType: "json",
        data: {year: year},
        success: function (res) {
            if (res.result == "Success") {
                var yearData = jQuery.parseJSON(res.data);
                var nf = yearData[yearData.length-1].nf;//获取年份数组
                //遍历得到图表所需数据
                var xDatas = [];//乡镇
                var xDatas1 = [];//echarts乡镇
                //趋势和条形图数据
                var qygrData = [];
                var qygrList = [];//企业个数
                var ydmjData = [];
                var ydmjList = [];//用地面积
                var sjsjData = [];
                var sjsjList = [];//税收
                //趋势数据获取
                for(var i = 0; i < yearData.length-2; i++) {
                    xDatas.push(yearData[i].NAME);//表格乡镇
                    //echarts数据部分乡镇名称
                    var partName;
                    if(yearData[i].NAME != '开发区'&&yearData[i].NAME != '泽雅镇'){
                        partName = yearData[i].NAME.substring(0,yearData[i].NAME.length-2);
                    }else{
                        partName = yearData[i].NAME;
                    }
                    xDatas1.push(partName);
                    var qygsMxz = [];
                    var ydmjMxz = [];
                    var sjsjMxz = [];
                    qygsMxz.push(i);
                    ydmjMxz.push(i);
                    sjsjMxz.push(i);
                    for(var j = 0; j < nf.length; j++){
                        qygsMxz.push(yearData[i]["QYGS"+nf[j]]);
                        ydmjMxz.push(yearData[i]["YDMJ"+nf[j]].toFixed(2));
                        sjsjMxz.push(yearData[i]["SJSJ"+nf[j]].toFixed(2));
                    }
                    qygrData.push(qygsMxz);
                    ydmjData.push(ydmjMxz);
                    sjsjData.push(sjsjMxz);
                }
                for(var i = 0; i < yearData.length-1; i++) {
                    for(var j = 0; j < nf.length; j++) {
                        //文字描述
                        if (yearData[i].NAME == '总计') {
                            if (j == nf.length - 1) {
                                var content = nf[j] + "年，温州市瓯海区共有" + yearData[i]["QYGS" + nf[j]] + "家企业，用地总面积为" + yearData[i]["YDMJ" + nf[j]].toFixed(2) + "亩，税收总额为" + yearData[i]["SJSJ" + nf[j]].toFixed(2) + "万元。";
                                $("#yeartext0 p").text(content);
                            }
                        }
                    }
                }
                //条形图数据获取
                for(var i = 0; i < nf.length; i++){
                    var qygsMn = [];//每年所有乡镇企业个数
                    var ydmjMn = [];//每年所有乡镇用地面积
                    var sjsjMn = [];//每年所有乡镇实缴税收
                    for(var j = 0; j < yearData.length-1; j++) {
                        qygsMn.push(yearData[j]["QYGS"+nf[i]]);
                        ydmjMn.push(yearData[j]["YDMJ"+nf[i]].toFixed(2));
                        sjsjMn.push(yearData[j]["SJSJ"+nf[i]].toFixed(2));
                    }
                    qygrList.push(qygsMn.slice(0,qygsMn.length-1));
                    ydmjList.push(ydmjMn.slice(0,ydmjMn.length-1));
                    sjsjList.push(sjsjMn.slice(0,sjsjMn.length-1));
                }
                //填充表格数据
                $('#tab7 table thead').append("<tr><th>镇街</th></tr>");
                $('#tab8 table thead').append("<tr><th>镇街</th></tr>");
                $('#tab9 table thead').append("<tr><th>镇街</th></tr>");
                //表头
                for(var j = 0; j < nf.length; j++){
                    $("#tab7 table thead tr:eq(0)").append("<th>"+nf[j]+"年</th>");
                    $("#tab8 table thead tr:eq(0)").append("<th>"+nf[j]+"年</th>");
                    $("#tab9 table thead tr:eq(0)").append("<th>"+nf[j]+"年</th>");
                }
                //表格
                for(var i = 0; i < yearData.length-1; i++) {
                    $('#tab7 table tbody').append("<tr class='tr"+i+"'><td>"+yearData[i].NAME+"</td></tr>");
                    $('#tab8 table tbody').append("<tr class='tr"+i+"'><td>"+yearData[i].NAME+"</td></tr>");
                    $('#tab9 table tbody').append("<tr class='tr"+i+"'><td>"+yearData[i].NAME+"</td></tr>");
                    for(var j = 0; j < nf.length; j++){
                        $('#tab7 table tbody .tr'+i).append("<td>"+yearData[i]["QYGS"+nf[j]]+"</td>");
                        $('#tab8 table tbody .tr'+i).append("<td>"+yearData[i]["YDMJ"+nf[j]].toFixed(2)+"</td>");
                        $('#tab9 table tbody .tr'+i).append("<td>"+yearData[i]["SJSJ"+nf[j]].toFixed(2)+"</td>");
                    }
                }
                //echarts数据
                var titles = ["各乡镇企业数量变化","各乡镇企业用地总面积变化","各乡镇企业实缴税收总额变化"];
                var yNames = ["个","亩","万元"];
                nf.unshift("趋势");
                var customData = [qygrData, ydmjData, sjsjData];
                var dataList = [qygrList, ydmjList, sjsjList];
                for(var i = 0; i < titles.length; i++){
                    createEcharts(i+1, 'year', year(titles[i], nf, yNames[i], xDatas1, customData[i], dataList[i]));
                }
            }
        }
    });
    expressParams('year', 1, 3);tabParams('tab', 7, 9);
}
//年份亩均评价变化
function yearRes(){
    $("#tab15 table tbody").empty();
    $.ajax({
        url: 'yearEvaRes',
        async: false,
        type: "POST",
        dataType: "json",
        data: {year: year},
        success: function (res) {
            if (res.result == "Success") {
                var yearEvaRes = jQuery.parseJSON(res.data);
                var nf = [];
                var yearGrade = [];
                for(var i = 0; i < yearEvaRes.length; i++){
                    var yearg = [];
                    yearg.push(yearEvaRes[i].A, yearEvaRes[i].B, yearEvaRes[i].C, yearEvaRes[i].D);
                    nf.push(yearEvaRes[i].NAME);
                    //将数据加入表格
                    $("#tab15 table tbody").append("<tr><td>"+yearEvaRes[i].NAME+"年</td><td>"+yearEvaRes[i].A+"</td><td>"+yearEvaRes[i].B+"</td><td>"+yearEvaRes[i].C+"</td><td>"+yearEvaRes[i].D+"</td><td>"+yearEvaRes[i].ZJ+"</td></tr>");
                    if(i == yearEvaRes.length-1){
                        var content = yearEvaRes[i].NAME+"年，温州市瓯海区"+yearEvaRes[i].ZJ+"家企业中，A级有"+yearEvaRes[i].A+"家，B级有"+yearEvaRes[i].B+"家，C级有"+yearEvaRes[i].C+"家，D级有"+yearEvaRes[i].D+"家。";
                        $("#yeartext1 p").text(content);
                    }
                    yearGrade.push(yearg);
                }
                var option = yearEva(nf);
                var series = [];
                for(var i = 0; i < nf.length; i++){
                    series.push({
                        name: nf[i],
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                        },
                        data: yearGrade[i]
                    });
                }
                option.series = series;
                createEcharts(9, 'year', option);
            }
        }
    });
    expressParams('year', 9, 9);tabParams('tab', 15, 15);
}

/*********************项目地图统计**************************/
//等级饼图
function gradePie(){
    var option = {
        backgroundColor: '#212943',
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        grid: {
            top: '1%',
            left: '1%',
            containLabel: true
        },
        legend: {
            orient: 'vertical',
            right: 5,
            top: 50,
            textStyle:{
                color: '#fff'
            },
            data: ['A级','B级','C级','D级']
        },
        series : [{
            name: '所选企业亩均效益等级统计',
            type: 'pie',
            radius : '70%',
            center: ["45%","50%"],
            data: [],
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    formatter:'{a}:{c}'
                }
            },
            color:["#0EF52C","#008CFF","#FFBF00","#FF0000"]
        }]
    }
    return option;
}
//通过地图数据进行查询统计
/**
 * array: 为地图端传来的数据,即企业信用代码数组
 * initCode: 为1时为初次加载,显示全部结果,此时array为[1](自己加的);为空时表示是划定区域后的结果
 */
function customStats(array, initCode){
    if(array.length > 0) {
        var tabTr = ["企业个数(个)", "用地面积(亩)", "实缴税收(万元)", "工业增加值(万元)", "综合能耗(吨标煤)", "排污量(吨)", "R&D经费支出(万元)", "主营业务收入(万元)", "年平均职工人数(人)", "企业用电量(万千瓦时)", "A级企业个数", "B级企业个数", "C级企业个数", "D级企业个数"];
        var trCode = ['NUMS', 'YDMJ', 'SJSJ', 'GYZJZ', 'ZHNH', 'PWL', 'RDJFZC', 'ZYYWSR', 'NPJZGRS', 'QYYDL', 'A', 'B', 'C', 'D'];
        var year = $('#btnSelect').text();
        //console.log(array);
        $.ajax({
            url: "customStats",
            type: "POST",
            traditional: true,
            dataType: "json",
            data: {
                year: year,
                array: array,
                initCode: initCode
            },
            success: function (res) {
                if (res.result == "Success") {
                    var comInfos = jQuery.parseJSON(res.data);
                    if (comInfos.length > 0) {//如果返回数据不为空,即划定区域内无企业
                        // console.log(comInfos);
                        $("#tab16 table tbody").empty();
                        $('.areaStats').text(year + '年');
                        //表格数据
                        var tabContent = '';
                        for (var i = 0; i < tabTr.length; i++) {
                            if (comInfos.length == 1) {
                                if (comInfos[0].QYLX == 'gs') {
                                    if(trCode[i] == 'NUMS' | trCode[i] == 'NPJZGRS' | trCode[i] == 'A' | trCode[i] == 'B' | trCode[i] == 'C' | trCode[i] == 'D'){
                                        tabContent += "<tr><td>" + tabTr[i] + "</td><td>" + comInfos[0][trCode[i]] + "</td><td>" + comInfos[0][trCode[i]] + "</td><td>0</td></tr>";
                                    }else{
                                        tabContent += "<tr><td>" + tabTr[i] + "</td><td>" + comInfos[0][trCode[i]].toFixed(2) + "</td><td>" + comInfos[0][trCode[i]].toFixed(2) + "</td><td>0.00</td></tr>";
                                    }
                                } else {
                                    if(trCode[i] == 'NUMS' | trCode[i] == 'NPJZGRS' | trCode[i] == 'A' | trCode[i] == 'B' | trCode[i] == 'C' | trCode[i] == 'D') {
                                        tabContent += "<tr><td>" + tabTr[i] + "</td><td>" + comInfos[0][trCode[i]] + "</td><td>0</td><td>" + comInfos[0][trCode[i]] + "</td></tr>";
                                    }else{
                                        tabContent += "<tr><td>" + tabTr[i] + "</td><td>" + comInfos[0][trCode[i]].toFixed(2) + "</td><td>0.00</td><td>" + comInfos[0][trCode[i]].toFixed(2) + "</td></tr>";
                                    }
                                }
                            } else {
                                if(trCode[i] == 'NUMS' | trCode[i] == 'NPJZGRS' | trCode[i] == 'A' | trCode[i] == 'B' | trCode[i] == 'C' | trCode[i] == 'D') {
                                    tabContent += "<tr><td>" + tabTr[i] + "</td><td>" + (comInfos[0][trCode[i]] + comInfos[1][trCode[i]]) + "</td><td>" + comInfos[0][trCode[i]] + "</td><td>" + comInfos[1][trCode[i]] + "</td></tr>"
                                }else{
                                    tabContent += "<tr><td>" + tabTr[i] + "</td><td>" + (comInfos[0][trCode[i]] + comInfos[1][trCode[i]]).toFixed(2) + "</td><td>" + comInfos[0][trCode[i]].toFixed(2) + "</td><td>" + comInfos[1][trCode[i]].toFixed(2) + "</td></tr>"
                                }
                            }
                        }
                        $("#tab16 table tbody").append(tabContent);
                        var pieDate = [];
                        if (comInfos.length == 1) {
                            pieDate =
                                [{value: comInfos[0].A, name: "A级"},
                                    {value: comInfos[0].B, name: "B级"},
                                    {value: comInfos[0].C, name: "C级"},
                                    {value: comInfos[0].D, name: "D级"}];
                        } else {
                            pieDate =
                                [{value: comInfos[0].A + comInfos[1].A, name: "A级"},
                                    {value: comInfos[0].B + comInfos[1].B, name: "B级"},
                                    {value: comInfos[0].C + comInfos[1].C, name: "C级"},
                                    {value: comInfos[0].D + comInfos[1].D, name: "D级"}];
                        }
                        var option = gradePie();
                        option.series[0].data = pieDate;
                        createEcharts(1, 'area', option);
                    }
                }
            }
        });
    }
    expressParams('area', 1, 1);
    tabParams('tab', 16, 16);
}