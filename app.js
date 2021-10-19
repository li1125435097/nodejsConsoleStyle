require('./lib')

// 全局设置文字颜色
print.setTextColor('red')
print('这是红色')

// 按主题输出
print.success('成功','456465465')
print.error('失败','slkdjf')

// 直接输出你想显示的颜色
print.blue('收到了饭；克里斯朵夫')
print('这是红色')

// 清除全局设置颜色
print.clear()
print({name:123})

// 高亮加圈输出，可以指导第二个参数为固定样式
print.hl('wosdhfkjjsdlkfjdslkfjskldjfksdj')
print.hl('wosdhfkjjsdlkfjdslkfjskldjfksdj',4)
