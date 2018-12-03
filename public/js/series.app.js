var seriesApp = new Vue({
  el: '#seriesMain',
  data:{

    series: []

},
methods: {

  fetchSeries(eid) {
  fetch('api/timeSeries.php?engineDeployedId='+eid)
  .then( response => response.json() )
  .then( json => {this.series = json; console.log(this.series)} )
  .catch( err => {
      console.log('TIME SERIES FETCH ERROR:');
      console.log(err);
    })
  },


},

  created () {
    const url = new URL(window.location.href);
    const engineDeployedId = url.searchParams.get('engineDeployedId') || 0;
    console.log('Engine Deployed ID: '+ engineDeployedId);
    this.series.engineDeployedId = engineDeployedId;

    if (!engineDeployedId) {
      console.error('Engine Deployed Id not defined in URL parameters.')
    }


    this.fetchSeries(engineDeployedId);

  }


})
