document.getElementById('menuBtn').addEventListener('click',()=>{
    let headerNav2 = document.getElementById('header-nav2');
    if(headerNav2.className.indexOf('skip-active') != -1){
        headerNav2.classList.toggle('skip-active');
    }
    let headerNav = document.getElementById('header-nav');
    headerNav.classList.toggle('skip-active');
});
document.getElementById('accountBtn').addEventListener('click',()=>{
    let headerNav = document.getElementById('header-nav');
    if(headerNav.className.indexOf('skip-active') != -1){
        headerNav.classList.toggle('skip-active');
    }
    let headerNav2 = document.getElementById('header-nav2');
    headerNav2.classList.toggle('skip-active');
});
let classParent = document.getElementsByClassName('parent');
for(let i = 0; i<classParent.length; i++){
    classParent[i].addEventListener('click',()=>{
        classParent[i].classList.toggle('menu-active');
    })
}
let classParent2 = document.getElementsByClassName('parent');
for(let i = 0; i<classParent2.length; i++){
    classParent2[i].addEventListener('mouseover',()=>{
        for(let j = 0; j<classParent2.length; j++){
            if(classParent2[j].className.indexOf('menu-active') != -1){
                classParent2[j].classList.toggle('menu-active');
            }
        }
        if(classParent2[i].className.indexOf('menu-active') == -1){
            classParent2[i].classList.toggle('menu-active');
        }
    })
    classParent2[i].addEventListener('mouseleave',()=>{
        for(let j = 0; j<classParent2.length; j++){
            if(classParent2[j].className.indexOf('menu-active') != -1){
                classParent2[j].classList.toggle('menu-active');
            }
        }
        if(classParent2[i].className.indexOf('menu-active') != -1){
            classParent2[i].classList.toggle('menu-active');
        }
    })
}

