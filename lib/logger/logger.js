let st = require('./stack');
let ft = require('./format');

/**
 * 打印测试信息
 */

 /**/
function debug () {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "DEBUG")
}

/**
 * 打印正常信息
 */
function info (params) {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "INFO")
}

/**
 * 打印警告信息
 */
function warn (params) {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "WARN")
}

/**
 * 打印报错信息
 */
function error (params) {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "ERROR")
}

/**
 * 打印致命错误信息
 */
function fatal (params) {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "FATAL")
}

function someHandle (args, stack, type) {
  stack['type'] = type;
  stack['content'] = args;
  print(ft.format(stack))
}

function print (data) {
  if (data !== 'HIDE')
  console.log(data['color'], data['content']);
}

exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.error = error;
exports.fatal = fatal;
