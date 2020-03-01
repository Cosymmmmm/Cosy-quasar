import moment from "moment";

/**
 * 获取某个月最后一天
 * @param year
 * @param month
 * @returns {number}
 */
export const getMonthLast = function(year, month) {
  let nextMonth = ++month;
  let nextMonthFirstDay = new Date(year, nextMonth, 1);
  let oneDay = 1000 * 60 * 60 * 24;
  return new Date(nextMonthFirstDay - oneDay).getDate();
};

export const getPrevDate = function() {
  let now = new Date();
  now.setDate(0);
  return now;
};

(() => {
  /**
   * 格式化时间戳函数
   * @param fmt 转换模式
   * @return 转换后的时间字符串
   *
   *
   * Test1:
   * var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
   *
   * Expect1:
   * "2018-01-16 13:29:00"
   *
   *
   *
   *
   * Test2:
   * var time2 = new Date().format("yyyyMMddhhmmss");
   *
   * Expect2:
   * "20180116132849"
   *
   *
   */
  Date.prototype.formatTime = function(fmt) {
    let o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  };
})();

/**
 * 计算当前月份第一天是星期几
 * @param dateStr
 * @returns {number}
 */
export const getWeekday = function(dateStr) {
  let date = new Date(dateStr);
  return date.getDay();
};

export const typeOf = function(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  };
  return map[toString.call(obj)];
};

/**
 * 深拷贝函数
 * @param target {object} 需要拷贝的目标对象
 * @returns {object} 拷贝完成的新对象
 */
export const deepCopy = function(target) {
  const flag = typeOf(target);
  let copy;
  if (flag === "array") {
    copy = [];
    for (var i = 0, len = target.length; i < len; i++) {
      copy.push(deepCopy(target[i]));
    }
  } else if (flag === "object") {
    copy = {};
    for (var k in target) {
      copy[k] = deepCopy(target[k]);
    }
  } else {
    copy = target;
  }
  return copy;
};
export const imgToBase64 = function(files) {
  let fileList = [];
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let reader = new FileReader();
    //let AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
    let imgUrlBase64;
    if (file) {
      //将文件以Data URL形式读入页面
      imgUrlBase64 = reader.readAsDataURL(file);
      reader.onload = function(e) {
        //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
        /*if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
          console.log( '上传失败，请上传不大于2M的图片！');
          return;
        }else{*/
        //执行上传操作
        fileList.push(reader.result);
        //}
      };
    }
  }
  return fileList;
};
export const getUrlKey = function(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
};

