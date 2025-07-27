
const calculateAge = (dateString) => Math.floor((Date.now() - new Date(dateString)) / (365.25 * 24 * 60 * 60 * 1000));

const calculateAgeFromDate = (dateString) => {
    if(dateString instanceof Date){
      return calculateAge(dateString)
    }
    const dateWithoutString = dateString.replace(/^"|"$/g, "")
    const age = calculateAge(dateWithoutString)
    return age
}


function isoToDateFormatted(isoDate) {
  
  const date = new Date(isoDate);
  
  const monthNames = [
    "January", "February", "March", 
    "April", "May", "June", 
    "July", "August", "September", 
    "October", "November", "December"
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


function formatLastSeen(dateString) {

  const now = new Date();
  const date = new Date(dateString);
  
  const diffTime = now - date;
  const diffYears = now.getFullYear() - date.getFullYear();
  const diffMonths = (now.getMonth() - date.getMonth()) + diffYears * 12;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60)) % 24;
  const diffMinutes = Math.floor(diffTime / (1000 * 60)) % 60;

  if (diffYears > 0) {
    return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
  } else if (diffMonths > 0) {
    return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
  } else if (diffDays > 0) {
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  } else if (diffMinutes > 0) {
    return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
  } else {
    return "Just now";
  }
}


function getValidPreferences(limit, preferences) {
  const idx = preferences.indexOf(limit);
  return preferences.slice(idx);
}


module.exports = {
  getDaysDifference, getValidPreferences, formatLastSeen,
  calculateAgeFromDate, isoToDateFormatted,
}