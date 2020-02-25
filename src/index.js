import { init, html } from "shadow-render";

import "./components/app.js";

let newtemplate = html(
  `<div>  
     <main-app> </main-app> 
  </div>`
);

const myTemplate = () => newtemplate;

init("#app", myTemplate());
