/* eslint-disable no-unused-vars */
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

      let arrayOfJson = Object.entries(json);

      let arrayOfYearAndCurentYear = arrayOfJson.reduce((year, currentYear) => {
        year.push(Object.entries(currentYear[1]));
        return year;
      }, []);

      let creatingArrayOfTeamsDismissal = [];
      arrayOfYearAndCurentYear.reduce((Dummy1, teamsWithValues) => {
        teamsWithValues.reduce((Dummy2, c) => {
          creatingArrayOfTeamsDismissal.push(c);
          return Dummy2;
        }, []);
        return Dummy1;
      }, []);

      let collectingEveryDismissedValueForEachTeam = creatingArrayOfTeamsDismissal.reduce(
        (teamsWithValues, teams) => {
          if (teamsWithValues[teams[0]]) {
            teamsWithValues[teams[0]].push(teams[1]);
          } else {
            teamsWithValues[teams[0]] = [];
            teamsWithValues[teams[0]].push(teams[1]);
          }
          return teamsWithValues;
        },
        []
      );

      let makingObjectsForEveryteamWithWins = Object.entries(
        collectingEveryDismissedValueForEachTeam
      ).reduce((teams, arrayOfWins) => {
        teams[arrayOfWins[0]] = arrayOfWins[1];
        return teams;
      }, {});

      let generatingSeriesPatternsWithNameAndValues = Object.entries(
        makingObjectsForEveryteamWithWins
      );
      generatingSeriesPatternsWithNameAndValues = generatingSeriesPatternsWithNameAndValues.map(
        element => ({
          name: element[0],
          data: element[1]
        })
      );

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
        series: generatingSeriesPatternsWithNameAndValues
      });
    });
}
      matches_per_year_chart();
      extra_runs_scored_chart();
      top_ten_economic_bowlers();
      count_of_matches();