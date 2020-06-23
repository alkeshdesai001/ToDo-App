import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from '../../components/Modal/Modal';

import TableItem from "./TableItem/TableItem";
import "./TodoTable.scss";

const TodoTable = () => {
  const { tabData, group } = useSelector((state) => state.todo);

  const [listTodo, setListTodo] = useState([]);
  const [order, setOrder] = useState(1);
  const [sortBy, setSortBy] = useState("created");

  const sortHeaderHandler = (heading) => {
    console.log(heading, sortBy, order);
    if (heading === sortBy) {
      setOrder(-1 * order);
    } else {
      setSortBy(heading);
      setOrder(1);
    }
  };

  useEffect(()=>{
    setListTodo([...tabData])
  }, [tabData])

  useEffect(() => {

    const priority = (level) => {
      let lev;
      if (level === "HIGH") lev = 3 * order;
      else if (level === "MEDIUM") lev = 2 * order;
      else if (level === "LOW") lev = 1 * order;
      else if (level === "NONE") lev = 0 * order;
      return lev;
    };
    if (sortBy === "priority") {
      let groupedList = listTodo.sort((a, b) => {
        let textA = a.priority.toUpperCase();
        let textB = b.priority.toUpperCase();

        let levelA = priority(textA);
        let levelB = priority(textB);

        return levelA < levelB ? -1 : levelA > levelB ? 1 : 0;
      });
      setListTodo([...groupedList]);
    }
  }, [sortBy, order]);

  const [open, setOpen] = React.useState(false);


  return (
    <>
    <Modal open={open} setOpen={setOpen} />
      <div className="table tableHeader">
        <div className="summary">
          Summary
          <button onClick={() => sortHeaderHandler("summary")}>^</button>
        </div>
        <div className="priority">
          Priority
          <button onClick={() => sortHeaderHandler("priority")}>^</button>
        </div>
        <div className="created">
          Created On
          <button onClick={() => sortHeaderHandler("created")}>^</button>
        </div>
        <div className="due">
          Due By <button onClick={() => sortHeaderHandler("due")}>^</button>
        </div>
        <div className="actions"> Actions </div>
      </div>
      {listTodo.map((todo) => (
        <TableItem todo={todo} key={todo.id} group={group} />
      ))}
    </>
  );
};

export default TodoTable;
