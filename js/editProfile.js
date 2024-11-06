$(document).ready(function() {
    // Retrieve name and email from localStorage and set to input fields if they exist
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedAge = localStorage.getItem("age");
    const storedPhone = localStorage.getItem("phone");
    const storedAddress = localStorage.getItem("address");
    const storedBio = localStorage.getItem("bio");

    // Populate the input fields with the stored values (if available)
    if (storedName) $("#myName").val(storedName);
    if (storedEmail) $("#myEmail").val(storedEmail);
    if (storedAge) $("#myAge").val(storedAge);
    if (storedPhone) $("#myPhone").val(storedPhone);
    if (storedAddress) $("#myAddress").val(storedAddress);
    if (storedBio) $("#myBio").val(storedBio);

    // Track if there are unsaved changes
    let isModified = false;

    // Set up event listener for input changes
    $("#myName, #myEmail, #myAge, #myPhone, #myAddress, #myBio").on("input", function() {
        isModified = true;
    });

    // Handle tab click events (check for unsaved changes)
    $(".tab").click(function(event) {
        if (isModified) {
            // Prevent switching tabs if there are unsaved changes
            event.preventDefault();
            createSnackbar("Please save your changes before switching tabs.", true);
        } else {
            const tab = $(this).data("tab");

            // Hide all text content and show the clicked tab's content
            $(".text").hide();
            $("." + tab).show();

            // Remove active class and add it to the clicked tab
            $(".tab").removeClass("active-tab");
            $(this).addClass("active-tab");
        }
    });

    // Handle the Save button click event
    $("#editSaveBtn").click(function(event) {
        event.preventDefault(); // Prevent form submission

        // Save updated values to localStorage
        localStorage.setItem("name", $("#myName").val().trim()); // You may choose not to save the name as it's fixed
        localStorage.setItem("email", $("#myEmail").val().trim()); // You may choose not to save the email as it's fixed
        localStorage.setItem("age", $("#myAge").val().trim());
        localStorage.setItem("phone", $("#myPhone").val().trim());
        localStorage.setItem("address", $("#myAddress").val().trim());
        localStorage.setItem("bio", $("#myBio").val().trim());

        // Reset modified flag after saving
        isModified = false;

        // Optionally show a confirmation message
        createSnackbar("Changes saved successfully.");
    });
});
