const statusMail = (name,jobDetals,status) => {
    let mailBody;
if(status == 'Best Fit') {
    mailBody = `We saw your profile on Job Solutions and thought you would be a great match for the opportunity. 
    Please submit a quick application if you have any interest.`;
}else {
    mailBody = `We saw your profile on Job Solutions and thought you would be a not match for the opportunity. 
    Thank you for your response.`
}
return (
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Solutions</title>
  <style>
    table,tr,td {
      border : 2px solid black;
      border-collapse: collapse;
    }
    td {
      padding: 10px;
    }
  </style>
</head>
<body>
  <p>Hi ${name},</p>
  <br/>
  <p>${mailBody}</p>
    <table style="margin-left:20px">
      <tr>
        <td>Job Title</td>
        <td>${jobDetals.jobTitle}</td>
      </tr>
      <tr>
        <td>Job Id</td>
        <td>#${jobDetals.jobId}</td>
      </tr>
      <tr>
        <td>Company Name</td>
        <td>${jobDetals.user.companyName}</td>
      </tr>
      <tr>
        <td>Salary Range</td>
        <td>${jobDetals.salaryRange} (Monthly)</td>
      </tr>
    </table>
</body>
</html>`
);
}
module.exports = {statusMail};