<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">Kuupäev</th>
        <th scope="col">Tegevused</th>
        <th scope="col">Märkused</th>
        <th scope="col">Ülesanded</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="visit in visits">
        <td>{{ visit.visitDate }}</td>
        <td>
          <div v-for="doneTask in visit.doneTasks">
            {{ doneTask.taskName }}
          </div>
        </td>
        <td>
          {{ visit.visitNotes }}
        </td>
        <td>
          <div v-for="toDotask in visit.toDoTasks">
            {{ toDotask.taskName }}
          </div>
        </td>
        <th>
          <font-awesome-icon v-on:click="deleteVisit(visit.visitId)" icon="fa-solid fa-trash-can" class="icon-hover"/>
        </th>
      </tr>
      </tbody>
    </table>
    <div class="row col-2">
      <button v-on:click="navigateToAddVisitView" type="button" class="btn btn-warning my-3">Lisa uus</button>
    </div>
  </div>
</template>
<script>
import VueSimpleAlert from "vue-simple-alert";

export default {
  name: 'VisitTable',
  data: function () {
    return {
      visits: [
        {
          visitId: '',
          visitDate: '',
          visitNotes: '',
          status: '',
          doneTasks: [
            {
              taskName: '',
            }
          ],
          toDoTasks: [
            {
              taskName: '',
            }
          ]
        }
      ],
      hiveId: this.$route.query.hiveId
    }
  },
  methods: {
    getAllHiveVisits: function () {
      this.$http.get("/hive/visits", {
            params: {
              hiveId: this.hiveId
            }
          }
      ).then(response => {
        this.visits = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    deleteVisit: function (visitId) {
      VueSimpleAlert.confirm("Kinnita, et soovid külastuse kustutada?").then(() => {
        this.$http.delete("/hive/visits", {
              params: {
                visitId: visitId
              }
            }
        ).then(response => {
          this.getAllHiveVisits()
        }).catch(error => {
          console.log(error)
        })
      })
    },
    navigateToAddVisitView: function () {
      this.$router.push({name: 'addVisitRoute', query: {hiveId: this.hiveId}})
    }
  },
  beforeMount() {
    this.getAllHiveVisits()
  }
}
</script>