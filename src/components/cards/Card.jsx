export default function Card({ className, children }) {
   return (
      <div
         className={`flex flex-col justify-center w-20 h-27 p-4 rounded-xl border-4 border-zinc-300 shadow-md shadow-zinc-900 ${className}`}
      >
         {children}
      </div>
   );
}
