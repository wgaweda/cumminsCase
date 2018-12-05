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


fetchSensorTimeSeries (eid) {
  fetch('api/timeSeries.php?engineDeployedId='+eid)
  .then( response => response.json() )
  .then( json => {this.series = json;
    console.log(this.series);
    this.formatOutput();
    this.buildOutputChart();
    this.buildHeatRateChart();
    this.buildCompChart();
    this.buildAvailabilityChart();
    this.buildReliabilityChart();
    this.buildFiredHoursChart();
  } )
  .catch( err => {
    console.log('SENSOR TIME SERIES ERROR:');
    console.log(err);
})
},

formatOutput() {
      this.series.forEach (
        (entry, index, arr) => {
          entry.dataCollectedDate = Date.parse(entry.dataCollectedDate); // Convert to ms since Jan 1, 1970 UTC
      });

      // DEBUG: Make sure the data is how we want it:
      console.log(this.series);
},

buildOutputChart() {

    var data = {};
    console.log('start data is', data);
    this.series.forEach(i => {
      if (!(i.engineDeployedId in data)) {
        data[i.engineDeployedId] = [];
        console.log('created', data[i.engineDeployedId]);
      } else {
        console.log('array is already defined');
      }
      data[i.engineDeployedId].push([i.dataCollectedDate, i.output]);
    });
    console.log('Restructured data');
    console.log(data);

    var mySeries = Object.keys(data);
    console.log(Object.keys(data));
    mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
    console.log('Restructured data as series');
    console.log(mySeries);


     Highcharts.chart('outputChart', {
           title: {
               text: 'Output Chart'
           },
           xAxis: {
               text: 'datetime'
           },
           yAxis: {
               title: {
                   text: 'Output'
               }
           },
           legend: {
               enabled: false
           },
           plotOptions: {
               area: {
                   fillColor: {
                       linearGradient: {
                           x1: 0,
                           y1: 0,
                           x2: 0,
                           y2: 1
                       },
                       stops: [
                           [0, Highcharts.getOptions().colors[0]],
                           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                       ]
                   },
                   marker: {
                       radius: 2
                   },
                   lineWidth: 1,
                   states: {
                       hover: {
                           lineWidth: 1
                       }
                   },
                   threshold: null
               }
           },

           series: mySeries
       });
   },


   buildHeatRateChart() {

       var data = {};
       console.log('start data is', data);
       this.series.forEach(i => {
         if (!(i.engineDeployedId in data)) {
           data[i.engineDeployedId] = [];
           console.log('created', data[i.engineDeployedId]);
         } else {
           console.log('array is already defined');
         }
         data[i.engineDeployedId].push([i.dataCollectedDate, i.heatRate]);
       });
       console.log('Restructured data');
       console.log(data);

       var mySeries = Object.keys(data);
       console.log(Object.keys(data));
       mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
       console.log('Restructured data as series');
       console.log(mySeries);


        Highcharts.chart('heatRateChart', {
              title: {
                  text: 'Heat Rate Chart'
              },
              xAxis: {
                  text: 'datetime'
              },
              yAxis: {
                  title: {
                      text: 'Heat Rate'
                  }
              },
              legend: {
                  enabled: false
              },
              plotOptions: {
                  area: {
                      fillColor: {
                          linearGradient: {
                              x1: 0,
                              y1: 0,
                              x2: 0,
                              y2: 1
                          },
                          stops: [
                              [0, Highcharts.getOptions().colors[0]],
                              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                          ]
                      },
                      marker: {
                          radius: 2
                      },
                      lineWidth: 1,
                      states: {
                          hover: {
                              lineWidth: 1
                          }
                      },
                      threshold: null
                  }
              },

              series: mySeries
          });
      },

      buildCompChart() {

          var data = {};
          console.log('start data is', data);
          this.series.forEach(i => {
            if (!(i.engineDeployedId in data)) {
              data[i.engineDeployedId] = [];
              console.log('created', data[i.engineDeployedId]);
            } else {
              console.log('array is already defined');
            }
            data[i.engineDeployedId].push([i.dataCollectedDate, i.compressorEfficiency]);
          });
          console.log('Restructured data');
          console.log(data);

          var mySeries = Object.keys(data);
          console.log(Object.keys(data));
          mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
          console.log('Restructured data as series');
          console.log(mySeries);


           Highcharts.chart('compChart', {
                 title: {
                     text: 'Compressor Efficiency Chart'
                 },
                 xAxis: {
                     text: 'datetime'
                 },
                 yAxis: {
                     title: {
                         text: 'Compressor Efficiency'
                     }
                 },
                 legend: {
                     enabled: false
                 },
                 plotOptions: {
                     area: {
                         fillColor: {
                             linearGradient: {
                                 x1: 0,
                                 y1: 0,
                                 x2: 0,
                                 y2: 1
                             },
                             stops: [
                                 [0, Highcharts.getOptions().colors[0]],
                                 [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                             ]
                         },
                         marker: {
                             radius: 2
                         },
                         lineWidth: 1,
                         states: {
                             hover: {
                                 lineWidth: 1
                             }
                         },
                         threshold: null
                     }
                 },

                 series: mySeries
             });
         },


      buildAvailabilityChart() {

          var data = {};
          console.log('start data is', data);
          this.series.forEach(i => {
            if (!(i.engineDeployedId in data)) {
              data[i.engineDeployedId] = [];
              console.log('created', data[i.engineDeployedId]);
            } else {
              console.log('array is already defined');
            }
            data[i.engineDeployedId].push([i.dataCollectedDate, i.availability]);
          });
          console.log('Restructured data');
          console.log(data);

          var mySeries = Object.keys(data);
          console.log(Object.keys(data));
          mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
          console.log('Restructured data as series');
          console.log(mySeries);


           Highcharts.chart('availChart', {
                 title: {
                     text: 'Availability Chart'
                 },
                 xAxis: {
                     text: 'datetime'
                 },
                 yAxis: {
                     title: {
                         text: 'Availability'
                     }
                 },
                 legend: {
                     enabled: false
                 },
                 plotOptions: {
                     area: {
                         fillColor: {
                             linearGradient: {
                                 x1: 0,
                                 y1: 0,
                                 x2: 0,
                                 y2: 1
                             },
                             stops: [
                                 [0, Highcharts.getOptions().colors[0]],
                                 [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                             ]
                         },
                         marker: {
                             radius: 2
                         },
                         lineWidth: 1,
                         states: {
                             hover: {
                                 lineWidth: 1
                             }
                         },
                         threshold: null
                     }
                 },

                 series: mySeries
             });
         },

         buildReliabilityChart() {

             var data = {};
             console.log('start data is', data);
             this.series.forEach(i => {
               if (!(i.engineDeployedId in data)) {
                 data[i.engineDeployedId] = [];
                 console.log('created', data[i.engineDeployedId]);
               } else {
                 console.log('array is already defined');
               }
               data[i.engineDeployedId].push([i.dataCollectedDate, i.reliability]);
             });
             console.log('Restructured data');
             console.log(data);

             var mySeries = Object.keys(data);
             console.log(Object.keys(data));
             mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
             console.log('Restructured data as series');
             console.log(mySeries);


              Highcharts.chart('reliaChart', {
                    title: {
                        text: 'Reliability Chart'
                    },
                    xAxis: {
                        text: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Reliability'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: mySeries
                });
            },


          buildFiredHoursChart() {

              var data = {};
              console.log('start data is', data);
              this.series.forEach(i => {
                if (!(i.engineDeployedId in data)) {
                  data[i.engineDeployedId] = [];
                  console.log('created', data[i.engineDeployedId]);
                } else {
                  console.log('array is already defined');
                }
                data[i.engineDeployedId].push([i.dataCollectedDate, i.firedHours]);
              });
              console.log('Restructured data');
              console.log(data);

              var mySeries = Object.keys(data);
              console.log(Object.keys(data));
              mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
              console.log('Restructured data as series');
              console.log(mySeries);


               Highcharts.chart('firedChart', {
                     title: {
                         text: 'Fired Hours Chart'
                     },
                     xAxis: {
                         text: 'datetime'
                     },
                     yAxis: {
                         title: {
                             text: 'Fired Hours'
                         }
                     },
                     legend: {
                         enabled: false
                     },
                     plotOptions: {
                         area: {
                             fillColor: {
                                 linearGradient: {
                                     x1: 0,
                                     y1: 0,
                                     x2: 0,
                                     y2: 1
                                 },
                                 stops: [
                                     [0, Highcharts.getOptions().colors[0]],
                                     [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                 ]
                             },
                             marker: {
                                 radius: 2
                             },
                             lineWidth: 1,
                             states: {
                                 hover: {
                                     lineWidth: 1
                                 }
                             },
                             threshold: null
                         }
                     },

                     series: mySeries
                 });
             },

    gotoEngine (eid) {
       window.location = 'engineDeployed.html?engineDeployedId=' + eid;
    }


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
    this.fetchSensorTimeSeries(engineDeployedId);

  }


})
