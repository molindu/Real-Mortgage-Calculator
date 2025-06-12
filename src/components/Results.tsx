import type {CalculationResult} from "../type/types.ts";
import {formatNumber} from "../type/types.ts";

type ResultsProps = {
    result: CalculationResult;
};

const Results = ({result}: ResultsProps) => {
    return (
        <div className={"details results"}>
            <h2 className="">Your results</h2>
            <p className="">Your results Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            <div className={"results-values"}>
                <div className={"flex flex-col gap-4"}>
                    <h3 className="">Your monthly repayments</h3>
                    <span
                        className={"values text-Lime font-plus-bold border-b border-b-slate-700 pb-6"}>{formatNumber.format(result.monthlyRepayments)}</span>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <h3 className="">Total you'll repay over the term</h3>
                    <span className={"text-[24px] font-plus-bold"}>{formatNumber.format(result.totalOverTerm)}</span>
                </div>
            </div>
        </div>
    );
};

export default Results;
