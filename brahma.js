// Function to handle input field search
function inputfieldsearch(param) {
    var searchString = "", searchType = "", searchParam = "", stype = "";
    
    // Show loading indicator if you have one
    if (document.getElementById("loading_wrap")) {
        document.getElementById("loading_wrap").style.display = 'block';
    }
    
    // Check which option is selected (Sub-group or LE)
    var isLeOptionSelected = document.getElementById("le_option").checked;
    
    if (param === 'txtsgr_code' || param === 'txtsgr_name') {
        stype = 'sgr';
        
        if (param === 'txtsgr_code') {
            searchType = 'fetchSubGroupBasedonID';
            searchString = document.getElementById("txtsgr_code").value;
        } else if (param === 'txtsgr_name') {
            searchType = 'fetchSubGroupBasedonName';
            searchString = document.getElementById("txtsgr_name").value;
        }
        
        if (searchType !== "" && searchString !== '') {
            commonsearch(searchType, searchString, searchParam, stype, 1);
        } else {
            if (document.getElementById("loading_wrap")) {
                document.getElementById("loading_wrap").style.display = 'none';
            }
        }
    } else if (param === 'txtle_code' || param === 'txtle_name') {
        stype = 'le';
        
        if (param === 'txtle_code') {
            searchType = 'fetchLegalEntityBasedonID';
            searchString = document.getElementById("txtle_code").value;
        } else if (param === 'txtle_name') {
            searchType = 'fetchLegalEntityBasedonName';
            searchString = document.getElementById("txtle_name").value;
        }
        
        if (searchType !== "" && searchString !== '') {
            commonsearch(searchType, searchString, searchParam, stype, 1);
        } else {
            if (document.getElementById("loading_wrap")) {
                document.getElementById("loading_wrap").style.display = 'none';
            }
        }
    }
}

// Modified common search function
function commonsearch(searchType, searchString, searchParam, stype, check) {
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", "dbe_cfl_user_accessTransferSave.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var resultData = JSON.parse(xhr.responseText);
                
                if (resultData && resultData.length > 0) {
                    // Get the selected option (Sub-group or LE)
                    var isLeOptionSelected = document.getElementById("le_option").checked;
                    
                    if (stype === 'sgr') {
                        // Update Sub-group fields
                        if (document.getElementById("txtsgr_code")) {
                            document.getElementById("txtsgr_code").value = resultData[0].id || '';
                        }
                        if (document.getElementById("txtsgr_name")) {
                            document.getElementById("txtsgr_name").value = resultData[0].name || '';
                        }
                        
                        // If Sub-group option is selected, update CODRIA field
                        if (!isLeOptionSelected && document.getElementById("codria_code")) {
                            document.getElementById("codria_code").value = resultData[0].codria || '';
                        }
                        
                        // In Sub-group mode, don't fetch LE data
                        if (!isLeOptionSelected) {
                            // Clear LE fields
                            if (document.getElementById("txtle_code")) {
                                document.getElementById("txtle_code").value = '';
                            }
                            if (document.getElementById("txtle_name")) {
                                document.getElementById("txtle_name").value = '';
                            }
                        } else {
                            // Only in LE mode, fetch LE data based on SGR
                            commonsearch('fetchLEBasedonSGR', resultData[0].id, searchParam, 'le', 0);
                        }
                    } else if (stype === 'le') {
                        // Update LE fields
                        if (document.getElementById("txtle_code")) {
                            document.getElementById("txtle_code").value = resultData[0].id || '';
                        }
                        if (document.getElementById("txtle_name")) {
                            document.getElementById("txtle_name").value = resultData[0].name || '';
                        }
                        
                        // If LE option is selected, update CODRIA for LE field
                        if (isLeOptionSelected && document.getElementById("codria_le_code")) {
                            document.getElementById("codria_le_code").value = resultData[0].codria || '';
                        }
                    }
                    
                    // Optionally check for credit files if needed
                    if (document.getElementById("selectsgr_code") && document.getElementById("selectle_code") &&
                        document.getElementById("selectsgr_code").value && document.getElementById("selectle_code").value) {
                        checkForCreditFiles(document.getElementById("selectsgr_code").value, document.getElementById("selectle_code").value);
                    }
                } else {
                    if (check === 0) {
                        alert("No Matching Results Found...! or You are not authorized to see this SGR/LE, please contact the Banking Administrator.");
                    }
                    
                    // Handle empty results for specific types
                    if (stype === 'le') {
                        if (check === 1) {
                            if (document.getElementById("codria_span")) {
                                document.getElementById("codria_span").innerHTML = '';
                            }
                            alert("No references are available for this LE.");
                        } else {
                            emptydropdown(stype);
                        }
                    } else if (stype === 'sgr') {
                        emptydropdown(stype);
                        emptydropdown('le');
                    }
                }
                
                // Hide loading indicator
                if (document.getElementById("loading_wrap")) {
                    document.getElementById("loading_wrap").style.display = 'none';
                }
            } else {
                alert("AJAX request failed with status: " + xhr.status);
                
                if (document.getElementById("loading_wrap")) {
                    document.getElementById("loading_wrap").style.display = 'none';
                }
            }
        }
    };
    
    xhr.send("searchType=" + encodeURIComponent(searchType) + "&searchString=" + encodeURIComponent(searchString));
}

