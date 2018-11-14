let sts = require('./settings');
let lf = require('./log_file');

const CONTENTS = ['_TIME', '_METHOD','_FILE', '_LINE', '_TYPE', '_CONTENT'];

function consoleLogFormat (data) {
	logFile(data);
	if (!filter(data)) {
		return "HIDE";
	}
	let style = sts.getFormat(data['type']);

  for (let i of CONTENTS) {
		let value = i.replace("_","");
		if (value === 'CONTENT') {
			data[value] = toString(data[value.toLowerCase()]);
		}else{
			data[value] = data[value.toLowerCase()];
		}
		if (value === 'TIME') {
			data[value] = sts.getTime();
		}
    style = style.replace(i, data[value]);
  }
	let reg = new RegExp(',','g');
	// let content = style.replace(reg, ' ');
	let content = style;
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

function filter (data) {
	let f = sts.logFilter();
	let types = f['type'];
	let methods = f['method'];
	let contents = f['content'];
	if (data['type'] === 'DEBUG' && !sts.logDebug()) {
		return false;
	}

	if (types) return matchMethodAndType(types, data['type']);
	if (contents) return matchContent(contents, data['content']);
	if (methods) return matchMethodAndType(methods, data['method']);



	return true;
}

function matchMethodAndType (params, value) {
	let hides = [];
	let onlyShow = [];
	params = params.split(' ');
	for (p of params) {
		if (p.match('-(.*?)')) {
			if (p.length > 0)
			hides.push(p.substring(1))
		} else {
			if (p.length > 0)
			onlyShow.push(p)
		}
	}
	if (onlyShow.length > 0) {
		if (onlyShow.indexOf(value) >= 0) {
			return true;
		}else{
			return false;
		}
	}
	if (hides.length > 0) {
		if (hides.indexOf(value) >= 0) {
			return false;
		}
	}
	return true;
}

function matchContent (params, value) {
	let hides = [];
	let onlyShow = [];
	params = params.split(' ');
	for (p of params) {
		if (p.match('-(.*?)')) {
			if (p.length > 0)
			hides.push(p.substring(1))
		} else {
			if (p.length > 0)
			onlyShow.push(p)
		}
	}

	value = toString(value)
	if (onlyShow.length > 0) {
		for (let show of onlyShow) {
			if (value.match(show)) {
				return true;
			}
		}
		return false;
	}
	if (hides.length > 0) {
		for (let hide of hides) {
			if (value.match(hide)) {
				return false;
			}
		}
	}
	return true;
}

function logFile (data) {
	let style = sts.getFormat(data['type'], 'file');

  for (let i of CONTENTS) {
		let value = i.replace("_","");
		if (value === 'CONTENT') {
			data[value] = toString(data[value.toLowerCase()]);
		}else{
			data[value] = data[value.toLowerCase()];
		}
		if (value === 'TIME') {
			data[value] = sts.getTime();
		}
    style = style.replace(i, data[value]);
  }
	let reg = new RegExp(',','g');
  lf.write(data['type'], style); 
}
exports.format = consoleLogFormat;
