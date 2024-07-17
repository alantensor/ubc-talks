import { getWidgetData } from "@/app/lib/actions";

export default function Widgets({ channel }: { channel: string }) {
  let data = getWidgetData("UBCV", "2022W", "", "", "");

  return (
    <div className="stats stats-vertical shadow m-auto w-full">
      <div className="stat">
        <div className="stat-title">Course Average</div>
        <div className="stat-value">75%</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div className="stat">
        <div className="stat-title">Enrollment</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
}
