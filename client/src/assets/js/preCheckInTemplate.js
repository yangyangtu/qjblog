function checkLogin() {
    let href = window.location.href;

    //写文章，发表，设置，个人主页 检查登陆状态
    if(/edit/.test(href)){
      // 根据 lastAPITime 检查 登陆状态
      var lastAPITime = getCookie('lastAPITime'),
          status = (lastAPITime == '' ? 
              false : 
              ((new Date().getTime() - lastAPITime) > 30 * 60 * 1000 ?
                  false : 
                  true
              )
          );

      if(!status) {
          console.log('登录超时')
          window.location.href = '/login';
      }
    }
}
function getCookie(name) {
    var cookie = document.cookie;
    if(cookie.length > 0) {
        var c_start = cookie.indexOf(name + "=")
        if (c_start != -1){ 
            c_start = c_start + name.length + 1 
            var c_end = cookie.indexOf(";", c_start)
            if (c_end == -1) {
                c_end = cookie.length
            }
            return unescape(cookie.substring(c_start, c_end))
        } 
    }
    return '';
}
checkLogin();