let fs = require('fs');
var path = require('path');
let timer = require('../time/time');

const SETTING_PATH = path.resolve(__dirname, '..') + '/settings.json';;

function getSettings () {
  try{
    let settings = fs.readFileSync( SETTING_PATH, 'utf8');
    return JSON.parse(settings);
  }catch (e) {
    console.log("get settings append error, ", e['message']);
    return;
  }
}

function getFormat(type, file){
  let settings = getSettings();
  let logger = settings["developer_options"]["logger"];
  let isFile = 'console_format';
  if (file === 'file')
  isFile = 'file_format';
  let chooseTemplate = logger[isFile]["choose_template"];
  let typeTemplate = logger[isFile]["format_templates"][chooseTemplate][type];
  let formatStyles = logger["format_styles"][typeTemplate]

  return formatStyles;
}

function getColor(type){
  let settings = getSettings();
  let logger = settings["developer_options"]["logger"];
  let chooseColor = logger["log_console_color"]["choose_color"];
  let typeColor = logger["log_console_color"]["color_templates"][chooseColor][type];
  let color = "\033[" + typeColor + "m" +'%s'+ "\033[0m"
  return color;
}

function logDebug(){
  let settings = getSettings();
  let logger = settings["user_options"]["logger"];
  return logger["debug"];
}

function logFilter(){
  let settings = getSettings();
  let filter = settings["user_options"]["logger"]["filter"];
  let type = filter["type"];
  let method = filter["method"];
  let content = filter["content"];

  return {type, method, content};
}

function getTime(){
  let settings = getSettings();
  let logger = settings["developer_options"]["logger"];
  let chooseTime = logger["log_time"]["choose_time"];
  let format = logger["log_time"]["time_templates"][chooseTime];
  return timer.format(format);
}

function getLogPostion(type){
  let settings = getSettings();
  let logger = settings["developer_options"]["logger"];
  let choose = logger["log_file_postion"]["choose_postion"];
  let format = logger["log_file_postion"]["templates"][choose];
  let pos = format['pos'];

  if (pos.match('TIME'))
  pos = pos.replace('TIME', getTime().split(' ')[0]);
  if(pos.match('TYPE'))
  pos = pos.replace('TYPE', type);

  return pos;
}

function getLogDays () {
  let settings = getSettings();
  let logger = settings["developer_options"]["logger"];
  let day = logger["days"];

  return day;
}

exports.getFormat = getFormat;
exports.getColor = getColor;
exports.logDebug = logDebug;
exports.logFilter = logFilter;
exports.getTime = getTime;
exports.getLogPostion = getLogPostion;
exports.getLogDays = getLogDays;
