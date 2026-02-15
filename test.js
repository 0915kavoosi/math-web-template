// تابع تبدیل اعداد انگلیسی به فارسی
        function toPersianNum(num) {
            const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return num.toString().replace(/\d/g, x => farsiDigits[x]);
        }
        // انیمیشن شمارش اعداد
        function animateValue(id, start, end, duration) {
            const obj = document.getElementById(id);
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                obj.innerHTML = toPersianNum(value);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // اجرای انیمیشن وقتی صفحه لود می‌شود
        window.onload = function() {
            animateValue("students-count", 0, 1250, 2000);
            animateValue("hours-count", 0, 480, 2500);
            animateValue("satisfaction-count", 0, 98, 1500);
        };

