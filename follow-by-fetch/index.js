const githubIds = [
  "euijinkk",
  "100Gyeon",
  "mogamogua",
  "jynam17",
  "huiseon37",
  "younyikim",
  "KimKwon",
  "sharpcoder312",
  "Hyoin-Kim",
  "soryeongk",
  "shji023",
  "seojinseojin",
  "q-bit-junior",
  "tekiter",
  "minsgy",
  "n0eyes",
  "sohee-K",
  "joohaem",
  "julia0276",
  "small-j",
  "henization",
  "suzieep",
  "ryammie",
];

const inputPAT = document.getElementById("input-pat");

const provideHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
    Authorization: `Token ${token}`,
  };
};

const fetchFollow = (githubId, headers) => {
  fetch(`https://api.github.com/user/following/${githubId}`, {
    method: "PUT",
    body: null,
    headers: headers,
  })
    .then((response) => console.log("Success", response))
    .catch((error) => console.error("Error:", error));
};

const followAllWebPart = () => {
  githubIds.forEach((id) => fetchFollow(id, provideHeaders(inputPAT.value)));
};

const addButtonListener = () => {
  const followButton = document.querySelector("button");
  followButton.addEventListener("click", followAllWebPart);
};

(function init() {
  addButtonListener();
})();
