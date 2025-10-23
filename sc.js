function toggleMode() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function goHome() {
  window.location.href = "index.html";
}

// إنشاء حساب جديد
function registerUser() {
  const user = document.getElementById("newUsername").value.trim();
  const pass = document.getElementById("newPassword").value.trim();

  if (!user || !pass) return alert("املأ كل الحقول.");

  let data = JSON.parse(localStorage.getItem("dragonData")) || {};

  if (data[user]) {
    alert("هذا الاسم موجود بالفعل. استخدم تسجيل الدخول.");
    return;
  }

  data[user] = { password: pass, balance: 0, lastGift: 0 };
  localStorage.setItem("dragonData", JSON.stringify(data));
  alert("تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");

  document.getElementById("setupSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
}

// تسجيل الدخول
function login() {
  const user = document.getElementById("loginUsername").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();

  let data = JSON.parse(localStorage.getItem("dragonData")) || {};

  if (!data[user]) return alert("المستخدم غير موجود.");
  if (data[user].password !== pass) return alert("كلمة السر خاطئة.");

  localStorage.setItem("dragonUser", user);
  window.location.href = "home.html";
}

// عرض المحفظة
function showWallet() {
  const user = localStorage.getItem("dragonUser");
  if (!user) return window.location.href = "index.html";

  let data = JSON.parse(localStorage.getItem("dragonData")) || {};
  document.getElementById("userDisplay").textContent = user;
  document.getElementById("balanceDisplay").textContent = data[user].balance.toFixed(2);
}

// هدية يومية
function dailyGift() {
  const user = localStorage.getItem("dragonUser");
  let data = JSON.parse(localStorage.getItem("dragonData")) || {};
  const now = Date.now();
  const lastGift = data[user].lastGift || 0;

  if (now - lastGift < 86400000) return alert("لقد أخذت هديتك اليوم!");

  const gift = (Math.random() * 0.5 + 0.5).toFixed(2);
  data[user].balance += parseFloat(gift);
  data[user].lastGift = now;

  localStorage.setItem("dragonData", JSON.stringify(data));
  document.getElementById("balanceDisplay").textContent = data[user].balance.toFixed(2);
  alert(`🎁 حصلت على ${gift} DRAGON كهديّة يومية!`);
}

// تحويل العملات
function transfer() {
  const sender = localStorage.getItem("dragonUser");
  const target = document.getElementById("targetUser").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const msg = document.getElementById("message");

  let data = JSON.parse(localStorage.getItem("dragonData")) || {};

  if (!data[sender] || !data[target]) {
    msg.textContent = "أحد المستخدمين غير موجود.";
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    msg.textContent = "المبلغ غير صحيح.";
    return;
  }
  if (data[sender].balance < amount) {
    msg.textContent = "رصيدك غير كافٍ.";
    return;
  }

  data[sender].balance -= amount;
  data[target].balance += amount;
  localStorage.setItem("dragonData", JSON.stringify(data));
  msg.textContent = `✅ تم تحويل ${amount} DRAGON إلى ${target}.`;
  document.getElementById("balanceDisplay").textContent = data[sender].balance.toFixed(2);
}

// تسجيل خروج
function logout() {
  localStorage.removeItem("dragonUser");
  window.location.href = "index.html";
}

// عند تحميل الصفحة
if (window.location.pathname.endsWith("home.html")) {
  window.onload = showWallet;
}