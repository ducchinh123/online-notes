// ===================  Form nhập liệu =========================


const addBtn = document.querySelector("#addJob");
const input = document.querySelector("#inputValue");
var datas = JSON.parse(localStorage.getItem("jobs"));


if (datas) {
    var index = datas.length + 1;
    renderData(datas);

} else {

    var index = 1;
    renderData(datas);
}

addBtn.addEventListener("click", function () {

    if (input.value == "") {

        document.querySelector("#error").style.display = "block";
    } else {

        document.querySelector("#error").style.display = "none";
    }

    // tổng kết

    if (input.value != "") {

        if (confirm("✔ Thêm công việc thành công")) {



            // Lấy đối tượng Date hiện tại
            var today = new Date();
            // Lấy thứ
            var day = today.getDay();
            var weekdays = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
            var dayOfWeek = weekdays[day];

            // Lấy giờ hiện tại
            var hours = today.getHours();
            var minutes = today.getMinutes();
            var seconds = today.getSeconds();
            var time = hours + 'h:' + minutes + 'm:' + seconds + 's';

            // Lấy ngày tháng năm
            var date2 = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

            var job = {

                id: index,
                name: input.value,
                time: `${dayOfWeek}, ngày ${date2}, lúc ${time}`

            }

            // xử lý thêm công việc mới


            if (datas === null) {



                // kiểm tra nếu chưa có dữ liệu trên localStorage thì: 1: tạo mảng mới, 2: thêm cv vào mảng
                var infoJobs = [];

                infoJobs.push(job);

                localStorage.setItem("jobs", JSON.stringify(infoJobs));
            } else {

                // nếu đã có dữ liệu rồi thì chỉ việc thêm vào

                datas.push(job);

                localStorage.setItem("jobs", JSON.stringify(datas));

            }

            location.reload();

        }

    }








    if (datas) {

        renderData(datas);
    } else {

        location.reload();
        if (input.value == "") {

            alert("❌ Ô nhập đang trống.");
            document.querySelector("#error").style.display = "none";

        }
    }

    bindDeleteEditButtons();

})



// hàm render
function renderData(data) {

    if (data === null || data.length === 0) {


        document.querySelector("#content-detail").innerHTML = "<p class='text-success font-italic'>Không có ghi chú công việc nào hiện tại.</p>";
    } else {

        var htmls = data.map(function (item) {
            return `<tr class="mb-3 line">
            <td>

                <input type="checkbox" class="checkJob" id="" name="checkJob">
               

            </td>

            <td>
                <div class="nameJob font-weight-bold">${item.name} <br>
                    <span class="text-muted font-weight-light">${item.time}</span>
                </div>
            </td>

            <td>

                <button data-id=${item.id} class="btn btn-outline-primary edit-btn mb-2 mb-lg-0"><i
                        class="fa-solid fa-pen-to-square"></i></button>
                <button data-id=${item.id} class="btn btn-outline-danger delete-btn"><i
                        class="fa-solid fa-trash"></i></button>
            </td>

        </tr>`;
        }).join('');

        // console.log(htmls);

        document.querySelector("#content-detail table > tbody").innerHTML = htmls;
    }

}




function bindDeleteEditButtons() {


    // xử lý nâng cao

    const checkboxs = document.querySelectorAll("table input[type='checkbox']");
    const contents = document.querySelectorAll("table .nameJob");
    const lines = document.querySelectorAll("table tr");


    checkboxs.forEach(function (item, index) {

        item.addEventListener("change", function () {





            if (confirm("❓ Xác nhận hoàn thành công việc")) {

                if (this.checked) {

                    contents.forEach(function (content, i) {

                        if (index === i) {

                            content.style.color = "green";
                            content.style.textDecoration = "underline green";

                            if (datas) {

                                setInterval(function () {

                                    datas.splice(index, 1);
                                    localStorage.setItem("jobs", JSON.stringify(datas));
                                    content.style.color = "gray";
                                    location.reload();
                                }, 1000)

                            }
                        }
                    });
                }
                else {

                    contents.forEach(function (content, i) {

                        if (index === i) {

                            content.style.color = "black";
                            content.style.textDecoration = "none";
                        }
                    });

                }

            } else {

                this.checked = "false";
                location.reload();
            }


        })
    });


    // Xử lý việc xóa


    var delBtns = document.querySelectorAll(".delete-btn");


    if (delBtns) {

        for (const delBtn of delBtns) {

            delBtn.addEventListener("click", function () {

                if (confirm("❓ Bạn muốn loại bỏ công việc này.")) {

                    if (datas) {

                        setInterval(function () {

                            datas.splice(delBtn.dataset.id - 1, 1);
                            localStorage.setItem("jobs", JSON.stringify(datas));
                            location.reload();
                        }, 300)

                    }

                }
            })

        }
    }


    // xử lý việc sửa

    const editBtns = document.querySelectorAll(".edit-btn");
    const contentBox = document.querySelector("#content");


    if (editBtns) {


        for (const editBtn of editBtns) {

            editBtn.addEventListener("click", function () {

                contentBox.innerHTML = `<div class="row text-center">
            <div class="col-md-12 font-weight-bold font-size-18">Cập nhật công việc</div>

        </div>



        <div class="row mt-2">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <form action="">
                    <input type="text" name="" placeholder="Nhập thay đổi..." value="${datas[editBtn.dataset.id - 1].name}" class="form-control"
                        id="inputEdit">
                    <p style="color: red;" id="error">Bạn đang để trống ô sửa đổi!</p>
                    <div class="mt-3 mb-2 text-center">
                        <button id="editJob" type="button" class="btn btn-outline-success">Thay đổi</button>
                        <button type="button" class="btn btn-outline-primary" id="come-back">Quay lại</button>
                    </div>
                </form>
            </div>
            <div class="col-md-3"></div>
        </div>`;



                const inputEdit = document.querySelector("#inputEdit");


                // nút cập nhật

                const editJob = document.querySelector("#editJob");

                editJob.addEventListener("click", function () {

                    if (inputEdit.value == "") {

                        document.querySelector("#error").style.display = "block";
                    } else {

                        document.querySelector("#error").style.display = "none";
                    }




                    // tổng kết

                    if (inputEdit.value != "") {



                        if (confirm("✔ Cập nhật công việc của bạn thành công")) {



                            // Lấy đối tượng Date hiện tại
                            var today = new Date();
                            // Lấy thứ
                            var day = today.getDay();
                            var weekdays = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
                            var dayOfWeek = weekdays[day];

                            // Lấy giờ hiện tại
                            var hours = today.getHours();
                            var minutes = today.getMinutes();
                            var seconds = today.getSeconds();
                            var time = hours + 'h:' + minutes + 'm:' + seconds + 's';

                            // Lấy ngày tháng năm
                            var date2 = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();



                            // xử lý sửa công việc mới

                            datas[editBtn.dataset.id - 1].name = inputEdit.value;
                            datas[editBtn.dataset.id - 1].time = `Đã sửa đổi vào ${dayOfWeek}, ngày ${date2}, lúc ${time}`;

                            localStorage.setItem("jobs", JSON.stringify(datas));




                            location.reload();

                        }

                    }

                })
                // nút quay lại
                const comeBack = document.querySelector("#come-back");

                comeBack.addEventListener("click", function () {

                    if (confirm("❓ Bạn muốn quay lại trang trước")) {

                        location.reload();
                    }
                })
            })
        }
    }

}

bindDeleteEditButtons();