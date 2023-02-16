import React, { useContext } from 'react';
import { BuilderContext } from '../contexts';
import type { IDropComponent } from '../index';

import './index.less';

const DropButton: React.FC<IDropComponent> = (props) => {
  const { onDrop } = props;

  const { backgroundColor, dragType, setDragType } = useContext(BuilderContext);

  console.log(dragType);

  return (
    <div
      className="flow-builder-drop-button"
      style={{ backgroundColor }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop;
        setDragType('');
      }}
    ></div>
  );
};

export default DropButton;
