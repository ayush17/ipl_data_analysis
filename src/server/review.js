function mostValuablePlayer(matches) {
  var player = matches.reduce((a, c) => {
    if (a[c['season']]) {
      if (a[c['season']][c['player_of_match']])
        a[c['season']][c['player_of_match']]++;
      else a[c['season']][c['player_of_match']] = 1;
    } else {
      a[c['season']] = {};
    }
    return a;
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
function teamsWhoWonTheTossAndMatch(matches){
  var arrayOfEveryObjectsValues=matches.reduce((object,objectvalues)=>{ //pushing every object values inside matches as array
    object.push(Object.values(objectvalues)) 
    return object
  },[]);
      arrayOfEveryObjectsValues
      var filteredArrayOfEveryObjectsValues=arrayOfEveryObjectsValues.filter(first=>first[6]==first[10])//filtering only those matches in which toss and winner team are same 
      var countOfTeamsWhoWonTheMatchAndToss=filteredArrayOfEveryObjectsValues.reduce((acc,array)=>{
        if(acc[array[6]])
         acc[array[6]]++;
        else
        acc[array[6]]=1;
        return acc;
      },{});
      return countOfTeamsWhoWonTheMatchAndToss 
  }

function strikeRateOfVirat(matches,deliveries,){
  
  var runsAndBallsPerMatch=deliveries.reduce((acc,data)=>{
    if(data["batsman"]=="V Kohli"){
     if(acc[data["match_id"]]){
       if(acc[data["match_id"]]["runs"]){
        acc[data["match_id"]]["runs"]+=parseInt(data["batsman_runs"])
        acc[data["match_id"]]["balls"]++;
       }
        
     }
     else   {
     acc[data["match_id"]] = {}
      acc[data["match_id"]]["runs"]=parseInt(data["batsman_runs"])
      acc[data["match_id"]]["balls"]=1
      
     }
    }    
  return acc
  },{})
  let strikeRatePerSeason={}
  let totalruns=0;
  let totalballs=0;
  for(let matchid in runsAndBallsPerMatch){
    for(let id in matches ){
      if(matchid==matches[id]["id"]){
        
        //insert season in new object
        if(strikeRatePerSeason[matches[id]["season"]]){
          //add every matches runs and every matches balls
           totalruns+=runsAndBallsPerMatch[matchid]["runs"];
           totalballs+=runsAndBallsPerMatch[matchid]["balls"];
           //divide runs by balls and multiply by 100
          //save the result as new strike rate for that season
           strikeRatePerSeason[matches[id]["season"]]["strike_rate"]=((totalruns/totalballs)*100).toFixed(2);
        }
        else{
          strikeRatePerSeason[matches[id]["season"]]={}
           totalruns=0;
           totalballs=0;
        }
        
        
      }
    }
  }

  return strikeRatePerSeason
}
function bowlerWithBestEconomy(deliveries){
  let onlySuperOvers=deliveries.filter(match=>match["is_super_over"]!="0")
  
let collectionOfBowlersWhoBowledInSuperOverWithRuns=onlySuperOvers.reduce((bowlers,matches)=>{
      if(bowlers[matches["bowler"]])
        bowlers[matches["bowler"]] +=parseInt(matches["total_runs"])
      else
      bowlers[matches["bowler"]] =parseInt(matches["total_runs"])
  return bowlers
},{});
var arrayOfBestBowlersRuns=Object.values(collectionOfBowlersWhoBowledInSuperOverWithRuns).sort((a,b)=>a-b).slice(0,1)
var theBestBowlerWhoGaveLeastRuns=[]
for(let key in collectionOfBowlersWhoBowledInSuperOverWithRuns){
  if(collectionOfBowlersWhoBowledInSuperOverWithRuns[key]==arrayOfBestBowlersRuns[0]){
    theBestBowlerWhoGaveLeastRuns.push(key)
  }
}
return theBestBowlerWhoGaveLeastRuns
}
function highestNumberOfTimesOnePlayerDismissedOther(deliveries){
  let onlyDismissed=deliveries.filter(match=>match["player_dismissed"]!="")
   let numberOftimesOnePlayerIsDismissedByOther=onlyDismissed.reduce((dismissed,matches)=>{
          if(dismissed[matches['player_dismissed']]){
             if(dismissed[matches['player_dismissed']][matches["bowler"]])
             dismissed[matches['player_dismissed']][matches["bowler"]]++;
             else
             dismissed[matches['player_dismissed']][matches["bowler"]]=1;
            
          }
          else{
            dismissed[matches['player_dismissed']]={}
            dismissed[matches['player_dismissed']][matches["bowler"]]=1;
          }
    return dismissed
   },{});
   return numberOftimesOnePlayerIsDismissedByOther
}
module.exports = {
  mostValuablePlayer,
  teamsWhoWonTheTossAndMatch,
  strikeRateOfVirat,
  bowlerWithBestEconomy,
  highestNumberOfTimesOnePlayerDismissedOther
};
