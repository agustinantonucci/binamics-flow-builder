import { INode } from '../index';
type ArrayFlag = { index: number; hasEnd: boolean }[];

export const nodeHasEnd = (node: INode): ArrayFlag => {
  let arrayFlag: ArrayFlag = [];

  if (node) {
    if (node.children) {
      if (node.children.length > 0) {
        node.children.forEach((childNode, index) => {
          if (childNode.children) {
            if (childNode.children.length > 0) {
              if (
                childNode.children.some(
                  (child) => child.type === 'end' || child.type === 'jump',
                )
              ) {
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
