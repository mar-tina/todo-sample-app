import { html, createShadowElement } from "shadow-render";
import { todoItems, todoItem } from "./appStyle.js";
import { sanitize } from "./utils.js";

let TodoList = createShadowElement({
  state: {
    todos: []
  },
  lifecycle: {
    onMount: ctx => {
      let res = ctx.actions.subscribe(ctx, ctx.provider);
      ctx.state.proxyObject = res.providers["todoCtx"].proxyObject;
    }
  },
  methods: {
    markAsDone: (e, args) => {
      args.ctx.state.todos.map(item => {
        if (item.id === args.bound) {
          item.done = !item.done;
        }
      });

      args.ctx.state.proxyObject.todos = args.ctx.state.todos;
    },
    deleteTodo: (e, args) => {
      let newTodos = args.ctx.state.todos.filter(
        item => item.id !== args.bound
      );
      args.ctx.state.proxyObject.todos = newTodos;
    },
    handleEdit: (e, args) => {
      args.ctx.state.todos.map(item => {
        if (item.id === args.bound) {
          item.name = sanitize(e.target.innerText);
        }
      });
      args.ctx.state.proxyObject.todos.map(item => {
        if (item.id === args.bound) {
          item.name = sanitize(e.target.innerText);
        }
      });
    }
  },

  actions: {
    subscribe: (self, contextProvider) => {
      let callback = {
        listenOn: "set",
        f: (property, args) => {
          if (property === "todos") {
            self.setState({
              todos: args
            });
          }
        }
      };
      try {
        return contextProvider.subToContext("todoCtx", callback);
      } catch (error) {
        console.log("Failed", error);
      }
    }
  },
  template: ctx => {
    return html(`
            <div style="text-align:center;"> All the todos </div>
            <div style="${todoItems}" id="todoList"> ${todoList(
      ctx.state
    )} </div>
        `);
  }
});

let todoList = state => {
  return `${state.todos
    .map(
      x =>
        ` <div @oninput="handleEdit" contentEditable=${true} style="${todoItem}" id=${x.id +
          "none"}  bind=${x.id}>  ${x.name} </div> 
            <div style="text-align:center;"> 
            <!-- Append a randomized string to svg ID to avoid more than one element sharing the same id -->
            <svg id=${x.id + "rand"} @onclick="deleteTodo"  bind=${
          x.id
        } xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

            <!-- Append a randomized string to svg ID to avoid more than one element sharing the same id -->
            <svg id=${x.id + "abs"} @onclick="markAsDone" bind=${
          x.id
        }  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke=${
          x.done ? "green" : "black"
        } stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>`
    )
    .join("")}`;
};

customElements.define("todo-list", TodoList);
