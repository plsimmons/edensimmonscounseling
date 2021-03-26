$("#submit").click(function() {
    $("#submit").prop("disabled", true);
    $("#error").html("<p></p>");
    $("#success").html("<p></p>");

    var errorText = "";
    var wasError = false;
    if (!$("#fname").val()) {
        wasError = true;
        errorText += "We're missing your First Name.<br/>";
    }
    if (!$("#lname").val()) {
        wasError = true;
        errorText += "We're missing your Last Name.<br/>";
    }
    if (!$("#phone").val()) {
        wasError = true;
        errorText += "We're missing your Phone Number.<br/>";
    }
    if (!$("#email").val()) {
        wasError = true;
        errorText += "We're missing your Email Address.<br/>";
    }
    if (!$("#subject").val()) {
        wasError = true;
        errorText += "We're missing your Subject.<br/>";
    }
    if (!$("#message").val()) {
        wasError = true;
        errorText += "We're missing your Message.<br/>";
    }

    if (wasError) {
        $("#error").html("<p>There was a problem with your form submission. <br/>" + errorText + "</p>");
        $("#submit").prop("disabled", false);
    } else {
        var message = "First Name: " + $("#fname").val() + "\nLast Name: " + $("#lname").val() + "\nPhone: " + $("#phone").val() + "\nEmail: " + $("#email").val() + "\nSubject: " + $("#subject").val() + "\nMessage: " + $("#message").val()
        var key = "70734d83-28ba-43b4-aa6d-781e0ac9c9e2";
        $.ajax({
            type: 'POST',
            url: 'https://simplenotifier.azurewebsites.net/api/simpleendpoint',
            dataType: 'json',
            data: JSON.stringify({ Message: message, Key: key }),
            contentType: 'application/json; charset=utf-8;',
            success: function() {
                $("#success").html("<p>Thank you, your message has been delivered!</p>");
            },
            error: function(error) {
                $("#error").html("<p>Something went wrong when attempting to deliver the message. Plerase refresh the page and try again.</p>");;
            }
        });
    }
})