import { useEffect, useState } from "react";


export const Form = ({ processCount }) => {
//   const processes = Array.from({ length: processCount }, () => ({
//     name: "",
//     burstTime: "",
//     arrivalTime: "",
//   }));

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
            }
        } )
    )
  }, [processCount])

  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {processes.map((p, index) => (
          <div className="grid grid-cols-3 text-center gap-x-6 gap-y-3 items-center justify-center md:gap-x-10 " key={index}>
            <input
              type="text"
              className="focus:outline-none px-4 py-2 bg-white/8 rounded-lg border-white/5 border focus:border-white/20 transition-all duration-200 text-center"
            />
            <input
              type="number"
              className="focus:outline-none px-4 py-2 bg-white/8 rounded-lg border-white/5 border focus:border-white/20 transition-all duration-200 text-center"
            />
            <input
              type="number"
              className="focus:outline-none px-4 py-2 bg-white/8 rounded-lg border-white/5 border focus:border-white/20 transition-all duration-200 text-center"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`bg-neutral-950 px-4 py-3 rounded-lg cursor-pointer font-semibold text-sm hover:-translate-y-0.5 transition-all duration-200 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]`}
        onClick={() => {
            // Run SJF Algorithm
            console.log("Running SJF Algorithm");
        }}
      >
        Run SJF
      </button>
    </form>
  );
};
