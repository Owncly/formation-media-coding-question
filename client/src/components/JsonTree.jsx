import { useState } from 'react';
import '../styles/JsonTree.css';
const TreeNode = ({ node }) => {
// State to set collapsed or expanded
  const [collapsed, setCollapsed] = useState(false);
  const hasBranch = Array.isArray(node.submenu);

  // Function to toggle collapse state
  const toggleState = () => setCollapsed(!collapsed);

  return (
    <div>
      <span onClick={toggleState}>
        {/* If children print name and assign collapsed, if not use • */}
        {hasBranch ? (collapsed ? '[+]' : '[-]') : '•'} {node.title}
      </span>
      {!collapsed && hasBranch && (
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
    <div className="json-tree-viewer"> {/* Adding class for individual Styling */}
      <h3>Menu</h3>
      {jsonData.menu.map((item, index) => (
        <TreeNode key={index} node={item} />
      ))}
    </div>
  );
};

export default JsonTreeViewer;