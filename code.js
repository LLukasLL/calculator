let str_keyValue = "";
let str_upper_field = "";
let str_input_field = "";
let str_equation = "";

function updateDisplay () {
    document.getElementById("first-line").innerHTML = str_upper_field;
    document.getElementById("second-line").innerHTML = str_input_field;
}

function shift_lines(str_operator) {
    if (str_input_field != "+" && str_input_field != "-" && str_input_field != "/" &&  str_input_field != "*" ) {
        str_upper_field = str_input_field;
        str_input_field = str_operator;
        str_equation += str_upper_field; 
        updateDisplay();
    }
};

function eval_equation() {
    str_equation += str_input_field;
    let evaluation = eval(str_equation);
    str_upper_field = "=";
    str_input_field = String(evaluation);
    str_equation = "";
    updateDisplay();
};

function eraseDisplay () {
    str_upper_field = "";
    str_input_field = "";
    str_equation = "";
    updateDisplay();
}

function updateCalculator (e) {
    if (e.target.classList == "number") {
        if (str_input_field != "" && str_upper_field == "=") eraseDisplay();
        str_keyValue = e.target.innerText;
        str_input_field += str_keyValue;
        second_line = document.getElementById("second-line");
        second_line.innerHTML = str_input_field;
    }
    if (e.target.id == "." ) {
        const array_input_field = str_input_field.split("");
        const has_point = array_input_field.some(letter => letter == ".");
        if (has_point == false) {
            console.log("pointy");
            str_keyValue = e.target.innerText;
            str_input_field += str_keyValue;
            second_line = document.getElementById("second-line");
            second_line.innerHTML = str_input_field;
        }
    }
    if (e.target.classList == "operator") {
        if (e.target.id == "+") shift_lines("+");
        if (e.target.id == "-") shift_lines("-");
        if (e.target.id == "x") shift_lines("*");
        if (e.target.id == "%") shift_lines("/");
    }
    if (e.target.id == "equal") eval_equation();

    if (e.target.id == "AC") eraseDisplay();

    if (e.target.id == "C") {
        if (str_input_field.length > 0) str_equation = str_equation.slice (0, -1);
        str_input_field = str_input_field.slice (0, -1);
        updateDisplay();
    }
};

const buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(button => button.addEventListener("click", updateCalculator));