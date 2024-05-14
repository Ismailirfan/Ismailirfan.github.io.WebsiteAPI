$(document).ready(function() {

  $("#fetchDataBtn").click(function() {
    var url = $("#urlInput").val();

    // Basic validation
    if (!url) {
      $("#errorDisplay").text("Please enter a valid website URL.");
      return;
    }

    $.ajax({
      url: '/fetch-data', // Make a request to your Node.js API endpoint
      data: { url: url }, // Send the URL as a query parameter
      dataType: "text",
      beforeSend: function() {
        $("#dataDisplay").html("Fetching data...");
        $("#errorDisplay").text(""); // Clear any previous errors
      },
      success: function(data) {
        $("#dataDisplay").html(data); // Display fetched data
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var errorMessage = "Error: " + textStatus + " - " + errorThrown;
        $("#dataDisplay").html(""); // Clear potentially incomplete data
        $("#errorDisplay").text(errorMessage);
      }
    });
  });

});
