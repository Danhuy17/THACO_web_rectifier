/*====================================================================================
                               A.CẤU HÌNH KẾT NỐI KEPWARE                                        
=====================================================================================*/
const { TagBuilder, IotGateway } = require('kepserverex-js');
const tagBuilder = new TagBuilder({ namespace: 'Channel1.Device1' });
const iotGateway = new IotGateway({
    host: '127.0.0.1',
    port: 5000
});

/*================================================================
             A.1 HÀM ĐỌC DỮ LIỆU XUỐNG KEPWARE(PLC)                           
=================================================================*/
var tagArr = [];
function fn_tagRead() {
    iotGateway.read(TagList).then((data) => {
        var lodash = require('lodash');
        tagArr = lodash.map(data, (item) => item.v);
        console.log(tagArr);
    });
}

/*====================================================================================
                               B.KHAI BÁO DATABASE                                     
=====================================================================================*/
var mysql = require('mysql');
var sqlcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sql_plc",
    dateStrings: true
});

/*================================================================
                    B.1 Thử kết nối database                               
=================================================================*/
sqlcon.connect(function (err) {
    if (err) {
        console.error('Lỗi kết nối đến database:', err.stack);
        return;
    }
    console.log('Đã kết nối thành công đến database!');
});

/*================================================================
        B.2 Xử lý lỗi kết nối sau khi đã kết nối thành công                            
=================================================================*/
sqlcon.on('error', function (err) {
    console.error('Lỗi database:', err.stack);
});


/*====================================================================================
                               C. ĐỊNH NGHĨA TAG                                  
=====================================================================================*/

/*================================================================
        C.1 Khai báo tag trong Screen_Main                          
=================================================================*/
var Show_Current_AD = "Show_Current_AD";
var Show_Voltage_AD = "Show_Voltage_AD";
var ShowGiven_Votage = "ShowGiven_Votage";
var The_first_time_countdown = "The_first_time_countdown";
var The_second_time_countdown = "The_second_time_countdown";
var num_module_ready = "Ready_Total";
var ED_working = "Show_Voltage_Working";
var SQ2 = "SQ2";
var E_STOP_HMI = "E_STOP_HMI_in";

/*================================================================
                C.2 Khai báo tag trigger SQL                         
=================================================================*/
var sql_insert_Trigger = 'sql_insert_Trigger';

/*================================================================
                C.3 Khai báo biến Screen_Alarm                         
=================================================================*/
var Alarm_Total_E_STOP = 'Alarm_Total_E_STOP';
var Lamp_Buzzer = 'Lamp_Buzzer';
var Lamp_Serious_Fault = 'Lamp_Serious_Fault';

/*================================================================
                C.4 Khai báo tag trong Screen_Setting                       
=================================================================*/
var Work_Voltage_1 = 'Work_Voltage_1';
var Work_Voltage_2 = 'Work_Voltage_2';
var The_first_timekeeping = 'The_first_timekeeping';
var The_second_timekeeping = 'The_second_timekeeping';
var Voltage_Time = 'Voltage_Time';
var Down_Voltage_Time = 'Down_Voltage_Time';
var Protect_Voltage = 'Protect_Voltage';
var Given_Current = 'Given_Current';
var OverCurrent = 'OverCurrent';
var OverVoltage = 'OverVoltage';
var Set_LimitTemp_Envi = 'Set_LimitTemp_Envi';
var Set_OverTemp_Envi = 'Set_OverTemp_Envi';

/*================================================================
                C.5 Khai báo tag trong Screen_Status                     
=================================================================*/
var The_first_disable = 'The_first_disable';
var The_second_disable = 'The_second_disable';
var Auto_Manuel = 'Auto_Manuel';
var Show_MainPower_ON = 'Show_MainPower_ON';
var Show_System_ReadyOK = 'Show_System_ReadyOK';
var Lamp_General_Fault = 'Lamp_General_Fault';
var Alarm_OverVoltage = 'Alarm_OverVoltage';
var Alarm_OverCurrent = 'Alarm_OverCurrent';
var Alarm_LimitCurrent = 'Alarm_LimitCurrent';
var Safety_Door1 = 'Safety_Door1';
var Safety_Door2 = 'Safety_Door2';
var Alarm_Volt_Abnormal = 'Alarm_Volt_Abnormal';
var E_STOP = 'E-STOP';
var E_STOP_External = 'E_STOP_External';
var Alarm_CV_Fault = 'Alarm_CV_Fault';
var start_stop = 'Voltage_Oning';

/*================================================================
               C.6 Khai báo tag trong Screen_Module_status                    
=================================================================*/
const prefixes = [
    'DC_Voltage',
    'DC_Current',
    'Temperature_DC',
    'Temperature_Environment',
    'StateWord',
    'Alarm_Module_Fault'
];

for (let i = 1; i <= 42; i++) {
    for (const prefix of prefixes) {
        global[`${prefix}_${i}`] = `${prefix}_${i}`;
    }
}

