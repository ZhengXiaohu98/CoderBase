// query for getting data from leetcode
const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        userAvatar
        realName
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      tagProblemCounts {
        advanced {
            tagName
            problemsSolved
        }
        intermediate {
            tagName
            problemsSolved
        }
        fundamental {
            tagName
            problemsSolved
        }
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
      name
      }
    }
    userContestRankingHistory(username: $username) {
      attended
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      rating
      ranking
      contest {
        title
        startTime
      }
    }
  }`;

function getLeetcodeStatus(username: string) {
  const PROXY_URL = 'http://localhost:3000';
  return fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        username
      }
    }),
  })
}

export default getLeetcodeStatus;