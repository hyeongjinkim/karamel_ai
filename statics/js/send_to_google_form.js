//의존성  : jquery, jquery.serializeObject, swal

function initFormHandler(config){  
  function formHandler(e){
    function blockEvent(e){
      e.preventDefault();
    }
    function mapData(form_data, config){
      var mapped_data = {};
      $.each(config.field_map, function(k, v){
        if( form_data[k] !== undefined ){
          mapped_data[v] = form_data[k];
        }else{
          console.log('no field found:',k);
        }
      });
      return mapped_data;
    }
    function validateForm(form_data, config){
      var validation_result = true;
      $.each(config.validations, function(k, test){
        if( test(form_data[k], k) === false ){
          validation_result = false;
          return false;
        }
      });
      return validation_result;
    }
    function overrideForm(data, config){
      $.each(config.value_override_string, function(k, value){
        data[k] = config.value_override_string[k];
      });
      return form_data;
    }
    function sendPost(data){
      $.ajax({
        url: config.url,
        type: config.method,
        data: $.param( data ),
      });
    }
    
    blockEvent(e);
    var form_data = $(e.target).serializeObject();
    if( validateForm(form_data, config) ){
      overrideForm(form_data, config);
      var mapped_data = mapData(form_data, config);
      sendPost(mapped_data);
      swal(
        'Completed!',
        config.on_success.comment,
        'success'
      ).then(config.on_success.callback);
    }
    return false;
  }
  $(config.form_selector).on('submit', formHandler);
}
