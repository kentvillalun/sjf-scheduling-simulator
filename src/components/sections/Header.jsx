import { RevealOnScroll } from "../RevealOnScroll";

export const Header = () => {
  return (
    <RevealOnScroll>
      <section className="flex flex-col justify-start items-center text-center p-6 gap-2 mt-30 max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-bold">
          Shortest Job First Scheduling Algorithm Simulator
        </h1>
        <p className="text-gray-300 md:text-xl">
          Shortest Job First Scheduling Algorithm is a CPU scheduling algorithm that selects the process with the shortest
          Burst Time (BT) from the ready queue.
        </p>
      </section>
    </RevealOnScroll>
  );
};
