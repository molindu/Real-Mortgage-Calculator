import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import type {CalculationResult} from "../type/types.ts";
import * as yup from "yup"

type FormData = {
    mortgageAmount: number
    mortgageTerm: number
    interestRate: number
    mortgageType: string
}

type FormProps = {
    setResult: (result: CalculationResult | null) => void
}
const Form = ({setResult}: FormProps) => {


    const validationSchema = yup.object({
        mortgageAmount: yup.number().typeError("Numbers only").positive("Can't be less than 0").required("This field is required"),
        mortgageTerm: yup.number().typeError("Numbers only").positive("Can't be less than 0").required("This field is required"),
        interestRate: yup.number().typeError("Numbers only").positive("Can't be less than 0").required("This field is required"),
        mortgageType: yup.string().required("This field is required"),
    })


    const {register, reset, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            mortgageAmount: undefined,
            mortgageTerm: undefined,
            interestRate: undefined,
            mortgageType: "",
        }
    })

    const clearAll = (e) => {
        e.preventDefault()
        setResult(null)
        reset()
    }

    const onSuccess = (data: FormData) => {
        const n = data.mortgageTerm * 12 // n => Terms in months
        const r = (data.interestRate / 12) / 100 // r => Monthly interest rate

        if (data.mortgageType === 'repayment') {
            const monthlyRepayments = data.mortgageAmount * ((r * ((1 + r) ** n)) / (((1 + r) ** n) - 1))
            const totalOverTerm = monthlyRepayments * n

            setResult({
                monthlyRepayments,
                totalOverTerm
            })
        } else {
            const monthlyRepayments = data.mortgageAmount * r
            const totalOverTerm = monthlyRepayments * data.mortgageTerm * 12

            setResult({
                monthlyRepayments,
                totalOverTerm
            })
        }
    }

    const submission = handleSubmit(onSuccess)
    return (
        <form onSubmit={submission} className={'form-control'}>
            <div className={'form-header'}>
                <h1>Mortgage Calculator</h1>
                <button className={'reset'} onClick={clearAll}>Clear All</button>
            </div>
            <div className={'form-input'}>
                <label htmlFor="mortgageAmount">Mortgage Amount</label>
                <div className={`input-container ${errors.mortgageAmount && 'input-error'}`}>
                    <span>&pound;</span>
                    <input
                        type="number"
                        name="mortgageAmount"
                        min={0}
                        {...register("mortgageAmount")}
                    />
                </div>
                {errors.mortgageAmount && <span>{errors.mortgageAmount.message}</span>}
            </div>
            <div className={'flex flex-col sm:flex-row justify-between gap-4'}>
                <div className={'form-input w-full sm:w-1/2'}>
                    <label htmlFor="mortgageTerm">Mortgage Term</label>
                    <div className={`input-container ${errors.mortgageTerm && 'input-error'}`}>
                        <input
                            type="number"
                            name="mortgageTerm"
                            min={0}
                            max={100}
                            {...register("mortgageTerm")}
                            className={`rounded-l-[5px] rounded-r-[0]`}
                        />
                        <span>years</span>
                    </div>
                    {errors.mortgageTerm && <span>{errors.mortgageTerm.message}</span>}
                </div>
                <div className={'form-input w-full sm:w-1/2'}>
                    <label htmlFor="interestRate">Interest Rate</label>
                    <div className={`input-container ${errors.interestRate && 'input-error'}`}>
                        <input
                            type="number"
                            name="interestRate"
                            min="0"
                            max="100"
                            step="0.01"
                            {...register("interestRate")}
                            className={`rounded-l-[5px] rounded-r-[0]`}
                        />
                        <span>%</span>
                    </div>
                    {errors.interestRate && <span>{errors.interestRate.message}</span>}
                </div>
            </div>
            <div className={'type-style'}>
                <label htmlFor="mortgageType">Mortgage Type</label>
                <div className={'flex flex-col gap-3'}>
                    {/*<div className={`input-type has-[input:checked]:bg-Lime-Light has-[input:checked]:border-Lime`}>*/}
                    {/*    <input*/}
                    {/*        type="radio"*/}
                    {/*        name="mortgageType"*/}
                    {/*        value={"repayment"}*/}
                    {/*        {...register("mortgageType")}*/}
                    {/*    />*/}
                    {/*    <p className={'text-sm font-plus-bold'}>Repayment</p>*/}
                    {/*</div>*/}
                    {/*<div className={`input-type has-[input:checked]:bg-Lime-Light has-[input:checked]:border-Lime`}>*/}
                    {/*    <input*/}
                    {/*        type="radio"*/}
                    {/*        name="mortgageType"*/}
                    {/*        value={"interest only"}*/}
                    {/*        {...register("mortgageType")}*/}
                    {/*    />*/}
                    {/*    <p className={'text-sm font-plus-bold'}>Interest Only</p>*/}
                    {/*</div>*/}

                    <label
                        htmlFor="repayment"
                        className="input-type cursor-pointer p-4 border rounded-md transition-all has-[input:checked]:bg-Lime-Light has-[input:checked]:border-Lime"
                    >
                        <input
                            type="radio"
                            id="repayment"
                            value="repayment"
                            // className="hidden"
                            {...register("mortgageType")}
                        />

                        <span className="text-sm font-plus-bold text-slate-900">Repayment</span>
                    </label>

                    <label
                        htmlFor="interest-only"
                        className="input-type cursor-pointer p-4 border rounded-md transition-all has-[input:checked]:bg-Lime-Light has-[input:checked]:border-Lime"
                    >
                        <input
                            type="radio"
                            id="interest-only"
                            value="interest only"
                            // className="hidden"
                            {...register("mortgageType")}
                        />

                        <span className="text-sm font-plus-bold text-slate-900">Interest Only</span>
                    </label>
                </div>
                {/*<div className="flex flex-col gap-3 w-full">*/}
                {/*    <label className="group flex gap-4 transition-all items-center ease-out hover:border-Lime cursor-pointer p-2.5 px-4 border border-Slate-700 rounded-md overflow-hidden has-[input:checked]:bg-[#fffff2] has-[input:checked]:border-Lime">*/}
                {/*        <input type="radio" name="mortgageType" value={"repayment"} className="hidden" {...register("mortgageType")} />*/}
                {/*        <div className="w-5 h-5 rounded-full border grid place-items-center border-Slate-500 transition-all ease-out group-has-[input:checked]:border-Lime">*/}
                {/*            <span className="dot w-3 h-3 rounded-full bg-Lime transition-all ease-out opacity-0 group-has-[input:checked]:opacity-100"></span>*/}
                {/*        </div>*/}
                {/*        <span className="font-bold text-lg text-Slate-900">Repayment</span>*/}
                {/*    </label>*/}
                {/*    <label className="group flex gap-4 transition-all items-center ease-out hover:border-Lime cursor-pointer p-2.5 px-4 border border-Slate-700 rounded-md overflow-hidden has-[input:checked]:bg-[#fdfde6] has-[input:checked]:border-Lime">*/}
                {/*        <input type="radio" name="mortgageType" value={"interest only"} className="hidden" {...register("mortgageType")} />*/}
                {/*        <div className="w-5 h-5 rounded-full border grid place-items-center border-Slate-500 transition-all ease-out group-has-[input:checked]:border-Lime">*/}
                {/*            <span className="dot w-3 h-3 rounded-full bg-Lime transition-all ease-out opacity-0 group-has-[input:checked]:opacity-100"></span>*/}
                {/*        </div>*/}
                {/*        <span className="font-bold text-lg text-Slate-900">Interest Only</span>*/}
                {/*    </label>*/}
                {/*</div>*/}
                {errors.mortgageType && <span>{errors.mortgageType.message}</span>}
            </div>
            <div>
                <button className={'submit'} type={'submit'}>
                    <img src={'/images/icon-calculator.svg'} alt={'calculator icon'}/>
                    Calculate Repayments
                </button>
            </div>
        </form>
    );
};

export default Form;