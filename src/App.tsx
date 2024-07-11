import "./App.css"
import {useState} from "react";
import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true})


function App() {

    const [question, setQuestion] = useState("Tell me about yourself");
    const [answer, setAnswer] = useState<any>()

    const handleOnClickAskGPT = async () => {
        try {
                const completion = await openai.chat.completions.create({
                    messages: [{ role: "system", content: question }, {
                        role: "user", content: "Tell me about yourself",
                    }],
                    model: "gpt-3.5-turbo",
                });
                setAnswer((completion.choices[0]).message.content);
        }
        catch (e){
            console.error(e)
        }
    }
                console.log("answer", answer);
  return (
    <div className="App">

        <div className="question">Question: {question} </div>
      <button onClick={handleOnClickAskGPT}>
          AskGPT
      </button>

        <div className="answer">{answer ? answer : "Answer is not ready yet"}</div>

    </div>
  );
}

export default App;
