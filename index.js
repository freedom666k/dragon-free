// وضع ليلي ونهاري
function toggleMode() {
    document.body.classList.toggle('light-mode');
    if(document.body.classList.contains('light-mode')){
        localStorage.setItem('mode','light');
    } else {
        localStorage.setItem('mode','dark');
    }
}
window.onload = function(){
    if(localStorage.getItem('mode')==='light'){
        document.body.classList.add('light-mode');
    }
}

// نسخ نص أو كود
function copyText(id){
    const text = document.getElementById(id);
    text.select();
    text.setSelectionRange(0,99999);
    navigator.clipboard.writeText(text.value);
    alert("تم النسخ!");
}

// تحميل canvas
function downloadCanvas(id, filename='image.png'){
    const canvas = document.getElementById(id);
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
}
