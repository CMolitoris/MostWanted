"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let singleMult = promptFor("Would you like to use single or multiple criteria in your search? (Valid input: Single/Multiple)".toLowerCase(),autoValid);
      if(singleMult.localeCompare("single")===0) {
        searchResults = singleCriteraSearch(people);
      } else if(singleMult.localeCompare("multiple")===0) {
        searchResults = multipleCriteraSearch(people);
      }
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

function singleCriteraSearch(people) {
  let num = displayCriteria();
  let personArr;
  switch(num) {
    case "1":
      let eyeColor = promptFor("Enter eye color:\n(Blue,Brown,Black,Hazel,Green)".toLowerCase(),autoValid);
      personArr = searchByEyeCriteria(people,eyeColor);
      return displayArrPeople(personArr);
    case "2":
      let id = promptFor("Enter ID: ",autoValid);
      personArr = searchByID(people,id);
      return displayArrPeople(personArr);
    case "3":
      let height = promptFor("Enter height: ",autoValid);
      personArr = searchByHeight(people,height);
      return displayArrPeople(personArr);
    case "4":
      let weight = promptFor("Enter weight: ",autoValid);
      personArr = searchByWeight(people,weight);
      return displayArrPeople(personArr);
    case "5":
      let gender = promptFor("Enter gender: ",autoValid);
      personArr = searchByGender(people,gender);
      return displayArrPeople(personArr);
  }
  
}

// function multipleCriteraSearch(people) {
//   let num = promptFor("How many criteria do you want in your search? \nEnter a number 2 - 5:", autoValid);
//   let counter = 0;
//   let multArr = []
//   while (counter < num) {
//     multArr.push(promptFor(parseInt(displayCriteria)))
//   }
// }

function displayArrPeople(personArr) {
  for(let i=0;i<personArr.length;i++) {
    console.log((i+1) + ": " + personArr[i].firstName + " " + personArr[i].lastName);
  }
  let person = prompt("which would you like to see information on?" + " (1-" + personArr.length + ")");
  return personArr[person-1];
}
        

 // let arrCriteria = [data.eyeColor, data.id, data.height]
function displayCriteria() {
    //print options console
    let num = prompt("Which would you like to select?\n1: Eye color \n2: ID \n3: Height\n4: Weight\n5: Gender");
    return num;
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    // "parents": [],
		// "currentSpouse": 260451248
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson[0];
}

function searchByMultipleCriteria(people,arrChoices) {
  let personArr = people;
  for(let i=0;i<arrChoices;i++) {
    switch(arrChoices[i]) {
      case 1:
        let eyeColor = promptFor("Enter eye color:\n(Blue,Brown,Black,Hazel,Green)".toLowerCase(),autoValid);
        personArr = searchByEyeCriteria(people,eyeColor);
        break;
      case 2:
        let id = promptFor("Enter ID: ",autoValid);
        personArr = searchByID(people,id);
        break;
      case 3:
        let height = promptFor("Enter height: ",autoValid);
        personArr = searchByHeight(people,height);
        break;
      case 4:
        let weight = promptFor("Enter weight: ",autoValid);
        personArr = searchByWeight(people,weight);
        break;
      case 5:
        let gender = promptFor("Enter gender: ",autoValid);
        personArr = searchByGender(people,gender);
        break;    
    }
  }
}


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeCriteria(people,criteria){
    let foundPeople = people.filter(function(potentialMatch){
      if(potentialMatch.eyeColor === criteria){
        return true;
      }
      else{
        return false;
      }
    })
  
    return foundPeople;
}  
//TODO: add other trait filter functions here.
function searchByGender(people,criteria) {
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.gender === criteria){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPeople;
}

function searchByID(people,criteria) {
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.id === criteria){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPeople;
}

function searchByHeight(people,criteria) {
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.height === criteria){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPeople;
}

function searchByWeight(people,criteria) {
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.weight === criteria){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPeople;
}


// Prompts user for what they would like to search by
// function receives data set
// then parses for desired criteria
// returns list/array of objects that match criteria
// display list to console for user to view


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName 
    + "Gender: " + person.gender 
    + "\nDOB: " + person.dob 
    + "\nHeight: " + person.height 
    + "\nWeight: " + person.weight 
    + "\nEyecolor: " + person.eyeColor 
    + "\nOccupation: " + person.occupation
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion