# node-petl
## 项目介绍
1. 描述
自定义的开发工具包

  2. 功能
  * 日志功能

## 如何使用
### log 工具使用
  1.引入工具包

  `let petl = require ('./node-petl/index');`

  2.声明工具对象

  `let log = petl.log;`

  3.使用

  ```
  log.debug('debug');
  log.info('info');
  log.warn('warn');
  log.error('error');
  log.fatal('fatal');

  ```

  4.配置文件
  