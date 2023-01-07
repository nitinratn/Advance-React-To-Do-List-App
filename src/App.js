import {useState} from "react";
import uuid from 'react-uuid';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from "./components/TodoList";

function App() {
  const [value, setValue] = useState("");
  const [item, setItem] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [editItemId, setEditItemId] = useState();
  
  function handleChange(e){
    // console.log(e.target.value);
    setValue(e.target.value);
  }
  function addItem(){
    if(toggleBtn){
      const newList = item.map((val) => {
        if(val.id === editItemId){
          return{...val, name: value}
        }
        return val;
      })
      setItem(newList);
      setValue('');
      setToggleBtn(false);
      setEditItemId();
      toast.info("Item updated successfully...");
    }else{
      const valueObj = { id: uuid().toString(), name: value };
      setItem((previousItems) => [...previousItems, valueObj]);
      setValue("");
      setToggleBtn(false);
      toast.success("Item added successfully...");
    }
    
    
  }
  function deleteItem(id){
    const deleted = item.filter((val) => {
      return val.id !== id;
    })
    console.log("id", id);
    setItem(deleted);
    toast.error("Item deleted successfully...");
  }
  function handleDeleteAll(){
    setItem("");
    toast.error("All Items deleted successfully...");
  }
  function editItem(id){
    const edit = item.find((val) => {
      return id === val.id;
    })
    console.log("edit", edit)
    setValue(edit.name);
    setToggleBtn(true);
    setEditItemId(id);
  }
  return (
    <div className="App">
      <div className="parent_div">
        <h1>React To-Do List App</h1>
        <div className="upper_half">
          <div className="input_div">
            <input
              type="search"
              placeholder="To-do..."
              value={value}
              onChange={handleChange}
            />
          </div>
          <div className="btn_div">
            <button
              className="add_btn"
              onClick={addItem}
              disabled={value?.length <= 2 ? true : false}
            >
              {toggleBtn ? "Update Item" : "Add Item"}
            </button>
            <button className="deleteAll_btn" onClick={handleDeleteAll}>
              Delete All
            </button>
          </div>
        </div>
        <div className="lower_half">
          <TodoList deleteItem={deleteItem} editItem={editItem} item={item} />
          <ToastContainer theme="colored" autoClose={2000} />
        </div>
      </div>
    </div>
  );
}

export default App;
