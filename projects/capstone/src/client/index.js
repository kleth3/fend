import { performAction } from "./js/app";

import "./styles/style.scss";

const btn = document.getElementById('generate');
btn.addEventListener('click', performAction);

export { performAction }