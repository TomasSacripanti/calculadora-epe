//Elementos HTML para consumir los datos del usuario
const button = document.querySelector("#button");
const userType = document.querySelector("#usertype");
const address = document.querySelector("#address");
const kilowatts = document.querySelector("#kilowatts");

// Elementos HTML para mostrar resultados
let totalParagraph = document.querySelector('.total-cost');
let ivaParagraph = document.querySelector('.iva-cost');
let noIvaCost = document.querySelector('.no-iva-cost');
let resultsDiv = document.querySelector('.results');

// Elemento HTML del Spinner de carga
let spinner = document.querySelector('.sk-circle');

// Elementos HTML para mensaje de error 
let errorParagraph = document.querySelector('.error-message');
let errorDiv = document.querySelector('.error');


// Evento ejecutado al momento de pedir un cálculo eléctrico
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


// Validación de inputs
function validateInputs(userType, address, kilowatts) {
    if (typeof kilowatts === "number" && kilowatts > 0 ) {
        return [userType, address, kilowatts];
    }
    return [];
}

// Calculo del costo eléctrico
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
    let servicePrice = (kilowattsAmount * costKWH);
    let ivaCost = servicePrice * iva;
    let totalPrice = BASE_COST + (servicePrice + ivaCost);
    return [ivaCost, totalPrice];
}

// Muestra en pantalla los costos
function displayCosts(ivaCost, totalPrice) {
    cleanMessages();
    showSpinner(2000);
    setTimeout(() => {
        noIvaCost.textContent = `Costo del servicio: $${Math.round((totalPrice - ivaCost) * 100) / 100}`;
        ivaParagraph.textContent = `IVA: $${Math.round(ivaCost * 100) / 100}`;
        totalParagraph.textContent = `Precio total: $${Math.round(totalPrice * 100) / 100}`;
        resultsDiv.style.display = 'flex';
    }, 2000);
}

// Muestra el spinner de carga momentáneo
function showSpinner(time) {
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        return true;
    }, time);
}

// Muestra el mensaje de error
function sendError(message) {
    cleanMessages();
    showSpinner(1000);
    setTimeout(() => {
        errorParagraph.textContent = message;
        errorDiv.style.display = 'flex';
    }, 1000);
}

// Limpia los mensajes, tanto los resultados del costo eléctrico como el de error
function cleanMessages() {
    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    noIvaCost.textContent = '';
    totalParagraph.textContent = '';
    ivaParagraph.textContent = '';
    errorParagraph.textContent = '';
}