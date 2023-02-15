import React, { useState } from 'react';
import FlowBuilder, { INode, IRegisterNode } from 'react-flow-builder';

const registerNodes: IRegisterNode[] = [
  {
    type: 'start',
    name: 'Start',
    isStart: true,
  },
  {
    type: 'end',
    name: 'End',
    isEnd: true,
  },
  {
    type: 'node1',
    name: 'node 1',
  },
  {
    type: 'node2',
    name: 'node 2',
  },
  {
    type: 'condition',
    name: 'Condition',
  },
  {
    type: 'branch',
    name: 'Branch',
    conditionNodeType: 'condition',
  },
  {
    type: 'loop',
    name: 'Loop',
    isLoop: true,
  },
];

const Index = () => {
  const [nodes, setNodes] = useState<INode[]>([]);

  const handleChange = (nodes: INode[]) => {
    console.log('nodes change', nodes);
    setNodes(nodes);
  };

  return (
    <FlowBuilder
      nodes={nodes}
      onChange={handleChange}
      registerNodes={registerNodes}
    />
  );
};

export default Index;
