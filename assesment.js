//Use mysql12 package
const mysql = require('mysql2');

// Creating connection to db
const connection = mysql.createConnection({
  host: 'sql.freedb.tech',    
  user: 'freedb_shavinu',         
  password: 'x5CA!$jRp9ecW?7', 
  database: 'freedb_assementshavinu' 
});

// Connecting the db
connection.connect((err) => {
  if (err) {
    console.error('Error in connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});


//SQL query
//Write the code for returning all the players who can be 
//borrowed into a specific team based on the rules applicable to the division.
function getBorrowablePlayers(teamID) {
  const query = `
    SELECT p.Player_ID, p.Player_Name, p.Player_Gender
    FROM player p
    JOIN team t ON p.Team_ID = t.Team_ID
    WHERE t.Division_ID = (
      SELECT Division_ID
      FROM team
      WHERE Team_ID = ?
    )
    AND p.Team_ID <> ?;
  `;

  // Execute the query
  connection.query(query, [teamID, teamID], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Borrowable players:', results);
  });
}

// Define the team ID 
const targetTeamID = 3; 

// Call the function to get borrowable players
getBorrowablePlayers(targetTeamID);

// Disconnecting the db
connection.end((err) => {
  if (err) {
    console.error('Error in closing the database connection:', err);
    return;
  }
  console.log('Database connection closed!');
});
