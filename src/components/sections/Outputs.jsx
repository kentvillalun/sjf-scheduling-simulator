export const Outputs = ({ processes, processCount }) => {
  // Convert string input to number using the Number() function. (e.g. "3" to 3)
  const cleanProcesses = (processes || [])
    .map((p) => ({
      name: p.name,
      burstTime: Number(p.burstTime),
      arrivalTime: Number(p.arrivalTime),
    }))
    .filter(
      (p) =>
        p.name &&
        Number.isFinite(p.burstTime) &&
        Number.isFinite(p.arrivalTime) &&
        p.burstTime > 0 &&
        p.arrivalTime >= 0,
    );

  // Working copy (add remainingTime)
  let time = 0;
  let working = cleanProcesses.map((p) => ({
    ...p,
    remainingTime: p.burstTime,
  }));

  // Gantt output
  const gantt = [];

  // Safety guard (avoid infinite loop if something goes wrong)
  let safety = 0;

  // Container for Ready Queue logs
  const readyQueueLogs = [];

  // SJF Non-preemptive loop (with IDLE)
  while (working.length > 0 && !working.every((p) => p.remainingTime === 0)) {
    safety++;
    if (safety > 1000) break;

    const readyQueue = working.filter(
      (p) => p.arrivalTime <= time && p.remainingTime > 0,
    );

    // Save the ready queue
    readyQueueLogs.push({
      time,
      queue: readyQueue.map((p) => ({
        name: p.name,
        arrivalTime: p.arrivalTime,
        burstTime: p.burstTime,
      })),
    });

    // If nobody is ready -> IDLE for 1 time unit
    if (readyQueue.length === 0) {
      gantt.push({ pid: "IDLE", start: time, end: time + 1 });
      time = time + 1;
      continue;
    }

    // Pick shortest burst time among ready
    const current = [...readyQueue].sort(
      (a, b) => a.burstTime - b.burstTime,
    )[0];

    const start = time;
    const end = time + current.remainingTime;

    gantt.push({ pid: current.name, start, end });

    // Move time forward to end
    time = end;

    // Mark current process as finished
    working = working.map((p) => {
      if (p.name === current.name) return { ...p, remainingTime: 0 };
      return p;
    });
  }

  // CPU Utilization

  // Computes Total Burst Time (TBT)
  const totalBurstTime = cleanProcesses.reduce(
    (sum, p) => sum + p.burstTime,
    0,
  );

  // Computes Total Finish Time (TFT)
  const totalFinishTime = time;

  // Computes CPU Utilization
  const cpuUtil =
    totalFinishTime > 0 ? (totalBurstTime / totalFinishTime) * 100 : 0;

  // Computes the Throughput
  const throughput = processCount / totalFinishTime;

  // Computes ATAT

  // Ignore IDLE Blocks
  const realGantt = gantt.filter((g) => g.pid !== "IDLE");

  // Completion time per process
  const completionTime = {};
  // First start time per process
  const startTime = {};

  for (const g of realGantt) {
    // first time a process appears = start time
    if (startTime[g.pid] === undefined) {
      startTime[g.pid] = g.start;
    }
    // keep updating end time so the last one stays
    completionTime[g.pid] = g.end;
  }

  // Per process rows
  const rows = cleanProcesses.map((p) => {
    const pid = p.name;
    const at = p.arrivalTime;
    const bt = p.burstTime;

    const ct = completionTime[pid] ?? 0;
    const st = startTime[pid] ?? 0;

    const tat = ct - at;
    const wt = st - at; // same as responseTime - arrivalTime

    return { pid, at, bt, st, ct, tat, wt };
  });

  const n = rows.length;

  const totalTAT = rows.reduce((sum, r) => sum + r.tat, 0);
  const totalWT = rows.reduce((sum, r) => sum + r.wt, 0);

  const atat = n > 0 ? totalTAT / n : 0;
  const awt = n > 0 ? totalWT / n : 0;

  return (    <section className="bg-white/8 rounded-lg border-white/5 border p-8">
      <div className="flex flex-col gap-7">
        {/* Displaying Gantt Chart */}
        <div className="flex flex-col gap-4 ">
          <h5 className="font-medium text-2xl">Gantt Chart:</h5>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 overflow-x-auto italic">
            {gantt.map((g, i) => (
              <div
                className="flex flex-col bg-black/20 border-white/10 border rounded-lg px-3 py-3 text-center"
                key={`${g.pid}-${g.start}-${i}`}
              >
                <p className="font-semibold text-xl">{g.pid}</p>
                <p className="">
                  {g.start} - {g.end}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Displaying CPU Utilization */}
        <div className="flex flex-col gap-4">
          <h5 className="font-medium text-2xl">CPU Utilization:</h5>
          <div className="italic">
            <div className="flex flex-col gap-3">
              <h6 className="">Formula: </h6>
              <div className="px-7 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="flex flex-row gap-2 items-center">
                  <div className="text-center">
                    <p className="">TBT</p>
                    <hr />
                    <p className="">TFT</p>
                  </div>
                  <div className="">
                    <p className="">X 100</p>
                  </div>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <div className="text-center">
                    <p className="">{totalBurstTime}</p>
                    <hr />
                    <p className="">{totalFinishTime}</p>
                  </div>
                  <div className="">
                    <p className="">X 100 =</p>
                  </div>
                  <div className="">{cpuUtil} =</div>
                  <div className="font-medium text-lg underline">
                    {cpuUtil.toFixed(2)} %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Displaying Throughput */}
        <div className="flex flex-col gap-4">
          <h5 className="font-medium text-2xl">Throughput:</h5>
          <div className="italic">
            <div className="flex flex-col gap-3">
              <h6 className="">Formula: </h6>
              <div className="px-7 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="flex flex-row gap-2 items-center">
                  <div className="text-center">
                    <p className=""># JOBS</p>
                    <hr />
                    <p className="">TFT</p>
                  </div>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <div className="text-center">
                    <p className="">{processCount}</p>
                    <hr />
                    <p className="">{totalFinishTime}</p>
                  </div>

                  <div className="">=</div>
                  <div className="font-medium text-lg underline">
                    {throughput.toFixed(2)} ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Displaying ATAT */}
        <div className="flex flex-col gap-4">
          <h5 className="font-medium text-2xl">Average Turn Around Time:</h5>
          <div className="italic">
            <div className="flex flex-col gap-3">
              <h6 className="">Formula: </h6>
              <div className="px-7 grid grid-cols-1 md:gap-20 gap-7 md:grid-cols-2">
                <div className="grid grid-cols-2 md:grid-cols-1 flex-row md:flex-col gap-10 items-center text-center">
                  <p className="">TAT = FT - AT</p>
                  <div className="grid grid-cols-2 text-center items-center gap-2">
                    <p className="">ATAT =</p>
                    <div className="text-center">
                      <p className="">(Sum of TAT)</p>
                      <hr />
                      <p># JOBS</p>
                    </div>
                  </div>
                </div>

            

                <div className="flex flex-col gap-4">
                    <div className="">
                  {rows.map((r) => (
                    <div className="flex flex-row gap-10" key={r.pid}>
                      <div className="flex flex-row gap-3">
                        <p className="">{r.pid}</p>
                        <p className="">=</p>
                        <p className="">{r.ct}</p>
                        <p className="">-</p>
                        <p className="">{r.at}</p>
                        <p className="">=</p>
                      </div>
                      <p className="">{r.tat}</p>
                    </div>
                  ))}
                  </div>
                  
                  <div className="text-center items-center flex flex-row gap-2 ">
                    <p className="">ATAT =</p>
                    <div className="text-center">
                      <p className="">{totalTAT}</p>
                      <hr />
                      <p>{n}</p>
                    </div>
                    <div className="">=</div>
                    <div className="font-medium text-lg underline">
                        {atat.toFixed(2)} ms
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Displaying AWT */}
        <div className="flex flex-col gap-4">
          <h5 className="font-medium text-2xl">Average Waiting Time:</h5>
          <div className="italic">
            <div className="flex flex-col gap-3">
              <h6 className="">Formula: </h6>
              <div className="px-7 grid grid-cols-1 md:gap-20 gap-7 md:grid-cols-2">
                <div className="grid grid-cols-2 md:grid-cols-1 flex-row md:flex-col gap-10 items-center text-center">
                  <p className="">WT = RT - AT</p>
                  <div className="grid grid-cols-2 text-center items-center gap-2">
                    <p className="">AWT =</p>
                    <div className="text-center">
                      <p className="">(Sum of WT)</p>
                      <hr />
                      <p># JOBS</p>
                    </div>
                  </div>
                </div>

            

                <div className="flex flex-col gap-4">
                    <div className="">
                  {rows.map((r) => (
                    <div className="flex flex-row gap-10" key={r.pid}>
                      <div className="flex flex-row gap-3">
                        <p className="">{r.pid}</p>
                        <p className="">=</p>
                        <p className="">{r.st}</p>
                        <p className="">-</p>
                        <p className="">{r.at}</p>
                        <p className="">=</p>
                      </div>
                      <p className="">{r.wt}</p>
                    </div>
                  ))}
                  </div>
                  
                  <div className="text-center items-center flex flex-row gap-2 ">
                    <p className="">ATAT =</p>
                    <div className="text-center">
                      <p className="">{totalWT}</p>
                      <hr />
                      <p>{n}</p>
                    </div>
                    <div className="">=</div>
                    <div className="font-medium text-lg underline">
                        {awt.toFixed(2)} ms
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
