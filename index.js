// دالة وسيطة تحمي مفتاح الذكاء الاصطناعي: firebase functions:secrets:set ANTHROPIC_KEY
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin"); admin.initializeApp();
exports.scanImage = onCall({ secrets: ["ANTHROPIC_KEY"], region: "europe-west1" }, async (req) => {
  if (!req.auth) throw new HttpsError("unauthenticated", "login");
  const { image, mime, fields } = req.data;
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": process.env.ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500,
      messages: [{ role: "user", content: [
        { type: "image", source: { type: "base64", media_type: mime, data: image } },
        { type: "text", text: "استخرج من الصورة (جدول/وثيقة/صورة جرد) قيم الحقول التالية وأعد JSON فقط بدون شرح، المفاتيح بالضبط: " + JSON.stringify(fields) + ". الأرقام أعداد، وإن لم يظهر الحقل ضع null. أضف مفتاح notes لأي ملاحظة." }] }] }) });
  const j = await r.json();
  const t = (j.content || []).map(c => c.text || "").join("").replace(/```json|```/g, "").trim();
  try { return JSON.parse(t); } catch { return { notes: t }; }
});
