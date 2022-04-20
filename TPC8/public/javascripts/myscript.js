var editId = -1

$(function() {
    $.get('http://localhost:3050/api', function(data){
        data.forEach(function(data) {

            var newListItem = $("<li/>")
            var newDiv = $("<div/>").addClass("paragraphItem")
            var newInfoPar = $("<p/>").addClass("childAlign").text(data.paragraph + ' - ' + data.date)
            var newEditButton = $("<button/>").addClass("childAlign").text("Edit")

            newEditButton.click(function() {
                editId = data._id
                $("#GET-paragraph").val(data.paragraph);
                $("form p").text("Mode: Edit")
            })

            var newDeleteButton = $("<button/>").addClass("childAlign").text("Delete")

            newDeleteButton.click(function() {
                var id = data._id
                $.ajax({
                    url: 'http://localhost:3050/api/delete/' + id,
                    type: 'DELETE',
                    success: function(response) {
                        alert("Item Successfully Deleted")
                        location.reload()
                    }
                });
            })

            newListItem.append(newDiv)
            newDiv.append(newInfoPar).append(newEditButton).append(newDeleteButton)

            $("ul")
            .append(newListItem)
        })
    })

    $("form").submit(function(event) {
        event.preventDefault()
        if(editId != -1) {
            $.ajax({
                url: 'http://localhost:3050/api/edit/' + editId,
                type: 'PUT',
                data: $("form").serialize(),
                success: function(response) {
                    alert("Item Successfully Edited")
                    editId = -1
                    location.reload(false)
                }
            });
        }

        else {
            $.post('http://localhost:3050/api', $("form").serialize(), function(data) {
                alert("Record Inserted: " + {para: $("#GET-paragraph").val()})
                location.reload(false)
            })
        }

        $("#GET-paragraph").val("");
        $("form p").text("Mode: Add")
    })

    $("#reset").click(function(event) {
        editId = -1;
        $("form p").text("Mode: Add")
    })
})