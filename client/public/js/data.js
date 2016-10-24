$(function() {
    refreshAllData()
    $("#form-data").hide()

    $("#add-data").click(function() {
        $("#form-data").toggle()

    })
    $("#form-data").unbind().on("submit", function(event) {

        event.preventDefault()
        let dataId = $("#hidden-data-id").val()
        if (!dataId)
            $.ajax({
                url: 'http://localhost:9000/api/data',
                type: 'POST',
                data: {
                    letter: $("#letter").val().toUpperCase(),
                    frequency: $("#frequency").val()

                },
                success: function(result) {
                    $("#letter").val("")
                    $("#frequency").val("")
                    $("#message").show().html("Add is successful, feel free to add another").addClass("alert alert-success")
                    refreshAllData()

                }
            })
        else {
            $.ajax({
                url: 'http://localhost:9000/api/data/' + dataId,
                type: 'PUT',
                data: {
                    letter: $("#letter").val().toUpperCase(),
                    frequency: $("#frequency").val()
                },
                success: function(result) {
                    $("#message").show().html("Update is successful")
                    $("#letter").val("")
                    $("#frequency").val("")
                    refreshAllData()
                }
            })
        }
    })


    $("#search-box-letter").keyup(function(){
      $('#all-data').attr('id','search-box-result');
       if($("#search-box-letter").val() != "" || $("#search-box-frequency").val() !=""){
         $.ajax({
           url:   `/api/search?letter=${$("#search-box-letter").val()}&frequency=${$("#search-box-frequency").val()}`,
           method: `GET`,
           success: function(result){
             console.log(result)
            let isisearch = ""
             for (let i in result) {
                 let components = ""
                 components = components +
                     `
                     <tr>
                         <th scope="row">1</th>
                         <td>${result[i].letter}</td>
                         <td>${result[i].frequency}</td>
                         <td>
                             <button type="button" class="btn btn-success btn-update" data-id="${result[i]._id}">+ Update </button>
                             <button type="button" class="btn btn-danger btn-dlt" data-id="${result[i]._id}">Delete</button>
                         </td>
                     </tr>
                   `
                  isisearch = isisearch + components
             }
             $("#search-box-result").html(isisearch)

           }
         })
       }
       else if ($("#search-box-letter").val() == "" ){
        $('#search-box-result').attr('id','all-data');
         refreshAllData()
       }
       else {
         refreshAllData()
       }
     })
     $("#search-box-frequency").keyup(function(){
         $('#all-data').attr('id','search-box-result');
       if($("#search-box-letter").val() != "" || $("#search-box-frequency").val() !=""){
         $.ajax({
           url:   `/api/search?letter=${$("#search-box-letter").val()}&frequency=${$("#search-box-frequency").val()}`,
           method: `GET`,
           success: function(result){
             console.log(result);
             let isisearch = ""
             for (let i in result) {
                 let components = ""
                 components = components +
                     `
                     <tr>
                         <th scope="row">1</th>
                         <td>${result[i].letter}</td>
                         <td>${result[i].frequency}</td>
                         <td>
                             <button type="button" class="btn btn-success btn-update" data-id="${result[i]._id}">+ Update </button>
                             <button type="button" class="btn btn-danger btn-dlt" data-id="${result[i]._id}">Delete</button>
                         </td>
                     </tr>
                   `
                  isisearch = isisearch + components
             }
             $("#search-box-result").html(isisearch)
           }

         })
       }
       else if ($("#search-box-letter").val() == "" ){
        $('#search-box-result').attr('id','all-data');
         refreshAllData()
       }
       else {
         refreshAllData()
       }
     })


})
function getDetails(id) {
    console.log(id)
    $.ajax({
        url: 'http://localhost:9000/api/data/' + id,
        type: 'GET',
        success: function(result) {
            $("#letter").val(result.letter)
            $("#frequency").val(result.frequency)
            $("#hidden-data-id").val(result._id)
        }
    })
}

let searchData = function(query) {
    $.ajax({
        url: `http://localhost:9000/api/search/${query}`,
        type: "GET",
        success: function(result) {
            console.log(result);
            let isisearch = ""
            for (let i in result) {
                let components = ""
                components = components +
                    `
                    <tr>
                        <th scope="row">1</th>
                        <td>${result[i].letter}</td>
                        <td>${result[i].frequency}</td>
                        <td>
                            <button type="button" class="btn btn-success btn-update" data-id="${result[i]._id}">+ Update </button>
                            <button type="button" class="btn btn-danger btn-dlt" data-id="${result[i]._id}">Delete</button>
                        </td>
                    </tr>
                  `
                isisearch = isisearch + components
            }
            $("#search-box-result").html(isisearch)
        }
    })
}

let refreshAllData = function() {
    $.ajax({
        url: 'http://localhost:9000/api/data',
        type: "GET",
        success: function(result) {
            let allData = ""
            for (let i in result) {
                let component = ""
                component = component +
                    `

                <tr>
                    <th scope="row">1</th>
                    <td>${result[i].letter}</td>
                    <td>${result[i].frequency}</td>
                    <td>
                        <button type="button" class="btn btn-success btn-update" data-id="${result[i]._id}">+ Update </button>
                        <button type="button" class="btn btn-danger btn-dlt" data-id="${result[i]._id}">Delete</button>
                    </td>
                </tr>
              `

                allData = allData + component

            }

            $("#all-data").html(allData)
            $("#all-data .btn-update").click(function() {
                getDetails($(this).attr('data-id'))
            })
            $("#all-data .btn-dlt").click(function() {
                let idData = $(this).attr('data-id')
                $.ajax({
                    url: 'http://localhost:9000/api/data/' + idData,
                    type: 'DELETE',
                    success: function(result) {
                        $("#message").show().html("Delete is successful")
                        refreshAllData()

                    }
                })
            })
        }
    })
}


function updateData(id) {


    $.ajax({
        url: 'http://localhost:8080/api/data/' + id,
        type: 'PUT',
        data: {
            letter: $("#letter").val(),
            frequency: $("#frequency").val()
        },
        success: function(result) {
            location.reload()

        }

    })

}
