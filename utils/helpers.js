// Function to format a date in the format MM/DD/YYYY.
function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

// Export the formatDate function for use in other parts of the application.
module.exports = {
    formatDate
};