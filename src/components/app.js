import { html, createShadowElement } from "shadow-render";
import { mainContainer } from "./appStyle.js";
import "./todolist.js";
import "./todo.js";

let Myapp = createShadowElement({
  lifecycle: {
    onMount: () => {
      console.log("Mounted App");
    }
  },

  template: ctx => {
    return html(`
        <div style="${mainContainer}">
          <p> TODOS </p>
          <todo-el> </todo-el>
          <todo-list> </todo-list>
        </div>`);
  }
});

customElements.define("main-app", Myapp);
