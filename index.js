const button = document.querySelector("#button");
const userType = document.querySelector("#usertype");
const address = document.querySelector("#address");
const kilowatts = document.querySelector("#kilowatts");


button.addEventListener("click", (e) => {
    e.preventDefault();
    let valid = validateInputs(userType.value, address.value, kilowatts.value);
    if (valid) {
        calculateElectricityCost();
    } else {
        sendError("Los datos ingresados son inválidos");
    }
});


function validateInputs(userType, address, kilowatts) {
    console.log(userType);
    console.log(address);
    console.log(kilowatts);
}


function calculateElectricityCost(userType, address, kilowatts) {
    
}


function sendError(message) {

}