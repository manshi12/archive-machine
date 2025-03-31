xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      var resultData = JSON.parse(xhr.responseText);
      if (resultData) {
        if (check === 0) {
          populateSearchOptions(stype, resultData);
        }
        
        if (stype === 'sgr') {
          commonsearch('fetchLEBasedonSGR', resultData[0]['id'], searchParam, 'le', 0);
        } 
        else if (stype === 'le_') {
          commonsearch('fetchSGRBasedonLE', resultData[0]['id'], searchParam, 'sgr', 0);
        } 
        else if (stype === 'sgr') {
          if (document.getElementById("selectsgr_code").value !== '' && 
              document.getElementById("selectle_code").value !== '') {
            checkForCreditFilesle(document.getElementById("selectsgr_code").value,
                                document.getElementById("selectle_code").value);
          } 
          else if (document.getElementById("txtsgr_code").value !== '') {
            commonsearch('fetchLegalEntityBasedonID',
                        document.getElementById("txtsgr_code").value, searchParam, 'le', 0);
          } 
          else {
            if (check === 0) {
              populateSearchOptions('sgr', resultData);
            }
          }
        }
        else if (stype === 'le') {
          if (document.getElementById("selectsgr_code").value !== '' && 
              document.getElementById("selectle_code").value !== '') {
            checkForCreditFiles(document.getElementById("selectsgr_code").value,
                              document.getElementById("selectle_code").value);
          }
          else if (document.getElementById("txtsgr_code").value !== '') {
            commonsearch('fetchLegalEntityBasedonID',
                        document.getElementById("txtsgr_code").value, searchParam, 'le', 0);
          }
          else {
            if (check === 0) {
              populateSearchOptions('sgr', resultData);
            }
          }
        }
        
        // Handle no results case
        if (check === 1) {
          document.getElementById("codria_span").innerHTML = '';
          alert("No references are available for this LE.");
        }
      }
      else {
        emptydropdown(stype);
        if (stype === 'sgr') {
          var rtype = 'le';
          emptydropdown(rtype);
        }
      }
    } 
    else {
      alert("AJAX request failed with status: " + xhr.status);
      document.getElementById("loading_wrap").style.display = 'none';
    }
  }
};
xhr.send("searchType=" + encodeURIComponent(searchType) + "&searchString=" + encodeURIComponent(searchString));
