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

  let mostValuablePlayerPerSeason = Object.entries(player).reduce(
    (mostValuablePlayerPerSeason, currentSeason) => {
      mostValuablePlayerPerSeason[currentSeason[0]] = Object.entries(
        currentSeason[1]
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 1)[0];
      return mostValuablePlayerPerSeason;
    },
    {}
  );

  return mostValuablePlayerPerSeason;
}
function teamsWhoWonTheTossAndMatch(matches) {
  var onlyThoseObjectsInWhichTossWinnerAndMatchWinnerAreSame = matches.filter(
    match => match['toss_winner'] == match['winner']
  );
  var countOfTeamsWhoWonTheMatchAndToss = onlyThoseObjectsInWhichTossWinnerAndMatchWinnerAreSame.reduce(
    (countOfTeamsWhoWonTheMatchAndToss, matches) => {
      if (countOfTeamsWhoWonTheMatchAndToss[matches['toss_winner']])
        countOfTeamsWhoWonTheMatchAndToss[matches['toss_winner']]++;
      else countOfTeamsWhoWonTheMatchAndToss[matches['toss_winner']] = 1;
      return countOfTeamsWhoWonTheMatchAndToss;
    },
    {}
  );

  return countOfTeamsWhoWonTheMatchAndToss;
}

function strikerRateOfPlayer(matches, deliveries, player) {
  const seasonWithId = matches.reduce((seasonWithId, match) => {
    if (seasonWithId[match.season]===undefined) {
      seasonWithId[match.season] = [match.id];
    } else {
      let arrayOfIdsForParticularSeason = seasonWithId[match.season];
      arrayOfIdsForParticularSeason.push(match.id);
      seasonWithId[match.season] = arrayOfIdsForParticularSeason;
    }
    return seasonWithId;
  }, {});
  const season = Object.keys(seasonWithId);
  const strikeRate = season.reduce((strikeRate, year) => {
    const batsman = deliveries.reduce((totalRunsAndBalls, balls) => {
      if (
        seasonWithId[year].includes(balls.match_id) &&
        balls.batsman === player
      ) {
        if (!totalRunsAndBalls[year]) {
          totalRunsAndBalls[year] = {};
        }
        if (totalRunsAndBalls[year].ballsOfbBatsman) {
          totalRunsAndBalls[year].ballsOfbBatsman += 1;
        } else {
          totalRunsAndBalls[year].ballsOfbBatsman = 1;
        }
        if (totalRunsAndBalls[year].runsByBatsman) {
          totalRunsAndBalls[year].runsByBatsman += parseInt(balls.batsman_runs);
        } else {
          totalRunsAndBalls[year].runsByBatsman = parseInt(balls.batsman_runs);
        }
      }
      return totalRunsAndBalls;
    }, {});
    strikeRate = Object.assign(strikeRate, batsman);
    return strikeRate;
  }, {});
  
  const entriesOfBatsmanStats = Object.entries(strikeRate);
  
  
  const runRate = entriesOfBatsmanStats.reduce((runRate, currentYearRunsAndBalls) => {
    runRate[currentYearRunsAndBalls[0]] = (currentYearRunsAndBalls[1].runsByBatsman / currentYearRunsAndBalls[1].ballsOfbBatsman) * 100;
    return runRate;
  }, {});
  
  return runRate;
}
function bowlerWithBestEconomy(deliveries) {
  let onlySuperOvers = deliveries.filter(
    balls => balls['is_super_over'] != '0'
  );

  let bowlersWithRunsAndBalls = onlySuperOvers.reduce((bowlers, balls) => {
    if (bowlers[balls['bowler']]) {
      bowlers[balls['bowler']]['runs'] += parseInt(balls['total_runs']);
      bowlers[balls['bowler']]['balls']++;
    } else {
      bowlers[balls['bowler']] = {};
      bowlers[balls['bowler']]['runs'] = parseInt(balls['total_runs']);
      bowlers[balls['bowler']]['balls'] = 1;
    }
    return bowlers;
  }, {});
  let collectionOfBowlersArray = Object.entries(bowlersWithRunsAndBalls);
  let bowlersWithEcnonomy = collectionOfBowlersArray.reduce(
    (bowlersEconomy, bowler) => {
      bowlersEconomy[bowler[0]] = (bowler[1].runs / bowler[1].balls) * 6;
      return bowlersEconomy;
    },
    {}
  );
  let bowlersWithEcnonomyArray = Object.entries(bowlersWithEcnonomy);
  let bestestEconomicBolwer = bowlersWithEcnonomyArray
    .sort((a, b) => a[1] - b[1])
    .slice(0, 1);
  return bestestEconomicBolwer;
}

function highestNumberOfTimesOnePlayerDismissedOther(deliveries) {
  let onlyDismissed = deliveries.filter(
    delivery => delivery['player_dismissed'] != ''
  );
  let dismissedBy = onlyDismissed.reduce((dismissedBy, delivery) => {
    if (dismissedBy[delivery['player_dismissed']]) {
      if (dismissedBy[delivery['player_dismissed']][delivery['bowler']])
        dismissedBy[delivery['player_dismissed']][delivery['bowler']]++;
      else dismissedBy[delivery['player_dismissed']][delivery['bowler']] = 1;
    } else {
      dismissedBy[delivery['player_dismissed']] = {};
      dismissedBy[delivery['player_dismissed']][delivery['bowler']] = 1;
    }
    return dismissedBy;
  }, {});

  let dismissedByArray = Object.entries(dismissedBy).reduce(
    (batsman, bowler) => {
      batsman[bowler[0]] = Object.entries(bowler[1]).sort(
        (bowler1, bowler2) => bowler2[1] - bowler1[1]
      );
      return batsman;
    },
    {}
  );

  let dismissed = Object.entries(dismissedByArray).reduce(
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
  strikerRateOfPlayer,
  bowlerWithBestEconomy,
  highestNumberOfTimesOnePlayerDismissedOther
};
