// CURRENT DC
socket.on('Show_Current_AD', function (data) {
    document.querySelector('#chart_Show_Current_AD').textContent = data
});

// VOLTAGE DC
socket.on('Show_Voltage_AD', function (data) {
    document.querySelector('#chart_Show_Voltage_AD').textContent = data;
});