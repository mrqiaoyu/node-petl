let sts = require('./settings');
let path = require('path');
let fs = require('fs');
let files_data = [];

function creatLogFile (dirpath, mode) {
  try {
		if (!fs.existsSync(dirpath)) {
			let pathtmp;
			dirpath.split(/[/\\]/).forEach(function (dirname) {
				if (pathtmp) {
					pathtmp = path.join(pathtmp, dirname);
				}
				else {
					pathtmp = dirname;
				}
				if (!fs.existsSync(pathtmp)) {
					if (!fs.mkdirSync(pathtmp, mode)) {
						return false;
					}
				}
			});
		}
		return true;
	} catch (e) {
    console.log(e)
		return false;
	}
}

function deleteLogFile (folder) {
  let days = sts.getLogDays();
  let time = (new Date())/1000 - (days * 24 * 3600);
  console.log(time)
  fs.readdir(folder,(err,files)=>{
		if(err) return;
    files.forEach((file)=>{
      var filedir = path.join(folder,file);
      fs.stat(filedir, (eror,stats)=>{
        if(eror) return;
        if (time > stats['birthtimeMs']/1000){
          try{
            fs.unlinkSync(filedir);
          }catch(e){}
        }
      });
    });
  });
}

function writeLogFile (type, data) {
  let postion = sts.getLogPostion(type);
  let filename = path.basename(postion)
  let dir = path.dirname(postion);

  if( !fs.existsSync(postion) ){
    deleteLogFile(dir);
    creatLogFile(dir);
  }
  fs.appendFile(postion, data + ' \n', function(err){});
}

exports.write = writeLogFile;
