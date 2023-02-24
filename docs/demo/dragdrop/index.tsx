import React, { useState, useContext, useEffect, useRef } from 'react';
import FlowBuilder from '../../../src/FlowBuilder/index';
import NodeContext from '../../../src/contexts/NodeContext';
import { INode, IRegisterNode } from '../../../src/index';

import { isEqual } from 'lodash';

import './index.css';
import { hasChildrenRecursive } from '../../../src/utils/hasChildrenRecursive';
import { MdOutlineCallSplit } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';

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

const BranchNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return (
    <div className="custom-branch-node">
      <MdOutlineCallSplit size={18} style={{ transform: 'rotate(180deg)' }} />
    </div>
  );
};

const JumpToNodeDisplay: React.FC = () => {
  return <div className="other-node">Saltar a</div>;
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
    displayComponent: BranchNodeDisplay,
  },
  {
    type: 'jump',
    name: 'Saltar a',
    displayComponent: JumpToNodeDisplay,
    addIcon: <RiArrowGoBackLine />,
    addableNodeTypes: [],
    isJump: true,
  },
];

const defaultNodes = [
  {
    id: 'node-0d9d4733-e48c-41fd-a41f-d93cc4718d97',
    type: 'start',
    name: 'Start',
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
        name: 'Condition',
        children: [
          {
            id: 'node-f227cd08-a503-48b7-babf-b4047fc9dfa5',
            type: 'node',
            name: 'Node',
            path: ['1', 'children', '0', 'children', '0'],
          },
        ],
        path: ['1', 'children', '0'],
      },
      {
        id: 'node-9d393627-24c0-469f-818a-319d9a678707',
        type: 'condition',
        name: 'Condition',
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
    name: 'Node',
    path: ['2'],
  },
  {
    id: 'node-b106675a-5148-4a2e-aa86-8e06abd692d1',
    type: 'end',
    name: 'End',
    path: ['3'],
  },
];

const Dragdrop = () => {
  const [nodes, setNodes] = useState<INode[]>(defaultNodes);
  const prevNodesRef = useRef<INode[]>(defaultNodes);

  useEffect(() => {
    const updatedNodes = nodes.map((node) => {
      if (node.type === 'branch') {
        return hasChildrenRecursive(node);
      } else {
        return node;
      }
    });

    const prevNodes = prevNodesRef.current;

    if (!isEqual(updatedNodes, prevNodes)) {
      setNodes(updatedNodes);
    }

    prevNodesRef.current = nodes;
    // if (nodes) {
    //   nodes.forEach((node) => {
    //     if (node.type === 'branch') {
    //       hasChildrenRecursive(node, nodes, setNodes);
    //     }
    //   });
    // }
  }, [nodes]);

  const handleChange = (nodes: INode[]) => {
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
