import { useDraggable } from '@dnd-kit/core';

export default function QueryCard({ queryId, title }) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: queryId,
   });

   const style = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   const classes =
      'flex flex-col bg-slate-900 rounded-2xl w-18 h-24 p-1 sm:p-2 md:p-4 sm:w-21 sm:h-31 md:w-30 md:h-38 text-sm md:text-base text-center justify-center text-white';

   return (
      <div
         id={queryId}
         className={classes}
         style={style}
         ref={setNodeRef}
         {...listeners}
         {...attributes}
      >
         {title}
      </div>
   );
}
