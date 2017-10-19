jQuery(function(){
  jQuery(".fillable").each(function(){
    var inputs = jQuery(this).find("input");
    if (inputs.length > 0) {
      inputs.each(function(){
        var option = this;
        var parentElement = jQuery(this).parent().parent();
        var fieldValue = jQuery(option).val();
        var matches = fieldValue.match(/\{local\:(.*?)\}/);
        if (matches.length > 1) {
          var field = matches.pop();
          var fieldObject = jQuery("." + field + " input");
          var fieldValue = fieldObject.val();
          console.log(field);
          console.log(fieldValue);
          jQuery(option).val(fieldValue);
          jQuery("label[for='" + option.id + "']").contents().last().replaceWith(" " + fieldValue);
          if (fieldValue == "") {
            parentElement.hide();
          } else {
            parentElement.show();
          }
          fieldObject.on("input", function() {
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
  });
});
