function GetTime(){
  let dateInfo = {};
  let now = new Date();
  let year = now.getFullYear();       //年
  let month = now.getMonth() + 1;     //月
  let day = now.getDate();            //日
  let hh = now.getHours();            //时
  let mm = now.getMinutes();          //分
  let ss = now.getSeconds();          //秒

  let week = now.getDay();            //星期
//   switch (date.getDay()) {
//     case 0:week="星期天";break
//     case 1:week="星期一";break
//     case 2:week="星期二";break
//     case 3:week="星期三";break
//     case 4:week="星期四";break
//     case 5:week="星期五";break
//     case 6:week="星期六";break
//    }

   dateInfo [ 'year' ] = year;
   dateInfo [ 'month' ] = month;
   dateInfo [ 'day' ] = day;
   dateInfo [ 'hour' ] = hh;
   dateInfo [ 'minute' ] = mm;
   dateInfo [ 'second' ] = ss;
   dateInfo [ 'week' ] = week;

   return dateInfo;
}

function format ( format ) {
  let isOk;
  if ( format !== undefined ){
    isOk = format.match("yy.*?mm.*?dd.*?hh.*?mm.*?ss");
    if ( isOk === null ) {
      format = GetTimeFormat();
    }
  }else{
    format = GetTimeFormat();
  }

  let style = [];
  style.push(format.match("yy(.*?)mm")[1]);
  style.push(format.match("mm(.*?)dd")[1]);
  style.push(format.match("dd(.*?)hh")[1]);
  style.push(format.match("hh(.*?)mm")[1]);
  style.push(format.match("hh.*?mm(.*?)ss")[1]);

  let date = GetTime();

  let formatTime = date ['year'] + style [0];

  if(date ['month'] < 10){
    formatTime += "0";
  }
  formatTime += date[ 'month' ] + style [1];
  if( date [ 'day' ] < 10){
    formatTime += "0";
  }
  formatTime += date [ 'day' ] + style [2];

  if( date [ 'hour' ] < 10){
    formatTime += "0";
  }
  formatTime += date [ 'hour' ] + style [3];
  if (  date [ 'minute' ] < 10) {
    formatTime += '0';
  }
  formatTime += date [ 'minute' ] + style [4];
  if (  date [ 'second' ] < 10) {
    formatTime += '0';
  }
  formatTime += date[ 'second' ];

  return formatTime;
}


/*关于配置文件 settings 的处理部分*/

// 配置文件路径
const SETTING_PATH = __dirname + '/settings.json';

// time 默认配置
const DEFAULT_SETTING = {
	format: 'yy-mm-dd hh:mm:ss'
};

// 获取时间格式
function GetTimeFormat(){
	try{
		let format = fs.readFileSync( SETTING_PATH, 'utf8');
		format = JSON.parse( format )[ 'time' ][ 'defaultFormat' ] || DEFAULT_SETTING[ 'format'];
		return format;
	}catch (e) {
		return DEFAULT_SETTING[ 'format'];
	}

}

exports.format = format;