document.getElementById('expand-account').addEventListener('mouseover', () => {
    let preAccountExpand = document.getElementsByClassName('pre-account-expand')[0];
    preAccountExpand.style.opacity = 1;
    preAccountExpand.style.visibility = "visible";
    preAccountExpand.style.transform = 'translateY(-5px)';
    preAccountExpand.style.zIndex = 1000;
})
document.getElementById('expand-account').addEventListener('mouseout', () => {
    let preAccountExpand = document.getElementsByClassName('pre-account-expand')[0];
    preAccountExpand.removeAttribute('style');
})
document.getElementById('logout-btn').addEventListener('click',()=>{
    let modalOpen = document.getElementById('body');
    if(modalOpen.className.indexOf('p-r-0-i') == -1){
        modalOpen.classList.toggle('p-r-0-i');
    }
})
document.getElementById('quitePage').addEventListener('click',async()=>{
    window.location.href = '/logout';
})
document.getElementById('gotoProfile').addEventListener('click',()=>{
    let uid = Number(document.getElementById('gotoProfile').dataset.uid);
    window.location.href = `/profile/${uid}`;
})