/*====================================================================================
                               D.READ/GET (THEO DUNG THU TU)                                 
=====================================================================================*/
const readVariables = [
    // Main_Screen
    Show_Current_AD,
    Show_Voltage_AD,
    ShowGiven_Votage,
    The_first_time_countdown,
    The_second_time_countdown,
    num_module_ready,
    ED_working,
    SQ2,

    // screen_setting
    E_STOP_HMI,

    // SQL_Trigger
    sql_insert_Trigger,

    // screen_setting
    Work_Voltage_1,
    Work_Voltage_2,
    The_first_timekeeping,
    The_second_timekeeping,
    Voltage_Time,
    Down_Voltage_Time,
    Protect_Voltage,
    Given_Current,
    OverCurrent,
    OverVoltage,
    Set_LimitTemp_Envi,
    Set_OverTemp_Envi,

    // screen_status
    The_first_disable,
    The_second_disable,
    Auto_Manuel,
    Show_MainPower_ON,
    Show_System_ReadyOK,
    Lamp_General_Fault,
    Alarm_OverVoltage,
    Alarm_OverCurrent,
    Alarm_LimitCurrent,
    Safety_Door1,
    Safety_Door2,
    Alarm_Volt_Abnormal,
    E_STOP,
    E_STOP_External,
    Alarm_CV_Fault,
    start_stop,

    //Khai báo biến Alarm
    Alarm_Total_E_STOP,
    Lamp_Buzzer,
    Lamp_Serious_Fault,
];

const moduleProperties = [
    'DC_Voltage',
    'DC_Current',
    'Temperature_DC',
    'Temperature_Environment',
    'StateWord',
    'Alarm_Module_Fault'
];

let builderInstance = tagBuilder;

for (const variable of readVariables) {
    builderInstance = builderInstance.read(variable);
}

for (let i = 1; i <= 42; i++) {
    for (const property of moduleProperties) {
        builderInstance = builderInstance.read(global[`${property}_${i}`]);
    }
}

const TagList = builderInstance.get();

/*====================================================================================
                               E.QUÉT DỮ LIỆU                                
=====================================================================================*/

/*================================================================
                    E.1 Tạo Timer quét dữ liệu                               
=================================================================*/
setInterval(() => {
    console.log("Reading data at", new Date());
    fn_read_data_scan();
}, 1000);  //1000ms = 1s

/*================================================================
                    E.2 Quét dữ liệu                              
=================================================================*/
function fn_read_data_scan() {
    fn_tagRead();	// Đọc giá trị tag
    fn_sql_insert(); // Ghi dữ liệu vào SQL
    fn_Alarm_Manage(); // Cảnh báo
}

/*====================================================================================
                               F.THIẾT LẬP KẾT NỐI WEB                              
=====================================================================================*/
/*================================================================
                F.1 Khai báo các thư viện, framework                           
=================================================================*/
const express = require("express"); //Express JS Framework
const app = express();
const cookieParser = require('cookie-parser'); // Middleware in Express.js
const i18n = require("i18n"); // Thư viện giúp chuyển đa ngôn ngữ trong Node.js.
const morgan = require('morgan'); // Middleware logger dành cho Express.js.

/*================================================================
                     F.2 Cấu hình i18n                            
=================================================================*/
i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/locales',
    cookie: 'lang',
    defaultLocale: 'en'
});

app.use(express.static("public")); // Chỉ định folder public làm nơi lưu file tĩnh (ảnh) -> href /images/name_file
app.use(cookieParser()); // Sử dụng cookie-parser
app.use(i18n.init); // Sử dụng i18n sau cấu hình
app.use(morgan('combined'));

app.set("view engine", "ejs"); // Set viewengine la ejs
app.set("views", "./views");

app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000 });
    res.redirect('back');
});

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000, () => {
    console.log("Connected to server on port 3000");
});

function setLanguage(req, res, next) {
    let currentLang = req.getLocale();
    let displayLang;

    if (currentLang === 'vi') {
        displayLang = "NGÔN NGỮ";
    } else {
        displayLang = "LANGUAGE";
    }

    res.locals.displayLang = displayLang;  // Dùng res.locals để truyền biến giữa middleware và routes
    res.locals.currentLang = currentLang;

    next();
}
app.use(setLanguage);

// ROUTE
app.get("/", function (req, res) {
    res.render("screen_Main");
});

app.get("/status", function(req, res) {
    res.render("screen_Status");
});

app.get("/setting", function(req, res) {
    res.render("screen_Setting");
});

app.get("/chart", function(req, res) {
    res.render("screen_Chart");
});

app.get("/data", function(req, res) {
    res.render("screen_Data");
});

app.get("/modules", function(req, res) {
    res.render("screen_Module");
});

app.get("/alarm", function(req, res) {
    res.render("screen_Alarm");
});


/*================================================================
                     F.3 THIẾT LẬP i18n                          
=================================================================*/
i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/locales',
    cookie: 'lang',
});


