var cumminsApp = new Vue({
  el: '#cumminsMain',
  data:{
    clientList: []

},
methods: {

  fetchCummins () {
  fetch('api/allClient.php')
    .then( response => response.json() )
    .then( json => {cumminsApp.clientList = json; console.log(cumminsApp.clientList)} )
    .catch( err => {
      console.log('CLIENT LIST ERROR:');
      console.log(err);
    })

  },

  gotoClient (cid) {
    window.location = 'clientEngines.html?clientId=' + cid;
  },

}

})
