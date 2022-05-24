import { useState } from "react"

export default function Todo({t, onUpdate, onDelete}){

    const [isEdit, setIsEdit] = useState(false) 
    const [newVal, setNewVal] = useState(t.title)

    function FormEdit(){

        console.log('form print!');

        function handleSubmit(e){
            e.preventDefault()
        }

        function handleChange(e){
            const valor = e.target.value
            setNewVal(valor)
        }

        function handleClickUpdateTodo(e){
            onUpdate(t.id, newVal)
            setIsEdit(false)
        }

        return <form className="todoUpdateForm" onSubmit={handleSubmit}>
            <input type="text" className="todoInput" value={newVal} onChange={handleChange} />
            <button className="button" onClick={handleClickUpdateTodo}>Update</button>
        </form>
    }

    function TodoElement(){
        return <div className="todoInfo">
                    <span className="todoTitle">
                        {t.title}
                    </span>
                    <button onClick={() => setIsEdit(true)} className="button" >Edit</button>
                    <button onClick={() => onDelete(t.id)} className="buttonDelete" >Delete</button>
                </div>
    }

    return(
        <div className="todo">
            { isEdit ? <FormEdit /> : <TodoElement /> }
        </div>
    ) 
}