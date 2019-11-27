const csvtojson = require('convert-csv-to-json');
let matches = csvtojson
  .fieldDelimiter(',')
  .getJsonFromCsv('../data/matches.csv');
const fs = require('fs');
let deliveries = csvtojson
  .fieldDelimiter(',')
  .getJsonFromCsv('../data/deliveries.csv');
const fr = require('./ipl.js');
//extra runs function called

var extrarun = fr.extraRunsScored(matches, deliveries, '2016');
var converting_extrarun_to_string = JSON.stringify(extrarun); //converting objects to string
fs.writeFileSync(
  '../output/Extra_Runs_Scored.json',
  converting_extrarun_to_string,
  'utf-8'
);
//----------------------------
//count of matches
var countMatches = fr.countOfMatches(matches, deliveries);
var converting_countMatches_to_string = JSON.stringify(countMatches); //converting objects to string

fs.writeFileSync(
  '../output/Count_Of_Matches.json',
  converting_countMatches_to_string,
  'utf-8'
);
//----------------------------
//matches per year
var Matchesperyear = fr.matchesPerYear(matches, deliveries);
var converting_Matchesperyear_to_string = JSON.stringify(Matchesperyear); //converting objects to string

fs.writeFileSync(
  '../output/Matches_Per_Year.json',
  converting_Matchesperyear_to_string,
  'utf-8'
);
//----------------------------
//top 10 economic bowlers
var bowlers = fr.top10EconomicBowlers(matches, deliveries, '2015');
var converting_bowlers_to_string = JSON.stringify(bowlers); //converting objects to string

fs.writeFileSync(
  '../output/Top_Ten_Economic_Bowlers.json',
  converting_bowlers_to_string,
  'utf-8'
);
//review------------------------------
//mostValuablePalyer
const frr = require('./review.js');
var Players = frr.mostValuablePlayer(matches);
var converting_Players_to_string = JSON.stringify(Players); //converting objects to string

fs.writeFileSync(
  '../output/Valuable_Player.json',
  converting_Players_to_string,
  'utf-8'
);
//number of teams who won the match and also won the toss
var teams = frr.teamsWhoWonTheTossAndMatch(matches);
var converting_teams_to_string = JSON.stringify(teams);
fs.writeFileSync(
  '../output/Number_Of_Times_Winning_Toss_Team_Won_The_Match.json',
  converting_teams_to_string,
  'utf-8'
);
//strike rate of Virat kholi for each season
var strikeRateVirat = frr.strikeRateOfVirat(matches, deliveries, 'V Kohli');
var converting_strikeRateVirat_to_string = JSON.stringify(strikeRateVirat);
fs.writeFileSync(
  '../output/Strike_Rate_Of_Virat_Kholi_Every_Season.json',
  converting_strikeRateVirat_to_string,
  'utf-8'
);
var bowler = frr.bowlerWithBestEconomy(deliveries);
var converting_bowler_to_string = JSON.stringify(bowler);
fs.writeFileSync(
  '../output/Bowler_Which_Has_Best_Economy_In_Super_Over.json',
  converting_bowler_to_string,
  'utf-8'
);

var dismissed = frr.highestNumberOfTimesOnePlayerDismissedOther(deliveries);
var converting_dismissed_to_string = JSON.stringify(dismissed);
fs.writeFileSync(
  '../output/Number_Of_Times_One_Player_dismissed_Other_Player.json',
  converting_dismissed_to_string,
  'utf-8'
);
