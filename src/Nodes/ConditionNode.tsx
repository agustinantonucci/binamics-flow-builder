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

  type ArrayFlag = { index: number; hasEnd: boolean }[];

  const getNextHasEnd = (): ArrayFlag => {
    let arrayFlag: ArrayFlag = [];

    if (parentNode) {
      if (parentNode.children) {
        if (parentNode.children.length > 0) {
          parentNode.children.forEach((childNode, index) => {
            if (childNode.children) {
              if (childNode.children.length > 0) {
                if (childNode.children.some((child) => child.type === 'end')) {
                  arrayFlag.push({
                    index: index,
                    hasEnd: true,
                  });
                } else {
                  arrayFlag.push({
                    index: index,
                    hasEnd: false,
                  });
                }
              } else {
                arrayFlag.push({
                  index: index,
                  hasEnd: false,
                });
              }
            }
          });
        }
      }
    }

    return arrayFlag;
  };

  const arrayHasEnd = getNextHasEnd();

  const coverIndexClassNameBottom = ((index: number, total: number) => {
    const tiene = () => {
      if (index === 0) {
        if (conditionCount > 1) {
          if (arrayHasEnd[index].hasEnd && arrayHasEnd[index + 1].hasEnd) {
            return 'cover-disabled';
          } else if (arrayHasEnd[index].hasEnd) {
            return 'cover-disabled';
          } else if (arrayHasEnd[index + 1].hasEnd) {
            return 'cover-first';
          } else {
            return 'cover-first';
          }
        }
      } else if (index === total - 1) {
        if (arrayHasEnd[index].hasEnd && arrayHasEnd[index - 1].hasEnd) {
          return 'cover-disabled';
        } else if (arrayHasEnd[index].hasEnd) {
          return 'cover-disabled';
        } else if (arrayHasEnd[index - 1].hasEnd || arrayHasEnd[index - 1]) {
          return 'cover-last';
        }
      } else {
        if (arrayHasEnd.length % 2 === 0) {
          if (index < total / 2) {
            if (arrayHasEnd.slice(0, index).some((child) => !child.hasEnd)) {
              return 'cover-middle';
            } else if (arrayHasEnd[index].hasEnd) {
              return 'cover-disabled';
            } else {
              return 'cover-middle move-izq';
            }
          } else {
            if (
              arrayHasEnd.slice(index + 1, total).some((child) => !child.hasEnd)
            ) {
              return 'cover-middle';
            } else if (arrayHasEnd[index].hasEnd) {
              return 'cover-disabled';
            } else {
              return 'cover-last move-izq';
            }
          }
        } else {
          let midIndex = Math.floor(arrayHasEnd.length / 2);
          if (index === midIndex) {
            if (
              arrayHasEnd.slice(0, index).some((child) => !child.hasEnd) &&
              arrayHasEnd.slice(index + 1, total).some((child) => !child.hasEnd)
            ) {
              return 'cover-middle';
            } else if (
              arrayHasEnd.slice(0, index).some((child) => !child.hasEnd)
            ) {
              return 'cover-last move-izq';
            } else if (
              arrayHasEnd.slice(index + 1, total).some((child) => !child.hasEnd)
            ) {
              return 'cover-first move-izq';
            } else {
              return 'cover-disabled';
            }
          } else if (index < midIndex) {
            if (arrayHasEnd.slice(0, index).some((child) => !child.hasEnd)) {
              return 'cover-middle';
            } else if (arrayHasEnd[index].hasEnd) {
              return 'cover-disabled';
            } else {
              return 'cover-middle move-izq';
            }
          } else if (index > midIndex) {
            if (
              arrayHasEnd.slice(index + 1, total).some((child) => !child.hasEnd)
            ) {
              return 'cover-middle';
            } else if (arrayHasEnd[index].hasEnd) {
              return 'cover-disabled';
            } else {
              return 'cover-last move-izq';
            }
          } else {
            return 'cover-middle';
          }
        }
      }
    };

    let className = tiene();
    return className;
  })(conditionIndex, conditionCount);

  const renderFillLine = () => {
    if (node) {
      if (node.children) {
        if (node.children.length > 0) {
          if (node.children[0].type === 'end') {
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
          <CoverLine
            full={conditionIndex !== 0 && conditionIndex !== conditionCount - 1}
            className={`cover-condition-end ${coverIndexClassNameBottom}`}
          />
        </>
      ) : null}

      <SplitLine />

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
