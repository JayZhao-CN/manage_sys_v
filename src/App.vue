<template>
  <div id="div_main">
<!--    头部-->
    <Header/>
<!--    主体-->
    <div style="display: flex">
<!--      侧边栏-->
      <Aside/>
<!--      内容-->
      <router-view/>
    </div>
  </div>

</template>

<style>

</style>

<script>
import Header from "./components/Header";
import Aside from "./components/Aside";

export default {
  name:"Layout",
  components:{
    Header,
    Aside
  },
  data(){
    return{
      loginForm: {
        username: "",
        password: "",
      },

    }
  },
  mounted() {
    this.getCookie();
  },
  beforeCreate() {

  },
  methods:{
    check(){

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* ------ 账号密码的存储 ------ */
          if (this.checked) {
            let password = Base64.encode(this.loginForm.password); // base64加密
            this.setCookie(this.loginForm.userId, password, 7);
          } else {
            this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
          }
          /* ------ http登录请求 ------ */
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 设置cookie
    setCookie(userId, password, days) {
      let date = new Date(); // 获取时间
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
          "userId" + "=" + userId + ";path=/;expires=" + date.toGMTString();
      window.document.cookie =
          "password" + "=" + password + ";path=/;expires=" + date.toGMTString();
    },

    // 读取cookie 将用户名和密码回显到input框中
    getCookie() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split("; "); //分割成一个个独立的“key=value”的形式
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split("="); // 再次切割，arr2[0]为key值，arr2[1]为对应的value
          if (arr2[0] === "userId") {
            this.loginForm.userId = arr2[1];
          } else if (arr2[0] === "password") {
            this.loginForm.password = Base64.decode(arr2[1]);// base64解密
            this.checked = true;
          }
        }
      }
    }
  }
}
</script>
