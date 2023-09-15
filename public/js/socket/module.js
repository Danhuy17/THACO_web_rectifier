//screen_module

const modules = ['DC_Voltage', 'DC_Current', 'Temperature_DC', 'Temperature_Environment', 'StateWord'];

for (let i = 1; i <= 42; i++) {
    modules.forEach((module) => {
        socket.on(`${module}_${i}`, function (data) {
            document.querySelector(`#module_${module}_${i}`).textContent = data;
        });
    });
}

