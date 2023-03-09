import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App(): JSX.Element {

  const[tasks,setTasks] = useState([
        {id: 1, title: "HTNL & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: false},
      {id: 4, title: "Redax", isDone: false},
    ])
const remoteTask = (taskId: number) => {
 setTasks(tasks.filter(task => task.id!==taskId))
  console.log(tasks)
}

    return (
        <div className="App">
            <Todolist
                remoteTask={remoteTask}
                title={"Whats to learn"}
                tasks={tasks}
            />
        </div>
    );
}

export default App;
