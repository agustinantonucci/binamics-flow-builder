import { INode } from '../index';
import { nodeHasEnd } from './nodeHasEnd';

export const calcWidth = (id: string, node: INode) => {
  let wrapper = document.getElementById(`${id}w`);

  if (!wrapper) {
    return;
  }

  let widthWrapper = wrapper?.clientWidth;

  if (!widthWrapper) {
    return;
  }

  if (!wrapper.children) {
    return;
  }

  let observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        calcWidth(id, node);
        break;
      }
    }
  });

  if (wrapper) {
    observer.observe(wrapper, { childList: true });
  }

  const arrayHasEnd = nodeHasEnd(node);

  let acumulador = 0;
  let offset = 0;

  let primerNoEnd = -2;
  let ultimoNoEnd = -1;

  let divs = [...wrapper.children];

  if (!divs) {
    return;
  }

  let midIndex = Math.floor(arrayHasEnd.length / 2);

  if (arrayHasEnd.every((child) => !child.hasEnd) && arrayHasEnd.length > 1) {
    divs.forEach((item, index) => {
      if (index === 0 || index === arrayHasEnd.length - 1) {
        acumulador += item.clientWidth / 2;
        if (index === 0) {
          offset += item.clientWidth / 2;
        }
      } else {
        acumulador += item.clientWidth;
      }
    });
  } else {
    primerNoEnd = arrayHasEnd.findIndex((nodo) => !nodo.hasEnd);

    type ArrayFlag = { index: number; hasEnd: boolean }[];

    const lastIndexOf = (array: ArrayFlag, flag: boolean) => {
      for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].hasEnd === flag) return i;
      }
      return -1;
    };

    ultimoNoEnd = lastIndexOf(arrayHasEnd, false);

    let arrayOffset = arrayHasEnd.slice(0, primerNoEnd);

    let medio = widthWrapper / 2;

    if (arrayOffset.length === 0) {
      offset += divs[0].clientWidth / 2;
    } else {
      offset += divs[0].clientWidth / 2;
      arrayOffset.forEach((nodo, indice) => {
        let index = nodo.index;

        offset += divs[index].clientWidth;
      });
    }

    let offsetRight = 0;

    let arrayOffsetRight = arrayHasEnd.slice(ultimoNoEnd, -1);

    arrayOffsetRight.forEach((nodo, indice) => {
      let index = nodo.index;
      offsetRight += divs[index].clientWidth;
    });

    if (divs[arrayHasEnd.length - 1]) {
      offsetRight += divs[arrayHasEnd.length - 1].clientWidth / 2;
    }

    if (offset > medio) {
      offset = medio;
    }

    if (offsetRight > medio) {
      offsetRight = medio;
    }

    if (primerNoEnd >= 0 && ultimoNoEnd >= 0) {
      if (primerNoEnd === midIndex) {
        if (offset > medio) {
          offset = medio;
        }
      } else if (primerNoEnd > midIndex) {
        offset = medio;
      }
      acumulador = widthWrapper - offset - offsetRight;
    } else {
      acumulador = 0;
    }
  }

  let borderBottom = document.getElementById(id);

  if (borderBottom) {
    borderBottom?.style?.setProperty('position', 'absolute');
    borderBottom?.style?.setProperty('bottom', `0px`);
    borderBottom?.style?.setProperty('width', `${acumulador}px`);
    borderBottom?.style?.setProperty('left', `${offset}px`);
  }
};
