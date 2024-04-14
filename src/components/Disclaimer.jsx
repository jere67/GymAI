import styles from "../style";
import Button from "./Button";
import { doctor } from "../assets";

const Disclaimer = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Disclaimer</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Gym.ai is not a substitute for professional medical advice or qualified coaching. Always consult with a healthcare professional before starting any new exercise program or making changes to your existing routine.
      </p>
    </div>

    <img src={doctor} alt="deadlift" className="w-[25%] h-[25%] relative z-[5]" />
    
  </section>
);

export default Disclaimer;
