import { useDraggable } from '@dnd-kit/core';

export default function Card({ id, className, draggable = false, children }) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
   });

   const classes = `flex flex-col justify-center w-20 h-27 p-4 rounded-xl border-4 border-zinc-300 shadow-md shadow-zinc-900 ${
      className ? className : ''
   }`;
   const enabledListeners = draggable ? listeners : undefined;
   const style = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   return (
      <div
         className={classes}
         ref={setNodeRef}
         style={style}
         {...enabledListeners}
         {...attributes}
      >
         {children}
      </div>
   );
}
