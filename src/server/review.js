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
  console.log(arrayOfEachSeason);

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

module.exports = {
  mostValuablePlayer
};
