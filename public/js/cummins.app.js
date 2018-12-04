var clientApp = new Vue({
  el: '#clientsMain',
  data:{
    clients: [],
    engines: [],
    orders: [],
    deployed: [],
    series: [],
    clientNotes: [],
    noteForm: {}

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

  fetchSales(cid) {
  fetch('api/salesOrder.php?clientId='+cid)
  .then( response => response.json() )
  .then( json => {this.orders = json; console.log(this.orders)} )
  .catch( err => {
      console.log('ENGINES FETCH ERROR:');
      console.log(err);
    })
  },

  fetchNotes(cid) {
  fetch('api/clientNotes.php?clientId='+cid)
  .then( response => response.json() )
  .then( json => {this.clientNotes = json; console.log(this.clientNotes)} )
  .catch( err => {
      console.log('CLIENT NOTES FETCH ERROR:');
      console.log(err);
    })
  },


  gotoClient (cid) {
    window.location = 'clientEngines.html?clientId=' + cid;
  },

  gotoEngine (did) {
    window.location = 'engineDeployed.html?engineDeployedId=' + did;
  },

  handleNoteForm(e) {

     const s = JSON.stringify(this.noteForm);

     console.log(s);

     // POST to remote server
     fetch('../api/clientNotes.php', {
       method: "POST", // *GET, POST, PUT, DELETE, etc.
       headers: {
           "Content-Type": "application/json; charset=utf-8"
       },
       body: s // body data type must match "Content-Type" header
     })

     .then( response => response.json() )
     .then( json => {this.clientNotes.push(json)})
     .catch( err => {
       console.error('NOTE POST ERROR:');
       console.error(err);
     })

     // Reset noteForm
     this.noteForm = this.getEmptyNoteForm();
   },

   getEmptyNoteForm() {
     return {
     }
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
    this.fetchSales(clientId);
    this.fetchNotes(clientId);

  },


})
