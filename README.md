#MallSystem2
## 1.项目结构：

- 按用户身份：管理员端(admin)、用户端(user)；
- 按载体：微信小程序端(mini)、网页端(website)；

┏ admin
┃&emsp;├ mini
┃&emsp;└ website
┣ user
┃&emsp;├ mini
┃&emsp;└ website

---
## 2.分支目录

- 按功能分：前端(front)，服务器段(backend);
- 按用户身份：管理员端(admin)、用户端(user)；
- 按载体：微信小程序端(mini)、网页端(website)；

┏ front
┃&emsp;├ admin
┃&emsp;│&emsp;├ mini
┃&emsp;│&emsp;└ website
┃&emsp;└ user
┣ backend
┃&emsp;├ admin
┃&emsp;│&emsp;├ mini
┃&emsp;│&emsp;└ website
┃&emsp;└ user
┃&emsp;├ mini
┃&emsp;└ website

---
## 3.使用注意

1. 克隆指定分支
```
git clone -b front_admin_mini_master
git clone -b backend_admin_mini_master
...
```
2. 分之合并由各分支管理员操作，切不可越权管理分支；
3. 请开发人员于每日工作开始前，拉取最新分支内容
4. 请开发人员于每日工作结束之前，妥善保存未开发完毕的代码，如已开发完成，告知分支负责人，并向模块主分支发起合并请求

xxxx
