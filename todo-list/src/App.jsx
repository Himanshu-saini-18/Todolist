import { useEffect, useState } from "react"
import { Navbar } from "./component/Navbar"
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function App() {
  const[todos,setTodos]=useState([]);
  const[todo,setTodo]=useState("");
  const[showFinished,setShowFinished]=useState(true);
useEffect(()=>{
   let todoString = localStorage.getItem("todos");
   if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
   }
   },[]);


  const handleAdd=()=>{
      setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
      setTodo("");
      saveToLocal()
  }

  const saveToLocal= (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const toggleFinished=(e)=>{
      setShowFinished(!showFinished);
  }

  const handleEdit=(e,id)=>{
     let t= todos.filter(i=>i.id===id)
     setTodo(t[0].todo);
     let newTodos=todos.filter(item=>{
      return item.id!=id;
    });
    setTodos(newTodos);
    saveToLocal()
  }

  const handleDelete=(e,id)=>{
      let newTodos=todos.filter(item=>{
        return item.id!=id;
      });
      setTodos(newTodos);
      saveToLocal()
  }
  const handleChange=(event)=>{
    setTodo(event.target.value);
    
  }

  const handleCheckbox=(event)=>{
    let id=event.target.name;
    let index = todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos = [...todos];
     newTodos[index].isCompleted =  !newTodos[index].isCompleted;
     setTodos(newTodos);
     saveToLocal()
  }

  return (
    <>
      <Navbar/>
     <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2'> 
     <h1 className="font-bold text-center text-3xl">iTask - Manage your todos at one place</h1>    
       <div className="addtodo my-5 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Add a  Todos</h2>
        <div className="flex">
        <input type="text" className="w-full rounded-lg px-5 py-1" onChange={handleChange} value={todo}/>
        <button onClick={handleAdd} disabled={todo.length<=3}
         className=" mx-2 rounded-full bg-violet-500 text-sm font-bold disabled:bg-violet-900 hover:bg-violet-700 p-3 py-1 text-white   ">Save</button>
        </div>

        </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className="m-5">No Todos to display</div> }
          {todos.map(item=>{
          return (showFinished || !item.isCompleted)  && <div key={item.id} className="todo flex md:w-full my-3 justify-between">
            <div className="flex gap-5">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id=""/>
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className="bg-violet-500 text-sm font-bold hover:bg-violet-700 p-3 py-1 text-white  rounded-md mx-1"><CiEdit /></button>
                <button onClick={(e)=>handleDelete(e,item.id)} className="bg-violet-500 text-sm font-bold hover:bg-violet-700 p-3 py-1 text-white  rounded-md mx-1"><MdDelete /></button>
              </div>
          </div>
           })}
        </div>
      </div>
      
    </>
  )
}

export default App
