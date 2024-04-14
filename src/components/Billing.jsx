import { discount, bill } from "../assets";
import styles, { layout } from "../style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={bill} alt="deadlift" className="w-[100%] h-[100%] relative z-[5]" />
      {/* REPLACE WITH YOUR OWN IMAGE */}

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        How It Works <br className="sm:block hidden" />
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Gemini was trained on the principles of biomechanics, which govern how forces and loads impact the human body during movement. This knowledge allows Gemini to assess joint angles, muscle activation patterns, and overall movement efficiency.
      </p>
    </div>
  </section>
);

export default Billing;
