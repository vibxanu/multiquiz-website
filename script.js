const questions = [
    { question: "Capital of France?", options: ["Paris","London","Berlin","Madrid"], answer:"Paris" },
    { question: "Red Planet?", options: ["Earth","Mars","Jupiter","Venus"], answer:"Mars" },
    { question: "Author of 'Romeo & Juliet'?", options: ["Shakespeare","Hemingway","Tolkien","Rowling"], answer:"Shakespeare" },
    { question: "5 + 7 = ?", options: ["10","11","12","13"], answer:"12" },
    { question: "Largest ocean?", options: ["Atlantic","Indian","Arctic","Pacific"], answer:"Pacific" }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
    nextBtn.disabled = true;
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => selectAnswer(btn,opt));
        optionsEl.appendChild(btn);
    });
    updateProgress();
}

function selectAnswer(btn, selected) {
    const correct = questions[currentQuestion].answer;
    Array.from(optionsEl.children).forEach(b => {
        b.disabled = true;
        if(b.textContent === correct) b.classList.add("correct");
        else if(b.textContent === selected) b.classList.add("wrong");
    });
    if(selected === correct) score++;
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if(currentQuestion < questions.length) loadQuestion();
    else {
        localStorage.setItem("quizScore", score);
        window.location.href = "score.html";
    }
});

function updateProgress() {
    const percent = ((currentQuestion)/questions.length)*100;
    progressBar.style.width = `${percent}%`;
}

// Load first question if on quiz.html
if(questionEl) loadQuestion();
