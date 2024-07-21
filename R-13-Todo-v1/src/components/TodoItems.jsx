import React from 'react'
import TodoItem from './TodoItem'

const TodoItems = ({ todoItems }) => {
    return (
        <div className="items-container">
            {
            todoItems.map((item, index)=> {
                return <TodoItem todoDate={item.dueDate} todoName={item.name}></TodoItem>
            })
            }
        </div>
    )
}

export default TodoItems