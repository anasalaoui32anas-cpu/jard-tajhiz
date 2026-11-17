# نظام تدبير المساجد – المندوبية الإقليمية بتاونات
1. أنشئ مشروعًا في Firebase، فعّل Authentication (Email/Password) وFirestore وHosting، وأضف Web App وانسخ الإعدادات داخل `index.html` (متغير `CFG`).
2. أنشئ أول حساب في Authentication بالبريد `admin@habous.app`، ثم أضف في Firestore وثيقة `users/<UID>` : `{name:"المسرف", role:"admin", active:true}`.
3. `npm i -g firebase-tools && firebase login && firebase deploy` (الذكاء الاصطناعي: `firebase functions:secrets:set ANTHROPIC_KEY` ثم deploy، يتطلب خطة Blaze).
4. GitHub: `git init && git add . && git commit -m init && git push` (إعدادات Firebase Web ليست سرية؛ الحماية بقواعد Firestore).
المتفقد: يُنشئه المسرف من صفحة «المتفقدون» باسم المستخدم + رمز سري (6 أحرف فأكثر).
