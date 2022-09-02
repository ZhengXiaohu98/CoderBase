<template>
  <div class="common-layout">
    <el-container style="color-scheme: light dark;">
      <!-- Connect to Leetcode if not connected -->
      <el-row style="margin-top:30px; margin-left:10px;"
        v-show="data.data.matchedUser.username === undefined || data.data.matchedUser.username === ''">
        <el-col :span="16">
          <el-input v-model="leetcodeUsername" class="w-50 m-2" size="large" placeholder="Leetcode username" />
        </el-col>
        <el-col :span="6">
          <el-button color="#626aef" class="conn_btn" @click="conn_lc">Connect</el-button>
        </el-col>
      </el-row>
      <!-- Leetcode info panel -->
      <el-aside width="380px" style="margin-left:10px; margin-top:10px;"
        v-show="data.data.matchedUser.username !== undefined && data.data.matchedUser.username !== ''">
        <div style="width:380px;height:150px;">
          <el-row justify="center">
            <el-co width="150px">
              <el-row justify="center">
                <h3>{{ data.data.matchedUser.username }}</h3>
              </el-row>
              <el-row>
                <el-image style="width:100px; height:100px; border-radius:5px;"
                  :src=data.data.matchedUser.profile.userAvatar />
              </el-row>
            </el-co>
            <el-co width="150px" justify="center" style="margin-left: 15px;">
              <!-- Connect to another user -->
              <el-link type="warning" @click="reConnLcVisible = true">Not you?</el-link>
              <el-dialog v-model="reConnLcVisible" title="Connect to Leetcode" width="30%">
                <el-col :span="16">
                  <el-input v-model="leetcodeUsername" class="w-50 m-2" size="large" placeholder="Leetcode username" />
                </el-col>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="reConnLcVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="conn_lc">Confirm</el-button>
                  </span>
                </template>
              </el-dialog>
              <el-row>
                <h3>Contest Rating: {{ Math.trunc(data.data.userContestRanking.rating) }}</h3>
              </el-row>
              <el-row>
                <h3>Attended Contest: {{ data.data.userContestRanking.attendedContestsCount }}</h3>
              </el-row>
              <el-row>
                <h3>Globle Ranking: {{ data.data.userContestRanking.globalRanking }}</h3>
              </el-row>
              <el-row>
                <h3>Globle Ranking: {{ data.data.userContestRanking.topPercentage }}%</h3>
              </el-row>
            </el-co>
          </el-row>
        </div>
        <el-divider />
        <div id="pbpie" style="width:380px;height:300px;"></div>
        <div style="width:380px;height:200px;">
          <el-tag v-for="(tp, idx) in data.data.matchedUser.tagProblemCounts.advanced" :key="idx" class="ml-2"
            type="info" round>
            {{ tp.tagName }}: {{ tp.problemsSolved }}
          </el-tag>
          <el-tag v-for="(tp, idx) in data.data.matchedUser.tagProblemCounts.fundamental" :key="idx" class="ml-2"
            type="info" round>
            {{ tp.tagName }}: {{ tp.problemsSolved }}
          </el-tag>
          <el-tag v-for="(tp, idx) in data.data.matchedUser.tagProblemCounts.intermeida" :key="idx" class="ml-2"
            type="info" round>
            {{ tp.tagName }}: {{ tp.problemsSolved }}
          </el-tag>
        </div>
      </el-aside>
      <el-main>
        <el-row>
          <!-- Leetcode contest history panel -->
          <el-co style="width:60%">
            <h2 style="text-align:center;">Attended Contest history</h2>
            <el-table :data="contestData" stripe style="width: 100%; height: 630px;">
              <el-table-column prop="title" label="Contest Title" width="180" />
              <el-table-column prop="ranking" label="Rank" width="100" />
              <el-table-column prop="rating" label="Rating" width="100" />
              <el-table-column label="Solved">
                <template #default="scope">
                  <div style="display: flex; align-items: center" class="demo-progress">
                    <el-progress :percentage="25 * scope.row.problemsSolved" v-if="scope.row.problemsSolved === 4"
                      status="success" />
                    <el-progress :percentage="25 * scope.row.problemsSolved" v-else-if="scope.row.problemsSolved === 0"
                      status="exception" />
                    <el-progress :percentage="25 * scope.row.problemsSolved" v-else status="warning" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-co>
          <!-- Connect to github if not connected -->
          <el-row style="margin-top:5px; margin-left:5px;" v-show="gdata.login === undefined || gdata.login === ''">
            <el-col :span="16">
              <el-input v-model="githubUsername" class="w-50 m-2" size="large" placeholder="Github username" />
            </el-col>
            <el-col :span="6">
              <el-button color="#626aef" class="conn_btn" @click="conn_git">Connect</el-button>
            </el-col>
          </el-row>
          <!-- Github  info panel-->
          <el-co v-show="gdata.login !== undefined && gdata.login !== ''" style="margin-left:25px; width:300px;">
            <el-row justify="center">
              <el-link target="_blank" :underline="false" style="font-size:20px; font-weight: bold;"
                :href=gdata.html_url>{{
                    gdata.login
                }}</el-link>
              <!-- Connect to another github user -->
              <el-link type="warning" @click="reConnGithubVisible = true" style="margin-left:10px;">Not you?</el-link>
              <el-dialog v-model="reConnGithubVisible" title="Connect to Github" width="30%">
                <el-col :span="16">
                  <el-input v-model="githubUsername" class="w-50 m-2" size="large" placeholder="Github username" />
                </el-col>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="reConnGithubVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="conn_git">Confirm</el-button>
                  </span>
                </template>
              </el-dialog>
            </el-row>
            <el-row>
              <el-image class="profile_img" :src=gdata.avatar_url />
            </el-row>
            <el-row justify="center">
              <h3>{{ gdata.bio }}</h3>
            </el-row>
            <el-row v-show="gdata.email !== ''">
              <h3>{{ gdata.email }}</h3>
            </el-row>
            <el-row justify="center">
              <el-link v-for="repo in rdata" :key="repo.id" target="_blank" :underline="false" :href=repo.html_url>
                <p class="scrollbar-demo-item">{{ repo.name }}</p>
              </el-link>
            </el-row>
          </el-co>
        </el-row>
      </el-main>
    </el-container>
    <el-backtop :right="100" :bottom="100" />
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import * as echarts from 'echarts';
import getGithubStatus from "../request/getGithubStatus"
import getGithubRepo from "../request/getGithubRepo"
import getLeetcodeStatus from "../request/getLeetcodeStatus"
import { PubSub } from "pubsub-ts"
import jwt_decode from "jwt-decode"
import { conngit, connlc } from "../request/api"
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    // setting up leetcode & github user data
    const githubUsername = ref("")
    const leetcodeUsername = ref("")
    const ginfo = reactive({
      gdata: {
        login: "",
        avatar_url: "",
        bio: "",
        email: "",
        html_url: "",
      }
    })
    const repos = reactive({ rdata: { id: 0, name: "" } })

    // setting up leetcode user data
    let linfo = reactive({
      data: {
        data: {
          matchedUser: {
            username: "",
            submitStats: {
              acSubmissionNum: [{ count: 0, difficulty: "easy" }]
            },
            tagProblemCounts: {
              advanced: [{ tagName: "", problemsSolved: 0 }],
              fundamental: [{ tagName: "", problemsSolved: 0 }],
              intermeida: [{ tagName: "", problemsSolved: 0 }]
            },
            profile: {
              userAvatar: ""
            }
          },
          userContestRanking: { attendedContestsCount: 0, rating: 0, globalRanking: 0, topPercentage: 0 },
          userContestRankingHistory: [{ attended: false, contest: { title: "" }, ranking: 0, rating: 0, problemsSolved: 0 }]
        }
      }
    });

    // Leetcode contest table data
    const contestD: { title: string; ranking: number; rating: number; problemsSolved: number; }[] = []
    let contestData = ref(contestD)

    // Reconnect variables
    const reConnLcVisible = ref(false)
    const reConnGithubVisible = ref(false)

    // fetch repo data after fetched the user's repo url
    let subscriber: PubSub.Subscriber = new PubSub.Subscriber();
    let publisher: PubSub.Publisher = new PubSub.Publisher();
    subscriber.on('fetchDone', (notification: PubSub.Notification) => {
      getGithubRepo(notification.body)
        .then(res => res.json())
        .then(data => repos.rdata = data)
    });

    subscriber.on('leetcodeFetchDone', (notification: PubSub.Notification) => {
      // Add pie chart show different types of problem solved
      let pbpie = echarts.init(document.getElementById('pbpie')!)
      let option = {
        title: {
          text: 'Solved Problems: ' + (linfo.data.data.matchedUser.submitStats.acSubmissionNum[0].count).toString(),
          left: 'center',
          textStyle: {
          }
        },
        tooltip: {
          show: true
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: linfo.data.data.matchedUser.submitStats.acSubmissionNum[1].count,
                name: linfo.data.data.matchedUser.submitStats.acSubmissionNum[1].difficulty,
                itemStyle: { color: '#67C23A' },
              },
              {
                value: linfo.data.data.matchedUser.submitStats.acSubmissionNum[2].count,
                name: linfo.data.data.matchedUser.submitStats.acSubmissionNum[2].difficulty,
                itemStyle: { color: '#E6A23C' }
              },
              {
                value: linfo.data.data.matchedUser.submitStats.acSubmissionNum[3].count,
                name: linfo.data.data.matchedUser.submitStats.acSubmissionNum[3].difficulty,
                itemStyle: { color: '#F56C6C' }
              }
            ]
          },
        ]
      }
      pbpie.setOption(option);

      // Add contest table
      for (const ct of linfo.data.data.userContestRankingHistory) {
        if (ct.attended) {
          const tmp = {
            title: ct.contest.title,
            ranking: ct.ranking,
            rating: ct.rating,
            problemsSolved: ct.problemsSolved
          }
          contestData.value.unshift(tmp)
        }
      }
    });

    // Event listener starts and fetch data
    publisher.add(subscriber);
    subscriber.start();

    // decode token
    const decoded: any = jwt_decode(localStorage.token)
    const userId = decoded.id;
    const github = decoded.github;
    const leetcode = decoded.leetcode;

    if (github !== '' && github !== undefined) {
      getGithubStatus(github).then(res => res.json()).then(data => {
        ginfo.gdata = data;
        publisher.notify('fetchDone', data.repos_url);
      });
    }

    if (leetcode !== '' && leetcode !== undefined) {
      getLeetcodeStatus(leetcode).then(res => res.json()).then(data => {
        linfo.data = data;
        publisher.notify('leetcodeFetchDone', "");
      })
    }

    // function to show successully connected message
    const messageAlert = () => {
      ElMessage({
        showClose: true,
        message: 'Successfully connected!',
        type: 'success',
      })
    }

    // functions to connect user's github and leetcode account
    function conn_git() {
      conngit(userId, githubUsername.value).then(res => {
        localStorage.setItem("token", res.data.token)
      })
      getGithubStatus(githubUsername.value).then(res => res.json()).then(data => {
        ginfo.gdata = data;
        publisher.notify('fetchDone', data.repos_url);
      });
      reConnGithubVisible.value = false;
      messageAlert();
    }

    function conn_lc() {
      connlc(userId, leetcodeUsername.value).then(res => {
        localStorage.setItem("token", res.data.token)
      })
      getLeetcodeStatus(leetcodeUsername.value).then(res => res.json()).then(data => {
        linfo.data = data;
        publisher.notify('leetcodeFetchDone', "");
      })
      reConnLcVisible.value = false;
      messageAlert();
    }

    return {
      ...toRefs(linfo), ...toRefs(ginfo), ...toRefs(repos), reConnLcVisible, reConnGithubVisible,
      githubUsername, leetcodeUsername, contestData, conn_git, conn_lc
    }
  }
})
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 8px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.conn_btn {
  height: 40px;
  margin-left: 5px;
}

.profile_img {
  margin: auto;
  height: 200px;
  width: 200px;
  border-radius: 10px;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 140px;
  margin: 4px;
  text-align: center;
  border-radius: 4px;
  background: #F2F3F5;
  font-weight: bold;
}

.ml-2 {
  margin: 2px;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 200px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>