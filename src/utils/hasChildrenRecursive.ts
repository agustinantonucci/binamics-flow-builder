import { calcWidth } from './calcWidth';

export const hasChildrenRecursive = (node: any) => {
  calcWidth(node.id, node);

  if (node.children) {
    const newChildren = node.children.filter((child: any) => !child.defecto);
    const defectoChildren = node.children.filter((child: any) => child.defecto);
    const sortedChildren = [...newChildren, ...defectoChildren];
    const updatedChildren: any = sortedChildren.map((child: any) =>
      hasChildrenRecursive(child),
    );
    return { ...node, children: updatedChildren };
  } else {
    return node;
  }
};
