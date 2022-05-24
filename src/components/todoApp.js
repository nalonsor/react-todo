import { useState, useEffect } from "react"
import Todo from "./todo"

import "./todoApp.css"

export default function TodoApp(){


    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState([])

    useEffect(() => {
        loadTodos()
    },[])

    function loadTodos(){
        var lsTodos = (localStorage.getItem("todos")) ? localStorage.getItem("todos") : [] ;
        lsTodos = JSON.parse(lsTodos)
        console.log(lsTodos)
        setTodos(lsTodos)
    }

    function saveTodos(todos){
        localStorage.setItem("todos",JSON.stringify(todos))
    }

    function handleChange(e){
        e.preventDefault()
        const valor = e.target.value
        setTitle(valor)
    }

    function handleSubmit(e){
        e.preventDefault()

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }

        const tempTodos = [...todos] // copia de todos
        tempTodos.unshift(newTodo) // insertamos el nuevo todo

        setTodos(tempTodos) // setea el nuevo arr de todos
        saveTodos(tempTodos)
        setTitle('')
    }

    function handleUpdate(id,valor){
        console.log(id)
        const tempTodos = [...todos]
        const t = tempTodos.find(t => t.id === id)
        t.title = valor
        setTodos(tempTodos)
        saveTodos(tempTodos)
    }

    function handleDelete(id){
        const tempTodos = todos.filter(t => t.id !== id)
        setTodos(tempTodos)
        saveTodos(tempTodos)
    }

    return <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input type="text" className="todoInput" value={title} onChange={handleChange}></input>
            <input 
                type="submit" 
                value="Enviar" 
                className="buttonCreate"
                onClick={handleSubmit}
            ></input>

            
        </form>

        <div className="todosContainer">
            {
                todos.map(t => (
                    <Todo 
                        t={t} 
                        key={t.id} 
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))
            }
        </div>

    </div>
}