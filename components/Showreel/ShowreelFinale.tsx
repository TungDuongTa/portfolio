import "./ShowreelFinale.css";
import type { ShowreelFinaleRefs } from "./showreelFinale.types";

type ShowreelFinaleProps = {
  refs: ShowreelFinaleRefs;
};

export default function ShowreelFinale({
  refs: { finale, pull, text, heading, lottie },
}: ShowreelFinaleProps) {
  return (
    <div ref={finale} className="showreel-finale">
      <div ref={pull} className="showreel-finale-pull">
        <div ref={lottie} className="showreel-finale-lottie" />
        <div ref={text} className="showreel-finale-text">
          <h2 ref={heading} className="showreel-finale-heading">
            I would say <span className="showreel-finale-yes">YES</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
