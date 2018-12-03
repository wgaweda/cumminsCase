var cumminsApp = new Vue({
  el: '#cumminsMain',
  data:{
    clientList: []

},
methods: {

  fetchCummins () {
  fetch('api/allClient.php')
    .then( response => response.json() )
    .then( json => {tasksApp.clientList = json} )
    .catch( err => {
      console.log('TEAM LIST ERROR:');
      console.log(err);
    })

  }

}

})
