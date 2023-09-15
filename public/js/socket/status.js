//__________SCREEN_TRẠNG THÁI__________

socket.on('Show_MainPower_ON', function (data) {
    var list = document.querySelector('#stt_Show_MainPower_ON').classList
    if (data) { // data is true
        list.add("rectangle_status_green");
    } else { // data is false
        list.remove("rectangle_status_green");
    }
});

socket.on('Show_System_ReadyOK', function (data) {
    var list = document.querySelector('#stt_Show_System_ReadyOK').classList
    if (data) {
        list.add("rectangle_status_green");
    } else {
        list.remove("rectangle_status_green");
    }
});

socket.on('Lamp_General_Fault', function (data) {
    var list = document.querySelector('#stt_Lamp_General_Fault').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});

socket.on('Alarm_OverVoltage', function (data) {
    var list = document.querySelector('#stt_Alarm_OverVoltage').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});

socket.on('Alarm_OverCurrent', function (data) {
    var list = document.querySelector('#stt_Alarm_OverCurrent').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});

socket.on('Alarm_LimitCurrent', function (data) {
    var list = document.querySelector('#stt_Alarm_LimitCurrent').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});

socket.on('Safety_Door1', function (data) {
    var list = document.querySelector('#stt_Safety_Door1').classList
    if (data) {
        list.add("rectangle_status_green");
    } else {
        list.remove("rectangle_status_green");
    }
});

socket.on('Safety_Door2', function (data) {
    var list = document.querySelector('#stt_Safety_Door2').classList
    if (data) {
        list.add("rectangle_status_green");
    } else {
        list.remove("rectangle_status_green");
    }
});

socket.on('Alarm_Volt_Abnormal', function (data) {
    var list = document.querySelector('#stt_Alarm_Volt_Abnormal').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});

socket.on('E_STOP', function (data) {
    var list = document.querySelector('#stt_E_STOP').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});

socket.on('E_STOP_External', function (data) {
    var list = document.querySelector('#stt_E_STOP_External').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});

socket.on('Alarm_CV_Fault', function (data) {
    var list = document.querySelector('#stt_Alarm_CV_Fault').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});

// Dưới
socket.on('The_first_disable', function (data) {
    var list = document.querySelector('#stt_The_first_disable').classList
    if (data) {
        list.add("rectangle_status_green");
    } else {
        list.remove("rectangle_status_green");
    }
});

socket.on('The_second_disable', function (data) {
    var list = document.querySelector('#stt_The_second_disable').classList
    if (data) {
        list.add("rectangle_status_green");
    } else {
        list.remove("rectangle_status_green");
    }
});


socket.on('start_stop', function (data) {
    
    var list_start = document.querySelector('#stt_start').classList
    var list_stop = document.querySelector('#stt_stop').classList

    
    if (data) {
        list_start.add("rectangle_status_green");
        list_stop.remove("rectangle_status_green");
    } else {
        list_start.remove("rectangle_status_green");
        list_stop.add("rectangle_status_green");
    }
});


socket.on('Auto_Manuel', function (data) {
    var list = document.querySelector('#stt_Auto_Manuel').classList
    if (data) {
        list.add("rectangle_status_green");
    } else {
        list.remove("rectangle_status_green");
    }
});

socket.on('E_STOP_HMI', function (data) {
    var list = document.querySelector('#stt_E_STOP_HMI').classList
    if (data) {
        list.add("rectangle_status_red");
        list.add("glow");
    } else {
        list.remove("rectangle_status_red");
        list.remove("glow");
    }
});


