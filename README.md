<h3 align="center">Survey Web3 Challenge</h3>

---

<p align="center"> Ropsten (Ethereum) smart contract integration using Metamask, Ethers, React and Material UI v5
    <br> 
</p>

## 📝 Table of Contents

-   [Challenge Description](#description)
-   [Instructions](#instructions)
-   [Preview](#preview)
-   [Built Using](#built_using)
-   [Notes](#notes)
-   [Improvements](#improvements)

## 🧐 Challenge Description <a name = "description"></a>

A survey company wants to make a new quiz form that rewards users with tokens for
participating in the survey. They create surveys, loading them into JSON format and they want you to program a responsive web application using React or Next.js & Material UI/AntDesign for people to answer and submit they results, getting tokens in the process.

The web should behave as follows:

-   Connect Metamask wallet.
-   Ensure the user is connected to `Ropsten Testnet` and if not connected show a button to switch networks automatically.
-   Show the current balance of `$QUIZ` token (address below).
-   Once the page is loaded, present the title of the daily trivia with its picture and
    a button that allows you to begin answering.
-   Once the survey starts, display the current question, which will be available for
    the amount of seconds in the `lifetimeSeconds` property.
-   Answered or not it should move onto the next question.
-   Once all the questions are finished, show an overview with all the answers.
-   Show a button to submit the questions to the validator contract
-   Refresh the balance of `$QUIZ`

## 🏁 Instructions <a name = "instructions"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Steps

1 . Clone this repository or unzip the .zip file.

2 . Create an `.env` file following `.env.example` file.

3 . Install dependencies using:

```
$ yarn
```

4 . (Optional) Run existent tests with:

```
$ yarn test
```

3 . Run the development server with:

```
$ yarn start
```

## 📸 Preview <a name="preview"></a>

Here are some screenshots of the app working. You can tell about the project structure just by looking at the user flow.

### 1 . Main View

![Main View](https://github.com/dieguezguille/survey-challenge/blob/develop/assets/images/connection.png)

### 2 . Survey View

![Survey View](https://github.com/dieguezguille/survey-challenge/blob/develop/assets/images/question.png)

### 3 . Overview

![Overview](https://github.com/dieguezguille/survey-challenge/blob/develop/assets/images/overview.png)

### 4 . Forbidden

![Forbidden View](https://github.com/dieguezguille/survey-challenge/blob/develop/assets/images/forbidden-view.png)

## Extras

### Wallet Disconnection

![Wallet Disconnection](https://github.com/dieguezguille/survey-challenge/blob/develop/assets/images/disconnection.png)

### Error Handling

![Error Handling](https://github.com/dieguezguille/survey-challenge/blob/develop/assets/images/error-handling.png)

### Submittal

![Survey Submittal](https://github.com/dieguezguille/survey-challenge/blob/develop/assets/images/submittal.png)

## ⛏️ Built Using <a name = "built_using"></a>

-   [ReactJs](https://reactjs.org/) - Web UI Library
-   [Material UI](https://mui.com/) - UI Component & Styles Library
-   [Ethers](https://docs.ethers.io/v5/) - Web3 Convenience Library
-   [Sentry](https://sentry.io/) - Error Reporting Toolkit

## 📝 Notes <a name = "notes"></a>

-   The application is live on `Heroku`. The latest version of the `main` can be found running [here](https://survey-web3-challenge.herokuapp.com/).

-   Due to the challenge description not providing an actual API to fetch the `Daily Trivia` the sample JSON was served from the `/public` directory. Nevertheless, it is possible to change the URL and point to an actual API just by changing the variable `REACT_APP_SURVEY_URL` on the `.env` FILE.

-   If any Sentry errors are seen in the console output, know this happens because you probably have an ad blocker of some sort installed as a browser extension.

## ♻️ Improvements <a name = "improvements"></a>

Here is a list with some improvements that could make both the user and developer experience better:

1 . Write the rest of the missing tests to help avoid unwanted state mutations and ensure a proper user flow.

2 . Extract re-usable logic from contexts and common components into custom hooks if deemed necessary.

3 . Improve error handling by typing and capturing Ethers.js errors such as replaced transactions, failed transactions, reverted transactions and transactions rejected by the user. Enumerate these in an enum structure or object of some sort.
