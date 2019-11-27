/*
window.onload = function() {
    console.log("Hello");
};
*/
let correct_answers = ["2", "3", "2"];
let percent = null;
let isclicked = false;
let warning_div = document.querySelector("#warning");
let speedwarning_div = document.querySelector("#speedwarning");
function submit() {
    if (isclicked == true) {
        console.log("Slow down u cannot click this fast");
        speedwarning_div.style.display = "block";
        return;
    }
    isclicked = true;
    //this is run when the user submits the quiz
    console.log("submit");
    var checkedValue = null;
    var inputElements = document.getElementsByClassName("question_button");
    let splitby4 = [];
    let mover = [];
    let totalcorrect = 0;
    let totalincorrect = 0;
    let totalqs = 0;

    for (let i = 0; inputElements[i]; ++i) {
        //console.log(inputElements[i].checked)

        mover.push(inputElements[i]);
        //console.log(mover)

        if ((i + 1) % 4 == 0 && i != 0) {
            //if divisible by 3
            //console.log("DIVISIBLE BY 4")
            //console.log(i)
            //console.log(inputElements[i].value)

            splitby4.push(mover);
            mover = [];
        }
    }

    console.log(splitby4);
    totalqs = splitby4.length;

    //once split you need to check
    //for question in quiz
    for (let i = 0; i < splitby4.length; i++) {
        let question = splitby4[i];
        console.log(question);

        //loop throught hte answers
        let answerchosen = null;
        for (let j = 0; j < question.length; j++) {
            let answerbox = question[j];
            //console.log(answerbox)

            if (answerbox.checked) {
                console.log("Answer chosen ", answerbox.value);
                answerchosen = answerbox.value;
            }
            //if no answer was picked for this question, count it as wrong
        }
        if (answerchosen == null) {
            isclicked = false;
            // show the erorr page
            console.log("showing error");
            warning_div.style.display = "block";
            return;
        }
        console.log("Question " + i + " " + answerchosen);

        //check if answer is correct
        let correctanswer = correct_answers[i];

        if (correctanswer == answerchosen) {
            console.log("Correct for #" + i);
            totalcorrect++;
        } else {
            console.log("Incorrect for #" + i);
            totalincorrect++;
        }
    }

    //quiz results
    console.log("Your results were " + totalcorrect + "/" + totalqs);

    percent = (Number(totalcorrect) / Number(totalqs)) * 100;
    console.log(percent + " % ");

    let time = new Date();
    let time_f = time;

    let scoretext = document.getElementById("score");
    scoretext.innerHTML =
        "At " +
        time_f +
        " You got a score of " +
        percent +
        "%" +
        "<br>" +
        "You had " +
        totalcorrect +
        "/" +
        totalqs +
        " correct";

    //add the score to the db
    write_db();

    //pause thr next click
    // Assuming the animation duration is 2 seconds

    setTimeout(function() {
        isclicked = false;
    }, 1100);
}

window.onload = function() {
    var firebaseheadingref = firebase
        .database()
        .ref()
        .child("quiz_scores");
    firebaseheadingref.on("value", function(datasnapshot) {
        //console.log(datasnapshot.val());
        calculate_avg(datasnapshot);
    });
};

function calculate_avg(datasnapshot) {
    datasnapshot = datasnapshot.val();
    console.log(datasnapshot);

    all_entries = Object.values(datasnapshot);
    console.log("all entries", all_entries);
    let scores = [];
    for (let i = 0; i < all_entries.length; i++) {
        entry = all_entries[i];
        let score = entry["score"];
        //console.log(score);
        scores.push(score);
    }
    //console.log(scores);

    //calculating the avg
    let total = 0;
    let proper_scores = 0;
    for (let i = 0; i < scores.length; i++) {
        if (!isNaN(scores[i])) {
            total += scores[i];
            proper_scores++;
        }
    }
    //console.log(total);
    //console.log(proper_scores);

    let avg = total / proper_scores;
    console.log(avg);

    //displaying the avg to the user
    document.getElementById("avg").innerHTML =
        "The global avg was: " + precise_round(avg, 3);
}
function precise_round(num, dec) {
    if (typeof num !== "number" || typeof dec !== "number") return false;

    var num_sign = num >= 0 ? 1 : -1;

    return (
        Math.round(num * Math.pow(10, dec) + num_sign * 0.0001) /
        Math.pow(10, dec)
    ).toFixed(dec);
}

function write_db() {
    var today = new Date();
    //console.log("The time is ", today);

    if (percent != null) {
        //console.log(percent);
        time_as_str = String(today);
        //console.log(time_as_str);
        set = { score: percent, time: time_as_str };
        firebase
            .database()
            .ref()
            .child("quiz_scores")
            .push()

            .set(set);
    } else {
        //console.log(" No score to be had");
    }
}
