$(document).ready(function () {
    // Default tab activation on page load
    function activateDefaultTab() {
        $(".text").hide(); // Hide all text content
        $(".myprofile").show(); // Show the My Profile content
        $(".tab").removeClass("active-tab"); // Remove active class from all tabs
        $(".myprofile").addClass("active-tab"); // Add active class to the first tab
    }

    // Call the function to activate the default tab
    activateDefaultTab();

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
    $("#myName, #myEmail, #myAge, #myPhone, #myAddress, #myBio").on("input", function () {
        isModified = true;
    });

    // Handle tab click events (check for unsaved changes)
    $(".tab").click(function (event) {
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
            $(".myprofile").removeClass("active-tab");
            $(this).addClass("active-tab");
        }
    });

    // Handle the Save button click event
    $("#editSaveBtn").click(function (event) {
        event.preventDefault(); // Prevent form submission

        // Save updated values to localStorage
        localStorage.setItem("name", $("#myName").val().trim());
        localStorage.setItem("email", $("#myEmail").val().trim());
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
