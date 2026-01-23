import { RevealOnScroll } from "../RevealOnScroll";

export const Header = () => {
  return (
    <section className="flex flex-col justify-start items-center text-center p-6 gap-2 mt-30 max-w-5xl">
      <RevealOnScroll>
        <h1 className="text-3xl md:text-5xl font-bold">
          Shortest Job First Algorithm
        </h1>
        <p className="text-gray-300 md:text-xl">
          A CPU scheduling algorithm that selects the process with the shortest
          Burst Time (BT) from the ready queue.
        </p>
      </RevealOnScroll>
    </section>
  );
};
