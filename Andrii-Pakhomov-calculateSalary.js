const salaries = {
  Manager: { salary: 1000, tax: "10%" },
  Designer: { salary: 600, tax: "30%" },
  Artist: { salary: 1500, tax: "15%" },
};
const team = [
  { name: "Misha", specialization: "Manager" },
  { name: "Max", specialization: "Designer" },
  { name: "Vova", specialization: "Designer" },
  { name: "Leo", specialization: "Artist" },
  //   Example of unvalid specialization (not included in salaries)
  { name: "Amogus", specialization: "Impostor" },
];

function calculateTeamFinanceReport(salaries, team) {
  // According to comments in test task "minimum specializations amount in salaries is 1"
  if (Object.keys(salaries).length < 1) {
    console.log("Min salaries list size is 1 item");
    alert("Min salaries list size is 1 item");
    return;
  }

  // According to comments in test task "maximum specializations amount in salaries is 10"
  if (Object.keys(salaries).length > 10) {
    console.log("Max salaries list size is 10 items");
    alert("Max salaries list size is 10 items");
    return;
  }

  // According to comments in test task "minimum specializations amount in team is 1"
  if (team.length < 1) {
    console.log("Min team size is 1 member");
    alert("Min team size is 1 member");
    return;
  }

  // According to comments in test task "maximum specializations amount in team is 100"
  if (team.length > 100) {
    console.log("Max team size is 100 members");
    alert("Max team size is 100 members");
    return;
  }

  // Filtering legit specializations (included in salary)
  const legitSpeacializations = team.filter(({ specialization }) =>
    salaries.hasOwnProperty(specialization)
  );
  // Creating initial value for return and for reduce method
  const resultObject = { totalBudgetTeam: 0 };

  // Using Array.prototype.reduce() method to calculate both total salary and total salaries of different specializations (both including taxes)
  legitSpeacializations.reduce((total, { specialization }) => {
    //   Destructuring for convinient use and good look
    const { salary, tax } = salaries[specialization];
    //   Making tax integer
    const taxInt = parseInt(tax);
    // According to comments in test tchecking if tax value between 0-99%"
    if (taxInt < 0 || taxInt > 99) {
      console.log(
        `Tax of ${specialization} is not correct, should be value between 0-99%. It will not be calculated.`
      );
      alert(
        `Tax of ${specialization} is not correct, should be value between 0-99%. It will not be calculated.`
      );
      return;
    }

    if (salary < 100 || salary > 100000) {
      console.log(
        `Salary of ${specialization} is not correct, should be value between 100-10000. It will not be calculated.`
      );
      alert(
        `Salary of ${specialization} is not correct, should be value between 100-10000. It will not be calculated.`
      );
      return;
    }

    const salaryWithTaxes = (salary / (100 - taxInt)) * 100;
    // Formatting result keys as in example and for better look
    const objectKey = "totalBudget" + specialization;
    //   Updating value of specialization included in returning object if needed and updating total salary value
    if (resultObject.hasOwnProperty(objectKey)) {
      resultObject[objectKey] += salaryWithTaxes;
      return (resultObject.totalBudgetTeam += salaryWithTaxes);
    }
    //   Creating specialization and assigning value in returning object and updating total salary value
    resultObject[objectKey] = salaryWithTaxes;
    return (resultObject.totalBudgetTeam += salaryWithTaxes);
  }, resultObject);

  //   Truncating the fractional part after all calculations
  const truncating = Object.keys(resultObject).map(
    (key) => (resultObject[key] = Math.trunc(resultObject[key]))
  );
  return resultObject;
}

// Returning final result
console.log(JSON.stringify(calculateTeamFinanceReport(salaries, team)));

// Example #2
const salaries2 = {
  TeamLead: { salary: 1000, tax: "99%" },
  Architect: { salary: 9000, tax: "34%" },
};
const team2 = [
  { name: "Alexander", specialization: "TeamLead" },
  { name: "Gaudi", specialization: "Architect" },
  { name: "Koolhas", specialization: "Architect" },
  { name: "Foster", specialization: "Architect" },
  { name: "Napoleon", specialization: "General" },
  //   Example of unvalid specialization (not included in salaries)
  { name: "Amogus", specialization: "Impostor" },
];
const financeReport2 = calculateTeamFinanceReport(salaries2, team2);
console.log(JSON.stringify(financeReport2));
