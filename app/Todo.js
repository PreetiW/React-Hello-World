import React from 'react';
import one from '../one.jpg';
require("@babel/polyfill");

class Todo extends React.Component {
  constructor() {
    super()
    this.state = {
      currentTodo: '',
      todos: [],
      audioUrl: ''
    }

    

  }

  componentWillMount(){
    console.log("Component will Mount")
  

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => { 
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        this.playAudio(audioUrl);
        let urls = [];
        this.addToCache([audioUrl])
      });

      setTimeout(() => {
        mediaRecorder.stop();
      }, 10000);
    });
  }

  addTodo = () => {
    const id = this.state.todos.slice(-1)[0].id + 1
    const todo = this.state.currentTodo
    this.setState({
      todos: [...this.state.todos, { id, title: this.state.currentTodo }],
      currentTodo: ''
    }, () => {
      const response = fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, title: todo })
      })
    })
  }

  playAudio = (audioUrl) => {
    if(audioUrl !== ''){
      console.log("Audio URL:", audioUrl, typeof audioUrl);
      const audio = new Audio(audioUrl);
      audio.play();
      this.setState({ audioUrl })
    }
  }

  handleTextInput = (e) => {
    const { target: { value } } = e
    this.setState({
      currentTodo: value
    })
  }

  render() {
    console.log("Rendering");
    const { todos } = this.state
    return (
      <React.Fragment>
        <ul>
        {
          todos.map((todo, index) => (
            <li key={`${todo.id}_${index}`}>{todo.title}</li>
          ))
        }
        </ul>
        <input type='text' onChange={this.handleTextInput} />
        <button onClick={this.addTodo}>Add</button>
        <button onClick={() => {this.playAudio(this.state.audioUrl)}}>Play Audio</button>
        <img src={one} />
      </React.Fragment>
    )
  }

  async addToCache(urls) {
    const myCache = await window.caches.open('my-cache');
    await myCache.addAll(urls);
  }

  componentDidMount () {

    /*window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
    window.msIndexedDB;
     
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || 
    window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || 
    window.webkitIDBKeyRange || window.msIDBKeyRange
    console.log("Preeti is awesome!!");
    if (!window.indexedDB) {
       window.alert("Your browser doesn't support a stable version of IndexedDB.")
    } else {
      window.alert("Your browser doesn't support a stable version of IndexedDB.")
      
    }*/

    console.log("Window Object:", window);

    fetch('http://localhost:8000/todos')
    .then(response => response.json())
    .then(todos => this.setState({todos}))
    .catch(function(error){
      console.log("Errors", error)
    })

     /* const response = await fetch('http://localhost:8000/todos')
      const todos = await response.json()
      this.setState({
          todos
      })*/
  }
}

export default Todo