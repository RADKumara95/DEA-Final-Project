// Example JS functions to call backend APIs
const API_BASE = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      };
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Login successful!");
        window.location.href = "/index.html";
      } else {
        alert("Invalid credentials.");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        username: document.getElementById("suUsername").value,
        email: document.getElementById("suEmail").value,
        password: document.getElementById("suPassword").value,
      };
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Account created! Please login.");
        window.location.href = "/login.html";
      } else {
        alert("Signup failed.");
      }
    });
  }
});

function showWorkouts() {
  document.getElementById("workouts").classList.remove("hidden");
  const list = document.getElementById("workoutList");
  list.innerHTML = "<li>Loading workouts...</li>";

  fetch(`${API_BASE}/workouts`)
    .then(res => res.json())
    .then(data => {
      list.innerHTML = "";
      data.forEach(w => {
        const item = document.createElement("li");
        item.textContent = `${w.type} - ${w.duration} mins - ${w.caloriesBurned} kcal`;
        list.appendChild(item);
      });
    })
    .catch(() => {
      list.innerHTML = "<li>Failed to load workouts.</li>";
    });
}
