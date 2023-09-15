//______________YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA______________
var myVar = setInterval(myTimer, 100);
function myTimer() {
    socket.emit("Client-send-data", "Request data client");
}

// Hàm hiển thị dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix){
    socket.on(tag,function(data){
        if(tofix == 0){
            document.getElementById(IOField).value = data;
        } else{
        document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}

// Hàm chức năng hiển thị trạng thái symbol
function fn_ImageChange(ObjectID, SymName, Tag)
{
    var imglink_0 = "images/screen_main/" + SymName + "_0.png"; // Trạng thái tag = 0
    var imglink_1 = "images/screen_main/" + SymName + "_1.png"; // Trạng thái tag = 1
    socket.on(Tag, function(data){
        if (data == false)
        {
            document.getElementById(ObjectID).src = imglink_0;
        }
        else
        {
            document.getElementById(ObjectID).src = imglink_1;
        }
        
    });
}

//// Chương trình con chuyển trang
function fn_ScreenChange(scr_1, scr_2, scr_3, scr_4, scr_5, scr_6, scr_7)
{
    document.getElementById(scr_1).style.visibility = 'visible';   // Hiển thị trang được chọn
    document.getElementById(scr_2).style.visibility = 'hidden';    // Ẩn trang 1
    document.getElementById(scr_3).style.visibility = 'hidden';    // Ẩn trang 2
    document.getElementById(scr_4).style.visibility = 'hidden';   
    document.getElementById(scr_5).style.visibility = 'hidden';    
    document.getElementById(scr_6).style.visibility = 'hidden';    
    document.getElementById(scr_7).style.visibility = 'hidden';
}