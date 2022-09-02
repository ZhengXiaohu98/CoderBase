function getGithubStatus(username: string) {
  const BASE_URL = "https://api.github.com/users/";
  return fetch(BASE_URL + username)
}

export default getGithubStatus