// حالت شب
function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

window.addEventListener('DOMContentLoaded', () => {
  // بازیابی تم
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
  }

  // نکته طلایی
  document.querySelectorAll('.tip-box').forEach(box => {
    box.addEventListener('click', () => {
      const content = box.querySelector('.tip-content');
      if (!content) return;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });

  // کارت معرفی طراح
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    profileCard.addEventListener('click', () => {
      const extra = profileCard.querySelector('.profile-extra');
      if (!extra) return;
      extra.style.display = extra.style.display === 'block' ? 'none' : 'block';
    });
  }

  // نوار پیشرفت درس‌ها
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    const lessons = document.querySelectorAll('.lesson');
    const viewed = parseInt(localStorage.getItem('lessonsViewed') || '0', 10);
    const total = lessons.length || 1;
    const percent = Math.min(100, (viewed / total) * 100);
    progressFill.style.width = percent + '%';

    lessons.forEach((lesson, index) => {
      lesson.addEventListener('click', () => {
        let v = parseInt(localStorage.getItem('lessonsViewed') || '0', 10);
        if (index + 1 > v) {
          v = index + 1;
          localStorage.setItem('lessonsViewed', v.toString());
          const p = Math.min(100, (v / total) * 100);
          progressFill.style.width = p + '%';
        }
      });
    });
  }

  // چالش روز
  const challengeEl = document.getElementById('challenge-text');
  const challengeAns = document.getElementById('challenge-answer');
  if (challengeEl) {
    const challenges = [
      { q: 'اگر −۳ + x = ۲ باشد، مقدار x چند است؟', a: 'x = ۵' },
      { q: 'مجموع زوایای داخلی یک پنج‌ضلعی چند درجه است؟', a: '۵۴۰ درجه' },
      { q: 'اگر ۲ⁿ = ۱۶ باشد، n چند است؟', a: 'n = ۴' },
      { q: 'در معادله ۴x − ۲ = ۱۰ مقدار x چند است؟', a: 'x = ۳' }
    ];
    const today = new Date();
    const index = today.getDate() % challenges.length;
    challengeEl.textContent = challenges[index].q;
    if (challengeAns) {
      challengeAns.textContent = challenges[index].a;
      challengeAns.style.display = 'none';
      const btn = document.getElementById('challenge-toggle');
      if (btn) {
        btn.addEventListener('click', () => {
          challengeAns.style.display = challengeAns.style.display === 'block' ? 'none' : 'block';
        });
      }
    }
  }

  // ماشین‌حساب
  const calcInput = document.getElementById('calc-input');
  if (calcInput) {
    document.querySelectorAll('.calculator button').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.val;
        if (val === 'C') {
          calcInput.value = '';
        } else if (val === '=') {
          try {
            // توان و رادیکال ساده
            let expr = calcInput.value.replace(/√(\d+)/g, 'Math.sqrt($1)');
            expr = expr.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
            calcInput.value = eval(expr);
          } catch {
            calcInput.value = 'خطا';
          }
        } else {
          calcInput.value += val;
        }
      });
    });
  }
});

// آزمون
function checkQuiz() {
  let score = 0;

  const q1 = document.querySelector('input[name="q1"]:checked');
  if (q1 && q1.value === "0") score++;

  const q2 = document.querySelector('input[name="q2"]:checked');
  if (q2 && q2.value === "5") score++;

  const q3 = document.querySelector('input[name="q3"]:checked');
  if (q3 && q3.value === "720") score++;

  const q4 = document.querySelector('input[name="q4"]:checked');
  if (q4 && q4.value === "32") score++;

  const result = document.getElementById('quiz-result');
  if (!result) return;
result.classList.remove('animate');
  void result.offsetWidth; // ریست انیمیشن
  result.textContent = "نمره شما از ۴: " + score;

  if (score === 4) {
    result.textContent += " عالی! تو آماده هر آزمونی هستی ⭐";
  } else if (score === 3) {
    result.textContent += " خیلی خوبه، فقط یک مرور کوچیک لازم داری.";
  } else {
    result.textContent += " اشکالی نداره، برگرد به درس‌ها و دوباره امتحان کن.";
  }

  result.classList.add('animate');
}