jQuery(function(){
  $('body').on('DOMNodeInserted', '.fillable', function(e) {
    if (e.target.tagName != "LABEL") {
      gigConnectFields(this);
    }
  });
  jQuery(".fillable").each(function(){
    gigConnectFields(this);
  });
});

function gigConnectFields(source) {
  var inputs = jQuery(source).find("input");
  if (inputs.length > 0) {
    inputs.each(function(){
      var option = this;
      var parentElement = jQuery(this).parent().parent();
      var fieldValue = jQuery(option).val();
      var matches = fieldValue.match(/{local:(.*?)}/);
      if (matches.length > 1) {
        var field = matches.pop();
        var fieldQuery = "." + field + " input";
        var fieldObject = jQuery(fieldQuery);
        var fieldValue = "";
        if (fieldObject.length > 0) {
          fieldValue = fieldObject.val();
          console.log(field);
          console.log(fieldValue);
          jQuery(option).val(fieldValue);
          jQuery("label[for='" + option.id + "']").contents().last().replaceWith(" " + fieldValue);
        }
        if (fieldValue == "") {
          parentElement.hide();
        } else {
          parentElement.show();
        }
        $(document).on("input", fieldQuery, function() {
          var fieldObject = jQuery(fieldQuery);
          var fieldValue = fieldObject.val();
          jQuery(option).val(fieldValue);
          jQuery("label[for='" + option.id + "']").contents().last().replaceWith(" " + fieldValue);
          if (fieldValue == "") {
            parentElement.hide();
          } else {
            parentElement.show();
          }
        });
      }
    });  
  }
}
