import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const VideoAnalysis = () => {
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/analyze_deadlift')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not successful.');
        }
        return response.json();
      })
      .then(data => {
        setAnalysis(data.analysis);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Analyze your form. <br className="sm:block hidden" />
        </h2>

        <Button styles={`mt-10`} />
      </div>

      <div className={layout.sectionInfo}>
        <ReactMarkdown className={`${styles.paragraph} max-w-[570px] mt-5`}>
          {analysis}
        </ReactMarkdown>
      </div>
    </section>
  );
};

export default VideoAnalysis;
