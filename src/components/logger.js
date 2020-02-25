import { html, createShadowElement } from "shadow-render";
import { mainContainer, logHolder } from "./appStyle.js";
import "./todolist.js";
import "./todo.js";

let LogTodo = createShadowElement({
  state: {
    length: 0,
    updates: [],
    done: 0
  },
  lifecycle: {
    onMount: ctx => {
      let res = ctx.actions.subscribe(ctx, ctx.provider);
      ctx.state.proxyObject = res.providers["todoCtx"].proxyObject;
    }
  },

  actions: {
    getAllDoneTodos: todos => {
      let doneTodos = todos.filter(item => item.done === true);
      return doneTodos.length;
    },

    subscribe: (self, contextProvider) => {
      let callback = {
        listenOn: "set",
        f: (property, args) => {
          if (property === "todos") {
            let newDoneLength = self.actions.getAllDoneTodos(args);
            let newUpdate = self.actions.returnUpdate(
              self,
              args,
              newDoneLength
            );
            self.setState({
              updates: [...self.state.updates, newUpdate],
              length: args.length,
              done: newDoneLength
            });
          }
        }
      };
      try {
        return contextProvider.subToContext("todoCtx", callback);
      } catch (error) {
        console.log("Failed", error);
      }
    },

    returnUpdate: (self, args, newDoneLength) => {
      if (self.state.length < args.length) {
        return "Added a new Todo 👏🏾";
      } else if (self.state.length > args.length) {
        return "Yaay you did some cleanup 💃🏾";
      } else if (self.state.done < newDoneLength) {
        return "New milestone 💥";
      } else if (self.state.done > newDoneLength) {
        return `Was that a mistake ?  😳`;
      } else {
        return "We dont know whats going on sorry 💅🏽";
      }
    }
  },

  template: ctx => {
    return html(`
        <div> Today's logs <span> ${ctx.state.length} </span> Completed : <span> ${
        ctx.state.done
        } </span> </div>
        <div style="${logHolder}">
            
            ${ctx.state.updates.map(x => `<div> ${x} </div>`).join("")}
        </div>
    `);
  }
});

customElements.define("log-todo", LogTodo);
