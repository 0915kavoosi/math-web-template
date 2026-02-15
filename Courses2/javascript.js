// پاسخ‌های صحیح آزمون
const correctAnswers = {
    q1: { type: "number", value: 3 },
    q2: { type: "number", value: 16 },   // 2^4
    q3: { type: "number", value: 15 },   // 5 * 3
    q4: { type: "number", value: 4 },    // 3x = 12
    q5: { type: "select", value: "-3" }, // عدد صحیح
    q6: { type: "select", value: "correct" },
    q7: { type: "radio", value: "false" }, // 2^3 = 8 نه 6
    q8: { type: "number", value: 5 },    // 20 / 4
    q9: { type: "number", value: 14 },   // x - 5 = 9
    q10:{ type: "select", value: "3" }   // √9 = 3
};

document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quizForm");
    const checkBtn = document.getElementById("checkQuiz");
    const resultDiv = document.getElementById("quizResult");
    const progressBar = document.getElementById("quizProgressBar");
    const backToTopBtn = document.getElementById("backToTop");

    // تصحیح آزمون
    checkBtn.addEventListener("click", function () {
        var score = 0;
        var total = Object.keys(correctAnswers).length;

        Object.keys(correctAnswers).forEach(key => {
            const config = correctAnswers[key];
            let userValue = null;

            if (config.type === "number") {
                const input = quizForm.elements[key];
                userValue = input.value.trim() === "" ? null : Number(input.value);
                styleInput(input, userValue === config.value);
                setFeedback(key, userValue === config.value, `پاسخ صحیح: ${config.value}`);
            } else if (config.type === "select") {
                const select = quizForm.elements[key];
                userValue = select.value;
                styleInput(select, userValue === config.value);
                setFeedback(key, userValue === config.value, `گزینه صحیح انتخاب شود.`);
            } else if (config.type === "radio") {
                const radios = quizForm.elements[key];
                userValue = [...radios].find(r => r.checked)?.value || null;
                const isCorrect = userValue === config.value;
                [...radios].forEach(r => {
                    r.parentElement.style.color = isCorrect ? "#2e7d32" : "#c62828";
                });
                setFeedback(key, isCorrect, config.value === "false" ? "۲ به توان ۳ برابر ۸ است." : "");
            }

            if (userValue === config.value) {
                score++;
            }
        });

        const percent = Math.round((score / total) * 100);
        progressBar.style.width = percent + "%";

        // let message = نمره تو: ${score} از ${total} (٪${percent}) — ;
        if (percent === 100) {
            message += "عالی! آماده قهرمانی توی جشنواره‌ای 😍";
        } else if (percent >= 70) {
            message += "خیلی خوبه، فقط کمی مرور بیشتر می‌خواد 👌";
        } else if (percent >= 40) {
            message += "بد نیست، اما با تمرین بیشتر خیلی بهتر می‌شی 🙂";
        } else {
            message += "نگران نباش، از اول درس‌ها رو مرور کن و دوباره امتحان بده 💡";
        }

        resultDiv.textContent = message;
    });

    function styleInput(input, isCorrect) {
        if (!input) return;
        input.style.borderColor = isCorrect ? "#66bb6a" : "#ef5350";
    }

    function setFeedback(questionKey, isCorrect, extraText) {
        const feedbackEl = document.querySelector(`.feedback[data-for="${questionKey}"]`);
        if (!feedbackEl) return;
        if (isCorrect) {
            feedbackEl.textContent = "آفرین! درست جواب دادی.";
            feedbackEl.style.color = "#2e7d32";
        } else {
            feedbackEl.textContent = extraText || "نیاز به دقت بیشتر داره.";
            feedbackEl.style.color = "#c62828";
        }
    }

    // دکمه بازگشت به بالا
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior:
"smooth" });
    });
});    








      