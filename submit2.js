function submitForm() {
  var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  var subGroupOption = document.getElementById('sub_group_option');
  // var selectedOption = subGroupOption.checked ? 'sub_group' : 'le';
  var isSubGroupSelected = subGroupOption.checked;
  var selectedOption = isSubGroupSelected ? 'sub_group' : 'le';
  
  var sgrCode = document.getElementById('txtsgr_code').value;
  var leCode = document.getElementById('txtle_code').value;
  var codria = subGroupOption.checked ? document.getElementById('codria_code').value : document.getElementById('codria_le_code').value;
  // var cfLevel = subGroupOption.checked ? 'ALL' : leCode; // Calculate CF_Level client-side
  var cfLevel = isSubGroupSelected ? 'ALL' : leCode; // Calculate CF_Level client-side

  var params = "searchType=saveUserAccessTransferComment" +
               "&sub_group_code=" + encodeURIComponent(sgrCode) +
               "&le_code=" + encodeURIComponent(leCode) +
               "&codUsr=" + encodeURIComponent(document.getElementById('codUsr').value) +
               "&codria=" + encodeURIComponent(codria) +
               "&selectedOption=" + encodeURIComponent(selectedOption) +
               "&CF_Level=" + encodeURIComponent(cfLevel) + // Add CF_Level here
               "&closeComment=" + encodeURIComponent(document.getElementById('closeComment') ? document.getElementById('closeComment').value : '');

  xhr.open("POST", "your_script.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = eval('(' + xhr.responseText + ')');
      if (data.id == 'success') {
        document.getElementById("htmldiv").innerHTML = "Successfully Updated..";
        document.getElementById("htmldiv").className = 'tddiv greendiv';
        alert("Successfully updated..");
        setTimeout(function() {
          location.reload(true);
        }, 1000);
      }
    }
  };
  xhr.send(params);
}



function saveUserAccessTransferComment() {
    $lastComment = base64_encode($_POST['closeComment']);
    $codUsr = $_POST['codUsr'];
    $sub_group_code = isset($_POST['sub_group_code']) ? trim($_POST['sub_group_code']) : trim($_POST['le_code']);
    $codria = $_POST['codria'];
    $cf_level = $_POST['CF_Level']; // Use the passed CF_Level directly

    if ($codria != '') {
        $getcurstatus = "SELECT * FROM \"TRIADBE\" WHERE \"CODRIA\" = '$codria' AND \"CODTYPE\" = 'EXT' AND \"FLAG\" = 'Y'";
        $curstatus = pg_query($getcurstatus);
        $CurResultRow = pg_fetch_all($curstatus);

        $insertqry4 = "INSERT INTO \"TUSRCFTRANSFERLOGDBE\" (\"CODRIA\", \"CODSPM\", \"CF_LEVEL\", \"CODTYPE\", \"CODOC\", \"SENTCOUVAL\", \"SENTTOUSER\") VALUES ";
        $insertqry4 .= "('$codria', '$sub_group_code', '$cf_level', '" . $CurResultRow[0]['CODTYPE'] . "', '$okey', '$getmaxval', '$codUsr')";
        $res4 = pg_query($insertqry4);
    }
}
