let st = require('./stack');
let ft = require('./format');

function debug () {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "DEBUG")
}

function info (params) {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "INFO")
}

function warn (params) {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "WARN")
}

function error (params) {
  let args = Array.from(arguments);
  let stack = st.stack();
  someHandle(args, stack, "ERROR")
}


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
