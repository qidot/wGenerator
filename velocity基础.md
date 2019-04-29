### Velocity基本语法

> 虞城码农

```
1.Velocity是一个基于java的模板引擎（template engine）
2.http://velocity.apache.org/
```



#### 1.命令符与保留字

| 符号   | 说明                         | 常用                                                         |
| ------ | ---------------------------- | ------------------------------------------------------------ |
| #      | 指令前缀                     | #set 设置变量<br>#if 、#else、#end 条件语句<br>#foreach、#end 循环语句<br>#include、#parse、包含语句<br>#macro 宏 |
| $   $! | 变量识别符                   | $var $!var  $TagUtil.options(...)                            |
| {}     | 框死变量的范围               | $var 等于 ${var}<br>$varname 不等于 ${var}name 这2个识别的作用域不同 |
| !      | 强制把不存在的变量显示为空白 | 如: 变量var不存在<br>$var 输出 字符 $var 注意是字符,不是变量值哦<br>$!var 输出 空字符 |

> 通过这几个基本命令，可以快速的了解语法了。



#### 2.常用语句

　　 ##### 2.1 $!{obj} 　直接返回对象结果。

   ```html
<!--在html标签中显示java对象msg的值-->
<p>$!msg</p>
<!--在html标签中显示经过HtmlUtil对象处理过后的msg对象的值-->
<p>$!HtmlUtil.doSomething($!msg)</p>
   ```

　　



##### 2.2 #if($!obj) #else #end 判断语句

```velocity
#**如：在EasyJWeb各种开源应用中，我们经常看到的用于弹出提示信息msg的例子。**#
#if($msg)
<script>
	alert('$!msg');
</script>
#end
#**上面的脚本表示当对象msg对象存在时，输出<script>等后面的内容。**#

```



##### 2.3 #foreach( $info in $list) $info.someList #end 循环语句

```velocity
#foreach( $info in $hotList1)
$!info.title<br>
#end
#**上面的脚本表示循环遍历hotList1集合中的对象，并输出对象的相关内容。**#
```



##### 2.4 包含文件#inclue("模板文件名")或#parse("模板文件名")

```velocity
#**主要用于处理具有相同内容的页面，比如每个网站的顶部或尾部内容。**#
## 使用方法
如：#parse("/blog/top.html")或#include("/blog/top.html")

```

> parse与include的区别在于，
> 若包含的文件中有Velocity脚本标签，将会进一步解析，而include将原样显示



##### 2.5 #set 设置变量

```velocity
##有时候我们需要在页面中显示序号，而程序对象中又没有包含这个序号属性同，可以自己定义。
##如在一个循环体系中，如下所示：
#set ($i=0)
#foreach($info in $list)
序号:$i
#set($i=$i+1)
#end
```
> 在万不得已的时候，不要在页面视图自己声明Velocity脚本变量，也就是尽量少使用#set
>
> #set左边可以是以下的内容
> Variable reference
> String literal
> Property reference
> Method reference
> Number literal #set ($i=1)
> ArrayList #set ($arr=["yt1","t2"])



##### 2.6 注释

```velocity
单行
## XXX
多行
#* 
	xxx
　xxxx
　xxxxxxxxxxxx
*#
```





#### 3.规则与约定

##### 3.1 变量的定义

```velocity
以 "$" 开头，第一个字符必须为字母。character followed by a VTL Identifier. (a .. z or A .. Z).
变量可以包含的字符有以下内容：
alphabetic (a .. z, A .. Z)
numeric (0 .. 9)
hyphen ("-")
underscore ("_")
```



##### 3.2 调用

```velocity
$Identifier.Identifier
##取一个对象的属性
$user.name
##取一个map的value
$userMap.get("key")

##取一个方法
object user.getName() = $user.getName()
```



##### 3.3 逻辑符== && || !=

```velocity
#if( "$var" == "")
#end
##我一般这么用作判断
```



##### 3.4 循环对应几种集合

```velocity
##包含下面三种Vector, a Hashtable or an Array
##1.数组类型
#foreach( $product in $allProducts )
<li>$product</li>
#end

##2.map集合类型
#foreach( $key in $allProducts.keySet() )
　　 <li>Key: $key -> Value: $allProducts.get($key)</li>
#end

##3.List<Object>类型
#foreach( $customer in $customerList )
　　 <tr><td>$velocityCount</td><td>$customer.Name</td></tr>
#end

##4.也可以这样
#foreach( $foo in [1..5] )
#end
```

> velocityCount变量在配置文件中定义的计数器,从1开始



#### 4.特别注意

##### 4.1 变量范围

```velocity
##用{}把变量名跟字符串分开

如
	#set ($user="wGenerator"}
	${user}name
输出: wGeneratorname

$username
$!username
$与$!的区别
当找不到username的时候，$username返回字符串"$username"，而$!username返回空字符串""

```



##### 4.2 双引号 与 引号

```velocity
#set ($var="helo")
test"$var" 返回 testhello
test'$var' 返回 test'$var'
可以通过设置 stringliterals.interpolate=false 改变默认处理方式

```



　　



