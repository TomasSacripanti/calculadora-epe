const button = document.querySelector("#button");
const userType = document.querySelector("#usertype");
const address = document.querySelector("#address");
const kilowatts = document.querySelector("#kilowatts");


button.addEventListener("click", (e) => {
    e.preventDefault();
    let data = validateInputs(userType.value, address.value, parseInt(kilowatts.value));
    if (data.length > 0) {
        let prices = calculateElectricityCost(...data);
        displayCosts(...prices);
    } else {
        sendError("Los datos ingresados son inválidos");
    }
});


function validateInputs(userType, address, kilowatts) {
    if (typeof kilowatts === "number" && kilowatts > 0 ) {
        return [userType, address, kilowatts];
    }
    return [];
}


function calculateElectricityCost(user, address, kilowattsAmount) {
    const BASE_COST = 102;
    let costKWH;
    let iva;
    switch(user) {
        case 'residential':
            iva = 0.21;
            break;
        case 'industrial':
            iva = 0.27;
            break;
    }
    switch (address) {
        case 'north':
            costKWH = 5.6;
            break;
        case 'south':
            costKWH = 5.4;
            break;
        case 'west':
            costKWH = 5.35;
            break;
        case 'center':
            costKWH = 5.8;
            break;
    }
    let servicePrice = BASE_COST + (kilowattsAmount * costKWH);
    let ivaCost = servicePrice * iva;
    let totalPrice = servicePrice + ivaCost;
    return [servicePrice, ivaCost, totalPrice];
}

function displayCosts(servicePrice, ivaCost, totalPrice) {
    console.log(servicePrice, ivaCost, totalPrice);
}


function sendError(message) {
    console.log(message);
}