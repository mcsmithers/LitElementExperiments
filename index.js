import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

class MyElement extends LitElement {
  static get properties() {
    return { 
      actors: { type: Array },
      actor: {type: String},
      starred: {type: Boolean}
    };
  }
 constructor() {
  super();
  this.actors = [
    {
      name: "Bryan Cranston",
      books: 3,
      starred: false,
    },
    {
      name: "Aaron Paul",
      books: 62,
      starred: true,
    },
    {
      name: "Bob Odenkirk",
      books: 0,
      starred: false,
    }
];
  // Actor is blank at first before the user inputs it
  this.actor = '';
  this.addEventListener('click', this.starredClickHandler);
  }
  toggle() {
  this.pressed = !this.pressed;
  }
  render() {
    return html`
    <!--external scripts for styling-->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
        <!--internal styling-->
    <link rel="stylesheet" href="./index.css">
    <div class="container">
      <ul class="demo-list-two mdl-list">${this.actors.map(item => html`
        <li class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-avatar">person</i>
          <span>${item.name}</span>
          <span class="mdl-list__item-sub-title">${item.books} Books</span>
        </span>
          <span class="mdl-list__item-secondary-content">
            <a class="mdl-list__item-secondary-action" @click=${this.starredClickHandler}></a>
            ${item.starred ? 
        html`<a class="mdl-list__item-secondary-action" href="#"><i class="material-icons star-closed">star</i></a>` :
        html`<a class="mdl-list__item-secondary-action" href="#"><i class="material-icons star-open">star_border</i></a>`}
            </a>
          </span>`)}
        </li>
        <div class="mdl-textfield mdl-js-textfield">
          <input class="mdl-textfield__input" type="text" id="actor-input" .value=${this.actor} @input=${this.handleInput}/>
          <label class="mdl-textfield__label" for="actor-input">Name</label>
          <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" @click=${this.addNewActor}>
            <i class="material-icons">add</i>
          </button>
        </div>
      </ul>
     </div>
    `;
  }

 // Handle what user types into the input box
 handleInput(e) {
  this.actor = e.target.value;
  }
  
  addNewActor() {

    const newActorObj = { 
      name: this.actor,
      books: 0,
      starred: false
    }
    
    this.actors.push(newActorObj);
    console.log(this.actors);
    this.requestUpdate()
  }
  
  // When starred is clicked, it changes the status from true to false and vice versa
   starredClickHandler(event) {
   this.actors.starred = !this.actors.starred;
   console.log('Changed to ', this.actors.starred);
   this.requestUpdate(this.actors.starred);
  }

  
}
customElements.define('my-element', MyElement);
