
  //------------------------------calculation of matches Per Year
  // eslint-disable-next-line no-unused-vars
  function matchesPerYear(matches, deliveries) {
    let matchesPeryear = matches.reduce((accummulatorOfMatches, match) => {
        accummulatorOfMatches[match['season']] = accummulatorOfMatches[match['season']] + 1 || 1;

      return accummulatorOfMatches;
    }, {});

    return matchesPeryear;
  }

  //-----------------------------calculation of count of matches
  // eslint-disable-next-line no-unused-vars 
   function countOfMatches(matches, deliveries) {
    let MatchesWonByteamPearYear = matches.reduce((accumulatorOfteams, match) => {
      if (match['winner'] !== '') {
        if (accumulatorOfteams[match['season']]) {
            accumulatorOfteams[match['season']][match['winner']] = accumulatorOfteams[match['season']][match['winner']] + 1 || 1;
        } else {
            accumulatorOfteams[match['season']] = {};
        }
      }
      return accumulatorOfteams;
    }, {});
    return MatchesWonByteamPearYear;
  }
  //---------------------------------------------------

  //----------------------------extra runs scored are generated here
  function extraRunsScored(matches, deliveries,season) {
    let matchId = matches.filter(m => m.season === season).map(m => m.id);//creating match id's array
    let extraRuns = deliveries.reduce((tempExtraRuns, delivery) => {
      if (matchId.includes(delivery.match_id)) {
        tempExtraRuns[delivery['bowling_team']] =
        tempExtraRuns[delivery['bowling_team']] + parseInt(delivery['extra_runs']) ||
          parseInt(delivery['extra_runs']);
      }

      return tempExtraRuns;
    }, {});
    return extraRuns;
  }

  //-----------------------top ten economic bowlers are calculated here for any season
  function top10EconomicBowlers(matches, deliveries,season) {
    let matchId = matches
      .filter(match => match.season === season)
      .map(match => match.id); //generating matchId's array
    const listOfPalyerstheirEconomies = deliveries.reduce(
      (perPlayerTotalRunsAndBalls, devlivery) => {
        if (matchId.includes(devlivery.match_id)) {
          if (!perPlayerTotalRunsAndBalls[devlivery['bowler']]) {
            perPlayerTotalRunsAndBalls[devlivery['bowler']] = {};
          }
          if (perPlayerTotalRunsAndBalls[devlivery['bowler']]['balls']) {
            perPlayerTotalRunsAndBalls[devlivery['bowler']]['balls']++;
          } else {
            perPlayerTotalRunsAndBalls[devlivery['bowler']]['balls'] = 1;
          }
          perPlayerTotalRunsAndBalls[devlivery['bowler']]['runs'] =
            perPlayerTotalRunsAndBalls[devlivery['bowler']]['runs'] +parseInt(devlivery['total_runs']) || parseInt(devlivery['total_runs']);
        }

        return perPlayerTotalRunsAndBalls;
      },{});
  let entriesPerPlayer=Object.entries(listOfPalyerstheirEconomies)
  let economyOfPlayers=entriesPerPlayer.reduce((economy,entry)=>{

    economy[entry[0]]=+((entry[1].runs/(entry[1].balls/6)).toFixed(2))
    return economy
  },{})


const topBolwers=Object.entries(economyOfPlayers).sort((a,b)=>a[1]-b[1]).slice(0,10)
 return topBolwers;
}
module.exports={
    matchesPerYear,
    countOfMatches,
    extraRunsScored,
    top10EconomicBowlers


}
