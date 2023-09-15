function fn_Data_Show() {
    socket.emit("msg_Data_Show", "true");
    socket.on('Data_Show', function (data) {
        fn_table_Data(data);
    });
}


// Chương trình con hiển thị SQL ra bảng
function fn_table_Data(data) {
    if (data) {
        $("#table_Data tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                txt += "<tr><td>" + data[i].Date
                    + "</td><td style='text-align: center;'>" + data[i].DC_Current
                    + "</td><td style='text-align: center;'>" + data[i].DC_Voltage
                    + "</td></tr>";
            }
            if (txt != "") {
                txt += "</tbody>";
                $("#table_Data").append(txt);
            }
        }
    }
}

// Tìm kiếm cảnh báo theo thời gian
function fn_Data_By_Time() {
    var val = [document.getElementById('input_search_start_date').value,
    document.getElementById('input_search_end_date').value];
    socket.emit('msg_Data_ByTime', val);
    socket.on('Data_ByTime', function (data) {
        fn_table_Data(data); // Show alarm
    });
}

function fn_Exit_Search_Data() {
    fn_Data_Show();
}

// Hàm chức năng xuất dữ liệu Excel
function fn_excel_data() {
    socket.emit("msg_Excel_Data_Report", true);

    socket.on('send_Excel_Data_Report', function (buffer) {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Report_Data.xlsx"; 
        link.click();
    });
}