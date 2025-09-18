import React, { useState } from 'react';

const TreeNode = ({ node }) => {
// State to set collapsed or expanded
  const [collapsed, setCollapsed] = useState(false);


  const hasChildren = Array.isArray(node.submenu);

  // Function to toggle collapse state
  const toggleState = () => setCollapsed(!collapsed);

  return (
    <div>
      <span onClick={toggleState}>
        {/* If children print name and assign collapsed, if not use • */}
        {hasChildren ? (collapsed ? '[+]' : '[-]') : '•'} {node.title}
      </span>
      {!collapsed && hasChildren && (
        <div style={{ marginLeft: 20 }}>
          {node.submenu.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};
// Display component with menu header
const JsonTreeViewer = ({ jsonData }) => {
  return (
    <div>
      <h3>Menu</h3>
      {jsonData.menu.map((item, index) => (
        <TreeNode key={index} node={item} />
      ))}
    </div>
  );
};

export default JsonTreeViewer;