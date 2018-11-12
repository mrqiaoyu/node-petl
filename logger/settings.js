let fs = require('fs');
const SETTING_PATH = './settings.json';

function getSettings () {
  try{
    let settings = fs.readFileSync( SETTING_PATH, 'utf8');
    return JSON.parse(settings);
  }catch (e) {
    console.log("get settings append error, ", e['message']);
    return;
  }
}

function getFormat(type){
  let settings = getSettings();
  let logger = settings["developer_options"]["logger"];
  let chooseTemplate = logger["console_format"]["choose_template"];
  let typeTemplate = logger["console_format"]["format_templates"][chooseTemplate][type];
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

exports.getFormat = getFormat;
exports.getColor = getColor;
exports.logDebug = logDebug;
