xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var resultData = JSON.parse(xhr.responseText);
            if (resultData) {
                // Initial population if check is 0
                if (check === 0) {
                    populateSearchOptions(stype, resultData);
                }

                // Handle different stype cases
                switch (stype) {
                    case 'sgr':
                        commonsearch('fetchLEBasedonSGR', resultData[0]['id'], searchParam, 'le', 0);
                        break;
                    
                    case 'le':
                        var sgrCode = document.getElementById("selectsgr_code").value;
                        var leCode = document.getElementById("selectle_code").value;
                        var txtSgrCode = document.getElementById("txtsgr_code").value;
                        
                        if (sgrCode !== '' && leCode !== '') {
                            checkForCreditFiles(sgrCode, leCode);
                        } else if (txtSgrCode !== '') {
                            commonsearch('fetchLegalEntityBasedonID', txtSgrCode, searchParam, 'le', 0);
                        }
                        break;
                    
                    case 'le_':
                        commonsearch('fetchSGRBasedonLE', resultData[0]['id'], searchParam, 'sgr', 0);
                        break;
                    
                    case 'sgr':  // This will now execute properly after le_
                        var sgrCode2 = document.getElementById("selectsgr_code").value;
                        var leCode2 = document.getElementById("selectle_code").value;
                        var txtSgrCode2 = document.getElementById("txtsgr_code").value;
                        
                        if (sgrCode2 !== '' && leCode2 !== '') {
                            checkForCreditFilesle(sgrCode2, leCode2);
                        } else if (txtSgrCode2 !== '') {
                            commonsearch('fetchLegalEntityBasedonID', txtSgrCode2, searchParam, 'le', 0);
                        }
                        break;
                }

                // Post-processing
                if (check === 0) {
                    populateSearchOptions('sgr', resultData);
                }

                // Handle empty results or references
                if (stype === 'le' && check === 1) {
                    document.getElementById("codria_span").innerHTML = '';
                    alert("No references are available for this LE.");
                } else if (stype === 'le') {
                    emptydropdown(stype);
                } else if (stype === 'sgr') {
                    var rtype = 'le';
                    emptydropdown(stype);
                    emptydropdown(rtype);
                }
            } else {
                alert("No Matching Results Found...! or You are not authorized to see this SGR/LE, please contact the Banking");
            }
        } else {
            alert("AJAX request failed with status: " + xhr.status);
        }
        document.getElementById("loading_wrap").style.display = 'none';
    }
};

// IE5 compatibility for send
try {
    xhr.send("searchType=" + encodeURIComponent(searchType) + "&searchString=" + encodeURIComponent(searchString));
} catch (e) {
    xhr.send("searchType=" + escape(searchType) + "&searchString=" + escape(searchString));
}
