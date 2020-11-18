import { performAction } from "./js/app";
import { validateInput } from "./js/validateInput";
import { getCountdown } from "./js/getCountdown";
import { getTripLength } from "./js/getTripLength";
import { updateUI } from "./js/updateUI";

import "./styles/style.scss";
import "./styles/base.scss";
import "./styles/form.scss";

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('generate');
    btn.addEventListener('click', performAction);

    const start = document.getElementById('start');
    start.onchange = function() {
        if(start.value == ''){
            start.classList.add('empty');
        }
        else {
            start.classList.remove('empty');
        }
    }

    const end = document.getElementById('end');
    end.onchange = function() {
        if(end.value == ''){
            end.classList.add('empty');
        }
        else {
            end.classList.remove('empty');
        }
    }
})

export { performAction, validateInput, getCountdown, getTripLength, updateUI }