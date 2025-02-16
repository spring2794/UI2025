// تابع برای اضافه کردن وظیفه جدید
function addTask() {
    // گرفتن مقدار ورودی از کاربر و حذف فضاهای خالی اضافی
    var taskInput = document.getElementById('taskInput').value.trim();
    
    // اگر ورودی خالی باشد، تابع متوقف می‌شود
    if (taskInput === "") return;

    // دریافت تاریخ و زمان فعلی
    var now = new Date();
    var formattedDate = now.toLocaleDateString('fa-IR');  // فرمت تاریخ به زبان فارسی
    var formattedTime = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });  // فرمت زمان به زبان فارسی

    // ایجاد یک شیء برای وظیفه جدید شامل متن وظیفه، تاریخ و زمان
    var task = { text: taskInput, date: formattedDate, time: formattedTime };

    // دریافت لیست وظایف ذخیره‌شده از localStorage (در صورتی که وجود داشته باشد)
    // در غیر این صورت یک آرایه خالی برمی‌گردد
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // اضافه کردن وظیفه جدید به لیست
    tasks.push(task);
    
    // ذخیره لیست وظایف به localStorage به صورت یک رشته JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // به‌روزرسانی نمایش وظایف روی صفحه
    renderTasks();

    // پاک کردن مقدار ورودی بعد از اضافه کردن وظیفه
    document.getElementById('taskInput').value = '';
}

// تابع برای نمایش لیست وظایف ذخیره‌شده از localStorage
function renderTasks() {
    // گرفتن لیست وظایف از localStorage
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = "";  // پاک کردن محتوای لیست وظایف از صفحه

    // دریافت وظایف ذخیره‌شده از localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // برای هر وظیفه در لیست، یک عنصر <li> ساخته و به صفحه اضافه می‌کنیم
    tasks.forEach((task, index) => {
        var li = document.createElement('li');

        var taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;  // نمایش متن وظیفه

        var dateSpan = document.createElement('span');
        dateSpan.textContent = ` (${task.date} - ${task.time})`;  // نمایش تاریخ و زمان
        dateSpan.style.fontSize = "12px";
        dateSpan.style.color = "gray";
        dateSpan.style.marginLeft = "10px";

        // دکمه حذف وظیفه
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = "حذف";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            // حذف وظیفه از آرایه
            tasks.splice(index, 1);
            // ذخیره دوباره لیست وظایف به localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            // به‌روزرسانی UI
            renderTasks();
        };

        // دکمه ویرایش وظیفه
        var editBtn = document.createElement('button');
        editBtn.textContent = "ویرایش";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = function () {
            // درخواست ورودی جدید از کاربر برای ویرایش متن وظیفه
            var newText = prompt("متن جدید را وارد کنید:", task.text);
            if (newText !== null) {
                // به‌روزرسانی متن وظیفه در آرایه
                tasks[index].text = newText;
                // ذخیره دوباره لیست وظایف به localStorage
                localStorage.setItem('tasks', JSON.stringify(tasks));
                // به‌روزرسانی UI
                renderTasks();
            }
        };

        // ایجاد یک کانتینر برای دکمه‌های ویرایش و حذف
        var btnContainer = document.createElement('div');
        btnContainer.classList.add("btn-container");
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        // اضافه کردن تاریخ، متن وظیفه و دکمه‌ها به عنصر <li>
        li.appendChild(dateSpan);
        li.appendChild(taskSpan);
        li.appendChild(btnContainer);

        // اضافه کردن وظیفه به لیست وظایف صفحه
        taskList.appendChild(li);
    });
}

// بارگذاری وظایف از localStorage هنگام بارگذاری صفحه
// این قسمت باعث می‌شود که وظایف ذخیره‌شده از localStorage به محض بارگذاری صفحه نمایش داده شوند
document.addEventListener('DOMContentLoaded', renderTasks);
