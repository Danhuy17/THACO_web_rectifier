
//screen_main
socket.on('Show_Current_AD', function (data) {
    var knobInput = $(".knob-Current-DC");
    $(".knob-Current-DC").val(data).trigger('change');
});

socket.on('Show_Voltage_AD', function (data) {
    var knobInput = $(".knob-Voltage-DC");
    $(".knob-Voltage-DC").val(data).trigger('change');
});

socket.on('ShowGiven_Voltage', function (data) {
    var knobInput = $(".knob-Given-voltage");
    $(".knob-Given-voltage").val(data).trigger('change');
});

socket.on('The_first_time_countdown', function (data) {
    var knobInput = $(".knob-Time-1");
    $(".knob-Time-1").val(data).trigger('change');
});

socket.on('The_second_time_countdown', function (data) {
    var knobInput = $(".knob-Time-2");
    $(".knob-Time-2").val(data).trigger('change');
});

socket.on('num_module_ready', function (data) {
    var knobInput = $(".knob-num-modules");
    $(".knob-num-modules").val(data).trigger('change');

});


//HIỂN THỊ MODULE ĐANG GẶP LỖI

// Khởi tạo một mảng để lưu trữ của các biến Alarm_Module_Fault
const alarmStatuses = Array(42).fill(0);

// Lắng nghe sự kiện từ server
for (let i = 1; i <= 42; i++) {
    socket.on(`Alarm_Module_Fault_${i}`, function (data) {
        // Cập nhật mảng dựa trên dữ liệu nhận được
        alarmStatuses[i - 1] = data ? 1 : 0; // Nếu data là true, gán 1, nếu không gán 0

        // Cập nhật nội dung cho .inner_shape_fault
        updateInnerShapeFault();
    });
}

function updateInnerShapeFault() {
    const activeAlarms = [];
    for (let i = 0; i < 42; i++) {
        if (alarmStatuses[i] === 1) {
            activeAlarms.push(i + 1);
        }
    }

    const innerShapeFaultElem = document.querySelector('.inner_shape_fault');
    
    // Nếu không có giá trị nào ở mức 1 (hoặc true), hiển thị thông điệp "Không lỗi"
    if (activeAlarms.length === 0) {
        innerShapeFaultElem.textContent = noErroredModuleText;
    } else {
        innerShapeFaultElem.textContent = activeAlarms.join(' - ');
    }
}