// Helper function to reset dropdown fields
function emptydropdown(stype) {
    if (stype === 'sgr') {
        if (document.getElementById("txtsgr_code")) {
            document.getElementById("txtsgr_code").value = '';
        }
        if (document.getElementById("txtsgr_name")) {
            document.getElementById("txtsgr_name").value = '';
        }
    } else if (stype === 'le') {
        if (document.getElementById("txtle_code")) {
            document.getElementById("txtle_code").value = '';
        }
        if (document.getElementById("txtle_name")) {
            document.getElementById("txtle_name").value = '';
        }
    }
}

// Updated toggle function for CODRIA fields
function toggleCodriaFields() {
    if (document.getElementById('le_option').checked) {
        // If LE is selected
        document.getElementById('codria_label').style.display = 'none';
        document.getElementById('codria_field').style.display = 'none';
        document.getElementById('codria_le_label').style.display = '';
        document.getElementById('codria_le_field').style.display = '';
        
        // Clear SGR-related CODRIA
        if (document.getElementById("codria_code")) {
            document.getElementById("codria_code").value = '';
        }
    } else {
        // If Sub-group is selected
        document.getElementById('codria_label').style.display = '';
        document.getElementById('codria_field').style.display = '';
        document.getElementById('codria_le_label').style.display = 'none';
        document.getElementById('codria_le_field').style.display = 'none';
        
        // Clear LE-related CODRIA
        if (document.getElementById("codria_le_code")) {
            document.getElementById("codria_le_code").value = '';
        }
    }
    
    // Additional reset of fields based on selected option
    if (document.getElementById('le_option').checked) {
        // In LE mode, optionally clear SGR fields
        // Comment these out if you want to keep values
        /*
        if (document.getElementById("txtsgr_code")) {
            document.getElementById("txtsgr_code").value = '';
        }
        if (document.getElementById("txtsgr_name")) {
            document.getElementById("txtsgr_name").value = '';
        }
        */
    } else {
        // In SGR mode, optionally clear LE fields
        // Comment these out if you want to keep values
        /*
        if (document.getElementById("txtle_code")) {
            document.getElementById("txtle_code").value = '';
        }
        if (document.getElementById("txtle_name")) {
            document.getElementById("txtle_name").value = '';
        }
        */
    }
}

// Function to fetch details - updated
function fetchDetails() {
    var codriaValue;
    var selectedOption;
    
    if (document.getElementById('le_option').checked) {
        codriaValue = document.getElementById('codria_le_code').value;
        selectedOption = 'LE';
    } else {
        codriaValue = document.getElementById('codria_code').value;
        selectedOption = 'Sub-group';
    }
    
    if (!codriaValue) {
        alert("Please enter a CODRIA value");
        return;
    }
    
    console.log("Fetching details with CODRIA value: " + codriaValue + " for " + selectedOption);
    
    // You can add your fetch logic here
    // For example:
    /*
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "fetch_codria_details.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultData = JSON.parse(xhr.responseText);
            // Process the data
        }
    };
    
    xhr.send("codriaValue=" + encodeURIComponent(codriaValue) + "&optionType=" + encodeURIComponent(selectedOption));
    */
}
