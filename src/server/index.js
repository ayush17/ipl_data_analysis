const csvtojson=require('convert-csv-to-json');
let matches=csvtojson.fieldDelimiter(',').getJsonFromCsv("../data/matches.csv")
const fs=require("fs")
let deliveries=csvtojson.fieldDelimiter(',').getJsonFromCsv("../data/deliveries.csv")
const fr=require('./ipl.js');
//extra runs function called
      
   var extrarun=fr.extraRunsScored(matches, deliveries,'2016')
   var converting_extrarun_to_string=JSON.stringify(extrarun)//converting objects to string
   fs.writeFileSync("../output/Extra_Runs_Scored.json",converting_extrarun_to_string,'utf-8')
//----------------------------   
//count of matches
      var countMatches=fr.countOfMatches(matches, deliveries)
      var converting_countMatches_to_string=JSON.stringify(countMatches)//converting objects to string

      fs.writeFileSync("../output/Count_Of_Matches.json",converting_countMatches_to_string,'utf-8')
//----------------------------      
  //matches per year    
      var Matchesperyear=fr.matchesPerYear(matches, deliveries)
      var converting_Matchesperyear_to_string=JSON.stringify(Matchesperyear)//converting objects to string

      fs.writeFileSync("../output/Matches_Per_Year.json",converting_Matchesperyear_to_string,'utf-8')
   //----------------------------      
//top 10 economic bowlers      
var bowlers=fr.top10EconomicBowlers(matches, deliveries,'2015')
var converting_bowlers_to_string=JSON.stringify(bowlers)//converting objects to string

fs.writeFileSync("../output/Top_Ten_Economic_Bowlers.json",converting_bowlers_to_string,'utf-8')
//review------------------------------
const frr=require('./review.js');
var Players=frr.mostValuablePlayer(matches)
var converting_Players_to_string=JSON.stringify(Players)//converting objects to string

fs.writeFileSync("../output/Valuable_Player.json",converting_Players_to_string,'utf-8')