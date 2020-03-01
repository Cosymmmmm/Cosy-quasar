import Vue from 'vue';
/*
 * 判断设备类型
 */
function whichdevice() {
  const device = {};
  const ua = navigator.userAgent;
  const android = ua.match(/(Android);?[\s/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

  device.ios = false;
  device.android = false;
  device.iphone = false;
  device.ipad = false;
  device.androidChrome = false;

  // Android
  if (android) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua
        .toLowerCase()
        .split('version/')[1]
        .split(' ')[0];
    }
  }

  // Webview
  device.webView =
    (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
  // keng..
  device.isWeixin = /MicroMessenger/i.test(ua);
  return device;
}

/**
 * 返回APP
 */
Vue.prototype.backToApp = function backToApp() {
  try {
    const device = whichdevice();
    if (window.webview || window.webkit) {
      if (device.android) {
        window.webview.closeCurrentInterface();
      } else if (device.ios) {
        window.webkit.messageHandlers.closeCurrentInterface.postMessage(1);
      } else {
        console.error('非ios或Android设备');
      }
    } else {
      console.error('webview方法未注册');
    }
  } catch (e) {
    console.error('无法调设备back方法');
  }
};

/**
 * 设置APP TITLE
 * @param title
 */
Vue.prototype.setAppTitle = function setAppTitle(title) {
  try {
    const device = whichdevice();
    if (device.android) {
      window.webview.setAppTitle(title);
    } else if (device.ios) {
      window.webkit.messageHandlers.setAppTitle.postMessage(title);
    } else {
      console.error('非ios或Android设备');
    }
  } catch (e) {
    console.error('无法调用APP-setAppTitle方法');
  }
};

/**
 * 注册右上角事件
 */
Vue.prototype.registerRightBtn = function registerRightBtn({ text, icon, method }) {
  try {
    const device = whichdevice();
    if (device.android) {
      window.webview.registRightCornerBtnEvent(JSON.stringify({ text, icon, method }));
    } else if (device.ios) {
      window.webkit.messageHandlers.registRightCornerBtnEvent.postMessage({ text, icon, method });
    } else {
      console.error('非ios或Android设备');
    }
  } catch (e) {
    console.error('无法调用APP-registRightCornerBtnEvent方法');
  }
};

/**
 * 弹出金币
 * @param coinsNum 金币数量
 */
Vue.prototype.toastCoin = function toastCoin(coinsNum) {
  try {
    const device = whichdevice();
    if (device.android) {
      window.webview.toastCoin(coinsNum);
    } else if (device.ios) {
      window.webkit.messageHandlers.toastCoin.postMessage(coinsNum);
    } else {
      console.error('非ios或Android设备');
    }
  } catch (e) {
    console.error('无法调用APP-toastCoin方法');
  }
};
