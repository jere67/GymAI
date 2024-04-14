import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-gradient flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Gym.ai <br className="sm:block hidden" />{" "} 
          </h1>
          
        </div>

        <h1 className="font-poppins font-semibold ss:text-[58px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Unlock Your True Potential.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Using Google's novel Gemini 1.5 Pro technology, Gym.ai revolutionizes the way you train. With cutting-edge AI analysis, Gym.ai provides personalized feedback on your exercise form, helping you optimize your workouts, prevent injuries, and reach your fitness goals faster.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="gymai" className="w-[100%] h-[100%] relative z-[6]" />
        {/* REPLACE WITH YOUR OWN PICTURE */}

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
