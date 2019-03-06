//jQuery HTML导出Excel文件(兼容IE及所有浏览器)
function HtmlExportToExcel(tableid,filename) {
	var aId = 'dlink';
    if (getExplorer() == 'ie' || getExplorer() == undefined) {
        HtmlExportToExcelForIE(tableid, filename);
    }
    else {
        HtmlExportToExcelForEntire(tableid, filename, aId)
    }
}
//IE浏览器导出Excel
function HtmlExportToExcelForIE(tableid, filename) {
    try {
        var winname = window.open('', '_blank', 'top=10000');
        var strHTML = document.getElementById(tableid).innerHTML;

        winname.document.open('application/vnd.ms-excel', 'export excel');
        winname.document.writeln(strHTML);
        winname.document.execCommand('saveas', '', filename + '.xls');
        winname.close();

    } catch (e) {
        alert(e.description);
    }
}
//非IE浏览器导出Excel
var HtmlExportToExcelForEntire = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
	template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
	base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
	format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name, aId) {
        if (!table.nodeType) { table = document.getElementById(table); }
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        document.getElementById(aId).href = uri + base64(format(template, ctx));
        document.getElementById(aId).download = name + ".xls";
        document.getElementById(aId).click();
    }
})()//表示立即执行此方法,()代表其本身,匿名函数
function getExplorer() {
    var explorer = window.navigator.userAgent;
    //ie 
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox 
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome';
    }
    //Opera
    else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera';
    }
    //Safari
    else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari';
    }
}