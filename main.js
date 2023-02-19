const counterStart = document.querySelector('.counter-start');
const counterEnd = document.querySelector('.counter-end');
const numberQuestion = document.querySelector('.number-question');
const question = document.querySelector('.question');
const divOption = document.querySelectorAll('.div-option');
const btnLetter = document.querySelectorAll('.btn-letter');
const answer = document.querySelectorAll('.answer');
const btnSubmit = document.querySelector('.btn-submit');
const modal = document.querySelector('.modal');
let score = document.querySelector('.score');
const btnRestart = document.querySelector('.btn-restart');
let counter = 1;
const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
let arrayPosition = 0;
let data;
let scoreCounter = 0;


counterStart.innerText = 1;
numberQuestion.innerText = '1 .';
selectedOption()


const getData = async () => {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
    const apiReturn = await fetch(apiUrl);
    //change the data to json
    const data = await apiReturn.json();
    return data;

};
const showData = () => {
    question.innerText = `${data.results[arrayPosition].question}`;
    // 3 dots are to put into array one at a time / created a new [] to put correct and incorrect answers and sort them; 
    const allAnswers = [...data.results[arrayPosition].incorrect_answers, data.results[arrayPosition].correct_answer].sort();
    let correctAnswer = data.results[arrayPosition].correct_answer;
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
            btnSubmit.disabled = false;
        })

    })
}

function showCorrectAnswer(data) {
    let correctAnswer = data.results[arrayPosition].correct_answer;
    divOption.forEach((div) => {
        const divAnswer = div.querySelector('.answer')
        const btnLetter = div.querySelector('.btn-letter')
        if (divAnswer.innerText === correctAnswer) {
            div.classList.add('correct-answer');
            btnLetter.classList.add('correct-answer');

        }
    })
}

function showModal() {
    modal.classList.remove('hidden-modal');
    btnRestart.addEventListener('click', (e) => {
        window.location.reload();
    })
}
function nextQuestion() {
    arrayPosition = arrayPosition + 1;
    showData()
    if (counterStart.innerText !== '10') {
        counter = counter + 1;
        counterStart.innerText = counter;
        numberQuestion.innerText = `${counter} .`;
        btnSubmit.disabled = true;
        divOption.forEach((removeDiv) => {
            removeDiv.classList.remove('active-answer');
        })
        divOption.forEach((div) => {
            div.classList.remove('correct-answer');
        })
        btnLetter.forEach((btn) => {
            btn.classList.remove('correct-answer');
        })

    }
}
function updateScore() {
    const selected = document.querySelector('.active-answer .correct-answer');
    if (selected) {
        scoreCounter = scoreCounter + 1;
        score.innerText = `${scoreCounter} / 10`
    }
}

btnSubmit.addEventListener('click', () => {

    showCorrectAnswer(data);
    updateScore();
    if (counter === 10) {
        showModal()
    }
    setTimeout(() => {
        nextQuestion()
    }, 800)

})



