import React, { useContext } from 'react';
import { Popconfirm } from 'antd';
import { BuilderContext, NodeContext } from '../contexts';
import { useAction } from '../hooks';
import { getRegisterNode } from '../utils';
import { FiX } from 'react-icons/fi';
import { TbTrash } from 'react-icons/tb';
import './index.less';

const RemoveButton: React.FC = () => {
  const { registerNodes, readonly } = useContext(BuilderContext);

  const node = useContext(NodeContext);

  const { removeNode } = useAction();

  const registerNode = getRegisterNode(registerNodes, node.type);

  return (
    // !readonly && !registerNode?.customRemove ? (
    <Popconfirm
      title={
        registerNode?.removeConfirmTitle ||
        'Está seguro que desea borrar este nodo?'
      }
      onCancel={(e) => e?.stopPropagation()}
      onConfirm={(e) => {
        e?.stopPropagation();
        removeNode();
      }}
      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
    >
      <span
        className="flow-builder-node__remove"
        onClick={(e) => e.stopPropagation()}
      >
        <TbTrash size={16} color="white" />
      </span>
    </Popconfirm>
  );
  // ) : null;
};

export default RemoveButton;
