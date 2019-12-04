function mostValuablePlayer(matches) {
  var player = matches.reduce((players, match) => {
    if (players[match['season']]) {
      if (players[match['season']][match['player_of_match']])
        players[match['season']][match['player_of_match']]++;
      else players[match['season']][match['player_of_match']] = 1;
    } else {
      players[match['season']] = {};
      players[match['season']][match['player_of_match']] = 1;
    }
    return players;
  }, {});

  let arrayOfEachSeason = Object.entries(player);

  let temp = arrayOfEachSeason.reduce((eachSeason, eachSeasonEntires) => {
    eachSeason[[eachSeasonEntires[0]]] = Object.entries(eachSeasonEntires[1]);
    return eachSeason;
  }, {});
  var mostValuablePlayerPerSeason = {};
  for (var key in temp) {
    let max_man_of_match = 0;
    var player_of_match = '';
    var season = '';
    for (var keys in temp[key]) {
      if (max_man_of_match < temp[key][keys][1]) {
        max_man_of_match = temp[key][keys][1];
        player_of_match = temp[key][keys][0];
        season = key;
      }
    }

    mostValuablePlayerPerSeason[season] = player_of_match;
  }

  return mostValuablePlayerPerSeason;
}
function teamsWhoWonTheTossAndMatch(matches) {
  var onlyThoseObjectsInWhichTossWinnerAndMatchWinnerAreSame=matches.filter((match)=>match["toss_winner"]==match["winner"]); 
  var teamsWhoWonMatchAndToss = onlyThoseObjectsInWhichTossWinnerAndMatchWinnerAreSame.reduce((countOfTeamsWhoWonTheMatchAndToss, matches) => {
      if (countOfTeamsWhoWonTheMatchAndToss[matches["toss_winner"]]) 
        countOfTeamsWhoWonTheMatchAndToss[matches["toss_winner"]]++;
      else countOfTeamsWhoWonTheMatchAndToss[matches["toss_winner"]] = 1;
      return countOfTeamsWhoWonTheMatchAndToss;
    },
    {}
  );
  
  return teamsWhoWonMatchAndToss;
}