/*====================================================================================
                     G.LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)                             
=====================================================================================*/
function fn_tag() {
    //screen_main
    io.sockets.emit("Show_Current_AD", tagArr[0]);
    io.sockets.emit("Show_Voltage_AD", tagArr[1]);
    io.sockets.emit("ShowGiven_Voltage", tagArr[2]);
    io.sockets.emit("The_first_time_countdown", tagArr[3]);
    io.sockets.emit("The_second_time_countdown", tagArr[4]);
    io.sockets.emit("num_module_ready", tagArr[5]);
    io.sockets.emit("ED_working", tagArr[6]);
    io.sockets.emit("SQ2", tagArr[7]);

    //screen_status
    io.sockets.emit("E_STOP_HMI", tagArr[8]);

    //tag trigger
    io.sockets.emit("sql_insert_Trigger", tagArr[9]);

    //screen_setting
    io.sockets.emit("Work_Voltage_1", tagArr[10]);
    io.sockets.emit("Work_Voltage_2", tagArr[11]);
    io.sockets.emit("The_first_timekeeping", tagArr[12]);
    io.sockets.emit("The_second_timekeeping", tagArr[13]);
    io.sockets.emit("Voltage_Time", tagArr[14]);
    io.sockets.emit("Down_Voltage_Time", tagArr[15]);
    io.sockets.emit("Protect_Voltage", tagArr[16]);
    io.sockets.emit("Given_Current", tagArr[17]);
    io.sockets.emit("OverCurrent", tagArr[18]);
    io.sockets.emit("OverVoltage", tagArr[19]);
    io.sockets.emit("Set_LimitTemp_Envi", tagArr[20]);
    io.sockets.emit("Set_OverTemp_Envi", tagArr[21]);

    //screen_status
    io.sockets.emit("The_first_disable", tagArr[22]);
    io.sockets.emit("The_second_disable", tagArr[23]);
    io.sockets.emit("Auto_Manuel", tagArr[24]);
    io.sockets.emit("Show_MainPower_ON", tagArr[25]);
    io.sockets.emit("Show_System_ReadyOK", tagArr[26]);
    io.sockets.emit("Lamp_General_Fault", tagArr[27]);
    io.sockets.emit("Alarm_OverVoltage", tagArr[28]);
    io.sockets.emit("Alarm_OverCurrent", tagArr[29]);
    io.sockets.emit("Alarm_LimitCurrent", tagArr[30]);
    io.sockets.emit("Safety_Door1", tagArr[31]);
    io.sockets.emit("Safety_Door2", tagArr[32]);
    io.sockets.emit("Alarm_Volt_Abnormal", tagArr[33]);
    io.sockets.emit("E_STOP", tagArr[34]);
    io.sockets.emit("E_STOP_External", tagArr[35]);
    io.sockets.emit("Alarm_CV_Fault", tagArr[36]);
    io.sockets.emit("start_stop", tagArr[37]);

    //Screen_Alarm
    io.sockets.emit("Alarm_Total_E_STOP", tagArr[38]);
    io.sockets.emit("Lamp_Buzzer", tagArr[39]);
    io.sockets.emit("Lamp_Serious_Fault", tagArr[40]);

    //module_status
    const moduleProperties = [
        'DC_Voltage',
        'DC_Current',
        'Temperature_DC',
        'Temperature_Environment',
        'StateWord',
        'Alarm_Module_Fault'
    ];

    let index = 41; // Starting index for tagArr

    for (let i = 1; i <= 42; i++) {
        for (const property of moduleProperties) {
            io.sockets.emit(`${property}_${i}`, tagArr[index]);
            index++;
        }
    }

}


/*====================================================================================
                    H.GỬI DỮ LIỆU BẢNG TAG TỪ G. ĐẾN CLIENT (TRÌNH DUYỆT)                            
=====================================================================================*/
io.on("connection", function (socket) {
    socket.on("Client-send-data", function (data) {
        fn_tag();
    });
});

/*====================================================================================
                      I.LƯU DỮ LIỆU DÒNG/ÁP VỀ DATABASE                          
=====================================================================================*/
var sqlins_done = false; // FLAG - Biến báo đã ghi xong dữ liệu

/*================================================================
                    I.1 Hàm INSERT dữ liệu                         
=================================================================*/
function fn_sql_insert() {
    var trigger = tagArr[9];  // Trigger đọc về từ PLC
    var sqltable_Name = "plc_data";

    // Kiểm tra dữ liệu đọc lên từ các tag
    if (typeof tagArr[0] === 'undefined' || typeof tagArr[1] === 'undefined') {
        console.error('Dữ liệu không hợp lệ:', tagArr[0], tagArr[1]);
        return;
    }
    // Nếu không có lỗi:
    console.log('connect');

    // Tạo câu lệnh để INSERT dữ liệu vào MySQL
    var sqlins = "INSERT INTO " + sqltable_Name + " (DC_Current, DC_Voltage) VALUES (?, ?)";

    // -Sử dụng phương thức .query (Dùng đê thực thi mọi kiểu lệnh với MySQL: SELECT, UPDATE, DELETE)
    // Ở đây dùng sqlins: INSERT
    sqlcon.query(sqlins, [tagArr[0], tagArr[1]], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("SQL - Ghi dữ liệu thành công");
        }
    });

    sqlins_done = trigger; // Gắn lại FLAG
}

/*====================================================================================
                                 K.CẢNH BÁO                       
=====================================================================================*/
/*================================================================
                    K.1 Hàm thêm cảnh báo mới                      
=================================================================*/
function fn_sql_alarm_insert(ID, AlarmName) {
    // Khai báo table cần tác động
    var sqltable_Name = "alarm";

    // Dữ liệu trạng thái báo cáo
    var data_1 = "'" + ID + "',";
    var data_2 = "'CHƯA XỬ LÝ',";
    var data_3 = "'" + AlarmName + "'";

    // Thêm cảnh báo vào SQL
    var str1 = "INSERT INTO " + sqltable_Name + " (ID, Status, AlarmName) VALUES (";
    var str2 = data_1 + data_2 + data_3;
    // Ghép thành 1 câu lệnh hoàn chỉnh
    var str = str1 + str2 + ");";

    // Ghi dữ liệu cảnh báo vào SQL
    sqlcon.query(str, function (err, result) {
        if (err) { console.log(err); } else { }
    });
}

