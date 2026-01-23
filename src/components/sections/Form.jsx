import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const Form = () => {
  const [step, setStep] = useState(1);

  return (
    <section className="flex items-center justify-center  py-10">
      {step === 1 && (
        <RevealOnScroll>
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
                  className="focus:outline-none px-4 py-2 bg-white/8 rounded-lg border-white/5 border "
                />
                <button className="bg-black px-4 py-3 rounded-lg cursor-pointer font-semibold text-sm hover:-translate-y-0.5 transition-all duration-200 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] ">
                  Generate Table
                </button>
              </div>
            </form>
          </div>
        </RevealOnScroll>
      )}
    </section>
  );
};
