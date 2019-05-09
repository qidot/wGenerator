# wGenerator
模板代码生成器

<a href="wGenerator首秀.md">设计思路</a>



##### 前端网页访问说明

> 1.把html目录放入可以运行的容器,如: apache2,nginx等

提供mac电脑中自带的apache2的配置示例:

``` sh
<VirtualHost *:80>
ServerName wg.ncore.com
DocumentRoot /wGenerator/html
<Directory /wGenerator/html>
    Options FollowSymLinks Indexes
    Require all granted
</Directory>
</VirtualHost>
```



##### 登录说明

>需要扫描下方的二维码，会收到注册信息，然后输入用户名和密码就可以登录了

![注册二维码](attachments/qrcode_for_gh_98eb4fe90b4d_258.jpg)

##### 打赏码

> 从小就接受《拿别人的手短,吃别人的嘴短》的教育，如果觉得有用请别吝啬打赏。

<img src="attachments/dashang.png" style="width:240px;"/>