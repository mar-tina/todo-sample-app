import { html, createShadowElement } from "shadow-render";
import { mainContainer, logTodoContainer, todoListHolder } from "./appStyle.js";
import "./todolist.js";
import "./todo.js";
import "./logger.js";
import "./header.js";

let Myapp = createShadowElement({
  lifecycle: {
    onMount: () => {
      console.log("Mounted App");
    }
  },

  template: ctx => {
    return html(`
        <header-el> </header-el>
        <div style="${mainContainer}">
          <p> TODOS </p>
          <todo-el> </todo-el>
          <div style="${logTodoContainer}">
            <todo-list> </todo-list>
            <log-todo> </log-todo>
          </div>
        </div>`);
  }
});

customElements.define("main-app", Myapp);
