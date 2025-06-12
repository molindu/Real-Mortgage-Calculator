const EmptyResults = () => {
    return (
        <article className={'details'}>
            <img src={'/images/illustration-empty.svg'} alt="illustration-empty"/>
            <h1>Results shown here</h1>
            <p>Complete the form and click "calculate repayment" to see what your monthly repayments whould be. </p>
        </article>
    );
};

export default EmptyResults;