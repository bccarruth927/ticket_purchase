//Object containing the data for the various form elements
const formInputs = {
    tickets: {
        number: document.getElementById('numTickets'),
        error: document.getElementById('msgTickets')
    },
    cost: document.getElementById('totalCost'),
    name: {
        id: document.getElementById('name'),
        error: document.getElementById('msgname')
    },
    email: {
        id: document.getElementById('email'),
        error: document.getElementById('msgemail')
    },
    contact: document.getElementById('contactInformation'),
    submit: document.getElementById('submit')
};

//Object containing the regular expressions
const regExpressions = {
    letters: /^[A-Za-z\s]+$/,
    email: /^\S+@\S+(\.)\S+$/
};

//Objects for export
export { formInputs, regExpressions };