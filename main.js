// for repository section
const dataContainer = document.getElementById('user-repos');
const paginationContainer = document.getElementById('pagination-container');
const mainContainer = document.getElementById('main-container');
// Declare fetchData globally
let username = 'johnpapa';
const fetchData = async (page = 1, limit = 10) => {
    dataContainer.innerHTML = '<div class="loaderParent"><div class="loader"></div></div>'
    const response = await fetch(`http://localhost:5000/user/?username=${username}&page=${page}&limit=${limit}`);
    const data = await response.json();
    // Display paginated data
    dataContainer.innerHTML = ' ';
    data.data.map((repository)=>dataContainer.innerHTML+=`<div class="repo-card">
    <h2 class="reponame">${repository.name}</h2>
    <p class="repo-desc">${repository.description?repository.description:'______________'}</p>
    <div class="tech-stack">
      <div class="tech-stack-item">${repository.language?repository.language:'____________'}</div>
    </div>
    </div>`).join('');
    // Display pagination buttons
    paginationContainer.innerHTML = Array.from({ length: data.totalPages }, (_, i) => i + 1)
      .map(pageNumber => `
        <button ${page==pageNumber?"style=color:blue;":"style=color:black;"}  onclick="fetchData(${pageNumber}, ${limit})">${pageNumber}</button>
      `).join('');
};



// this is for user profile section

const API_URL = "https://api.github.com/users/";
async function getData(fullUrl) {
  console.log("fetching data");
  const response = await fetch(fullUrl);
  const data = await response.json();
  return data;
}

async function getUserProfile(username = "johnpapa") {
  const user = await getData(API_URL + username);
  const repositoryUrl = user.repos_url;
  console.log("data fetched");
  const userProfile = document.querySelector("#userProfile");
  const htmlToRender = `<div class="left">
    <div class="profileImage">
      <img
        src=${user.avatar_url}
        alt=""
      />
    </div>
    <div class="userUrl">
      <a href=${user.html_url} target=_blank><i class="fa-solid fa-link"></i> ${
    user.html_url
  }</a>
    </div>
  </div>
  <div class="right">
    <h2>${user.name}</h2>
    <div class="bio"> ${user.bio ? user.bio : "___________"}</div>
    <div> <i class="fa-solid fa-location-dot"></i> ${
      user.location ? user.location : "________"
    }</div>
    <div class="userUrl">twitter : ${
      user.twitter_username
        ? `<a href=https://twitter.com/${user.twitter_username} target=_blank>https://twitter.com/${user.twitter_username}</a>`
        : "________"
    }</div>
  </div>`;
  userProfile.innerHTML = htmlToRender;
}

// this is for search button

const searchUserBtn = document.getElementById('searchUser');
const inputTest = document.querySelector('#usernameText')
searchUserBtn.addEventListener('click', () => {
  // Initial data fetch
  username = inputTest.value;
  getUserProfile(inputTest.value);
  fetchData();
});

// this is initial
document.addEventListener('DOMContentLoaded', () => {
  // Initial data fetch
  inputTest.value = username;
  let temp = mainContainer.innerHTML;
  getUserProfile();
  fetchData();
});