function strikeRateOfVirat(matches, deliveries, player) {
  var runsAndBallsPerMatch = deliveries.reduce((perBallruns, delivery) => {
    if (delivery['batsman'] == player) {
      if (perBallruns[delivery['match_id']]) {
        if (perBallruns[delivery['match_id']]['runs']) {
          perBallruns[delivery['match_id']]['runs'] += parseInt(
            delivery['batsman_runs']
          );
          perBallruns[delivery['match_id']]['balls']++;
        }
      } else {
        perBallruns[delivery['match_id']] = {};
        perBallruns[delivery['match_id']]['runs'] = parseInt(
          delivery['batsman_runs']
        );
        perBallruns[delivery['match_id']]['balls'] = 1;
      }
    }
    return perBallruns;
  }, {});
  //generate  matches played per season
  let totalRuns = 0;
  let totalBalls = 0;
  //grouping season wise runs and balls
  let runsAndBallsPerSeason = matches.reduce(
    (groupingSeasonWiseRunsAndBalls, matchInsideMatches) => {
      if (groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']]) {
        if (runsAndBallsPerMatch.hasOwnProperty(matchInsideMatches['id'])) {
          if (
            groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']]['runs']
          ) {
            totalRuns = runsAndBallsPerMatch[matchInsideMatches['id']]['runs'];
            totalBalls =
              runsAndBallsPerMatch[matchInsideMatches['id']]['balls'];
            groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']][
              'runs'
            ] += totalRuns;
            groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']][
              'balls'
            ] += totalBalls;
          } else {
            totalRuns = runsAndBallsPerMatch[matchInsideMatches['id']]['runs'];
            totalBalls =
              runsAndBallsPerMatch[matchInsideMatches['id']]['balls'];
            groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']][
              'runs'
            ] = totalRuns;
            groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']][
              'balls'
            ] = totalBalls;
          }
        }
      } else {
        if (runsAndBallsPerMatch.hasOwnProperty(matchInsideMatches['id'])) {
          groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']] = {};
          groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']]['runs'] =
            runsAndBallsPerMatch[matchInsideMatches['id']]['runs'];
          groupingSeasonWiseRunsAndBalls[matchInsideMatches['season']][
            'balls'
          ] = runsAndBallsPerMatch[matchInsideMatches['id']]['balls'];
        }
      }
      return groupingSeasonWiseRunsAndBalls;
    },
    {}
  );
  let runsAndBallsPerSeasonIntoArray = Object.entries(runsAndBallsPerSeason);
  let strikeRateOverAll = runsAndBallsPerSeasonIntoArray.reduce(
    (perSeasonEconomy, perSeasonRunsAndBalls) => {
      perSeasonEconomy[perSeasonRunsAndBalls[0]] =
        (perSeasonRunsAndBalls[1].runs / perSeasonRunsAndBalls[1].balls) * 100;
      return perSeasonEconomy;
    },
    {}
  );
  return strikeRateOverAll;
}
function bowlerWithBestEconomy(deliveries) {
  let onlySuperOvers = deliveries.filter(
    match => match['is_super_over'] != '0'
  );

  let collectionOfBowlers = onlySuperOvers.reduce((bowlers, matches) => {
    if (bowlers[matches['bowler']]) {
      bowlers[matches['bowler']]['runs'] += parseInt(matches['total_runs']);
      bowlers[matches['bowler']]['balls']++;
    } else {
      bowlers[matches['bowler']] = {};
      bowlers[matches['bowler']]['runs'] = parseInt(matches['total_runs']);
      bowlers[matches['bowler']]['balls'] = 1;
    }
    return bowlers;
  }, {});
  let collectionOfBowlersArray = Object.entries(collectionOfBowlers);
  let bowlersWithEcnonomy = collectionOfBowlersArray.reduce(
    (bowlersEconomy, bowler) => {
      bowlersEconomy[bowler[0]] = (bowler[1].runs / bowler[1].balls) * 6;
      return bowlersEconomy;
    },
    {}
  );
  let bowlersWithEcnonomyArray = Object.entries(bowlersWithEcnonomy);
  let BestestEconomicBolwer = bowlersWithEcnonomyArray
    .sort((a, b) => a[1] - b[1])
    .slice(0, 1);
  return BestestEconomicBolwer;
}

function highestNumberOfTimesOnePlayerDismissedOther(deliveries) {
  let onlyDismissed = deliveries.filter(
    delivery => delivery['player_dismissed'] != ''
  );
  let DismissedBy = onlyDismissed.reduce((dismissed, matches) => {
    if (dismissed[matches['player_dismissed']]) {
      if (dismissed[matches['player_dismissed']][matches['bowler']])
        dismissed[matches['player_dismissed']][matches['bowler']]++;
      else dismissed[matches['player_dismissed']][matches['bowler']] = 1;
    } else {
      dismissed[matches['player_dismissed']] = {};
      dismissed[matches['player_dismissed']][matches['bowler']] = 1;
    }
    return dismissed;
  }, {});

  let creationOfSingleArrayInValues = Object.entries(DismissedBy).reduce(
    (batsman, bowler) => {
      batsman[bowler[0]] = Object.entries(bowler[1]).sort(
        (bowler1, bowler2) => bowler2[1] - bowler1[1]
      );
      return batsman;
    },
    {}
  );

  let dismissed = Object.entries(creationOfSingleArrayInValues).reduce(
    (batsman, bowler) => {
      batsman[bowler[0]] = bowler[1][0];
      return batsman;
    },
    {}
  );
  return dismissed;
}
module.exports = {
  mostValuablePlayer,
  teamsWhoWonTheTossAndMatch,
  strikeRateOfVirat,
  bowlerWithBestEconomy,
  highestNumberOfTimesOnePlayerDismissedOther
};
