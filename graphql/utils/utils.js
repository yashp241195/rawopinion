const { GraphQLError } = require("graphql")

const calculateAge = (dateString) => Math.floor((Date.now() - new Date(dateString)) / (365.25 * 24 * 60 * 60 * 1000));

const GQLError = (code, msg) => new GraphQLError(msg, { extensions: { code } })

const isValidInput = (joiSchema, input) => {
    const hasError = joiSchema.validate(input).error
    if (hasError) { throw GQLError(hasError.message, "INVALID_INPUT") } 
    return "VALID_INPUT" 
}

const GQLErrorFilter = (code, defaulterror, errormap) =>{ 
    if(code === "VERIFY_ACCESS_TOKEN_FAILED"){
      return GQLError("VERIFY_ACCESS_TOKEN_FAILED","access token verification failed")
    }
    if(errormap){
      for (let i=0;i < errormap.length; i++){
        if(errormap[i][0] === code){
            return GQLError(errormap[i][0],errormap[i][1])
        }
      }
    }    
    return GQLError(code, defaulterror)
}

const removeQuotesFromString = (stringWithQuotes) => {
  return stringWithQuotes.replace(/^"|"$/g, "");
}

const calculateAgeFromDate = (dateString) => {
    if(dateString instanceof Date){
      return calculateAge(dateString)
    }
    const dateWithoutString = removeQuotesFromString(dateString)
    const age = calculateAge(dateWithoutString)
    return age
}


function isoToDateFormatted(isoDate) {
  const date = new Date(isoDate);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  
  const formattedDate = `${month} ${day}, ${year}`;
  
  return formattedDate;
}

function getDaysDifference(givenDate) {
  const currentDate = new Date();
  const timeDifference = currentDate - givenDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

function getLastseen(dateDiff){
  let lastseen = "last seen recently"
  if(dateDiff > 1){ lastseen = "last seen yesterday" }
  if(dateDiff > 2){ lastseen = "last seen within a week" }
  if(dateDiff > 7){ lastseen = "last seen a week ago" }
  if(dateDiff > 14){ lastseen = "last seen few weeks ago" }
  if(dateDiff > 30){ lastseen = "last seen a month ago" }
  if(dateDiff > 60){ lastseen = "last seen a long time ago" }
  return lastseen
}


module.exports = {
  getDaysDifference, getLastseen,
  calculateAgeFromDate, isValidInput, GQLError, 
  GQLErrorFilter, isoToDateFormatted,removeQuotesFromString
}