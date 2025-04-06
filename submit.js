// Get the selected option from the form
$selectedOption = $_POST['selectOption']; // This should match your radio button name

// Check if sub_group is selected
$is_subgroup_selected = ($selectedOption == 'sub_group');

// Set LE code based on selection
if ($is_subgroup_selected) {
    $le_code = 'ALL';
} else {
    $le_code = $_POST['le_code'];
}

// Insert log dbe for future reference
$insertqry4 = "INSERT INTO \"TUSRCFTRANSFERLOGDBE\" (\"CODRIA\",\"CODSPM\",\"CF_LEVEL\",\"CODTYPE\",\"CODOC\",\"SENTCOUVAL\", \"SENT_TOUSER\") VALUES ";
$insertqry4 .= "('$oval','".$sub_group_code."','".$le_code."','".$OcResultRow[0]['CODTYPE']."','".$okey."',".$getmaxval.", $userid, $usergroup)";
$res4 = pg_query($insertqry4);
