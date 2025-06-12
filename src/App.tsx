import './App.css'
import Form from "./components/Form.tsx";
import {useState} from "react";
import Results from "./components/Results.tsx";
import EmptyResults from "./components/EmptyResults.tsx";
import type {CalculationResult} from "./type/types.ts";

function App() {
    const [result, setResult] = useState<CalculationResult | null>(null)
    return (
        <main>
            <div className={'flex bg-white sm:rounded-xl flex-col md:flex-row w-full sm:w-auto'}>
                <Form setResult={setResult}/>
                {result ? <Results result={result}/> : <EmptyResults/>}
            </div>
        </main>
    )
}

export default App
