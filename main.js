const counterStart = document.querySelector('.counter-start');
const counterEnd = document.querySelector('.counter-end');
const numberQuestion = document.querySelector('.number-question');
const question = document.querySelector('.question');
const divOption = document.querySelectorAll('.div-option');
const btnLetter = document.querySelector('.btn-letter');
const answer = document.querySelectorAll('.answer');
const btnSubmit = document.querySelector('.btn-submit');
let counter = 0;
const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';


counterStart.innerText = 1;
const getData = async () => {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
    const apiReturn = await fetch(apiUrl);
    //change the data to json
    const data = await apiReturn.json();
    console.log(data);
    return data;

};
const showData = async () => {
    try {
        const data = await getData();
        question.innerText = `${data.results[0].question}`;
        answer[0].innerText = `${data.results[0].correct_answer}`;
        ;
    } catch (error) {
        errorMsg.innerText = `choose a option`;
    }
};
showData(apiUrl);

divOption.forEach((div) => {
    div.addEventListener('click', () => {
        div.classList.add('shadow');
        div.style.backgroundColor = '#ff735c';
        console.log(div)
    })
})

function nextQuestion() {
    if (counterStart.innerText !== '10') {
        counter = counter + 1;
        counterStart.innerText = counter;
    }
}

btnSubmit.addEventListener('click', () => {
    nextQuestion()
})
