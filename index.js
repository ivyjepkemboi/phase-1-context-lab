// Helper function to calculate hours worked between two timestamps
function hoursWorked(timeIn, timeOut) {
    const timeInHour = parseInt(timeIn.split(' ')[1]);
    const timeOutHour = parseInt(timeOut.split(' ')[1]);
    return timeOutHour - timeInHour;
}

// Function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
        createTimeInEvent: function(timeStamp) {
            const [date, hour] = timeStamp.split(' ');
            this.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date: date });
            return this;
        },
        createTimeOutEvent: function(timeStamp) {
            const [date, hour] = timeStamp.split(' ');
            this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date: date });
            return this;
        },
        hoursWorkedOnDate: function(date) {
            const timeIn = this.timeInEvents.find(event => event.date === date).hour;
            const timeOut = this.timeOutEvents.find(event => event.date === date).hour;
            return hoursWorked(timeIn, timeOut);
        },
        wagesEarnedOnDate: function(date) {
            const hoursWorked = this.hoursWorkedOnDate(date);
            return hoursWorked * this.payPerHour;
        }
    };
}

// Function to create employee records from array of arrays
function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

// Function to find employee record by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

// Function to calculate all wages for an employee
function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0);

    return payable;
}

// Function to calculate total payroll for all employees
function calculatePayroll(arr) {
    return arr.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
