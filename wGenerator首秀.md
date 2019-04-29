###  wGenerator首秀
虞城码农



#### 由来

> 以前一直用window系列的操作系统,有不少可以用的代码生成工具,如:动软的代码生成器(.net)，可以自定义模板，然后按需生成代码。后来用mac系统，发现好像没有什么太好用的生成工具，所以自己写个吧！！！
>
> 我始终认为，工具就是工具，还没有达到可以替代人脑编程的地步，工具只是一个加速器，还是需要自己修剪枝蔓，才能打造好的代码!
>
> 这就是wGenerator的由来！！之所以叫wGenerator，是取了我姓的首字母。



#### 特点

**小巧灵活**——您可以随心所欲的编写模板,模板语法简单,然后去生成！

**随心而为**——完全根据项目与个人喜好，自由发挥！

**解放时间**——不必再手工敲一些固有的代码,如:entity之类的,节省下来的时间，去理清逻辑重点，哪怕是抽个时间画个手稿流程图，也会让你思路清晰，变成省力！



#### 缺点

无法做到一键生成解决方案,还需要去建文件,copy代码，修饰代码，工具能给你的就是加快了速度，规范了格式！



#### 数据库支持

| 序号 | 名称       | 支持 |
| ---- | ---------- | ---- |
| 1    | mysql      | Y    |
| 2    | db2        | Y    |
| 3    | sqlserver  | Y    |
| 4    | oracle     | Y    |
| 5    | sqlite     | Y    |
| 6    | postgreSql | Y    |



#### 如何使用

> 只需要3步，没错就是3步。

- Copy一个建表语句

- 选择一个模板

- 点击生成，就可以copy代码了

  

#### <a name="tplexample">模板示例</a>

以Java中的entity实体类来做展示:

```java
//$!table.comment
public class $!table.className implements Serializable{
	
	#foreach($!tc in $!columns)
	private $!tc.dlType $!tc.dlEntity; //$!tc.comment
	#end
	
	#foreach($!tc in $!columns)
	public void set$!tc.dlMethod ($!tc.dlType $!tc.dlEntity){
		this.$!tc.dlEntity = $!tc.dlEntity;
	}
	public $!tc.dlType get$!tc.dlMethod (){
		return this.$!tc.dlEntity;
	}
	#end
}
```



#### 生成后的代码

```java
//参数配置 
public class AdConfig implements Serializable{
	
	private String code; //配置编号
	private String name; //配置名称
	private String value; //值
	private String remark; //说明
		
	public void setCode (String code){
		this.code = code;
	}
	public String getCode (){
		return this.code;
	}
		public void setName (String name){
		this.name = name;
	}
	public String getName (){
		return this.name;
	}
		public void setValue (String value){
		this.value = value;
	}
	public String getValue (){
		return this.value;
	}
	public void setRemark (String remark){
		this.remark = remark;
	}
	public String getRemark (){
		return this.remark;
	}
}

```



#### 模板中的公有参数说明