/*================================================================
                K.2 Hàm tự động xác nhận cảnh báo                     
=================================================================*/
function fn_sql_alarm_ack(ID) {
    // Khai báo table cần tác động
    var sqltable_Name = "alarm";

    // Dữ liệu trạng thái cảnh báo
    var data_1 = " Status = 'ĐÃ XỬ LÝ'";
    var str1 = "UPDATE " + sqltable_Name + " SET";
    var str2 = " WHERE ID='" + ID + "'";
    // Ghép thành 1 câu lệnh hoàn chỉnh
    var str = str1 + data_1 + str2 + ";";

    // Ghi dữ liệu cảnh báo vào SQL
    sqlcon.query(str, function (err, result) {
        if (err) { console.log(err); } else { }
    });
}

/*================================================================
               K.3 Tạo biến báo đã ghi xong cảnh báo vào SQL                   
=================================================================*/
var Alarm_ID1_aldone = false;
var Alarm_ID2_aldone = false;
var Alarm_ID3_aldone = false;
var Alarm_ID4_aldone = false;
var Alarm_ID5_aldone = false;
var Alarm_ID6_aldone = false;
var Alarm_ID7_aldone = false;
var Alarm_ID8_aldone = false;
var Alarm_ID9_aldone = false;

/*================================================================
               K.4 Hàm chức năng insert Alarm                  
=================================================================*/
function fn_Alarm_Manage() {

    // Lấy dữ liệu realtime để gán cho các biến
    var Alarm_ID1 = tagArr[30];      // Quét trigger alarm ID1 - Cảnh báo vượt quá giới hạn dòng
    var Alarm_ID2 = tagArr[33];      // Quét trigger alarm ID2 - Cảnh báo giá trị điện áp bất thường
    var Alarm_ID3 = tagArr[28];      // Giá trị điện áp vượt quá mức cho phép
    var Alarm_ID4 = tagArr[29];      // Giá trị dòng điện vượt quá mức cho phép
    var Alarm_ID5 = tagArr[38];      // Dừng khẩn cấp
    var Alarm_ID6 = tagArr[39];      // Chuông đèn báo
    var Alarm_ID7 = tagArr[40];      // Lỗi nghiêm trọng
    var Alarm_ID8 = tagArr[36];      //Lỗi băng tải xích
    var Alarm_ID9 = tagArr[27];      //Lỗi chung

    // Cảnh báo ID1
    if (Alarm_ID1 == true & Alarm_ID1 != Alarm_ID1_aldone) {
        fn_sql_alarm_insert(1, "Cảnh báo vượt quá giới hạn dòng")
    } if (Alarm_ID1 == false & Alarm_ID1 != Alarm_ID1_aldone) {
        fn_sql_alarm_ack(1);
    }
    Alarm_ID1_aldone = Alarm_ID1;

    // Cảnh báo ID2
    if (Alarm_ID2 == true & Alarm_ID2 != Alarm_ID2_aldone) {
        fn_sql_alarm_insert(2, "Cảnh báo giá trị điện áp bất thường")
    } if (Alarm_ID2 == false & Alarm_ID2 != Alarm_ID2_aldone) {
        fn_sql_alarm_ack(2);
    }
    Alarm_ID2_aldone = Alarm_ID2;

    // Cảnh báo ID 3
    if (Alarm_ID3 == true & Alarm_ID3 != Alarm_ID3_aldone) {
        fn_sql_alarm_insert(3, "Giá trị điện áp vượt quá mức cho phép")
    } if (Alarm_ID3 == false & Alarm_ID3 != Alarm_ID3_aldone) {
        fn_sql_alarm_ack(3);
    }
    Alarm_ID3_aldone = Alarm_ID3;

    // Cảnh báo ID 4
    if (Alarm_ID4 == true & Alarm_ID4 != Alarm_ID4_aldone) {
        fn_sql_alarm_insert(4, "Giá trị dòng điện vượt quá mức cho phép")
    }
    if (Alarm_ID4 == false & Alarm_ID4 != Alarm_ID4_aldone) {
        fn_sql_alarm_ack(4);
    }
    Alarm_ID4_aldone = Alarm_ID4;

    // Cảnh báo ID 5
    if (Alarm_ID5 == true & Alarm_ID5 != Alarm_ID5_aldone) {
        fn_sql_alarm_insert(5, "Dừng khẩn cấp")
    }
    if (Alarm_ID5 == false & Alarm_ID5 != Alarm_ID5_aldone) {
        fn_sql_alarm_ack(5);
    }
    Alarm_ID5_aldone = Alarm_ID5;

    // Cảnh báo ID 6
    if (Alarm_ID6 == true & Alarm_ID6 != Alarm_ID6_aldone) {
        fn_sql_alarm_insert(6, "Chuông đèn báo")
    }
    if (Alarm_ID6 == false & Alarm_ID6 != Alarm_ID6_aldone) {
        fn_sql_alarm_ack(6);
    }
    Alarm_ID6_aldone = Alarm_ID6;

    // Cảnh báo ID 7
    if (Alarm_ID7 == true & Alarm_ID7 != Alarm_ID7_aldone) {
        fn_sql_alarm_insert(7, "Lỗi nghiêm trọng")
    }
    if (Alarm_ID7 == false & Alarm_ID7 != Alarm_ID7_aldone) {
        fn_sql_alarm_ack(7);
    }
    Alarm_ID7_aldone = Alarm_ID7;

    // Cảnh báo ID 8
    if (Alarm_ID8 == true & Alarm_ID8 != Alarm_ID8_aldone) {
        fn_sql_alarm_insert(8, "Lỗi băng tải xích")
    }
    if (Alarm_ID8 == false & Alarm_ID8 != Alarm_ID8_aldone) {
        fn_sql_alarm_ack(8);
    }
    Alarm_ID8_aldone = Alarm_ID8;

    // Cảnh báo ID 9
    if (Alarm_ID9 == true & Alarm_ID9 != Alarm_ID9_aldone) {
        fn_sql_alarm_insert(9, "Lỗi chung")
    }
    if (Alarm_ID9 == false & Alarm_ID9 != Alarm_ID9_aldone) {
        fn_sql_alarm_ack(9);
    }
    Alarm_ID9_aldone = Alarm_ID9;
}

