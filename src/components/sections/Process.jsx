import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { Form } from "../Form.jsx";

export const Process = () => {
  const [step, setStep] = useState(1);

  const [processCount, setProcessCount] = useState(0);

  const handleGenerate = (event) => {
    setProcessCount(Number(event.target.value));
  };

  

  return (
    <RevealOnScroll>
      <section className="flex items-center justify-center  py-10">
        {step === 1 && (
          <div className="mx-auto px-6 max-w-3xl md:max-w-5xl flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-medium">Process Setup</h2>

            <form
              action=""
              className="w-full border m-auto p-10 border-white/10 rounded-3xl flex flex-col gap-6 bg-white/5"
            >
              <p className="text-gray-300 text-center">
                How many processes do you want to input?
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="number"
                  className="focus:outline-none px-4 py-2 bg-white/8 rounded-lg border-white/5 border focus:border-white/20 transition-all duration-200 text-center md:text-start"
                  placeholder="e.g. 5"
                  onChange={handleGenerate}
                  
                />
                <button
                  type="button"
                  className={`bg-black px-4 py-3 rounded-lg cursor-pointer font-semibold text-sm hover:-translate-y-0.5 transition-all duration-200 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] ${ !processCount || Number(processCount) <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}

                  onClick={() => {
                    if (!processCount || Number(processCount) <= 0) return;
                    setStep(step + 1);
                  
                  }}
                >
                  Generate Table
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="mx-auto px-6 max-w-3xl md:max-w-5xl flex flex-col items-center justify-center gap-7">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-2xl font-medium">Process Details</h2>
              <div className="text-gray-300 text-center space-y-0.5">
                <p className="">Fill in the details for each process below.</p>
                <p className="italic">
                  Note: Process names should be unique (e.g., A, B, C or P1, P2,
                  P3)
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-3 text-center gap-6 items-center justify-center font-medium md:gap-10 ">
                <div className="">Process</div>
                <div className="">Burst Time</div>
                <div className="">Arrival Time</div>
              </div>

              <Form processCount={processCount}/>
            </div>
          </div>
        )}
      </section>
    </RevealOnScroll>
  );
};
