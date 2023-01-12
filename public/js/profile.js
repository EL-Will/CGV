let rows = document.getElementsByClassName('row-id');
for (let i = 0; i < rows.length; i++) {
    rows[i].innerText = i + 1;
}

document.getElementById('my-profile').addEventListener('mouseover', () => {
    let newClass = document.getElementsByClassName('underline')[0];
    newClass.classList.remove('pos2-top');
    newClass.classList.add('pos1-top');
});
document.getElementById('public-profile').addEventListener('mouseover', () => {
    let newClass = document.getElementsByClassName('underline')[0];
    newClass.classList.remove('pos1-top');
    newClass.classList.add('pos2-top');
});