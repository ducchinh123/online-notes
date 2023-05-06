// ===================  Lấy thời gian hiện tại để đánh dấu bản quyền =========================

const date = new Date();
const timeNow = date.getFullYear();
const copyright = document.querySelector("#copyright");
const titlePage = document.querySelector("title");

copyright.innerHTML = `© Copyright by Đặng Đức Chính ${timeNow}`;
titlePage.innerHTML = `Ghi chú online ${timeNow}`;

// ===================  Hiển thị lời chào =========================
const textElement = document.getElementById('welcome');
const texts = [
    '"Chúc bạn ngày mới tốt lành! Hãy ghi chú công việc của bạn vào hôm nay."',
];

let i = 0;
let j = 0;

function addLetter() {
    const text = texts[i];
    textElement.innerHTML += text.charAt(j);
    j++;
    if (j < text.length) {
        setTimeout(addLetter, 50); // thêm ký tự mới sau 50ms
    }

    document.querySelector("#welcome").classList.toggle("text-danger");

}



setTimeout(addLetter, 1000); // bắt đầu sau 1 giây



