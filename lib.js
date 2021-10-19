// 枚举字体颜色
const colorMap = {
	black:30,	red:31,		green:32,		yellow:33,
	blue:34,	purple:35,	darkGreen:36,	white:37
}

// 枚举背景颜色
const bgColorMap = {
	black:40,	red:41,		green:42,		yellow:43,
	blue:44,	purple:45,	darkGreen:46,	white:47, 	transparent:''
}

// 设置默认颜色
let bgColor = 'transparent'
let textColor = 'black'

// 主题配色方案注册  0标题背景颜色  1标题文字颜色 2内容背景颜色 3内容文字颜色
const themes = {
	success : ['green','white','transparent','green'],
	error : ['red','white','transparent','red']
}


// 主功能函数
let print = function (s,ln,ti){
	
	// 非字符串转化成json展示
	typeof s != 'string' && (s = JSON.stringify(s))
	
	// 添加时间显示
	let time = new Date()
	time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
	!ti && (s =  time + '→ ' + s)
	
	// 常量准备
	const prefix = '\033['
	const suffix = 'm'
	const bgcor = bgColorMap[bgColor]
	const txtcor = colorMap[textColor]
	
	// 定制格式化字符串模型
	const txtModel = prefix + bgcor + ';' + txtcor + suffix
	const formatText = txtModel + s + (ln ? '' : '\n')
	
	// 模型输出到控制台
	process.stdout.write(formatText)
}

// 设置前景色
print.setTextColor = function(color){
	colorMap[color] 
		? textColor = color 
		: process.stdout.write('无此颜色，颜色设置失败！！！\n')	
}

// 设置背景色
print.setBgColor = function(color){
	bgColorMap[color] 
		? bgColor = color 
		: process.stdout.write('无此颜色，颜色设置失败！！！\n')
}

// 清除设置样式回到默认设置
print.clear = function(){
	bgColor = 'transparent'
	textColor = 'black'
}

// 在圈内显示 第二个参数可以指定圈的样式
print.hl = function(txt,style){
	let num = 50
	let colorLs = Object.keys(colorMap)
	let color = _randItem(['green','darkGreen','purple'])
	let oldColor = textColor
	let chars = [['︿','﹀'],['＿','￣'],['︵','︶'],['︹','︺'],['︻','︼'],['︽','︾'],['︷','︸'],['﹁','﹂']]
	let char = _randItem(chars)
	style && Number(style) && (char = chars[+style])
	
	print.setTextColor(color)
	print(Array(num).fill(char[0]).join(""),0,1)
	print.setTextColor(oldColor)
	print(txt)
	print.setTextColor(color)
	print(Array(num).fill(char[1]).join(""),0,1)
	print.setTextColor(oldColor)
}

// 主题挂载  可通过" print.主题 "调用，参数为(title,text)，例： print.success('成功',‘项目编译成功’)
Object.keys(themes).map(v=>{
	print[v] = function(title,text){
		if(!title || !text) return print.error('print.主题(title,text) 语句使用错误','两个参数必须填写')
		_theme(title,text,themes[v])
	}
})

// 颜色字体挂载  可通过" print.颜色 "调用，参数为(text)，例： print.green('成功',‘项目编译成功’)
Object.keys(colorMap).map(v=>{
	print[v] = function(text){
		let oldColor = textColor
		print.setTextColor(v)
		print(text)
		textColor = oldColor
	}
})


// 输出主题样式到控制台
function _theme(title,text,colorArr){
	let oldBgColor = bgColor
	let oldColor = textColor
	bgColor = colorArr[0]
	textColor = colorArr[1]
	print(' '+title+' ',1)
	bgColor = colorArr[2]
	textColor = colorArr[3]
	print(' '+text,0,1)
	bgColor = oldBgColor
	textColor = oldColor
}

// 获取数组随机项
function _randItem(arr){
	return arr[Math.floor((Math.random()*arr.length))]
}

// 挂载全局变量
global.print = print
