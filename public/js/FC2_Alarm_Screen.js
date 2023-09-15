function fn_Alarm_Show() {
    socket.emit("msg_Alarm_Show", "true");
    socket.on('Alarm_Show', function (data) {
        fn_table_Alarm(data);
    });
}


// Chương trình con hiển thị SQL ra bảng
function fn_table_Alarm(data) {
    if (data) {
        $("#table_Alarm tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                txt += "<tr><td>" + data[i].date_time
                    + "</td><td style='text-align: center;'>" + data[i].ID
                    + "</td><td style='text-align: center;'>" + data[i].Status
                    + "</td><td>" + data[i].AlarmName
                    + "</td></tr>";
            }
            if (txt != "") {
                txt += "</tbody>";
                $("#table_Alarm").append(txt);
            }
        }
    }
}

// Tìm kiếm cảnh báo theo thời gian
function fn_Alarm_By_Time() {
    var val = [document.getElementById('input-alarm_search_start_date').value,
    document.getElementById('input-alarm_search_end_date').value];
    socket.emit('msg_Alarm_ByTime', val);
    socket.on('Alarm_ByTime', function (data) {
        fn_table_Alarm(data); // Show alarm
    });
}

function fn_Exit_Search_Alarm() {
    fn_Alarm_Show();
}

// Hàm chức năng xuất dữ liệu Excel
function fn_excel_alarm() {
    socket.emit("msg_Excel_Alarm_Report", true);

    socket.on('send_Excel_Alarm_Report', function (buffer) {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Report_Alarm.xlsx"; // Bạn có thể thay đổi tên này nếu muốn
        link.click();
    });
}
