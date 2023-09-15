//screen_setting
socket.on('Work_Voltage_1', function (data) {
    document.querySelector('#setting_Work_Voltage_1').textContent = data;
});

socket.on('Work_Voltage_2', function (data) {
    document.querySelector('#setting_Work_Voltage_2').textContent = data;
});

socket.on('The_first_timekeeping', function (data) {
    document.querySelector('#setting_The_first_timekeeping').textContent = data;
});

socket.on('The_second_timekeeping', function (data) {
    document.querySelector('#setting_The_second_timekeeping').textContent = data;
});

socket.on('Voltage_Time', function (data) {
    document.querySelector('#setting_Voltage_Time').textContent = data;
});

socket.on('Down_Voltage_Time', function (data) {
    document.querySelector('#setting_Down_Voltage_Time').textContent = data;
});

socket.on('Protect_Voltage', function (data) {
    document.querySelector('#setting_Protect_Voltage').textContent = data;
});

socket.on('Given_Current', function (data) {
    document.querySelector('#setting_Given_Current').textContent = data;
});

socket.on('OverCurrent', function (data) {
    document.querySelector('#setting_OverCurrent').textContent = data;
});

socket.on('OverVoltage', function (data) {
    document.querySelector('#setting_OverVoltage').textContent = data;
});

socket.on('Set_LimitTemp_Envi', function (data) {
    document.querySelector('#setting_Set_LimitTemp_Envi').textContent = data;
});

socket.on('Set_OverTemp_Envi', function (data) {
    document.querySelector('#setting_Set_OverTemp_Envi').textContent = data;
});

