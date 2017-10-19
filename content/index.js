jQuery(function(){
  jQuery(".fillable").each(function(){
    var inputs = jQuery(this).find("input");
    if (inputs.length > 0) {
      inputs.each(function(){
        var option = this;
        var fieldValue = jQuery(option).val();
        var matches = fieldValue.match(/\{local\:(.*?)\}/);
        if (matches.length > 1) {
          var field = matches.pop();
          var fieldObject = jQuery("." + field + " input");
          console.log(field);
          console.log(fieldObject.val());
          jQuery(option).val(fieldObject.val());
          jQuery("label[for='" + option.id + "']").contents().last().replaceWith(" " + fieldObject.val());
          fieldObject.on("input", function() {
            jQuery(option).val(fieldObject.val());
            jQuery("label[for='" + option.id + "']").contents().last().replaceWith(" " + fieldObject.val());
          });
        }
      });  
    }
  });
});