/*====================================================================================
                                 L.TRUY VẤN TOÀN BỘ DATA                      
=====================================================================================*/
/*================================================================
                    L.1 ALARM_Data query                
=================================================================*/
io.on("connection", function (socket) {
    // Lắng nghe message "Alarm_Show"
    socket.on("msg_Alarm_Show", function (data) {
        
        var sqltable_Name = "alarm"; // Table name
        var query = "SELECT * FROM " + sqltable_Name + " WHERE Status IN ('ĐÃ XỬ LÝ', 'CHƯA XỬ LÝ') ORDER BY date_time DESC LIMIT 1000;";
        sqlcon.query(query, function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                const objectifyRawPacket = row => ({ ...row });
                const convertedResponse = results.map(objectifyRawPacket);
                socket.emit('Alarm_Show', convertedResponse);
                console.log("Alarm Sent")
            }
        });
    });
});

/*================================================================
                    L.2 DATA_Data query              
=================================================================*/
io.on("connection", function (socket) {
    socket.on("msg_Data_Show", function (data) {
        var sqltable_Name = "plc_data";
        // Cài đặt số lượng data truy vấn khi nhấn nút fresh: 3600 data ~ 1 hour
        var query = "SELECT * FROM " + sqltable_Name + " ORDER BY Date DESC LIMIT 3600;";
        sqlcon.query(query, function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                const objectifyRawPacket = row => ({ ...row });
                const convertedResponse = results.map(objectifyRawPacket);
                socket.emit('Data_Show', convertedResponse);
            }
        });
    });
});

// Mảng xuất dữ liệu Excel
var SQL_Excel = [];  // Dữ liệu Excel


/*====================================================================================
                        M.TRUY VẤN DỮ LIỆU THEO KHOẢNG THỜI GIAN                  
=====================================================================================*/
/*================================================================
        M.1 ALARM_ Tìm kiếm báo cáo theo khoảng thời gian             
=================================================================*/
io.on("connection", function (socket) {
    socket.on("msg_Alarm_ByTime", function (data) {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)

        if (!data[0] || !data[1]) {
            socket.emit('error', i18n.__('PLEASE RE-SELECT THE TIME RANGE'));
            return;
        }

        var timeS = new Date(data[0]); // Thời gian bắt đầu
        var timeE = new Date(data[1]); // Thời gian kết thúc

        if (isNaN(timeS.getTime()) || isNaN(timeE.getTime())) {
            socket.emit('error', i18n.__('INVALID SELECTION PERIOD'));
            return;
        }

        if (timeS > timeE) {
            socket.emit('error', i18n.__('INVALID SELECTION PERIOD'));
            return;
        }

        // Quy đổi thời gian ra định dạng của MySQL
        var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        var timeR = timeS1 + " AND " + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

        var sqltable_Name = "alarm"; // Tên bảng
        var dt_col_Name = "date_time";  // Tên cột thời gian

        var Query1 = "SELECT * FROM " + sqltable_Name + " WHERE " + dt_col_Name + " BETWEEN ";
        var Query = Query1 + timeR + ";";

        sqlcon.query(Query, function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                // Kiểm tra xem kết quả trả về có phải là một mảng rỗng hay không
                if (results.length === 0) {
                    socket.emit('error', 'Không có dữ liệu trong khoảng thời gian này');
                    return;
                }
        
                const objectifyRawPacket = row => ({ ...row });
                const convertedResponse = results.map(objectifyRawPacket);
                SQL_Excel = convertedResponse; // Xuất báo cáo Excel
                socket.emit('Alarm_ByTime', convertedResponse);
            }
        });
        
    });

});

/*================================================================
        M.2 DATA_ Tìm kiếm báo cáo theo khoảng thời gian            
=================================================================*/
io.on("connection", function (socket) {
    socket.on("msg_Data_ByTime", function (data) {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)

        if (!data[0] || !data[1]) {
            socket.emit('error', i18n.__('PLEASE RE-SELECT THE TIME RANGE'));
            return;
        }

        var timeS = new Date(data[0]); // Thời gian bắt đầu
        var timeE = new Date(data[1]); // Thời gian kết thúc

        if (isNaN(timeS.getTime()) || isNaN(timeE.getTime())) {
            socket.emit('error', i18n.__('INVALID SELECTION PERIOD'));
            return;
        }

        if (timeS > timeE) {
            socket.emit('error', i18n.__('INVALID SELECTION PERIOD'));
            return;
        }

        // Quy đổi thời gian ra định dạng của MySQL
        var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        var timeR = timeS1 + " AND " + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

        var sqltable_Name = "plc_data"; // Tên bảng
        var dt_col_Name = "Date";  // Tên cột thời gian

        var Query1 = "SELECT * FROM " + sqltable_Name + " WHERE " + dt_col_Name + " BETWEEN ";
        var Query = Query1 + timeR + ";";

        sqlcon.query(Query, function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                // Kiểm tra xem kết quả trả về có phải là một mảng rỗng hay không
                if (results.length === 0) {
                    socket.emit('error', i18n.__('NO DATA'));
                    return;
                }
        
                const objectifyRawPacket = row => ({ ...row });
                const convertedResponse = results.map(objectifyRawPacket);
                SQL_Excel = convertedResponse; // Xuất báo cáo Excel
                socket.emit('Data_ByTime', convertedResponse);
            }
        });
        
    });
});