export function hex_md5(sMessage) {
  function RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    } else return lResult ^ lX8 ^ lY8;
  }
  function F(x, y, z) {
    return (x & y) | (~x & z);
  }
  function G(x, y, z) {
    return (x & z) | (y & ~z);
  }
  function H(x, y, z) {
    return x ^ y ^ z;
  }
  function I(x, y, z) {
    return y ^ (x | ~z);
  }
  function FF(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function GG(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function HH(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function II(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }
  function ConvertToWordArray(sMessage) {
    var lWordCount;
    var lMessageLength = sMessage.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 =
      (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] =
        lWordArray[lWordCount] |
        (sMessage.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function WordToHex(lValue) {
    var WordToHexValue = "",
      WordToHexValue_temp = "",
      lByte,
      lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue =
        WordToHexValue +
        WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;
  // Steps 1 and 2. Append padding bits and length and convert to words
  x = ConvertToWordArray(sMessage);
  // Step 3. Initialise
  a = 0x67452301;
  b = 0xefcdab89;
  c = 0x98badcfe;
  d = 0x10325476;
  // Step 4. Process the message in 16-word blocks
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
    a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }
  // Step 5. Output the 128 bit digest
  var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
  return temp.toLowerCase();
}

/**
 * 转义输入
 * @param str           { String }      需要净化的字符串
 * @param cleanHtml     { Boolean }     是否需要转义 HTML 字符
 * @param cleanSQL      { Boolean }     是否需要转移 SQL 关键字符
 */
export function cleanInput(str, cleanHtml = true, cleanSQL = true) {
  if (typeOf(str) !== "string") return str;
  const SQL = /('|"|%)/g;
  // 转义 SQL 注入
  if (cleanSQL) str = str.replace(SQL, "\\$1");
  return str;
}

/**
 * 获取网页地址栏url的参数
 * @param name {string} url的key
 * @returns {string}
 */
export function getUrlParam(name) {
  const queryStr = String(window.location).split('?')[1] || ''
  name = encodeURIComponent(name)
  let arr = new RegExp("(^|&)" + name + "=([^&]*)(&|$)").exec(queryStr);
  if(arr){
    return RegExp.$2;
  }else{
    return '';
  }
}

// 常量值
let t = {
  year: "y",
  month: "M",
  quarter: "q",
  week: "w",
  day: "d",
  hour: "h",
  minute: "m",
  second: "ms"
};

let weeksList = getWeeksList();
/**
 * 获取日期范围
 * @return {Object} 返回日期范围对象
 */
function getShopRecordTimeObj({ endTime, type = "day", num = 6 }) {
  let end = endTime ? moment(endTime) : moment();
  let start = endTime ? moment(endTime) : moment();
  end = end.endOf(type);
  start = start.startOf(type).subtract(num, t[type]);

  return {
    startTime: start.format("YYYY-MM-DD"),
    endTime: end.format("YYYY-MM-DD")
  };
}

// 获取周范围
function getWeekObj({ endTime, num = 6 }) {
  let end = endTime ? endTime : getWeek().num;
  let start = endTime ? endTime : getWeek().num;

  start = end - num;

  return {
    startTime: start <= 0 ? 1 : start,
    endTime: end
  };
}

// 获取季度
function getQuarter(year) {
  let now = year || moment().format("YYYY");

  return {
    startTime: now + "-01-01",
    endTime: now + "-12-31"
  };
}

/**
 * 使用闭包缓存上次结果用作下次计算
 * @param
 * @return
 */
function getShopRecordTimeByPageFunc() {
  // 存储上次日期范围中的开始日期
  let last = null;

  return {
    getShopRecordTimeByPage: function({
      page = 1,
      pageSize = 7,
      type = "day",
      endTime
    }) {
      if (page == 1) {
        last = endTime || null;
      }

      let time = {};
      if (type == "week") {
        time = getWeekObj({ endTime: last, num: pageSize - 1 });
        last = time.startTime - 1;
        //将周次转化为周的开始和结束时间格式
        time = {
          startTime: moment(getWeek(time.startTime).start).format("YYYY-MM-DD"),
          endTime: moment(getWeek(time.endTime).end).format("YYYY-MM-DD")
        };
      } else if (type == "quarter") {
        time = getQuarter(last);
      } else {
        time = getShopRecordTimeObj({ endTime: last, type, num: pageSize - 1 });
        last = moment(time.startTime)
          .subtract(1, t[type])
          .format("YYYY-MM-DD");
      }

      return time;
    },
    setLast: function(value) {
      last = value;
    }
  };
}

// 获取一年有多少周
function getWeeksList(year = moment().format("YYYY")) {
  const ONE_DAY = 24 * 3600 * 1000; // 一天的时间
  let weeks = [];
  let start = new Date(year, 0, 1); // 一年的开始
  let end = new Date(year, 11, 31); // 一年的结束
  let firstDay = start.getDay() || 7; // 一年第一天是周几
  let lastDay = end.getDay() || 7; // 一年最后一天是周几
  let startTime = +start; // 第一周的开始
  let endTime = startTime + (7 - firstDay) * ONE_DAY; // 第一周的结束
  let _endTime = end - (7 - lastDay) * ONE_DAY; // 最后一周的结束

  // 记录第一周
  weeks.push({
    start: startTime,
    end: endTime
  });

  // 循环计算
  while (endTime < _endTime) {
    startTime = endTime + ONE_DAY;
    endTime = endTime + 7 * ONE_DAY;
    weeks.push({
      start: startTime,
      end: endTime
    });
  }

  return weeks;
}

//获取第几周的开始和结束时间
function getWeek(num) {
  if (num) {
    return weeksList[num - 1];
  } else {
    let current = +moment(moment().format("YYYY-MM-DD"));
    for (let i = 0; i < weeksList.length; i++) {
      let r = weeksList[i];
      if (r.start <= current && current <= r.end) {
        return { ...r, num: i + 1 };
      }
    }
  }
}

// 固定长度不足往前补0
function prefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

/**
 * 求10的对数
 * @param
 * @return
 */
function log10(n) {
  return Math.log(n) / Math.log(10);
}

/**
 * 判断是否是正整数
 * @param
 * @return
 */
function isInteger(num) {
  return Math.round(num) === num; //是整数，则返回true，否则返回false
}

/**
 * 刻度计算
 * @param
 * @return
 */
function calcAxisScale(min = 0, max = 0, splitNum = 5) {
  // 根据传入的数据计算出步进值，然后取log10的对数，如果不为正整数则扩大一个数量级
  let step = (max - min) / splitNum;
  let temp = log10(step);
  if (!isInteger(temp)) {
    temp += 1;
  }

  // 得到新的指数后，进行还原步进值
  temp = Math.pow(10, parseInt(temp));

  // 获取步进比例
  let newStep = step / temp;

  // 将步进比例约束在0.1, 0.2, 0.25, 0.5, 1这几个划分值
  if (newStep >= 0 && newStep <= 0.1) {
    newStep = 0.1;
  } else if (newStep > 0.1 && newStep <= 0.2) {
    newStep = 0.2;
  } else if (newStep > 0.2 && newStep <= 0.25) {
    newStep = 0.25;
  } else if (newStep > 0.25 && newStep <= 0.5) {
    newStep = 0.5;
  } else {
    newStep = 1;
  }

  // 计算最后步进值，然后对数据进行计算
  let finalStep = newStep * temp;
  let newMax = splitNum * finalStep;
  let newMin = min;

  return {
    max: newMax,
    min: newMin,
    interval: finalStep,
    splitNum
  };
}

/**
 * 将数字格式化为货币形式
 * @param
 *    num: 格式化的数字
 *    places： 小数点的的位数 默认为2
 *    symbol： 格式化后前缀符号 默认$
 *    thousand：分隔符号 默认,
 *    decimal: 小数分隔符号 默认.
 * @return
 */
function formatMoney(num, places, symbol, thousand, decimal) {
  places = !isNaN((places = Math.abs(places))) ? places : 2;
  symbol = symbol !== undefined ? symbol : "$";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var number = num || 0,
    negative = number < 0 ? "-" : "",
    i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
    (places
      ? decimal +
        Math.abs(number - i)
          .toFixed(places)
          .slice(2)
      : "")
  );
}

/**
 * 格式化坐标轴标签为货币形式显示
 * @param
 * @return
 */
function formatAxisLabel(value, num = 2) {
  let str = formatMoney(value, 2, "");
  let regexp = /(?:\.0*|(\.\d+?)0+)$/;
  str = str.replace(regexp, "$1");
  return str;
}

/**
 * 数字转周
 */
function formatNumToCn(value = 1) {
  let cnList = ['一', '二', '三', '四', '五', '六', '日',];
  return `周${cnList[Number(value) - 1]}`;
}

/**
 * 数字转月
 */
function formatQuarteToCn(value = 1) {
  let cnList = ['上旬', '中旬', '下旬'];
  return cnList[Number(value)];
}
/**
 * 格式化日期
 * @param date : 日期值, [Date]或者[long]
 * @param mode 模式：
 * 		默认值 0或null,返回格式：yyyy-MM-dd HH:mm:ss
 * 		1		返回格式：yyyy-MM-dd
 * 		2		返回格式：HH:mm:ss
 * */
function formatDateTime(date, mode) {
  var _type = typeof date;
  if(_type == "object"){
    return formatDate0(date);
  }else if(_type == "number"){
    return formatDate1(date);
  }

  function formatDate0(date){
    function _ten(i){
      return i < 10 ? "0" + i  : "" + i;
    }

    var s1 = date.getFullYear() + "-" + _ten((date.getMonth() + 1)) + "-" + _ten(date.getDate());
    var s2 = _ten(date.getHours()) + ":" + _ten(date.getMinutes()) + ":" + _ten(date.getSeconds());

    if(mode == 1){
      return s1;
    }else if(mode == 2){
      return s2;
    }else{
      return s1 + " " + s2;
    }
  }
  function formatDate1(time){
    var d = new Date();
    d.setTime(time);
    return formatDate0(d);
  }
};

export {
  getShopRecordTimeObj,
  getShopRecordTimeByPageFunc,
  calcAxisScale,
  formatMoney,
  formatAxisLabel,
  isInteger,
  getWeeksList,
  prefixInteger,
  weeksList,
  formatNumToCn,
  formatQuarteToCn,
  formatDateTime
};
