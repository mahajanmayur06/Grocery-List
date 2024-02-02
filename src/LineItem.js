import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';


const LineItem = ({ item, handleCheck, handleDelete }) => { // dealing with individual item component
    return (
      <li className="item">
                  <input
                      type="checkbox"
                      onChange={() => handleCheck(item.id)}
                      checked={item.checked}
                  />
                  <label
                      style={{
                      textDecoration: item.checked ? 'line-through' : 'none'
                      }}
                      onDoubleClick={() => handleCheck(item.id)}
                  >
                      {item.item}
                  </label>
                  <FaTrashAlt
                      onClick={() => handleDelete(item.id)}
                      role="button"
                      tabIndex="0"
                      aria-label= {`Delete ${item.item}`}
                  />
      </li>
    )
}

export default LineItem