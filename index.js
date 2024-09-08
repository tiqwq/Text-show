//import * as STYLE from "zosLoader:./index.[pf].layout.js"
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import *as hmUI from "@zos/ui";
import { Battery } from '@zos/sensor'
import { Weather } from '@zos/sensor'
/* Page({
  data: {
    textContent:  [
      "我可能忘了年少的样子，但我始终记得那个夏天，周围人的喧闹和放肆招摇的风。",
      "山高自有客行路，水深自有渡船人。",
      "滚滚长江东逝水，物换星移多少秋。",
      "走过百年泥泞坎坷，才迎而今光风霁月。"
    ],
    currentIndex: 0
  },
  build() {
    
    //-----------------------------------------------
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // 月份从0开始，所以需要加1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
   

    const dateString = `${formatNumber(month)}月${formatNumber(day)}日`;
    const timeString = `${formatNumber(hours)}时${formatNumber(minutes)}分`;
    //----------------------------------------------

    let content = `Elegance Time 1.0[BETA]\nET Zepp OS:/data/${nickName}\ntime:${timeString}\ndate:${dateString}\nwhat can i say:${this.data.textContent[this.data.currentIndex]}\n ......`;
    let new_content = "";
    let i = 0;

    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 90,
      y: 80,
      w: 300,
      h: 300,
      color: 0xffffff,
      text_size: 20,
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      text: '',
    });

    // Function to start or restart the animation
    const startAnimation = () => {
      clearInterval(animationInterval); // Clear previous animation
      new_content = "";
      i = 0;
      animationInterval = setInterval(() => {
        if (i < content.length) {
          new_content += content[i];
          text.setProperty(hmUI.prop.MORE, {
            text: new_content,
          });
          i++;
        } else {
          clearInterval(animationInterval); // Stop animation when finished
        }
      }, 50);
    };

    let animationInterval = setInterval(() => {
      if (i < content.length) {
        new_content += content[i];
        text.setProperty(hmUI.prop.MORE, {
          text: new_content,
        });
        i++;
      } else {
        clearInterval(animationInterval); // Stop animation when finished
      }
    }, 50);

    // Handle click event to update text
    text.addEventListener(event.CLICK_DOWN, (info) => {
      this.data.currentIndex = (this.data.currentIndex + 1) % this.data.textContent.length;
      content = `Elegance Time 1.0[BETA]\nET Zepp OS:/data/${nickName}\ntime:${timeString}\ndate:${dateString}\nwhat can i say:${this.data.textContent[this.data.currentIndex]}\n ......`; // Update content with new text
      startAnimation(); // Restart animation with new content
    });
  }
}); */
Page({
  data: {
    textContent: [
      "我可能忘了年少的样子，但我始终记得那个夏天，周围人的喧闹和放肆招摇的风。",
      "晚风拂过山岗，撞到盛满回忆的夕阳瓶，溢出映满了天。",
      "穿梭时间的钟从反方向开始移动，我依稀记得那年那月那天。",
    
      "远航归来，总有辉煌的灯火，在黑夜中等待。",
      "若无生生不息的根与魂，何以在波涛汹涌的文化激荡中留存。",
      "不知则问，不能则学，莫隐己瑕，莫尊己短。",
      "山高自有客行路，水深自有渡船人。",
      "滚滚长江东逝水，物换星移多少秋。",
      "走过百年泥泞坎坷，才迎而今光风霁月。"
    ],
    currentIndex: 0
  },

  build() {
    AppWidget({
      state: {
        text: 'Hello Zepp OS'
      }
      })
     
    // 获取当前日期和时间
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // 月份从0开始
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const battery = new Battery()
    const current = battery.getCurrent()
   //-------------------- 
    const callback = () => {
      console.log(battery.getCurrent())
    }
    
    battery.onChange(callback)
    
    // When not needed for use
    battery.offChange(callback)
    const weather = new Weather()
const { forecastData,  cityName } = weather.getForecast()

console.log(cityName)


    // 将数字格式化为中文数字
    const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const formatNumber = (num) => {
      if (num < 10) {
        return chineseNumbers[num];
      } else if (num < 20) {
        return `十${num % 10 === 0 ? '' : chineseNumbers[num % 10]}`;
      } else {
        return `${chineseNumbers[Math.floor(num / 10)]}十${num % 10 === 0 ? '' : chineseNumbers[num % 10]}`;
      }
    };

    const dateString = `${formatNumber(month)}月${formatNumber(day)}日`;
    const timeString = `${formatNumber(hours)}时${formatNumber(minutes)}分`;

    // 初始化内容
    let content = `Elegance Time 1.0[BETA]\nET Zepp OS:/data/${nickName}\nbattery:${battery.getCurrent()}%\ncityName:${cityName}\ntime:${timeString}\ndate:${dateString}\nIn a word:${this.data.textContent[this.data.currentIndex]}\n ......`;
    let new_content = "";
    let i = 0;

    // 创建文本控件
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 90,
      y: 80,
      w: 300,
      h: 300,
      color: 0xffffff,
      text_size: 20,
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      text: '',
    });

    // 开始或重启动画的函数
    const startAnimation = () => {
      clearInterval(animationInterval); // 清除之前的动画
      new_content = "";
      i = 0;
      animationInterval = setInterval(() => {
        if (i < content.length) {
          new_content += content[i];
          text.setProperty(hmUI.prop.MORE, {
            text: new_content,
          });
          i++;
        } else {
          clearInterval(animationInterval); // 动画完成后停止
        }
      }, 50);
    };

    // 启动初始动画
    let animationInterval = setInterval(() => {
      if (i < content.length) {
        new_content += content[i];
        text.setProperty(hmUI.prop.MORE, {
          text: new_content,
        });
        i++;
      } else {
        clearInterval(animationInterval); // 动画完成后停止
      }
    }, 50);

    // 处理点击事件以更新文本
    text.addEventListener(event.CLICK_DOWN, () => {
      this.data.currentIndex = (this.data.currentIndex + 1) % this.data.textContent.length;
      content = `Elegance Time 1.0[BETA]\nET Zepp OS:/data/${nickName}\nbattery:${battery.getCurrent()}%\ncityName:${cityName}\ntime:${timeString}\ndate:${dateString}\nIn a word:${this.data.textContent[this.data.currentIndex]}\n ......`;
      startAnimation(); // 用新内容重启动画
    });
  }
});


 