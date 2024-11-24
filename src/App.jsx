import React, {useState, useEffect} from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification"


const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  const updateFeedback = (feedbackType) => {
		setFeedback((prevFeedback) => ({
			...prevFeedback,
			[feedbackType]: prevFeedback[feedbackType] + 1,
		}));
	};

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positiveFeedback = totalFeedback
		? Math.round((feedback.good / totalFeedback) * 100)
		: 0;

  const resetFeedback = () => {
		setFeedback({ good: 0, neutral: 0, bad: 0 });
	};

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  

  return (
    <div>
      <Description />
      <Options
				onLeaveFeedback={updateFeedback}
				onReset={resetFeedback}
				totalFeedback={totalFeedback}
			/>
      {totalFeedback > 0 ? (
				<Feedback
					good={feedback.good}
					neutral={feedback.neutral}
					bad={feedback.bad}
					totalFeedback={totalFeedback}
					positiveFeedback={positiveFeedback}
				/>
			) : (
				<Notification />
			)}
    </div>
  );
}

export default App
