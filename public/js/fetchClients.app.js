var cumminsApp = new Vue({
  el: '#cumminsMain',
  data:{
    clientList: []

},
methods: {

  fetchCummins () {
  fetch('api/allClient.php')
    .then( response => response.json() )
    .then( json => {tasksApp.clientList = json; console.log(this.clientList)} )
    .catch( err => {
      console.log('TEAM LIST ERROR:');
      console.log(err);
    })

  },

  gotoClient (cid) {
    window.location = 'clientEngines.html?clientId=' + cid;
  },

},

this.fetchCummins()

})
