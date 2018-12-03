var clientApp = new Vue({
  el: '#clientsMain',
  data:{
    clients: [],
    engines: [],
    orders: [],
    deployed: [],
    series: []

},
methods: {

  fetchClient(cid) {
  fetch('api/client.php?clientId='+cid)
  .then( response => response.json() )
  .then( json => {this.clients = json; console.log(this.clients)} )
  .catch( err => {
      console.log('CLIENT FETCH ERROR:');
      console.log(err);
    })
  },

  fetchEngine(cid) {
  fetch('api/engine.php?clientId='+cid)
  .then( response => response.json() )
  .then( json => {this.engines = json; console.log(this.engines)} )
  .catch( err => {
      console.log('ENGINES FETCH ERROR:');
      console.log(err);
    })
  },

  fetchDeployed(cid) {
  fetch('api/engineDeployed.php?clientId='+cid)
  .then( response => response.json() )
  .then( json => {this.deployed = json; console.log(this.deployed)} )
  .catch( err => {
      console.log('ENGINES FETCH ERROR:');
      console.log(err);
    })
  },


  gotoClient (cid) {
    window.location = 'clientEngines.html?clientId=' + cid;
  },

  gotoEngine (did) {
    window.location = 'engineDeployed.html?engineDeployedId=' + did;
  },

},
  created() {
    const url = new URL(window.location.href);
    const clientId = url.searchParams.get('clientId') || 0;
    console.log('Client: '+ clientId);
    this.clients.clientId = clientId;

    if (!clientId) {
      console.error('Client Id not defined in URL parameters.')
    }


    this.fetchClient(clientId);
    this.fetchEngine(clientId);
    this.fetchDeployed(clientId);

  },


})
