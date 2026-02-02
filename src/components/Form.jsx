import { useEffect, useState } from "react";
import { Outputs } from "../components/sections/Outputs.jsx";
import { RevealOnScroll } from "./RevealOnScroll.jsx";

export const Form = ({ processCount }) => {
  const [isSolution, setIsSolution] = useState(false);

  // Handles the value or process table
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const count = Number(processCount) || 0;

    if (count <= 0) {
      setProcesses([]);
      return;
    }

    setProcesses(
      Array.from({ length: count }, () => {
        return {
          name: "",
          burstTime: "",
          arrivalTime: "",
        };
      }),
    );
  }, [processCount]);

  // Handles the name inputs
  const handleChange = (index, value) => {
    setProcesses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], name: value };
      return updated;
    });
  };

  // Handles the burst time inputs
  const handleBurstChange = (index, value) => {
    setProcesses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], burstTime: value };
      return updated;
    });
  };

  // Handle the arrival time inputs
  const handleArrivalChange = (index, value) => {
    setProcesses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], arrivalTime: value };
      return updated;
    });
  };

  // Handle click button
  const showSolution = () => {
    setIsSolution(true);
    setTimeout(() => {
      document.getElementById("outputs")?.scrollIntoView({behavior: "smooth"});
    })
  };

  return (
    <section className="flex flex-col gap-15">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {processes.map((p, index) => (
            <div
              className="grid grid-cols-3 text-center gap-x-6 gap-y-3 items-center justify-center md:gap-x-10 "
              key={index}
            >
              <input
                type="text"
                value={p.name}
                onChange={(e) => handleChange(index, e.target.value)}
                className="focus:outline-none px-4 py-2 bg-white/8 rounded-lg border-white/5 border focus:border-white/20 transition-all duration-200 text-center"
              />

              <input
                type="number"
                value={p.burstTime}
                onChange={(e) => handleBurstChange(index, e.target.value)}
                className="focus:outline-none px-4 py-2 bg-white/8 rounded-lg border-white/5 border focus:border-white/20 transition-all duration-200 text-center"
              />
              <input
                type="number"
                value={p.arrivalTime}
                onChange={(e) => handleArrivalChange(index, e.target.value)}
                className="focus:outline-none px-4 py-2 bg-white/8 rounded-lg border-white/5 border focus:border-white/20 transition-all duration-200 text-center"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`bg-neutral-950 px-4 py-3 rounded-lg cursor-pointer font-semibold text-sm hover:-translate-y-0.5 transition-all duration-200 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]`}
          onClick={showSolution}
        >
          Run SJF
        </button>
      </form>

      {isSolution && (
        <RevealOnScroll>
          <div className="" id="outputs">

          <Outputs processes={processes} processCount={processCount} />
          </div>
        </RevealOnScroll>
      )}
    </section>
  );
};
