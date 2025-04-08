function toggleCodriaFields() {
  var subGroupOption = document.getElementById('sub_group_option');
  var leOption = document.getElementById('le_option');
  var resetButton = document.getElementById('resetButton');
  var fetchDetailsButton = document.getElementById('fetchCFDetails');
  var fetchDetailsLEButton = document.getElementById('fetchCFDetailsle');
  
  if (subGroupOption.checked) {
    document.getElementById('codria_section').style.display = '';
    document.getElementById('SGR_SEC').style.display = '';
    document.getElementById('codria_le_section').style.display = 'none';
    document.getElementById('LE_SEC').style.display = 'none';
    document.getElementById('sgr_reset_container').appendChild(resetButton);
    // Show the Sub-group fetch button and hide the LE fetch button
    fetchDetailsButton.style.display = '';
    fetchDetailsLEButton.style.display = 'none';
  } else {
    document.getElementById('codria_le_section').style.display = '';
    document.getElementById('LE_SEC').style.display = '';
    document.getElementById('codria_section').style.display = 'none';
    document.getElementById('SGR_SEC').style.display = 'none';
    document.getElementById('le_reset_container').appendChild(resetButton);
    // Show the LE fetch button and hide the Sub-group fetch button
    fetchDetailsButton.style.display = 'none';
    fetchDetailsLEButton.style.display = '';
  }
  updateOptionDisabling();
  updateResetVisibility();
}


<!-- Replace your existing button code with this structure -->
<tr bgcolor="#FFFFFF">
  <td colspan="5">&nbsp;</td>
</tr>
<tr bgcolor="#FFFFFF">
  <td colspan="5">
    <div class="button-container">
      <!-- This button will show when Sub-group is selected -->
      <input type="button" name="fetchCFDetails" id="fetchCFDetails" value="Fetch Details" 
        class="actionButton" onclick="javascript:fetchDetails();">
      
      <!-- This button will show when LE is selected -->
      <input type="button" name="fetchCFDetailsle" id="fetchCFDetailsle" value="Fetch Details" 
        class="actionButton" onclick="javascript:fetchDetailsle();" style="display: none;">
      
      <button class="actionButton cancelbutton" onclick="history.back();">Cancel</button>
    </div>
  </td>
</tr>
