import React, { useContext, useMemo } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import AddButton from '../AddButton';
import RemoveButton from '../RemoveButton';
import { SplitLine, FillLine, CoverLine } from '../Lines';
import DefaultNode from '../DefaultNode';
import { getRegisterNode } from '../utils';
import { BuilderContext, NodeContext } from '../contexts';
import { useAction } from '../hooks';
import Arrow from '../Arrow';
import type { INode, IRender } from '../index';
interface IProps {
  parentNode?: INode;
  conditionIndex: number;
  renderNext: (params: IRender) => React.ReactNode;
  defecto: boolean;
}

const ConditionNode: React.FC<IProps> = (props) => {
  const { parentNode, conditionIndex, renderNext, defecto } = props;

  const {
    layout,
    spaceX,
    spaceY,
    readonly,
    registerNodes,
    nodes,
    beforeNodeClick,
    sortable,
    sortableAnchor,
  } = useContext(BuilderContext);

  const node = useContext(NodeContext);

  const { clickNode, removeNode } = useAction();

  const conditionCount = Array.isArray(parentNode?.children)
    ? parentNode?.children.length || 0
    : 0;

  const registerNode = getRegisterNode(registerNodes, node.type);

  const Component = registerNode?.displayComponent || DefaultNode;

  const ConditionDragHandle = useMemo(
    () =>
      SortableHandle(() => {
        return (
          <span className="flow-builder-sortable-handle">
            {sortableAnchor || ':::'}
          </span>
        );
      }),
    [sortableAnchor],
  );

  const handleNodeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await beforeNodeClick?.(node);
      clickNode();
    } catch (error) {
      console.log('node click error', error);
    }
  };

  const coverIndexClassName = ((index: number, total: number) => {
    if (index === 0) {
      return 'cover-first';
    }
    if (index === total - 1) {
      return 'cover-last';
    }
    return 'cover-middle';
  })(conditionIndex, conditionCount);

  const renderFillLine = () => {
    if (node) {
      if (node.children) {
        if (node.children.length > 0) {
          if (
            node.children.some((node) => node.type === 'end') ||
            node.children.some((node) => node.type === 'jump')
          ) {
            return <></>;
          }
        }
      }
    }

    return <FillLine />;
  };

  return (
    <div
      className={`flow-builder-node flow-builder-condition-node ${
        registerNode?.className || ''
      }`}
      style={{
        padding: layout === 'vertical' ? `0 ${spaceX}px` : `${spaceY}px 0`,
      }}
    >
      {conditionCount > 1 ? (
        <>
          <CoverLine
            full={conditionIndex !== 0 && conditionIndex !== conditionCount - 1}
            className={`cover-condition-start ${coverIndexClassName}`}
          />
        </>
      ) : null}

      {<SplitLine />}

      <Arrow />

      <div className="flow-builder-node__content" onClick={handleNodeClick}>
        {sortable ? <ConditionDragHandle /> : null}
        <Component
          readonly={readonly}
          node={node}
          nodes={nodes}
          remove={removeNode}
        />
        {!defecto && <RemoveButton />}
      </div>
      <AddButton />

      {Array.isArray(node.children)
        ? renderNext({
            nodes: node.children,
            parentNode: node,
          })
        : null}

      {renderFillLine()}
    </div>
  );
};

export default ConditionNode;
