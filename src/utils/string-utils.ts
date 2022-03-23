const stringUtils = () => {
    const getDottedSubstring = (
        startLength: number,
        endLength: number,
        input?: string
    ) => {
        return (
            String(input).substring(0, startLength) +
            '...' +
            String(input).substring(endLength)
        );
    };

    return { getDottedSubstring };
};

export default stringUtils;
