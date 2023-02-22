import { INode } from '../index';
import { nodeHasEnd } from './nodeHasEnd';

export const calcWidth = (id: string, node: INode) => {
  let wrapper = document.getElementById(`${id}w`);
  let widthWrapper = wrapper?.clientWidth;

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

  let primerNoEnd = -1;
  let ultimoNoEnd = -1;

  if (arrayHasEnd.every((child) => !child.hasEnd) && arrayHasEnd.length > 1) {
    if (wrapper?.children) {
      let divs = [...wrapper?.children];
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
    }
  } else {
    if (wrapper?.children) {
      primerNoEnd = arrayHasEnd.findIndex((nodo) => !nodo.hasEnd);

      type ArrayFlag = { index: number; hasEnd: boolean }[];

      const lastIndexOf = (array: ArrayFlag, flag: boolean) => {
        for (let i = array.length - 1; i >= 0; i--) {
          if (array[i].hasEnd === flag) return i;
        }
        return -1;
      };

      ultimoNoEnd = lastIndexOf(arrayHasEnd, false);

      let divs: any = [...wrapper?.children];

      let arrayOffset = arrayHasEnd.slice(0, primerNoEnd);

      if (arrayOffset) {
        arrayOffset.forEach((nodo) => {
          let index = nodo.index;
          if (index === 0 || index === arrayHasEnd.length - 1) {
            offset += divs[index].clientWidth / 2;
          } else {
            offset += divs[index].clientWidth;
          }
        });
      } else {
        offset = divs[0].clientWith / 2;
      }

      if (primerNoEnd !== -1) {
        offset += divs[primerNoEnd].clientWidth / 2;
      }

      let arrayContenido = arrayHasEnd.slice(primerNoEnd, ultimoNoEnd);

      let midIndex = Math.floor(arrayHasEnd.length / 2);

      if (arrayContenido.length) {
        arrayContenido.forEach((nodo) => {
          let index = nodo.index;
          acumulador += divs[index].clientWidth;
        });
      } else if (ultimoNoEnd !== midIndex) {
        if (widthWrapper) {
          acumulador += widthWrapper / 2 - offset;
        }
      }
    }
  }

  // console.log(acumulador, offset, id);

  let borderBottom = document.getElementById(id);

  if (borderBottom) {
    borderBottom?.style?.setProperty('position', 'absolute');
    borderBottom?.style?.setProperty('bottom', `0px`);
    borderBottom?.style?.setProperty('width', `${acumulador}px`);
    borderBottom?.style?.setProperty('left', `${offset}px`);
  }
};
