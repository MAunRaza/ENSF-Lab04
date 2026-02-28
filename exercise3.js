"use strict";

const userGrid = document.getElementById("userGrid");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const deleteIdInput = document.getElementById("deleteIdInput");
const deleteBtn = document.getElementById("deleteBtn");
const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");

let users = [];

const users_api = "https://69a22ec9be843d692bd0f0a4.mockapi.io/users_api";

function render(userArray) {
  if (!Array.isArray(userArray) || userArray.length === 0) {
    userGrid.textContent = "No users loaded.";
    return;
  }

  userGrid.innerHTML = userArray
    .map(
      (user) => `
        <article class="user-card">
          <h3>${user.first_name ?? ""}</h3>
          <p>first_name: ${user.first_name ?? ""}</p>
          <p>user_group: ${user.user_group ?? ""}</p>
          <p>id: ${user.id ?? ""}</p>
        </article>
      `
    )
    .join("");
}

async function retrieveData() {
  try {
    const res = await fetch(users_api);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

    const data = await res.json();
    users = Array.isArray(data) ? data : (data.users ?? []);
    console.log(users);
    render(users);
  } catch (err) {
    console.error("Error retrieving users:", err);
    userGrid.textContent = "Failed to load users.";
  }
}

retrieveData();