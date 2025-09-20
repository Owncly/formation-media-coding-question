import { useState, useEffect } from 'react';
import externalMenuService from '../services/externalMenuService';
import internalMenuService from '../services/internalMenuService';
import '../styles/EditJsonTree.css';
import { FaPencilAlt, FaArrowUp, FaArrowDown, FaIndent, FaOutdent, FaTrash } from 'react-icons/fa';

// Generating unique IDs to keep correct track across state of the tree elements. Prefix used to help see structure
let idCounter = 0;
function generateId(prefix = '') {
  idCounter += 1;
  return `${prefix}el-${idCounter}`;
}

// Assigning IDs recursively
function assignIds(elements, prefix = '') {
  return elements.map((element) => {
    const id = generateId(prefix);
    const updatedElement = { ...element, id };
    if (Array.isArray(element.submenu)) {
      updatedElement.submenu = assignIds(element.submenu, `${id}-`);
    }
    return updatedElement;
  });
}

// To keep the dot and + consistent, we need the update parent and grandparent of the tree to verify behavior when unindenting 
const JsonTree = ({
  index,
  parent,
  updateParent,
  grandParent = null,
  parentIndex = null,
  updateGrandParent = null
}) => {
  // Initialising state and variables
  const item = parent[index];
  const [collapsed, setCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  // using .length to verify if empty
  const hasBranch = Array.isArray(item?.submenu) && item.submenu.length > 0;

  useEffect(() => {
    console.log(`Rendering: ${item.title}`);
  }, [item]);

  // State to show and unshow children
  const toggleState = () => setCollapsed(!collapsed);

  // Renaming functionality
  const handleRename = () => {
    setIsEditing(false);
    const updatedParent = [...parent];
    updatedParent[index] = { ...item, title };
    updateParent(updatedParent);
  };

  // Deleting functionality
  const handleDelete = () => {
    const updatedParent = [...parent];
    updatedParent.splice(index, 1);
    updateParent(updatedParent);
  };

  // Make sure updates are completed across the tree so otherwise naming or deleting mismatch
  const updateSubmenu = (newSubmenu) => {
    const updatedParent = [...parent];
    updatedParent[index] = { ...item, submenu: newSubmenu };
    updateParent(updatedParent);
  };

  // Within parent, swap positions, does not act if no index or at the (top)
  const moveUp = () => {
    if (index === 0) return;
    const updatedParent = [...parent];
    [updatedParent[index - 1], updatedParent[index]] = [updatedParent[index], updatedParent[index - 1]];
    updateParent(updatedParent);
  };

  // Within parent, swap positions, does not act if no index or at the (bottom)
  const moveDown = () => {
    if (index === parent.length - 1) return;
    const updatedParent = [...parent];
    [updatedParent[index], updatedParent[index + 1]] = [updatedParent[index + 1], updatedParent[index]];
    updateParent(updatedParent);
  };

  // Moves to be a child of the above elements
  const indent = () => {
    if (index === 0) return;
    const updatedParent = [...parent];
    const targetSibling = updatedParent[index - 1];

    if (!Array.isArray(targetSibling.submenu)) {
      targetSibling.submenu = [];
    }

    const [movingElement] = updatedParent.splice(index, 1);
    targetSibling.submenu.push(movingElement);
    updateParent(updatedParent);
  };

  // Unindents to the next level, using grandparent to reassign
  const unindent = () => {
    if (!grandParent || parentIndex === null || !updateGrandParent) return;
    const updatedParent = [...parent];
    const [movingElement] = updatedParent.splice(index, 1);
    const reassignedElement = assignIds([movingElement])[0];
    const updatedGrandParent = [...grandParent];
    const parentElement = {
      ...updatedGrandParent[parentIndex],
      // Remove submenu if empty 
      submenu: updatedParent.length > 0 ? updatedParent : undefined, 
    };
    updatedGrandParent[parentIndex] = parentElement;
    updatedGrandParent.splice(parentIndex + 1, 0, reassignedElement);
    updateGrandParent(updatedGrandParent);
  };


return (
  <div className="json-tree">
    <div className="line-container">
      <span className="toggle-symbol" onClick={toggleState}>
        {Array.isArray(item.submenu) ? (collapsed ? '[+]' : '[-]') : '•'}
      </span>

      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => e.key === 'Enter' && handleRename()}
          autoFocus
        />
      ) : (
        <div className="title-display" onDoubleClick={() => setIsEditing(true)}>
          {/* On Double click or use edit item to change name */}
          <span>{title}</span>
          <button className="edit-icon" onClick={() => setIsEditing(true)}>
            <FaPencilAlt />
          </button>
        </div>
      )}
      
      <div className="button-group">
        <button className="delete-button" onClick={handleDelete}><FaTrash /></button>
        <button className="move-up-button" onClick={moveUp}><FaArrowUp />
        </button>
        <button className="move-down-button" onClick={moveDown}><FaArrowDown />
        </button>
        <button className="indent-up-button" onClick={unindent}><FaOutdent />
        </button>
        <button className="indent-down-button" onClick={indent}><FaIndent />
</button>
      </div>
    </div>
      {/* Load using JsonTree component */}
    {!collapsed && hasBranch && (
      <div className="submenu">
        {item.submenu.map((child, childIndex) => (
          <JsonTree
            key={item.submenu[childIndex].id}
            index={childIndex}
            parent={item.submenu}
            updateParent={updateSubmenu}
            grandParent={parent}
            parentIndex={index}
            updateGrandParent={updateParent}
          />
        ))}
      </div>
    )}
  </div>
);

};

// Using data from props
const EditJsonTree = ({ jsonData }) => {
  const [menu, setMenu] = useState([]);

  // On data change, update IDs
  useEffect(() => {
    const initializedMenu = assignIds(jsonData.menu);
    setMenu(initializedMenu);
  }, [jsonData]);

  const updateTree = (newTree) => {
    setMenu([...newTree]);
  };

  // On reset grab from URL using service
  const handleReset = async () => {
    try {
      const newMenu = await externalMenuService();
      await internalMenuService(newMenu);
      const initializedMenu = assignIds(newMenu.menu);
      setMenu(initializedMenu);
      console.log('Menu reset from URL');
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };

  // On save, call the PUT with new data
const handleSave = async () => {
  try {
    const recordId =
      typeof jsonData._id === 'object' && jsonData._id.$oid
        ? jsonData._id.$oid
        : jsonData._id;

    await fetch(`/records/${recordId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ menu }),
    });

    console.log('Menu saved to DB');
  } catch (err) {
    console.error('Failed to save menu:', err);
  }
};

  return (
    <div className="edit-json-tree">
      <h3>Menu</h3>
      {menu.map((_, index) => (
        <JsonTree
          key={menu[index].id}
          index={index}
          parent={menu}
          updateParent={updateTree}
        />
      ))}
      <div className="edit-json-tree-buttons">
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={handleReset} style={{ marginLeft: 8 }}>Reset to External Data</button>
      </div>
    </div>
  );
};

export default EditJsonTree;