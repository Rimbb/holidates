#!/usr/bin/env node

const clear = require("clear");
const chalk = require("chalk");
const axios = require("axios");
const prompts = require("prompts");
const country = require("country-list");
const uri = "https://date.nager.at/api/v2/publicholidays/";

const questions = [
  {
    type: "text",
    name: "givenCountry",
    message: "Country?"
  },
  {
    type: "number",
    name: "givenYear",
    message: "Year?"
  }
];

var holiday = async () => {
  const response = await prompts(questions);
  var thatCountry = response.givenCountry;
  var thatYear = response.givenYear;

  var countryCode = country.getCode(thatCountry);

  try {
    const result = await axios.get(`${uri}${thatYear}/${countryCode}`);
    var holidays = Array.from(result.data);

    console.log(chalk.bgGreen(`Public holidays in ${thatCountry} for ${thatYear} :`));

    holidays.forEach(el => {
      console.log(`${el.date} : ${el.name}.`);
    });
    
  } catch (err) {
    console.log(
      chalk.bgRed(
        "Incorrect values provided. Please try again."
      )
    );
    holiday();
  }
};

clear();
holiday();
