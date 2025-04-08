// Create radio button HTML string
var radioHtml = '<input type="radio" name="codria" ' +
'id="codria' + response[0].CODRIA + '" ' +
'value="' + response[0].CODRIA + '" ' +
'checked="checked" ' +
  // added new line 
'onchange="fetchUserDropdownDetails(\'codria\', \'sgr\')">' + 
response[0].CODRIA;

// Set innerHTML directly for IE5
codriaSpan.innerHTML = radioHtml;

// Also explicitly call this function to ensure state is properly initialized
fetchUserDropdownDetails('codria', 'sgr');
