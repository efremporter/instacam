const getDateDifference = pastDate => {
  const date1 = new Date(); // Retreives current date
  const date2 = new Date(pastDate); // Date the post was created
  const dateDifferenceInMinutes = ((date1 - date2) / 1000) / 60
  console.log(dateDifferenceInMinutes)
  const dateDifferenceInHours = dateDifferenceInMinutes / 60;
  const dateDifferenceInDays = dateDifferenceInHours / 24;
  if (dateDifferenceInMinutes < 1) {
    return `<${1}m`
  } else if (dateDifferenceInHours < 1) {
    return `${Math.floor(dateDifferenceInMinutes)}m`;
  } else if (dateDifferenceInDays < 1) {
    return `${Math.floor(dateDifferenceInHours)}h`;
  } else if (dateDifferenceInDays <= 7) {
    return `${Math.floor(dateDifferenceInDays)}d`;
  } else {
    return `${Math.floor(dateDifferenceInDays / 7)}w`; // Returns difference in weeks
  };
};

export default getDateDifference;