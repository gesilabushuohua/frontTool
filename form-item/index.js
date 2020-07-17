window.onload = function () {
    // 监听密码切换
    const pwdVisibleBtns = document.getElementsByClassName(
      'pwd-visible-btn'
    );
    
    for(let i = 0;i<pwdVisibleBtns.length; i++){
      const pwdVisibleBtn = pwdVisibleBtns[i];
      const pwdContainer = pwdVisibleBtn.parentElement;
      const pwdInput = pwdContainer.getElementsByTagName('input')[0];
      pwdVisibleBtn.onclick = function (event) {
        togglePwdInput(pwdContainer, pwdInput);
      };
    }
}


// 密码输入框切换明文，密文
function togglePwdInput(container, input) {
  const visibleClassName = 'b-input-visible-pwd';
  const hiddenClassName = 'b-input-hidden-pwd';
  const curContanerClass = container.classList;
  const isHidden = curContanerClass.contains(hiddenClassName);

  if (isHidden) {
    // 切换为明文
    input.type = 'text';
  } else {
    // 切换为密文
    input.type = 'password';
  }

  container.classList.toggle(visibleClassName);
  container.classList.toggle(hiddenClassName);
}
