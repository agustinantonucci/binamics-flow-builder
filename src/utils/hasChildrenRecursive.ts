import { calcWidth } from './calcWidth';

export const hasChildrenRecursive = (node: any) => {
  calcWidth(node.id, node);
  if (node.children) {
    node.children.forEach((child: any, index: number) => {
      child.children.forEach((child: any) => {
        hasChildrenRecursive(child);
      });
      if (child.defecto) {
        node.children?.push(node.children.splice(index, 1)[0]);
      }
    });
  }
};
