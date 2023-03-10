import React, { useState, useContext } from 'react';
import { Popover } from 'antd';
import ActionButton from '../ActionButton';
import { SplitLine } from '../Lines';
import DropButton from '../DropButton';
import {
  getRegisterNode,
  getIsStartNode,
  getIsEndNode,
  getIsBranchNode,
  getIsConditionNode,
} from '../utils';
import { BuilderContext, NodeContext } from '../contexts';
import { useAction } from '../hooks';

import { FiPlus } from 'react-icons/fi';
import { MdOutlineCallSplit } from 'react-icons/md';
import { BsNodePlus } from 'react-icons/bs';
import './index.less';

interface IProps {
  inLoop?: boolean;
}

const AddNodeButton: React.FC<IProps> = (props) => {
  const { inLoop } = props;

  const {
    registerNodes,
    nodes,
    readonly,
    dragType,
    setDragType,
    DropComponent = DropButton,
  } = useContext(BuilderContext);

  const node = useContext(NodeContext);

  const { addNode, addNodeInLoop } = useAction();

  const handleAdd = inLoop ? addNodeInLoop : addNode;

  const [visible, setVisible] = useState(false);

  const registerNode = getRegisterNode(registerNodes, node.type);
  const AddableComponent = registerNode?.addableComponent;
  const addableNodeTypes = registerNode?.addableNodeTypes;

  const droppable =
    dragType &&
    !getIsConditionNode(registerNodes, dragType) &&
    (Array.isArray(addableNodeTypes)
      ? addableNodeTypes.includes(dragType)
      : true);

  const options = registerNodes.filter(
    (item) =>
      !getIsStartNode(registerNodes, item.type) &&
      !getIsConditionNode(registerNodes, item.type) &&
      (Array.isArray(addableNodeTypes)
        ? addableNodeTypes.includes(item.type)
        : true),
  );

  const handleAddNode = (newNodeType: string) => {
    handleAdd(newNodeType);
    setVisible(false);
  };

  const handleDrop = () => {
    handleAdd(dragType);
    setDragType('');
    setVisible(false);
  };

  const addableOptions = AddableComponent ? (
    <AddableComponent node={node} nodes={nodes} add={handleAddNode} />
  ) : (
    <>
      {options.map((item) => {
        const registerNode = getRegisterNode(registerNodes, item.type);
        const defaultIcon = getIsBranchNode(registerNodes, item.type) ? (
          // ? AddBranchIcon
          <MdOutlineCallSplit
            size={18}
            style={{ transform: 'rotate(180deg)' }}
          />
        ) : (
          <BsNodePlus size={18} style={{ transform: 'rotate(90deg)' }} />
        );
        return (
          <div
            className="flow-builder-addable-node-item"
            key={item.type}
            onClick={() => handleAddNode(item.type)}
          >
            <span className="flow-builder-addable-node-icon">
              {registerNode?.addIcon || defaultIcon}
            </span>

            <span>{item.name}</span>
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <SplitLine />
      {!readonly && options.length > 0 ? (
        droppable ? (
          <DropComponent onDrop={handleDrop} />
        ) : (
          <Popover
            visible={visible}
            onVisibleChange={setVisible}
            overlayClassName="flow-builder-addable-nodes"
            placement="rightTop"
            trigger={['click']}
            content={addableOptions}
            getPopupContainer={(triggerNode) => triggerNode as HTMLElement}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="action-button-wrapper"
            >
              <span className="split-line-action-button" />
              <ActionButton children={<FiPlus size={18} />} />
            </div>
          </Popover>
        )
      ) : null}

      <SplitLine />
    </>
  );
};

export default AddNodeButton;
