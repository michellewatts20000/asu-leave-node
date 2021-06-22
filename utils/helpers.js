module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  weeksToYears: function (x) {
    return (x / 52).toFixed(1)
  },

  numberWithCommas: function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
};