let sts = require('./settings')

const CONTENTS = ['_TIME', '_METHOD','_FILE', '_LINE', '_TYPE', '_CONTENT'];

function consoleLogFormat (data) {
	let style = sts.getFormat(data['type']);
	if (data['type'] === 'DEBUG' && !sts.logDebug()) {
		return "HIDE";
	}
  for (let i of CONTENTS) {
		let value = i.replace("_","");
		if (value === 'CONTENT') {
			data[value] = toString(data[value.toLowerCase()]);
		}else{
			data[value] = data[value.toLowerCase()];
		}
    style = style.replace(i, data[value]);
  }
	let reg = new RegExp(',','g');
	let content = style.replace(reg, ' ');
	let color = sts.getColor(data['type']);
	let contentWithColor = {color, content}
  return contentWithColor;
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

exports.format = consoleLogFormat;
