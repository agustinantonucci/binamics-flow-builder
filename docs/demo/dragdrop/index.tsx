import React, { useState, useContext } from 'react';
import FlowBuilder from '../../../src/FlowBuilder/index';
import NodeContext from '../../../src/contexts/NodeContext';
import {
  INode,
  IDropComponent,
  IRegisterNode,
  BuilderContext,
} from '../../../src/index';

import './index.css';

const StartNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="start-node">{node.name}</div>;
};

const EndNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="end-node">{node.name}</div>;
};

const NodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="other-node">{node.name}</div>;
};

const ConditionNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return (
    <div className="condition-node">{node.defecto ? 'Default' : node.name}</div>
  );
};

const registerNodes: IRegisterNode[] = [
  {
    type: 'start',
    name: 'Start',
    displayComponent: StartNodeDisplay,
    isStart: true,
  },
  {
    type: 'end',
    name: 'End',
    displayComponent: EndNodeDisplay,
    isEnd: true,
  },
  {
    type: 'node',
    name: 'Node',
    displayComponent: NodeDisplay,
  },
  {
    type: 'condition',
    name: 'Condition',
    displayComponent: ConditionNodeDisplay,
  },
  {
    type: 'branch',
    name: 'Branch',
    conditionNodeType: 'condition',
  },
];

const defaultNodes = [
  {
    id: 'node-0d9d4733-e48c-41fd-a41f-d93cc4718d97',
    type: 'start',
    name: 'start',
    path: ['0'],
  },
  {
    id: 'node-b2ffe834-c7c2-4f29-a370-305adc03c010',
    type: 'branch',
    name: 'branch',
    children: [
      {
        id: 'node-cf9c8f7e-26dd-446c-b3fa-b2406fc7821a',
        type: 'condition',
        name: 'condition',
        children: [
          {
            id: 'node-f227cd08-a503-48b7-babf-b4047fc9dfa5',
            type: 'node',
            name: 'node',
            path: ['1', 'children', '0', 'children', '0'],
          },
        ],
        path: ['1', 'children', '0'],
      },
      {
        id: 'node-9d393627-24c0-469f-818a-319d9a678707',
        type: 'condition',
        name: 'condition',
        children: [],
        path: ['1', 'children', '1'],
        defecto: true,
      },
    ],
    path: ['1'],
  },
  {
    id: 'node-972401ca-c4db-4268-8780-5607876d8372',
    type: 'node',
    name: 'node',
    path: ['2'],
  },
  {
    id: 'node-b106675a-5148-4a2e-aa86-8e06abd692d1',
    type: 'end',
    name: 'end',
    path: ['3'],
  },
];

// const DropComponent: React.FC<IDropComponent> = ({ onDrop }) => {

//   return (
//     <div
//       className="custom-drop"
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={onDrop}
//     ></div>
//   );
// };

const Dragdrop = () => {
  const [nodes, setNodes] = useState<INode[]>(defaultNodes);

  const handleChange = (nodes: INode[]) => {
    nodes.forEach((node) => {
      if (node.type === 'branch') {
        if (node.children) {
          node.children.forEach((child, index) => {
            if (child.defecto) {
              node.children?.push(node.children.splice(index, 1)[0]);
            }
          });
        }
      }
    });

    setNodes(nodes);
  };

  return (
    <FlowBuilder
      draggable
      nodes={nodes}
      onChange={handleChange}
      registerNodes={registerNodes}
    />
  );
};

export default Dragdrop;
