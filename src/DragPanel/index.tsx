import React, { useContext } from 'react';
import { BuilderContext } from '../contexts';
import { getRegisterNode, getIsBranchNode, getIsConditionNode } from '../utils';
import type { IDragComponent } from '../index';

import AddNormalIcon from '../icons/add-normal.svg';
import AddBranchIcon from '../icons/add-branch.svg';
import AddConditionIcon from '../icons/add-condition.svg';

import './index.less';
import { MdOutlineCallSplit } from 'react-icons/md';
import { BsNodePlus } from 'react-icons/bs';

const DragPanel: React.FC<IDragComponent> = () => {
  const { lineColor, backgroundColor, registerNodes, setDragType } =
    useContext(BuilderContext);

  const handleDragStart = (type: string) => {
    setDragType(type);
  };

  const handleDragEnd = () => {
    setDragType('');
  };

  return (
    <div
      className="flow-builder-drag-panel"
      style={{ border: `1px solid ${lineColor}` }}
    >
      <ul>
        {registerNodes
          .filter((item) => !item.isStart)
          .map((item) => {
            const registerNode = getRegisterNode(registerNodes, item.type);
            const defaultIcon = getIsBranchNode(registerNodes, item.type) ? (
              <MdOutlineCallSplit
                size={18}
                style={{ transform: 'rotate(180deg)' }}
              />
            ) : getIsConditionNode(registerNodes, item.type) ? (
              <BsNodePlus
                size={18}
                // style={{ transform: "rotate(90deg)" }}
              />
            ) : (
              <BsNodePlus size={18} style={{ transform: 'rotate(90deg)' }} />
            );

            return (
              <li
                key={item.type}
                className="flow-builder-drag-node-item"
                style={{ backgroundColor }}
                draggable
                onDragStart={() => handleDragStart(item.type)}
                onDragEnd={handleDragEnd}
              >
                <span className="flow-builder-drag-node-icon">
                  {registerNode?.addIcon || defaultIcon}
                </span>
                <span style={{ textAlign: 'center' }}>{item.name}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DragPanel;
