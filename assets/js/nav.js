let menuopen = document.getElementById('toggle-open');
let menuclose = document.getElementById('toggle-close');
let menucontainer = document.querySelector('.nav-menu');
menuopen.addEventListener('click', function(){
    menucontainer.classList.add('nav-menu-active');
    menucontainer.style.transform = 'translateX(-11em)';
});
menuclose.addEventListener('click', function(){
    console.log('close');
    menucontainer.style.transform = 'translateX(0em)';
});