/*====================================================================================
                               N. TẠO BÁO CÁO EXCEL                    
=====================================================================================*/
const Excel = require('exceljs');
const { CONNREFUSED } = require('dns');

/*================================================================
                   N.1 Excel Dữ liệu Cảnh báo           
=================================================================*/
function fn_excel_Alarm_Export(socket) {
    // =====================CÁC THUỘC TÍNH CHUNG=====================
    // Lấy ngày tháng hiện tại
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let day = date_ob.getDay();
    var dayName = '';
    if (day == 0) { dayName = 'Chủ nhật,' }
    else if (day == 1) { dayName = 'Thứ hai,' }
    else if (day == 2) { dayName = 'Thứ ba,' }
    else if (day == 3) { dayName = 'Thứ tư,' }
    else if (day == 4) { dayName = 'Thứ năm,' }
    else if (day == 5) { dayName = 'Thứ sáu,' }
    else if (day == 6) { dayName = 'Thứ bảy,' }
    else { };
    // Tạo và khai báo Excel
    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet('DỮ LIỆU LỊCH SỬ CẢNH BÁO', {
        pageSetup: { paperSize: 9, orientation: 'landscape' },
        properties: { tabColor: { argb: 'FFC0000' } },
    });
    // Page setup (cài đặt trang)
    worksheet.properties.defaultRowHeight = 20;
    worksheet.pageSetup.margins = {
        left: 0.3, right: 0.25,
        top: 0.75, bottom: 0.75,
        header: 0.3, footer: 0.3
    };
    // =====================THẾT KẾ HEADER=====================
    // Logo công ty
    const imageId1 = workbook.addImage({
        filename: 'public/images/LogoReport.png',
        extension: 'png',
    });
    worksheet.addImage(imageId1, 'A1:A3');
    // Style common
    let cellStyle = {
        font: {
            name: 'Times New Roman',
            bold: true,
            size: 16
        },
        alignment: {
            horizontal: 'center',
            vertical: 'middle'
        }
    };
    // Thông tin công ty
    worksheet.getCell('B1').value = 'TRUNG TÂM THIẾT KẾ KỸ THUẬT';
    worksheet.getCell('B2').value = 'PHÒNG THIẾT KẾ ĐIỆN ĐIỀU KHIỂN';
    worksheet.getCell('B3').value = 'Hotline:';
    worksheet.mergeCells('B1:E1');
    worksheet.mergeCells('B2:E2');
    worksheet.mergeCells('B3:E3');
    worksheet.getCell('B1').style = cellStyle;
    worksheet.getCell('B2').style = cellStyle;
    worksheet.getCell('B3').style = cellStyle;

    // Tên báo cáo
    worksheet.getCell('A5').value = 'DỮ LIỆU LỊCH SỬ CẢNH BÁO';
    worksheet.mergeCells('A5:F5');
    worksheet.getCell('A5').style = cellStyle;

    // Ngày in biểu
    worksheet.mergeCells('E6:F6');
    worksheet.getCell('E6').value = "Ngày in dữ liệu: " + dayName + date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    worksheet.getCell('E6').style = { font: { name: 'Times New Roman', bold: false, italic: true }, alignment: { horizontal: 'right', vertical: 'bottom', wrapText: false } };

    // Tên nhãn các cột
    var rowpos = 7;
    var collumName = ["STT", "THỜI GIAN", "ID", "TRẠNG THÁI", "NỘI DUNG CẢNH BÁO", "GHI CHÚ"]
    worksheet.spliceRows(rowpos, 1, collumName);

    // =====================XUẤT DỮ LIỆU EXCEL SQL=====================
    // Dump all the data into Excel

    worksheet.columns = [
        { key: 'STT' },
        { key: 'date_time' },
        { key: 'ID' },
        { key: 'Status' },
        { key: 'AlarmName' },
    ];

    SQL_Excel.forEach((e, index) => {
        rowIndex = index + rowpos;

        // Thêm dòng vào worksheet
        worksheet.addRow({
            STT: index + 1,
            ...e
        });
    });

    // Lấy tổng số hàng
    const totalNumberOfRows = worksheet.rowCount;


    // =====================STYLE CHO CÁC CỘT/HÀNG=====================
    // Style các cột
    const HeaderStyle = ['A', 'B', 'C', 'D', 'E', 'F']
    HeaderStyle.forEach((v) => {
        worksheet.getCell(`${v}${rowpos}`).style = { font: { name: 'Times New Roman', bold: true }, alignment: { horizontal: 'center', vertical: 'middle', wrapText: true } };
        worksheet.getCell(`${v}${rowpos}`).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }
    })
    // Cài đặt độ rộng cột
    worksheet.columns.forEach((column, index) => {
        column.width = 18;
    })
    // Set width header
    worksheet.getColumn(1).width = 22;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(5).width = 40;
    worksheet.getColumn(6).width = 30;

    // ++++++++++++Style cho các hàng dữ liệu++++++++++++
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        var datastartrow = rowpos;
        var rowindex = rowNumber + datastartrow;
        const rowlength = datastartrow + SQL_Excel.length
        if (rowindex >= rowlength + 1) { rowindex = rowlength + 1 }
        const insideColumns = ['A', 'B', 'C', 'D', 'E', 'F']
        // Tạo border
        insideColumns.forEach((v) => {
            // Border
            worksheet.getCell(`${v}${rowindex}`).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            },
                // Alignment
                worksheet.getCell(`${v}${rowindex}`).alignment =
                {
                    horizontal: 'center',
                    vertical: 'middle',
                    wrapText: true
                }
            // Font
            worksheet.getCell(`${v}${rowindex}`).font = {
                name: 'Times New Roman',
                size: 12
            };


        })
    })

    // =====================THẾT KẾ FOOTER=====================
    worksheet.getCell(`F${totalNumberOfRows + 2}`).value = 'Ngày ……tháng ………năm 20……';
    worksheet.getCell(`F${totalNumberOfRows + 2}`).style =
    {
        font:
        {
            name: 'Times New Roman',
            bold: true,
            italic: false
        },
        alignment:
        {
            horizontal: 'right',
            vertical: 'middle',
            wrapText: false
        }
    };

    worksheet.getCell(`B${totalNumberOfRows + 3}`).value = 'Trưởng bộ phận Thiết kế HT Giám sát';
    worksheet.getCell(`B${totalNumberOfRows + 4}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`B${totalNumberOfRows + 3}`).style =
    {
        font: {
            name: 'Times New Roman',
            bold: true,
            italic: false
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom',
            wrapText: false
        }
    };
    worksheet.getCell(`B${totalNumberOfRows + 4}`).style =
    {
        font: {
            name: 'Times New Roman',
            bold: false,
            italic: true
        },
        alignment: {
            horizontal: 'center',
            vertical: 'top',
            wrapText: false
        }
    };

    worksheet.getCell(`F${totalNumberOfRows + 3}`).value = 'Người in dữ liệu';
    worksheet.getCell(`F${totalNumberOfRows + 4}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`F${totalNumberOfRows + 3}`).style = { font: { name: 'Times New Roman', bold: true, italic: false }, alignment: { horizontal: 'center', vertical: 'bottom', wrapText: false } };
    worksheet.getCell(`F${totalNumberOfRows + 4}`).style = { font: { name: 'Times New Roman', bold: false, italic: true }, alignment: { horizontal: 'center', vertical: 'top', wrapText: false } };

    // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
   
    // // Return
    // return [SaveAslink, Bookname]
    workbook.xlsx.writeBuffer().then((Buffer) => {
        socket.emit('send_Excel_Alarm_Report', Buffer);
    });

} // Đóng fn_excelExport

