window.onload = function () {
    console.log("Hello")
}

let correct_answers = [
    "2",
    "3"
]

function submit() {
    //this is run when the user submits the quiz
    console.log("submit")
    var checkedValue = null;
    var inputElements = document.getElementsByClassName('checkbox');
    let splitby4 = []
    let mover = []
    let totalcorrect = 0;
    let totalincorrect = 0;
    let totalqs = 0;

    for (let i = 0; inputElements[i]; ++i) {
        //console.log(inputElements[i].checked)

        mover.push(inputElements[i])
        //console.log(mover)

        if ((i + 1) % 4 == 0 && i != 0) {
            //if divisible by 3
            //console.log("DIVISIBLE BY 4")
            //console.log(i)
            //console.log(inputElements[i].value)

            splitby4.push(mover)
            mover = []
        }

    }

    console.log(splitby4)
    totalqs = splitby4.length

    //once split you need to check
    //for question in quiz
    for (let i = 0; i < splitby4.length; i++) {
        let question = splitby4[i]
        console.log(question)

        //loop throught hte answers
        let answerchosen = null;
        for (let j = 0; j < question.length; j++) {
            let answerbox = question[j]
            //console.log(answerbox)

            if (answerbox.checked) {
                console.log("Answer chosen ", answerbox.value)
                answerchosen = answerbox.value

            }
            //if no answer was picked for this question, count it as wrong


        }
        if (answerchosen == null) {
            //console.log('Question ' + (i + 1) + ' NULL    ')

        }
        console.log('Question ' + (i) + " " + answerchosen)

        //check if answer is correct
        let correctanswer = correct_answers[i]

        if (correctanswer == answerchosen) {
            console.log("Correct for #" + i)
            totalcorrect++;
        } else {
            console.log("Incorrect for #" + i)
            totalincorrect++
        }
    }

    //quiz results
    console.log('Your results were ' + totalcorrect + "/" + totalqs)

    let percent = (Number(totalcorrect) / Number(totalqs)) * 100
    console.log(percent + " % ")

    let scoretext = document.getElementById("score")
    scoretext.innerHTML = "Score:  " + percent + "%"


}