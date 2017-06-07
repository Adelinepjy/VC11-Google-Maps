function validationMsgs(message, title, button) {
    navigator.notification.alert(
        message,
        function () { },
        title,
        button
    );
}