const buttons = document.getElementsByClassName("btn");
const buttonsArray = Array.from(buttons); // перетворюю всі кнопки в масив, щоб пройтись по них методом forEach
const C = document.getElementById("C");
const displayTextOutput = document.getElementById("display-output");

let a = ''; // first number
let b = ''; // second number
let sign = ''; // знак операції
let finish = false;

const digit = [
"0",
"1",
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9",
"."
];

const action = ["-", "+", "x", "/", "%", "←", "√"];

const clearAll = () => {
    a = '';
    b = '';
    sign = '';
    finish = false;
    displayTextOutput.textContent = '0';
}

C.addEventListener("click", clearAll);


buttonsArray.forEach(button => {
    button.addEventListener("click", (event) => {
        if (!event.target.classList.contains('btn')) return;
        
        displayTextOutput.textContent = '0';

        // отримую натиснуту кнопку на екран
        const key = event.target.textContent;

        if (key === "←"){
            a = a.slice(0, -1);
            if(a.length <= 0) {
                a = '';
                
            }
            displayTextOutput.textContent = a;
            return;
        }

        if (key === "√") {
            // викликати функцію для піднесення останнього символу до квадрату
            const sqrt = Math.sqrt(a);
            a = sqrt;
            return;
        }

        // Якщо натиснута кнопка цифри 0-9 або .
        if (digit.includes(key)) {
            if(b === '' && sign === ''){
            a += key;
            displayTextOutput.textContent = a;
            } else if(a !== '' && b !== '' && finish) {
                b = key;
                finish = false;
                displayTextOutput.textContent = b;

            } else {
                b += key;
                displayTextOutput.textContent = b;
            }
            console.log(a, b, sign);
            return;
        }

        if(action.includes(key)) {
            sign = key;
            displayTextOutput.textContent = sign;
            console.log(a, b, sign);
            return;
        }

        // натиснута кнопка =

        if(key === '=') {
            if(b === '') {
                b = a;
            }
            switch(sign) {
                case "+":
                    a = (+a) + (+b);
                    break;

                case "-":
                    a = (+a) - (+b);
                    break;

                case "x":
                    a = (+a) * (+b);
                    break;

                case "/":
                    a = (+a) / (+b);
                    break;

                case "%":
                    a = (+a) * (+b) / 100;
                    break;

                    default:
                    break;
            }
            finish = true;
            displayTextOutput.textContent = a;
            console.log(a, b, sign);
        }

        // Обмеження довжини тексту
        if (displayTextOutput.textContent.length >= 10) {
    alert("Максимальна довжина екрану - 10 символів!");
    displayTextOutput.textContent = null;
        }
    });
});