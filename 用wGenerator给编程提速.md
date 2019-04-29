### 用wGenerator给编程提速

> 虞城码农



#### 1.需求设定


```
开发语言: java
数据库:   mysql
持久化:   mybatis
模式:     mvc
视图引擎:  thymeleaf
前端框架:  bootstrap4
用以上的组合来开发一个公告管理的列表与增删改
```

**问题1：**  **以上的需求设定,如果是你来开发**，会需要多久呢？请在心中记下您的答案。



#### 2.需要制作的内容与步骤

用java来做的话实现上述功能，大致需要7个步骤:

1. 编写DTO(或VO)  —— 用于进行分页查询，进行add,edit的参数接收以及相关校验

2. 编写Entity(或Model) ——用于对应表字段信息 

3. 编写Mapper ——用于持久化，数据处理

4. 编写Service —— 逻辑实现层

5. 编写Controller—— 请求路由控制器(暴露给用户的地方)

6. 编写列表页面的view ——用于展现公告list(分页额)

7. 编写对话框编辑的view——用于add、edit公告信息的页面

   

以上这7个步骤，实际实现起来可能不止7个文件，因为有的开发者在mapper的时候用了xml

在service的时候用了 impl的方式。 那么又有问题来了

**问题2：** **写完这些文件需要多久？？** 同样请您默记下您的答案。



#### 3.进入正题

登录 [wGenerator](https://wgenerator.51dmai.com/login)

网址: https://wgenerator.51dmai.com

打开菜单, **按SQL生成**，如下图

![image-20190429131139985](/Users/wangzh/Library/Application Support/typora-user-images/image-20190429131139985.png)

找到公告的SQL语句,复制一下，navicat怎么找，请看下方的图片

![image-20190429130703361](/Users/wangzh/Library/Application Support/typora-user-images/image-20190429130703361.png)



填入SQL语句,选择好模板,点击生成，上方的7个步骤的代码就都生成出来了

![image-20190429131320678](/Users/wangzh/Library/Application Support/typora-user-images/image-20190429131320678.png)



可以从图中看出，需要的文件我们已经生成好了，接下来就是:

```mermaid

graph LR

A[新建文件] -->B(复制)

    B --> C(粘贴代码)

    

```

重复做这几件事情，把文件全部建立好

整个过程花了: **20分钟**

具体过程可以参见这个[视频教程](https://mp.weixin.qq.com/s/l3ellgBhcGkKhvdIWD3JkA)

地址: https://mp.weixin.qq.com/s/l3ellgBhcGkKhvdIWD3JkA



这个时间与您刚刚默记的时间差异有多少呢？？ 这里因人而异。



仔细的朋友可能会发现我上方生成了9个模板：并不是7个

**多出来的2个分别是**：

1. 实体赋值 —— 这个对于很多字段的类是特别好用的，你不用担心漏掉那个字段没有赋值

![image-20190429132207071](/Users/wangzh/Library/Application Support/typora-user-images/image-20190429132207071.png)
2. 实体JSON——这个对于前后分离的开发模式,用于Postman里请求数据用


![image-20190429132143768](/Users/wangzh/Library/Application Support/typora-user-images/image-20190429132143768.png)



如果您想体验一下工具：

可以访问：  https://wgenerator.51dmai.com



快速注册，请扫描下方的二维码



　　



