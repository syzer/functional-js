const fetch = require('node-fetch')

async function fetchGithub(endpoint) {
  const url = `https://syzer:48388bc7012eab4ac481ed3f3b301a11957e2b0f@api.github.com${endpoint}`
  const response = await fetch(url)
  return await response.json()
}

async function showUserAndRepos(handle) {
  // await promise
  const user = await fetchGithub(`/users/${handle}`)
  const repos = await fetchGithub(`/users/${handle}/repos`)

  return { name: user.name, repos }
}

async function showUserAndRepos2(handle) {
  const [user, repos] = await Promise.all([
    fetchGithub(`/users/${handle}`),
    fetchGithub(`/users/${handle}/repos`)
  ])

  return { name: user.name, repos }
}
showUserAndRepos2('syzer')
  .then(console.log)
  .catch(console.error)