"use strict"

//*Menu functions.
//*Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//*region 

//? app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'",yesNo,people).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
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
  
  //? Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

function singleCriteraSearch(people) {
  let num = displayCriteria();
  let personArr;
  switch(num) {
    case "1":
      let eyeColor = promptFor("Enter eye color:\n(Blue,Brown,Black,Hazel,Green)".toLowerCase(),eyeValidation,people);
      personArr = searchByEyeCriteria(people,eyeColor);
      return displayArrPeople(personArr);
    case "2":
      let id = parseInt(promptFor("Enter ID: ",idValidation,people));
      personArr = searchByID(people,id);
      return displayArrPeople(personArr);
    case "3":
      let height = parseInt(promptFor("Enter height: ",heightValidation,people));
      personArr = searchByHeight(people,height);
      return displayArrPeople(personArr);
    case "4":
      let weight = parseInt(promptFor("Enter weight: ",weightValidation,people));
      personArr = searchByWeight(people,weight);
      return displayArrPeople(personArr);
    case "5":
      let gender = promptFor("Enter gender: ",genderValitdation);
      personArr = searchByGender(people,gender);
      return displayArrPeople(personArr);
  }
  
}

function multipleCriteraSearch(people) {
  let num = parseInt(promptFor("How many criteria do you want in your search? \nEnter a number 2 - 5:", autoValid));
  let counter = 0;
  let multArr = []
  while (counter < num) {
    multArr.push(parseInt(displayCriteria()));
    counter++;
  }
  return searchByMultipleCriteria(people,multArr);
}

function displayArrPeople(personArr) {
  let array = [];
  let counter = 1;
  personArr.forEach(function (element) {
    array.push(counter + ": " + element.firstName + " " + element.lastName);
    counter++;
  })
  let person = prompt(array.join("\n") + "\n\nwhich would you like to see information on?" + " (1-" + personArr.length + ")");
  return personArr[person-1];
}
        

 // let arrCriteria = [data.eyeColor, data.id, data.height]
function displayCriteria() {
    //print options console
    let num = prompt("Which would you like to select?\n1: Eye color \n2: ID \n3: Height\n4: Weight\n5: Gender");
    return num;
}

//? Menu function to call once you find who you are looking for
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
    mainMenu(person,people);
    break;
    case "family": // get person's family
    displayFamily(people, person)
    break;
    case "descendants": // get person's descendants
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

//*endregion

//*Filter functions.
//*Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//*region 
// Prompts user for what they would like to search by
// function receives data set
// then parses for desired criteria
// returns list/array of objects that match criteria
// display list to console for user to view

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", firstNameValidation, people);
  let lastName = promptFor("What is the person's last name?", lastNameValidation, people);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

function searchByMultipleCriteria(people,arrChoices) {
  let personArr = people;
  for(let i=0;i<arrChoices.length;i++) {
    switch(arrChoices[i]) {
      case 1:
        let eyeColor = promptFor("Enter eye color:\n(Blue,Brown,Black,Hazel,Green)".toLowerCase(),eyeValidation,people);
        personArr = searchByEyeCriteria(personArr,eyeColor);
        break;
      case 2:
        let id = parseInt(promptFor("Enter ID: ",idValidation,people));
        personArr = searchByID(personArr,id);
        break;
      case 3:
        let height = promptFor("Enter height: ",heightValidation,people);
        personArr = searchByHeight(personArr,height);
        break;
      case 4:
        let weight = promptFor("Enter weight: ",weightValidation,people);
        personArr = searchByWeight(personArr,weight);
        break;
      case 5:
        let gender = promptFor("Enter gender: ",genderValitdation);
        personArr = searchByGender(personArr,gender);
        break;    
    }
  }
  return displayArrPeople(personArr);
}

//Searches through an array of people to find matching eye colors. Use searchByName as reference.
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

function searchByParentID(people, person) {
  let foundPeople = people.filter(function(potentialMatch){
    if (potentialMatch === person || potentialMatch.parents.length === 0) {
      return false
    } else if(JSON.stringify(potentialMatch.parents) === JSON.stringify(person.parents)){
      return true;
    } else{
      return false;
    }
  })

  return foundPeople;
}


//*endregion

//*Display functions.
//*Functions for user interface.
/////////////////////////////////////////////////////////////////
//*region - display functions

//? alerts a list of people
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
    + "\nGender: " + person.gender 
    + "\nDOB: " + person.dob 
    + "\nHeight: " + person.height 
    + "\nWeight: " + person.weight 
    + "\nEyecolor: " + person.eyeColor 
    + "\nOccupation: " + person.occupation
  alert(personInfo);
}

