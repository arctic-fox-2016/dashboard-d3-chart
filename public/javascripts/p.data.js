function initContent(){
  var listContent = $('#list-content')

  $.get({
    url: 'http://localhost:9000/api/data',
    data: {
      'letter': _.toUpper($('#txt-search-letter').val().trim()),
      'frequency': $('#txt-search-frequency').val().trim()
    }, success: function(result){
      listContent.empty()
      for(var idx = 0; idx < result.length; idx++){
        var html = `<tr data-id="${result[idx]._id}"><td>${idx+1}</td><td><span class="text-letter">${result[idx].letter}</span></td><td><span class="text-frequency">${result[idx].frequency}</span></td><td><button type="button" class="btn btn-success btn-update"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Update</button> <button type="button" class="btn btn-danger btn-delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete</button></td></tr>`
        listContent.append(html)
      }
      listContent.find('.btn-update').unbind().on('click', function(event){
        event.preventDefault()

        $('#hdn-data-id').val($(this).closest('tr').attr('data-id'))
        $('#txt-manage-letter').val($(this).closest('tr').find('.text-letter').text())
        $('#txt-manage-frequency').val($(this).closest('tr').find('.text-frequency').text())
        $('#well-manage').removeClass('hidden')
      })
      listContent.find('.btn-delete').unbind().on('click', function(event){
        event.preventDefault()
        var r = confirm('Are you sure want to delete this record');
        if (r == true) {
          var id = $(this).closest('tr').attr('data-id')

          $.ajax({
            url: `http://localhost:9000/api/data/${id}`,
            method: 'DELETE',
            success: function(){
              initContent()
            }
          })
        }
      })
    }
  })
}

function initSearch(){
  $('#txt-search-letter, #txt-search-frequency').unbind().on('keyup', function(){
    initContent()
  })
}

function initManage(){
  var buttonTrigger = $('#btn-trigger-manage')
  var formManage = $('#form-manage')

  buttonTrigger.unbind().on('click', function(event){
    event.preventDefault()
    var wellManage = $(buttonTrigger.attr('for'))
    if(wellManage.hasClass('hidden')){
      wellManage.removeClass('hidden')
    } else {
      wellManage.addClass('hidden')
    }
  })

  formManage.unbind().on('submit', function(event){
    event.preventDefault()

    var manageId = $('#hdn-data-id')
    var manageLetter = $('#txt-manage-letter')
    var manageFrequency = $('#txt-manage-frequency')

    manageLetter.attr('disabled', 'disabled')
    manageFrequency.attr('disabled', 'disabled')

    if(_.isEmpty(manageId.val().trim())){
      $.post({
        url: 'http://localhost:9000/api/data',
        data: {
          'letter': _.toUpper(manageLetter.val().trim()),
          'frequency': manageFrequency.val().trim()
        }, success: function(result){
          manageLetter.val('').removeAttr('disabled')
          manageFrequency.val('').removeAttr('disabled')
          manageId.val('')
          initContent()
        }
      })
    } else {
      $.ajax({
        url: `http://localhost:9000/api/data/${manageId.val().trim()}`,
        method: 'PUT',
        data: {
          'letter': _.toUpper(manageLetter.val().trim()),
          'frequency': manageFrequency.val().trim()
        }, success: function(result){
          manageLetter.val('').removeAttr('disabled')
          manageFrequency.val('').removeAttr('disabled')
          manageId.val('')
          initContent()
        }
      })
    }
  })
}

$(function(){
  initSearch()
  initManage()
  initContent()
})
