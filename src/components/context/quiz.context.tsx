import React, { createContext } from 'react';

const defaultValues = {};
export const QuizContext = createContext(defaultValues);

const QuizContextProvider: React.FC = ({ children }) => (
    <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>
);

export default QuizContextProvider;
