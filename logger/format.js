let path = require('path');
let fs = require('fs');

const SETTING_PATH = './settings.json';
const CONTENTS = ['TIME', 'METHOD', 'POSITION', 'TYPE', 'CONTENT'];
// const CONTENTS = ['TIME', 'METHOD', 'POSITION', 'TYPE'];

let settings = getSettings();
let logFormats = settings['developer_options']['logger']['log_format'];

function stackInfo() {
	let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
	let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
	let stacklist = (new Error()).stack.split('\n').slice(3);
	let s = stacklist[0];
	let sp = stackReg.exec(s) || stackReg2.exec(s);
	let data = {};
	if (sp && sp.length === 5) {
		data.method = sp[1];
		data.path = sp[2];
		data.line = sp[3];
		data.pos = sp[4];
		data.file = path.basename(data.path);
	}
  //   data: {method: 'Object.<anonymous>', path: 'F:\\Node\\project\\TOOL\\node-petl\\test.js', line: '6',
  //   pos: '5', file: 'test.js' }
  return data;
}

function getSettings(){
	try{
		let settings = fs.readFileSync( SETTING_PATH, 'utf8');
		return JSON.parse(settings);
	}catch (e) {
		console.log("get settings append error, ", e['message']);
	}
}

function logFormat (data) {
  let style = logFormats['simple'];
  for (let i of CONTENTS) {
		if (i === 'CONTENT') {
			data[i] = toString(data[i]);
		}
    style = style.replace(i, data[i]);
  }
  let reg = new RegExp(',', 'g');
  return style.replace(reg,' ');
}

function toString (objs) {
	let value='';
	for (let obj of objs) {
		if (needToString(obj)){
			var cache = [];
			obj = JSON.stringify(obj, function(key, value) {
				if (typeof value === 'object' && value !== null) {
					if (cache.indexOf(value) !== -1) {
						return;
					}
					cache.push(value);
				}
				return value;
			});
		}
		cache = null;
		value= value + ' ' + obj;
	}
	return value
}

function needToString (data) {
	let type = Object.prototype.toString.call (data);
	if (type === '[object Array]' || type === '[object Object]')
	return true;
	return false;
}

exports.stack = stackInfo;
exports.format = logFormat;
