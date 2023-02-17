const counterStart = document.querySelector('.counter-start');
const counterEnd = document.querySelector('.counter-end');
const numberQuestion = document.querySelector('.number-question');
const question = document.querySelector('.question');
const divOption = document.querySelectorAll('.div-option');
const btnLetter = document.querySelector('.btn-letter');
const answer = document.querySelectorAll('.answer');
const btnSubmit = document.querySelector('.btn-submit');
let counter = 1;
const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
let arrayPosition = 0;
let data;


counterStart.innerText = 1;
numberQuestion.innerText = '1 .';
selectedOption()


const getData = async () => {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
    const apiReturn = await fetch(apiUrl);
    //change the data to json
    const data = await apiReturn.json();
    console.log(data);
    return data;

};
const showData = () => {
    question.innerText = `${data.results[arrayPosition].question}`;
    // 3 dots are to put into array one at a time / created a new [] to put correct and incorrect answers and sort them; 
    const allAnswers = [...data.results[arrayPosition].incorrect_answers, data.results[arrayPosition].correct_answer].sort();
    let correctAnswer = data.results[arrayPosition].correct_answer;
    console.log(correctAnswer)
    for (let j = 0; j < allAnswers.length; j++) {
        answer[j].innerText = `${allAnswers[j]}`;
    }
};

//result is the return from api
getData().then(result => {
    data = result;
    showData();
});


function selectedOption() {
    divOption.forEach((div) => {
        div.addEventListener('click', (e) => {
            divOption.forEach((removeDiv) => {
                removeDiv.classList.remove('active-answer');
            })
            div.classList.add('active-answer');
        })

    })
}

function nextQuestion() {
    arrayPosition = arrayPosition + 1;
    showData()
    if (counterStart.innerText !== '10') {
        counter = counter + 1;
        counterStart.innerText = counter;
        numberQuestion.innerText = `${counter} .`;
        divOption.forEach((removeDiv) => {
            removeDiv.classList.remove('active-answer');
        })
        answer.forEach((p) => {
            p.classList.remove('correct-answer');
        })

    }
}

btnSubmit.addEventListener('click', () => {
    showCorrectAnswer(data);
    setTimeout(() => {
        nextQuestion()
    }, 800)

})


function showCorrectAnswer(data) {
    let correctAnswer = data.results[arrayPosition].correct_answer;
    answer.forEach((p) => {
        if (p.innerText === correctAnswer) {
            p.classList.add('correct-answer');
        }
    })
}