/*================================================================
                   N.2 Excel Dữ liệu login          
=================================================================*/
function fn_excel_Data_Export(socket) {
    // =====================CÁC THUỘC TÍNH CHUNG=====================
    // Lấy ngày tháng hiện tại
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let day = date_ob.getDay();
    var dayName = '';
    if (day == 0) { dayName = 'Chủ nhật,' }
    else if (day == 1) { dayName = 'Thứ hai,' }
    else if (day == 2) { dayName = 'Thứ ba,' }
    else if (day == 3) { dayName = 'Thứ tư,' }
    else if (day == 4) { dayName = 'Thứ năm,' }
    else if (day == 5) { dayName = 'Thứ sáu,' }
    else if (day == 6) { dayName = 'Thứ bảy,' }
    else { };
    // Tạo và khai báo Excel
    let workbook = new Excel.Workbook()
    // Tên TAB
    let worksheet = workbook.addWorksheet('DỮ LIỆU HỆ THỐNG', {
        pageSetup: { paperSize: 9, orientation: 'landscape' },
        properties: { tabColor: { argb: 'FFC0000' } },
    });
    // Page setup (cài đặt trang)
    worksheet.properties.defaultRowHeight = 20;
    worksheet.pageSetup.margins = {
        left: 0.3, right: 0.25,
        top: 0.75, bottom: 0.75,
        header: 0.3, footer: 0.3
    };
    // =====================THẾT KẾ HEADER=====================
    // Logo công ty
    const imageId1 = workbook.addImage({
        filename: 'public/images/LogoReport.png',
        extension: 'png',
    });
    worksheet.addImage(imageId1, 'A1:A3');
    // Style common
    let cellStyle = {
        font: {
            name: 'Times New Roman',
            bold: true,
            size: 16
        },
        alignment: {
            horizontal: 'center',
            vertical: 'middle'
        }
    };

    worksheet.getRow(8).height = 30;
    worksheet.getRow(5).height = 30;

    // Thông tin công ty
    worksheet.getCell('B1').value = 'Công Ty CP Tập đoàn Trường Hải(THACO)';
    worksheet.getCell('B2').value = 'Trung tâm R&D';
    worksheet.getCell('B3').value = 'Phòng Thiết kế Điện điều khiển';
    worksheet.mergeCells('B1:D1');
    worksheet.mergeCells('B2:D2');
    worksheet.mergeCells('B3:D3');
    worksheet.getCell('B1').style = cellStyle;
    worksheet.getCell('B2').style = cellStyle;
    worksheet.getCell('B3').style = cellStyle;

    // Tên báo cáo
    worksheet.getCell('A5').value = 'BÁO CÁO DỮ LIỆU THÔNG SỐ HỆ THỐNG';
    worksheet.mergeCells('A5:D5');
    worksheet.getCell('A5').style = cellStyle;

    // Ngày in biểu
    worksheet.mergeCells('C6:D6');
    worksheet.getCell('C6').value = "Ngày in dữ liệu: " + dayName + date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    worksheet.getCell('C6').style = { font: { name: 'Times New Roman', bold: false, italic: true }, alignment: { horizontal: 'right', vertical: 'bottom', wrapText: false } };

    // Tên nhãn các cột
    var rowpos = 8;
    var collumName = ["STT", "THỜI GIAN", "GIÁ TRỊ DÒNG ĐIỆN", "GIÁ TRỊ ĐIỆN ÁP"]
    worksheet.spliceRows(rowpos, 1, collumName);

    // =====================XUẤT DỮ LIỆU EXCEL SQL=====================
    // Dump all the data into Excel

    worksheet.columns = [
        { key: 'STT' },
        { key: 'Date' },
        { key: 'DC_Current' },
        { key: 'DC_Voltage' },
    ];

    SQL_Excel.forEach((e, index) => {
        rowIndex = index + rowpos;

        // Thêm dòng vào worksheet
        worksheet.addRow({
            STT: index,
            ...e
        });
    });

    // Lấy tổng số hàng
    const totalNumberOfRows = worksheet.rowCount;


    // =====================STYLE CHO CÁC CỘT/HÀNG=====================
    // Style các cột
    const HeaderStyle = ['A', 'B', 'C', 'D']
    HeaderStyle.forEach((v) => {
        worksheet.getCell(`${v}${rowpos}`).style = { font: { name: 'Times New Roman', bold: true }, alignment: { horizontal: 'center', vertical: 'middle', wrapText: true } };
        worksheet.getCell(`${v}${rowpos}`).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }
    })
    // Cài đặt độ rộng cột
    worksheet.columns.forEach((column, index) => {
        column.width = 18;
    })
    // Set width header
    worksheet.getColumn(1).width = 22;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 25;

    // ++++++++++++Style cho các hàng dữ liệu++++++++++++
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        var datastartrow = rowpos;
        var rowindex = rowNumber + datastartrow;
        const rowlength = datastartrow + SQL_Excel.length
        if (rowindex >= rowlength + 1) { rowindex = rowlength + 1 }
        const insideColumns = ['A', 'B', 'C', 'D']
        // Tạo border
        insideColumns.forEach((v) => {
            // Border
            worksheet.getCell(`${v}${rowindex}`).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            },
                // Alignment
                worksheet.getCell(`${v}${rowindex}`).alignment =
                {
                    horizontal: 'center',
                    vertical: 'middle',
                    wrapText: true
                }
            // Font
            worksheet.getCell(`${v}${rowindex}`).font = {
                name: 'Times New Roman',
                size: 12
            };


        })
    })

    // =====================THẾT KẾ FOOTER=====================
    worksheet.getCell(`D${totalNumberOfRows + 2}`).value = 'Ngày ……tháng ………năm 20……';
    worksheet.getCell(`D${totalNumberOfRows + 2}`).style =
    {
        font:
        {
            name: 'Times New Roman',
            bold: true,
            italic: false
        },
        alignment:
        {
            horizontal: 'right',
            vertical: 'middle',
            wrapText: false
        }
    };

    worksheet.getCell(`B${totalNumberOfRows + 3}`).value = 'Trưởng bộ phận Thiết kế HT Giám sát';
    worksheet.getCell(`B${totalNumberOfRows + 4}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`B${totalNumberOfRows + 3}`).style =
    {
        font: {
            name: 'Times New Roman',
            bold: true,
            italic: false
        },
        alignment: {
            horizontal: 'center',
            vertical: 'bottom',
            wrapText: false
        }
    };
    worksheet.getCell(`B${totalNumberOfRows + 4}`).style =
    {
        font: {
            name: 'Times New Roman',
            bold: false,
            italic: true
        },
        alignment: {
            horizontal: 'center',
            vertical: 'top',
            wrapText: false
        }
    };

    worksheet.getCell(`D${totalNumberOfRows + 3}`).value = 'Người in dữ liệu';
    worksheet.getCell(`D${totalNumberOfRows + 4}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`D${totalNumberOfRows + 3}`).style = { font: { name: 'Times New Roman', bold: true, italic: false }, alignment: { horizontal: 'center', vertical: 'bottom', wrapText: false } };
    worksheet.getCell(`D${totalNumberOfRows + 4}`).style = { font: { name: 'Times New Roman', bold: false, italic: true }, alignment: { horizontal: 'center', vertical: 'top', wrapText: false } };

    // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
    workbook.xlsx.writeBuffer().then((Buffer) => {
        socket.emit('send_Excel_Data_Report', Buffer);
    });

} 

/*====================================================================================
                                   O. XUẤT EXCEL            
=====================================================================================*/
/*================================================================
                           O.1 Alarm        
=================================================================*/
io.on("connection", function (socket) {
    console.log("Client connected!");

    socket.on("msg_Excel_Alarm_Report", function () {
        fn_excel_Alarm_Export(socket);
    });
});

/*================================================================
                          O.2 Data     
=================================================================*/
io.on("connection", function (socket) {
    console.log("Client connected!");

    socket.on("msg_Excel_Data_Report", function () {
        fn_excel_Data_Export(socket);
    });
});