| 序号   | 参数      | 名称                            | velocity中调用                              |
| ---- | ------- | ----------------------------- | ---------------------------------------- |
| 1    | table   | 表(对象)[点击查看](#tableobj)        | $!{table.tableName}                      |
| 2    | columns | 列(列表)[点击查看](#columnobj)       | \#foreach($!tc in $!columns)<br>$!tc.dlType<br>\#end |
| 3    | now     | 时间(字符串)格式:yyyy-MM-dd HH:mm:ss | $!{now}                                  |
| 4    | author  | 开发者(字符串)                      | $!{author}                               |
| 5    | dbName  | 数据库名(字符串)                     | $!{dbName}                               |



##### <a name="tableobj">table 对象包含字段说明</a>

| 序号 | 字段           | 类型         | 说明                                                         |
| ---- | -------------- | ------------ | ------------------------------------------------------------ |
| 1    | tableName      | String       | 表名称                                                       |
| 2    | autoIncrement  | Integer      | 是否自增                                                     |
| 3    | tableCollation | String       | 字符顺序                                                     |
| 4    | comment        | String       | 备注                                                         |
| 5    | className      | String       | 对应的类名称 <br>规范:首字母大写,如果表名师   aaa_bbb_cc 格式,将会被对应为:   AaaBbbCc |
| 6    | classEntity    | String       | 对应的类实体  <br>规范:首字母小写,把className组成的值,首字母小写,来对应实例化操作<br>根据上面的例子，应为: aaaBbbCc |
| 7    | columns        | List<column> | 列集合；在单个代码生成时,这个没有值                          |
| 8    | fieldMap       | Map          | 集合:<br>fieldMap.get("firstColumn");<br/>fieldMap.get("firstField");<br/>fieldMap.get("firstMethod");<br/>fieldMap.get("firstJdbcType");<br/>fieldMap.gete("firstDlType");<br/>//所有信息逗号拼接<br/>fieldMap.get("strFields");<br/>fieldMap.get("strColumns");<br/>fieldMap.get("strNames"); |



##### <a name="columnobj">column 对象包含字段说明</a>

| 序号   | 字段            | 类型               | 说明                                       |
| ---- | ------------- | ---------------- | ---------------------------------------- |
| 1    | tableName     | String           | 表名                                       |
| 2    | name          | String           | 列名                                       |
| 3    | position      | Integer          | 顺序位置                                     |
| 4    | columnDefault | String           | 默认值                                      |
| 5    | isNull        | String           | 是否为空                                     |
| 6    | comment       | String           | 备注                                       |
| 7    | dataType      | String           | 数据类型                                     |
| 8    | columnType    | String           | 字段类型                                     |
| 9    | key           | String           | 主键,外键,索引等                                |
| 10   | extra         | String           | 扩展:是否自增                                  |
| 11   | dlType        | String           | 动态语言中的类型                                 |
| 12   | dlEntity      | String           | 动态语言中的实体                                 |
| 13   | dlMethod      | String           | 动态语言中的set.get方法跟的                        |
| 14   | control       | String           | 特殊字段的表单控件名:<br>checkbox,select,radio     |
| 15   | dicts         | List<MyKeyValue> | 特殊字段的备选值:key,value访问<br>用于生成的时候自动生成对应的控件<br>[点击查看如何定义](#speccolumn) |
| 16   | jdbcType      | String           | mybatis中可能会用到                            |



#### 如何自己写模板

##### <a name="speccolumn">特殊字段规范</a>

```shell
##请在数据库建表的时候,备注一栏按此格式去编写,将会被识别
##[P1]=[字段的说明,如:行状态]
##[P2]=[表单控件,支持: checkbox,select,radio]
##[P3]=[备选值:kv模式,末尾的;不能去掉]
[字段说明123][checkbox][k1=v1;k2=v2;k3=v3;]

```



##### <a name="vtl">VTL语法说明</a>

```js
//工具投射过来的变量访问
//访问变量采用 $!{var} $!var 的格式 ,建议采用带{}的访问方式 
$!{table.tableName}  //页面上会输出 ad_config

//设置一个变量
#set($var1="123")

//输出一个变量
$!{var1}   //将会输出 123

//vtl中的注释写法
#**这中间的文字是被注释的哦,适用于多行注释**#
##我也备注是了,不会被输出,适用于单行注释

//如何循环
//默认的循环次数的引用变量名为$velocityCount
#foreach($!tc in $!columns)
	//循环里给变量设置值
	#set($var1=$var1+","+$tc.dlEntity)
    #if("PRI"=="$!tc.key")
         #set($firstColumn = $!{tc.name.toLowerCase()} )
    #end
    //输出字段的备注
    $!{tc.comment}
#end

//如何判定
#if(""=="$!var1")
直接输出我把
#elseif("123"=="$!var1")
输出123
#else
我不知道了
#end

```



#### VTL保留字输出替代方案

```html
如果在编写模板的时候,需要输出vtl的保留字,请将变量定义为以下格式,程序将会自动转换
暂时支持这3个,后期发现再加:
[#] => #
[$] => $
[!] => !
```



#### 注册

为了节省您的时间,简化填写步骤。您只需要扫描下方二维码就可以完成注册了。



