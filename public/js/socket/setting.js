/*================================================================
                    Điện áp hoạt động CK 1                                 
=================================================================*/
socket.on('Work_Voltage_1', function (data) {
    var knobInput = $(".knob-Work_Voltage_1");
    $(".knob-Work_Voltage_1").val(data).trigger('change');
});

/*================================================================
                    Điện áp hoạt động CK 2                                 
=================================================================*/
socket.on('Work_Voltage_2', function (data) {
    var knobInput = $(".knob-Work_Voltage_2");
    $(".knob-Work_Voltage_2").val(data).trigger('change');
});

/*================================================================
                    Thời gian còn lại CK 1                                
=================================================================*/
socket.on('The_first_timekeeping', function (data) {
    var knobInput = $(".knob-first_timekeeping");
    $(".knob-first_timekeeping").val(data).trigger('change');
});

/*================================================================
                    Thời gian còn lại CK 2                                
=================================================================*/
socket.on('The_second_timekeeping', function (data) {
    var knobInput = $(".knob-second_timekeeping");
    $(".knob-second_timekeeping").val(data).trigger('change');
});

/*================================================================
                    Thời gian điện áp tăng                               
=================================================================*/
socket.on('Voltage_Time', function (data) {
    var knobInput = $(".knob-Voltage_Time");
    $(".knob-Voltage_Time").val(data).trigger('change');
});

/*================================================================
                    Thời gian điện áp giảm                               
=================================================================*/
socket.on('Down_Voltage_Time', function (data) {
    var knobInput = $(".knob-Down_Voltage");
    $(".knob-Down_Voltage").val(data).trigger('change');
});

/*================================================================
                    Điện áp bảo vệ                              
=================================================================*/
socket.on('Protect_Voltage', function (data) {
    var knobInput = $(".knob-Protect_Voltage");
    $(".knob-Protect_Voltage").val(data).trigger('change');
});

/*================================================================
                        Dòng giới hạn                            
=================================================================*/
socket.on('Given_Current', function (data) {
    var knobInput = $(".knob-Given_Current");
    $(".knob-Given_Current").val(data).trigger('change');
});

/*================================================================
                        Quá dòng                           
=================================================================*/
socket.on('OverCurrent', function (data) {
    var knobInput = $(".knob-OverCurrent");
    $(".knob-OverCurrent").val(data).trigger('change');
});

/*================================================================
                        Quá áp                          
=================================================================*/
socket.on('OverVoltage', function (data) {
    var knobInput = $(".knob-OverVoltage");
    $(".knob-OverVoltage").val(data).trigger('change');
});

/*================================================================
                        Quá nhiệt                         
=================================================================*/
socket.on('Set_LimitTemp_Envi', function (data) {
    var knobInput = $(".knob-LimitTemp");
    $(".knob-LimitTemp").val(data).trigger('change');
});

/*================================================================
                        Nhiệt độ cao                         
=================================================================*/
socket.on('Set_OverTemp_Envi', function (data) {
    var knobInput = $(".knob-OverTemp");
    $(".knob-OverTemp").val(data).trigger('change');
});

