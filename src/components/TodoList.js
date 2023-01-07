import React from "react";
import "./TodoList.css";
import { RiDeleteBin3Fill, RiImageEditFill } from "react-icons/ri";

function TodoList(props) {
  const { deleteItem, editItem, item } = props;
  return (
    <>
      {item?.length !== 0
        ? item.map((data, id) => {
            return (
              <div className="item" key={data.id}>
                <div className="data_div">
                  <span>{data.name}</span>
                </div>
                <div className="btns">
                  <div onClick={() => deleteItem(data.id)}>
                    <RiDeleteBin3Fill style={{ cursor: "pointer" }} />
                  </div>
                  <div onClick={() => editItem(data.id)}>
                    <RiImageEditFill style={{ cursor: "pointer" }} />
                  </div>
                </div>
              </div>
            );
          })
        : "No item to display..."}
    </>
  );
}

export default TodoList;
