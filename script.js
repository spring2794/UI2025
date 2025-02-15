function addTask() {
    var taskInput = document.getElementById('taskInput').value;
    if (taskInput === "") {
        return;
    }

    var li = document.createElement('li');
    li.textContent = taskInput;

    // دکمه حذف
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.style.marginRight = '10px';
    deleteButton.style.backgroundColor = '#ff4d4d';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.padding = '5px 10px';
    deleteButton.onclick = function () {
        li.remove();
    };

    // دکمه ویرایش
    var editButton = document.createElement('button');
    editButton.textContent = 'ویرایش';
    editButton.className = 'edit-button';
    editButton.style.marginLeft = '10px';
    editButton.style.color = 'white';
    editButton.style.border = 'none';
    editButton.style.borderRadius = '5px';
    editButton.style.padding = '5px 10px';
    editButton.onclick = function () {
        var newTask = prompt("ویرایش وظیفه:", li.textContent);
        if (newTask !== null && newTask !== "") {
            li.firstChild.textContent = newTask;  // به روز رسانی متن وظیفه
        }
    };

    li.insertBefore(deleteButton, li.firstChild); // دکمه حذف در ابتدا
    li.appendChild(editButton); // دکمه ویرایش در انتها
    document.getElementById('taskList').appendChild(li);
    document.getElementById('taskInput').value = '';
}

// تابع برای حذف تمام وظایف
function removeAllTasks() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // حذف تمام عناصر در لیست
}