const displayFamily = function (people, person) {
  let spouse = searchByID(people, person.currentSpouse)
  let parents = personParents(people, person);
  let siblings = searchByParentID(people, person)
  // person.parents.forEach(function (element){
  //   parents.push(searchByID(people,element));
  // }); //searchByID(people, person.parents)
  let msg = alert(`
  ${person.firstName} ${person.lastName}'s Immediate Family:
  Spouse: ${hasSpouse(spouse)}
  Parent(s): ${hasParents(parents)}
  Sibling(s): ${hasSiblings(siblings)}
  `)
  return msg
}

function displayDescendants(people,person) {
  let tempA = [];
  let array = descendantsRecursive(people,person,tempA);

  if(array.length>=0) {
    let newArray = [];
    let counter = 1;
    array.forEach(function (element) {
      newArray.push(counter + ": " + element.firstName + " " + element.lastName);
      counter++;
    });
    alert(newArray.join("\n"));
  
  } else {
    alert("The selected person has no descendants.");
  }
  
  mainMenu(person,people);
}

function descendantsRecursive(people,person,temp) {
  let newArray=temp;
  let newEntry = false;
  people.forEach(function (element) {
    if(element.parents[0]===person.id) {
      newArray.push(element);
      newEntry = true;
      //descendantsRecursive(people,element,newArray);
    } 
    else if(element.parents[1]===person.id) {
      newArray.push(element);
      newEntry = true;
      //descendantsRecursive(people,element,newArray);
    } 
  });
  if(newEntry) {
    newArray.forEach(function (element) {
        descendantsRecursive(people,element,newArray);
    });
  }
  return newArray;
}

function personParents(people, person) {
  let parents = []
  person.parents.forEach(function (element){
    parents.push(searchByID(people,element));
  })
  return parents
}

//*endregion


//*Validation functions.
//*Functions to validate user input.
//*///////////////////////////////////////////////////////////////
//*region 
//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).

function promptFor(question,valid,people){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response,people);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    alert("Invalid Response! Please try again and type: Yes or No")
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input,people) {
  return true; // default validation only
}

function eyeValidation(input,people){
  let validateInput = generateEye(people);
  // ["blue","brown","black","hazel","green"];
  return validateInput.includes(input);
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function generateEye(people) {
  let arr = [];
    people.forEach(function(element){
      arr.push(element.eyeColor);
    });
    return arr;
}

function firstNameValidation (input, people) {
  let firstName = generateFirstNames (people);
  return firstName.includes(input);
}
function lastNameValidation (input, people) {
  let firstName = generateLastNames (people);
  return firstName.includes(input);
}

function idValidation(input,people) {
   let idPeople = generateIds(people);
  //  [272822514,401222887,409574486,260451248,629807187,464142841,
  //   982411429,595767575,693243224,888201200,878013758,951747547,159819275,348457184,
  //   294874671,931247228,822843554,819168108,969837479,313207561,313997561,313998000];
    return idPeople.includes(parseInt(input));
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function generateFirstNames (people) {
  let arr = [];
  people.forEach(function(element){
    arr.push(element.firstName);
  });
  return arr;
}

function generateLastNames (people) {
  let arr = [];
  people.forEach(function(element){
    arr.push(element.lastName);
  });
  return arr;
}

function generateIds(people) {
    let arr = [];
    people.forEach(function(element){
      arr.push(element.id);
    });
    return arr;
}

function genderValitdation(input) {
  return input==="male" || input==="female";
}

function heightValidation(input,people) {
  let heightPeople = generateHeights(people);
  return heightPeople.includes(parseInt(input));
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function generateHeights(people) {
  let arr = [];
  people.forEach(function (element) {
    arr.push(element.height);
  });
  return arr;
}

function weightValidation(input,people) {
  let weightPeople = generateWeights(people);
  return weightPeople.includes(parseInt(input));
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function generateWeights(people) {
  let arr = [];
  people.forEach(function (element) {
    arr.push(element.weight);
  });
  return arr;
}

const hasSpouse = function (spouse) {
  if (spouse.length >= 1) {
    return `${spouse[0].firstName} ${spouse[0].lastName}`
  } else {
    return "N/A"
  }
}

const hasParents = function (parents) {
  let parentNames = ""
  if (parents.length >= 1) {
    for (let i = 0; i < parents.length; i++)
    parentNames += `${parents[i][0].firstName} ${parents[i][0].lastName} - `
    return parentNames
  } 
  else {
    return "N/A"
  }
}

const hasSiblings = function (siblings) {
  let siblingNames = ""
  if (siblings.length >= 1) {
    for (let i = 0; i < siblings.length; i++)
    siblingNames += `${siblings[i].firstName} ${siblings[i].lastName} - `
    return siblingNames
  } 
  else {
    return "N/A"
  }
}

//*endregion