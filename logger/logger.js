let ft = require('./format');

function debug () {
  let args = Array.from(arguments);
  let stack = ft.stack();
  stack['TYPE'] = "DEBUG";
  stack['CONTENT'] = args;
  let a = ft.format(stack);
  // console.log(params, stack['method'])
  print(a)
}

function info (params) {
  console.log(params)
}

function warn (params) {
  console.log(params)
}

function error (params) {
  console.log(params)
}


function fatal (params) {
  console.log(params)
}

function format () {

}

function print (content) {
  console.log(content);
}


exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.error = error;
exports.fatal = fatal;
