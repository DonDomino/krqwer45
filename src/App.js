import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      error : false
    }
    this.trackInput = this.trackInput.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  trackInput(event){
    this.setState({
      newTask : event.target.value
    })
  }

  addTask(event){
    event.preventDefault();
    if(this.state.newTask.length > 1){
      this.setState({
        tasks : this.state.tasks.concat(
          {
            name : this.state.newTask,
            done : false
          }
        ),
        newTask : "",
        error : false
      })
    } else {
      this.setState({
        error : true
      })
    }    
  }

  checkTask(e){
    const index = this.state.tasks.findIndex(task => 
      task.name === e.target.innerHTML
    );
    this.setState({
      tasks: this.state.tasks.map((task, i) =>
        i === index ? {name: task.name, done: !task.done}: task
      )
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li className={task.done ? 'done' : ""} onClick={this.checkTask.bind(this)} key={index}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.addTask}>
            <input type="text" id="new-task" className={this.state.error ? 'error' : ''} placeholder="Ingresa una tarea y oprime Enter" value={this.state.newTask} onChange={this.trackInput}/>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
