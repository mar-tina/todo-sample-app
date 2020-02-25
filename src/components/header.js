import { html, createShadowElement } from "shadow-render";
import { headerItem } from "./appStyle.js";

let Header = createShadowElement({
  template: () => {
    return html(`
           <div style="${headerItem}">
                <h2> Big Brain Todo App  </h2> 
           </div>
        `);
  }
});

customElements.define("header-el", Header);
