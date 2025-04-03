function handleCodriaChangesforle() {
  document.getElementById("codria_le_span").innerHTML = ''; // Use a dedicated span for LE codria
  var cval = document.getElementById("codria_le_code").value; // Use codria_le_code consistently

  if (cval && cval!= "") {
    var xhr;
    try {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xhr = new XMLHttpRequest();
        } catch (e) {
          alert('Cannot create an XMLHTTP instance');
          return false;
        }
      }
    }

    xhr.open('POST', 'dbe_cfl_user_accessTransferSave.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          try {
            var response = eval('(' + xhr.responseText + ')');

            if (response.id == 'None') {
              var elements = document.getElementsByTagName("*");
              for (var i = 0; i <= elements.length; i++) {
                if (elements[i].className == "codria_class") {
                  elements[i].style.display = 'none';
                }
              }
              alert("Invalid reference number.");
              return;
            } else {
              var codriaSpan = document.getElementById('codria_le_span'); // Define codriaSpan correctly
              codriaSpan.innerHTML = '';

              // Create le data using older JS syntax
              var ledata = {};
              ledata.le = [];
              var LeItem = {};
              LeItem.id = response[0].le_code;
              LeItem.name = response[0].le_name;
              ledata.le[0] = LeItem;

              populateSearchOptions('le', ledata.le); // Only populate LE data

              // Create radio button HTML string
              var radioHtml = '<input type="radio" name="codria_le"' +
                'tyle="display:inline;padding-right:5px;width:20%"' +
                'd="codria_le' + response[0].CODRIA + '"' +
                'alue="' + response[0].CODRIA + '"' +
                'hecked="checked">' +
                response[0].CODRIA;

              codriaSpan.innerHTML = radioHtml;

              // Show codria class elements
              var elements = document.getElementsByTagName("*");
              for (var i = 0; i < elements.length; i++) {
                if (elements[i].className == "codria_class") {
                  elements[i].style.display = 'block';
                }
              }

              // Call fetchUserDropdownDetails with correct parameters
              fetchUserDropdownDetails('codria', 'le');
            }
          } catch (e) {
            alert("Error processing response: " + e.message);
          }
        } else {
          alert("Request failed. Status: " + xhr.status);
        }
      }
    };
    var data = 'earchType=fetchCodriaBasedDetailsle&codria=' + encodeURIComponent(cval) + '&nocache=' + new Date().getTime();
    xhr.send(data);
  } else {
    alert("Please enter a valid reference number.");
  }
}
