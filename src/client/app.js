function matches_per_year_chart() {
  fetch('../output/Matches_Per_Year.json')
    .then(response => response.json())
    .then(json => {
      const arrayOfKeys = Object.keys(json);
      const arrayOfValues = Object.values(json);

      Highcharts.chart('matches_per_year', {
        chart: {
          type: 'column'
        },

        title: {
          text: 'Matches Played Per Year'
        },
        subtitle: {
          text: 'Source: Kaggle.com'
        },
        xAxis: {
          categories: arrayOfKeys,
          crosshair: true,
          title: {
            text: 'Number of Years'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of Matches'
          }
        },

        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Matches',
            data: arrayOfValues,
            color: '#BA2F16'
          }
        ]
      });
    });
}

function extra_runs_scored_chart() {
  fetch('../output/Extra_Runs_Scored.json')
    .then(response => response.json())
    .then(json => {
      const arrayOfKeys = Object.keys(json);
      const arrayOfValues = Object.values(json);

      Highcharts.chart('extra_runs_scored_chart', {
        chart: {
          type: 'bar'
        },

        title: {
          text: 'Extra Runs Scored'
        },
        subtitle: {
          text: 'Source: Kaggle.com'
        },
        xAxis: {
          categories: arrayOfKeys,
          crosshair: true,
          title: {
            text: 'Teams'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of Matches'
          }
        },

        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Matches',
            data: arrayOfValues,
            colorByPoint: true
          }
        ]
      });
    });
}
function top_ten_economic_bowlers() {
  fetch('../output/Top_Ten_Economic_Bowlers.json')
    .then(response => response.json())
    .then(json => {
      const arrayOfKeys = Object.keys(json);
      const arrayOfValues = Object.values(json);

      Highcharts.chart('top_ten_economic_bowler', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Top Ten Economic Bowlers'
        },
        subtitle: {
          text: 'Source:www.kaggle.com'
        },
        xAxis: {
          categories: arrayOfKeys,
          crosshair: true,
          title: {
            text: 'Players'
          }
        },
        yAxis: {
          title: {
            text: 'Economy'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: true
          }
        },
        series: [
          {
            name: 'Ecnonomy',
            data: arrayOfValues,
            colorByPoint: true
          }
        ]
      });
    });
}
////////////////////////////////////////////////////
function count_of_matches() {
  fetch('../output/Count_Of_Matches.json')
    .then(response => response.json())
    .then(json => {
      const arrayOfKeys = Object.keys(json);

      obj1 = Object.entries(json);

      let y = obj1.reduce((year, currentYear) => {
        year.push(Object.entries(currentYear[1]));
        return year;
      }, []);

      let arr = [];
      y.reduce((acc, teamsWithValues) => {
        teamsWithValues.reduce((a, c) => {
          arr.push(c);
          return a;
        }, []);
      }, []);

      let temp1 = arr.reduce((a, c) => {
        if (a[c[0]]) {
          a[c[0]].push(c[1]);
        } else {
          a[c[0]] = [];
          a[c[0]].push(c[1]);
        }
        return a;
      }, []);

      let ca = Object.entries(temp1).reduce((a, b) => {
        a[b[0]] = b[1];
        return a;
      }, {});

      let series = Object.entries(ca);
      series = series.map(element => ({
        name: element[0],
        data: element[1]
      }));

      Highcharts.chart('count_of_matches', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Matches Won By Teams Per Year'
        },
        xAxis: {
          categories: arrayOfKeys
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number Of Matches'
          }
        },

        plotOptions: {
          column: {
            stacking: 'normal'
          }
        },
        series: series
      });
    });
}
